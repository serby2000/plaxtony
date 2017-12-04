import * as lsp from 'vscode-languageserver';
export declare class Server {
    connection: lsp.IConnection;
    private store;
    private diagnosticsProvider;
    private navigationProvider;
    private completionsProvider;
    private signaturesProvider;
    private definitionsProvider;
    private hoverProvider;
    private documents;
    private workspaceWatcher;
    private initParams;
    private indexing;
    private config;
    private createProvider<T>(cls);
    createConnection(connection?: lsp.IConnection): lsp.IConnection;
    log(msg: string): void;
    private reindex(rootPath, modSources);
    private onInitialize(params);
    private onInitialized(params);
    private onDidChangeConfiguration(ev);
    private onDidChangeContent(ev);
    private onDidOpen(ev);
    private onDidClose(ev);
    private onDidFindInWorkspace(ev);
    private onCompletion(params);
    private onCompletionResolve(params);
    private onDocumentSymbol(params);
    private onWorkspaceSymbol(params);
    private onSignatureHelp(params);
    private onDefinition(params);
    private onHover(params);
}
export declare function createServer(): lsp.IConnection;
