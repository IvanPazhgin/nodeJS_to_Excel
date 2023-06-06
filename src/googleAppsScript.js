// 3. Создать аналогичный отчет в Google Sheets с помощью Google Apps Script

// Откройте Google Sheets.
// В меню выберите "Инструменты" -> "Редактор скриптов".
// В открывшемся редакторе скриптов вставьте следующий код:
function createGoogleSheetsReport() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Очистка листа перед созданием отчета
  sheet.clearContents();

  // Получение данных из API
  const response = UrlFetchApp.fetch('https://api.publicapis.org/entries');
  const data = JSON.parse(response.getContentText());
  const entries = data.entries;

  // Фильтрация и сортировка записей
  const filteredEntries = entries.filter(entry => entry.HTTPS !== 'false');
  filteredEntries.sort((a, b) => a.API.localeCompare(b.API));

  // Заголовки столбцов
  const headerValues = ['API', 'Description', 'Category', 'Link', 'HTTPS', 'Cors'];
  sheet.getRange('A1:F1').setValues([headerValues]);

  // Заполнение строк отчета
  const dataValues = filteredEntries.map(entry => [entry.API, entry.Description, entry.Category, entry.Link, entry.HTTPS, entry.Cors]);
  sheet.getRange(2, 1, dataValues.length, 6).setValues(dataValues);

  // Автонастройка ширины столбцов
  sheet.autoResizeColumns(1, 6);

  // Создание гиперссылок в столбце "Link"
  const linkColumn = sheet.getRange(2, 4, dataValues.length, 1);
  linkColumn.setNumberFormat('@STRING@');
  linkColumn.activate();
  const linkFormula = '=HYPERLINK(RC[-1])';
  linkColumn.setFormula(linkFormula);

  Logger.log('Отчет успешно создан.');
}

// Сохраните скрипт.
// Закройте редактор скриптов и вернитесь в таблицу Google Sheets.
// В меню выберите "Добавить" -> "Макрос" -> "createGoogleSheetsReport".
// Щелкните на кнопку "Выполнить".

// После выполнения макроса в таблице Google Sheets будет создан отчет, соответствующий требованиям.
// Строки отчета будут отсортированы по наименованию API, и ссылки в столбце "Link" будут активными (кликабельными).

// Пожалуйста, обратите внимание, что для выполнения этого скрипта вам может потребоваться разрешение доступа к таблице и вызову API.
