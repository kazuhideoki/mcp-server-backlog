import axios from "axios";

/**
 * Links shared files to an issue
 * @param apiKey Backlog API key
 * @param baseUrl Backlog base URL
 * @param issueIdOrKey Issue ID or key
 * @param fileIds Array of file IDs to link
 * @returns Linked shared file information
 * @see https://developer.nulab.com/docs/backlog/api/2/link-shared-files-to-issue
 */
export async function linkSharedFilesToIssue(
  apiKey: string,
  baseUrl: string,
  issueIdOrKey: string | number,
  fileIds: number[]
) {
  try {
    const params = {
      apiKey,
    };

    const data = {
      fileId: fileIds,
    };

    const response = await axios.post(
      `https://${baseUrl}/api/v2/issues/${issueIdOrKey}/sharedFiles`,
      data,
      { params }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to link shared files to issue: ${
          error.response?.data?.errors?.[0]?.message || error.message
        }`
      );
    }
    throw error;
  }
}