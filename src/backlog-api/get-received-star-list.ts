import axios from "axios";
import _ from "lodash";

/**
 * Gets list of stars received by the specified user.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param userId ID of the user to get stars for
 * @param options Additional options for filtering and pagination
 *   - `minId`: Minimum ID of stars to retrieve
 *   - `maxId`: Maximum ID of stars to retrieve
 *   - `count`: Maximum number of stars to retrieve (1-100). Default is 20 if not specified
 *   - `order`: Sort order. "asc" (ascending) or "desc" (descending). Default is "desc" if not specified
 * @returns List of stars received by the user
 */
export async function getReceivedStarList(
  apiKey: string,
  baseUrl: string,
  userId: number,
  options: {
    minId?: number;
    maxId?: number;
    count?: number;
    order?: "desc" | "asc";
  } = {},
) {
  const { minId, maxId, count, order } = options;

  try {
    const params = _.omitBy(
      {
        apiKey,
        minId,
        maxId,
        count,
        order,
      },
      _.isNil,
    );

    const response = await axios.get(
      `https://${baseUrl}/api/v2/users/${userId}/stars`,
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
    throw new Error(`Failed to fetch user received stars: ${error.message}`);
  }
}