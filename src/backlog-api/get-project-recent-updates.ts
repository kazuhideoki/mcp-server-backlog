import axios from "axios";
import _ from "lodash";

/**
 * Gets recent updates in a project.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param projectIdOrKey Project ID or key
 * @param options Additional options
 *   - `activityTypeIds`: Activity type IDs
 *   - `minId`: Minimum ID
 *   - `maxId`: Maximum ID
 *   - `count`: Number of activities to retrieve
 *   - `order`: Order of activities (desc or asc)
 * @returns Recent updates in the project
 */
export async function getProjectRecentUpdates(
  apiKey: string,
  baseUrl: string,
  projectIdOrKey: number | string,
  options: {
    activityTypeIds?: number[];
    minId?: number;
    maxId?: number;
    count?: number;
    order?: "desc" | "asc";
  } = {}
) {
  if (!projectIdOrKey) {
    throw new Error("Project ID or key is required");
  }

  const { activityTypeIds, minId, maxId, count, order } = options;

  try {
    const params = _.omitBy(
      {
        apiKey,
        activityTypeId: activityTypeIds,
        minId,
        maxId,
        count,
        order,
      },
      _.isNil,
    );

    const response = await axios.get(
      `https://${baseUrl}/api/v2/projects/${projectIdOrKey}/activities`,
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
    throw new Error(`Failed to fetch project recent updates: ${error.message}`);
  }
}