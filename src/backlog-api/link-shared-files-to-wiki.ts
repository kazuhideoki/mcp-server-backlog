import axios from "axios";
import _ from "lodash";

/**
 * Links shared files to a wiki page.
 * @see https://developer.nulab.com/docs/backlog/api/2/link-shared-files-to-wiki
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param wikiId ID of the wiki page
 * @param fileIds Array of file IDs to link
 * @returns Information about the linked files
 */
export async function linkSharedFilesToWiki(
  apiKey: string,
  baseUrl: string,
  wikiId: number,
  fileIds: number[],
) {
  try {
    const params = { apiKey };
    
    const data = { fileIds };

    const response = await axios.post(
      `https://${baseUrl}/api/v2/wikis/${wikiId}/sharedFiles`,
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
    throw new Error(`Failed to link shared files to wiki: ${error.message}`);
  }
}