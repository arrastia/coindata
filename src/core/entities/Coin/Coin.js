export class Coin {
  constructor({ blockTime, id, image, lastUpdate, localization, marketData, name, symbol } = {}) {
    this.blockTime = blockTime;
    this.id = id;
    this.image = image;
    this.lastUpdate = lastUpdate;
    this.localization = localization;
    this.marketData = marketData;
    this.name = name;
    this.symbol = symbol;
  }
}
