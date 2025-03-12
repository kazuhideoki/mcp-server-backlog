import axios from "axios";
import _ from "lodash";

/**
 * Gets history of a wiki page.
 * @see https://developer.nulab.com/docs/backlog/api/2/get-wiki-page-history
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param wikiId ID of the wiki page
 * @param options Additional options
 *   - `minId`: Minimum ID
 *   - `maxId`: Maximum ID
 *   - `count`: Maximum number of history items to retrieve
 *   - `order`: Order of the results (asc or desc)
 * @returns Wiki page history
 */
export async function getWikiPageHistory(
  apiKey: string,
  baseUrl: string,
  wikiId: number,
  options: {
    minId?: number;
    maxId?: number;
    count?: number;
    order?: "asc" | "desc";
  } = {},
) {
  const { minId, maxId, count, order } = options;

  try {
    const params = _.omitBy(
      {
        apiKey,
        minId,
        maxId,
        count,
        order,
      },
      _.isNil,
    );

    const response = await axios.get(
      `https://${baseUrl}/api/v2/wikis/${wikiId}/history`,
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
    throw new Error(`Failed to fetch wiki page history: ${error.message}`);
  }
}