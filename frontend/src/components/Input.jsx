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
      <Form.Label className={err ? 'text-danger' : ''}>{label}</Form.Label>
      <Form.Control
        className={err ? 'invalid_input' : ''}
        type={type}
        name={name}
        placeholder={placeholder}
        required
        {...props}
      />
      {err && <small className='text-danger'>{errText}</small>}
    </Form.Group>
  );
}
