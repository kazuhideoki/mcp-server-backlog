import axios from "axios";

/**
 * Gets priority list.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @returns Priority list
 */
export async function getPriorityList(
  apiKey: string,
  baseUrl: string
) {
  try {
    const response = await axios.get(
      `https://${baseUrl}/api/v2/priorities`,
      {
        params: {
          apiKey,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Backlog API Error: ${error.response?.status} - ${error.response?.data?.errorMessage || error.message}`,
      );
    }
    throw new Error(`Failed to fetch priority list: ${error.message}`);
  }
}