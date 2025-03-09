import axios from "axios";
import _ from "lodash";

/**
 * Gets list of recent updates by the specified user.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param userId ID of the user to get updates for
 * @param options Additional options including filters and pagination
 *   - `activityTypeIds`: Array of activity type IDs to filter by
 *   - `count`: Maximum number of activities to retrieve (1-100). Default is 20 if not specified
 *   - `order`: Sort order. "asc" (ascending) or "desc" (descending). Default is "desc" if not specified
 * @returns List of user's recent activities
 */
export async function getUserRecentUpdates(
  apiKey: string,
  baseUrl: string,
  userId: number,
  options: {
    activityTypeIds?: number[];
    count?: number;
    order?: "desc" | "asc";
  } = {},
) {
  const { activityTypeIds, count, order } = options;

  try {
    const params = _.omitBy(
      {
        apiKey,
        activityTypeId:
          activityTypeIds && activityTypeIds.length > 0
            ? activityTypeIds
            : undefined,
        count,
        order,
      },
      _.isNil,
    );

    const response = await axios.get(
      `https://${baseUrl}/api/v2/users/${userId}/activities`,
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
    throw new Error(`Failed to fetch user recent updates: ${error.message}`);
  }
}