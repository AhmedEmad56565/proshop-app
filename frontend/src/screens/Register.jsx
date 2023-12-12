import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';

import FormContainer from '../components/FormContainer';
import useInput from '../hooks/useInput';
import Input from '../components/Input';
import Loader from '../components/Loader';
import useAuth from '../hooks/useAuth';

export default function Register() {
  const {
    val: namelVal,
    changeFunc: handleNameChange,
    blurFunc: handleNameBlur,
    err: nameError,
  } = useInput('', (val) => val.length > 5);

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

  const {
    val: confirmPasswordVal,
    changeFunc: handleConfirmPasswordChange,
    blurFunc: handleConfirmPasswordBlur,
    err: confirmPassworddError,
  } = useInput('', (val) => val.match(passwordVal));

  const { handleSubmit, redirect, registerLoading } = useAuth(
    {
      name: namelVal,
      email: emailVal,
      password: passwordVal,
    },
    false
  );

  return (
    <FormContainer>
      <h1>Register</h1>

      <Form onSubmit={handleSubmit}>
        <Input
          controlId='name'
          label='Name'
          type='text'
          name='name'
          placeholder='Enter your name'
          err={nameError}
          errText='Please enter valid name (at least 6 characters)'
          value={namelVal}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
        />

        <Input
          controlId='email'
          label='Email Address'
          type='email'
          name='email'
          placeholder='Enter email'
          err={emailError}
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
          errText='Please enter valid Password (contain numbers and characters)'
          value={passwordVal}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
        />

        <Input
          controlId='confirm-password'
          label='Confirm Password'
          type='password'
          name='confirm-password'
          placeholder='Confirm your password'
          err={confirmPassworddError}
          errText='The password you entered in not the same.'
          value={confirmPasswordVal}
          onChange={handleConfirmPasswordChange}
          onBlur={handleConfirmPasswordBlur}
        />

        <Button type='submit' className='mt-1 mb-2' disabled={registerLoading}>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Already have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>

      {registerLoading && <Loader />}
    </FormContainer>
  );
}
