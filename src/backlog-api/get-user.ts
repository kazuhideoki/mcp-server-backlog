import axios from "axios";

/**
 * Gets information about a specific user.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param userId ID of the user to retrieve
 * @returns Information about the specified user
 */
export async function getUser(
  apiKey: string,
  baseUrl: string,
  userId: number,
) {
  try {
    const params = { apiKey };

    const response = await axios.get(
      `https://${baseUrl}/api/v2/users/${userId}`,
      {
        params,
      },
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Backlog API Error: ${error.response?.status} - ${error.response?.data?.errorMessage || error.message}`,
      );
    }
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}