import { commands } from "vscode";

class IssueContext {
  private static instance: IssueContext;
  private constructor() {}

  private _data: Record<string, any> = {};

  static getInstance() {
    if (!IssueContext.instance) {
      IssueContext.instance = new IssueContext();
    }
    return IssueContext.instance;
  }

  get data() {
    return this._data;
  }

  set({ key, value }: { key: string; value: any }) {
    this._data[key] = value;
  }

  get<T>(key: string): T | undefined {
    return this._data[key];
  }

  reset() {
    this._data = {};
  }
}

export function getIssueContext() {
  return IssueContext.getInstance();
}

export async function issueReporterCommand(context?: Record<string, any>): Promise<void> {
  // gather any context set by the rest of the extension
  const issueContext: Record<string, any> = getIssueContext().data;
  // format to a markdown table
  const markdown = `
---

<details open="true">
<summary>Extension Data</summary>

${recordToMarkdown(issueContext)}

</details>

---
`;
  commands.executeCommand("vscode.openIssueReporter", {
    extensionId: "shouples-dev.vscode-issue-reporter",
    issueTitle: "Issue title",
    issueBody: "Issue body",
    extensionData: markdown,
  });
}

function recordToMarkdown(record: Record<string, any>): string {
  let table = "| Key | Value |\n";
  table += "| --- | --- |\n";
  table += Object.entries(record)
    .map(([key, value]) => `| ${key} | ${value} |`)
    .join("\n");
  return table;
}
