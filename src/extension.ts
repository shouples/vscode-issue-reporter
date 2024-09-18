import * as vscode from "vscode";
import { setExtensionContext } from "./extensionContext";
import { getIssueContext, issueReporterCommand } from "./issues";
import { Logger, OUTPUT_CHANNEL } from "./logging";

const logger = new Logger("extension");

export function activate(context: vscode.ExtensionContext) {
  // set the extension context for other modules to use
  setExtensionContext(context);
  // register the output channel
  context.subscriptions.push(OUTPUT_CHANNEL);
  // register Issue Reporter + context info preload
  const reporterCommand: vscode.Disposable = vscode.commands.registerCommand(
    "issueReporter.open",
    issueReporterCommand,
  );
  context.subscriptions.push(reporterCommand);
  getIssueContext().set({ key: "activated", value: true });
  logger.info("Issue Reporter extension activated");
}

export function deactivate() {}
