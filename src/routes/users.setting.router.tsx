import { redirect } from "react-router-dom";

import serviceHost from "../libs/service.host";
import tokenManager from "../libs/token.manager";
import fetchWrapper from "../libs/fetch.wrapper";
import { responseNotIsArray } from "../middleware/response.validator";

import UsersSetting from "../components/UsersSetting/UsersSetting";
import SimpleList from "../components/SimpleList/SimpleList";

export default {
  path: "/users/setting",
  element: <UsersSetting />,
  children: [
    {
      index: true,
      element: <></>,
      loader: () => redirect('/users/setting/company'),
    },
    {
      path: "/users/setting/company",
      element: <SimpleList typeList="companies" />,
      loader: () => fetchWrapper(_getCompanies)
        .then(responseNotIsArray)
        .then(res => {
          if (res.ok) return res;
          throw new Error();
        })
        .catch(() => redirect('/auth'))
    },
  ]
}

function _getCompanies() {
  return fetch(`${serviceHost("informator")}/api/informator/company`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}
