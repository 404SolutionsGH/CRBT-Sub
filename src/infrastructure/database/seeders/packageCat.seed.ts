import { PackageCategory } from "../../../domain/entities/PackageCategory";

export const PackageCategorySeeder = async () => {
  const data = [
    {
      title: "5G",
      description: "5G Services",
    },
    {
      title: "Voice ",
      description: "Voice",
    },
    {
      title: "Text Packages",
      description: "Affordable packages with bulk SMS options.",
    },
    {
      title: "International Packages",
      description: "Discounted rates for international calls and data.",
    },
    {
      title: "Family Packages",
      description: "Shared data, calls, and texts for family members.",
    },
  ];
  await PackageCategory.bulkCreate(data);
};
