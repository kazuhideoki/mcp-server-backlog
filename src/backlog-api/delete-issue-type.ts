import axios from "axios";

/**
 * Deletes an issue type from a project.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectIdOrKey Project ID or key
 * @param id Issue type ID
 * @returns Response from the server
 */
export async function deleteIssueType(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: number | string,
  id: number
) {
  if (!projectIdOrKey) {
    throw new Error("Project ID or key is required");
  }

  if (!id) {
    throw new Error("Issue type ID is required");
  }

  try {
    const response = await axios.delete(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/issueTypes/${id}`,
      {
        params: {
          apiKey
        }
      }
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Backlog API Error: ${error.response?.status} - ${error.response?.data?.errorMessage || error.message}`,
      );
    }
    throw new Error(`Failed to delete issue type: ${error.message}`);
  }
}