import { Spinner } from 'react-bootstrap';

export default function Loader() {
  return (
    <div
      style={{
        height: '45vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spinner
        animation='border'
        role='status'
        style={{ width: '100px', height: '100px', display: 'block' }}
      />
      ;
    </div>
  );
}
