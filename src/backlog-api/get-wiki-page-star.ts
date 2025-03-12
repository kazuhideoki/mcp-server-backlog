import axios from "axios";
import _ from "lodash";

/**
 * Gets the list of stars for a wiki page.
 * @see https://developer.nulab.com/docs/backlog/api/2/get-wiki-page-star
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param wikiId ID of the wiki page
 * @returns List of stars for the wiki page
 */
export async function getWikiPageStar(
  apiKey: string,
  baseUrl: string,
  wikiId: number,
) {
  try {
    const params = { apiKey };

    const response = await axios.get(
      `https://${baseUrl}/api/v2/wikis/${wikiId}/stars`,
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
    throw new Error(`Failed to fetch wiki page stars: ${error.message}`);
  }
}