import axios from "axios";
import _ from "lodash";

/**
 * Attaches a file to a wiki page.
 * @see https://developer.nulab.com/docs/backlog/api/2/attach-file-to-wiki
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param wikiId ID of the wiki page
 * @param attachmentId ID of the attachment to attach (obtained from post-attachment-file)
 * @returns Information about the attached file
 */
export async function attachFileToWiki(
  apiKey: string,
  baseUrl: string,
  wikiId: number,
  attachmentId: number,
) {
  try {
    const params = { apiKey };
    
    const data = { attachmentId };

    const response = await axios.post(
      `https://${baseUrl}/api/v2/wikis/${wikiId}/attachments`,
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
    throw new Error(`Failed to attach file to wiki: ${error.message}`);
  }
}