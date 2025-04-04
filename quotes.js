"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var fs = require("fs");
var readline = require("readline");
console.log("quotes.ts file started!");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Disables SSL verification
// Function to fetch a quote by category
var fetchQuoteByCategory = function (category) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("Sending request to API for category ".concat(category, "..."));
                return [4 /*yield*/, axios_1.default.get("https://api.quotable.io/random?tags=".concat(category))];
            case 1:
                response = _a.sent();
                console.log("Response received:", response.data);
                return [2 /*return*/, "\"".concat(response.data.content, "\" \u2014 ").concat(response.data.author)];
            case 2:
                error_1 = _a.sent();
                console.error("Error fetching quote:", error_1.message);
                return [2 /*return*/, "Error! Failed to fetch quote."];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Function to save the quote to a file
var saveQuoteToFile = function (quote) {
    fs.writeFileSync('quotes.txt', quote);
    console.log("Quote saved to quotes.txt");
};
// Function to fetch a random quote
var fetchQuoteAsync = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("Sending request to API...");
                return [4 /*yield*/, axios_1.default.get("https://api.quotable.io/random")];
            case 1:
                response = _a.sent();
                console.log("Response received:", response.data);
                return [2 /*return*/, "\"".concat(response.data.content, "\" \u2014 ").concat(response.data.author)];
            case 2:
                error_2 = _a.sent();
                console.error("Error fetching quote:", error_2.message);
                return [2 /*return*/, "Error! Failed to fetch quote."];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Function to fetch multiple quotes in a row
var showMultipleQuotes = function (count) { return __awaiter(void 0, void 0, void 0, function () {
    var i, quote;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < count)) return [3 /*break*/, 4];
                console.log("Quote #".concat(i + 1, ":"));
                return [4 /*yield*/, fetchQuoteAsync()];
            case 2:
                quote = _a.sent();
                console.log("Quote of the day:", quote);
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}); };
// Ask the user for the quote category
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('Enter quote category (inspirational, life): ', function (category) { return __awaiter(void 0, void 0, void 0, function () {
    var quote;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetchQuoteByCategory(category)];
            case 1:
                quote = _a.sent();
                console.log("Quote of the day:", quote);
                saveQuoteToFile(quote);
                rl.close();
                return [2 /*return*/];
        }
    });
}); });
