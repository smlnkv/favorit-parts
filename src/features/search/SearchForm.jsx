import { useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { resetGoods } from '../goods/goodsSlice';
import { requestGoods } from '../goods/goodsThunks';

import { resetSearch, setInfoEnabled, setNumber } from './searchSlice';
import { searchBrands } from './searchThunks';

const DEBOUNCE_MS = 800;

export default function SearchForm() {
  const dispatch = useDispatch();
  const number = useSelector((state) => state.search.number);
  const infoEnabled = useSelector((state) => state.search.infoEnabled);
  const selectedBrandName = useSelector((state) => state.goods.selectedBrand?.brand);
  const selectedBrandNumber = useSelector((state) => state.goods.selectedBrand?.number);
  const pendingRef = useRef(null);

  useEffect(() => {
    if (pendingRef.current) pendingRef.current.abort();

    const trimmed = number.trim();
    if (!trimmed) {
      dispatch(resetSearch());
      return;
    }

    const timer = setTimeout(() => {
      pendingRef.current = dispatch(searchBrands({ number: trimmed }));
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [number, dispatch]);

  const handleNumberChange = (event) => {
    dispatch(setNumber(event.target.value));
    dispatch(resetGoods());
  };

  const handleInfoChange = (event) => {
    const checked = event.target.checked;
    dispatch(setInfoEnabled(checked));

    if (selectedBrandName && selectedBrandNumber) {
      requestGoods(dispatch, {
        number: selectedBrandNumber,
        brand: selectedBrandName,
        info: checked,
      });
    }
  };

  return (
    <Form className="mb-4">
      <Form.Group className="mb-3">
        <Form.Label>Артикул</Form.Label>
        <Form.Control
          type="text"
          placeholder="Например, 01089"
          value={number}
          onChange={handleNumberChange}
          autoComplete="off"
        />
      </Form.Group>

      <Form.Check
        type="checkbox"
        id="info-enabled"
        label="Показывать невозвратные позиции"
        checked={infoEnabled}
        onChange={handleInfoChange}
      />
    </Form>
  );
}
