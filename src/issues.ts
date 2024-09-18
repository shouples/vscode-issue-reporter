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
  const issueContext: Record<string, any> = getIssueContext().data;
  const extensionData: string = JSON.stringify(issueContext, null, 2);
  commands.executeCommand("vscode.openIssueReporter", {
    extensionId: "shouples-dev.vscode-issue-reporter",
    issueTitle: "Issue title",
    issueBody: "Issue body",
    extensionData: `<details><summary>Extension Data</summary><pre>${extensionData}</pre></details>`,
  });
}
