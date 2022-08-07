import { useNavigate } from "react-router";
import { useEffect } from "react";
import cssClasses from "./Checkout.module.css";
import { useState } from "react";
import { MOCK_CHECKOUT } from "../../test";

const Checkout = (props) => {
  const navigate = useNavigate();

  const [checkout, setCheckout] = useState();

  useEffect(() => {
    const addCheckout = async () => {
      const response = await fetch("http://0.0.0.0:5000/checkout", {
        method: "POST",
        body: JSON.stringify(MOCK_CHECKOUT),
        headers: {
          "content-type": "application/json",
        },
      });

      const data = await response.json();
      setCheckout(data);
    };
    addCheckout();
  }, []);

  const completeOrderHandler = async (event) => {
    event.preventDefault();
    const response = await fetch("http://0.0.0.0:5000/cancel-schedule", {
      method: "POST",
      body: JSON.stringify({ checkoutId: checkout.id }),
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await response.json();

    console.log("data", data);
    navigate("/home");
  };

  const cancelHandler = (event) => {
    event.preventDefault();
    navigate("/Home");
  };

  if (!checkout) {
    console.log("abaoned", checkout);
    return <h2>Loading...</h2>;
  }

  const discountCodes = checkout.discount_codes.map((code) => (
    <li key={code.discount_code.id}>{code.discount_code.code}</li>
  ));

  return (
    <div className={cssClasses.checkout}>
      <div>
        <h3>Your Shipping Address</h3>
        <div>
          <h4>
            {checkout.shipping_address.first_name}
            {checkout.shipping_address.last_name}
          </h4>
          {checkout.shipping_address.address1},
          {checkout.shipping_address.address2},<br />
          {checkout.shipping_address.province},{checkout.shipping_address.city}-
          {checkout.shipping_address.zip}.<br />
          {checkout.shipping_address.country}
        </div>
        <hr></hr>
        <div>
          EMAIL : {checkout.email}
          <br />
          PHONE : {checkout.phone.phone}
        </div>
        <br />
        <hr />
        <h4>Products</h4>
        <table className={cssClasses.table}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Variant</th>
              <th>Vendor</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{checkout.line_items.title}</td>
              <td>{checkout.line_items.variant_title}</td>
              <td>{checkout.line_items.vendor}</td>
              <td>{checkout.line_items.price}</td>
              <td>{checkout.line_items.quantity}</td>
            </tr>
          </tbody>
        </table>
        <hr />
        <ul>
          <h4>Applied Discount Codes</h4>
          {discountCodes}
        </ul>
        <hr />
        <h4>
          Total Price: {checkout.currency.currency}
          {checkout.total_price}
        </h4>
        <hr />
        <button
          onClick={cancelHandler}
          className={cssClasses.cancel}
          type="submit"
        >
          Cancel
        </button>
        <button
          onClick={completeOrderHandler}
          className={cssClasses.btn}
          type="submit"
        >
          Complete Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
