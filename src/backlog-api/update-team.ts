import axios from 'axios';
import _ from 'lodash';

/**
 * Updates a team
 * @param apiKey API key for authentication
 * @param baseUrl Backlog base URL (e.g., 'example.backlog.com')
 * @param teamId ID of the team to update
 * @param options Optional parameters
 * @returns The updated team
 * @see https://developer.nulab.com/docs/backlog/api/2/update-team
 */
export async function updateTeam(
  apiKey: string,
  baseUrl: string,
  teamId: number,
  options: {
    name?: string;
    members?: number[];
  } = {}
) {
  if (!apiKey) throw new Error('apiKey is required');
  if (!baseUrl) throw new Error('baseUrl is required');
  if (!teamId) throw new Error('teamId is required');

  const { name, members } = options;

  if (!name && (!members || members.length === 0)) {
    throw new Error('At least one of name or members must be specified');
  }

  try {
    const response = await axios.patch(
      `https://${baseUrl}/api/v2/teams/${teamId}`,
      _.omitBy(
        {
          name,
          members: members && members.length > 0 ? members : undefined,
        },
        _.isNil
      ),
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
        `Failed to update team: ${error.response.status} ${
          error.response.data.message || error.message
        }`
      );
    }
    throw new Error(`Failed to update team: ${error instanceof Error ? error.message : String(error)}`);
  }
}