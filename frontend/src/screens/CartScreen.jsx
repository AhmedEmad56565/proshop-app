import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import AlertMessage from '../components/AlertMessage';
import CartItemsDetails from '../components/cart-details/CartItemsDetails';
import CartSideDetails from '../components/cart-details/CartSideDetails';

export default function CartScreen() {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <Row>
      <h1 className='mb-4'>Shopping Cart</h1>

      <Col md={8}>
        {cartItems.length === 0 ? (
          <AlertMessage variant='danger'>
            <span>
              Your Cart is empty. <Link to='/'>shop now</Link>
            </span>
          </AlertMessage>
        ) : (
          <CartItemsDetails cartItems={cartItems} />
        )}
      </Col>

      <Col md={4}>
        <CartSideDetails cartItems={cartItems} />
      </Col>
    </Row>
  );
}
