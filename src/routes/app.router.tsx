import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

import fetchWrapper from "../libs/fetch.wrapper";
import { _getMe } from "../libs/auth.user";
import authRouter from "./auth.router";
import userRouter from "./user.router";
import settingRouter from "./setting.router";
import docFlowRouter from "./docflow.router";
import carsRouter from "./car.list.router";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import Main from "../components/Main/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: () => fetchWrapper(_getMe)
      .then(() => redirect("/docflow"))
      .catch(() => redirect('/auth')),
      errorElement: < ErrorBoundary />,
  },
  authRouter,
  userRouter,
  settingRouter, // only admin
  docFlowRouter,
  carsRouter // only admin
])

export default <RouterProvider router={router} />
