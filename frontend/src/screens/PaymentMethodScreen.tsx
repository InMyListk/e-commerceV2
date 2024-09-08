import { useContext, useEffect, useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { Helmet } from "react-helmet-async";
import { Button, Form } from "react-bootstrap";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";

const PaymentMethodScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { paymentMethod, shippingAddress },
  } = state;
  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || "PayPal"
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("shipping");
    }
  }, [navigate, shippingAddress]);

  const submitHandler = (e: any) => {
    e.preventDefault();
    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", JSON.stringify(paymentMethodName));
    navigate("/placeorder");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="container small-container">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className="my-3">Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              value="PayPal"
              label="PayPal"
              id="PayPal"
              checked={paymentMethodName === "PayPal"}
              onChange={(e: any) => {
                setPaymentMethod(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              value="Stripe"
              label="Stripe"
              id="Stripe"
              checked={paymentMethodName === "Stripe"}
              onChange={(e: any) => {
                setPaymentMethod(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PaymentMethodScreen;
