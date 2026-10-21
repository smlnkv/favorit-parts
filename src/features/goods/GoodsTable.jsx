import { Accordion, Badge, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { ErrorBox } from '../../shared/ErrorBox';
import { Loader } from '../../shared/Loader';

function formatPrice(value) {
  if (value === null) return '-';
  return `${value.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₽`;
}

function formatDate(value) {
  if (!value) return '-';
  const date = new Date(value);
  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function GoodsHeader({ item, infoEnabled }) {
  return (
    <div className="d-flex justify-content-between align-items-start gap-3 w-100 pe-3">
      <div>
        <strong>{item.brand}</strong>
        <span className="text-muted ms-2">{item.number}</span>
        <span className="text-muted ms-2">{item.name}</span>
        {item.isOriginal && (
          <Badge bg="primary" className="ms-2">
            Оригинал
          </Badge>
        )}
        {infoEnabled && item.hasNonRefundable && (
          <Badge bg="warning" text="dark" className="ms-2">
            Есть невозвратные
          </Badge>
        )}
      </div>
      <div className="text-nowrap text-end">
        <div>{formatPrice(item.minPrice)}</div>
        <small className="text-muted">
          {item.count > 0 ? `${item.count} шт.` : 'нет в наличии'}
        </small>
      </div>
    </div>
  );
}

function WarehousesTable({ warehouses, infoEnabled }) {
  if (warehouses.length === 0) {
    return <p className="text-muted mb-0">Предложений нет</p>;
  }

  return (
    <Table bordered hover size="sm" className="mb-0 align-middle">
      <thead>
        <tr>
          <th>Склад</th>
          <th className="text-center">Свой</th>
          <th className="text-end">Цена</th>
          <th className="text-end">Остаток</th>
          <th className="text-end">Отгрузка</th>
          {infoEnabled && <th className="text-center">Невозвратный</th>}
        </tr>
      </thead>
      <tbody>
        {warehouses.map((w) => (
          <tr key={w.id}>
            <td>{w.code ?? '-'}</td>
            <td className="text-center">{w.own ? 'да' : 'нет'}</td>
            <td className="text-end">{formatPrice(w.price)}</td>
            <td className="text-end">{w.stock}</td>
            <td className="text-end">{formatDate(w.shipmentDate)}</td>
            {infoEnabled && <td className="text-center">{w.notRefund ? 'да' : 'нет'}</td>}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default function GoodsTable() {
  const items = useSelector((state) => state.goods.items);
  const status = useSelector((state) => state.goods.status);
  const error = useSelector((state) => state.goods.error);
  const infoEnabled = useSelector((state) => state.search.infoEnabled);

  if (status === 'idle') return null;
  if (status === 'loading') return <Loader />;
  if (status === 'error') return <ErrorBox error={error} />;

  if (items.length === 0) {
    return (
      <div className="mb-4">
        <h5 className="mb-3">Предложения и аналоги</h5>
        <p className="text-muted">Ничего не найдено</p>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <h5 className="mb-3">Предложения и аналоги</h5>
      <Accordion alwaysOpen>
        {items.map((item, index) => (
          <Accordion.Item eventKey={String(index)} key={item.goodsID}>
            <Accordion.Header>
              <GoodsHeader item={item} infoEnabled={infoEnabled} />
            </Accordion.Header>
            <Accordion.Body>
              <WarehousesTable warehouses={item.warehouses} infoEnabled={infoEnabled} />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}
