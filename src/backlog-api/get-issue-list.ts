import axios from "axios";
import _ from "lodash";

/**
 * Gets list of issues.
 * @param apiKey API key string
 * @param baseUrl Base URL for the Backlog API
 * @param options Additional options including filters and pagination
 *   - `projectId`: Array of project IDs to get issues from
 *   - `issueTypeId`: Array of issue type IDs to filter by
 *   - `categoryId`: Array of category IDs to filter by
 *   - `versionId`: Array of version IDs to filter by
 *   - `milestoneId`: Array of milestone IDs to filter by
 *   - `statusId`: Array of status IDs to filter by
 *   - `priorityId`: Array of priority IDs to filter by
 *   - `assigneeId`: Array of assignee user IDs to filter by
 *   - `createdUserId`: Array of created user IDs to filter by
 *   - `resolutionId`: Array of resolution IDs to filter by
 *   - `parentChild`: Subtasking filter (0: All, 1: Exclude Child Issue, 2: Child Issue, 3: Neither Parent Issue nor Child Issue, 4: Parent Issue)
 *   - `attachment`: True to include issues with attachments
 *   - `sharedFile`: True to include issues with shared files
 *   - `sort`: Field to sort by
 *   - `order`: "asc" or "desc"
 *   - `offset`: Offset for pagination
 *   - `count`: Maximum number of issues to retrieve (1-100). Default is 20 if not specified
 *   - `createdSince`: Created since (yyyy-MM-dd)
 *   - `createdUntil`: Created until (yyyy-MM-dd)
 *   - `updatedSince`: Updated since (yyyy-MM-dd)
 *   - `updatedUntil`: Updated until (yyyy-MM-dd)
 *   - `startDateSince`: Start date since (yyyy-MM-dd)
 *   - `startDateUntil`: Start date until (yyyy-MM-dd)
 *   - `dueDateSince`: Due date since (yyyy-MM-dd)
 *   - `dueDateUntil`: Due date until (yyyy-MM-dd)
 *   - `id`: Array of issue IDs to filter by
 *   - `parentIssueId`: Array of parent issue IDs to filter by
 *   - `keyword`: Keyword to search for
 *   - `customField_${id}`: Custom field (text/list)
 *   - `customField_${id}_min`: Custom field minimum (numeric/date)
 *   - `customField_${id}_max`: Custom field maximum (numeric/date)
 * @returns Information about issues
 */
export interface GetIssueListParams {
  projectId?: number[];
  issueTypeId?: number[];
  categoryId?: number[];
  versionId?: number[];
  milestoneId?: number[];
  statusId?: number[];
  priorityId?: number[];
  assigneeId?: number[];
  createdUserId?: number[];
  resolutionId?: number[];
  parentChild?: number;
  attachment?: boolean;
  sharedFile?: boolean;
  sort?: string;
  order?: "asc" | "desc";
  offset?: number;
  count?: number;
  createdSince?: string;
  createdUntil?: string;
  updatedSince?: string;
  updatedUntil?: string;
  startDateSince?: string;
  startDateUntil?: string;
  dueDateSince?: string;
  dueDateUntil?: string;
  id?: number[];
  parentIssueId?: number[];
  keyword?: string;
  // カスタムフィールドは柔軟なため、[key: string]: any; で許容
  [key: `customField_${string}`]: any;
  [key: `customField_${string}_min`]: any;
  [key: `customField_${string}_max`]: any;
}

/**
 * Backlog API: Get Issue List
 * @see https://developer.nulab.com/docs/backlog/api/2/get-issue-list
 */
export async function getIssueList(
  apiKey: string,
  baseUrl: string,
  options: GetIssueListParams = {},
) {
  try {
    // apiKeyを必ず含め、undefinedやnullの値は除外
    const params = _.omitBy(
      { apiKey, ...options },
      _.isNil,
    );

    const response = await axios.get(
      `https://${baseUrl}/api/v2/issues`,
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
    throw new Error(`Failed to fetch issues: ${error.message}`);
  }
}