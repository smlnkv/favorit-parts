import { Alert } from 'react-bootstrap';

export function ErrorBox({ error }) {
  if (!error) return null;

  return (
    <Alert variant="danger" className="mb-4">
      <div>{error.message}</div>
      {error.code && <small className="text-muted">Код: {error.code}</small>}
    </Alert>
  );
}
