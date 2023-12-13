import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image } from 'react-bootstrap';

import AlertMessage from '../AlertMessage';

export default function PlaceOrderDetails({ cart }) {
  return (
    <ListGroup variant='flush' className='rounded mb-2'>
      <ListGroup.Item className='mb-1'>
        <h2>Shipping</h2>
        <p>
          <strong>Address: </strong>
          {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
          {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
        </p>
      </ListGroup.Item>

      <ListGroup.Item className='mb-1'>
        <h2>Payment Method</h2>
        <strong>Method: </strong>
        {cart.paymentMethod}
      </ListGroup.Item>

      <ListGroup.Item className='mb-1'>
        <h2>Order Items</h2>
        {cart.cartItems.length === 0 ? (
          <AlertMessage>Your cart is empty</AlertMessage>
        ) : (
          <ListGroup variant='flush'>
            {cart.cartItems.map((item, index) => (
              <ListGroup.Item key={index}>
                <Row>
                  <Col md={1}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={4}>
                    {item.qty} x ${item.price} = ${item.qty * item.price}
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </ListGroup.Item>
    </ListGroup>
  );
}
