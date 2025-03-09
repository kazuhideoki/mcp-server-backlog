import axios from "axios";

/**
 * Updates the space notification.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param content The notification content to set
 * @returns The updated space notification information
 */
export async function updateSpaceNotification(
  apiKey: string,
  baseUrl: string,
  content: string,
) {
  try {
    const params = { apiKey };
    const data = { content };

    const response = await axios.put(
      `https://${baseUrl}/api/v2/space/notification`,
      data,
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
    throw new Error(`Failed to update space notification: ${error.message}`);
  }
}