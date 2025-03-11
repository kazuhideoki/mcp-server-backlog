import axios from "axios";

/**
 * Adds a version/milestone to a project.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectIdOrKey Project ID or key
 * @param name Version/milestone name
 * @param options Optional parameters
 * @returns Added version/milestone information
 */
export async function addVersionMilestone(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: number | string,
  name: string,
  options?: {
    description?: string;
    startDate?: string;
    releaseDueDate?: string;
  }
) {
  if (!projectIdOrKey) {
    throw new Error("Project ID or key is required");
  }

  if (!name) {
    throw new Error("Version/milestone name is required");
  }

  try {
    const requestData = {
      name,
      ...options
    };

    const response = await axios.post(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/versions`,
      requestData,
      {
        params: {
          apiKey,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
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
    throw new Error(`Failed to add version/milestone: ${error.message}`);
  }
}