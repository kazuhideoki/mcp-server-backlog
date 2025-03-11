import axios from "axios";
import { omitBy, isUndefined } from "lodash";

/**
 * Counts the number of issues
 * @param apiKey Backlog API key
 * @param baseUrl Backlog base URL
 * @param options Optional parameters for filtering issues
 * @returns Object containing the count of issues
 * @see https://developer.nulab.com/docs/backlog/api/2/count-issue
 */
export async function countIssue(
  apiKey: string,
  baseUrl: string,
  options?: {
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
    order?: string;
    count?: number;
    offset?: number;
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
  }
) {
  try {
    // Convert arrays to comma-separated strings
    const processedOptions = options
      ? {
          projectId: options.projectId?.join(","),
          issueTypeId: options.issueTypeId?.join(","),
          categoryId: options.categoryId?.join(","),
          versionId: options.versionId?.join(","),
          milestoneId: options.milestoneId?.join(","),
          statusId: options.statusId?.join(","),
          priorityId: options.priorityId?.join(","),
          assigneeId: options.assigneeId?.join(","),
          createdUserId: options.createdUserId?.join(","),
          resolutionId: options.resolutionId?.join(","),
          parentChild: options.parentChild,
          attachment: options.attachment,
          sharedFile: options.sharedFile,
          sort: options.sort,
          order: options.order,
          count: options.count,
          offset: options.offset,
          createdSince: options.createdSince,
          createdUntil: options.createdUntil,
          updatedSince: options.updatedSince,
          updatedUntil: options.updatedUntil,
          startDateSince: options.startDateSince,
          startDateUntil: options.startDateUntil,
          dueDateSince: options.dueDateSince,
          dueDateUntil: options.dueDateUntil,
          id: options.id?.join(","),
          parentIssueId: options.parentIssueId?.join(","),
          keyword: options.keyword,
        }
      : {};

    const params = omitBy(
      {
        apiKey,
        ...processedOptions,
      },
      isUndefined
    );

    const response = await axios.get(`https://${baseUrl}/api/v2/issues/count`, {
      params,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to count issues: ${error.response?.data?.errors?.[0]?.message || error.message}`
      );
    }
    throw error;
  }
}