import axios from "axios";

/**
 * Gets the space logo image.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @returns The space logo image data
 */
export async function getSpaceLogo(
  apiKey: string,
  baseUrl: string,
) {
  try {
    const params = { apiKey };

    const response = await axios.get(
      `https://${baseUrl}/api/v2/space/image`,
      {
        params,
        responseType: 'arraybuffer',
      },
    );
    
    // Return the image data and content type
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
    throw new Error(`Failed to fetch space logo: ${error.message}`);
  }
}