import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import path from "path";
import { getSpaceActivities } from "./backlog-api/space-activities";
import { getActivity } from "./backlog-api/activities";
import { getSpaceLogo } from "./backlog-api/space-logo";
import { getSpaceNotification } from "./backlog-api/space-notification";
import { updateSpaceNotification } from "./backlog-api/update-space-notification";
import { getSpaceDiskUsage } from "./backlog-api/space-disk-usage";
import { getUsers } from "./backlog-api/get-users";
import { getUser } from "./backlog-api/get-user";
import { deleteUser } from "./backlog-api/delete-user";
import { getProjects } from "./backlog-api/get-projects";
import { getIssues } from "./backlog-api/get-issues";
import { createIssue } from "./backlog-api/create-issue";
import { updateIssue } from "./backlog-api/update-issue";
import { loadApiKey } from "./api-key-loader";
import { z } from "zod";

const apikey = loadApiKey(path.join(__dirname, "../apikey"));
const baseUrl = "yourstand.backlog.com";

// Create an MCP server
const server = new McpServer({
  name: "Backlog",
  version: "1.0.0",
});

server.tool("space-activities", async () => {
  const result = await getSpaceActivities(apikey, baseUrl, {});

  return {
    content: [{ type: "text", text: JSON.stringify(result) }],
  };
});

server.tool(
  "activity",
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
server.tool("space-logo", async () => {
  const result = await getSpaceLogo(
    apikey,
    baseUrl
  );

  return {
    content: [{ type: "text", text: JSON.stringify(result) }],
  };
});

// Space Notification Tool
server.tool("space-notification", async () => {
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
server.tool("space-disk-usage", async () => {
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
  "issues",
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
  "create-issue",
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

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
server.connect(transport);

console.log("Server started");
