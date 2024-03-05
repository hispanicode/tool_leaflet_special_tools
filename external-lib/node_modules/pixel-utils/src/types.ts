import type { MultidimensionalArray } from "type-fest";

// prettier-ignore
export type UINT8 = | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100 | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110 | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119 | 120 | 121 | 122 | 123 | 124 | 125 | 126 | 127 | 128 | 129 | 130 | 131 | 132 | 133 | 134 | 135 | 136 | 137 | 138 | 139 | 140 | 141 | 142 | 143 | 144 | 145 | 146 | 147 | 148 | 149 | 150 | 151 | 152 | 153 | 154 | 155 | 156 | 157 | 158 | 159 | 160 | 161 | 162 | 163 | 164 | 165 | 166 | 167 | 168 | 169 | 170 | 171 | 172 | 173 | 174 | 175 | 176 | 177 | 178 | 179 | 180 | 181 | 182 | 183 | 184 | 185 | 186 | 187 | 188 | 189 | 190 | 191 | 192 | 193 | 194 | 195 | 196 | 197 | 198 | 199 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 209 | 210 | 211 | 212 | 213 | 214 | 215 | 216 | 217 | 218 | 219 | 220 | 221 | 222 | 223 | 224 | 225 | 226 | 227 | 228 | 229 | 230 | 231 | 232 | 233 | 234 | 235 | 236 | 237 | 238 | 239 | 240 | 241 | 242 | 243 | 244 | 245 | 246 | 247 | 248 | 249 | 250 | 251 | 252 | 253 | 254 | 255;
export type Range = [number, number];
export type RawValue = number;
export type RawPixel = number[];
export type Red = UINT8;
export type Green = UINT8;
export type Blue = UINT8;
export type AlphaHidden = 0;
export type AlphaVisible = 255;
export type CleanAlpha = AlphaHidden | AlphaVisible;
export type RandomAlpha = UINT8;
export type RGB = [Red, Green, Blue];
export type NullableRGB = NoDataPixel | RGB;
export type RawRGBA = [Red, Green, Blue, RandomAlpha];
export type CleanRGBA = [Red, Green, Blue, CleanAlpha];
export type AnyRGBA = RawRGBA | CleanRGBA;
export type HiddenRGBA = [Red, Green, Blue, AlphaHidden | AlphaVisible];
export type VisibleRGBA = [Red, Green, Blue, AlphaVisible];
export type Pixel = RGB | AnyRGBA;
export type RawNoDataValue = number;
export type NoDataValue = null | 0 | 255;
export type NoDataPixel = [0, 0, 0] | [255, 255, 255] | [null, null, null];
// export type NoDataPixelRGBA = [0, 0, 0, 0] | [255, 255, 255, 0];
export type NO_DATA_STRATEGY = "all" | "partial";
export type ScaleFunction = (n: RawValue) => UINT8;

// alpha values
export type HIDDEN_ALPHA = 0;
export type VISIBLE_ALPHA = 255;

export type NO_DATA_VALUE = null | 0 | 255;
export type NO_DATA_RGB = [null, null, null] | [0, 0, 0] | [255, 255, 255];
export type NULLABLE_RGB = NULL_RGB | RGB;
export type NO_DATA_RGBA = [null, null, null, 0] | [0, 0, 0, 0] | [255, 255, 255, 0];

export type VALID_RGB = [UINT8, UINT8, UINT8];
export type NULL_RGB = [null, null, null];

export type VALID_RGBA = [UINT8, UINT8, UINT8, UINT8];
export type HIDDEN_RGBA = [UINT8, UINT8, UINT8, 0];
export type RAW_PIXEL = number[];
// export type PIXEL = RAW_PIXEL | VALID_RGB | NULL_RGB |

export type VISIBLE_RGBA = [Red, Green, Blue, VISIBLE_ALPHA];
export type DIRTY_RGB = [null | UINT8, null | UINT8, null | UINT8];

export type LAYOUT = "[band,row,column]" | "[band][row,column]" | "[band][row][column]" | "[band,row][column]" | "[row,column,band]" | "[row,column][band]" | "[row][column,band]" | "[row][column][band]";

// width modification from https://dev.to/tylim88/typescript-count-substring-of-a-string-literal-type-536b
// prettier-ignore
type Count<
  str extends string,
  substr extends string,
  C extends unknown[] = []
> = str extends `${string}${substr}${infer Tail}`
  ? Count<Tail, substr, [1, ...C]>
  : C['length'];

type NDIMS<layout extends string> = Count<layout, "[">;

export type ndarray<layout extends string> = MultidimensionalArray<number, NDIMS<layout>>;