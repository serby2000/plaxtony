"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scanner_1 = require("./scanner");
const utils_1 = require("./utils");
class Printer {
    constructor() {
        this.emptyLine = true;
        this.reset();
    }
    write(text) {
        if (this.emptyLine) {
            this.output.push('\t'.repeat(this.indent));
            this.emptyLine = false;
        }
        this.output.push(text);
    }
    whitespace(text = ' ') {
        if (this.emptyLine) {
            this.output.push('\t'.repeat(this.indent));
            this.emptyLine = false;
        }
        if (text === '\n') {
            this.newLine();
        }
        else {
            this.output.push(text);
        }
    }
    newLine() {
        this.output.push('\n');
        this.emptyLine = true;
    }
    increaseIndent() {
        ++this.indent;
    }
    decreaseIndent() {
        --this.indent;
    }
    emitNode(node) {
        switch (node.kind) {
            case 135 /* FunctionDeclaration */:
                {
                    const func = node;
                    if (func.modifiers && func.modifiers.length > 0) {
                        this.emitNodeList(func.modifiers, ' ');
                        this.write(' ');
                    }
                    this.emitNode(func.type);
                    this.write(' ');
                    this.emitNode(func.name);
                    this.write('(');
                    this.emitNodeList(func.parameters, ',', ' ');
                    this.write(')');
                    if (func.body) {
                        this.newLine();
                        this.emitNode(func.body);
                    }
                    else {
                        this.write(';');
                    }
                    this.newLine();
                    break;
                }
            case 133 /* StructDeclaration */:
                {
                    const struct = node;
                    this.write('struct ');
                    this.emitNode(struct.name);
                    this.write(' {');
                    this.newLine();
                    this.increaseIndent();
                    this.emitNodeList(struct.members, '', '\n', true);
                    this.decreaseIndent();
                    this.write('};');
                    this.newLine();
                    break;
                }
            case 134 /* VariableDeclaration */:
            case 137 /* PropertyDeclaration */:
                {
                    const variable = node;
                    if (variable.modifiers && variable.modifiers.length > 0) {
                        this.emitNodeList(variable.modifiers, ' ');
                        this.write(' ');
                    }
                    this.emitNode(variable.type);
                    this.write(' ');
                    this.emitNode(variable.name);
                    if (variable.kind === 134 /* VariableDeclaration */ && variable.initializer) {
                        this.whitespace(' ');
                        this.write('=');
                        this.whitespace(' ');
                        this.emitNode(variable.initializer);
                    }
                    this.write(';');
                    break;
                }
            case 136 /* ParameterDeclaration */:
                {
                    const param = node;
                    if (param.modifiers && param.modifiers.length > 0) {
                        this.emitNodeList(param.modifiers, ' ');
                        this.write(' ');
                    }
                    this.emitNode(param.type);
                    this.write(' ');
                    this.emitNode(param.name);
                    break;
                }
            case 138 /* TypedefDeclaration */:
                {
                    const typedef = node;
                    this.write('typedef ');
                    this.emitNode(typedef.type);
                    this.write(' ');
                    this.emitNode(typedef.name);
                    this.write(';');
                    break;
                }
            case 107 /* Identifier */:
                {
                    const identifier = node;
                    this.write(identifier.name);
                    break;
                }
            case 1 /* NumericLiteral */:
            case 2 /* StringLiteral */:
                {
                    const literal = node;
                    this.write(literal.text);
                    break;
                }
            case 111 /* ArrayType */:
                {
                    const type = node;
                    this.emitNode(type.elementType);
                    this.write('[');
                    this.emitNode(type.size);
                    this.write(']');
                    break;
                }
            case 110 /* MappedType */:
                {
                    const type = node;
                    this.emitNode(type.returnType);
                    this.write('<');
                    this.emitNodeList(type.typeArguments, ',', ' ');
                    this.write('>');
                    break;
                }
            case 118 /* BinaryExpression */:
                {
                    const expr = node;
                    this.emitNode(expr.left);
                    this.whitespace(' ');
                    this.emitNode(expr.operatorToken);
                    this.whitespace(' ');
                    this.emitNode(expr.right);
                    break;
                }
            case 116 /* PrefixUnaryExpression */:
                {
                    const expr = node;
                    this.emitNode(expr.operator);
                    this.emitNode(expr.operand);
                    break;
                }
            case 117 /* PostfixUnaryExpression */:
                {
                    const expr = node;
                    this.emitNode(expr.operand);
                    this.emitNode(expr.operator);
                    break;
                }
            case 120 /* ParenthesizedExpression */:
                {
                    const expr = node;
                    this.write('(');
                    this.emitNode(expr.expression);
                    this.write(')');
                    break;
                }
            case 115 /* CallExpression */:
                {
                    const expr = node;
                    this.emitNode(expr.expression);
                    this.write('(');
                    this.emitNodeList(expr.arguments, ',', ' ');
                    this.write(')');
                    break;
                }
            case 113 /* ElementAccessExpression */:
                {
                    const expr = node;
                    this.emitNode(expr.expression);
                    this.write('[');
                    this.emitNode(expr.argumentExpression);
                    this.write(']');
                    break;
                }
            case 114 /* PropertyAccessExpression */:
                {
                    const expr = node;
                    this.emitNode(expr.expression);
                    this.write('.');
                    this.emitNode(expr.name);
                    break;
                }
            default:
                {
                    if (utils_1.isToken(node)) {
                        this.write(scanner_1.tokenToString(node.kind));
                        break;
                    }
                    throw new Error(`unhandled node '${utils_1.getKindName(node.kind)}'`);
                }
        }
    }
    emitNodeList(nodesList, textSeparator = undefined, whitespaceSeparator = undefined, includeSeparatorAtEnd = false) {
        nodesList.forEach((node, index) => {
            this.emitNode(node);
            if (includeSeparatorAtEnd || nodesList.length !== (index + 1)) {
                if (textSeparator) {
                    this.write(textSeparator);
                }
                if (whitespaceSeparator) {
                    this.whitespace(whitespaceSeparator);
                }
            }
        });
    }
    reset() {
        this.output = [];
        this.indent = 0;
    }
    flush() {
        const text = this.output.join('');
        this.reset();
        return text;
    }
    printNode(node) {
        this.emitNode(node);
        return this.flush();
    }
    printFile(sourceFile) {
        this.newLine();
        return this.flush();
    }
}
exports.Printer = Printer;
//# sourceMappingURL=printer.js.map