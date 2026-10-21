import { Container } from 'react-bootstrap';

import GoodsTable from './features/goods/GoodsTable';
import BrandList from './features/search/BrandList';
import SearchForm from './features/search/SearchForm';

export default function App() {
  return (
    <Container className="py-4" style={{ maxWidth: 960 }}>
      <h1 className="h4 mb-4">Подбор автозапчастей</h1>
      <SearchForm />
      <BrandList />
      <GoodsTable />
    </Container>
  );
}
