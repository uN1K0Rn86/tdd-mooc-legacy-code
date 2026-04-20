import { describe, test } from "vitest";
import { expect } from "chai";
import { AgedBrie, BackstagePass, ConjuredItem, Item, NormalItem, Shop, Sulfuras } from "../src/gilded_rose.mjs";

describe("Gilded Rose", () => {
  test("empty shop can be created", () => {
    const gildedRose = new Shop();
    expect(gildedRose.items).to.deep.equal([]);
  });

  describe("normal items", () => {
    test("new shop can be created with normal item", () => {
      const gildedRose = new Shop([new NormalItem("foo", 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).to.equal("foo");
    });

    test("normal item with sellIn 0 degrades twice", () => {
      const gildedRose = new Shop([new NormalItem("foo", 0, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(8);
      expect(items[0].sellIn).to.equal(-1);
    });

    test("normal item with quality 0 stays at 0", () => {
      const gildedRose = new Shop([new NormalItem("foo", 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(0);
      expect(items[0].sellIn).to.equal(-1);
    });

    test("normal item with sellIn 1 and quality 2 degrades to 0 sellIn and 1 quality", () => {
      const shop = new Shop([new NormalItem("foo", 1, 2)]);
      const items = shop.updateQuality();
      expect(items[0].quality).to.equal(1);
      expect(items[0].sellIn).to.equal(0);
    });
  });

  describe("aged brie", () => {
    test("new Aged Brie item has name Aged Brie", () => {
      const shop = new Shop([new AgedBrie(10, 10)]);
      expect(shop.items[0].name).to.equal("Aged Brie");
    });

    test("aged brie with sellIn 3 and quality 3 updates to sellIn 2 and quality 4", () => {
      const gildedRose = new Shop([new AgedBrie(3, 3)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(4);
      expect(items[0].sellIn).to.equal(2);
    });

    test("aged brie with sellIn 20", () => {
      const gildedRose = new Shop([new AgedBrie(20, 3)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(4);
      expect(items[0].sellIn).to.equal(19);
    });

    test("aged brie with sellIn 0 increases quality twice", () => {
      const gildedRose = new Shop([new AgedBrie(0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(2);
      expect(items[0].sellIn).to.equal(-1);
    });

    test("aged brie with 50 quality and 0 sellIn stays 50 quality but degrades to -1 sellIn", () => {
      const gildedRose = new Shop([new AgedBrie(0, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(50);
      expect(items[0].sellIn).to.equal(-1);
    });

    test("aged brie with sellIn 1 increases quality by 1", () => {
      const shop = new Shop([new AgedBrie(1, 1)]);
      const items = shop.updateQuality();
      expect(items[0].quality).to.equal(2);
      expect(items[0].sellIn).to.equal(0);
    });
  });

  test("backstage passes with sellIn 1 and quality 0 increase quality by 3", () => {
    const gildedRose = new Shop([new BackstagePass("Backstage passes to a TAFKAL80ETC concert", 1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(3);
    expect(items[0].sellIn).to.equal(0);
  });

  test("backstage passes with higher sellIn", () => {
    const gildedRose = new Shop([new BackstagePass("Backstage passes to a TAFKAL80ETC concert", 20, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(1);
    expect(items[0].sellIn).to.equal(19);
  });

  test("backstage passes with sellIn 10", () => {
    const gildedRose = new Shop([new BackstagePass("Backstage passes to a TAFKAL80ETC concert", 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(12);
    expect(items[0].sellIn).to.equal(9);
  });

  test("backstage passes with sellIn exactly 11", () => {
    const gildedRose = new Shop([new BackstagePass("Backstage passes to a TAFKAL80ETC concert", 11, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(11);
    expect(items[0].sellIn).to.equal(10);
  });

  test("backstage pass with sellIn exactly 6", () => {
    const gildedRose = new Shop([new BackstagePass("Backstage passes to a TAFKAL80ETC concert", 6, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(12);
    expect(items[0].sellIn).to.equal(5);
  });

  test("backstage passes with sellIn 10 and quality 49", () => {
    const gildedRose = new Shop([new BackstagePass("Backstage passes to a TAFKAL80ETC concert", 10, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
    expect(items[0].sellIn).to.equal(9);
  });

  test("backstage passes with sellIn 10 and quality 48", () => {
    const gildedRose = new Shop([new BackstagePass("Backstage passes to a TAFKAL80ETC concert", 10, 48)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
    expect(items[0].sellIn).to.equal(9);
  });

  test("backstage passes with sellIn 5 and quality 48", () => {
    const gildedRose = new Shop([new BackstagePass("Backstage passes to a TAFKAL80ETC concert", 5, 48)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
    expect(items[0].sellIn).to.equal(4);
  });

  test("backstage passes with quality 50", () => {
    const gildedRose = new Shop([new BackstagePass("Backstage passes to a TAFKAL80ETC concert", 5, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
    expect(items[0].sellIn).to.equal(4);
  });

  test("backstage passes with sellin 20 quality 48", () => {
    const gildedRose = new Shop([new BackstagePass("Backstage passes to a TAFKAL80ETC concert", 20, 48)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(49);
    expect(items[0].sellIn).to.equal(19);
  });

  test("backstage passes with sellIn 0 result in unchanged quality", () => {
    const gildedRose = new Shop([new BackstagePass("Backstage passes to a TAFKAL80ETC concert", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
    expect(items[0].sellIn).to.equal(-1);
  });

  test("sulfuras, hand of ragnaros is unchanged", () => {
    const gildedRose = new Shop([new Sulfuras("Sulfuras, Hand of Ragnaros", 3, 3)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(80);
    expect(items[0].sellIn).to.equal(3);
  });

  test("sulfuras, hand of ragnaros is unchanged with 0 sellIn", () => {
    const gildedRose = new Shop([new Sulfuras("Sulfuras, Hand of Ragnaros", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(80);
    expect(items[0].sellIn).to.equal(0);
  });

  test("sulfuras, hand of ragnaros is unchanged with 0 sellIn and positive quality", () => {
    const gildedRose = new Shop([new Sulfuras("Sulfuras, Hand of Ragnaros", 0, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(80);
    expect(items[0].sellIn).to.equal(0);
  });

  test("conjured item with 2 quality should degrade to 0", () => {
    const gildedRose = new Shop([new ConjuredItem("Conjured Item", 1, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.be.equal(0);
    expect(items[0].sellIn).to.be.equal(0);
  });
});
