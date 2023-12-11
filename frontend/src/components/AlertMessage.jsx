import { Alert } from 'react-bootstrap';

export default function AlertMessage({ variant = 'info', children }) {
  return (
    <Alert key={variant} variant={variant}>
      {children}
    </Alert>
  );
}
