const NOT_FOUND_GOODS_ID = '00000000-0000-0000-0000-000000000000';

function isEmptyResult(item) {
  return item.goodsID === NOT_FOUND_GOODS_ID || item.brand === '';
}

function computeMinPrice(warehouses) {
  const prices = warehouses.filter((w) => w.stock > 0).map((w) => w.price);
  return prices.length > 0 ? Math.min(...prices) : null;
}

function hasNonRefundable(item) {
  return item.notRefund === true || item.warehouses.some((w) => w.notRefund === true);
}

function sortWarehouses(warehouses) {
  return [...warehouses].sort((a, b) => {
    if (a.own !== b.own) return a.own ? -1 : 1;
    if (a.stock !== b.stock) return b.stock - a.stock;
    return a.price - b.price;
  });
}

function mapItem(item, isOriginal) {
  const warehouses = sortWarehouses(item.warehouses ?? []);

  return {
    goodsID: item.goodsID,
    brand: item.brand,
    number: item.number,
    name: item.name,
    count: item.count,
    isOriginal,
    minPrice: computeMinPrice(warehouses),
    hasNonRefundable: hasNonRefundable({ ...item, warehouses }),
    warehouses,
  };
}

export function normalizeGoods(rawGoods) {
  if (!rawGoods?.length) return [];

  const [parent] = rawGoods;
  if (!parent || isEmptyResult(parent)) return [];

  const result = [mapItem(parent, true)];

  for (const analog of parent.analogues ?? []) {
    if (!isEmptyResult(analog)) {
      result.push(mapItem(analog, false));
    }
  }

  return result;
}
