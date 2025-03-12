import axios from "axios";
import _ from "lodash";

/**
 * Updates a wiki page.
 * @see https://developer.nulab.com/docs/backlog/api/2/update-wiki-page
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param wikiId ID of the wiki page to update
 * @param options Optional parameters to update
 *   - `name`: New name of the wiki page
 *   - `content`: New content of the wiki page
 *   - `mailNotify`: Send notification email when wiki is updated
 *   - `tags`: Array of new tags to set on the wiki page
 * @returns The updated wiki page information
 */
export async function updateWikiPage(
  apiKey: string,
  baseUrl: string,
  wikiId: number,
  options: {
    name?: string;
    content?: string;
    mailNotify?: boolean;
    tags?: string[];
  } = {},
) {
  const { name, content, mailNotify, tags } = options;

  try {
    const params = { apiKey };
    
    const data = _.omitBy(
      {
        name,
        content,
        mailNotify,
        tags,
      },
      _.isNil,
    );

    const response = await axios.patch(
      `https://${baseUrl}/api/v2/wikis/${wikiId}`,
      data,
      {
        params,
        headers: {
          'Content-Type': 'application/json',
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
    throw new Error(`Failed to update wiki page: ${error.message}`);
  }
}