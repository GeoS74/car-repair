import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

import fetchWrapper from "../libs/fetch.wrapper";
import { _getMe } from "../libs/auth.user";
import catalogRouter from "./catalog.router";
import authRouter from "./auth.router";
import aboutCompanyRouter from "./about.router";
import userRouter from "./user.router";
import settingRouter from "./setting.router";
import docFlowRouter from "./docflow.router";
import newsLineRouter from "./newsLine.router";
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
  catalogRouter,
  authRouter,
  aboutCompanyRouter,
  userRouter,
  settingRouter,
  docFlowRouter,
  newsLineRouter,
  carsRouter
])

export default <RouterProvider router={router} />
