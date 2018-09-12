const SerialPort = require('serialport');
const axios = require('axios');

var UPC = require('upc-database');
var upc = new UPC('098f6bcd4621d373cade4e832627b4f6');

console.log(upc);

let myPort;

SerialPort.list((e, ports) => {
  myPort = new SerialPort(ports[0].comName, 9600);

  myPort.on('open', showPortOpen);
  myPort.on('data', readSerialData);

  function showPortOpen() {
    console.log('port open. Data rate: ' + myPort.baudRate);
  }

  function readSerialData(data) {
      console.log(data.toString('utf8'));
    axios
      .get(
        `https://api.upcdatabase.org/product/${data.toString(
          'utf8'
        )}/098f6bcd4621d373cade4e832627b4f6`
      )
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
});
