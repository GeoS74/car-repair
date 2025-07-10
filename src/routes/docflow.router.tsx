import { redirect, LoaderFunctionArgs } from "react-router-dom";

import serviceHost from "../libs/service.host";
import fetchWrapper from "../libs/fetch.wrapper";
import tokenManager from "../libs/token.manager";
import { responseNotIsArray } from "../middleware/response.validator";
import { _getMe } from "../libs/auth.user";

import DocFlow from "../components/DocFlow/DocFlow";
import DocList from "../components/DocFlow/DocList/DocList";
import DocPage from "../components/DocFlow/DocPage/Wrapper";
import DocBarPanel from "../components/DocFlow/DocBarPanel/DocBarPanel";
import CreateDoc from "../components/DocFlow/DocCreatePage/CreateDoc";
import EditDoc from "../components/DocFlow/DocEditPage/EditDoc";

export default {
  path: "/docflow",
  element: <DocFlow />,
  children: [
    {
      index: true,
      element: <DocBarPanel />,
      loader: () => fetchWrapper(_getMe)
        .catch(() => redirect('/auth')),
    },
    {
      path: "/docflow/list",
      element: <DocList />,
      loader: ({ request }: LoaderFunctionArgs) => new Promise<URL>(res => res(new URL(request.url)))
        .then(url => fetchWrapper(() => _searchDocs(url.search)))
        .catch(() => redirect('/auth'))
    },
    {
      path: "/docflow/:id",
      element: <DocPage />,
      loader: ({ params }: LoaderFunctionArgs) => fetchWrapper([() => _getDoc(params.id), () => _getComments(params.id)])
        .then(async res => {
          if (Array.isArray(res)) {
            if (res[0].status === 404) {
              return redirect('/docflow')
            }

            return [
              await _doc(res[0]),
              await _comment(res[1]),
            ]
          }
        })
        .catch(() => redirect('/auth'))
    },
    {
      path: "/docflow/create/doc",
      element: <CreateDoc />,
      loader: () => fetchWrapper(_getMe)
        .catch(() => redirect('/auth')),
    },
    {
      path: "/docflow/create/order",
      element: <CreateDoc tpl="order" />,
      loader: () => fetchWrapper(_getMe)
        .catch(() => redirect('/auth')),
    },
    {
      path: "/docflow/edit/doc/:id",
      element: <EditDoc />,
      loader: ({ params }: LoaderFunctionArgs) => fetchWrapper(() => _getDoc(params.id))
        .then(responseNotIsArray)
        .then(res => {
          if (res.status === 404) {
            return redirect('/docflow')
          }
          return _doc(res);
        })
        .catch(() => redirect('/auth'))
    },
  ]
}

async function _doc(res: Response) {
  if (res.ok) return await res.json()
  throw new Error()
}
async function _comment(res: Response) {
  if (res.ok) return await res.json()
  throw new Error()
}


function _getDoc(id?: string) {
  return fetch(`${serviceHost("informator")}/api/informator/docflow/${id}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

function _getComments(id?: string) {
  return fetch(`${serviceHost("informator")}/api/informator/doccomments/search/?docId=${id}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

function _searchDocs(queryParams: string) {
  return fetch(`${serviceHost("informator")}/api/informator/docflow/search/doc/${queryParams}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}
