import cssClasses from "./NotificationItem.module.css";
import { MONTH_LITERALS } from "../../common/MonthLiterals";
import { Link } from "react-router-dom";

const getNotificationDate = (dateString) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);
  const date = new Date(dateString);
  date.setHours(0, 0, 0, 0);
  if (date.toISOString() === today.toISOString()) {
    return "TODAY";
  } else if (date.toISOString() === yesterday.toISOString()) {
    return "YESTERDAY";
  } else {
    return `${date.getDate()} ${MONTH_LITERALS[date.getMonth()]}`;
  }
};

const NotificationItem = (props) => {
  return (
    <Link className={cssClasses.link} to="/checkout">
      <li className={cssClasses.item}>
        <div className={cssClasses.title}>{props.title}</div>
        <div className={cssClasses.date}>{getNotificationDate(props.date)}</div>
      </li>
    </Link>
  );
};

export default NotificationItem;
