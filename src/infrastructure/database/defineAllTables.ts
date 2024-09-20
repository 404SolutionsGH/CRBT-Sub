import { defineAdminTable } from "./tables/adminTable"
import { defineServiceTable } from "./tables/serviceTable"
import { defineUserTable } from "./tables/userTable"


// method for defining all table structures using the models
export const defineAllTables= ()=>{
    defineUserTable()
    defineAdminTable()
    defineServiceTable()
}