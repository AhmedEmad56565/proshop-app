import { Table, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useGetMyOrdersQuery } from '../../store/slices/ordersApiSlice';

import Loader from '../Loader';
import AlertMessage from '../AlertMessage';

export default function ProfileOrdersDetails() {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return isLoading ? (
    <Loader />
  ) : error ? (
    <AlertMessage>
      <p>{error?.data?.message || error.error}</p>
    </AlertMessage>
  ) : (
    <Table striped hover responsive variant='secondary' className='table-sm'>
      <thead>
        <tr>
          <th>ID</th>
          <th>DATE</th>
          <th>TOTAL</th>
          <th>PAID</th>
          <th>DELIVERED</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {orders.map((order) => (
          <tr key={order._id}>
            <td>{order._id}</td>
            <td>{order.createdAt.substring(0, 10)}</td>
            <td>{order.totalPrice}</td>
            <td>
              {' '}
              {order.isPaid ? (
                order.paidAt.substring(0, 10)
              ) : (
                <FaTimes style={{ color: 'red' }} />
              )}
            </td>
            <td>
              {order.isDelivered ? (
                order.deliveredAt.substring(0, 10)
              ) : (
                <FaTimes style={{ color: 'red' }} />
              )}
            </td>
            <td>
              <LinkContainer to={`/order/${order._id}`}>
                <Button className='btn-sm'>Details</Button>
              </LinkContainer>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
