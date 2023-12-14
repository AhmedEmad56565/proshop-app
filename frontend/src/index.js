import React from 'react';
import ReactDOM from 'react-dom/client';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';

import App from './App';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import Register from './screens/Register';
import PrivateRoutes from './components/PrivateRoutes';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminRoutes from './components/AdminRoutes';
import ProductList from './screens/admin/ProductList';
import UsersList from './screens/admin/UsersList';
import OrderList from './screens/admin/OrderList';
import ProductListEdit from './screens/admin/ProductListEdit';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomeScreen /> },
      { path: 'product/:id', element: <ProductScreen /> },
      { path: 'cart', element: <CartScreen /> },
      { path: 'login', element: <LoginScreen /> },
      { path: 'register', element: <Register /> },
      {
        path: '',
        element: <PrivateRoutes />,
        children: [
          { path: 'shipping', element: <ShippingScreen /> },
          { path: 'payment', element: <PaymentScreen /> },
          { path: 'placeorder', element: <PlaceOrderScreen /> },
          { path: 'order/:id', element: <OrderScreen /> },
          { path: 'profile', element: <ProfileScreen /> },
        ],
      },
      {
        path: '',
        element: <AdminRoutes />,
        children: [
          { path: 'admin/product-list', element: <ProductList /> },
          { path: 'admin/user-list', element: <UsersList /> },
          { path: 'admin/order-list', element: <OrderList /> },
          {
            path: 'admin/product/:id/edit',
            element: <ProductListEdit />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
