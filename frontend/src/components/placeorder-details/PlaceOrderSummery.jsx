import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Row, Col, ListGroup, Card } from 'react-bootstrap';
import { useCreateOrderMutation } from '../../store/slices/ordersApiSlice';
import { resetCart } from '../../store/slices/cartSlice';
import { toast } from 'react-toastify';

import Loader from '../Loader';

export default function PlaceOrderSummery({ cart }) {
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      dispatch(resetCart());
      toast.success('Order created successfully.');
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Card>
      <ListGroup variant='flush'>
        <ListGroup.Item>
          <h2>Order Summary</h2>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>Items</Col>
            <Col>${cart.itemsPrice}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>Shipping</Col>
            <Col>${cart.shippingPrice}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>Tax</Col>
            <Col>${cart.taxPrice}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>Total</Col>
            <Col>${cart.totalPrice}</Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Button
            type='button'
            className='w-100'
            disabled={cart.cartItems === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </Button>
        </ListGroup.Item>
        {isLoading && <Loader />}
      </ListGroup>
    </Card>
  );
}
