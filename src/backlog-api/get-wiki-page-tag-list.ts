import axios from "axios";
import _ from "lodash";

/**
 * Gets list of wiki page tags.
 * @see https://developer.nulab.com/docs/backlog/api/2/get-wiki-page-tag-list
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectIdOrKey ID or key of the project
 * @returns List of wiki page tags
 */
export async function getWikiPageTagList(
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
      `https://${baseUrl}/api/v2/wikis/tags`,
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
    throw new Error(`Failed to fetch wiki page tags: ${error.message}`);
  }
}