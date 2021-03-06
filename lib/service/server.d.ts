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
    private referenceProvider;
    private renameProvider;
    private documents;
    private workspaceWatcher;
    private initParams;
    private indexing;
    private ready;
    private config;
    private documentUpdateRequests;
    private createProvider<T>(cls);
    createConnection(connection?: lsp.IConnection): lsp.IConnection;
    log(msg: string): void;
    private flushDocument(documentUri, isDirty?);
    private reindex(rootPath, modSources);
    private onInitialize(params);
    private onInitialized(params);
    private onDidChangeConfiguration(ev);
    private onDidChangeContent(ev);
    private onUpdateContent(documentUri, req);
    private onDiagnostics(documentUri, req);
    private onDidOpen(ev);
    private onDidClose(ev);
    private onDidSave(ev);
    private onDidFindInWorkspace(ev);
    private onCompletion(params);
    private onCompletionResolve(params);
    private onDocumentSymbol(params);
    private onWorkspaceSymbol(params);
    private onSignatureHelp(params);
    private onDefinition(params);
    private onHover(params);
    private onReferences(params);
    private onRenameRequest(params);
}
export declare function createServer(): lsp.IConnection;
