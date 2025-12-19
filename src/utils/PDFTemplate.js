module.exports = function PDFTemplate(words) {

  const tableRows = words.map(word => {
    // verbs (past, present, future)
    if (word.meanings?.length) {
      return `
<tr>
  <td class="sno">${word.sNo}</td>
  <td class="arabic">
    <div class="line-wrapper">
      ${word.meanings.map(m => `<div>${m.arabic}</div>`).join("")}
    </div>
  </td>
  <td class="english">
    <div class="line-wrapper">
      ${word.meanings.map(m => `<div>${m.english}</div>`).join("")}
    </div>
  </td>
  <td class="tamil">
    <div class="line-wrapper">
      ${word.meanings.map(m => `<div>${m.tamil}</div>`).join("")}
    </div>
  </td>
  <td class="note">
    <div class="line-wrapper">
      ${word.meanings.map(m => `<div>${m.tense}</div>`).join("")}
    </div>
  </td>
</tr>`;
    }

    // nouns / single word
    return `
<tr>
  <td class="sno">${word.sNo}</td>
  <td class="arabic">${word.rootWord}</td>
  <td class="english">${word.rootWord}</td>
  <td class="tamil">${word.rootWord}</td>
  <td class="note">${word.note}</td>
</tr>`;
  }).join("");

  // 3. Full table HTML
  const tableHTML = `
<table>
  <tr>
    <th class="sno">s.no</th>
    <th>Arabic Word</th>
    <th>English</th>
    <th>தமிழ்</th>
    <th>Note</th>
  </tr>
  ${tableRows}
</table>
`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Arabic Vocabulary</title>

<link href="https://fonts.googleapis.com/css2?family=Scheherazade+New:wght@400;700&family=Sawarabi+Gothic&family=Poppins:wght@400;500&display=swap" rel="stylesheet">

<style>
  body { margin: 20px; }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  th, td {
    border: 1px solid #000;
    padding: 6px 10px;
    vertical-align: middle;
  }

  th {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 400;
    text-align: center;
  }

  .sno {
    font-family: 'Poppins', sans-serif;
    text-align: center;
    font-size: 13px;
    font-weight: 500;
    width: 60px;
  }

  .arabic {
    font-family: 'Scheherazade New', serif;
    font-size: 16px;
    font-weight: 500;
    direction: rtl;
    text-align: center;
    line-height: 1.6;
  }

  .english {
    font-family: 'Sawarabi Gothic', sans-serif;
    text-align: center;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.8;
  }

  .tamil {
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    font-weight: 300;
    text-align: center;
    line-height: 1.2;
  }

  .note {
    font-family: 'Poppins', sans-serif;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    width: 120px;
  }

  /* New flex wrapper for even spacing of meanings */
  .line-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 72px; /* adjust based on number of lines */
  }

  .line-wrapper div {
    text-align: center;
  }

</style>
</head>

<body>
  ${tableHTML}
</body>
</html>
`;
};
