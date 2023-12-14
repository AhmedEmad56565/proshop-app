import { Table } from 'react-bootstrap';
import { useGetOrdersQuery } from '../../store/slices/ordersApiSlice';

import Loader from '../../components/Loader';
import AlertMessage from '../../components/AlertMessage';
import OrdersTable from '../../components/OrdersTable';

export default function OrderList() {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      <h1>Orders</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <AlertMessage variant='danger'>
          {error?.data?.message || 'Error loading orders list'}
        </AlertMessage>
      ) : (
        <Table
          striped
          bordered
          hover
          responsive
          variant='secondary'
          className='table-sm'
        >
          <OrdersTable orders={orders} showUser />
        </Table>
      )}
    </>
  );
}
