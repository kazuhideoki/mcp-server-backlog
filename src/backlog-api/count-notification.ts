import axios from "axios";
import _ from "lodash";

/**
 * Counts notifications.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param options Additional options
 *   - `alreadyRead`: If true, counts already read notifications. If false, counts unread notifications.
 * @returns Count of notifications
 */
export async function countNotification(
  apiKey: string,
  baseUrl: string,
  options: {
    alreadyRead?: boolean;
  } = {},
) {
  const { alreadyRead } = options;

  try {
    const params = _.omitBy(
      {
        apiKey,
        alreadyRead,
      },
      _.isNil,
    );

    const response = await axios.get(
      `https://${baseUrl}/api/v2/notifications/count`,
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
    throw new Error(`Failed to count notifications: ${error.message}`);
  }
}