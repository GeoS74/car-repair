import tokenManager from "../libs/token.manager"
import session from "../libs/token.manager"
import serviceHost from "../libs/service.host"
import fetchWrapper from "../libs/fetch.wrapper"

import About from "../components/About/About"

export default {
  path: "/about",
  children: [
    {
      path: "/about/company",
      element: <About alias="company" />,
      loader: () => fetchWrapper(() => _getAbout("company"))
        .catch(() => [])
        .finally(() => session.start())
    },
    {
      path: "/about/credential",
      element: <><></><About alias="credential"/></>,
      loader: () => fetchWrapper(() => _getAbout("credential"))
        .catch(() => [])
        .finally(() => session.start())
    },
    {
      path: "/about/garanty",
      element: <><></><></><About alias="garanty"/></>,
      loader: () => fetchWrapper(() => _getAbout("garanty"))
        .catch(() => [])
        .finally(() => session.start())
    },
    {
      path: "/about/contact",
      element: <><></><></><></><About alias="contact"/></>,
      loader: () => fetchWrapper(() => _getAbout("contact"))
        .catch(() => [])
        .finally(() => session.start())
    },
    {
      path: "/about/mainPage",
      element: <><></><></><></><About alias="mainPage"/></>,
      loader: () => fetchWrapper(() => _getAbout("mainPage"))
        .catch(() => [])
        .finally(() => session.start())
    },
  ]
}

function _getAbout(alias: string) {
  return fetch(`${serviceHost("informator")}/api/informator/about/${alias}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}