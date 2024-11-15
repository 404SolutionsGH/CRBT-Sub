import { Admin } from "../../../domain/entities/Admin";
import { encryptPassword } from "../../../libs/bcrypt";

export const AdminSeeder = async () => {
  const password = await encryptPassword("Admin1234");
  await Admin.create({
    email: "admin@gmail.com",
    firstName: "adminFirstName",
    lastName: "adminLastName",
    password: password,
    adminType: "system",
  });

  const data = [
    {
      email: "Awad@crbtmusicpro.com",
      adminType: "system",
      password,
      firstName: "Alice",
      lastName: "Johnson",
    },
    {
      email: "merchant2@example.com",
      adminType: "merchant",
      password,
      firstName: "Bob",
      lastName: "Smith",
      planId: 2,
    },
    {
      email: "merchant3@example.com",
      adminType: "merchant",
      password,
      firstName: "Charlie",
      lastName: "Brown",
      planId: 3,
    },
    {
      email: "merchant4@example.com",
      adminType: "merchant",
      password,
      firstName: "Diana",
      lastName: "Evans",
      planId: 1,
    },
    {
      email: "merchant5@example.com",
      adminType: "merchant",
      password,
      firstName: "Edward",
      lastName: "Green",
      planId: 2,
    },
    {
      email: "merchant6@example.com",
      adminType: "merchant",
      password,
      firstName: "Fiona",
      lastName: "Harris",
      planId: 3,
    },
    {
      email: "merchant7@example.com",
      adminType: "merchant",
      password,
      firstName: "George",
      lastName: "Adams",
      planId: 1,
    },
    {
      email: "merchant8@example.com",
      adminType: "merchant",
      password,
      firstName: "Hannah",
      lastName: "Parker",
      planId: 1,
    },
    {
      email: "merchant9@example.com",
      adminType: "merchant",
      password,
      firstName: "Ian",
      lastName: "Wilson",
      planId: 2,
    },
    {
      email: "merchant10@example.com",
      adminType: "merchant",
      password,
      firstName: "Jill",
      lastName: "Morris",
      planId: 3,
    },
  ];
  await Admin.bulkCreate(data);
};
