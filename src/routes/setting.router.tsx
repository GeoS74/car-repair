import { redirect } from "react-router-dom";

import serviceHost from "../libs/service.host"
import tokenManager from "../libs/token.manager"
import fetchWrapper from "../libs/fetch.wrapper"

import Setting from "../components/Setting/Setting"
// import Search from "../components/catalog/Search/Search"
import SimpleList from "../components/SimpleList/SimpleList"
import AccessSetting from "../components/Setting/AccessSetting/AccessSetting"
import BundleRole from "../components/Setting/BundleRole/BundleRole"
import FrozenList from "../components/FrozenList/FrozenList";

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
      loader: () => fetchWrapper(_getRoles).catch(() => redirect('/auth'))
    },
    {
      path: "/setting/edit/directings",
      element: <><></><SimpleList typeList="directings" /></>,
      loader: () => fetchWrapper(_getDirectings).catch(() => redirect('/auth'))
    },
    {
      path: "/setting/edit/processes",
      element: <><></><></><SimpleList typeList="tasks" /></>,
      loader: () => fetchWrapper(_getProcesses).catch(() => redirect('/auth'))
    },
    {
      path: "/setting/edit/actions",
      // element: <><></><></><></><SimpleList typeList="actions" /></>,
      element: <><></><></><></><FrozenList /></>,
      loader: () => fetchWrapper(_getActions).catch(() => redirect('/auth'))
    },
    {
      path: "/setting/edit/access",
      element: <><></><></><></><></><AccessSetting /></>,
      loader: () => fetchWrapper([_getRoles, _getDirectings, _getProcesses, _getActions, _getAccessSettings])
        .then(response => {
          if (Array.isArray(response)) {
            return Promise.all(response.map(async r => await r.json()))
          }
        })
        .catch(() => redirect('/auth'))
    },
    {
      path: "/setting/edit/bundle/role",
      element: <><></><></><></><></><></><BundleRole /></>,
      loader: () => fetchWrapper([_getUsers, _getRoles])
        .then(response => {
          if (Array.isArray(response)) {
            return Promise.all(response.map(async r => await r.json()))
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

function _getProcesses() {
  return fetch(`${serviceHost("informator")}/api/informator/task`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}