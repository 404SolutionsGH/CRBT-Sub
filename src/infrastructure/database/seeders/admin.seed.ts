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
};
