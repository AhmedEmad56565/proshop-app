import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../store/slices/usersApiSlice';
import { setCredintials } from '../store/slices/authSlice';

import FormContainer from '../components/FormContainer';
import useInput from '../hooks/useInput';
import Input from '../components/Input';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

export default function LoginScreen() {
  const {
    val: emailVal,
    changeFunc: handleEmailChange,
    blurFunc: handleEmailBlur,
    err: emailError,
  } = useInput('', (val) => val.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g));

  const {
    val: passwordVal,
    changeFunc: handlePasswordChange,
    blurFunc: handlePasswordBlur,
    err: passwordError,
  } = useInput(
    '',
    (val) => val.length > 5
    // (val) => !val.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g)
  );

  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await login({
        email: emailVal,
        password: passwordVal,
      }).unwrap();
      dispatch(setCredintials(res));
      toast.success('Logged in successfully.');
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <FormContainer>
      <h1>Log in</h1>

      <Form onSubmit={handleSubmit}>
        <Input
          controlId='email'
          label='Email Address'
          type='email'
          name='email'
          placeholder='Enter email'
          err={emailError}
          errText='Please enter valid Email Address'
          required
          value={emailVal}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
        />

        <Input
          controlId='password'
          label='Password'
          type='password'
          name='password'
          placeholder='Enter password'
          err={passwordError}
          errText='Please enter valid Password (contain numbers and characters)'
          required
          value={passwordVal}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
        />

        <Button type='submit' className='mt-1 mb-2' disabled={isLoading}>
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>

      {isLoading && <Loader />}
    </FormContainer>
  );
}
