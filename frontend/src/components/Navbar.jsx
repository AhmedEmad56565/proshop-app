import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { useLogoutMutation } from '../store/slices/usersApiSlice';
import { logout } from '../store/slices/authSlice';
import { resetCart } from '../store/slices/cartSlice';

import { Nav, Badge, Dropdown, DropdownButton } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import SearchBox from './SearchBox';

export default function HeaderNavbar() {
  const { cartItems } = useSelector((state) => state.cart);
  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutUser] = useLogoutMutation();

  async function handleLogout() {
    try {
      const res = await logoutUser().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      toast.success(res?.message || 'Logged out successfully.');
      navigate('/login');
    } catch (error) {
      toast.error('something went wrong');
    }
  }

  return (
    <Nav className='ms-auto align-items-md-center'>
      <SearchBox />
      <LinkContainer to='/cart'>
        <Nav.Link>
          <FaShoppingCart /> cart{' '}
          {totalQty > 0 && (
            <Badge bg='info' pill>
              {totalQty}
            </Badge>
          )}
        </Nav.Link>
      </LinkContainer>

      {userInfo && !userInfo.isAdmin ? (
        <DropdownButton
          size='sm'
          id='user-dropdown'
          title={userInfo.name}
          variant='info'
        >
          <LinkContainer to='/profile'>
            <Dropdown.Item>Profile</Dropdown.Item>
          </LinkContainer>
          <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
        </DropdownButton>
      ) : userInfo && userInfo.isAdmin ? (
        <DropdownButton
          size='sm'
          id='user-dropdown'
          title={userInfo.name}
          variant='info'
        >
          <LinkContainer to='/admin/product-list'>
            <Dropdown.Item className='py-1 mb-1'>Products</Dropdown.Item>
          </LinkContainer>

          <LinkContainer to='/admin/user-list'>
            <Dropdown.Item className='py-1 mb-1'>Users</Dropdown.Item>
          </LinkContainer>

          <LinkContainer to='/admin/order-list'>
            <Dropdown.Item className='py-1 mb-1'>Orders</Dropdown.Item>
          </LinkContainer>

          <Dropdown.Divider />

          <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
        </DropdownButton>
      ) : (
        <LinkContainer to='/login'>
          <Nav.Link>
            <FaUser /> Login
          </Nav.Link>
        </LinkContainer>
      )}
    </Nav>
  );
}
