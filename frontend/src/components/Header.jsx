import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../assets/logo.png';

export default function Header() {
  return (
    <header>
      <Navbar bg='primary' variant='dark' expand='md' collapseOnSelect>
        <Container>
          <Navbar.Brand href='#home'>
            <img src={logo} alt='proshop-logo' /> ProShop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='proshop-navbar' />
          <Navbar.Collapse id='proshop-navbar'>
            <Nav className='ms-auto'>
              <Nav.Link href='/cart'>
                <FaShoppingCart /> cart
              </Nav.Link>
              <Nav.Link href='/cart'>
                <FaUser /> Signin
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
