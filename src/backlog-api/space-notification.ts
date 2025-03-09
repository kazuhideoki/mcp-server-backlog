import axios from "axios";

/**
 * Gets the space notification.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @returns The space notification information
 */
export async function getSpaceNotification(
  apiKey: string,
  baseUrl: string,
) {
  try {
    const params = { apiKey };

    const response = await axios.get(
      `https://${baseUrl}/api/v2/space/notification`,
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
    throw new Error(`Failed to fetch space notification: ${error.message}`);
  }
}