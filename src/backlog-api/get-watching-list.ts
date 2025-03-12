import axios from 'axios';
import _ from 'lodash';

/**
 * Gets the list of watchings for a user
 * @param apiKey API key for authentication
 * @param baseUrl Backlog base URL (e.g., 'example.backlog.com')
 * @param userId User ID
 * @param options Optional parameters
 * @returns List of watching items
 * @see https://developer.nulab.com/docs/backlog/api/2/get-watching-list
 */
export async function getWatchingList(
  apiKey: string,
  baseUrl: string,
  userId: number,
  options: {
    count?: number;
    order?: 'asc' | 'desc';
    offset?: number;
    resourceAlreadyRead?: boolean;
    alreadyRead?: boolean;
  } = {}
) {
  if (!apiKey) throw new Error('apiKey is required');
  if (!baseUrl) throw new Error('baseUrl is required');
  if (!userId) throw new Error('userId is required');

  const { count, order, offset, resourceAlreadyRead, alreadyRead } = options;

  try {
    const response = await axios.get(`https://${baseUrl}/api/v2/users/${userId}/watchings`, {
      params: _.omitBy(
        {
          apiKey,
          count,
          order,
          offset,
          resourceAlreadyRead,
          alreadyRead,
        },
        _.isNil
      ),
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        `Failed to get watching list: ${error.response.status} ${
          error.response.data.message || error.message
        }`
      );
    }
    throw new Error(`Failed to get watching list: ${error instanceof Error ? error.message : String(error)}`);
  }
}