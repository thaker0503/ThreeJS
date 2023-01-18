import { useState, useEffect } from 'react'


import './App.css'
import axios from 'axios'
import qs from 'querystring'

function App() {
  const [data, setData] = useState([])

  var xmlBodyStr = `<soapenv:Envelopexmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"xmlns:px="https://px.ezidebit.com.au/">
  <soapenv:Header/>
  <soapenv:Body>
      <px:GetPayments>
          <px:DigitalKey>88FDE158-F056-492A-8AAE-43F6AB753FBA</px:DigitalKey>
          <px:PaymentType>ALL</px:PaymentType>
          <px:PaymentMethod>ALL</px:PaymentMethod>
          <px:PaymentSource>ALL</px:PaymentSource>
          <px:PaymentReference/>
          <px:DateFrom>2011-01-01</px:DateFrom>
          <px:DateTo>2011-02-01</px:DateTo>
          <px:DateField>SETTLEMENT</px:DateField>
          <px:EziDebitCustomerID/>
          <px:YourSystemReference>201102%</px:YourSystemReference>
      </px:GetPayments>
  </soapenv:Body>
</soapenv:Envelope>`;
  var config = {
    headers: { 'Content-Type': 'application/xml', 'Accept': 'application/xml' }
  };
  axios.post('https://px.ezidebit.com.au/', xmlBodyStr, config).then(res => {
    console.log("Result", res);
  }).catch(err => console.log("Error", err));


  return (
    <div className="App">
      Hello, World
    </div>
  )
}

export default App
