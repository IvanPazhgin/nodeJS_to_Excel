// 1. Создать с помощью nodeJS отчет в Excel-формате.
const ExcelJS = require('exceljs')

// Функция для получения данных из API
async function fetchAPIEntries() {
  const response = await fetch('https://api.publicapis.org/entries');
  const data = await response.json();
  return data.entries;
}

// Функция для создания отчета в Excel
module.exports = async function createExcelReport() {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('API Entries');

  // Заголовки столбцов
  worksheet.columns = [
    { header: 'API', key: 'api', width: 40 },
    { header: 'Description', key: 'description', width: 60 },
    { header: 'Category', key: 'category', width: 20 },
    { header: 'Link', key: 'link', width: 40 },
    { header: 'HTTPS', key: 'https', width: 10 },
    { header: 'Cors', key: 'cors', width: 15 }
  ];

  // Получение данных из API
  const entries = await fetchAPIEntries();

  // Фильтрация и сортировка записей
  const filteredEntries = entries.filter(entry => entry.HTTPS !== 'false');
  filteredEntries.sort((a, b) => a.API.localeCompare(b.API));

  // Заполнение строк отчета (не кликабельные)
  // filteredEntries.forEach((entry, index) => {
  //   worksheet.addRow({
  //     api: entry.API,
  //     description: entry.Description,
  //     category: entry.Category,
  //     link: entry.Link,
  //     https: entry.HTTPS,
  //     cors: entry.Cors
  //   });
  // });

  // кликабельные
  filteredEntries.forEach((entry, index) => {
    const linkCell = worksheet.getCell(`D${index + 2}`);
    linkCell.value = { text: entry.Link, hyperlink: entry.Link };
    linkCell.font = { color: { argb: '0000FF' }, underline: 'single' };
    linkCell.alignment = { vertical: 'middle', horizontal: 'left' };

    worksheet.addRow({
      api: entry.API,
      description: entry.Description,
      category: entry.Category,
      link: entry.Link,
      https: entry.HTTPS,
      cors: entry.Cors
    });
  });

  // Сохранение отчета в файл
  await workbook.xlsx.writeFile('api_report.xlsx');
  console.log('Отчет успешно создан.');
}
