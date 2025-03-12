import axios from "axios";
import _ from "lodash";

/**
 * Creates a new wiki page.
 * @see https://developer.nulab.com/docs/backlog/api/2/add-wiki-page
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectId ID of the project to create the wiki page in
 * @param name Name of the wiki page
 * @param content Content of the wiki page
 * @param options Additional optional parameters
 *   - `mailNotify`: Send notification email when wiki is created
 *   - `tags`: Array of tags to add to the wiki page
 * @returns The created wiki page information
 */
export async function addWikiPage(
  apiKey: string,
  baseUrl: string,
  projectId: number,
  name: string,
  content: string,
  options: {
    mailNotify?: boolean;
    tags?: string[];
  } = {},
) {
  const { mailNotify, tags } = options;

  try {
    const params = { apiKey };
    
    const data = _.omitBy(
      {
        projectId,
        name,
        content,
        mailNotify,
        tags,
      },
      _.isNil,
    );

    const response = await axios.post(
      `https://${baseUrl}/api/v2/wikis`,
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
    throw new Error(`Failed to create wiki page: ${error.message}`);
  }
}