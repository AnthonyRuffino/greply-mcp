# greply MCP Server

An [MCP](https://github.com/modelcontextprotocol) server that wraps the [`greply`](https://www.npmjs.com/package/greply) CLI (Node wrapper for the `greppy` search tool).  
This allows you to use `greply` directly from an MCP-compatible client such as the **Gemini CLI**.

---

## Features
- **`greply.search`** — run `greply` with query, before/after context, and flags.
- **`greply.help`** — print `greply` usage text.

---

## Requirements
- **Node.js** 20 or newer (22 LTS recommended)
- `npm` or `pnpm` for dependency installation
- `greply` CLI available on PATH, or specify `greply_CMD` env var

---

## Installation

Clone and install dependencies:

```bash
git clone https://github.com/your-org/greply-mcp-server.git
cd greply-mcp-server

# Make sure Node version is >= 20
node -v
# If needed:
#   curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
#   source ~/.nvm/nvm.sh
#   nvm install 22 && nvm use 22

npm install
````

---

## Usage

Run the server directly:

```bash
node server.mjs
```

Or with `npm`:

```bash
npm start
```

---

## Gemini CLI Configuration

Add this to your `~/.gemini/settings.json`:

```json
{
  "mcpServers": {
    "greply": {
      "command": "node",
      "args": ["/absolute/path/to/greply-mcp-server/server.mjs"],
      "env": {
        "greply_CMD": "/usr/local/bin/greppy"
      }
    }
  }
}
```

* `greply_CMD` is optional — only set it if the server cannot find `greply` automatically.
* Use an **absolute path** for `server.mjs`.

---

## Tools

### `greply.search`

Search files or directories with the given query and optional flags.

**Input schema:**

| Field            | Type    | Description                           |
| ---------------- | ------- | ------------------------------------- |
| `query`          | string  | Search term (required)                |
| `target`         | string  | File or directory (default `"."`)     |
| `before`         | integer | Lines of context before match (`-B`)  |
| `after`          | integer | Lines of context after match (`-A`)   |
| `recursive`      | boolean | Recurse directories (`-R`)            |
| `wholeWord`      | boolean | Match whole words (`-w`)              |
| `matchCase`      | boolean | Case-sensitive match (`-c`)           |
| `fixedStrings`   | boolean | Fixed-string match (`-F`)             |
| `suppressErrors` | boolean | Return stdout/stderr on non-zero exit |

---

### `greply.help`
Display `greply` usage information.

