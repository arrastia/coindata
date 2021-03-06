import { ApiCoinRepository } from 'core/infrastructure/repository/Coin/Coin.api.repository';

export const CoinRepository = {
  all: () => Promise.reject('[CoinRepository#all] must be implemented')
};

export const coinRepository = Object.assign({}, CoinRepository, ApiCoinRepository);
