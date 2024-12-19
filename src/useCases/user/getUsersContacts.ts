import { UserContacts } from "../../domain/entities/UserContacts";

export const getUserContacts = async (page = 1, size = 10) => {
  const limit = size; // Number of records per page
  const offset = (page - 1) * size; // Starting point for the current page

  const { count, rows } = await UserContacts.findAndCountAll({
    limit,
    offset,
    attributes: { exclude: ["id", "ownerId", "updatedAt"] },
  });

  return {
    totalItems: count,
    result: rows,
    totalPages: Math.ceil(count / size),
    currentPage: page,
  };
};
