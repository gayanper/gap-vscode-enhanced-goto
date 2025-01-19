import * as vscode from 'vscode';
import { flatMapChildren } from './common';
export const gotoPreviousSymbolCommand = async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.setStatusBarMessage('No active editor found', 5000);
        return;
    }
    const symbols = await vscode.commands.executeCommand<vscode.DocumentSymbol[]>('vscode.executeDocumentSymbolProvider', editor.document.uri);

    if (!symbols) {
        vscode.window.setStatusBarMessage('No symbols found in the current file', 5000);
        return;
    }

    const cursorPosition = editor.selection.active;
    const previousSymbol = symbols.flatMap(flatMapChildren).sort((a, b) => (b.selectionRange.start.line - a.selectionRange.start.line))
        .find(symbol => symbol.range.start.line < cursorPosition.line);

    if (previousSymbol) {
        const range = previousSymbol.range;
        editor.selection = new vscode.Selection(range.start, range.start);
        editor.revealRange(range, vscode.TextEditorRevealType.InCenter);
    }
};