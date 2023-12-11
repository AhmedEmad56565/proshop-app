import { Row, Col } from 'react-bootstrap';
import { useGetProductsQuery } from '../store/slices/productsApiSlice.js';

import Product from '../components/Product.jsx';
import Loader from '../components/Loader.jsx';
import AlertMessage from '../components/AlertMessage.jsx';

export default function HomeScreen() {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      <h1>Latest Products</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <AlertMessage variant='danger'>
          <p>{error?.data?.message || error.error}</p>
        </AlertMessage>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}
