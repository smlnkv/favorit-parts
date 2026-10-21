import { createClient } from 'fetch-layers';
import { withRetry } from 'fetch-layers/retry';

const BASE_URL = 'http://api.favorit-parts.ru';
const CLIENT_KEY = '00000000-0000-0000-0000-000000000001';

function parseErrorBody(raw) {
  if (raw && typeof raw === 'object' && typeof raw.error === 'string' && raw.error.trim()) {
    return { message: raw.error };
  }
  return {};
}

const client = createClient({
  baseUrl: BASE_URL,
  parseErrorBody,
  layers: [withRetry({ maxAttempts: 3 })],
});

function buildQuery({ number, brand, info, analogues }) {
  const query = { key: CLIENT_KEY };
  if (number !== undefined) query.number = number;
  if (brand !== undefined) query.brand = brand;
  if (info) query.info = 'on';
  if (analogues) query.analogues = 'on';
  return query;
}

export async function searchBrandsApi({ number, signal }) {
  const data = await client.get('/hs/hsprice/', {
    query: buildQuery({ number }),
    signal,
  });
  return data?.goods ?? [];
}

export async function fetchGoodsApi({ number, brand, info, signal }) {
  const data = await client.get('/hs/hsprice/', {
    query: buildQuery({ number, brand, info, analogues: true }),
    signal,
  });
  return data?.goods ?? [];
}
