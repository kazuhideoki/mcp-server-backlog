import axios from "axios";
import _ from "lodash";

/**
 * Updates a project.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectIdOrKey Project ID or key
 * @param options Update options
 *   - `name`: Project name
 *   - `key`: Project key
 *   - `chartEnabled`: Chart enabled
 *   - `subtaskingEnabled`: Subtasking enabled
 *   - `projectLeaderCanEditProjectLeader`: Project leader can edit project leader
 *   - `textFormattingRule`: Text formatting rule (backlog, markdown)
 *   - `archived`: Archive the project
 * @returns Updated project information
 */
export async function updateProject(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: number | string,
  options: {
    name?: string;
    key?: string;
    chartEnabled?: boolean;
    subtaskingEnabled?: boolean;
    projectLeaderCanEditProjectLeader?: boolean;
    textFormattingRule?: "backlog" | "markdown";
    archived?: boolean;
  } = {}
) {
  if (!projectIdOrKey) {
    throw new Error("Project ID or key is required");
  }

  try {
    const formData = _.omitBy(
      {
        apiKey,
        ...options,
      },
      _.isNil,
    );

    const response = await axios.patch(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}`,
      formData,
      {
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
    throw new Error(`Failed to update project: ${error.message}`);
  }
}