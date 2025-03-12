import axios from "axios";
import _ from "lodash";

/**
 * Gets notification list.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param options Additional options
 *   - `minId`: Minimum ID of notifications to get
 *   - `maxId`: Maximum ID of notifications to get
 *   - `count`: Maximum number of notifications to retrieve
 *   - `order`: Order of notifications ("asc" or "desc")
 * @returns List of notifications
 */
export async function getNotificationList(
  apiKey: string,
  baseUrl: string,
  options: {
    minId?: number;
    maxId?: number;
    count?: number;
    order?: "asc" | "desc";
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
      `https://${baseUrl}/api/v2/notifications`,
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
    throw new Error(`Failed to get notification list: ${error.message}`);
  }
}