import axios from 'axios';

/**
 * Marks a watching as read
 * @param apiKey API key for authentication
 * @param baseUrl Backlog base URL (e.g., 'example.backlog.com')
 * @param watchingId ID of the watching to mark as read
 * @returns The updated watching
 * @see https://developer.nulab.com/docs/backlog/api/2/mark-watching-as-read
 */
export async function markWatchingAsRead(
  apiKey: string,
  baseUrl: string,
  watchingId: number
) {
  if (!apiKey) throw new Error('apiKey is required');
  if (!baseUrl) throw new Error('baseUrl is required');
  if (!watchingId) throw new Error('watchingId is required');

  try {
    const response = await axios.post(
      `https://${baseUrl}/api/v2/watchings/${watchingId}/markAsRead`,
      {},
      {
        params: {
          apiKey,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        `Failed to mark watching as read: ${error.response.status} ${
          error.response.data.message || error.message
        }`
      );
    }
    throw new Error(`Failed to mark watching as read: ${error instanceof Error ? error.message : String(error)}`);
  }
}