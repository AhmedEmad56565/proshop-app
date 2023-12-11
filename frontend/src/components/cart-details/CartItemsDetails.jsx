import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../store/slices/cartSlice';
import { Row, Col, Button, Image, Form, ListGroup } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

export default function CartItemsDetails({ cartItems }) {
  const dispatch = useDispatch();

  function handleAddToCart(item, qty) {
    dispatch(addToCart({ ...item, qty }));
  }

  function handleRemoveFromCart(id) {
    dispatch(removeFromCart(id));
  }

  return (
    <ListGroup variant='flush' className='mb-2'>
      {cartItems.map((item) => (
        <ListGroup.Item key={item._id} className='rounded mb-1'>
          <Row className='align-items-center gy-2'>
            <Col md={2}>
              <Image src={item.image} alt={item.name} fluid rounded />
            </Col>
            <Col md={3}>
              <Link to={`/product/${item._id}`}>{item.name}</Link>
            </Col>
            <Col md={2}>
              <strong>${item.price}</strong>
            </Col>
            <Col md={3}>
              <Form.Control
                as='select'
                name='quantity'
                id='quantity'
                value={item.qty}
                onChange={(e) => handleAddToCart(item, Number(e.target.value))}
              >
                {[...Array(item.countInStock).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </Form.Control>
            </Col>
            <Col md={2}>
              <Button
                type='button'
                variant='light'
                rounded='true'
                onClick={() => handleRemoveFromCart(item._id)}
              >
                <FaTrash className='text-danger' />
              </Button>
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
