fetch('https://zh.wikipedia.org/zh-tw/%E8%87%BA%E7%81%A3%E6%96%B9%E9%9F%B3%E7%AC%A6%E8%99%9F')
  .then(response => response.text())
  .then(html => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const tables = doc.querySelectorAll('table');
    const matchingTables = [];

    tables.forEach(table => {
      const firstRowFirstColumn = table.querySelector('tr:first-child th:first-child');
      if (firstRowFirstColumn) {
        const innerText = firstRowFirstColumn.innerText;
        if (innerText.includes('注音')) {
          matchingTables.push(table);
        }
      }
    });

    matchingTables.forEach(table => {
      const rows = table.querySelectorAll('tr');
      rows.forEach(row => {
        const firstColumn = row.querySelector('td:first-child');
        if (firstColumn) {
          console.log(firstColumn.innerText);
        }
      });
    });
  });
