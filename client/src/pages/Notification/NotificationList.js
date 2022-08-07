import { Fragment, useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";
import cssClasses from "./NotificationList.module.css";

const NotificationList = () => {
  const [notificationsList, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await fetch("http://localhost:5000/notifications");
      const data = await response.json(response);
      setNotifications(data);
    };

    fetchNotifications();
  }, []);

  console.log("noticiationList", notificationsList);

  return (
    <Fragment>
      <div className={cssClasses.h2}>
        <h2>Notifications</h2>
      </div>
      <ul className={cssClasses.list}>
        {notificationsList.map((notification) => (
          <NotificationItem
            key={notification.id}
            title={notification.title}
            date={notification.scheduleDate}
          ></NotificationItem>
        ))}
      </ul>
    </Fragment>
  );
};

export default NotificationList;
