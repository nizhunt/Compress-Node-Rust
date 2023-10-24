extern crate flate2; // Importing the flate2 crate for compression/decompression functionality

use flate2::write::GzEncoder; // Importing GzEncoder struct for gzip encoding
use flate2::Compression; // Importing Compression enum to specify compression level
use std::env::args; // Importing args function to get command line arguments
use std::fs::File; // Importing File struct for file handling
use std::io::copy; // Importing copy function to copy data from a reader to a writer
use std::io::BufReader; // Importing BufReader for buffered reading
use std::time::Instant; // Importing Instant for measuring time

fn main() {
    if args().len() != 3 {
        // Checking if exactly 3 arguments are provided (including program name)
        eprintln!("Usage: `source` `target`"); // Printing error message to stderr if not
        return; // Exiting function early if incorrect number of arguments
    }
    let mut input = BufReader::new(File::open(args().nth(1).unwrap()).unwrap()); // Opening source file with buffering
    let output = File::create(args().nth(2).unwrap()).unwrap(); // Creating/overwriting target file
    let mut encoder = GzEncoder::new(output, Compression::default()); // Creating new GzEncoder with default compression level
    let start = Instant::now(); // Recording current time for measuring duration
    copy(&mut input, &mut encoder).unwrap(); // Copying data from source file to encoder, performing compression
    let output = encoder.finish().unwrap(); // Finalizing compression and getting the target file

    println!(
        "Source len: {:?}", // Printing source file size
        input.get_ref().metadata().unwrap().len()
    );
    println!("Target len: {:?}", output.metadata().unwrap().len()); // Printing target file size
    println!("Elapsed: {:?}", start.elapsed()); // Printing time taken for the operation
}
// Use cargo run <source> <target> to run the program
