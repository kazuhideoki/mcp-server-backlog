import axios from "axios";
import _ from "lodash";

/**
 * Adds a new project.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param name Project name
 * @param key Project key
 * @param chartEnabled Chart enabled
 * @param options Additional options
 *   - `textFormattingRule`: Text formatting rule (backlog, markdown)
 *   - `projectLeaderCanEditProjectLeader`: Project leader can edit project leader
 *   - `subtaskingEnabled`: Subtasking enabled
 *   - `externalLinks`: External links
 * @returns Added project information
 */
export async function addProject(
  apiKey: string,
  baseUrl: string,
  name: string,
  key: string,
  chartEnabled: boolean,
  options: {
    textFormattingRule?: "backlog" | "markdown";
    projectLeaderCanEditProjectLeader?: boolean;
    subtaskingEnabled?: boolean;
    externalLinks?: string[];
  } = {}
) {
  if (!name || !key) {
    throw new Error("Project name and key are required");
  }

  const { textFormattingRule, projectLeaderCanEditProjectLeader, subtaskingEnabled, externalLinks } = options;

  try {
    const formData = _.omitBy(
      {
        apiKey,
        name,
        key,
        chartEnabled,
        textFormattingRule,
        projectLeaderCanEditProjectLeader,
        subtaskingEnabled,
        externalLinks,
      },
      _.isNil,
    );

    const response = await axios.post(
      `https://${baseUrl}/api/v2/projects`,
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
    throw new Error(`Failed to add project: ${error.message}`);
  }
}