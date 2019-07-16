var Airtable = require('airtable');
var fs = require('fs');
require('dotenv').config();

var base = new Airtable({apiKey: process.env.APIKEY}).base(process.env.BASE);


base('🍩 Oral Histories').select({
    // Selecting the first 3 records in Worksheet:
    maxRecords: 3,
    view: "Main View"
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
        const stringifedJSON = JSON.stringify(record);
        fs.writeFileSync(`test/${record.get('IDv2')}.json`, stringifedJSON);
        console.log('wrote', record.get('IDv2'));
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});