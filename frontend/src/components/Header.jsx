import { Navbar, Container } from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';
import logo from '../assets/logo.png';
import HeaderNavbar from './Navbar';

export default function Header() {
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
            <HeaderNavbar />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
