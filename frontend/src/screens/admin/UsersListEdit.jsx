import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from '../../store/slices/usersApiSlice';
import { toast } from 'react-toastify';

import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import AlertMessage from '../../components/AlertMessage';

export default function UsersListEdit() {
  const { id } = useParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const { data: user, refetch, isLoading, error } = useGetUserByIdQuery(id);
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  async function submitHandler(e) {
    e.preventDefault();

    try {
      await updateUser({ id, name, email, isAdmin });
      toast.success('user updated successfully');
      refetch();
      navigate('/admin/user-list');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <>
      <Link to='/admin/user-list' className='btn btn-primary my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit User</h1>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <AlertMessage variant='danger'>
            {error?.data?.message || error.error}
          </AlertMessage>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className='my-2' controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='my-2' controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='my-2' controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
        {loadingUpdate && <Loader />}
      </FormContainer>
    </>
  );
}
