import { All } from './All';

import { coinRepository } from 'core/entities/Coin/Coin.repository';

export const CoinService = { all: All({ coinRepository }) };
