import axios from 'axios';
import _ from 'lodash';

/**
 * Adds a watching to an issue
 * @param apiKey API key for authentication
 * @param baseUrl Backlog base URL (e.g., 'example.backlog.com')
 * @param issueIdOrKey ID or key of the issue to watch
 * @param options Optional parameters
 * @returns The created watching
 * @see https://developer.nulab.com/docs/backlog/api/2/add-watching
 */
export async function addWatching(
  apiKey: string,
  baseUrl: string,
  issueIdOrKey: string | number,
  options: {
    note?: string;
  } = {}
) {
  if (!apiKey) throw new Error('apiKey is required');
  if (!baseUrl) throw new Error('baseUrl is required');
  if (!issueIdOrKey) throw new Error('issueIdOrKey is required');

  const { note } = options;

  try {
    const response = await axios.post(
      `https://${baseUrl}/api/v2/watchings`,
      _.omitBy(
        {
          issueIdOrKey,
          note,
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
        `Failed to add watching: ${error.response.status} ${
          error.response.data.message || error.message
        }`
      );
    }
    throw new Error(`Failed to add watching: ${error instanceof Error ? error.message : String(error)}`);
  }
}