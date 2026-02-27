import { Footer, Header } from "@/components";
import BlankLayout from "@/layouts/BlankLayout";
import MainLayout from "@/layouts/MainLayout";
import { createBrowserRouter, type LoaderFunctionArgs } from "react-router-dom";
import {
  About,
  Computers,
  IPad,
  Entertainment,
  Support,
  Phones,
  SmartHome,
  SignIn,
  Register,
  Home,
  NotFound,
  ErrorPage,
  ProductDetail,
  SearchResults,
  UserCenter,
} from "../pages";
import UserLayout from "@/layouts/UserLayout";

import RequireAuth from "@/hocs/RequireAuth";
import { loadProducts } from "@/helpers/loaders";

const router = createBrowserRouter([
  // 根目录 “/”
  {
    path: "/",
    element: <MainLayout header={<Header />} footer={<Footer />} />,
    children: [
      {
        index: true, // 默认子路由
        element: <Home />,
      },
      { path: "about", element: <About />, errorElement: <ErrorPage /> },
      {
        path: "product-detail/:id",
        element: <ProductDetail />,
        errorElement: <ErrorPage />,
        loader: async ({ params, request }: LoaderFunctionArgs) => {
          const productId = params.id;
          if (!productId) {
            throw new Response("为提供产品ID", {
              status: 400,
              statusText: "Bad Request",
            });
          }
          return await loadProducts(productId, request.signal);
        },
      },
      {
        path: "computers",
        element: <Computers />,
        errorElement: <ErrorPage />,
      },
      { path: "ipad", element: <IPad />, errorElement: <ErrorPage /> },
      {
        path: "entertainment",
        element: <Entertainment />,
        errorElement: <ErrorPage />,
      },
      { path: "support", element: <Support />, errorElement: <ErrorPage /> },
      {
        path: "smarthome",
        element: <SmartHome />,
        errorElement: <ErrorPage />,
      },
      { path: "phones", element: <Phones />, errorElement: <ErrorPage /> },
      {
        path: "search",
        element: <SearchResults />,
        errorElement: <ErrorPage />,
      },
      {
        path: "user-center",
        element: <UserCenter />,
        errorElement: <ErrorPage />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
  // 用户权限目录“/auth”
  {
    path: "/auth",
    element: <BlankLayout />,
    children: [
      { path: "signin", element: <SignIn />, errorElement: <ErrorPage /> },
      { path: "register", element: <Register />, errorElement: <ErrorPage /> },
    ],
  },
  {
    path: "/user",
    element: (
      <RequireAuth>
        <UserLayout />
      </RequireAuth>
    ),
    children: [
      {
        path: "",
        element: <UserCenter />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

export default router;
