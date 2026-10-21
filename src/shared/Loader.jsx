import { Spinner } from 'react-bootstrap';

export function Loader() {
  return (
    <div className="d-flex justify-content-center py-3">
      <Spinner animation="border" role="status" size="sm">
        <span className="visually-hidden">Загрузка</span>
      </Spinner>
    </div>
  );
}
