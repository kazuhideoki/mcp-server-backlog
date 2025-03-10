import axios from "axios";

/**
 * Deletes a user from a project.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectIdOrKey Project ID or key
 * @param userId User ID
 * @returns Deleted user information
 */
export async function deleteProjectUser(
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
    const response = await axios.delete(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/users`,
      {
        params: {
          apiKey,
          userId,
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
    throw new Error(`Failed to delete user from project: ${error.message}`);
  }
}