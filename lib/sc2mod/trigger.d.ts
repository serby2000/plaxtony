export declare const enum ElementFlag {
    Native = 2,
    FuncAction = 4,
    FuncCall = 8,
    Event = 16,
    Template = 32,
    PresetGenConstVar = 64,
    PresetCustom = 128,
}
export declare class ElementReference<T extends Element> {
    private store;
    id: string;
    type: typeof Element;
    library?: string;
    constructor(container: TriggerStore, type: {
        new (): T;
    });
    link(): string;
    globalLink(): string;
    resolve(): T | undefined;
}
export declare class ParameterType {
    type: string;
    gameType?: string;
    typeElement?: ElementReference<Preset>;
}
export declare abstract class Element {
    static prefix?: string;
    libId?: string;
    id: string;
    name?: string;
    flags: ElementFlag;
    link(): string;
    toString(): string;
    textKey(kind: string): string;
}
export declare class ParamDef extends Element {
    type: ParameterType;
    default?: ElementReference<Param>;
}
export declare class FunctionDef extends Element {
    static prefix: string;
    parameters: ElementReference<ParamDef>[];
    returnType?: ParameterType;
    getParameters(): ParamDef[];
}
export declare class Preset extends Element {
    baseType: string;
    values: ElementReference<PresetValue>[];
}
export declare class PresetValue extends Element {
    value?: string;
}
export declare class Param extends Element {
    functionCall?: ElementReference<FunctionCall>;
    preset?: ElementReference<PresetValue>;
    value?: string;
    valueType?: string;
    valueElement?: ElementReference<Preset>;
}
export declare class FunctionCall extends Element {
    functionDef: ElementReference<FunctionDef>;
}
export declare abstract class ElementContainer {
    protected elements: Map<string, Element>;
    protected nameMap: Map<string, Element>;
    addElement(identifier: string, el: Element): void;
    findElementByName(name: string): Element | undefined;
    findPresetValueByStr(value: string): PresetValue | undefined;
    findPresetByValue(value: PresetValue): Preset | undefined;
    findElementById<T extends Element>(id: string, type?: {
        new (): T;
    }): T | undefined;
    getElements(): ReadonlyMap<string, Element>;
}
export declare class Library extends ElementContainer {
    protected id: string;
    constructor(id: string);
    addElement(identifier: string, el: Element): void;
    getId(): string;
}
export declare type LibraryContainer = Map<string, Library>;
export declare class TriggerStore extends ElementContainer {
    protected libraries: LibraryContainer;
    protected unresolvedReferences: Map<string, ElementReference<Element>[]>;
    addElementReference(ref: ElementReference<Element>): void;
    addLibrary(library: Library): void;
    getLibraries(): ReadonlyMap<string, Library>;
}
export declare class XMLReader {
    protected store: TriggerStore;
    private parseReference<T>(data, type);
    private parseParam(item);
    private parseFunctionCall(item);
    private parseParameterType(item);
    private parseElement(item);
    private parseTree(data, container);
    private parseLibrary(id, data);
    constructor(container: TriggerStore);
    protected loadXML(content: string): Promise<any>;
    loadLibrary(content: string): Promise<Library>;
    load(content: string, onlyLibraries?: boolean): Promise<TriggerStore>;
}
