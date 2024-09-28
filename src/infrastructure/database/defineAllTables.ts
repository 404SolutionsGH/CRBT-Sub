import { defineAdminPlanTable } from "./tables/adminPlanTable";
import { defineAdminTable } from "./tables/adminTable";
import { defineServiceTable } from "./tables/serviceTable";
import { defineSongTable } from "./tables/songTable";
import { defineUserTable } from "./tables/userTable";

// method for defining all table structures using the models
export const defineAllTables = () => {
  defineUserTable();
   defineAdminPlanTable();
  defineAdminTable();
  defineServiceTable();
  defineSongTable();
 
};
