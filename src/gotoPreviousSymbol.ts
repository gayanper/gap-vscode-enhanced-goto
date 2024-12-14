import * as vscode from 'vscode';
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

    const previousSymbol = symbols.sort((a, b) => (b.selectionRange.start.line - a.selectionRange.start.line))
        .find(symbol => symbol.range.start.isBefore(editor.selection.active));

    if (previousSymbol) {
        const range = previousSymbol.range;
        editor.selection = new vscode.Selection(range.start, range.start);
        editor.revealRange(range, vscode.TextEditorRevealType.InCenter);
    }
};