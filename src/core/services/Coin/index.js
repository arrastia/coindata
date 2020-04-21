import { All } from './All';
import { List } from './List';

import { coinRepository } from 'core/entities/Coin/Coin.repository';

export const CoinService = { all: All({ coinRepository }), list: List({ coinRepository }) };
