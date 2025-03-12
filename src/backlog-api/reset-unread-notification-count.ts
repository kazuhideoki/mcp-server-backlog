import axios from "axios";

/**
 * Resets unread notification count.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @returns Result of the operation
 */
export async function resetUnreadNotificationCount(
  apiKey: string,
  baseUrl: string,
) {
  try {
    const params = { apiKey };

    const response = await axios.post(
      `https://${baseUrl}/api/v2/notifications/markAsRead`,
      {},
      {
        params,
        headers: {
          'Content-Type': 'application/json',
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
    throw new Error(`Failed to reset unread notification count: ${error.message}`);
  }
}