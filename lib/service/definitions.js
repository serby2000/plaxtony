"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gt = require("../compiler/types");
const checker_1 = require("../compiler/checker");
const provider_1 = require("./provider");
const utils_1 = require("../compiler/utils");
const utils_2 = require("./utils");
class DefinitionProvider extends provider_1.AbstractProvider {
    getDefinitionAt(uri, position) {
        const currentDocument = this.store.documents.get(uri);
        const currentToken = utils_2.getTokenAtPosition(position, currentDocument);
        if (!currentToken || currentToken.kind !== 107) {
            return [];
        }
        const definitions = [];
        const checker = new checker_1.TypeChecker(this.store);
        const symbol = checker.getSymbolAtLocation(currentToken);
        if (!symbol) {
            return [];
        }
        for (let item of symbol.declarations) {
            const sourceFile = utils_1.getSourceFileOfNode(item);
            definitions.push({
                uri: utils_1.getSourceFileOfNode(item).fileName,
                range: {
                    start: utils_2.getLineAndCharacterOfPosition(sourceFile, item.pos),
                    end: utils_2.getLineAndCharacterOfPosition(sourceFile, item.end),
                }
            });
        }
        return definitions;
    }
}
exports.DefinitionProvider = DefinitionProvider;
//# sourceMappingURL=definitions.js.map