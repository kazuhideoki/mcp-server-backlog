import axios from "axios";
import { loadApiKey } from "../api-key-loader";
import _ from "lodash";

/**
 * スペース上で行われた最近の更新の一覧を取得します。
 */
export class BacklogSpaceActivities {
  private apiKey: string;
  private baseUrl: string;

  /**
   * Constructor
   * @param spaceId Backlog space ID
   * @param apiKeyPath Path to the file containing the API key
   */
  constructor(
    private spaceId: string,
    apiKeyPath: string,
    private domain: string = "com",
  ) {
    this.apiKey = loadApiKey(apiKeyPath);
    console.log("🟢 this.apiKey", this.apiKey);
    this.baseUrl = `https://${spaceId}.backlog.${domain}/api/v2`;
  }

  /**
   * Fetch recent updates from Backlog
   * @param activityTypeIds Activity type IDs to filter (optional)
   * @param minId Minimum activity ID (optional)
   * @param maxId Maximum activity ID (optional)
   * @param count Number of activities to fetch (default: 20, max: 100)
   * @param order Sort order (default: 'desc')
   * @returns Array of activity objects
   */
  async getRecentUpdates({
    activityTypeIds,
    minId,
    maxId,
    count = 20,
    order = "desc",
  }: {
    activityTypeIds?: number[];
    minId?: number;
    maxId?: number;
    count?: number;
    order?: "desc" | "asc";
  } = {}) {
    try {
      const params = _.omitBy(
        {
          apiKey: this.apiKey,
          activityTypeId:
            activityTypeIds && activityTypeIds.length > 0
              ? activityTypeIds
              : undefined,
          maxId,
          minId,
          count,
          order,
        },
        _.isNil,
      );

      const response = await axios.get(`${this.baseUrl}/space/activities`, {
        params,
      });
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Backlog API Error: ${error.response?.status} - ${error.response?.data?.errorMessage || error.message}`,
        );
      }
      throw new Error(`Failed to fetch recent updates: ${error.message}`);
    }
  }
}
