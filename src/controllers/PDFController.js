const puppeteer = require("puppeteer");
const Word = require("../models/Word");
const PDFTemplate = require("../utils/PDFTemplate");

exports.generateWordsPDF = async (req, res) => {
  let browser;

  try {
    const words = await Word.find({ createdBy: req.user.id }).sort({ sNo: 1 });

    if (!words.length) {
      return res.status(404).json({
        success: false,
        message: "No words found for this user"
      });
    }

    const finalHTML = PDFTemplate(words);

    const browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || puppeteer.executablePath(),
    });

    const page = await browser.newPage();

    await page.setContent(finalHTML, { waitUntil: "networkidle0" });
    await page.emulateMediaType("screen");
    await page.waitForSelector("table");

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "10px", bottom: "10px", left: "10px", right: "10px" }
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=arabic-vocabulary.pdf",
      "Content-Length": pdfBuffer.length
    });

    res.send(pdfBuffer);

  } catch (err) {
    if (browser) await browser.close();
    console.error("PDF ERROR 👉", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
