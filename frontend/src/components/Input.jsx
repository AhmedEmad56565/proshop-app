import { Form } from 'react-bootstrap';

export default function Input({
  controlId,
  label,
  type,
  name,
  placeholder,
  err,
  errText,
  ...props
}) {
  return (
    <Form.Group className='my-2' controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        className={err ? 'invalid_input' : ''}
        type={type}
        name={name}
        placeholder={placeholder}
        required
        {...props}
      />
      {err && <span className='text-danger fs-6'>{errText}</span>}
    </Form.Group>
  );
}
