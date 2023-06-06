// 1. Создать с помощью nodeJS отчет в Excel-формате.
const createExcelReport = require('./src/excelReport')
createExcelReport()

// 2. Создать с помощью nodeJS аналогичный отчет в Google Sheets.
const createGoogleSheetsReport = require('./src/googleSheetsReport')
createGoogleSheetsReport()

// 3. Создать аналогичный отчет в Google Sheets с помощью Google Apps Script
// см. файл googleAppsScript.js