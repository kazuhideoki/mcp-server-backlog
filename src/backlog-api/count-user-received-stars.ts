import axios from "axios";
import _ from "lodash";

/**
 * Counts stars received by the specified user.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param userId ID of the user to count stars for
 * @param options Additional options for filtering
 *   - `since`: Start date (format: "YYYY-MM-DD")
 *   - `until`: End date (format: "YYYY-MM-DD")
 * @returns Count of stars received by the user in the specified date range
 */
export async function countUserReceivedStars(
  apiKey: string,
  baseUrl: string,
  userId: number,
  options: {
    since?: string;
    until?: string;
  } = {},
) {
  const { since, until } = options;

  try {
    const params = _.omitBy(
      {
        apiKey,
        since,
        until,
      },
      _.isNil,
    );

    const response = await axios.get(
      `https://${baseUrl}/api/v2/users/${userId}/stars/count`,
      {
        params,
      },
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Backlog API Error: ${error.response?.status} - ${error.response?.data?.errorMessage || error.message}`,
      );
    }
    throw new Error(`Failed to count user received stars: ${error.message}`);
  }
}