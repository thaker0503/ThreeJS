const axios = require('axios');
const parseString = require('xml2js').parseString;
exports.handler = function (context, event, callback) {
    var xmlBodyStr = `<?xml version="1.0" encoding="UTF-8"?>
   <req:KnownTrackingRequest xmlns:req="http://www.sample.com" 
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
            xsi:schemaLocation="http://www.sample.com
            TrackingRequestKnown.xsd">
     <Request>
       <ServiceHeader>
          <MessageTime>2002-06-25T11:28:56-08:00</MessageTime>
          <MessageReference>1234567890123456789012345678</MessageReference>
          <SiteID>ID</SiteID>
          <Password>Pwd</Password>
       </ServiceHeader>
     </Request>
     <LanguageCode>en</LanguageCode>
     <AWBNumber>0123456789</AWBNumber>
     <LevelOfDetails>LAST_CHECK_POINT_ONLY</LevelOfDetails>`;
    var config = {
        headers: { 'Content-Type': 'text/xml' }
    };
    axios.post('https://xml.sample.com/XMLShippingServlet', xmlBodyStr, config).then(res => {
        callback(res.data);
    }).catch(err => callback(err));
};   