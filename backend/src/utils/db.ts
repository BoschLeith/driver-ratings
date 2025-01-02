import { turso } from "../turso.js";

export const fetchData = async (query: string, params: string[] = []) => {
  try {
    const { rows } = await turso.execute({ sql: query, args: params });
    return { data: rows, error: null };
  } catch (error) {
    console.error("Database error:", error);
    return { data: null, error: "Database error occurred" };
  }
};
