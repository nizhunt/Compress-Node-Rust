// Importing necessary modules from the Node.js standard library
import * as fs from "fs"; // File system module for handling file operations
import * as zlib from "zlib"; // Compression module for handling gzip compression
import yargs from "yargs"; // Argument parsing library for handling command line arguments
import { hideBin } from "yargs/helpers"; // Helper function to hide binary path from arguments

// Defining an interface for command line arguments
interface Arguments {
  _: string[]; // Array to store positional arguments
  $0: string; // String to store the name of the script or command
}

// Asynchronous function to handle gzip compression
async function gzipCompress(
  inputFile: string, // Path of the input file
  outputFile: string // Path of the output file
): Promise<void> {
  // The function returns a Promise that resolves to void
  return new Promise((resolve, reject) => {
    // Creating readable stream from input file
    const readStream = fs.createReadStream(inputFile);
    // Creating writable stream to output file
    const writeStream = fs.createWriteStream(outputFile);
    // Creating gzip transformation stream
    const gzip = zlib.createGzip();

    // Piping data: readStream -> gzip -> writeStream
    readStream
      .pipe(gzip) // Compressing data using gzip
      .pipe(writeStream) // Writing compressed data to output file
      .on("finish", () => {
        // Event listener for when writing is finished
        console.log("Compression completed.");
        resolve(); // Resolving the Promise
      })
      .on("error", (err) => reject(err)); // Event listener for any errors, rejecting the Promise on error
  });
}

// Main asynchronous function to execute the program
async function main() {
  // Parsing command line arguments, demanding exactly two positional arguments
  const argv = yargs(hideBin(process.argv)).demandCommand(2).argv as Arguments;
  // Extracting input and output file paths from command line arguments
  const inputFile = argv._[0] as string;
  const outputFile = argv._[1] as string;

  // Recording the start time for performance measurement
  const start = Date.now();
  // Performing gzip compression
  await gzipCompress(inputFile, outputFile);
  // Calculating the elapsed time
  const elapsed = Date.now() - start;

  // Getting file statistics for input and output files
  const inputStats = fs.statSync(inputFile);
  const outputStats = fs.statSync(outputFile);

  // Logging the size of input file, size of compressed output file, and time taken for compression
  console.log(`Source len: ${inputStats.size}`);
  console.log(`Target len: ${outputStats.size}`);
  console.log(`Elapsed: ${elapsed}ms`);
}

// Executing the main function and catching any errors that might occur
main().catch(console.error);
