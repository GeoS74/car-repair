import { Outlet, redirect } from "react-router-dom"

import tokenManager from "../libs/token.manager"
import Navigate from "../components/navigate/Navigate"
import { AuthForm } from "../components/AuthForm/AuthForm"
import { InfoCard } from "../components/AuthForm/InfoCard/InfoCard"
import serviceHost from "../libs/service.host"
import session from "../libs/token.manager"

export default {
  path: "/auth",
  element: <>
    <Navigate />
    <Outlet />
  </>,
  children: [
    {
      index: true,
      element: <AuthForm />,
    },
    {
      path: "/auth/signout",
      element: <></>,
      loader: () => {
        
        fetch(`${serviceHost("mauth")}/api/mauth/signout/`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${tokenManager.getRefresh()}`
          }
        });

        session.close()
        return redirect("/auth");
      }
    },
    {
      path: "/auth/confirm/:token",
      element: <InfoCard mode="confirm"/>,
      loader: ({ params }: { params: unknown }) => {

        if (typeof params === 'object' && params !== null) {
          if ("token" in params) {
            return fetch(`${serviceHost("mauth")}/api/mauth/confirm/${params.token}`)
              .then(res => res.status)
              .catch(error => {
                console.log(error.message);
                return 500;
              })
          }
        }
      }
    },
  ]
}
