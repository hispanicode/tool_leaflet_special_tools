import addAlpha from "./add-alpha";
import hasNoData from "./has-no-data";
import hideRgba from "./hide-rgba";
import isHidden from "./is-hidden";
import isNoData from "./is-no-data";
import makeNoDataRgb from "./make-no-data-rgb";
import makeNoDataRgba from "./make-no-data-rgba";
import fit from "./fit";
import popAlpha from "./pop-alpha";
import range from "./range";
import rawToRgb from "./raw-to-rgb";
import rawToRgba from "./raw-to-rgba";
import rgbToRgba from "./rgb-to-rgba";
import rgbaToRgb from "./rgba-to-rgb";
import setHidden from "./set-hidden";
import setVisible from "./set-visible";
import showRgba from "./show-rgba";
import sliceAlpha from "./slice-alpha";

const pixelUtils = {
  addAlpha,
  fit,
  hasNoData,
  hideRgba,
  isHidden,
  isNoData,
  makeNoDataRgb,
  makeNoDataRgba,
  popAlpha,
  range,
  rawToRgb,
  rawToRgba,
  rgbToRgba,
  rgbaToRgb,
  setHidden,
  setVisible,
  showRgba,
  sliceAlpha
};

declare var define;
if (typeof define === "function" && define.amd) define(() => pixelUtils);

declare var module;
if (typeof module === "object") module.exports = pixelUtils;

declare var window;
if (typeof window === "object") window.pixelUtils = pixelUtils;

declare var self;
if (typeof self === "object") self.pixelUtils = pixelUtils;
