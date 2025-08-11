import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { greplyRun, greplyHelp } from "greply";

const server = new McpServer({ name: "greply-mcp", version: "1.0.0" });

server.registerTool(
  "greply.search",
  {
    title: "Search with greply",
    description: "Run the greply CLI to search files with optional context and flags.",
    inputSchema: {
      query: z.string().min(1),
      target: z.string().default("."),       // file or directory
      before: z.number().int().min(0).optional(), // -B
      after: z.number().int().min(0).optional(),  // -A
      recursive: z.boolean().optional(),          // -R
      wholeWord: z.boolean().optional(),          // -w
      matchCase: z.boolean().optional(),          // -c
      fixedStrings: z.boolean().optional(),       // -F
      noColor: z.boolean().optional(),            // -nc
      greplyCmd: z.string().optional(),           // override binary path
      suppressErrors: z.boolean().optional()      // bubble up stdout/stderr on non-zero
    }
  },
  async (args) => {
    const { stdout, stderr } = await greplyRun(args);
    const out = stdout || stderr || "(no output)";
    return { content: [{ type: "text", text: out }] };
  }
);

server.registerTool(
  "greply.help",
  {
    title: "Show greply usage",
    description: "Runs greply with no args to print usage.",
    inputSchema: {}
  },
  async () => {
    const { stdout, stderr } = await greplyHelp();
    return { content: [{ type: "text", text: stdout || stderr || "(no output)" }] };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);

