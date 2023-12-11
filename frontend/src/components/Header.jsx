import { useSelector } from 'react-redux';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../assets/logo.png';

export default function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header>
      <Navbar bg='primary' variant='dark' expand='md' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img src={logo} alt='proshop-logo' /> ProShop
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='proshop-navbar' />
          <Navbar.Collapse id='proshop-navbar'>
            <Nav className='ms-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <FaShoppingCart /> cart{' '}
                  {totalQty > 0 && (
                    <Badge bg='info' pill>
                      {totalQty}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to='/login'>
                <Nav.Link>
                  <FaUser /> Signin
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
