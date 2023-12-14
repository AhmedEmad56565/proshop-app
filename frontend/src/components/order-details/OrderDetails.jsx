import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image } from 'react-bootstrap';

import AlertMessage from '../AlertMessage';

export default function OrderDetails({ order }) {
  return (
    <ListGroup variant='flush' className='rounded mb-2'>
      <ListGroup.Item>
        <h2>Shipping</h2>
        <p>
          <strong>Name: </strong> {order.user.name}
        </p>
        <p>
          <strong>Email: </strong> {order.user.email}
        </p>
        <p>
          <strong>Address: </strong>
          {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
          {order.shippingAddress.postalCode}, {order.shippingAddress.country}
        </p>
        {order.isDelivered ? (
          <AlertMessage variant='success'>
            Delivered on {order.deliveredAt}
          </AlertMessage>
        ) : (
          <AlertMessage variant='danger'>Not Delivered</AlertMessage>
        )}
      </ListGroup.Item>

      <ListGroup.Item>
        <h2>Payment Method</h2>
        <p>
          <strong>Method: </strong>
          {order.paymentMethod}
        </p>
        {order.isPaid ? (
          <AlertMessage variant='success'>Paid on {order.paidAt}</AlertMessage>
        ) : (
          <AlertMessage variant='danger'>Not Paid</AlertMessage>
        )}
      </ListGroup.Item>

      <ListGroup.Item>
        <h2>Order Items</h2>

        {order.orderItems.map((item, index) => (
          <ListGroup.Item key={index}>
            <Row>
              <Col md={1}>
                <Image src={item.image} alt={item.name} fluid rounded />
              </Col>
              <Col>
                <Link to={`/product/${item.product}`}>{item.name}</Link>
              </Col>
              <Col md={4}>
                {item.qty} x ${item.price} = ${item.qty * item.price}
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup.Item>
    </ListGroup>
  );
}
