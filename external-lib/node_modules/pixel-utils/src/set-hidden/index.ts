// make a given rgba value transparent
export default function setHidden<R, G, B, A>(pixel: [R, G, B, A]): [R, G, B, 0] {
  // @ts-ignore
  pixel[3] = 0;
  // @ts-ignore
  return pixel;
}
