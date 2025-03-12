import axios from "axios";

/**
 * Deletes an attachment from a pull request.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectIdOrKey ID or key of the project
 * @param repoIdOrName ID or name of the repository
 * @param number Pull request number
 * @param attachmentId Attachment ID
 * @returns The deleted attachment
 */
export async function deletePullRequestAttachments(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: string | number,
  repoIdOrName: string | number,
  number: number,
  attachmentId: number,
) {
  try {
    const params = { apiKey };

    const response = await axios.delete(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/git/repositories/${repoIdOrName}/pullRequests/${number}/attachments/${attachmentId}`,
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
    throw new Error(`Failed to delete pull request attachment: ${error.message}`);
  }
}