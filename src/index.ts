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

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
server.connect(transport);

console.log("Server started");
