import * as vscode from 'vscode';

export const gotoProblemInFileCommand = async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        await vscode.window.showQuickPick([{ label: 'No active editor found' }], { placeHolder: 'Select a problem to navigate to' });
        return;
    }

    const severityFilter = (diagnostic: vscode.Diagnostic) => (diagnostic.severity !== vscode.DiagnosticSeverity.Information && diagnostic.severity !== vscode.DiagnosticSeverity.Hint);
    const orderSorter = (a: vscode.Diagnostic, b: vscode.Diagnostic) => (a.severity - b.severity);

    const diagnostics = vscode.languages.getDiagnostics(editor.document.uri)
        .filter(severityFilter).sort(orderSorter);
    if (diagnostics.length === 0) {
        await vscode.window.showQuickPick([{ label: 'No problems found in the current file' }], { placeHolder: 'Select a problem to navigate to' });
        return;
    }

    const items = diagnostics.map(diagnostic => ({
        iconPath: new vscode.ThemeIcon(diagnostic.severity === vscode.DiagnosticSeverity.Error ? 'error' : 'warning'),
        label: diagnostic.message,
        description: `${diagnostic.range.start.line + 1}:${diagnostic.range.start.character + 1}`,
        diagnostic
    }));

    const selected = await vscode.window.showQuickPick(items, {
        placeHolder: 'Select a problem to navigate to',
        matchOnDescription: true
    });

    if (selected) {
        const { range } = selected.diagnostic;
        editor.selection = new vscode.Selection(range.start, range.start);
        editor.revealRange(range, vscode.TextEditorRevealType.InCenter);
    }
};