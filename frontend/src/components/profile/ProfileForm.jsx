import { useSelector, useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { useUpdateUserProfileMutation } from '../../store/slices/usersApiSlice';
import { setCredintials } from '../../store/slices/authSlice';
import { toast } from 'react-toastify';

import useInput from '../../hooks/useInput';
import Input from '../Input';
import Loader from '../Loader';

export default function ProfileForm() {
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useUpdateUserProfileMutation();

  const {
    val: namelVal,
    changeFunc: handleNameChange,
    blurFunc: handleNameBlur,
    err: nameError,
  } = useInput(userInfo.name, (val) => val.trim().length > 5);

  const {
    val: emailVal,
    changeFunc: handleEmailChange,
    blurFunc: handleEmailBlur,
    err: emailError,
  } = useInput(userInfo.email, (val) =>
    val.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)
  );

  const {
    val: passwordVal,
    changeFunc: handlePasswordChange,
    blurFunc: handlePasswordBlur,
    err: passwordError,
  } = useInput(
    '',
    (val) => val.trim().length > 5
    // (val) => !val.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g)
  );

  const {
    val: confirmPasswordVal,
    changeFunc: handleConfirmPasswordChange,
    blurFunc: handleConfirmPasswordBlur,
    err: confirmPassworddError,
  } = useInput('', (val) => val.match(passwordVal));

  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const dataForm = {
        name: namelVal,
        email: emailVal,
        password: passwordVal,
      };
      const res = await updateProfile(dataForm).unwrap();
      dispatch(setCredintials(res));
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(err?.error?.message || 'Error while updating user!');
    }
  }

  return (
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

      <Button type='submit' variant='primary' className='w-100 mt-2'>
        Update
      </Button>

      {isLoading && <Loader />}
    </Form>
  );
}
