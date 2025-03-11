import axios from "axios";

/**
 * Adds a project administrator.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectIdOrKey Project ID or key
 * @param userId User ID
 * @returns Project administrator information
 */
export async function addProjectAdministrator(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: number | string,
  userId: number
) {
  if (!projectIdOrKey) {
    throw new Error("Project ID or key is required");
  }

  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    const response = await axios.post(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/administrators`,
      {
        userId,
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
    throw new Error(`Failed to add project administrator: ${error.message}`);
  }
}