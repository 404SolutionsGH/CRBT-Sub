import { AdminPlan } from "../../../domain/entities/AdminPlan";




export const AdminPlanSeeder= async()=>{
    const data = [
      {
        planId: 1,
        planType: "Basic",
        price: "850",
        subType: "yearly",
        planName: "CRBT-Plans",
        benefits: {
          songLimit: 200,
          subscriberLimit: 500,
          numberOfSongsPerUpload: 10,
        },
        deleteFlag: false,
      },
      {
        planId: 2,
        planType: "Standard",
        price: "999",
        subType: "monthly",
        planName: "CRBT-Plans",
        benefits: {
          songLimit: 450,
          subscriberLimit: 900,
          numberOfSongsPerUpload: 40,
        },
        deleteFlag: false,
      },
      {
        planId: 3,
        planType: "Pro",
        price: "1999",
        subType: "yearly",
        planName: "CRBT-Plans",
        benefits: {
          songLimit: 1000,
          subscriberLimit: 1500,
          numberOfSongsPerUpload: 90,
        },
        deleteFlag: false,
      },
    ];
    await AdminPlan.bulkCreate(data)
}