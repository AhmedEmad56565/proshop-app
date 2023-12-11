import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col, Button, ListGroup, Card } from 'react-bootstrap';

export default function CartSideDetails({ cartItems }) {
  const navigate = useNavigate();

  const { itemsPrice } = useSelector((state) => state.cart);
  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

  function handleCheckout() {
    navigate('/login?redirect=/shipping');
  }

  return (
    <Card>
      <ListGroup variant='flush'>
        <ListGroup.Item>
          <h2>
            {cartItems.length !== 0
              ? `Subtotal (${totalQty}) items`
              : 'No Items to show'}
          </h2>
          {cartItems.length !== 0 && (
            <Row>
              <Col>Items Price:</Col>
              <Col>
                <strong>${itemsPrice}</strong>
              </Col>
            </Row>
          )}
        </ListGroup.Item>
        <ListGroup.Item>
          <Button
            type='button'
            className='w-100'
            disabled={cartItems.length === 0}
            onClick={handleCheckout}
          >
            Proceed To Checkout
          </Button>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}
