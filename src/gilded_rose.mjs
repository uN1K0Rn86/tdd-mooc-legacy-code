export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  decreaseSellIn() {
    this.sellIn -= 1;
  }

  updateQuality() {}
}

export class AgedBrie extends Item {
  constructor(sellIn, quality) {
    super("Aged Brie", sellIn, quality);
  }
  updateQuality() {
    if (this.quality < 50) this.quality += 1;
    this.decreaseSellIn();
    if (this.sellIn < 0 && this.quality < 50) this.quality += 1;
  }
}

export class BackstagePass extends Item {
  constructor(sellIn, quality) {
    super("Backstage passes to a TAFKAL80ETC concert", sellIn, quality);
  }
  updateQuality() {
    if (this.quality < 50) this.quality += 1;
    if (this.sellIn < 11 && this.quality < 50) this.quality += 1;
    if (this.sellIn < 6 && this.quality < 50) this.quality += 1;
    this.decreaseSellIn();
    if (this.sellIn < 0) this.quality = 0;
  }
}

export class NormalItem extends Item {
  updateQuality() {
    if (this.quality > 0) this.quality -= 1;
    this.decreaseSellIn();
    if (this.sellIn < 0 && this.quality > 0) this.quality -= 1;
  }
}

export class Sulfuras extends Item {
  constructor() {
    super("Sulfuras, Hand of Ragnaros", 0, 80);
  }
}

export class ConjuredItem extends Item {
  updateQuality() {
    if (this.quality > 0) this.quality -= 2;
    this.decreaseSellIn();
    if (this.sellIn < 0 && this.quality > 0) this.quality -= 2;
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      item.updateQuality();
    }

    return this.items;
  }
}
