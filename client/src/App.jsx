import { Route, Routes } from "react-router-dom";

import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";

import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";

import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";

import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";

// import PaypalReturnPage from "./pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";

import SearchProducts from "./pages/shopping-view/search";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

  console.log(isLoading, user);

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          {/* <Route path="paypal-return" element={<PaypalReturnPage />} /> */}
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="search" element={<SearchProducts />} />
        </Route>
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
// import React, { useEffect } from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import AuthLayout from "./components/auth/layout";
// import AuthLogin from "./pages/auth/login";
// import AuthRegister from "./pages/auth/register";

// import AdminLayout from "./components/admin-view/layout";
// import AdminDashboard from "./pages/admin-view/dashboard";
// import AdminProducts from "./pages/admin-view/products";
// import AdminOrders from "./pages/admin-view/orders";
// import AdminFeatures from "./pages/admin-view/features";

// import ShoppingLayout from "./components/shopping-view/layout";
// import NotFound from "./pages/not-found";
// import ShoppingAccount from "./pages/shopping-view/account";
// import ShoppingCheckout from "./pages/shopping-view/checkout";
// import ShoppingHome from "./pages/shopping-view/home";
// import ShoppingListing from "./pages/shopping-view/listing";

// import CheckAuth from "./components/common/check-auth.jsx";
// import UnauthPage from "./pages/unauth-page";
// import { useDispatch, useSelector } from "react-redux";
// import { checkAuth } from "./store/auth-slice";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Navigate } from "react-router-dom";

// import PaymentSuccessPage from "./pages/shopping-view/payment-success";

// import SearchProducts from "./pages/shopping-view/search";

// function App() {
//   const { user, isAuthenticated, isLoading } = useSelector(
//     (state) => state.auth
//   );
//   const dispatch = useDispatch();

//   // one every page refresh it is checking auth and not logging out directly
//   useEffect(() => {
//     dispatch(checkAuth());
//   }, [dispatch]);

//   if (isLoading) {
//     return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
//   }

//   const router = createBrowserRouter([
//     {
//       path: "/",
//       // element: <Navigate to="/auth/login" />,
//       element: (
//         <CheckAuth isAuthenticated={isAuthenticated} user={user}></CheckAuth>
//       ),
//     },
//     {
//       path: "*",
//       element: <NotFound />,
//     },
//     {
//       path: "/auth",
//       element: (
//         <CheckAuth isAuthenticated={isAuthenticated} user={user}>
//           <AuthLayout />
//         </CheckAuth>
//       ),
//       children: [
//         {
//           path: "login",
//           element: <AuthLogin />,
//         },
//         {
//           path: "register",
//           element: <AuthRegister />,
//         },
//       ],
//     },
//     {
//       path: "/admin",
//       element: (
//         <CheckAuth isAuthenticated={isAuthenticated} user={user}>
//           <AdminLayout />
//         </CheckAuth>
//       ),
//       children: [
//         {
//           path: "dashboard",
//           element: <AdminDashboard />,
//         },
//         {
//           path: "products",
//           element: <AdminProducts />,
//         },
//         {
//           path: "orders",
//           element: <AdminOrders />,
//         },
//         {
//           path: "features",
//           element: <AdminFeatures />,
//         },
//       ],
//     },
//     {
//       path: "/shop",
//       element: (
//         <CheckAuth isAuthenticated={isAuthenticated} user={user}>
//           <ShoppingLayout />
//         </CheckAuth>
//       ),
//       children: [
//         {
//           path: "account",
//           element: <ShoppingAccount />,
//         },
//         {
//           path: "checkout",
//           element: <ShoppingCheckout />,
//         },
//         {
//           path: "home",
//           element: <ShoppingHome />,
//         },
//         {
//           path: "listing",
//           element: <ShoppingListing />,
//         },
//         {
//           path: "search",
//           element: <SearchProducts />,
//         },
//         {
//           path: "payment-success",
//           element: <PaymentSuccessPage />,
//         },
//       ],
//     },
//     {
//       path: "/unauth-page",
//       element: <UnauthPage />,
//     },
//   ]);
//   return <RouterProvider router={router} />;
// }

// export default App;
