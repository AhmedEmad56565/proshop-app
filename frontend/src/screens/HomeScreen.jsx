import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { useGetProductsQuery } from '../store/slices/productsApiSlice.js';

import Product from '../components/Product.jsx';
import Loader from '../components/Loader.jsx';
import AlertMessage from '../components/AlertMessage.jsx';
import Paginate from '../components/Paginate.jsx';
import ProductsCarousel from '../components/Carousel.jsx';

export default function HomeScreen() {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    pageNumber,
    keyword,
  });

  return (
    <>
      {!keyword && <ProductsCarousel />}
      <h1>Latest Products</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <AlertMessage variant='danger'>
          <p>{error?.data?.message || error.error}</p>
        </AlertMessage>
      ) : (
        <>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} xs={12} sm={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>

          <Row className={'justify-content-center'}>
            <Col md={6}>
              <Paginate pages={data.pages} page={data.page} keyword={keyword} />
            </Col>
          </Row>
        </>
      )}
    </>
  );
}
