import axios from "axios";
import { loadApiKey } from "../api-key-loader";

/**
 * Backlog API client for fetching recent updates
 */
export class BacklogRecentUpdates {
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
    private domain: string = 'jp'
  ) {
    this.apiKey = loadApiKey(apiKeyPath);
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
      const params: Record<string, string | number | (string | number)[]> = {
        apiKey: this.apiKey,
      };

      if (activityTypeIds && activityTypeIds.length > 0) {
        params.activityTypeId = activityTypeIds;
      }

      if (minId !== undefined) {
        params.minId = minId;
      }

      if (maxId !== undefined) {
        params.maxId = maxId;
      }

      if (count !== undefined) {
        params.count = Math.min(count, 100); // Backlog API limits to 100
      }

      if (order) {
        params.order = order;
      }

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
