var Airtable = require('airtable');
var fs = require('fs');
require('dotenv').config();

var dir = './dump';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

var base = new Airtable({apiKey: process.env.APIKEY}).base(process.env.BASE);

base('Oral Histories').select({
    // Selecting the first 3 records in Worksheet:
    // maxRecords: 3,
    view: ".LOCMetadataView",
    cellFormat: "string",
    timeZone: "America/New_York",
    userLocale: "en-ca",
    fields: [
      "Identifier",
      "Languages: ISO Code (639-3)",
      "Languages: Speaker preferred names",
      "Contributor: Speakers",
      ".self?",
      "Contributor: Videographer",
      "Coverage: Video Nation",
      "Coverage: Video Territory",
      "Description",
      "video_license",
      "Youtube Publish Date",
      "Wikimedia Eligibility",
      "wikimedia_commons_link"
    ]
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
        const content = [`Metadata for ${record.get('Identifier')}

Oral History ID:  ${record.get('Identifier')}
Languages by ISO 639-3 Code: ${record.get('Languages: ISO Code (639-3)')}
Language Names: ${record.get('Languages: Speaker preferred names')}
Speakers: ${record.get('Contributor: Speakers')}

Video Description: ${record.get('Description')}

Original Submitter: ${record.get('Contributor: Videographer')}
video_license: ${record.get('video_license')}
Coverage: Video Nation: ${record.get('Coverage: Video Nation')}
Coverage: Video Territory: ${record.get('Coverage: Video Territory')}

Published to Youtube on: ${record.get('Youtube Publish Date')}
Wikimedia Eligibility: ${record.get('Wikimedia Eligibility')}
wikimedia_commons_link: ${record.get('wikimedia_commons_link')}`]

        fs.writeFileSync(`dump/${record.get('Identifier')}__metadata.txt`, content);
        console.log('wrote', record.get('Identifier'));
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});