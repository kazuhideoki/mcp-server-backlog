import axios from 'axios';

/**
 * Gets the API rate limit information
 * @param apiKey API key for authentication
 * @param baseUrl Backlog base URL (e.g., 'example.backlog.com')
 * @returns Current rate limit information
 * @see https://developer.nulab.com/docs/backlog/api/2/get-rate-limit
 */
export async function getRateLimit(
  apiKey: string,
  baseUrl: string
) {
  if (!apiKey) throw new Error('apiKey is required');
  if (!baseUrl) throw new Error('baseUrl is required');

  try {
    const response = await axios.get(`https://${baseUrl}/api/v2/rateLimit`, {
      params: {
        apiKey,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        `Failed to get rate limit information: ${error.response.status} ${
          error.response.data.message || error.message
        }`
      );
    }
    throw new Error(`Failed to get rate limit information: ${error instanceof Error ? error.message : String(error)}`);
  }
}