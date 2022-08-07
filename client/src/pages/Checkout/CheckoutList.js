import { Fragment } from "react";
import CheckoutItem from "./CheckoutItem";
import { MOCK_CHECKOUT_LIST } from "./MockCheckoutList";
import cssClasses from "./CheckoutList.module.css";

const CheckoutList = () => {
  return (
    <Fragment>
      <div className={cssClasses.h2}>
        <h2>Checkout</h2>
      </div>
      <ul className={cssClasses.list}>
        {MOCK_CHECKOUT_LIST.map((checkout) => {
          return (
            <CheckoutItem
              key={checkout.id}
              id={checkout.id}
              firstName={checkout.customer.first_name}
              lastName={checkout.customer.last_name}
              createdAt={checkout.created_at}
            ></CheckoutItem>
          );
        })}
      </ul>
    </Fragment>
  );
};

export default CheckoutList;
