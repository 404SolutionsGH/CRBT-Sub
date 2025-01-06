import { UserContacts } from "../../domain/entities/UserContacts";

export const getUserContacts = async (page = 1, size = 10) => {
  const contacts = await UserContacts.findAll({
    attributes: { exclude: ["id", "ownerId", "updatedAt"] },
  });

  const results: string[] = [];

  contacts.forEach((contact) => {
    contact.contacts.forEach((phone) => {
      results.push(phone);
    });
  });
  return {
    totalItems: results.length,
    results
  };
};
