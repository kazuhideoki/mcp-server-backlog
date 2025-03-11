import axios from "axios";

/**
 * Deletes a status from a project.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectIdOrKey Project ID or key
 * @param id Status ID
 * @returns Response from the server
 */
export async function deleteStatus(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: number | string,
  id: number
) {
  if (!projectIdOrKey) {
    throw new Error("Project ID or key is required");
  }

  if (!id) {
    throw new Error("Status ID is required");
  }

  try {
    const response = await axios.delete(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/statuses/${id}`,
      {
        params: {
          apiKey
        }
      }
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Backlog API Error: ${error.response?.status} - ${error.response?.data?.errorMessage || error.message}`,
      );
    }
    throw new Error(`Failed to delete status: ${error.message}`);
  }
}