import { CoinWeb } from 'config/www/Coin';

import { HTTPRequester } from 'core/infrastructure/HTTPRequester';

import { getURL } from 'routes/.tools/Utils/getURL';

export const apiCoin = {
  all: async () => {
    const response = await HTTPRequester.get({
      url: getURL(CoinWeb.all),
      queryString: {}
    });
    return response.data;
  },

  list: async () => {
    const response = await HTTPRequester.get({
      url: getURL(CoinWeb.list),
      queryString: {}
    });
    return response.data;
  }
};
