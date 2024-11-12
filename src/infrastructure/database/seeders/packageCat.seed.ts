import { PackageCategory } from "../../../domain/entities/PackageCategory";

export const PackageCategorySeeder = async () => {
  const data = [
    {
      id: 1,
      title: "Data Packages",
      description: "Packages offering various data bundles.",
    },
    {
      id: 2,
      title: "Voice Packages",
      description: "Packages for unlimited calling options and minutes.",
    },
    {
      id: 3,
      title: "Text Packages",
      description: "Affordable packages with bulk SMS options.",
    },
    {
      id: 4,
      title: "International Packages",
      description: "Discounted rates for international calls and data.",
    },
    {
      id: 5,
      title: "Family Packages",
      description: "Shared data, calls, and texts for family members.",
    },
    {
      id: 6,
      title: "Student Packages",
      description: "Budget-friendly plans designed for students.",
    },
    {
      id: 7,
      title: "Premium Packages",
      description: "Exclusive packages with high-speed data and unlimited calls.",
    },
    {
      id: 8,
      title: "Weekend Packages",
      description: "Special offers available only on weekends.",
    },
    {
      id: 9,
      title: "Holiday Packages",
      description: "Limited-time offers for holiday seasons.",
    },
    {
      id: 10,
      title: "Business Packages",
      description: "Plans tailored for business users with added benefits.",
    },
  ];
  await PackageCategory.bulkCreate(data);
};
