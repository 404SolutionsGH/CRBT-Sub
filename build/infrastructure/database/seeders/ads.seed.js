"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdsSeeder = void 0;
const Ads_1 = require("../../../domain/entities/Ads");
const AdsSeeder = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = [
        {
            title: "Flash Sale",
            description: "Limited-time offer! Get up to 50% off select items.",
            url: "https://example.com/flash-sale",
            image: "iVBORw0KGgoAAAANSUhEUgAA...",
            expiryDate: "2024-11-20",
        },
        {
            title: "Holiday Special",
            description: "Celebrate with us! 25% off storewide for the holiday season.",
            url: "https://example.com/holiday-special",
            image: "iVBORw0KGgoAAAANSUhEUgAA...",
            expiryDate: "2024-12-25",
        },
        {
            title: "Back to School",
            description: "Gear up! 30% off on school essentials.",
            url: "https://example.com/back-to-school",
            image: "iVBORw0KGgoAAAANSUhEUgAA...",
            expiryDate: "2025-01-10",
        },
        {
            title: "New Year Deal",
            description: "Start the new year right! Enjoy 20% off sitewide.",
            url: "https://example.com/new-year-deal",
            image: "iVBORw0KGgoAAAANSUhEUgAA...",
            expiryDate: "2025-01-31",
        },
        {
            title: "Black Friday Bonanza",
            description: "Massive discounts! Up to 70% off on all products.",
            url: "https://example.com/black-friday",
            image: "iVBORw0KGgoAAAANSUhEUgAA...",
            expiryDate: "2024-11-29",
        },
        {
            title: "Cyber Monday Exclusive",
            description: "24-hour sale! 40% off on electronics.",
            url: "https://example.com/cyber-monday",
            image: "iVBORw0KGgoAAAANSUhEUgAA...",
            expiryDate: "2024-12-01",
        },
        {
            title: "Spring Savings",
            description: "Bloom into savings! 15% off on all seasonal items.",
            url: "https://example.com/spring-savings",
            image: "iVBORw0KGgoAAAANSUhEUgAA...",
            expiryDate: "2025-03-31",
        },
        {
            title: "Summer Clearance",
            description: "End-of-summer sale! Up to 60% off on select items.",
            url: "https://example.com/summer-clearance",
            image: "iVBORw0KGgoAAAANSUhEUgAA...",
            expiryDate: "2025-09-01",
        },
        {
            title: "Mother’s Day Special",
            description: "Show love with our 25% discount on all gifts for Mom.",
            url: "https://example.com/mothers-day",
            image: "iVBORw0KGgoAAAANSUhEUgAA...",
            expiryDate: "2025-05-10",
        },
        {
            title: "End of Season Sale",
            description: "Huge savings on last season’s items – up to 40% off!",
            url: "https://example.com/end-season",
            image: "iVBORw0KGgoAAAANSUhEUgAA...",
            expiryDate: "2025-10-15",
        },
    ];
    yield Ads_1.Ads.bulkCreate(data);
});
exports.AdsSeeder = AdsSeeder;
