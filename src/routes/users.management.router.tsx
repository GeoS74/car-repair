import { redirect, LoaderFunctionArgs } from "react-router-dom";

import serviceHost from "../libs/service.host";
import fetchWrapper from "../libs/fetch.wrapper";
import tokenManager from "../libs/token.manager";
import { responseNotIsArray } from "../middleware/response.validator";

import UsersManagement from "../components/UsersManagement/UsersManagement";
import UsersList from "../components/UsersManagement/UsersList/UsersList";
import UserPage from "../components/UsersManagement/UserPage/UserPage";
import EditForm from "../components/UsersManagement/EditForm/EditForm";

export default {
  path: "/users/management",
  element: <UsersManagement />,
  children: [
    {
      index: true,
      element: <UsersList />,
      loader: () => fetchWrapper(_searchUsers)
        .catch(() => redirect('/auth')),
    },
    {
      path: "/users/management/:id",
      element: <UserPage />,
      loader: ({ params }: LoaderFunctionArgs) => fetchWrapper(() => _getUser(params.id))
        .then(responseNotIsArray)
        .then(res => {
          if (res.status === 404) {
            return redirect('/users/management')
          }
          return res;
        })
        .catch(() => redirect('/auth')),
    },
    {
      path: "/users/management/create/user",
      element: <EditForm />,
      loader: () => fetchWrapper(_getCompanies)
        .then(responseNotIsArray)
        .then(async response => {
          if(response.ok) {
            return await response.json();
          }
          throw new Error();
        })
        .then(response => [null, response])
        .catch(() => redirect('/auth')),
    },
    {
      path: "/users/management/edit/user/:id",
      element: <EditForm />,
      loader: ({ params }: LoaderFunctionArgs) => fetchWrapper([() => _getUser(params.id), _getCompanies])
      .then(response => {
        if (Array.isArray(response)) {
          return Promise.all(response.map(async r => {
            if (r.ok) return await r.json();
            else if (r.status === 404) {
              return redirect('/users/management')
            }
            throw new Error();
          }))
        }
      })
        .catch(() => redirect('/auth')),
    },
  ]
}

function _searchUsers() {
  return fetch(`${serviceHost("informator")}/api/informator/user/search`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

function _getUser(uid?: string) {
  return fetch(`${serviceHost("informator")}/api/informator/user/management/${uid}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

function _getCompanies() {
  return fetch(`${serviceHost("informator")}/api/informator/company`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}
