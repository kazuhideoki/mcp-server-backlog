import axios from "axios";

/**
 * Gets issue attachment
 * @param apiKey Backlog API key
 * @param baseUrl Backlog base URL
 * @param issueIdOrKey Issue ID or key
 * @param attachmentId Attachment ID
 * @returns Attachment file data
 * @see https://developer.nulab.com/docs/backlog/api/2/get-issue-attachment
 */
export async function getIssueAttachment(
  apiKey: string,
  baseUrl: string,
  issueIdOrKey: string | number,
  attachmentId: number
) {
  try {
    const params = {
      apiKey,
    };

    const response = await axios.get(
      `https://${baseUrl}/api/v2/issues/${issueIdOrKey}/attachments/${attachmentId}`,
      { 
        params,
        responseType: 'arraybuffer'
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to get issue attachment: ${
          error.response?.data?.errors?.[0]?.message || error.message
        }`
      );
    }
    throw error;
  }
}