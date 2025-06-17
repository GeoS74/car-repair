import { redirect, LoaderFunctionArgs } from "react-router-dom";
import { responseNotIsArray } from "../middleware/response.validator";

import Catalog from "../components/catalog/Catalog"
import Search from "../components/catalog/Search/Search"
import SimpleList from "../components/SimpleList/SimpleList"
import UploadPrice from "../components/catalog/UploadPrice/UploadPrice"
import DownloadPrice from "../components/catalog/DownloadPrice/DownloadPrice";
import serviceHost from "../libs/service.host"
import fetchWrapper from "../libs/fetch.wrapper"
import tokenManager from "../libs/token.manager"
import session from "../libs/token.manager"
import ProductPage from "../components/catalog/ProductPage/ProductPage";

export default {
  path: "/catalog",
  element: <Catalog />,
  children: [
    {
      index: true,
      element: <Search />,
      loader: ({ request }: LoaderFunctionArgs) => new Promise<URL>(res => res(new URL(request.url)))
        .then(url => {
          if(url.searchParams.get('query')) {
            return url;
          }
          throw new Error()
        })
        .then(url => fetch(`${serviceHost("bridge")}/api/bridge/search/?query=${url.searchParams.get('query')}`))
        .then(async response => {
          if (response.ok) {
            const res = await response.json();
            return res;
          }
          throw new Error(`response status: ${response.status}`)
        })
        // .catch(() => redirect('/auth'))
        .catch(() => null)
        .finally(() => session.start())
    },
    {
      path: "/catalog/:id",
      element: <ProductPage />,
      loader: ({ params }: LoaderFunctionArgs) => fetchWrapper(() => _getDoc(params.id))
        .then(responseNotIsArray)
        .then(res => {
          if (res.status === 404) {
            return redirect('/catalog')
          }
          return res;
        })
        .catch(() => redirect('/auth'))
        .finally(() => session.start())
    },
    {
      path: "/catalog/product/:alias",
      element: <><></><ProductPage /></>,
      loader: ({ params }: LoaderFunctionArgs) => fetchWrapper(() => _getDocByAlias(params.alias))
        .then(responseNotIsArray)
        .then(res => {
          if (res.status === 404) {
            return redirect('/catalog')
          }
          return res;
        })
        .catch(() => redirect('/auth'))
        .finally(() => session.start())
    },
    {
      path: "/catalog/edit/brands",
      element: <SimpleList typeList="brands" />,
      loader: () => fetchWrapper(_getBrands).catch(() => redirect('/auth'))
    },
    {
      path: "/catalog/edit/providers",
      element: <><></><SimpleList typeList="providers" /></>,
      loader: () => fetchWrapper(_getProviders).catch(() => redirect('/auth'))
    },
    {
      path: "/catalog/edit/upload",
      element: <UploadPrice />,
      loader: () => fetchWrapper([_getBrands, _getProviders])
        .then(response => {
          if (Array.isArray(response)) {
            return Promise.all(response.map(async r => await r.json()))
          }
        })
        .catch(() => redirect('/auth'))
    },
    {
      path: "/catalog/download/price",
      element: <><DownloadPrice /></>,
      loader: () => session.start(),
    },
  ]
}

function _getBrands() {
  return fetch(`${serviceHost("bridge")}/api/bridge/brands`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

function _getProviders() {
  return fetch(`${serviceHost("bridge")}/api/bridge/providers`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

function _getDoc(id?: string) {
  return fetch(`${serviceHost("bridge")}/api/bridge/card/${id}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

function _getDocByAlias(alias?: string) {
  return fetch(`${serviceHost("bridge")}/api/bridge/card/product/${alias}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}
