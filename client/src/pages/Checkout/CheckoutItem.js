import { MONTH_LITERALS } from "../../common/MonthLiterals";
import cssClasses from "./CheckoutItem.module.css";

const CheckoutItem = (props) => {
  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()} ${
      MONTH_LITERALS[date.getMonth()]
    } ${date.getFullYear()}`;
  };

  const onCompleteOrder = async (event) => {
    console.log("id", props.id);
    event.preventDefault();

    const response = await fetch("http://0.0.0.0:5000/cancel-schedule", {
      method: "POST",
      body: JSON.stringify({ checkoutId: props.id }),
      headers: {
        "content-type": "application/json",
      },
    });

    console.log("response", response);
  };

  return (
    <li className={cssClasses.item}>
      <div className={cssClasses.text}>
        {props.firstName} {props.lastName}
      </div>
      <div className={cssClasses.text}>{props.id}</div>
      <div className={cssClasses.text}>{formattedDate(props.createdAt)}</div>
      <button
        className={cssClasses.btn}
        onClick={onCompleteOrder}
        type="submit"
      >
        Complete Order
      </button>
    </li>
  );
};

export default CheckoutItem;
