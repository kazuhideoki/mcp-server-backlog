import axios from "axios";
import _ from "lodash";

/**
 * Gets list of recently viewed issues
 * @param apiKey API key string
 * @param baseUrl Override for the base URL
 * @param options Additional options including order and pagination
 *   - `order`: Sort order. "asc" (ascending) or "desc" (descending). Default is "desc" if not specified
 *   - `offset`: Offset to start retrieving issues from (used for pagination)
 *   - `count`: Maximum number of issues to retrieve
 * @returns Array of recently viewed issues
 */
export async function getRecentlyViewedIssues(
  apiKey: string,
  baseUrl: string,
  options: {
    order?: "desc" | "asc";
    offset?: number;
    count?: number;
  } = {},
) {
  const { order, offset, count } = options;

  try {
    const params = _.omitBy(
      {
        apiKey,
        order,
        offset,
        count,
      },
      _.isNil,
    );

    const response = await axios.get(
      `https://${baseUrl}/api/v2/users/myself/recentlyViewedIssues`,
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
    throw new Error(`Failed to fetch recently viewed issues: ${error.message}`);
  }
}