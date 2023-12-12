export default function range(ct: number): number[] {
  return new Array(ct).fill(0).map((_, i) => i);
}
