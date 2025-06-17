import { redirect, LoaderFunctionArgs } from "react-router-dom";

import serviceHost from "../libs/service.host";
import tokenManager from "../libs/token.manager";
import session from "../libs/token.manager";
// import fetchWrapper from "../libs/fetch.wrapper";
// import { responseNotIsArray } from "../middleware/response.validator";

import NewsLine from "../components/NewsLine/NewsLine";
import NewsList from "../components/NewsLine/NewsList/NewsList";
import NewsPage from "../components/NewsLine/NewsPage/NewsPage"
import EditForm from "../components/NewsLine/EditForm/EditForm";

export default {
  path: "/newsLine",
  element: <NewsLine />,
  children: [
    {
      index: true,
      element: <NewsList />,
      loader: () => _getNews().finally(() => session.start())
    },
    {
      path: "/newsLine/createNews",
      element: <EditForm />,
      loader: () => session.start(),

    },
    {
      path: "/newsLine/editNews/:id",
      element: <><></><EditForm /></>,
      loader: ({ params }: LoaderFunctionArgs) => _getOneNews(params.id)
        .then(res => {
          if(res.ok) {
            return res;
          }
          if (res.status === 404) {
            return redirect('/newsLine')
          }
          throw new Error();
        })
        .catch(() => redirect('/auth'))
        .finally(() => session.start())
    },
    {
      path: "/newsLine/:id",
      element: <NewsPage />,
      loader: ({ params }: LoaderFunctionArgs) => _getOneNews(params.id)
        .then(res => {
          if(res.ok) {
            return res;
          }
          if (res.status === 404) {
            return redirect('/newsLine')
          }
          throw new Error();
        })
        .catch(() => redirect('/auth'))
        .finally(() => session.start())
    }
  ]
}

function _getNews() {
  return fetch(`${serviceHost("mnote")}/api/mnote/search/note`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

function _getOneNews(id?: string) {
  return fetch(`${serviceHost("mnote")}/api/mnote/${id}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}