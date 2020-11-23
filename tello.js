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

const time = ms => new Promise(resolve => setTimeout(() => resolve(), ms));

time(1000)
.then(() => {
  sendCommand("command");
  sendCommand("takeoff");
  return time(5000);
}).then(() => {
  sendCommand("cw 180");
  return time(5000);
}).then(() => {
  sendCommand("up 50");
  return time(5000);
}).then(() => {
  sendCommand("forward 50");
  return time(5000);
}).then(() => {
  sendCommand("flip r");
  return time(5000);
}).then(() => {
  sendCommand("land");
});
