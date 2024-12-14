import * as vscode from 'vscode';
export const gotoNextSymbolCommand = async () => {
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

    const nextSymbol = symbols.sort((a, b) => (a.selectionRange.start.line - b.selectionRange.start.line))
        .find(symbol => symbol.range.start.isAfter(editor.selection.active));

    if (nextSymbol) {
        const range = nextSymbol.range;
        editor.selection = new vscode.Selection(range.start, range.start);
        editor.revealRange(range, vscode.TextEditorRevealType.InCenter);
    }
};