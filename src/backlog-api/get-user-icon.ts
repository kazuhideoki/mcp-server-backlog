import axios from "axios";

/**
 * Gets the icon of a specified user.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param userId ID of the user to get the icon for
 * @returns User icon data
 */
export async function getUserIcon(
  apiKey: string,
  baseUrl: string,
  userId: number,
) {
  try {
    const params = { apiKey };

    const response = await axios.get(
      `https://${baseUrl}/api/v2/users/${userId}/icon`,
      {
        params,
        responseType: 'arraybuffer',
      },
    );
    
    return {
      data: response.data,
      contentType: response.headers['content-type'],
    };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Backlog API Error: ${error.response?.status} - ${error.response?.data?.errorMessage || error.message}`,
      );
    }
    throw new Error(`Failed to fetch user icon: ${error.message}`);
  }
}