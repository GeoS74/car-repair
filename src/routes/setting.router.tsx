import { redirect } from "react-router-dom";

import serviceHost from "../libs/service.host";
import tokenManager from "../libs/token.manager";
import fetchWrapper from "../libs/fetch.wrapper";
import { responseNotIsArray } from "../middleware/response.validator";

import Setting from "../components/Setting/Setting";
// import Search from "../components/catalog/Search/Search"
import SimpleList from "../components/SimpleList/SimpleList";
import AccessSetting from "../components/Setting/AccessSetting/AccessSetting";
import BundleRole from "../components/Setting/BundleRole/BundleRole";
import FrozenList from "../components/FrozenList/FrozenList";
import { _getMe } from "../libs/auth.user";

export default {
  path: "/setting",
  element: <Setting />,
  children: [
    {
      index: true,
      element: <></>,
      loader: () => redirect('/setting/edit/roles'),
    },
    {
      path: "/setting/edit",
      element: <></>,
      loader: () => redirect('/setting/edit/roles'),
    },
    {
      path: "/setting/edit/roles",
      element: <SimpleList typeList="roles" />,
      loader: () => fetchWrapper(_getRoles)
        .then(responseNotIsArray)
        .then(res => {
          if (res.ok) return res;
          throw new Error();
        })
        .catch(() => redirect('/auth'))
    },
    {
      path: "/setting/edit/directings",
      element: <><></><SimpleList typeList="directings" /></>,
      loader: () => fetchWrapper(_getDirectings)
        .then(responseNotIsArray)
        .then(res => {
          if (res.ok) return res;
          throw new Error();
        })
        .catch(() => redirect('/auth'))
    },
    {
      path: "/setting/edit/processes",
      element: <><></><></><SimpleList typeList="tasks" /></>,
      loader: () => fetchWrapper(_getProcesses)
        .then(responseNotIsArray)
        .then(res => {
          if (res.ok) return res;
          throw new Error();
        })
        .catch(() => redirect('/auth'))
    },
    {
      path: "/setting/edit/actions",
      // element: <><></><></><></><SimpleList typeList="actions" /></>,
      element: <><></><></><></><FrozenList title="Список действий" /></>,
      loader: () => fetchWrapper(_getActions)
        .then(responseNotIsArray)
        .then(res => {
          if (res.ok) return res;
          throw new Error();
        })
        .then(async res => {
          const actions: ISimpleRow[] = await res.json();
          return actions.filter(e => !['Согласовать', 'Ознакомиться'].includes(e.title));
        })
        .catch(() => redirect('/auth'))
    },
    {
      path: "/setting/edit/status",
      element: <><></><></><></><></><FrozenList title="Список статусов" /></>,
      loader: () => fetchWrapper(_getMe)
        .then(() => fetchWrapper(_getStatus))
        .then(responseNotIsArray)
        .then(res => {
          if (res.ok) return res;
          throw new Error();
        })
        .catch(() => redirect('/auth'))
    },
    {
      path: "/setting/edit/access",
      element: <><></><></><></><></><></><AccessSetting /></>,
      loader: () => fetchWrapper([_getRoles, _getDirectings, _getProcesses, _getActions, _getAccessSettings])
        .then(response => {
          if (Array.isArray(response)) {
            return Promise.all(response.map(async r => {
              if (r.ok) return await r.json();
              throw new Error();
            }))
          }
        })
        .then(res => {
          if(Array.isArray(res)) {
            const actions: ISimpleRow[] = res[3];
            res[3] = actions.filter(e => !['Согласовать', 'Ознакомиться'].includes(e.title));
            return res;
          }
        })
        .catch(() => redirect('/auth'))
    },
    {
      path: "/setting/edit/bundle/role",
      element: <><></><></><></><></><></><></><BundleRole /></>,
      loader: () => fetchWrapper([_getUsers, _getRoles])
        .then(response => {
          if (Array.isArray(response)) {
            return Promise.all(response.map(async r => {
              if (r.ok) return await r.json();
              throw new Error();
            }))
          }
        })
        .catch(() => redirect('/auth'))
    },
  ]
}

function _getUsers() {
  return fetch(`${serviceHost("informator")}/api/informator/user/search/?limit=100`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

function _getAccessSettings() {
  return fetch(`${serviceHost("informator")}/api/informator/setting/access`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

function _getRoles() {
  return fetch(`${serviceHost("informator")}/api/informator/role`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

function _getDirectings() {
  return fetch(`${serviceHost("informator")}/api/informator/directing`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

function _getActions() {
  return fetch(`${serviceHost("informator")}/api/informator/action`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

function _getStatus() {
  return fetch(`${serviceHost("informator")}/api/informator/status`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

function _getProcesses() {
  return fetch(`${serviceHost("informator")}/api/informator/task`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}