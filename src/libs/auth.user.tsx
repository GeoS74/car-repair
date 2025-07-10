import serviceHost from "../libs/service.host";
import tokenManager from "../libs/token.manager";

export const _getMe =  () => {
  return fetch(`${serviceHost("mauth")}/api/mauth/access/`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
};

export const _getUser = () => {
  return fetch(`${serviceHost("informator")}/api/informator/user/`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
};