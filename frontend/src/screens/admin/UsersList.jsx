import { useParams } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import AlertMessage from '../../components/AlertMessage';
import Loader from '../../components/Loader';
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from '../../store/slices/usersApiSlice';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import AdminPaginate from './AdminPaginate';

export default function UsersList() {
  const { pageNumber } = useParams();
  const { data, refetch, isLoading, error } = useGetUsersQuery({ pageNumber });
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  async function deleteHandler(id) {
    Swal.fire({
      title: 'Are you sure you want to add a delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#303d4a',
      confirmButtonText: 'Yes, delete it.',
    })
      .then((result) => {
        if (result.isConfirmed) {
          deleteUser(id);
          refetch();
          // window.location.reload(false);
          toast.success('User deleted successfully');
        }
      })
      .catch((err) => {
        toast.error(err?.data?.message || 'Error while deleting user!');
      });
  }

  return (
    <>
      <h1>Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <AlertMessage variant='danger'>
          {error?.data?.message || error.error}
        </AlertMessage>
      ) : (
        <>
          <Table
            striped
            bordered
            hover
            responsive
            className='table-sm'
            variant='secondary'
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {data.users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <FaCheck style={{ color: 'green' }} />
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    {!user.isAdmin && (
                      <>
                        <LinkContainer
                          to={`/admin/user/${user._id}/edit`}
                          style={{ marginRight: '10px' }}
                        >
                          <Button variant='light' className='btn-sm'>
                            <FaEdit />
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(user._id)}
                        >
                          <FaTrash style={{ color: 'white' }} />
                        </Button>
                      </>
                    )}
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
                  routeName='user'
                />
              )}
            </Col>
          </Row>
        </>
      )}

      {loadingDelete && <Loader />}
    </>
  );
}
