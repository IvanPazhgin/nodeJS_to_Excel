### Задачи:
 
1. Создать с помощью nodeJS отчет в Excel-формате.
   - Данные забирать из публичного API https://api.publicapis.org/entries
   - Должна быть “цветная“ шапка с наименованием свойств объектов: “API”,
   “Description” и т.д.
   - Одна строка отчета - одна запись из ответа API
   - Ссылки должны быть активными(кликабельными)
   - Строки в отчете должны быть отсортированы по первому столбцу
   наименованию (“API”)
   - Исключить из отчета объекты с HTTPS со значением false
   - На выходе должны получить xls-файл с отчетом
2. Создать с помощью nodeJS аналогичный отчет в Google Sheets.
3. Создать аналогичный отчет в Google Sheets с помощью Google Apps Script

При выполнении задач на nodeJS можно использовать любые подходящие библиотеки.