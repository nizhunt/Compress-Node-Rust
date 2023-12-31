"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const zlib = __importStar(require("zlib"));
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
function gzipCompress(inputFile, outputFile) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const readStream = fs.createReadStream(inputFile);
            const writeStream = fs.createWriteStream(outputFile);
            const gzip = zlib.createGzip();
            readStream
                .pipe(gzip)
                .pipe(writeStream)
                .on("finish", () => {
                console.log("Compression completed.");
                resolve();
            })
                .on("error", (err) => reject(err));
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const argv = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv)).demandCommand(2).argv;
        const inputFile = argv._[0];
        const outputFile = argv._[1];
        const start = Date.now();
        yield gzipCompress(inputFile, outputFile);
        const elapsed = Date.now() - start;
        const inputStats = fs.statSync(inputFile);
        const outputStats = fs.statSync(outputFile);
        console.log(`Source len: ${inputStats.size}`);
        console.log(`Target len: ${outputStats.size}`);
        console.log(`Elapsed: ${elapsed}ms`);
    });
}
main().catch(console.error);
