import { useParams } from 'react-router-dom';
import { Table, Row, Col } from 'react-bootstrap';
import { useGetOrdersQuery } from '../../store/slices/ordersApiSlice';

import Loader from '../../components/Loader';
import AlertMessage from '../../components/AlertMessage';
import OrdersTable from '../../components/OrdersTable';
import AdminPaginate from './AdminPaginate';

export default function OrderList() {
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetOrdersQuery({ pageNumber });

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
        <>
          <Table
            striped
            bordered
            hover
            responsive
            variant='secondary'
            className='table-sm'
          >
            <OrdersTable orders={data.orders} showUser />
          </Table>

          {/* <Row className={'justify-content-md-center'}> */}
          <Row className={'justify-content-center'}>
            <Col md={6}>
              {!isLoading && (
                <AdminPaginate
                  pages={data.pages}
                  page={data.page}
                  routeName='order'
                />
              )}
            </Col>
          </Row>
        </>
      )}
    </>
  );
}
