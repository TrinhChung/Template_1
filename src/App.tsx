import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Cart,
  Checkout,
  HomeLayout,
  Landing,
  Login,
  OrderConfirmation,
  OrderHistory,
  Contact,
  Register,
  Search,
  Shop,
  SingleOrderHistory,
  SingleProduct,
  UserProfile,
} from "./pages";
import { checkoutAction, searchAction } from "./actions/index";
import { shopCategoryLoader } from "./pages/Shop";
import { loader as orderHistoryLoader } from "./pages/OrderHistory";
import { loader as singleOrderLoader } from "./pages/SingleOrderHistory";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCompany } from "./features/company/companySlice";
import { AppDispatch } from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { index: true, element: <Landing /> },
      { path: "shop", element: <Shop /> },
      { path: "shop/:category", element: <Shop />, loader: shopCategoryLoader },
      { path: "product/:id", element: <SingleProduct /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout />, action: checkoutAction },
      { path: "search", action: searchAction, element: <Search /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "order-confirmation", element: <OrderConfirmation /> },
      { path: "user-profile", element: <UserProfile /> },
      { path: "order-history", element: <OrderHistory />, loader: orderHistoryLoader },
      { path: "order-history/:id", element: <SingleOrderHistory />, loader: singleOrderLoader },
      { path: "contact", element: <Contact /> },
    ],
  },
]);

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Fetch company info vào redux store, đồng thời đổi favicon nếu có logo
    dispatch(fetchCompany())
      .unwrap()
      .then((data) => {
        if (data.logo_url) {
          const favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
          if (favicon) {
            favicon.href = data.logo_url.startsWith("http")
              ? data.logo_url
              : import.meta.env.VITE_API_URL + data.logo_url;
          }
        }
      });
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
