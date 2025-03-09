import axios from "axios";

/**
 * Gets list of users in the space.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @returns Information about users in the space
 */
export async function getUsers(
  apiKey: string,
  baseUrl: string,
) {
  try {
    const params = { apiKey };

    const response = await axios.get(
      `https://${baseUrl}/api/v2/users`,
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
    throw new Error(`Failed to fetch users: ${error.message}`);
  }
}