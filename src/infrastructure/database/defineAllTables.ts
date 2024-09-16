import { defineUserTable } from "./tables/userTable"


// method for defining all table structures using the models
export const defineAllTables= ()=>{
    defineUserTable()
}