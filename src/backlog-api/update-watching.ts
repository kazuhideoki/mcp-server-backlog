import axios from 'axios';
import _ from 'lodash';

/**
 * Updates a watching
 * @param apiKey API key for authentication
 * @param baseUrl Backlog base URL (e.g., 'example.backlog.com')
 * @param watchingId ID of the watching to update
 * @param note Note to set for the watching
 * @returns The updated watching
 * @see https://developer.nulab.com/docs/backlog/api/2/update-watching
 */
export async function updateWatching(
  apiKey: string,
  baseUrl: string,
  watchingId: number,
  note: string
) {
  if (!apiKey) throw new Error('apiKey is required');
  if (!baseUrl) throw new Error('baseUrl is required');
  if (!watchingId) throw new Error('watchingId is required');
  if (!note) throw new Error('note is required');

  try {
    const response = await axios.patch(
      `https://${baseUrl}/api/v2/watchings/${watchingId}`,
      {
        note,
      },
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
        `Failed to update watching: ${error.response.status} ${
          error.response.data.message || error.message
        }`
      );
    }
    throw new Error(`Failed to update watching: ${error instanceof Error ? error.message : String(error)}`);
  }
}