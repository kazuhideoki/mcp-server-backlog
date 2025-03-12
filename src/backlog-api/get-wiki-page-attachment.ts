import axios from "axios";
import _ from "lodash";

/**
 * Gets information about a specific wiki attachment.
 * @see https://developer.nulab.com/docs/backlog/api/2/get-wiki-page-attachment
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param wikiId ID of the wiki page
 * @param attachmentId ID of the attachment
 * @returns Attachment information
 */
export async function getWikiPageAttachment(
  apiKey: string,
  baseUrl: string,
  wikiId: number,
  attachmentId: number,
) {
  try {
    const params = { apiKey };

    const response = await axios.get(
      `https://${baseUrl}/api/v2/wikis/${wikiId}/attachments/${attachmentId}`,
      {
        params,
        responseType: "arraybuffer",
      },
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Backlog API Error: ${error.response?.status} - ${error.response?.data?.errorMessage || error.message}`,
      );
    }
    throw new Error(`Failed to fetch wiki attachment: ${error.message}`);
  }
}