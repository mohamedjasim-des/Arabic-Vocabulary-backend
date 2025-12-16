module.exports = function PDFTemplate(words) {

    const tableRows = words.map(word => {
      // verbs (past, present, future)
      if (word.meanings?.length) {
        return `
<tr>
  <td class="sno">${word.sNo}</td>
  <td class="arabic">
    ${word.meanings.map(m => m.arabic).join("<br>")}
  </td>
  <td class="english">
    ${word.meanings.map(m => m.english).join("<br>")}
  </td>
  <td class="tamil">
    ${word.meanings.map(m => m.tamil).join("<br>")}
  </td>
  <td class="note">
    ${word.meanings.map(m => m.tense).join("<br>")}
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
    font-weight: 500;
    text-align: center;
  }

  .sno {
    font-family: 'Poppins', sans-serif;
    text-align: center;
    width: 60px;
  }

  .arabic {
    font-family: 'Scheherazade New', serif;
    font-size: 22px;
    direction: rtl;
    text-align: center;
    line-height: 1.6;
  }

  .english {
    font-family: 'Sawarabi Gothic', sans-serif;
    text-align: center;
    line-height: 1.8;
  }

  .tamil {
    font-family: 'Poppins', sans-serif;
    text-align: center;
    line-height: 1.8;
  }

  .note {
    font-family: 'Poppins', sans-serif;
    text-align: center;
    width: 120px;
  }
</style>
</head>

<body>
  ${tableHTML}
</body>
</html>
`;
};
