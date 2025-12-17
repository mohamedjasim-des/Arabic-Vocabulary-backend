const puppeteer = require("puppeteer");
const Word = require("../models/Word");
const PDFTemplate = require("../utils/PDFTemplate");

exports.generateWordsPDF = async (req, res) => {
  let browser;

  try {
    const words = await Word.find({
      createdBy: req.user.id
    }).sort({ sNo: 1 });

    if (!words.length) {
      return res.status(404).json({
        success: false,
        message: "No words found for this user"
      });
    }

    // 2. Generate HTML
    const finalHTML = PDFTemplate(words);

    // 3. Launch Puppeteer (WINDOWS SAFE)
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();

    // 4. Load HTML
    await page.setContent(finalHTML, {
      waitUntil: "domcontentloaded"
    });

    await page.emulateMediaType("screen");

    // 5. Ensure table is rendered
    await page.waitForSelector("table");

    // Small delay for fonts/layout
    await new Promise(resolve => setTimeout(resolve, 300));

    // 6. Generate PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "10px",
        bottom: "10px",
        left: "10px",
        right: "10px"
      }
    });

    await browser.close();

    // 7. Send PDF
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=arabic-vocabulary.pdf",
      "Content-Length": pdfBuffer.length
    });

    res.send(pdfBuffer);

  } catch (err) {
    console.error("PDF GENERATION ERROR 👉", err);

    if (browser) await browser.close();

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};