const csvToJson = require('convert-csv-to-json');
const fileInputName = 'members.csv';
const fileOutputName = 'members.json';

csvToJson
  .fieldDelimiter(',')
  .generateJsonFileFromCsv(fileInputName, fileOutputName);
