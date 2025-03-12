import axios from "axios";

/**
 * Updates a pull request comment.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectIdOrKey ID or key of the project
 * @param repoIdOrName ID or name of the repository
 * @param number Pull request number
 * @param commentId Comment ID
 * @param content New content of the comment
 * @returns The updated comment
 */
export async function updatePullRequestCommentInformation(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: string | number,
  repoIdOrName: string | number,
  number: number,
  commentId: number,
  content: string,
) {
  try {
    const params = { apiKey };
    
    const data = { content };

    const response = await axios.patch(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/git/repositories/${repoIdOrName}/pullRequests/${number}/comments/${commentId}`,
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
    throw new Error(`Failed to update pull request comment: ${error.message}`);
  }
}