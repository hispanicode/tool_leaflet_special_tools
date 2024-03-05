export default function guessImageLayout<
  B extends number | undefined,
  H extends number | undefined,
  L extends string | undefined,
  W extends number | undefined
>({
  bands,
  data,
  height,
  layout,
  width
}: {
  bands?: B;
  data?: number[] | number[][] | number[][][];
  height?: H;
  layout?: L;
  width?: W;
}): {
  bands: B extends number ? B : number | undefined;
  height: H extends number ? H : number | undefined;
  layout: L extends string ? L : string | undefined;
  width: W extends number ? W : number | undefined;
}
