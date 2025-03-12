import axios from 'axios';
import _ from 'lodash';

/**
 * Adds a new team
 * @param apiKey API key for authentication
 * @param baseUrl Backlog base URL (e.g., 'example.backlog.com')
 * @param name Name of the team
 * @param options Optional parameters
 * @returns The created team
 * @see https://developer.nulab.com/docs/backlog/api/2/add-team
 */
export async function addTeam(
  apiKey: string,
  baseUrl: string,
  name: string,
  options: {
    members?: number[];
  } = {}
) {
  if (!apiKey) throw new Error('apiKey is required');
  if (!baseUrl) throw new Error('baseUrl is required');
  if (!name) throw new Error('name is required');

  const { members } = options;

  try {
    const response = await axios.post(
      `https://${baseUrl}/api/v2/teams`,
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
        `Failed to add team: ${error.response.status} ${
          error.response.data.message || error.message
        }`
      );
    }
    throw new Error(`Failed to add team: ${error instanceof Error ? error.message : String(error)}`);
  }
}