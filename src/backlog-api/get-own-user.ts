import axios from "axios";

/**
 * Gets information about the authenticated user (myself).
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @returns Information about the authenticated user
 */
export async function getOwnUser(
  apiKey: string,
  baseUrl: string,
) {
  try {
    const params = { apiKey };

    const response = await axios.get(
      `https://${baseUrl}/api/v2/users/myself`,
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
    throw new Error(`Failed to fetch own user information: ${error.message}`);
  }
}