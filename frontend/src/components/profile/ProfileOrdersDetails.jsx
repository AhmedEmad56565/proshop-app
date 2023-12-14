import { Table } from 'react-bootstrap';
import { useGetMyOrdersQuery } from '../../store/slices/ordersApiSlice';

import Loader from '../Loader';
import AlertMessage from '../AlertMessage';
import OrdersTable from '../OrdersTable';

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
      <OrdersTable orders={orders} />
    </Table>
  );
}
