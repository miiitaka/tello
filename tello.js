"use strict"

const PORT = 8889;
const HOST = "192.168.10.1";

const dgram = require("dgram");
const client = dgram.createSocket("udp4");

const sendCommand = (command) => {
  const message = Buffer.from(command);
  client.send(message, 0, message.length, PORT, HOST, (error, bytes) => {
    if (error) throw error;
  });
}

sendCommand("command");

// 離陸
sendCommand("takeoff");

// ５秒後に時計回りで180度
setTimeout(() => {
  sendCommand("cw 180");
}, 5000);

// 10秒後に着陸
setTimeout(() => {
  sendCommand("land");
}, 10000);
