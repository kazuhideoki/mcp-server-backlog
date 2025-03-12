import axios from 'axios';

/**
 * Gets information about a specific team
 * @param apiKey API key for authentication
 * @param baseUrl Backlog base URL (e.g., 'example.backlog.com')
 * @param teamId ID of the team
 * @returns Information about the team
 * @see https://developer.nulab.com/docs/backlog/api/2/get-team
 */
export async function getTeam(
  apiKey: string,
  baseUrl: string,
  teamId: number
) {
  if (!apiKey) throw new Error('apiKey is required');
  if (!baseUrl) throw new Error('baseUrl is required');
  if (!teamId) throw new Error('teamId is required');

  try {
    const response = await axios.get(`https://${baseUrl}/api/v2/teams/${teamId}`, {
      params: {
        apiKey,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        `Failed to get team: ${error.response.status} ${
          error.response.data.message || error.message
        }`
      );
    }
    throw new Error(`Failed to get team: ${error instanceof Error ? error.message : String(error)}`);
  }
}