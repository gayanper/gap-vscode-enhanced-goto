import { DocumentSymbol } from "vscode";

export const flatMapChildren: (s: DocumentSymbol) => DocumentSymbol[] =
    (s: DocumentSymbol) => {
        if (s.children) {
            return [s, ...s.children];
        } else {
            return [s];
        }
    };