import axios from 'axios';
import { CONFIG } from '../utils/config';

export const getAllCoins = async (
  limit: number = 10,
  sparkline: boolean = false
) => {
  const url =
    CONFIG.SERVICES_ENDPOINTS.CoinGecko +
    'coins/markets?vs_currency=usd&order=market_cap_desc&per_page=' +
    limit +
    '&page=1&sparkline=' +
    sparkline;

  const params: object = {
    method: 'get',
    url: url,
  };
  try {
    const response = await axios(params);
    return response.data;
  } catch (error) {
    return false;
  }
};

export const getCoins = async (list: string[]) => {
  const url =
    CONFIG.SERVICES_ENDPOINTS.CoinGecko +
    'simple/price?ids=' +
    list.join(',') +
    '&vs_currencies=usd';

  const params: object = {
    method: 'get',
    url: url,
  };
  const response = await axios(params);
  return response.data;
};
