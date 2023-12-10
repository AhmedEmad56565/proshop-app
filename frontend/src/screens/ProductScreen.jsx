import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import axios from 'axios';

import Rating from '../components/Rating';

export default function ProductScreen() {
  const [product, setProduct] = useState({});
  const { id: productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${productId}`);
      setProduct(data);
    };

    fetchProduct();
  }, [productId]);

  return (
    <>
      <Link className='btn btn-primary my-3' to='/'>
        Go Back
      </Link>

      <Row>
        <Col md={5} className='mb-3'>
          <Image
            src={product.image}
            alt={product.name}
            fluid
            rounded
            border={'1px solid'}
          />
        </Col>
        <Col md={4} className='mb-3'>
          <ListGroup variant='flush' className='rounded'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} review`}
              />
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
        </Col>

        <Col md={3} className='mb-3'>
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
                  <Col>
                    {product.countInStock > 0 ? 'In stock' : 'Out of stock'}
                  </Col>
                </Row>
              </ListGroup.Item>

              {/* <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Qty: </strong>
                  </Col>
                  <Col>
                    <select name='quantity' id='quantity'>
                      {[...Array(product.countInStock).keys()].map((i) => (
                        <option value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                  </Col>
                </Row>
              </ListGroup.Item> */}

              <ListGroup.Item>
                <Button className='w-100'>Add To Cart</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}
