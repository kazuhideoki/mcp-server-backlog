import axios from "axios";

/**
 * Deletes an issue attachment
 * @param apiKey Backlog API key
 * @param baseUrl Backlog base URL
 * @param issueIdOrKey Issue ID or key
 * @param attachmentId Attachment ID
 * @returns Deleted attachment information
 * @see https://developer.nulab.com/docs/backlog/api/2/delete-issue-attachment
 */
export async function deleteIssueAttachment(
  apiKey: string,
  baseUrl: string,
  issueIdOrKey: string | number,
  attachmentId: number
) {
  try {
    const params = {
      apiKey,
    };

    const response = await axios.delete(
      `https://${baseUrl}/api/v2/issues/${issueIdOrKey}/attachments/${attachmentId}`,
      { params }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to delete issue attachment: ${
          error.response?.data?.errors?.[0]?.message || error.message
        }`
      );
    }
    throw error;
  }
}