export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
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

  decreaseQuality(normalItem) {
    if (normalItem.quality > 0) {
      if (!this.isSulfuras(normalItem)) {
        normalItem.quality -= 1;
      }
    }
  }

  increaseQuality(item) {
    item.quality += 1;
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (!this.isAgedBrie(item) && !this.isBackstagePass(item)) {
        this.decreaseQuality(item);
      } else {
        if (item.quality < 50) {
          this.increaseQuality(item);
          if (this.isBackstagePass(item)) {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                this.increaseQuality(item);
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                this.increaseQuality(item);
              }
            }
          }
        }
      }
      if (!this.isSulfuras(item)) {
        item.sellIn -= 1;
      }
      if (item.sellIn < 0) {
        if (!this.isAgedBrie(item)) {
          if (!this.isBackstagePass(item)) {
            if (item.quality > 0) {
              if (!this.isSulfuras(item)) {
                item.quality -= 1;
              }
            }
          } else {
            item.quality = 0;
          }
        } else {
          if (item.quality < 50) {
            item.quality += 1;
          }
        }
      }
    }

    return this.items;
  }
}
