import * as vscode from 'vscode';
import { gotoProblemInFileCommand } from './gotoProblemCommand';

export function activate(context: vscode.ExtensionContext) {
	let gotoProblem = vscode.commands.registerCommand('gap.enhanced.goto.gotoProblemInFile', gotoProblemInFileCommand);

	context.subscriptions.push(gotoProblem);
}

// This method is called when your extension is deactivated
export function deactivate() { }
