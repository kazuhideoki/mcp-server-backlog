import axios from "axios";

/**
 * Updates a version/milestone in a project.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectIdOrKey Project ID or key
 * @param id Version/milestone ID
 * @param options Update parameters
 * @returns Updated version/milestone information
 */
export async function updateVersionMilestone(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: number | string,
  id: number,
  options: {
    name?: string;
    description?: string;
    startDate?: string;
    releaseDueDate?: string;
    archived?: boolean;
  }
) {
  if (!projectIdOrKey) {
    throw new Error("Project ID or key is required");
  }

  if (!id) {
    throw new Error("Version/milestone ID is required");
  }

  if (Object.keys(options).length === 0) {
    throw new Error("At least one parameter is required for update");
  }

  try {
    const response = await axios.patch(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/versions/${id}`,
      options,
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
    throw new Error(`Failed to update version/milestone: ${error.message}`);
  }
}