const express = require("express");
const puppeteer = require("puppeteer");

const app = express();

async function simulateVisits() {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://cheerful-kangaroo-de6763.netlify.app/", {
      waitUntil: "networkidle0",
    });
    await new Promise((resolve) => setTimeout(resolve, 5000));
    await browser.close();
  } catch (error) {
    console.error("Error:", error);
  }
}

app.get("/simulation", async (req, res) => {
  try {
    await simulateVisits();
    console.log("Simulation HIT");
    res.send("Simulation started");
  } catch (error) {
    res.status(500).send("Error: " + error);
  }
});

app.get("/", async (req, res) => {
  res.status(200).send("Api Working");
});

app.listen(3000, async () => {
  console.log("Server started on port 3000");
});
