import axios from "axios";

/**
 * Gets issue participant list
 * @param apiKey Backlog API key
 * @param baseUrl Backlog base URL
 * @param issueIdOrKey Issue ID or key
 * @returns List of issue participants
 * @see https://developer.nulab.com/docs/backlog/api/2/get-issue-participant-list
 */
export async function getIssueParticipantList(
  apiKey: string,
  baseUrl: string,
  issueIdOrKey: string | number
) {
  try {
    const params = {
      apiKey,
    };

    const response = await axios.get(
      `https://${baseUrl}/api/v2/issues/${issueIdOrKey}/participants`,
      { params }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to get issue participant list: ${
          error.response?.data?.errors?.[0]?.message || error.message
        }`
      );
    }
    throw error;
  }
}