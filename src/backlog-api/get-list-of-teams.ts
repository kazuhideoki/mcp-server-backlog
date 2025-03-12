import axios from 'axios';
import _ from 'lodash';

/**
 * Gets the list of teams
 * @param apiKey API key for authentication
 * @param baseUrl Backlog base URL (e.g., 'example.backlog.com')
 * @param options Optional parameters
 * @returns List of teams
 * @see https://developer.nulab.com/docs/backlog/api/2/get-list-of-teams
 */
export async function getListOfTeams(
  apiKey: string,
  baseUrl: string,
  options: {
    offset?: number;
    count?: number;
  } = {}
) {
  if (!apiKey) throw new Error('apiKey is required');
  if (!baseUrl) throw new Error('baseUrl is required');

  const { offset, count } = options;

  try {
    const response = await axios.get(`https://${baseUrl}/api/v2/teams`, {
      params: _.omitBy(
        {
          apiKey,
          offset,
          count,
        },
        _.isNil
      ),
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        `Failed to get list of teams: ${error.response.status} ${
          error.response.data.message || error.message
        }`
      );
    }
    throw new Error(`Failed to get list of teams: ${error instanceof Error ? error.message : String(error)}`);
  }
}