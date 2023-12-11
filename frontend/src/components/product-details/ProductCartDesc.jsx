import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { Row, Col, ListGroup, Card, Button, Form } from 'react-bootstrap';

export default function ProductCartDesc({ product }) {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleAddToCart() {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  }

  return (
    <Card>
      <ListGroup variant='flush'>
        <ListGroup.Item>
          <Row>
            <Col>
              <strong>price: </strong>
            </Col>
            <Col>${product.price}</Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>
              <strong>status: </strong>
            </Col>
            <Col>{product.countInStock > 0 ? 'In stock' : 'Out of stock'}</Col>
          </Row>
        </ListGroup.Item>

        {product.countInStock > 0 && (
          <ListGroup.Item>
            <Row>
              <Col>
                <strong>Qty: </strong>
              </Col>
              <Col>
                <Form.Control
                  as='select'
                  name='quantity'
                  id='quantity'
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                >
                  {[...Array(product.countInStock).keys()].map((i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Row>
          </ListGroup.Item>
        )}

        <ListGroup.Item>
          <Button className='w-100' onClick={handleAddToCart}>
            Add To Cart
          </Button>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}
