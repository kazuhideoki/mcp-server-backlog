import axios from "axios";
import _ from "lodash";

/**
 * Counts the number of wiki pages in a project.
 * @see https://developer.nulab.com/docs/backlog/api/2/count-wiki-page
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectIdOrKey ID or key of the project
 * @returns Count of wiki pages
 */
export async function countWikiPage(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey?: string | number,
) {
  try {
    const params = _.omitBy(
      {
        apiKey,
        projectIdOrKey,
      },
      _.isNil,
    );

    const response = await axios.get(
      `https://${baseUrl}/api/v2/wikis/count`,
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
    throw new Error(`Failed to count wiki pages: ${error.message}`);
  }
}