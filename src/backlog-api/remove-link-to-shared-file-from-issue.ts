import axios from "axios";

/**
 * Removes link to shared file from issue
 * @param apiKey Backlog API key
 * @param baseUrl Backlog base URL
 * @param issueIdOrKey Issue ID or key
 * @param fileId Shared file ID
 * @returns Removed link information
 * @see https://developer.nulab.com/docs/backlog/api/2/remove-link-to-shared-file-from-issue
 */
export async function removeLinkToSharedFileFromIssue(
  apiKey: string,
  baseUrl: string,
  issueIdOrKey: string | number,
  fileId: number
) {
  try {
    const params = {
      apiKey,
    };

    const response = await axios.delete(
      `https://${baseUrl}/api/v2/issues/${issueIdOrKey}/sharedFiles/${fileId}`,
      { params }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to remove link to shared file from issue: ${
          error.response?.data?.errors?.[0]?.message || error.message
        }`
      );
    }
    throw error;
  }
}