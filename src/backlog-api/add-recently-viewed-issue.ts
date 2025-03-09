import axios from "axios";

/**
 * Adds an issue to the list of recently viewed issues.
 * @param apiKey API key string
 * @param baseUrl Override for the base URL
 * @param issueId ID of the issue to add to recently viewed issues
 * @returns Issue information that was added to recently viewed
 */
export async function addRecentlyViewedIssue(
  apiKey: string,
  baseUrl: string,
  issueId: number | string,
) {
  try {
    const response = await axios.post(
      `https://${baseUrl}/api/v2/users/myself/recentlyViewedIssues`,
      { issueId },
      {
        params: {
          apiKey,
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
    throw new Error(`Failed to add issue to recently viewed: ${error.message}`);
  }
}