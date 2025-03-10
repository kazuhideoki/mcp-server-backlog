import axios from "axios";
import _ from "lodash";

/**
 * Returns recent updates in your space.
 * @param apiKey API key string or path to the file containing the API key
 * @param options Additional options including activity filters and pagination
 *   - `activityTypeIds`: Array of activity type IDs (1-26). Multiple IDs can be specified
 *   - `minId`: Minimum ID of updates to retrieve
 *   - `maxId`: Maximum ID of updates to retrieve
 *   - `count`: Maximum number of updates to retrieve (1-100). Default is 20 if not specified
 *   - `order`: Sort order. "asc" (ascending) or "desc" (descending). Default is "desc" if not specified
 * @param baseUrl Override for the base URL
 * @returns Array of activity information
 */
export async function getRecentUpdates(
  apiKey: string,
  baseUrl: string,
  options: {
    activityTypeIds?: number[];
    minId?: number;
    maxId?: number;
    count?: number;
    order?: "desc" | "asc";
  } = {},
) {
  const { activityTypeIds, minId, maxId, count, order } = options;

  try {
    const params = _.omitBy(
      {
        apiKey,
        activityTypeId:
          activityTypeIds && activityTypeIds.length > 0
            ? activityTypeIds
            : undefined,
        maxId,
        minId,
        count,
        order,
      },
      _.isNil,
    );

    const response = await axios.get(
      `https://${baseUrl}/api/v2/space/activities`,
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
    throw new Error(`Failed to fetch recent updates: ${error.message}`);
  }
}
