import { useParams } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from '../../store/slices/productsApiSlice';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import AlertMessage from '../../components/AlertMessage';
import AdminPaginate from './AdminPaginate';

export default function ProductList() {
  const { pageNumber } = useParams();
  const { data, refetch, isLoading, error } = useGetProductsQuery({
    pageNumber,
  });

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  function handleAddProduct() {
    Swal.fire({
      title: 'Are you sure you want to add a new product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#303d4a',
      cancelButtonColor: '#e74c3c',
      confirmButtonText: 'Yes',
    })
      .then((result) => {
        if (result.isConfirmed) {
          createProduct();
          refetch();
          toast.success('Product added successfully');
        }
      })
      .catch((err) => {
        toast.error(err?.data?.message || 'Error while creating product!');
      });
  }

  function handleDeleteProduct(id) {
    Swal.fire({
      title: 'Are you sure you want to add a delete this product?',
      icon: 'danger',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#303d4a',
      confirmButtonText: 'Yes, delete it.',
    })
      .then((result) => {
        if (result.isConfirmed) {
          deleteProduct(id);
          refetch();
          window.location.reload(false);
          toast.success('Product deleted successfully');
        }
      })
      .catch((err) => {
        toast.error(err?.data?.message || 'Error while deleting product!');
      });
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3' onClick={handleAddProduct}>
            <FaPlus /> Create Product
          </Button>
        </Col>
      </Row>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <AlertMessage variant='danger'>
          {error?.data?.message || 'Error loading products list'}
        </AlertMessage>
      ) : (
        <>
          <Table
            striped
            bordered
            hover
            responsive
            variant='secondary'
            className='table-sm'
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm mx-2'>
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      <FaTrash style={{ color: 'white' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* <Row className={'justify-content-md-center'}> */}
          <Row className={'justify-content-center'}>
            <Col md={6}>
              {!isLoading && (
                <AdminPaginate
                  pages={data.pages}
                  page={data.page}
                  routeName='product'
                />
              )}
            </Col>
          </Row>

          {loadingCreate && <Loader />}
          {loadingDelete && <Loader />}
        </>
      )}
    </>
  );
}
