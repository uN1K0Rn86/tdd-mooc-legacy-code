import { describe, test } from "vitest";
import { expect } from "chai";
import { AgedBrie, BackstagePass, ConjuredItem, Item, NormalItem, Shop, Sulfuras } from "../src/gilded_rose.mjs";

describe("Gilded Rose", () => {
  test("empty shop can be created", () => {
    const shop = new Shop();
    expect(shop.items).to.deep.equal([]);
  });

  describe("normal items", () => {
    test("get correct name when created", () => {
      const shop = new Shop([new NormalItem("foo", 0, 0)]);
      const items = shop.updateQuality();
      expect(items[0].name).to.equal("foo");
    });

    test("with sellIn 0 degrades twice", () => {
      const shop = new Shop([new NormalItem("foo", 0, 10)]);
      const items = shop.updateQuality();
      expect(items[0].quality).to.equal(8);
      expect(items[0].sellIn).to.equal(-1);
    });

    test("with quality 0 stays at 0", () => {
      const shop = new Shop([new NormalItem("foo", 0, 0)]);
      const items = shop.updateQuality();
      expect(items[0].quality).to.equal(0);
      expect(items[0].sellIn).to.equal(-1);
    });

    test("with sellIn 1 and quality 2 degrades to 0 sellIn and 1 quality", () => {
      const shop = new Shop([new NormalItem("foo", 1, 2)]);
      const items = shop.updateQuality();
      expect(items[0].quality).to.equal(1);
      expect(items[0].sellIn).to.equal(0);
    });
  });

  describe("Aged Brie", () => {
    test("has correct name when created", () => {
      const shop = new Shop([new AgedBrie(10, 10)]);
      expect(shop.items[0].name).to.equal("Aged Brie");
    });

    test("with sellIn 3 and quality 3 updates to sellIn 2 and quality 4", () => {
      const shop = new Shop([new AgedBrie(3, 3)]);
      const items = shop.updateQuality();
      expect(items[0].quality).to.equal(4);
      expect(items[0].sellIn).to.equal(2);
    });

    test("with sellIn 20 and quality 3 updates to sellIn 19 and quality 4", () => {
      const shop = new Shop([new AgedBrie(20, 3)]);
      const items = shop.updateQuality();
      expect(items[0].quality).to.equal(4);
      expect(items[0].sellIn).to.equal(19);
    });

    test("with sellIn 0 increases quality twice", () => {
      const shop = new Shop([new AgedBrie(0, 0)]);
      const items = shop.updateQuality();
      expect(items[0].quality).to.equal(2);
      expect(items[0].sellIn).to.equal(-1);
    });

    test("with 50 quality and 0 sellIn stays 50 quality but degrades to -1 sellIn", () => {
      const shop = new Shop([new AgedBrie(0, 50)]);
      const items = shop.updateQuality();
      expect(items[0].quality).to.equal(50);
      expect(items[0].sellIn).to.equal(-1);
    });

    test("with sellIn 1 increases quality by 1", () => {
      const shop = new Shop([new AgedBrie(1, 1)]);
      const items = shop.updateQuality();
      expect(items[0].quality).to.equal(2);
      expect(items[0].sellIn).to.equal(0);
    });
  });

  describe("Backstage passes", () => {
    test("have correct name when created", () => {
      const backstagePass = new BackstagePass(10, 10);
      expect(backstagePass.name).to.equal("Backstage passes to a TAFKAL80ETC concert");
    });

    test("with sellIn 1 and quality 0 increase quality by 3", () => {
      const shop = new Shop([new BackstagePass(1, 0)]);
      const items = shop.updateQuality();
      expect(items[0].quality).to.equal(3);
      expect(items[0].sellIn).to.equal(0);
    });

    test("with sellIn 11 and quality 10 increase quality by 1", () => {
      const shop = new Shop([new BackstagePass(11, 10)]);
      const items = shop.updateQuality();
      expect(items[0].quality).to.equal(11);
      expect(items[0].sellIn).to.equal(10);
    });

    test("with sellIn 6 and quality 10 increase quality by 2", () => {
      const shop = new Shop([new BackstagePass(6, 10)]);
      const items = shop.updateQuality();
      expect(items[0].quality).to.equal(12);
      expect(items[0].sellIn).to.equal(5);
    });

    test("with quality 50 do not get increased quality", () => {
      const shop = new Shop([new BackstagePass(5, 50)]);
      const items = shop.updateQuality();
      expect(items[0].quality).to.equal(50);
      expect(items[0].sellIn).to.equal(4);
    });

    test("backstage passes with sellIn 0 result in unchanged quality", () => {
      const shop = new Shop([new BackstagePass(0, 0)]);
      const items = shop.updateQuality();
      expect(items[0].quality).to.equal(0);
      expect(items[0].sellIn).to.equal(-1);
    });
  });

  describe("Sulfuras, Hand of Ragnaros", () => {
    test("gets correct name when created", () => {
      const sulfuras = new Sulfuras();
      expect(sulfuras.name).to.equal("Sulfuras, Hand of Ragnaros");
    });

    test("sellIn is 0 and quality is 80", () => {
      const shop = new Shop([new Sulfuras()]);
      const items = shop.updateQuality();
      expect(items[0].quality).to.equal(80);
      expect(items[0].sellIn).to.equal(0);
    });
  });

  describe("Conjured Item", () => {
    test("gets correct name when created", () => {
      const conjuredItem = new ConjuredItem(0, 0);
      expect(conjuredItem.name).to.equal("Conjured Item");
    });
    test("with 2 quality should degrade to 0", () => {
      const shop = new Shop([new ConjuredItem(1, 2)]);
      const items = shop.updateQuality();
      expect(items[0].quality).to.be.equal(0);
      expect(items[0].sellIn).to.be.equal(0);
    });
  });
});
