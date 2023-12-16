// import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { useGetOrderDetailsQuery } from '../store/slices/ordersApiSlice';

import Loader from '../components/Loader';
import AlertMessage from '../components/AlertMessage';
import OrderDetails from '../components/order-details/OrderDetails';
import OrderSummery from '../components/order-details/OrderSummery';
import Meta from '../components/Meta';

export default function OrderScreen() {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <AlertMessage variant='danger'>
      <p>Error while loading your order</p>
    </AlertMessage>
  ) : (
    <>
      <Meta title='Order Pay' />
      <h1>Order: {order._id}</h1>

      <Row>
        <Col md={8}>
          <OrderDetails order={order} />
        </Col>

        <Col md={4}>
          <OrderSummery order={order} refetch={refetch} orderId={orderId} />
        </Col>
      </Row>
    </>
  );
}
