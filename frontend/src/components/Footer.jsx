import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='bg-primary text-white'>
      <Container>
        <Row>
          <Col className='py-3 text-center'>
            <p className='m-0'>ProShop &copy; {year}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
