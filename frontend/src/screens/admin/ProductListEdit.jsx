import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import {
  useUpdateProductMutation,
  useGetSingleProductQuery,
  useUploadProductImageMutation,
} from '../../store/slices/productsApiSlice';

import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import AlertMessage from '../../components/AlertMessage';

export default function ProductListEdit() {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetSingleProductQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const navigate = useNavigate();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  async function uploadFileHandler(e) {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      setImage(res.image);
      toast.success(res.message || 'Image successfully uploaded');
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to upload image!');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      });
      refetch();
      toast.success('Product updated successfully');
      navigate('/admin/product-list');
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to update product');
    }
  }

  return (
    <>
      <Link to='/admin/product-list' className='btn btn-primary my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit Product</h1>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <AlertMessage variant='danger'>{error.data.message}</AlertMessage>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='name' className='mb-2'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                required
                // minLength='10'
                // maxLength='40'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='price' className='mb-2'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                required
                // min='0'
                // max='5000'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='image' className='my-2'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                className='mb-1'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <Form.Control
                label='Choose File'
                type='file'
                onChange={uploadFileHandler}
              />
            </Form.Group>
            {loadingUpload && <Loader />}

            <Form.Group controlId='brand' className='mb-2'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                required
                // minLength='5'
                // maxLength='20'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                required
                // min='0'
                // max='1000'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='category' className='mb-2'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                required
                // minLength='5'
                // maxLength='20'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                required
                // minLength='20'
                // maxLength='100'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Button
              type='submit'
              variant='primary'
              style={{ marginTop: '1rem' }}
            >
              Update
            </Button>

            {loadingUpdate && <Loader />}
          </Form>
        )}
      </FormContainer>
    </>
  );
}
