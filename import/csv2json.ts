const csvToJson = require('convert-csv-to-json');
const fileInputName = 'data.csv';
const fileOutputName = 'data.json';

csvToJson
  .fieldDelimiter(',')
  .generateJsonFileFromCsv(fileInputName, fileOutputName);
