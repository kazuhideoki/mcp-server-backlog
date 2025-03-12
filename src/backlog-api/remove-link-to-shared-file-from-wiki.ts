import axios from "axios";
import _ from "lodash";

/**
 * Removes a link to a shared file from a wiki page.
 * @see https://developer.nulab.com/docs/backlog/api/2/remove-link-to-shared-file-from-wiki
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param wikiId ID of the wiki page
 * @param fileId ID of the file to unlink
 * @returns Response data
 */
export async function removeLinkToSharedFileFromWiki(
  apiKey: string,
  baseUrl: string,
  wikiId: number,
  fileId: number,
) {
  try {
    const params = { apiKey };

    const response = await axios.delete(
      `https://${baseUrl}/api/v2/wikis/${wikiId}/sharedFiles/${fileId}`,
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
    throw new Error(`Failed to remove link to shared file from wiki: ${error.message}`);
  }
}