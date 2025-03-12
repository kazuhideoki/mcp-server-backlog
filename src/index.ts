import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import path from "path";
import { getRecentUpdates } from "./backlog-api/get-recent-updates";
import { getActivity } from "./backlog-api/get-activity";
import { getSpaceLogo } from "./backlog-api/get-space-logo";
import { getSpaceNotification } from "./backlog-api/get-space-notification";
import { updateSpaceNotification } from "./backlog-api/update-space-notification";
import { getSpaceDiskUsage } from "./backlog-api/get-space-disk-usage";
import { getUsers } from "./backlog-api/get-users";
import { getUser } from "./backlog-api/get-user";
import { deleteUser } from "./backlog-api/delete-user";
import { getProjects } from "./backlog-api/get-projects";
import { getIssues } from "./backlog-api/get-issues";
import { createIssue } from "./backlog-api/add-issue";
import { updateIssue } from "./backlog-api/update-issue";
import { postAttachmentFile } from "./backlog-api/post-attachment-file";
import { addUser } from "./backlog-api/add-user";
import { updateUser } from "./backlog-api/update-user";
import { getOwnUser } from "./backlog-api/get-own-user";
import { getUserIcon } from "./backlog-api/get-user-icon";
import { getUserRecentUpdates } from "./backlog-api/get-user-recent-updates";
import { getReceivedStarList } from "./backlog-api/get-received-star-list";
import { countUserReceivedStars } from "./backlog-api/count-user-received-stars";
import { getRecentlyViewedIssues } from "./backlog-api/get-list-of-recently-viewed-issues";
import { addRecentlyViewedIssue } from "./backlog-api/add-recently-viewed-issue";
import { getRecentlyViewedProjects } from "./backlog-api/get-list-of-recently-viewed-projects";
import { getRecentlyViewedWikis } from "./backlog-api/get-list-of-recently-viewed-wikis";
import { addRecentlyViewedWiki } from "./backlog-api/add-recently-viewed-wiki";
import { loadApiKey } from "./api-key-loader";
import { z } from "zod";
import { getStatusList } from "./backlog-api/get-status-list";
import { getPriorityList } from "./backlog-api/get-priority-list";
import { getResolutionList } from "./backlog-api/get-resolution-list";
import { getProject } from "./backlog-api/get-project";
import { addProject } from "./backlog-api/add-project";
import { updateProject } from "./backlog-api/update-project";
import { deleteProject } from "./backlog-api/delete-project";
import { getProjectIcon } from "./backlog-api/get-project-icon";
import { getProjectRecentUpdates } from "./backlog-api/get-project-recent-updates";
import { addProjectUser } from "./backlog-api/add-project-user";
import { getProjectUserList } from "./backlog-api/get-project-user-list";
import { deleteProjectUser } from "./backlog-api/delete-project-user";
import { addProjectAdministrator } from "./backlog-api/add-project-administrator";
import { getListOfProjectAdministrators } from "./backlog-api/get-list-of-project-administrators";
import { deleteProjectAdministrator } from "./backlog-api/delete-project-administrator";
import { addStatus } from "./backlog-api/add-status";
import { updateStatus } from "./backlog-api/update-status";
import { deleteStatus } from "./backlog-api/delete-status";
import { updateOrderOfStatus } from "./backlog-api/update-order-of-status";
import { getIssueTypeList } from "./backlog-api/get-issue-type-list";
import { addIssueType } from "./backlog-api/add-issue-type";
import { updateIssueType } from "./backlog-api/update-issue-type";
import { deleteIssueType } from "./backlog-api/delete-issue-type";
import { getCategoryList } from "./backlog-api/get-category-list";
import { addCategory } from "./backlog-api/add-category";
import { updateCategory } from "./backlog-api/update-category";
import { deleteCategory } from "./backlog-api/delete-category";
import { getVersionMilestoneList } from "./backlog-api/get-version-milestone-list";
import { addVersionMilestone } from "./backlog-api/add-version-milestone";
import { updateVersionMilestone } from "./backlog-api/update-version-milestone";
import { deleteVersion } from "./backlog-api/delete-version";
import { getCustomFieldList } from "./backlog-api/get-custom-field-list";
import { addCustomField } from "./backlog-api/add-custom-field";
import { updateCustomField } from "./backlog-api/update-custom-field";
import { deleteCustomField } from "./backlog-api/delete-custom-field";
import { addListItemForListTypeCustomField } from "./backlog-api/add-list-item-for-list-type-custom-field";
import { updateListItemForListTypeCustomField } from "./backlog-api/update-list-item-for-list-type-custom-field";
import { deleteListItemForListTypeCustomField } from "./backlog-api/delete-list-item-for-list-type-custom-field";
import { getListOfSharedFiles } from "./backlog-api/get-list-of-shared-files";
import { getFile } from "./backlog-api/get-file";
import { getProjectDiskUsage } from "./backlog-api/get-project-disk-usage";
import { getWebhookList } from "./backlog-api/get-webhook-list";
import { addWebhook } from "./backlog-api/add-webhook";
import { getWebhook } from "./backlog-api/get-webhook";
import { updateWebhook } from "./backlog-api/update-webhook";
import { deleteWebhook } from "./backlog-api/delete-webhook";
import { countIssue } from "./backlog-api/count-issue";
import { getIssue } from "./backlog-api/get-issue";
import { deleteIssue } from "./backlog-api/delete-issue";
import { getCommentList } from "./backlog-api/get-comment-list";
import { addComment } from "./backlog-api/add-comment";
import { countComment } from "./backlog-api/count-comment";
import { getComment } from "./backlog-api/get-comment";
import { deleteComment } from "./backlog-api/delete-comment";
import { updateComment } from "./backlog-api/update-comment";
import { getListOfCommentNotifications } from "./backlog-api/get-list-of-comment-notifications";
import { addCommentNotification } from "./backlog-api/add-comment-notification";
import { getListOfIssueAttachments } from "./backlog-api/get-list-of-issue-attachments";
import { getIssueAttachment } from "./backlog-api/get-issue-attachment";
import { deleteIssueAttachment } from "./backlog-api/delete-issue-attachment";
import { getIssueParticipantList } from "./backlog-api/get-issue-participant-list";
import { getListOfLinkedSharedFiles } from "./backlog-api/get-list-of-linked-shared-files";
import { linkSharedFilesToIssue } from "./backlog-api/link-shared-files-to-issue";
import { removeLinkToSharedFileFromIssue } from "./backlog-api/remove-link-to-shared-file-from-issue";
import { getWikiPageList } from "./backlog-api/get-wiki-page-list";
import { countWikiPage } from "./backlog-api/count-wiki-page";
import { getWikiPageTagList } from "./backlog-api/get-wiki-page-tag-list";
import { addWikiPage } from "./backlog-api/add-wiki-page";
import { getWikiPage } from "./backlog-api/get-wiki-page";
import { updateWikiPage } from "./backlog-api/update-wiki-page";
import { deleteWikiPage } from "./backlog-api/delete-wiki-page";
import { getListOfWikiAttachments } from "./backlog-api/get-list-of-wiki-attachments";
import { attachFileToWiki } from "./backlog-api/attach-file-to-wiki";
import { getWikiPageAttachment } from "./backlog-api/get-wiki-page-attachment";
import { removeWikiAttachment } from "./backlog-api/remove-wiki-attachment";
import { getListOfSharedFilesOnWiki } from "./backlog-api/get-list-of-shared-files-on-wiki";
import { linkSharedFilesToWiki } from "./backlog-api/link-shared-files-to-wiki";
import { removeLinkToSharedFileFromWiki } from "./backlog-api/remove-link-to-shared-file-from-wiki";
import { getWikiPageHistory } from "./backlog-api/get-wiki-page-history";
import { getWikiPageStar } from "./backlog-api/get-wiki-page-star";
import { addStar } from "./backlog-api/add-star";
import { countNotification } from "./backlog-api/count-notification";
import { getNotificationList } from "./backlog-api/get-notification-list";
import { resetUnreadNotificationCount } from "./backlog-api/reset-unread-notification-count";
import { getListOfGitRepositories } from "./backlog-api/get-list-of-git-repositories";
import { getGitRepository } from "./backlog-api/get-git-repository";
import { getPullRequestList } from "./backlog-api/get-pull-request-list";
import { getNumberOfPullRequests } from "./backlog-api/get-number-of-pull-requests";
import { addPullRequest } from "./backlog-api/add-pull-request";
import { updatePullRequest } from "./backlog-api/update-pull-request";
import { getPullRequest } from "./backlog-api/get-pull-request";
import { addPullRequestComment } from "./backlog-api/add-pull-request-comment";
import { getPullRequestComment } from "./backlog-api/get-pull-request-comment";
import { getNumberOfPullRequestComments } from "./backlog-api/get-number-of-pull-request-comments";
import { updatePullRequestCommentInformation } from "./backlog-api/update-pull-request-comment-information";
import { getListOfPullRequestAttachments } from "./backlog-api/get-list-of-pull-request-attachments";
import { downloadPullRequestAttachment } from "./backlog-api/download-pull-request-attachment";
import { deletePullRequestAttachments } from "./backlog-api/delete-pull-request-attachments";

const apikey = loadApiKey(path.join(__dirname, "../apikey"));
const baseUrl = "yourstand.backlog.com";

// Create an MCP server
const server = new McpServer({
  name: "Backlog",
  version: "1.0.0",
});

server.tool("get-recent-updates", async () => {
  const result = await getRecentUpdates(apikey, baseUrl, {});

  return {
    content: [{ type: "text", text: JSON.stringify(result) }],
  };
});

server.tool(
  "get-activity",
  { activityId: z.number() },
  async (params: { activityId: number }) => {
    if (!params.activityId) {
      throw new Error("Activity ID is required");
    }

    const result = await getActivity(
      apikey,
      baseUrl,
      params.activityId,
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  },
);

// Space Logo Tool
server.tool("get-space-logo", async () => {
  const result = await getSpaceLogo(
    apikey,
    baseUrl
  );

  return {
    content: [{ type: "text", text: JSON.stringify(result) }],
  };
});

// Space Notification Tool
server.tool("get-space-notification", async () => {
  const result = await getSpaceNotification(
    apikey,
    baseUrl
  );

  return {
    content: [{ type: "text", text: JSON.stringify(result) }],
  };
});

// Update Space Notification Tool
server.tool(
  "update-space-notification",
  { content: z.string() },
  async (params: { content: string }) => {
    if (!params.content) {
      throw new Error("Notification content is required");
    }

    const result = await updateSpaceNotification(
      apikey,
      baseUrl,
      params.content
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Space Disk Usage Tool
server.tool("get-space-disk-usage", async () => {
  const result = await getSpaceDiskUsage(
    apikey,
    baseUrl
  );

  return {
    content: [{ type: "text", text: JSON.stringify(result) }],
  };
});

// Get Users Tool
server.tool("users", async () => {
  const result = await getUsers(
    apikey,
    baseUrl
  );

  return {
    content: [{ type: "text", text: JSON.stringify(result) }],
  };
});

// Get User Tool
server.tool(
  "user",
  { userId: z.number() },
  async (params: { userId: number }) => {
    if (!params.userId) {
      throw new Error("User ID is required");
    }

    const result = await getUser(
      apikey,
      baseUrl,
      params.userId
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Delete User Tool
server.tool(
  "delete-user",
  { userId: z.number() },
  async (params: { userId: number }) => {
    if (!params.userId) {
      throw new Error("User ID is required");
    }

    const result = await deleteUser(
      apikey,
      baseUrl,
      params.userId
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Get Projects Tool
server.tool(
  "projects",
  { 
    archived: z.boolean().optional(),
    all: z.boolean().optional()
  },
  async (params: { archived?: boolean; all?: boolean }) => {
    const result = await getProjects(
      apikey,
      baseUrl,
      params
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Get Issues Tool
server.tool(
  "get-issues",
  { 
    projectId: z.array(z.number()).optional(),
    statusId: z.array(z.number()).optional(),
    assigneeId: z.array(z.number()).optional(),
    count: z.number().optional(),
    offset: z.number().optional()
  },
  async (params: { 
    projectId?: number[]; 
    statusId?: number[];
    assigneeId?: number[];
    count?: number;
    offset?: number;
  }) => {
    const result = await getIssues(
      apikey,
      baseUrl,
      params
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Create Issue Tool
server.tool(
  "add-issue",
  { 
    projectId: z.number(),
    summary: z.string(),
    issueTypeId: z.number(),
    priorityId: z.number(),
    description: z.string().optional(),
    startDate: z.string().optional(),
    dueDate: z.string().optional(),
    assigneeId: z.number().optional()
  },
  async (params: { 
    projectId: number;
    summary: string;
    issueTypeId: number;
    priorityId: number;
    description?: string;
    startDate?: string;
    dueDate?: string;
    assigneeId?: number;
  }) => {
    if (!params.projectId || !params.summary || !params.issueTypeId || !params.priorityId) {
      throw new Error("Project ID, summary, issue type ID, and priority ID are required");
    }

    const { projectId, summary, issueTypeId, priorityId, ...options } = params;

    const result = await createIssue(
      apikey,
      baseUrl,
      projectId,
      summary,
      issueTypeId,
      priorityId,
      options
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Update Issue Tool
server.tool(
  "update-issue",
  { 
    issueId: z.union([z.string(), z.number()]),
    summary: z.string().optional(),
    description: z.string().optional(),
    statusId: z.number().optional(),
    priorityId: z.number().optional(),
    assigneeId: z.number().optional(),
    startDate: z.string().optional(),
    dueDate: z.string().optional()
  },
  async (params: { 
    issueId: string | number;
    summary?: string;
    description?: string;
    statusId?: number;
    priorityId?: number;
    assigneeId?: number;
    startDate?: string;
    dueDate?: string;
  }) => {
    if (!params.issueId) {
      throw new Error("Issue ID is required");
    }

    const { issueId, ...updateParams } = params;

    const result = await updateIssue(
      apikey,
      baseUrl,
      issueId,
      updateParams
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Post Attachment File Tool
server.tool(
  "post-attachment-file",
  { filePath: z.string() },
  async (params: { filePath: string }) => {
    if (!params.filePath) {
      throw new Error("File path is required");
    }

    const result = await postAttachmentFile(
      apikey,
      baseUrl,
      params.filePath
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Add User Tool
server.tool(
  "add-user",
  { 
    userId: z.string(),
    password: z.string(),
    name: z.string(),
    mailAddress: z.string().optional(),
    roleType: z.number().optional()
  },
  async (params: { 
    userId: string;
    password: string;
    name: string;
    mailAddress?: string;
    roleType?: number;
  }) => {
    if (!params.userId || !params.password || !params.name) {
      throw new Error("User ID, password, and name are required");
    }

    const { userId, password, name, ...options } = params;

    const result = await addUser(
      apikey,
      baseUrl,
      userId,
      password,
      name,
      options
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Update User Tool
server.tool(
  "update-user",
  { 
    userId: z.number(),
    password: z.string().optional(),
    name: z.string().optional(),
    mailAddress: z.string().optional(),
    roleType: z.number().optional()
  },
  async (params: { 
    userId: number;
    password?: string;
    name?: string;
    mailAddress?: string;
    roleType?: number;
  }) => {
    if (!params.userId) {
      throw new Error("User ID is required");
    }

    const { userId, ...updateParams } = params;

    const result = await updateUser(
      apikey,
      baseUrl,
      userId,
      updateParams
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Get Own User Tool
server.tool("get-own-user", async () => {
  const result = await getOwnUser(
    apikey,
    baseUrl
  );

  return {
    content: [{ type: "text", text: JSON.stringify(result) }],
  };
});

// Get User Icon Tool
server.tool(
  "get-user-icon",
  { userId: z.number() },
  async (params: { userId: number }) => {
    if (!params.userId) {
      throw new Error("User ID is required");
    }

    const result = await getUserIcon(
      apikey,
      baseUrl,
      params.userId
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Get User Recent Updates Tool
server.tool(
  "get-user-recent-updates",
  { 
    userId: z.number(),
    activityTypeIds: z.array(z.number()).optional(),
    count: z.number().optional(),
    order: z.enum(["desc", "asc"]).optional()
  },
  async (params: { 
    userId: number;
    activityTypeIds?: number[];
    count?: number;
    order?: "desc" | "asc";
  }) => {
    if (!params.userId) {
      throw new Error("User ID is required");
    }

    const { userId, ...options } = params;

    const result = await getUserRecentUpdates(
      apikey,
      baseUrl,
      userId,
      options
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Get Received Star List Tool
server.tool(
  "get-received-star-list",
  { 
    userId: z.number(),
    minId: z.number().optional(),
    maxId: z.number().optional(),
    count: z.number().optional(),
    order: z.enum(["desc", "asc"]).optional()
  },
  async (params: { 
    userId: number;
    minId?: number;
    maxId?: number;
    count?: number;
    order?: "desc" | "asc";
  }) => {
    if (!params.userId) {
      throw new Error("User ID is required");
    }

    const { userId, ...options } = params;

    const result = await getReceivedStarList(
      apikey,
      baseUrl,
      userId,
      options
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Count User Received Stars Tool
server.tool(
  "count-user-received-stars",
  { 
    userId: z.number(),
    since: z.string().optional(),
    until: z.string().optional()
  },
  async (params: { 
    userId: number;
    since?: string;
    until?: string;
  }) => {
    if (!params.userId) {
      throw new Error("User ID is required");
    }

    const { userId, ...options } = params;

    const result = await countUserReceivedStars(
      apikey,
      baseUrl,
      userId,
      options
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Get Recently Viewed Issues Tool
server.tool(
  "get-list-of-recently-viewed-issues",
  { 
    order: z.enum(["desc", "asc"]).optional(),
    offset: z.number().optional(),
    count: z.number().optional()
  },
  async (params: { 
    order?: "desc" | "asc";
    offset?: number;
    count?: number;
  }) => {
    const result = await getRecentlyViewedIssues(
      apikey,
      baseUrl,
      params
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Add Recently Viewed Issue Tool
server.tool(
  "add-recently-viewed-issue",
  { issueId: z.union([z.string(), z.number()]) },
  async (params: { issueId: string | number }) => {
    if (!params.issueId) {
      throw new Error("Issue ID is required");
    }

    const result = await addRecentlyViewedIssue(
      apikey,
      baseUrl,
      params.issueId
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Get Recently Viewed Projects Tool
server.tool(
  "get-list-of-recently-viewed-projects",
  { 
    order: z.enum(["desc", "asc"]).optional(),
    offset: z.number().optional(),
    count: z.number().optional()
  },
  async (params: { 
    order?: "desc" | "asc";
    offset?: number;
    count?: number;
  }) => {
    const result = await getRecentlyViewedProjects(
      apikey,
      baseUrl,
      params
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Get Recently Viewed Wikis Tool
server.tool(
  "get-list-of-recently-viewed-wikis",
  { 
    order: z.enum(["desc", "asc"]).optional(),
    offset: z.number().optional(),
    count: z.number().optional()
  },
  async (params: { 
    order?: "desc" | "asc";
    offset?: number;
    count?: number;
  }) => {
    const result = await getRecentlyViewedWikis(
      apikey,
      baseUrl,
      params
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Add Recently Viewed Wiki Tool
server.tool(
  "add-recently-viewed-wiki",
  { wikiId: z.union([z.string(), z.number()]) },
  async (params: { wikiId: string | number }) => {
    if (!params.wikiId) {
      throw new Error("Wiki ID is required");
    }

    const result = await addRecentlyViewedWiki(
      apikey,
      baseUrl,
      params.wikiId
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Get Status List of Project Tool
server.tool(
  "get-status-list",
  { projectIdOrKey: z.union([z.string(), z.number()]) },
  async (params: { projectIdOrKey: string | number }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    const result = await getStatusList(
      apikey,
      baseUrl,
      params.projectIdOrKey
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Get Priority List Tool
server.tool("get-priority-list", async () => {
  const result = await getPriorityList(
    apikey,
    baseUrl
  );

  return {
    content: [{ type: "text", text: JSON.stringify(result) }],
  };
});

// Get Resolution List Tool
server.tool("get-resolution-list", async () => {
  const result = await getResolutionList(
    apikey,
    baseUrl
  );

  return {
    content: [{ type: "text", text: JSON.stringify(result) }],
  };
});

// Get Project Tool
server.tool(
  "project",
  { projectIdOrKey: z.union([z.string(), z.number()]) },
  async (params: { projectIdOrKey: string | number }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    const result = await getProject(
      apikey,
      baseUrl,
      params.projectIdOrKey
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Add Project Tool
server.tool(
  "add-project",
  {
    name: z.string(),
    key: z.string(),
    chartEnabled: z.boolean(),
    textFormattingRule: z.enum(["backlog", "markdown"]).optional(),
    projectLeaderCanEditProjectLeader: z.boolean().optional(),
    subtaskingEnabled: z.boolean().optional(),
    externalLinks: z.array(z.string()).optional()
  },
  async (params: {
    name: string;
    key: string;
    chartEnabled: boolean;
    textFormattingRule?: "backlog" | "markdown";
    projectLeaderCanEditProjectLeader?: boolean;
    subtaskingEnabled?: boolean;
    externalLinks?: string[];
  }) => {
    if (!params.name || !params.key) {
      throw new Error("Project name and key are required");
    }

    const { name, key, chartEnabled, ...options } = params;

    const result = await addProject(
      apikey,
      baseUrl,
      name,
      key,
      chartEnabled,
      options
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Update Project Tool
server.tool(
  "update-project",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    name: z.string().optional(),
    key: z.string().optional(),
    chartEnabled: z.boolean().optional(),
    subtaskingEnabled: z.boolean().optional(),
    projectLeaderCanEditProjectLeader: z.boolean().optional(),
    textFormattingRule: z.enum(["backlog", "markdown"]).optional(),
    archived: z.boolean().optional()
  },
  async (params: {
    projectIdOrKey: string | number;
    name?: string;
    key?: string;
    chartEnabled?: boolean;
    subtaskingEnabled?: boolean;
    projectLeaderCanEditProjectLeader?: boolean;
    textFormattingRule?: "backlog" | "markdown";
    archived?: boolean;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    const { projectIdOrKey, ...updateParams } = params;

    const result = await updateProject(
      apikey,
      baseUrl,
      projectIdOrKey,
      updateParams
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Delete Project Tool
server.tool(
  "delete-project",
  { projectIdOrKey: z.union([z.string(), z.number()]) },
  async (params: { projectIdOrKey: string | number }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    const result = await deleteProject(
      apikey,
      baseUrl,
      params.projectIdOrKey
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Get Project Icon Tool
server.tool(
  "get-project-icon",
  { projectIdOrKey: z.union([z.string(), z.number()]) },
  async (params: { projectIdOrKey: string | number }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    const result = await getProjectIcon(
      apikey,
      baseUrl,
      params.projectIdOrKey
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Get Project Recent Updates Tool
server.tool(
  "get-project-recent-updates",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    activityTypeIds: z.array(z.number()).optional(),
    minId: z.number().optional(),
    maxId: z.number().optional(),
    count: z.number().optional(),
    order: z.enum(["desc", "asc"]).optional()
  },
  async (params: {
    projectIdOrKey: string | number;
    activityTypeIds?: number[];
    minId?: number;
    maxId?: number;
    count?: number;
    order?: "desc" | "asc";
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    const { projectIdOrKey, ...options } = params;

    const result = await getProjectRecentUpdates(
      apikey,
      baseUrl,
      projectIdOrKey,
      options
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Add Project User Tool
server.tool(
  "add-project-user",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    userId: z.number()
  },
  async (params: {
    projectIdOrKey: string | number;
    userId: number;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    if (!params.userId) {
      throw new Error("User ID is required");
    }

    const result = await addProjectUser(
      apikey,
      baseUrl,
      params.projectIdOrKey,
      params.userId
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Get Project User List Tool
server.tool(
  "get-project-user-list",
  { projectIdOrKey: z.union([z.string(), z.number()]) },
  async (params: { projectIdOrKey: string | number }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    const result = await getProjectUserList(
      apikey,
      baseUrl,
      params.projectIdOrKey
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Delete Project User Tool
server.tool(
  "delete-project-user",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    userId: z.number()
  },
  async (params: {
    projectIdOrKey: string | number;
    userId: number;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    if (!params.userId) {
      throw new Error("User ID is required");
    }

    const result = await deleteProjectUser(
      apikey,
      baseUrl,
      params.projectIdOrKey,
      params.userId
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Add Project Administrator Tool
server.tool(
  "add-project-administrator",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    userId: z.number()
  },
  async (params: {
    projectIdOrKey: string | number;
    userId: number;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    if (!params.userId) {
      throw new Error("User ID is required");
    }

    const result = await addProjectAdministrator(
      apikey,
      baseUrl,
      params.projectIdOrKey,
      params.userId
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Get List of Project Administrators Tool
server.tool(
  "get-list-of-project-administrators",
  {
    projectIdOrKey: z.union([z.string(), z.number()])
  },
  async (params: {
    projectIdOrKey: string | number;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    const result = await getListOfProjectAdministrators(
      apikey,
      baseUrl,
      params.projectIdOrKey
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Delete Project Administrator Tool
server.tool(
  "delete-project-administrator",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    userId: z.number()
  },
  async (params: {
    projectIdOrKey: string | number;
    userId: number;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    if (!params.userId) {
      throw new Error("User ID is required");
    }

    const result = await deleteProjectAdministrator(
      apikey,
      baseUrl,
      params.projectIdOrKey,
      params.userId
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Add Status Tool
server.tool(
  "add-status",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    name: z.string(),
    color: z.number()
  },
  async (params: {
    projectIdOrKey: string | number;
    name: string;
    color: number;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    if (!params.name) {
      throw new Error("Status name is required");
    }

    if (!params.color) {
      throw new Error("Status color is required");
    }

    const result = await addStatus(
      apikey,
      baseUrl,
      params.projectIdOrKey,
      params.name,
      params.color
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Update Status Tool
server.tool(
  "update-status",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    id: z.number(),
    name: z.string(),
    color: z.number()
  },
  async (params: {
    projectIdOrKey: string | number;
    id: number;
    name: string;
    color: number;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    if (!params.id) {
      throw new Error("Status ID is required");
    }

    if (!params.name) {
      throw new Error("Status name is required");
    }

    if (!params.color) {
      throw new Error("Status color is required");
    }

    const result = await updateStatus(
      apikey,
      baseUrl,
      params.projectIdOrKey,
      params.id,
      params.name,
      params.color
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Delete Status Tool
server.tool(
  "delete-status",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    id: z.number()
  },
  async (params: {
    projectIdOrKey: string | number;
    id: number;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    if (!params.id) {
      throw new Error("Status ID is required");
    }

    const result = await deleteStatus(
      apikey,
      baseUrl,
      params.projectIdOrKey,
      params.id
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Update Order of Status Tool
server.tool(
  "update-order-of-status",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    statusIds: z.array(z.number())
  },
  async (params: {
    projectIdOrKey: string | number;
    statusIds: number[];
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    if (!params.statusIds || params.statusIds.length === 0) {
      throw new Error("Status IDs are required");
    }

    const result = await updateOrderOfStatus(
      apikey,
      baseUrl,
      params.projectIdOrKey,
      params.statusIds
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Get Issue Type List Tool
server.tool(
  "get-issue-type-list",
  {
    projectIdOrKey: z.union([z.string(), z.number()])
  },
  async (params: {
    projectIdOrKey: string | number;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    const result = await getIssueTypeList(
      apikey,
      baseUrl,
      params.projectIdOrKey
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Add Issue Type Tool
server.tool(
  "add-issue-type",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    name: z.string(),
    color: z.number()
  },
  async (params: {
    projectIdOrKey: string | number;
    name: string;
    color: number;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    if (!params.name) {
      throw new Error("Issue type name is required");
    }

    if (!params.color) {
      throw new Error("Issue type color is required");
    }

    const result = await addIssueType(
      apikey,
      baseUrl,
      params.projectIdOrKey,
      params.name,
      params.color
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Update Issue Type Tool
server.tool(
  "update-issue-type",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    id: z.number(),
    name: z.string(),
    color: z.number()
  },
  async (params: {
    projectIdOrKey: string | number;
    id: number;
    name: string;
    color: number;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    if (!params.id) {
      throw new Error("Issue type ID is required");
    }

    if (!params.name) {
      throw new Error("Issue type name is required");
    }

    if (!params.color) {
      throw new Error("Issue type color is required");
    }

    const result = await updateIssueType(
      apikey,
      baseUrl,
      params.projectIdOrKey,
      params.id,
      params.name,
      params.color
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Delete Issue Type Tool
server.tool(
  "delete-issue-type",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    id: z.number()
  },
  async (params: {
    projectIdOrKey: string | number;
    id: number;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    if (!params.id) {
      throw new Error("Issue type ID is required");
    }

    const result = await deleteIssueType(
      apikey,
      baseUrl,
      params.projectIdOrKey,
      params.id
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Get Category List Tool
server.tool(
  "get-category-list",
  {
    projectIdOrKey: z.union([z.string(), z.number()])
  },
  async (params: {
    projectIdOrKey: string | number;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    const result = await getCategoryList(
      apikey,
      baseUrl,
      params.projectIdOrKey
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Add Category Tool
server.tool(
  "add-category",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    name: z.string()
  },
  async (params: {
    projectIdOrKey: string | number;
    name: string;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    if (!params.name) {
      throw new Error("Category name is required");
    }

    const result = await addCategory(
      apikey,
      baseUrl,
      params.projectIdOrKey,
      params.name
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Update Category Tool
server.tool(
  "update-category",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    id: z.number(),
    name: z.string()
  },
  async (params: {
    projectIdOrKey: string | number;
    id: number;
    name: string;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    if (!params.id) {
      throw new Error("Category ID is required");
    }

    if (!params.name) {
      throw new Error("Category name is required");
    }

    const result = await updateCategory(
      apikey,
      baseUrl,
      params.projectIdOrKey,
      params.id,
      params.name
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Delete Category Tool
server.tool(
  "delete-category",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    id: z.number()
  },
  async (params: {
    projectIdOrKey: string | number;
    id: number;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    if (!params.id) {
      throw new Error("Category ID is required");
    }

    const result = await deleteCategory(
      apikey,
      baseUrl,
      params.projectIdOrKey,
      params.id
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Get Version/Milestone List Tool
server.tool(
  "get-version-milestone-list",
  {
    projectIdOrKey: z.union([z.string(), z.number()])
  },
  async (params: {
    projectIdOrKey: string | number;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    const result = await getVersionMilestoneList(
      apikey,
      baseUrl,
      params.projectIdOrKey
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Add Version/Milestone Tool
server.tool(
  "add-version-milestone",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    name: z.string(),
    description: z.string().optional(),
    startDate: z.string().optional(),
    releaseDueDate: z.string().optional()
  },
  async (params: {
    projectIdOrKey: string | number;
    name: string;
    description?: string;
    startDate?: string;
    releaseDueDate?: string;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    if (!params.name) {
      throw new Error("Version/milestone name is required");
    }

    const { projectIdOrKey, name, ...options } = params;

    const result = await addVersionMilestone(
      apikey,
      baseUrl,
      projectIdOrKey,
      name,
      options
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Update Version/Milestone Tool
server.tool(
  "update-version-milestone",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    id: z.number(),
    name: z.string().optional(),
    description: z.string().optional(),
    startDate: z.string().optional(),
    releaseDueDate: z.string().optional(),
    archived: z.boolean().optional()
  },
  async (params: {
    projectIdOrKey: string | number;
    id: number;
    name?: string;
    description?: string;
    startDate?: string;
    releaseDueDate?: string;
    archived?: boolean;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    if (!params.id) {
      throw new Error("Version/milestone ID is required");
    }

    const { projectIdOrKey, id, ...options } = params;

    if (Object.keys(options).length === 0) {
      throw new Error("At least one parameter is required for update");
    }

    const result = await updateVersionMilestone(
      apikey,
      baseUrl,
      projectIdOrKey,
      id,
      options
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Delete Version Tool
server.tool(
  "delete-version",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    id: z.number()
  },
  async (params: {
    projectIdOrKey: string | number;
    id: number;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    if (!params.id) {
      throw new Error("Version/milestone ID is required");
    }

    const result = await deleteVersion(
      apikey,
      baseUrl,
      params.projectIdOrKey,
      params.id
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Get Custom Field List Tool
server.tool(
  "get-custom-field-list",
  {
    projectIdOrKey: z.union([z.string(), z.number()])
  },
  async (params: {
    projectIdOrKey: string | number;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    const result = await getCustomFieldList(
      apikey,
      baseUrl,
      params.projectIdOrKey
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Add Custom Field Tool
server.tool(
  "add-custom-field",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    typeId: z.number(),
    name: z.string(),
    description: z.string().optional(),
    required: z.boolean().optional(),
    applicableIssueTypes: z.array(z.number()).optional(),
    items: z.array(z.string()).optional(),
    allowInput: z.boolean().optional(),
    allowAddItem: z.boolean().optional(),
    min: z.number().optional(),
    max: z.number().optional(),
    initial: z.string().optional(),
    unit: z.string().optional()
  },
  async (params: {
    projectIdOrKey: string | number;
    typeId: number;
    name: string;
    description?: string;
    required?: boolean;
    applicableIssueTypes?: number[];
    items?: string[];
    allowInput?: boolean;
    allowAddItem?: boolean;
    min?: number;
    max?: number;
    initial?: string;
    unit?: string;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    if (!params.typeId) {
      throw new Error("Type ID is required");
    }

    if (!params.name) {
      throw new Error("Name is required");
    }

    const { projectIdOrKey, typeId, name, ...options } = params;

    const result = await addCustomField(
      apikey,
      baseUrl,
      projectIdOrKey,
      typeId,
      name,
      options
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Update Custom Field Tool
server.tool(
  "update-custom-field",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    id: z.number(),
    name: z.string().optional(),
    description: z.string().optional(),
    required: z.boolean().optional(),
    applicableIssueTypes: z.array(z.number()).optional(),
    items: z.array(z.string()).optional(),
    allowInput: z.boolean().optional(),
    allowAddItem: z.boolean().optional(),
    min: z.number().optional(),
    max: z.number().optional(),
    initial: z.string().optional(),
    unit: z.string().optional()
  },
  async (params: {
    projectIdOrKey: string | number;
    id: number;
    name?: string;
    description?: string;
    required?: boolean;
    applicableIssueTypes?: number[];
    items?: string[];
    allowInput?: boolean;
    allowAddItem?: boolean;
    min?: number;
    max?: number;
    initial?: string;
    unit?: string;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    if (!params.id) {
      throw new Error("Custom field ID is required");
    }

    const { projectIdOrKey, id, ...updateParams } = params;

    if (Object.keys(updateParams).length === 0) {
      throw new Error("At least one parameter is required for update");
    }

    const result = await updateCustomField(
      apikey,
      baseUrl,
      projectIdOrKey,
      id,
      updateParams
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Delete Custom Field Tool
server.tool(
  "delete-custom-field",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    id: z.number()
  },
  async (params: {
    projectIdOrKey: string | number;
    id: number;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    if (!params.id) {
      throw new Error("Custom field ID is required");
    }

    const result = await deleteCustomField(
      apikey,
      baseUrl,
      params.projectIdOrKey,
      params.id
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Add List Item for List Type Custom Field Tool
server.tool(
  "add-list-item-for-list-type-custom-field",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    id: z.number(),
    name: z.string()
  },
  async (params: {
    projectIdOrKey: string | number;
    id: number;
    name: string;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    if (!params.id) {
      throw new Error("Custom field ID is required");
    }

    if (!params.name) {
      throw new Error("Item name is required");
    }

    const result = await addListItemForListTypeCustomField(
      apikey,
      baseUrl,
      params.projectIdOrKey,
      params.id,
      params.name
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Update List Item for List Type Custom Field Tool
server.tool(
  "update-list-item-for-list-type-custom-field",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    id: z.number(),
    itemId: z.number(),
    name: z.string()
  },
  async (params: {
    projectIdOrKey: string | number;
    id: number;
    itemId: number;
    name: string;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    if (!params.id) {
      throw new Error("Custom field ID is required");
    }

    if (!params.itemId) {
      throw new Error("Item ID is required");
    }

    if (!params.name) {
      throw new Error("Item name is required");
    }

    const result = await updateListItemForListTypeCustomField(
      apikey,
      baseUrl,
      params.projectIdOrKey,
      params.id,
      params.itemId,
      params.name
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Delete List Item for List Type Custom Field Tool
server.tool(
  "delete-list-item-for-list-type-custom-field",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    id: z.number(),
    itemId: z.number()
  },
  async (params: {
    projectIdOrKey: string | number;
    id: number;
    itemId: number;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    if (!params.id) {
      throw new Error("Custom field ID is required");
    }

    if (!params.itemId) {
      throw new Error("Item ID is required");
    }

    const result = await deleteListItemForListTypeCustomField(
      apikey,
      baseUrl,
      params.projectIdOrKey,
      params.id,
      params.itemId
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Get List of Shared Files Tool
server.tool(
  "get-list-of-shared-files",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    path: z.string().optional()
  },
  async (params: {
    projectIdOrKey: string | number;
    path?: string;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    const result = await getListOfSharedFiles(
      apikey,
      baseUrl,
      params.projectIdOrKey,
      params.path
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Get File Tool
server.tool(
  "get-file",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    path: z.string()
  },
  async (params: {
    projectIdOrKey: string | number;
    path: string;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    if (!params.path) {
      throw new Error("File path is required");
    }

    const result = await getFile(
      apikey,
      baseUrl,
      params.projectIdOrKey,
      params.path
    );

    // For binary data, we convert to base64 string
    const base64 = Buffer.from(result).toString('base64');

    return {
      content: [{ type: "text", text: base64 }],
    };
  }
);

// Get Project Disk Usage Tool
server.tool(
  "get-project-disk-usage",
  {
    projectIdOrKey: z.union([z.string(), z.number()])
  },
  async (params: {
    projectIdOrKey: string | number;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    const result = await getProjectDiskUsage(
      apikey,
      baseUrl,
      params.projectIdOrKey
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Get Webhook List Tool
server.tool(
  "get-webhook-list",
  {
    projectIdOrKey: z.union([z.string(), z.number()])
  },
  async (params: {
    projectIdOrKey: string | number;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    const result = await getWebhookList(
      apikey,
      baseUrl,
      params.projectIdOrKey
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Add Webhook Tool
server.tool(
  "add-webhook",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    name: z.string(),
    hookUrl: z.string(),
    description: z.string().optional(),
    allEvent: z.boolean().optional(),
    activityTypeIds: z.array(z.number()).optional()
  },
  async (params: {
    projectIdOrKey: string | number;
    name: string;
    hookUrl: string;
    description?: string;
    allEvent?: boolean;
    activityTypeIds?: number[];
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    if (!params.name) {
      throw new Error("Name is required");
    }

    if (!params.hookUrl) {
      throw new Error("Hook URL is required");
    }

    const { projectIdOrKey, name, hookUrl, ...options } = params;

    const result = await addWebhook(
      apikey,
      baseUrl,
      projectIdOrKey,
      name,
      hookUrl,
      options
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Get Webhook Tool
server.tool(
  "get-webhook",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    webhookId: z.number()
  },
  async (params: {
    projectIdOrKey: string | number;
    webhookId: number;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    if (!params.webhookId) {
      throw new Error("Webhook ID is required");
    }

    const result = await getWebhook(
      apikey,
      baseUrl,
      params.projectIdOrKey,
      params.webhookId
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Update Webhook Tool
server.tool(
  "update-webhook",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    webhookId: z.number(),
    name: z.string().optional(),
    hookUrl: z.string().optional(),
    description: z.string().optional(),
    allEvent: z.boolean().optional(),
    activityTypeIds: z.array(z.number()).optional()
  },
  async (params: {
    projectIdOrKey: string | number;
    webhookId: number;
    name?: string;
    hookUrl?: string;
    description?: string;
    allEvent?: boolean;
    activityTypeIds?: number[];
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    if (!params.webhookId) {
      throw new Error("Webhook ID is required");
    }

    const { projectIdOrKey, webhookId, ...updateParams } = params;

    if (Object.keys(updateParams).length === 0) {
      throw new Error("At least one parameter is required for update");
    }

    const result = await updateWebhook(
      apikey,
      baseUrl,
      projectIdOrKey,
      webhookId,
      updateParams
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Delete Webhook Tool
server.tool(
  "delete-webhook",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    webhookId: z.number()
  },
  async (params: {
    projectIdOrKey: string | number;
    webhookId: number;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    if (!params.webhookId) {
      throw new Error("Webhook ID is required");
    }

    const result = await deleteWebhook(
      apikey,
      baseUrl,
      params.projectIdOrKey,
      params.webhookId
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Count Issue Tool
server.tool(
  "count-issue",
  {
    projectId: z.array(z.number()).optional(),
    issueTypeId: z.array(z.number()).optional(),
    categoryId: z.array(z.number()).optional(),
    versionId: z.array(z.number()).optional(),
    milestoneId: z.array(z.number()).optional(),
    statusId: z.array(z.number()).optional(),
    priorityId: z.array(z.number()).optional(),
    assigneeId: z.array(z.number()).optional(),
    createdUserId: z.array(z.number()).optional(),
    resolutionId: z.array(z.number()).optional(),
    parentChild: z.number().optional(),
    attachment: z.boolean().optional(),
    sharedFile: z.boolean().optional(),
    sort: z.string().optional(),
    order: z.string().optional(),
    count: z.number().optional(),
    offset: z.number().optional(),
    createdSince: z.string().optional(),
    createdUntil: z.string().optional(),
    updatedSince: z.string().optional(),
    updatedUntil: z.string().optional(),
    startDateSince: z.string().optional(),
    startDateUntil: z.string().optional(),
    dueDateSince: z.string().optional(),
    dueDateUntil: z.string().optional(),
    id: z.array(z.number()).optional(),
    parentIssueId: z.array(z.number()).optional(),
    keyword: z.string().optional()
  },
  async (params: {
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
  }) => {
    const result = await countIssue(
      apikey,
      baseUrl,
      params
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Get Issue Tool
server.tool(
  "get-issue",
  {
    issueIdOrKey: z.union([z.string(), z.number()])
  },
  async (params: {
    issueIdOrKey: string | number;
  }) => {
    if (!params.issueIdOrKey) {
      throw new Error("Issue ID or key is required");
    }

    const result = await getIssue(
      apikey,
      baseUrl,
      params.issueIdOrKey
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Delete Issue Tool
server.tool(
  "delete-issue",
  {
    issueIdOrKey: z.union([z.string(), z.number()])
  },
  async (params: {
    issueIdOrKey: string | number;
  }) => {
    if (!params.issueIdOrKey) {
      throw new Error("Issue ID or key is required");
    }

    const result = await deleteIssue(
      apikey,
      baseUrl,
      params.issueIdOrKey
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Get Comment List Tool
server.tool(
  "get-comment-list",
  {
    issueIdOrKey: z.union([z.string(), z.number()]),
    minId: z.number().optional(),
    maxId: z.number().optional(),
    count: z.number().optional(),
    order: z.enum(["desc", "asc"]).optional()
  },
  async (params: {
    issueIdOrKey: string | number;
    minId?: number;
    maxId?: number;
    count?: number;
    order?: "desc" | "asc";
  }) => {
    if (!params.issueIdOrKey) {
      throw new Error("Issue ID or key is required");
    }

    const { issueIdOrKey, ...options } = params;

    const result = await getCommentList(
      apikey,
      baseUrl,
      issueIdOrKey,
      options
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Add Comment Tool
server.tool(
  "add-comment",
  {
    issueIdOrKey: z.union([z.string(), z.number()]),
    content: z.string(),
    notifiedUserId: z.array(z.number()).optional(),
    attachmentId: z.array(z.number()).optional()
  },
  async (params: {
    issueIdOrKey: string | number;
    content: string;
    notifiedUserId?: number[];
    attachmentId?: number[];
  }) => {
    if (!params.issueIdOrKey) {
      throw new Error("Issue ID or key is required");
    }

    if (!params.content) {
      throw new Error("Comment content is required");
    }

    const { issueIdOrKey, content, ...options } = params;

    const result = await addComment(
      apikey,
      baseUrl,
      issueIdOrKey,
      content,
      options
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Count Comment Tool
server.tool(
  "count-comment",
  {
    issueIdOrKey: z.union([z.string(), z.number()])
  },
  async (params: {
    issueIdOrKey: string | number;
  }) => {
    if (!params.issueIdOrKey) {
      throw new Error("Issue ID or key is required");
    }

    const result = await countComment(
      apikey,
      baseUrl,
      params.issueIdOrKey
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Get Comment Tool
server.tool(
  "get-comment",
  {
    issueIdOrKey: z.union([z.string(), z.number()]),
    commentId: z.number()
  },
  async (params: {
    issueIdOrKey: string | number;
    commentId: number;
  }) => {
    if (!params.issueIdOrKey) {
      throw new Error("Issue ID or key is required");
    }

    if (!params.commentId) {
      throw new Error("Comment ID is required");
    }

    const result = await getComment(
      apikey,
      baseUrl,
      params.issueIdOrKey,
      params.commentId
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Delete Comment Tool
server.tool(
  "delete-comment",
  {
    issueIdOrKey: z.union([z.string(), z.number()]),
    commentId: z.number()
  },
  async (params: {
    issueIdOrKey: string | number;
    commentId: number;
  }) => {
    if (!params.issueIdOrKey) {
      throw new Error("Issue ID or key is required");
    }

    if (!params.commentId) {
      throw new Error("Comment ID is required");
    }

    const result = await deleteComment(
      apikey,
      baseUrl,
      params.issueIdOrKey,
      params.commentId
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Update Comment Tool
server.tool(
  "update-comment",
  {
    issueIdOrKey: z.union([z.string(), z.number()]),
    commentId: z.number(),
    content: z.string()
  },
  async (params: {
    issueIdOrKey: string | number;
    commentId: number;
    content: string;
  }) => {
    if (!params.issueIdOrKey) {
      throw new Error("Issue ID or key is required");
    }

    if (!params.commentId) {
      throw new Error("Comment ID is required");
    }

    if (!params.content) {
      throw new Error("Comment content is required");
    }

    const result = await updateComment(
      apikey,
      baseUrl,
      params.issueIdOrKey,
      params.commentId,
      params.content
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Get List of Comment Notifications Tool
server.tool(
  "get-list-of-comment-notifications",
  {
    issueIdOrKey: z.union([z.string(), z.number()]),
    commentId: z.number()
  },
  async (params: {
    issueIdOrKey: string | number;
    commentId: number;
  }) => {
    if (!params.issueIdOrKey) {
      throw new Error("Issue ID or key is required");
    }

    if (!params.commentId) {
      throw new Error("Comment ID is required");
    }

    const result = await getListOfCommentNotifications(
      apikey,
      baseUrl,
      params.issueIdOrKey,
      params.commentId
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Add Comment Notification Tool
server.tool(
  "add-comment-notification",
  {
    issueIdOrKey: z.union([z.string(), z.number()]),
    commentId: z.number(),
    notifiedUserIds: z.array(z.number())
  },
  async (params: {
    issueIdOrKey: string | number;
    commentId: number;
    notifiedUserIds: number[];
  }) => {
    if (!params.issueIdOrKey) {
      throw new Error("Issue ID or key is required");
    }

    if (!params.commentId) {
      throw new Error("Comment ID is required");
    }

    if (!params.notifiedUserIds || params.notifiedUserIds.length === 0) {
      throw new Error("Notified user IDs are required");
    }

    const result = await addCommentNotification(
      apikey,
      baseUrl,
      params.issueIdOrKey,
      params.commentId,
      params.notifiedUserIds
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Get List of Issue Attachments Tool
server.tool(
  "get-list-of-issue-attachments",
  {
    issueIdOrKey: z.union([z.string(), z.number()])
  },
  async (params: {
    issueIdOrKey: string | number;
  }) => {
    if (!params.issueIdOrKey) {
      throw new Error("Issue ID or key is required");
    }

    const result = await getListOfIssueAttachments(
      apikey,
      baseUrl,
      params.issueIdOrKey
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Get Issue Attachment Tool
server.tool(
  "get-issue-attachment",
  {
    issueIdOrKey: z.union([z.string(), z.number()]),
    attachmentId: z.number()
  },
  async (params: {
    issueIdOrKey: string | number;
    attachmentId: number;
  }) => {
    if (!params.issueIdOrKey) {
      throw new Error("Issue ID or key is required");
    }

    if (!params.attachmentId) {
      throw new Error("Attachment ID is required");
    }

    const result = await getIssueAttachment(
      apikey,
      baseUrl,
      params.issueIdOrKey,
      params.attachmentId
    );

    // For binary data, we convert to base64 string
    const base64 = Buffer.from(result).toString('base64');

    return {
      content: [{ type: "text", text: base64 }],
    };
  }
);

// Delete Issue Attachment Tool
server.tool(
  "delete-issue-attachment",
  {
    issueIdOrKey: z.union([z.string(), z.number()]),
    attachmentId: z.number()
  },
  async (params: {
    issueIdOrKey: string | number;
    attachmentId: number;
  }) => {
    if (!params.issueIdOrKey) {
      throw new Error("Issue ID or key is required");
    }

    if (!params.attachmentId) {
      throw new Error("Attachment ID is required");
    }

    const result = await deleteIssueAttachment(
      apikey,
      baseUrl,
      params.issueIdOrKey,
      params.attachmentId
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Get Issue Participant List Tool
server.tool(
  "get-issue-participant-list",
  {
    issueIdOrKey: z.union([z.string(), z.number()])
  },
  async (params: {
    issueIdOrKey: string | number;
  }) => {
    if (!params.issueIdOrKey) {
      throw new Error("Issue ID or key is required");
    }

    const result = await getIssueParticipantList(
      apikey,
      baseUrl,
      params.issueIdOrKey
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Get List of Linked Shared Files Tool
server.tool(
  "get-list-of-linked-shared-files",
  {
    issueIdOrKey: z.union([z.string(), z.number()])
  },
  async (params: {
    issueIdOrKey: string | number;
  }) => {
    if (!params.issueIdOrKey) {
      throw new Error("Issue ID or key is required");
    }

    const result = await getListOfLinkedSharedFiles(
      apikey,
      baseUrl,
      params.issueIdOrKey
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Link Shared Files to Issue Tool
server.tool(
  "link-shared-files-to-issue",
  {
    issueIdOrKey: z.union([z.string(), z.number()]),
    fileIds: z.array(z.number())
  },
  async (params: {
    issueIdOrKey: string | number;
    fileIds: number[];
  }) => {
    if (!params.issueIdOrKey) {
      throw new Error("Issue ID or key is required");
    }

    if (!params.fileIds || params.fileIds.length === 0) {
      throw new Error("File IDs are required");
    }

    const result = await linkSharedFilesToIssue(
      apikey,
      baseUrl,
      params.issueIdOrKey,
      params.fileIds
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Remove Link to Shared File from Issue Tool
server.tool(
  "remove-link-to-shared-file-from-issue",
  {
    issueIdOrKey: z.union([z.string(), z.number()]),
    fileId: z.number()
  },
  async (params: {
    issueIdOrKey: string | number;
    fileId: number;
  }) => {
    if (!params.issueIdOrKey) {
      throw new Error("Issue ID or key is required");
    }

    if (!params.fileId) {
      throw new Error("File ID is required");
    }

    const result = await removeLinkToSharedFileFromIssue(
      apikey,
      baseUrl,
      params.issueIdOrKey,
      params.fileId
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Get Wiki Page List Tool
server.tool(
  "get-wiki-page-list",
  { 
    projectIdOrKey: z.union([z.string(), z.number()]).optional(),
    keyword: z.string().optional(),
    count: z.number().optional(),
    offset: z.number().optional()
  },
  async (params: { 
    projectIdOrKey?: string | number; 
    keyword?: string;
    count?: number;
    offset?: number;
  }) => {
    const result = await getWikiPageList(
      apikey,
      baseUrl,
      {
        projectIdOrKey: params.projectIdOrKey,
        keyword: params.keyword,
        count: params.count,
        offset: params.offset,
      }
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Count Wiki Page Tool
server.tool(
  "count-wiki-page",
  { projectIdOrKey: z.union([z.string(), z.number()]).optional() },
  async (params: { projectIdOrKey?: string | number }) => {
    const result = await countWikiPage(
      apikey,
      baseUrl,
      params.projectIdOrKey
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Get Wiki Page Tag List Tool
server.tool(
  "get-wiki-page-tag-list",
  { projectIdOrKey: z.union([z.string(), z.number()]).optional() },
  async (params: { projectIdOrKey?: string | number }) => {
    const result = await getWikiPageTagList(
      apikey,
      baseUrl,
      params.projectIdOrKey
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Add Wiki Page Tool
server.tool(
  "add-wiki-page",
  { 
    projectId: z.number(),
    name: z.string(),
    content: z.string(),
    mailNotify: z.boolean().optional(),
    tags: z.array(z.string()).optional()
  },
  async (params: { 
    projectId: number; 
    name: string;
    content: string;
    mailNotify?: boolean;
    tags?: string[];
  }) => {
    if (!params.projectId) {
      throw new Error("Project ID is required");
    }
    if (!params.name) {
      throw new Error("Wiki page name is required");
    }
    if (!params.content) {
      throw new Error("Wiki page content is required");
    }

    const result = await addWikiPage(
      apikey,
      baseUrl,
      params.projectId,
      params.name,
      params.content,
      {
        mailNotify: params.mailNotify,
        tags: params.tags,
      }
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Get Wiki Page Tool
server.tool(
  "get-wiki-page",
  { wikiId: z.number() },
  async (params: { wikiId: number }) => {
    if (!params.wikiId) {
      throw new Error("Wiki ID is required");
    }

    const result = await getWikiPage(
      apikey,
      baseUrl,
      params.wikiId
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Update Wiki Page Tool
server.tool(
  "update-wiki-page",
  { 
    wikiId: z.number(),
    name: z.string().optional(),
    content: z.string().optional(),
    mailNotify: z.boolean().optional(),
    tags: z.array(z.string()).optional()
  },
  async (params: { 
    wikiId: number; 
    name?: string;
    content?: string;
    mailNotify?: boolean;
    tags?: string[];
  }) => {
    if (!params.wikiId) {
      throw new Error("Wiki ID is required");
    }

    const result = await updateWikiPage(
      apikey,
      baseUrl,
      params.wikiId,
      {
        name: params.name,
        content: params.content,
        mailNotify: params.mailNotify,
        tags: params.tags,
      }
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Delete Wiki Page Tool
server.tool(
  "delete-wiki-page",
  { 
    wikiId: z.number(),
    mailNotify: z.boolean().optional()
  },
  async (params: { 
    wikiId: number;
    mailNotify?: boolean;
  }) => {
    if (!params.wikiId) {
      throw new Error("Wiki ID is required");
    }

    const result = await deleteWikiPage(
      apikey,
      baseUrl,
      params.wikiId,
      params.mailNotify
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Get List of Wiki Attachments Tool
server.tool(
  "get-list-of-wiki-attachments",
  { wikiId: z.number() },
  async (params: { wikiId: number }) => {
    if (!params.wikiId) {
      throw new Error("Wiki ID is required");
    }

    const result = await getListOfWikiAttachments(
      apikey,
      baseUrl,
      params.wikiId
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Attach File to Wiki Tool
server.tool(
  "attach-file-to-wiki",
  { 
    wikiId: z.number(),
    attachmentId: z.number()
  },
  async (params: { 
    wikiId: number;
    attachmentId: number;
  }) => {
    if (!params.wikiId) {
      throw new Error("Wiki ID is required");
    }
    if (!params.attachmentId) {
      throw new Error("Attachment ID is required");
    }

    const result = await attachFileToWiki(
      apikey,
      baseUrl,
      params.wikiId,
      params.attachmentId
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Get Wiki Page Attachment Tool
server.tool(
  "get-wiki-page-attachment",
  { 
    wikiId: z.number(),
    attachmentId: z.number()
  },
  async (params: { 
    wikiId: number;
    attachmentId: number;
  }) => {
    if (!params.wikiId) {
      throw new Error("Wiki ID is required");
    }
    if (!params.attachmentId) {
      throw new Error("Attachment ID is required");
    }

    const result = await getWikiPageAttachment(
      apikey,
      baseUrl,
      params.wikiId,
      params.attachmentId
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Remove Wiki Attachment Tool
server.tool(
  "remove-wiki-attachment",
  { 
    wikiId: z.number(),
    attachmentId: z.number()
  },
  async (params: { 
    wikiId: number;
    attachmentId: number;
  }) => {
    if (!params.wikiId) {
      throw new Error("Wiki ID is required");
    }
    if (!params.attachmentId) {
      throw new Error("Attachment ID is required");
    }

    const result = await removeWikiAttachment(
      apikey,
      baseUrl,
      params.wikiId,
      params.attachmentId
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Get List of Shared Files on Wiki Tool
server.tool(
  "get-list-of-shared-files-on-wiki",
  { wikiId: z.number() },
  async (params: { wikiId: number }) => {
    if (!params.wikiId) {
      throw new Error("Wiki ID is required");
    }

    const result = await getListOfSharedFilesOnWiki(
      apikey,
      baseUrl,
      params.wikiId
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Link Shared Files to Wiki Tool
server.tool(
  "link-shared-files-to-wiki",
  { 
    wikiId: z.number(),
    fileIds: z.array(z.number())
  },
  async (params: { 
    wikiId: number;
    fileIds: number[];
  }) => {
    if (!params.wikiId) {
      throw new Error("Wiki ID is required");
    }
    if (!params.fileIds || params.fileIds.length === 0) {
      throw new Error("At least one file ID is required");
    }

    const result = await linkSharedFilesToWiki(
      apikey,
      baseUrl,
      params.wikiId,
      params.fileIds
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Remove Link to Shared File from Wiki Tool
server.tool(
  "remove-link-to-shared-file-from-wiki",
  { 
    wikiId: z.number(),
    fileId: z.number()
  },
  async (params: { 
    wikiId: number;
    fileId: number;
  }) => {
    if (!params.wikiId) {
      throw new Error("Wiki ID is required");
    }
    if (!params.fileId) {
      throw new Error("File ID is required");
    }

    const result = await removeLinkToSharedFileFromWiki(
      apikey,
      baseUrl,
      params.wikiId,
      params.fileId
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Get Wiki Page History Tool
server.tool(
  "get-wiki-page-history",
  { 
    wikiId: z.number(),
    minId: z.number().optional(),
    maxId: z.number().optional(),
    count: z.number().optional(),
    order: z.enum(["asc", "desc"]).optional()
  },
  async (params: { 
    wikiId: number;
    minId?: number;
    maxId?: number;
    count?: number;
    order?: "asc" | "desc";
  }) => {
    if (!params.wikiId) {
      throw new Error("Wiki ID is required");
    }

    const result = await getWikiPageHistory(
      apikey,
      baseUrl,
      params.wikiId,
      {
        minId: params.minId,
        maxId: params.maxId,
        count: params.count,
        order: params.order,
      }
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Get Wiki Page Star Tool
server.tool(
  "get-wiki-page-star",
  { wikiId: z.number() },
  async (params: { wikiId: number }) => {
    if (!params.wikiId) {
      throw new Error("Wiki ID is required");
    }

    const result = await getWikiPageStar(
      apikey,
      baseUrl,
      params.wikiId
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  }
);

// Add Star Tool
server.tool(
  "add-star",
  {
    issueId: z.number().optional(),
    commentId: z.number().optional(),
    wikiId: z.number().optional(),
    pullRequestId: z.number().optional(),
    pullRequestCommentId: z.number().optional(),
  },
  async (params: {
    issueId?: number;
    commentId?: number;
    wikiId?: number;
    pullRequestId?: number;
    pullRequestCommentId?: number;
  }) => {
    if (!params.issueId && !params.commentId && !params.wikiId && !params.pullRequestId && !params.pullRequestCommentId) {
      throw new Error("At least one of issueId, commentId, wikiId, pullRequestId, or pullRequestCommentId is required");
    }

    const result = await addStar(
      apikey,
      baseUrl,
      params,
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  },
);

// Count Notification Tool
server.tool(
  "count-notification",
  {
    alreadyRead: z.boolean().optional(),
  },
  async (params: { alreadyRead?: boolean }) => {
    const result = await countNotification(
      apikey,
      baseUrl,
      params,
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  },
);

// Get Notification List Tool
server.tool(
  "get-notification-list",
  {
    minId: z.number().optional(),
    maxId: z.number().optional(),
    count: z.number().optional(),
    order: z.enum(["asc", "desc"]).optional(),
  },
  async (params: {
    minId?: number;
    maxId?: number;
    count?: number;
    order?: "asc" | "desc";
  }) => {
    const result = await getNotificationList(
      apikey,
      baseUrl,
      params,
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  },
);

// Reset Unread Notification Count Tool
server.tool("reset-unread-notification-count", async () => {
  const result = await resetUnreadNotificationCount(
    apikey,
    baseUrl,
  );

  return {
    content: [{ type: "text", text: JSON.stringify(result) }],
  };
});

// Get List of Git Repositories Tool
server.tool(
  "get-list-of-git-repositories",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
  },
  async (params: { projectIdOrKey: string | number }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }

    const result = await getListOfGitRepositories(
      apikey,
      baseUrl,
      params.projectIdOrKey,
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  },
);

// Get Git Repository Tool
server.tool(
  "get-git-repository",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    repoIdOrName: z.union([z.string(), z.number()]),
  },
  async (params: {
    projectIdOrKey: string | number;
    repoIdOrName: string | number;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }
    if (!params.repoIdOrName) {
      throw new Error("Repository ID or name is required");
    }

    const result = await getGitRepository(
      apikey,
      baseUrl,
      params.projectIdOrKey,
      params.repoIdOrName,
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  },
);

// Get Pull Request List Tool
server.tool(
  "get-pull-request-list",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    repoIdOrName: z.union([z.string(), z.number()]),
    statusId: z.array(z.number()).optional(),
    assigneeId: z.array(z.number()).optional(),
    issueId: z.array(z.number()).optional(),
    createdUserId: z.array(z.number()).optional(),
    offset: z.number().optional(),
    count: z.number().optional(),
  },
  async (params: {
    projectIdOrKey: string | number;
    repoIdOrName: string | number;
    statusId?: number[];
    assigneeId?: number[];
    issueId?: number[];
    createdUserId?: number[];
    offset?: number;
    count?: number;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }
    if (!params.repoIdOrName) {
      throw new Error("Repository ID or name is required");
    }

    const { projectIdOrKey, repoIdOrName, ...options } = params;
    
    const result = await getPullRequestList(
      apikey,
      baseUrl,
      projectIdOrKey,
      repoIdOrName,
      options,
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  },
);

// Get Number of Pull Requests Tool
server.tool(
  "get-number-of-pull-requests",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    repoIdOrName: z.union([z.string(), z.number()]),
    statusId: z.array(z.number()).optional(),
    assigneeId: z.array(z.number()).optional(),
    issueId: z.array(z.number()).optional(),
    createdUserId: z.array(z.number()).optional(),
  },
  async (params: {
    projectIdOrKey: string | number;
    repoIdOrName: string | number;
    statusId?: number[];
    assigneeId?: number[];
    issueId?: number[];
    createdUserId?: number[];
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }
    if (!params.repoIdOrName) {
      throw new Error("Repository ID or name is required");
    }

    const { projectIdOrKey, repoIdOrName, ...options } = params;
    
    const result = await getNumberOfPullRequests(
      apikey,
      baseUrl,
      projectIdOrKey,
      repoIdOrName,
      options,
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  },
);

// Add Pull Request Tool
server.tool(
  "add-pull-request",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    repoIdOrName: z.union([z.string(), z.number()]),
    summary: z.string(),
    description: z.string(),
    base: z.string(),
    branch: z.string(),
    issueId: z.number().optional(),
    assigneeId: z.number().optional(),
    notifiedUserId: z.array(z.number()).optional(),
    attachmentId: z.array(z.number()).optional(),
  },
  async (params: {
    projectIdOrKey: string | number;
    repoIdOrName: string | number;
    summary: string;
    description: string;
    base: string;
    branch: string;
    issueId?: number;
    assigneeId?: number;
    notifiedUserId?: number[];
    attachmentId?: number[];
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }
    if (!params.repoIdOrName) {
      throw new Error("Repository ID or name is required");
    }
    if (!params.summary) {
      throw new Error("Summary is required");
    }
    if (!params.description) {
      throw new Error("Description is required");
    }
    if (!params.base) {
      throw new Error("Base branch is required");
    }
    if (!params.branch) {
      throw new Error("Feature branch is required");
    }

    const { projectIdOrKey, repoIdOrName, summary, description, base, branch, ...options } = params;
    
    const result = await addPullRequest(
      apikey,
      baseUrl,
      projectIdOrKey,
      repoIdOrName,
      summary,
      description,
      base,
      branch,
      options,
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  },
);

// Update Pull Request Tool
server.tool(
  "update-pull-request",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    repoIdOrName: z.union([z.string(), z.number()]),
    number: z.number(),
    summary: z.string().optional(),
    description: z.string().optional(),
    issueId: z.number().optional(),
    assigneeId: z.number().optional(),
    statusId: z.number().optional(),
    repositoryId: z.number().optional(),
    baseId: z.number().optional(),
    branchId: z.number().optional(),
    notifiedUserId: z.array(z.number()).optional(),
    attachmentId: z.array(z.number()).optional(),
  },
  async (params: {
    projectIdOrKey: string | number;
    repoIdOrName: string | number;
    number: number;
    summary?: string;
    description?: string;
    issueId?: number;
    assigneeId?: number;
    statusId?: number;
    repositoryId?: number;
    baseId?: number;
    branchId?: number;
    notifiedUserId?: number[];
    attachmentId?: number[];
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }
    if (!params.repoIdOrName) {
      throw new Error("Repository ID or name is required");
    }
    if (!params.number) {
      throw new Error("Pull request number is required");
    }

    const { projectIdOrKey, repoIdOrName, number, ...options } = params;
    
    const result = await updatePullRequest(
      apikey,
      baseUrl,
      projectIdOrKey,
      repoIdOrName,
      number,
      options,
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  },
);

// Get Pull Request Tool
server.tool(
  "get-pull-request",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    repoIdOrName: z.union([z.string(), z.number()]),
    number: z.number(),
  },
  async (params: {
    projectIdOrKey: string | number;
    repoIdOrName: string | number;
    number: number;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }
    if (!params.repoIdOrName) {
      throw new Error("Repository ID or name is required");
    }
    if (!params.number) {
      throw new Error("Pull request number is required");
    }
    
    const result = await getPullRequest(
      apikey,
      baseUrl,
      params.projectIdOrKey,
      params.repoIdOrName,
      params.number,
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  },
);

// Add Pull Request Comment Tool
server.tool(
  "add-pull-request-comment",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    repoIdOrName: z.union([z.string(), z.number()]),
    number: z.number(),
    content: z.string(),
    notifiedUserId: z.array(z.number()).optional(),
    attachmentId: z.array(z.number()).optional(),
  },
  async (params: {
    projectIdOrKey: string | number;
    repoIdOrName: string | number;
    number: number;
    content: string;
    notifiedUserId?: number[];
    attachmentId?: number[];
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }
    if (!params.repoIdOrName) {
      throw new Error("Repository ID or name is required");
    }
    if (!params.number) {
      throw new Error("Pull request number is required");
    }
    if (!params.content) {
      throw new Error("Content is required");
    }

    const { projectIdOrKey, repoIdOrName, number, content, ...options } = params;
    
    const result = await addPullRequestComment(
      apikey,
      baseUrl,
      projectIdOrKey,
      repoIdOrName,
      number,
      content,
      options,
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  },
);

// Get Pull Request Comment Tool
server.tool(
  "get-pull-request-comment",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    repoIdOrName: z.union([z.string(), z.number()]),
    number: z.number(),
    minId: z.number().optional(),
    maxId: z.number().optional(),
    count: z.number().optional(),
    order: z.enum(["asc", "desc"]).optional(),
  },
  async (params: {
    projectIdOrKey: string | number;
    repoIdOrName: string | number;
    number: number;
    minId?: number;
    maxId?: number;
    count?: number;
    order?: "asc" | "desc";
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }
    if (!params.repoIdOrName) {
      throw new Error("Repository ID or name is required");
    }
    if (!params.number) {
      throw new Error("Pull request number is required");
    }

    const { projectIdOrKey, repoIdOrName, number, ...options } = params;
    
    const result = await getPullRequestComment(
      apikey,
      baseUrl,
      projectIdOrKey,
      repoIdOrName,
      number,
      options,
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  },
);

// Get Number of Pull Request Comments Tool
server.tool(
  "get-number-of-pull-request-comments",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    repoIdOrName: z.union([z.string(), z.number()]),
    number: z.number(),
  },
  async (params: {
    projectIdOrKey: string | number;
    repoIdOrName: string | number;
    number: number;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }
    if (!params.repoIdOrName) {
      throw new Error("Repository ID or name is required");
    }
    if (!params.number) {
      throw new Error("Pull request number is required");
    }
    
    const result = await getNumberOfPullRequestComments(
      apikey,
      baseUrl,
      params.projectIdOrKey,
      params.repoIdOrName,
      params.number,
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  },
);

// Update Pull Request Comment Information Tool
server.tool(
  "update-pull-request-comment-information",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    repoIdOrName: z.union([z.string(), z.number()]),
    number: z.number(),
    commentId: z.number(),
    content: z.string(),
  },
  async (params: {
    projectIdOrKey: string | number;
    repoIdOrName: string | number;
    number: number;
    commentId: number;
    content: string;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }
    if (!params.repoIdOrName) {
      throw new Error("Repository ID or name is required");
    }
    if (!params.number) {
      throw new Error("Pull request number is required");
    }
    if (!params.commentId) {
      throw new Error("Comment ID is required");
    }
    if (!params.content) {
      throw new Error("Content is required");
    }
    
    const result = await updatePullRequestCommentInformation(
      apikey,
      baseUrl,
      params.projectIdOrKey,
      params.repoIdOrName,
      params.number,
      params.commentId,
      params.content,
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  },
);

// Get List of Pull Request Attachments Tool
server.tool(
  "get-list-of-pull-request-attachments",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    repoIdOrName: z.union([z.string(), z.number()]),
    number: z.number(),
  },
  async (params: {
    projectIdOrKey: string | number;
    repoIdOrName: string | number;
    number: number;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }
    if (!params.repoIdOrName) {
      throw new Error("Repository ID or name is required");
    }
    if (!params.number) {
      throw new Error("Pull request number is required");
    }
    
    const result = await getListOfPullRequestAttachments(
      apikey,
      baseUrl,
      params.projectIdOrKey,
      params.repoIdOrName,
      params.number,
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  },
);

// Download Pull Request Attachment Tool
server.tool(
  "download-pull-request-attachment",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    repoIdOrName: z.union([z.string(), z.number()]),
    number: z.number(),
    attachmentId: z.number(),
  },
  async (params: {
    projectIdOrKey: string | number;
    repoIdOrName: string | number;
    number: number;
    attachmentId: number;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }
    if (!params.repoIdOrName) {
      throw new Error("Repository ID or name is required");
    }
    if (!params.number) {
      throw new Error("Pull request number is required");
    }
    if (!params.attachmentId) {
      throw new Error("Attachment ID is required");
    }
    
    const result = await downloadPullRequestAttachment(
      apikey,
      baseUrl,
      params.projectIdOrKey,
      params.repoIdOrName,
      params.number,
      params.attachmentId,
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  },
);

// Delete Pull Request Attachments Tool
server.tool(
  "delete-pull-request-attachments",
  {
    projectIdOrKey: z.union([z.string(), z.number()]),
    repoIdOrName: z.union([z.string(), z.number()]),
    number: z.number(),
    attachmentId: z.number(),
  },
  async (params: {
    projectIdOrKey: string | number;
    repoIdOrName: string | number;
    number: number;
    attachmentId: number;
  }) => {
    if (!params.projectIdOrKey) {
      throw new Error("Project ID or key is required");
    }
    if (!params.repoIdOrName) {
      throw new Error("Repository ID or name is required");
    }
    if (!params.number) {
      throw new Error("Pull request number is required");
    }
    if (!params.attachmentId) {
      throw new Error("Attachment ID is required");
    }
    
    const result = await deletePullRequestAttachments(
      apikey,
      baseUrl,
      params.projectIdOrKey,
      params.repoIdOrName,
      params.number,
      params.attachmentId,
    );

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
    };
  },
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
server.connect(transport);

console.log("Server started");
