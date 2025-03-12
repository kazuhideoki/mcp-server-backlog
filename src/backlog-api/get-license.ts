import axios from 'axios';

/**
 * Gets the license information for the space
 * @param apiKey API key for authentication
 * @param baseUrl Backlog base URL (e.g., 'example.backlog.com')
 * @returns Information about the license
 * @see https://developer.nulab.com/docs/backlog/api/2/get-licence
 */
export async function getLicense(
  apiKey: string,
  baseUrl: string
) {
  if (!apiKey) throw new Error('apiKey is required');
  if (!baseUrl) throw new Error('baseUrl is required');

  try {
    const response = await axios.get(`https://${baseUrl}/api/v2/space/licence`, {
      params: {
        apiKey,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        `Failed to get license: ${error.response.status} ${
          error.response.data.message || error.message
        }`
      );
    }
    throw new Error(`Failed to get license: ${error instanceof Error ? error.message : String(error)}`);
  }
}