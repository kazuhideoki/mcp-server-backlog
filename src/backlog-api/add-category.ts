import axios from "axios";

/**
 * Adds a category to a project.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectIdOrKey Project ID or key
 * @param name Category name
 * @returns Added category information
 */
export async function addCategory(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: number | string,
  name: string
) {
  if (!projectIdOrKey) {
    throw new Error("Project ID or key is required");
  }

  if (!name) {
    throw new Error("Category name is required");
  }

  try {
    const response = await axios.post(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/categories`,
      {
        name
      },
      {
        params: {
          apiKey,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Backlog API Error: ${error.response?.status} - ${error.response?.data?.errorMessage || error.message}`,
      );
    }
    throw new Error(`Failed to add category: ${error.message}`);
  }
}