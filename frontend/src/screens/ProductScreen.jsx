import { useParams, Link } from 'react-router-dom';
import { Row, Col, Image } from 'react-bootstrap';
import { useGetSingleProductQuery } from '../store/slices/productsApiSlice';

import Loader from '../components/Loader';
import AlertMessage from '../components/AlertMessage';
import ProductDesc from '../components/product-details/ProductDesc';
import ProductCartDesc from '../components/product-details/ProductCartDesc';
import ProductReview from '../components/product-details/ProductReview';

export default function ProductScreen() {
  const { id: productId } = useParams();

  const {
    data: product,
    refetch,
    isLoading,
    error,
  } = useGetSingleProductQuery(productId);

  return (
    <>
      <Link className='btn btn-primary my-3' to='/'>
        Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <AlertMessage variant='danger'>
          <p>{error?.data?.message || error.error}</p>
        </AlertMessage>
      ) : (
        <>
          <Row>
            <Col md={5} className='mb-3'>
              <Image
                src={product.image}
                alt={product.name}
                fluid
                rounded
                border={'1px solid'}
              />
            </Col>

            <Col md={4} className='mb-3'>
              <ProductDesc product={product} />
            </Col>

            <Col md={3} className='mb-3'>
              <ProductCartDesc product={product} />
            </Col>
          </Row>

          <Row>
            <ProductReview
              product={product}
              productId={productId}
              refetch={refetch}
            />
          </Row>
        </>
      )}
    </>
  );
}
