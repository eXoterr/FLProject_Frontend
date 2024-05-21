import 'react'
import { createBrowserRouter } from "react-router-dom";
import { MyPage } from '../pages/MyPage';
import { MyIndex } from '../pages/Landing/MyIndex';
import { MyLogin } from '../pages/Landing/Auth/MyLogin';
import { MyRegister } from '../pages/Landing/Auth/MyRegister';
import { MyReset } from '../pages/Landing/Auth/MyReset';
import MyList from '../pages/Order/MyList';
import MyNewOrder from '../pages/Order/MyNewOrder';
import MyOrderDetails from '../pages/Order/MyOrderDetails';
import { getOrderDetails } from './orderLoader';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MyPage bgClass='bg-success-subtle'><MyIndex /></MyPage>,
  },
  {
    path: "/login",
    element: <MyPage bgClass='bg-success-subtle'><MyLogin /></MyPage>,
  },
  {
    path: "/register",
    element: <MyPage bgClass='bg-success-subtle'><MyRegister /></MyPage>,
  },
  {
    path: "/reset",
    element: <MyPage bgClass='bg-success-subtle'><MyReset /></MyPage>,
  },
  {
    path: "/orders",
    element: <MyPage bgClass='bg-success-subtle'><MyList /></MyPage>,
  },
  {
    path: "/new-order",
    element: <MyPage bgClass='bg-success-subtle'><MyNewOrder /></MyPage>,
  },
  {
    path: "/order/:id",
    element: <MyPage bgClass='bg-success-subtle'><MyOrderDetails /></MyPage>,
    loader: getOrderDetails,
  },
]);

export {router}