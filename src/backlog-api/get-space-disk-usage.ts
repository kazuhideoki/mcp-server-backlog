import axios from "axios";

/**
 * Gets information about disk usage in the space.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @returns Information about disk usage in the space
 */
export async function getSpaceDiskUsage(
  apiKey: string,
  baseUrl: string,
) {
  try {
    const params = { apiKey };

    const response = await axios.get(
      `https://${baseUrl}/api/v2/space/diskUsage`,
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
    throw new Error(`Failed to fetch disk usage: ${error.message}`);
  }
}