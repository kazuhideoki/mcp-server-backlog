import axios from "axios";

/**
 * Gets resolution list.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @returns Resolution list
 */
export async function getResolutionList(
  apiKey: string,
  baseUrl: string
) {
  try {
    const response = await axios.get(
      `https://${baseUrl}/api/v2/resolutions`,
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
    throw new Error(`Failed to fetch resolution list: ${error.message}`);
  }
}