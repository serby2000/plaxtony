import * as gt from '../compiler/types';
import { TypeChecker } from '../compiler/checker';
import { Store } from './store';
import { findAncestor, getSourceFileOfNode } from '../compiler/utils';
import { getTokenAtPosition, findPrecedingToken, getLineAndCharacterOfPosition } from './utils';
import * as lsp from 'vscode-languageserver';

export class DefinitionProvider {
    private store: Store;

    public constructor(store: Store) {
        this.store = store;
    }

    public getDefinitionAt(uri: string, position: number): lsp.Definition {
        // let completions = <lsp.CompletionItem[]> [];

        const currentDocument = this.store.documents.get(uri);
        const currentToken = getTokenAtPosition(position, currentDocument);

        if (!currentToken || (<gt.Node>currentToken).kind !== gt.SyntaxKind.Identifier) {
            return [];
        }

        const definitions: lsp.Location[] = [];

        const checker = new TypeChecker(this.store);
        const symbol = checker.getSymbolAtLocation(currentToken);

        if (!symbol) {
            return [];
        }

        for (let item of symbol.declarations) {
            const sourceFile = getSourceFileOfNode(item);
            definitions.push(<lsp.Location>{
                uri: getSourceFileOfNode(item).fileName,
                range: {
                    start: getLineAndCharacterOfPosition(sourceFile, item.pos),
                    end: getLineAndCharacterOfPosition(sourceFile, item.end),
                }
            });
        }

        return definitions;
    }
}
