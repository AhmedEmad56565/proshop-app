import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Col, ListGroup, Form, Button } from 'react-bootstrap';
import { useCreateProductReviewMutation } from '../../store/slices/productsApiSlice';
import { toast } from 'react-toastify';

import Loader from '../Loader';
import AlertMessage from '../AlertMessage';
import Rating from '../Rating';

export default function ProductReview({ product, productId, refetch }) {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingReview }] =
    useCreateProductReviewMutation();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await createReview({ productId, rating, comment }).unwrap();
      refetch();
      setRating(1);
      toast.success(res.message || 'Review successfully added.');
    } catch (err) {
      toast.error(err?.data?.message || 'Error creating review!');
    }
  }
  return (
    <Col md={6} className='review'>
      <h2>Reviews</h2>
      {product.reviews.length === 0 ? (
        <AlertMessage>No Reviews yet</AlertMessage>
      ) : (
        <ListGroup variant='flush' className='mb-2'>
          {product.reviews.map((review) => (
            <ListGroup.Item key={review.user}>
              <strong>{review.name}</strong>
              <Rating value={review.rating} />
              <p className='mt-1'>{review.createdAt.substring(0, 10)}</p>
              <hr />
              <p>- {review.comment}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      <ListGroup>
        <ListGroup.Item>
          <AlertMessage>
            <strong className='fs-3'>Write a Customer Review.</strong>
          </AlertMessage>

          {!userInfo ? (
            <AlertMessage>
              please{' '}
              <Link to={`/login?redirect=/product/${product._id}`}>Signin</Link>{' '}
              to write a review
            </AlertMessage>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId='rating'>
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  as='select'
                  required
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value='1'>1 - Poor</option>
                  <option value='2'>2 - Fair</option>
                  <option value='3'>3 - Good</option>
                  <option value='4'>4 - Very Good</option>
                  <option value='5'>5 - Excellent</option>
                </Form.Control>
              </Form.Group>

              <Form.Group className='my-2' controlId='comment'>
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as='textarea'
                  row='3'
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Form.Group>

              <Button type='submit' disabled={loadingReview}>
                submit
              </Button>

              {loadingReview && <Loader />}
            </Form>
          )}
        </ListGroup.Item>
      </ListGroup>
    </Col>
  );
}
