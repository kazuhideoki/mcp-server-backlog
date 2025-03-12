import axios from 'axios';

/**
 * Deletes a watching
 * @param apiKey API key for authentication
 * @param baseUrl Backlog base URL (e.g., 'example.backlog.com')
 * @param watchingId ID of the watching to delete
 * @returns The deleted watching
 * @see https://developer.nulab.com/docs/backlog/api/2/delete-watching
 */
export async function deleteWatching(
  apiKey: string,
  baseUrl: string,
  watchingId: number
) {
  if (!apiKey) throw new Error('apiKey is required');
  if (!baseUrl) throw new Error('baseUrl is required');
  if (!watchingId) throw new Error('watchingId is required');

  try {
    const response = await axios.delete(`https://${baseUrl}/api/v2/watchings/${watchingId}`, {
      params: {
        apiKey,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        `Failed to delete watching: ${error.response.status} ${
          error.response.data.message || error.message
        }`
      );
    }
    throw new Error(`Failed to delete watching: ${error instanceof Error ? error.message : String(error)}`);
  }
}