import axios from "axios";
import _ from "lodash";

/**
 * Gets information about a specific wiki page.
 * @see https://developer.nulab.com/docs/backlog/api/2/get-wiki-page
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param wikiId ID of the wiki page
 * @returns Wiki page information
 */
export async function getWikiPage(
  apiKey: string,
  baseUrl: string,
  wikiId: number,
) {
  try {
    const params = { apiKey };

    const response = await axios.get(
      `https://${baseUrl}/api/v2/wikis/${wikiId}`,
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
    throw new Error(`Failed to fetch wiki page: ${error.message}`);
  }
}