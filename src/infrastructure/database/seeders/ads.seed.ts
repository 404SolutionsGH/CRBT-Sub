import { Ads } from "../../../domain/entities/Ads";




export const AdsSeeder= async ()=>{

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
await Ads.bulkCreate(data)


}