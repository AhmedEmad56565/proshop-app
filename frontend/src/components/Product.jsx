import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

export default function Product({ product }) {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img variant='top' src={product.image} alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div' className='product-title'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='h3'>${product.price}</Card.Text>
        <Rating
          value={product.rating}
          text={`(${product.numReviews}) review`}
        />
      </Card.Body>
    </Card>
  );
}
