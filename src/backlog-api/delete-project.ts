import axios from "axios";

/**
 * Deletes a project.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectIdOrKey Project ID or key
 * @returns Deleted project information
 */
export async function deleteProject(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: number | string
) {
  if (!projectIdOrKey) {
    throw new Error("Project ID or key is required");
  }

  try {
    const response = await axios.delete(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}`,
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
    throw new Error(`Failed to delete project: ${error.message}`);
  }
}