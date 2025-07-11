import { redirect, LoaderFunctionArgs } from "react-router-dom";

import serviceHost from "../libs/service.host";
import fetchWrapper from "../libs/fetch.wrapper";
import tokenManager from "../libs/token.manager";
import { responseNotIsArray } from "../middleware/response.validator";
import { _getMe } from "../libs/auth.user";

import Cars from "../components/Cars/Cars";
import CarsList from "../components/Cars/CarsList/CarsList";
import CarPage from "../components/Cars/CarPage/CarPage";
import EditForm from "../components/Cars/EditForm/EditForm";
import UploadCars from "../components/Cars/UploadCars/UploadCars";

export default {
  path: "/cars",
  element: <Cars />,
  children: [
    {
      index: true,
      element: <CarsList />,
      loader: () => fetchWrapper(_searchCars)
        .catch(() => redirect('/auth')),
    },
    {
      path: "/cars/:id",
      element: <CarPage />,
      loader: ({ params }: LoaderFunctionArgs) => fetchWrapper(() => _getCar(params.id))
        .then(responseNotIsArray)
        .then(res => {
          if (res.status === 404) {
            return redirect('/cars')
          }
          return res;
        })
        .catch(() => redirect('/auth')),
    },
    {
      path: "/cars/create/car",
      element: <EditForm />,
      loader: () => fetchWrapper(_getMe)
        .then(() => null)
        .catch(() => redirect('/auth')),
    },
    {
      path: "/cars/edit/car/:id",
      element: <EditForm />,
      loader: ({ params }: LoaderFunctionArgs) => fetchWrapper(() => _getCar(params.id))
        .then(responseNotIsArray)
        .then(res => {
          if (res.status === 404) {
            return redirect('/cars')
          }
          return res;
        })
        .catch(() => redirect('/auth')),
    },
    {
      path: "/cars/upload/excel",
      element: <UploadCars />,
      loader: () => fetchWrapper(_getMe)
        .catch(() => redirect('/auth')),
    },
  ]
}

function _searchCars() {
  return fetch(`${serviceHost("informator")}/api/informator/cars/search/car/`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

function _getCar(id?: string) {
  return fetch(`${serviceHost("informator")}/api/informator/cars/${id}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}
