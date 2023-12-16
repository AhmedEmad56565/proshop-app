import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';

import FormContainer from '../components/FormContainer';
import useInput from '../hooks/useInput';
import Input from '../components/Input';
import Loader from '../components/Loader';
import useAuth from '../hooks/useAuth';
import Meta from '../components/Meta';

export default function LoginScreen() {
  const {
    val: emailVal,
    inputValIsInvalid: emailValIsInvalid,
    changeFunc: handleEmailChange,
    blurFunc: handleEmailBlur,
    err: emailError,
  } = useInput('', (val) => val.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g));

  const {
    val: passwordVal,
    inputValIsInvalid: passwordValIsInvalid,
    changeFunc: handlePasswordChange,
    blurFunc: handlePasswordBlur,
    err: passwordError,
  } = useInput(
    '',
    (val) => val.trim().length > 5
    // (val) => !val.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g)
  );

  const { handleSubmit, redirect, loginLoading } = useAuth(
    {
      email: emailVal,
      password: passwordVal,
    },
    true
  );

  let formIsInvalid = true;
  if (!emailValIsInvalid && !passwordValIsInvalid) {
    formIsInvalid = false;
  }

  return (
    <FormContainer>
      <Meta title='Login Page' />
      <h1>Log in</h1>

      <Form onSubmit={handleSubmit}>
        <Input
          controlId='email'
          label='Email Address'
          type='email'
          name='email'
          placeholder='Enter email'
          err={emailError}
          required
          errText='Please enter valid Email Address'
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
          required
          errText='Please enter valid Password (contain numbers and characters)'
          value={passwordVal}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
        />

        <Button
          type='submit'
          className='mt-1 mb-2'
          disabled={loginLoading || formIsInvalid}
        >
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

      {loginLoading && <Loader />}
    </FormContainer>
  );
}
