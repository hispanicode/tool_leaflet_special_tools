const toImageData = require("to-image-data");

function imageDataToCanvas(imageData) {
  const canvas = document.createElement("CANVAS");
  canvas.height = imageData.height;
  canvas.width = imageData.width;
  const context = canvas.getContext("2d");
  context.putImageData(imageData, 0, 0);
  return canvas;
}

async function toCanvas(data) {
  const imageData = toImageData(data);
  return imageDataToCanvas(imageData);
};

if (typeof module === "object") module.exports = toCanvas;
if (typeof define === "function" && define.amd) define(function () { return toCanvas; });
if (typeof window === "object") window.toCanvas = toCanvas;
if (typeof self === "object") self.toCanvas = toCanvas;
