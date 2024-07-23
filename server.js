const express = require("express");
const puppeteer = require("puppeteer");

const app = express();

let browser;

async function initializeBrowser() {
  browser = await puppeteer.launch({ headless: true });
}
async function simulateVisits() {
  try {
    const page = await browser.newPage();
    await page.goto("https://google.com/", { waitUntil: "networkidle0" });
  } catch (error) {
    console.error("Error:", error);
  }
}

app.get("/simulation", async (req, res) => {
  try {
    await simulateVisits();
    res.send("Simulation started");
  } catch (error) {
    res.status(500).send("Error: " + error);
  }
});

app.get("/", async (req, res) => {
  res.status(200).send("Api Working");
});

app.listen(3000, async () => {
  await initializeBrowser();
  console.log("Server started on port 3000");
});
