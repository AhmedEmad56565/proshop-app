import { Row, Col } from 'react-bootstrap';

import ProfileForm from '../components/profile/ProfileForm';
import ProfileOrdersDetails from '../components/profile/ProfileOrdersDetails';

export default function ProfileScreen() {
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        <ProfileForm />
      </Col>

      <Col md={9}>
        <h2>My Orders</h2>
        <ProfileOrdersDetails />
      </Col>
    </Row>
  );
}
