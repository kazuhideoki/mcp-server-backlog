import axios from "axios";
import _ from "lodash";

/**
 * Deletes a wiki page.
 * @see https://developer.nulab.com/docs/backlog/api/2/delete-wiki-page
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param wikiId ID of the wiki page to delete
 * @param mailNotify Send notification email when wiki is deleted
 * @returns Response data
 */
export async function deleteWikiPage(
  apiKey: string,
  baseUrl: string,
  wikiId: number,
  mailNotify?: boolean,
) {
  try {
    const params = _.omitBy(
      {
        apiKey,
        mailNotify,
      },
      _.isNil,
    );

    const response = await axios.delete(
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
    throw new Error(`Failed to delete wiki page: ${error.message}`);
  }
}