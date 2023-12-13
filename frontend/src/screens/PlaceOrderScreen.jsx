import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import CheckoutSteps from '../components/CheckoutSteps';
import PlaceOrderDetails from '../components/placeorder-details/PlaceOrderDetails';
import PlaceOrderSummery from '../components/placeorder-details/PlaceOrderSummery';

export default function PlaceOrderScreen() {
  const cart = useSelector((state) => state.cart);

  const navigate = useNavigate();
  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [
    cart.cartItems,
    cart.paymentMethod,
    cart.shippingAddress.address,
    navigate,
  ]);

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />

      <Row>
        <Col md={8}>
          <PlaceOrderDetails cart={cart} />
        </Col>

        <Col md={4}>
          <PlaceOrderSummery cart={cart} />
        </Col>
      </Row>
    </>
  );
}
