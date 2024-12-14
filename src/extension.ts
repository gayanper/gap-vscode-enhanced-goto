import * as vscode from 'vscode';
import { gotoProblemInFileCommand } from './gotoProblemCommand';
import { gotoNextSymbolCommand } from './gotoNextSymbol';
import { gotoPreviousSymbolCommand } from './gotoPreviousSymbol';

export function activate(context: vscode.ExtensionContext) {
	let gotoProblem = vscode.commands.registerCommand('gap.enhanced.goto.gotoProblemInFile', gotoProblemInFileCommand);
	context.subscriptions.push(gotoProblem);

	let gotoNextSymbol = vscode.commands.registerCommand('gap.enhanced.goto.gotoNextSymbol', gotoNextSymbolCommand);
	context.subscriptions.push(gotoNextSymbol);

	let gotoPreviousSymbol = vscode.commands.registerCommand('gap.enhanced.goto.gotoPreviousSymbol', gotoPreviousSymbolCommand);
	context.subscriptions.push(gotoPreviousSymbol);
}

// This method is called when your extension is deactivated
export function deactivate() { }
