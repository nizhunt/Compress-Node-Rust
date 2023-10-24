# File Compression Comparison: Rust vs Node.js (TypeScript)

This repository demonstrates file compression using Gzip in Rust and Node.js (TypeScript). This guide provides instructions on how to build and run each sub-project, and offers a comparison of their performance and usability.

## Rust Compression

### Description

The Rust project utilizes the `flate2` crate for Gzip compression. It accepts two command line arguments: the source file path and the target file path.

### Building and Running

1. Ensure Rust and Cargo are installed on your system. If not, you can install them from [the official Rust website](https://www.rust-lang.org/learn/get-started).

2. Build the project using Cargo:

   ```bash
   cargo build --release
   ```

3. Run the program, replacing `<source_file>` and `<target_file>` with your specific file paths:

   ```bash
   cargo run --release -- <source_file> <target_file>
   ```

4. Check the console output for the source file size, target file size, and the time taken for the compression.

## Node.js Compression with TypeScript

### Description

The Node.js project uses the `zlib` module for Gzip compression and `yargs` for command line argument parsing. It requires two command line arguments: the input file path and the output file path.

### Setting Up and Running

1. Ensure Node.js and npm are installed on your system. If not, you can download and install them from [the official Node.js website](https://nodejs.org/).

2. Install the necessary npm packages:

   ```bash
   npm install
   ```

3. Compile the TypeScript code:

   ```bash
   npx tsc
   ```

   This will generate the compiled JavaScript file in the `src` directory (or another directory specified in your `tsconfig.json`).

4. Run the program, replacing `<input_file>` and `<output_file>` with your specific file paths:

   ```bash
   node src/main.js <input_file> <output_file>
   ```

5. Check the console output for the source file size, target file size, and the time taken for the compression.

## Comparison

| Aspect                   | Rust (compress) | Node.js (TypeScript) |
| ------------------------ | --------------- | -------------------- |
| **Execution Time**       | 484.779416ms    | 52ms                 |
| **Source File Size**     | 2,307,697 bytes | 2,307,697 bytes      |
| **Compressed File Size** | 1,885,921 bytes | 1,889,832 bytes      |
| **Compression Ratio**    | ~81.73%         | ~81.89%              |
| **Build/Run Command**    | `cargo run`     | `node`               |
| **Language**             | Rust            | JavaScript (Node.js) |
