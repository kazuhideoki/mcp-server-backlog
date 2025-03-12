import axios from "axios";
import _ from "lodash";

/**
 * Removes an attachment from a wiki page.
 * @see https://developer.nulab.com/docs/backlog/api/2/remove-wiki-attachment
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param wikiId ID of the wiki page
 * @param attachmentId ID of the attachment to remove
 * @returns Response data
 */
export async function removeWikiAttachment(
  apiKey: string,
  baseUrl: string,
  wikiId: number,
  attachmentId: number,
) {
  try {
    const params = { apiKey };

    const response = await axios.delete(
      `https://${baseUrl}/api/v2/wikis/${wikiId}/attachments/${attachmentId}`,
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
    throw new Error(`Failed to remove wiki attachment: ${error.message}`);
  }
}