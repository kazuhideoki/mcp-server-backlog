import axios from "axios";

/**
 * Adds a wiki to the list of recently viewed wikis.
 * @param apiKey API key string
 * @param baseUrl Override for the base URL
 * @param wikiId ID of the wiki to add to recently viewed wikis
 * @returns Wiki information that was added to recently viewed
 */
export async function addRecentlyViewedWiki(
  apiKey: string,
  baseUrl: string,
  wikiId: number | string,
) {
  try {
    const response = await axios.post(
      `https://${baseUrl}/api/v2/users/myself/recentlyViewedWikis`,
      { wikiId },
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
    throw new Error(`Failed to add wiki to recently viewed: ${error.message}`);
  }
}