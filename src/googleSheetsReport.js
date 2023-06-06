// 2. Создать с помощью nodeJS отчет в Google Sheets.
const { GoogleSpreadsheet } = require("google-spreadsheet")
const credential = require("../credential.json")
const config = require('config')

// Authorization: https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
// Регистрация в сервисах Google: https://habr.com/ru/articles/483302/

module.exports = async function createGoogleSheetsReport() {
  const SPREADSHEET_ID = config.get('SPREADSHEET_ID')
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID)

  await doc.useServiceAccountAuth(credential)
  await doc.loadInfo()
  const worksheet = doc.sheetsByIndex[0]; // Here, 1st tab on Google Spreadsheet is used.

  const values = await fetchAPIEntries() // Получение данных из API

  // This is the header row.
  await worksheet.setHeaderRow(['API', 'Description', 'Category', 'Link', 'HTTPS', 'Cors'])
  await worksheet.addRows(values); // Your value is put to the sheet.
  console.log('Отчет успешно создан.');
}

// Функция для получения данных из API
async function fetchAPIEntries() {
  const response = await fetch('https://api.publicapis.org/entries')
  const data = await response.json()
  return data.entries
}