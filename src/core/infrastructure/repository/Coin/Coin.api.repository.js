import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import { apiCoin } from 'core/infrastructure/api/Coin';

import { Coin } from 'core/entities/Coin/Coin';

const all = async () => {
  const coinDTO = await apiCoin.all();
  return parseCoinList(coinDTO);
};

const list = async () => {
  const coinListDTO = await apiCoin.list();
  return parseCoinList(coinListDTO);
};

const parseCoin = coinDTO =>
  new Coin({
    blockTime: coinDTO.block_time_in_minutes,
    id: coinDTO.id,
    image: coinDTO.image,
    lastUpdate: coinDTO.last_updated,
    localization: coinDTO.localization,
    marketData: coinDTO.market_data,
    name: coinDTO.name,
    symbol: coinDTO.symbol
  });

const parseCoinList = coinListDTO => {
  if (!isNil(coinListDTO)) {
    const coins = [];
    coinListDTO.forEach(coinDTO => coins.push(parseCoin(coinDTO)));
    return coins;
  }
  return;
};

export const ApiCoinRepository = { all, list };
