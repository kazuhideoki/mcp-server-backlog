import axios from 'axios';

/**
 * Gets the icon of a team
 * @param apiKey API key for authentication
 * @param baseUrl Backlog base URL (e.g., 'example.backlog.com')
 * @param teamId ID of the team
 * @returns Team icon as binary data
 * @see https://developer.nulab.com/docs/backlog/api/2/get-team-icon
 */
export async function getTeamIcon(
  apiKey: string,
  baseUrl: string,
  teamId: number
) {
  if (!apiKey) throw new Error('apiKey is required');
  if (!baseUrl) throw new Error('baseUrl is required');
  if (!teamId) throw new Error('teamId is required');

  try {
    const response = await axios.get(`https://${baseUrl}/api/v2/teams/${teamId}/icon`, {
      params: {
        apiKey,
      },
      responseType: 'arraybuffer',
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        `Failed to get team icon: ${error.response.status} ${
          error.response.data ? error.response.data.toString() : error.message
        }`
      );
    }
    throw new Error(`Failed to get team icon: ${error instanceof Error ? error.message : String(error)}`);
  }
}