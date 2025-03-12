import axios from "axios";
import _ from "lodash";

/**
 * Gets list of wiki pages.
 * @see https://developer.nulab.com/docs/backlog/api/2/get-wiki-page-list
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param options Additional options including filters and pagination
 *   - `projectIdOrKey`: ID or key of the project
 *   - `keyword`: Keyword to filter by 
 *   - `count`: Maximum number of wiki pages to retrieve (1-100)
 *   - `offset`: Offset for pagination
 * @returns List of wiki pages
 */
export async function getWikiPageList(
  apiKey: string,
  baseUrl: string,
  options: {
    projectIdOrKey?: string | number;
    keyword?: string;
    count?: number;
    offset?: number;
  } = {},
) {
  const { projectIdOrKey, keyword, count, offset } = options;

  try {
    const params = _.omitBy(
      {
        apiKey,
        projectIdOrKey,
        keyword,
        count,
        offset,
      },
      _.isNil,
    );

    const response = await axios.get(
      `https://${baseUrl}/api/v2/wikis`,
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
    throw new Error(`Failed to fetch wiki pages: ${error.message}`);
  }
}