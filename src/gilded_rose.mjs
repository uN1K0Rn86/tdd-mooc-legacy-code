export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  decreaseQuality() {
    if (this.quality > 0) {
      this.quality -= 1;
    }
  }

  increaseQuality() {
    if (this.quality < 50) {
      this.quality += 1;
    }
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  isAgedBrie(item) {
    return item.name === "Aged Brie";
  }

  isBackstagePass(item) {
    return item.name === "Backstage passes to a TAFKAL80ETC concert";
  }

  isSulfuras(item) {
    return item.name === "Sulfuras, Hand of Ragnaros";
  }

  decreaseSellIn(item) {
    item.sellIn -= 1;
  }

  spoil(item) {
    item.quality = 0;
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (this.isSulfuras(item)) return this.items;

      if (!this.isAgedBrie(item) && !this.isBackstagePass(item)) {
        item.decreaseQuality();
      } else {
        item.increaseQuality();
        if (this.isBackstagePass(item)) {
          if (item.sellIn < 11) {
            item.increaseQuality();
          }
          if (item.sellIn < 6) {
            item.increaseQuality();
          }
        }
      }

      this.decreaseSellIn(item);

      if (item.sellIn < 0) {
        if (!this.isAgedBrie(item)) {
          if (!this.isBackstagePass(item)) {
            item.decreaseQuality();
          } else {
            this.spoil(item);
          }
        } else {
          item.increaseQuality();
        }
      }
    }

    return this.items;
  }
}
