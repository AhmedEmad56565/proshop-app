import { Container } from 'react-bootstrap';

import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  return (
    <main className='main-content'>
      <Header />
      <main className='py-3'>
        <Container>
          <h1>Welcome to proshop</h1>
        </Container>
      </main>
      <Footer />
    </main>
  );
}
