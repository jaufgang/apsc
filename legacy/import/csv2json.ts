const csvToJson = require("convert-csv-to-json")
const fileInputName = "jobs.csv"
const fileOutputName = "jobs.json"

csvToJson
	.fieldDelimiter(",")
	.generateJsonFileFromCsv(fileInputName, fileOutputName)
