// prettier-ignore
export default function rgbToStr<
  R extends number | null,
  G extends number | null,
  B extends number | null
> ([r, g, b]: [R, G, B]) : `rgb(${R}, ${G}, ${B})` {
  return "rgb(" + r + ", " + g + ", " + b + ")" as any;
}