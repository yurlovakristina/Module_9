import axios from "axios";
import * as fs from "fs";
import * as readline from "readline";

console.log("quotes.ts file started!");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Disables SSL verification

// Function to fetch a quote by category
const fetchQuoteByCategory = async (category: string): Promise<string> => {
    try {
        console.log(`Sending request to API for category ${category}...`);
        const response = await axios.get(`https://api.quotable.io/random?tags=${category}`);
        console.log("Response received:", response.data);
        return `"${response.data.content}" — ${response.data.author}`;
    } catch (error: any) {
        console.error("Error fetching quote:", error.message);
        return "Error! Failed to fetch quote.";
    }
};

// Function to save the quote to a file
const saveQuoteToFile = (quote: string) => {
    fs.writeFileSync('quotes.txt', quote);
    console.log("Quote saved to quotes.txt");
};

// Function to fetch a random quote
const fetchQuoteAsync = async (): Promise<string> => {
    try {
        console.log("Sending request to API...");
        const response = await axios.get("https://api.quotable.io/random");
        console.log("Response received:", response.data);
        return `"${response.data.content}" — ${response.data.author}`;
    } catch (error: any) {
        console.error("Error fetching quote:", error.message);
        return "Error! Failed to fetch quote.";
    }
};

// Function to fetch multiple quotes in a row
const showMultipleQuotes = async (count: number) => {
    for (let i = 0; i < count; i++) {
        console.log(`Quote #${i + 1}:`);
        const quote = await fetchQuoteAsync();
        console.log("Quote of the day:", quote);
    }
};

// Ask the user for the quote category
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter quote category (inspirational, life): ', async (category) => {
    const quote = await fetchQuoteByCategory(category);
    console.log("Quote of the day:", quote);
    saveQuoteToFile(quote);
    rl.close();
});