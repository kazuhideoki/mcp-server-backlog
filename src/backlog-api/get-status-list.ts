import axios from "axios";

/**
 * Gets status list of a project.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectIdOrKey Project ID or project key
 * @returns Status list of the project
 */
export async function getStatusList(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: number | string
) {
  if (!projectIdOrKey) {
    throw new Error("Project ID or key is required");
  }

  try {
    const response = await axios.get(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/statuses`,
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
    throw new Error(`Failed to fetch project status list: ${error.message}`);
  }
}