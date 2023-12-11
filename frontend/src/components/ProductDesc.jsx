import { Row, Col, ListGroup } from 'react-bootstrap';
import Rating from '../components/Rating';

export default function ProductDesc({ product }) {
  return (
    <ListGroup variant='flush' className='rounded'>
      <ListGroup.Item>
        <h3>{product.name}</h3>
      </ListGroup.Item>

      <ListGroup.Item>
        <Rating value={product.rating} text={`${product.numReviews} review`} />
      </ListGroup.Item>

      <ListGroup.Item>
        <Row>
          <Col>
            <strong>price: </strong>
          </Col>
          <Col>${product.price}</Col>
        </Row>
      </ListGroup.Item>

      <ListGroup.Item>
        <strong>Description: </strong>${product.description}
      </ListGroup.Item>
    </ListGroup>
  );
}
