const puppeteer = require("puppeteer");
const Word = require("../models/Word");
const PDFTemplate = require("../utils/PDFTemplate");

exports.generateWordsPDF = async (req, res) => {
  let browser;

  try {
    // 1. Fetch words of logged-in user, sorted by sNo
    const words = await Word.find({
      createdBy: req.user.id
    }).sort({ sNo: 1 });

    if (!words.length) {
      return res.status(404).json({
        success: false,
        message: "No words found for this user"
      });
    }

    // 4. Wrap with template
    const finalHTML = PDFTemplate(words);

    // 5. Puppeteer
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();
    await page.setContent(finalHTML, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        bottom: "20px",
        left: "20px",
        right: "20px"
      }
    });

    await browser.close();

    // 6. Send PDF
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=arabic-vocabulary.pdf",
      "Content-Length": pdfBuffer.length
    });

    res.send(pdfBuffer);

  } catch (err) {
    if (browser) await browser.close();

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};
