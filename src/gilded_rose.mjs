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

  decreaseQuality(item) {
    if (item.quality > 0) {
      item.quality -= 1;
    }
  }

  increaseQuality(item) {
    item.quality += 1;
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

      this.decreaseSellIn(item);

      if (item.sellIn < 0) {
        if (!this.isAgedBrie(item)) {
          if (!this.isBackstagePass(item)) {
            if (item.quality > 0) {
              this.decreaseQuality(item);
            }
          } else {
            this.spoil(item);
          }
        } else {
          if (item.quality < 50) {
            this.increaseQuality(item);
          }
        }
      }
    }

    return this.items;
  }
}
