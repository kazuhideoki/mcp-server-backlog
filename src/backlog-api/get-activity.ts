import axios from "axios";
import _ from "lodash";

/**
 * Gets a specific activity by its ID.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param activityId The ID of the activity to retrieve
 * @returns The activity information
 */
export async function getActivity(
  apiKey: string,
  baseUrl: string,
  activityId: number,
) {
  try {
    const params = { apiKey };

    const response = await axios.get(
      `https://${baseUrl}/api/v2/activities/${activityId}`,
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
    throw new Error(`Failed to fetch activity: ${error.message}`);
  }
}