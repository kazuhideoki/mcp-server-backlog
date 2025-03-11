import axios from "axios";

/**
 * Updates a category in a project.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectIdOrKey Project ID or key
 * @param id Category ID
 * @param name Category name
 * @returns Updated category information
 */
export async function updateCategory(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: number | string,
  id: number,
  name: string
) {
  if (!projectIdOrKey) {
    throw new Error("Project ID or key is required");
  }

  if (!id) {
    throw new Error("Category ID is required");
  }

  if (!name) {
    throw new Error("Category name is required");
  }

  try {
    const response = await axios.patch(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/categories/${id}`,
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
    throw new Error(`Failed to update category: ${error.message}`);
  }
}