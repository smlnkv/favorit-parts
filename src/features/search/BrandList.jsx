import { ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { ErrorBox } from '../../shared/ErrorBox';
import { Loader } from '../../shared/Loader';
import { requestGoods } from '../goods/goodsThunks';

export default function BrandList() {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.search.brands);
  const status = useSelector((state) => state.search.status);
  const error = useSelector((state) => state.search.error);
  const infoEnabled = useSelector((state) => state.search.infoEnabled);
  const selectedBrandName = useSelector((state) => state.goods.selectedBrand?.brand);
  const selectedBrandNumber = useSelector((state) => state.goods.selectedBrand?.number);

  if (status === 'loading') return <Loader />;
  if (status === 'error') return <ErrorBox error={error} />;
  if (status === 'idle') return null;
  if (brands.length === 0) {
    return (
      <div className="mb-4">
        <h5 className="mb-3">Найденные производители</h5>
        <p className="text-muted">Ничего не найдено</p>
      </div>
    );
  }

  const handleSelect = (item) => {
    requestGoods(dispatch, {
      number: item.number,
      brand: item.brand,
      info: infoEnabled,
    });
  };

  const isActive = (item) =>
    selectedBrandName === item.brand && selectedBrandNumber === item.number;

  return (
    <div className="mb-4">
      <h5 className="mb-3">Найденные производители</h5>
      <ListGroup>
        {brands.map((item) => (
          <ListGroup.Item
            key={item.goodsID}
            action
            active={isActive(item)}
            onClick={() => handleSelect(item)}
          >
            <div className="d-flex justify-content-between align-items-start gap-3">
              <div>
                <strong>{item.brand}</strong>
                <span className="text-muted ms-2">{item.name}</span>
              </div>
              <div className="text-nowrap">
                {item.count > 0 ? `${item.count} шт.` : 'нет в наличии'}
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
