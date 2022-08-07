import NotificationList from "./pages/Notification/NotificationList";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import Checkout from "./pages/Checkout/Checkout";
import Home from "./pages/Home/Home";
import { useDispatch } from "react-redux";
import { notificationActions } from "./store/notification";
const { io } = require("socket.io-client");

function App() {
  const dispatch = useDispatch();
  socket.on("notification", (payload) => {
    if (payload) {
      console.log("got here");
      dispatch(notificationActions.receiveNotification(payload));
    }
  });

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={<Navigate replace to="/home"></Navigate>}
        ></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/notifications" element={<NotificationList />}></Route>
      </Routes>
    </Layout>
  );
}

export const socket = io("http://localhost:5000");
export default App;
