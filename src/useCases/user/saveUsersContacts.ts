import { UserContacts } from "../../domain/entities/UserContacts";




export const saveUsersContacts = async (contacts: string[], ownerId: number) => {
  await UserContacts.upsert({ ownerId, contacts });
};
