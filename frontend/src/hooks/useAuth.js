import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../store/slices/usersApiSlice';
import { useRegisterMutation } from '../store/slices/usersApiSlice';
import { setCredintials } from '../store/slices/authSlice';

import { toast } from 'react-toastify';

export default function useAuth(data, loginAuth) {
  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [register, { isLoading: registerLoading }] = useRegisterMutation();

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
      if (loginAuth) {
        const res = await login(data).unwrap();
        dispatch(setCredintials(res));
      } else {
        const res = await register(data).unwrap();
        dispatch(setCredintials(res));
      }
      toast.success(
        loginAuth ? 'Logged in successfully.' : 'Signed up successfully.'
      );
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return {
    handleSubmit,
    redirect,
    loginLoading,
    registerLoading,
  };
}
