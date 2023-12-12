import type { GridLayerOptions, Coords, CRS, DoneCallback, LatLngBounds, Transformation } from "leaflet";
import type { Feature, FeatureCollection, Polygon, MultiPolygon } from "geojson";
export declare type MaskStrategy = "inside" | "outside";
export declare type PixelValuesToColorFn = (values: number[]) => string;
export declare type DebugLevel = 0 | 1 | 2 | 3 | 4 | 5;
export declare type ResampleMethod = "bilinear" | "near";
export declare type SimplePoint = {
    x: number;
    y: number;
};
export declare type Mask = Feature | FeatureCollection | Polygon | MultiPolygon;
interface GeoRasterLayerOptions_CommonOptions extends GridLayerOptions {
    resolution?: number;
    debugLevel?: DebugLevel;
    pixelValuesToColorFn?: PixelValuesToColorFn;
    bounds?: LatLngBounds;
    proj4?: Function;
    resampleMethod?: ResampleMethod;
    mask?: Mask;
    mask_srs?: string | number;
    mask_strategy?: MaskStrategy;
    updateWhenIdle?: boolean;
    updateWhenZooming?: boolean;
    keepBuffer?: number;
}
declare type GeoRasterLayerOptions_GeoRaster = {
    georasters?: GeoRaster[];
    georaster: GeoRaster;
} | {
    georasters: GeoRaster[];
    georaster?: GeoRaster;
};
export declare type GeoRasterLayerOptions = GeoRasterLayerOptions_CommonOptions & GeoRasterLayerOptions_GeoRaster;
export declare type GetRasterOptions = {
    innerTileTopLeftPoint: SimplePoint;
    heightOfSampleInScreenPixels: number;
    widthOfSampleInScreenPixels: number;
    zoom: number;
    numberOfSamplesAcross: number;
    numberOfSamplesDown: number;
    ymax: number;
    xmin: number;
};
export interface DrawTileOptions {
    tile: HTMLCanvasElement;
    coords: Coords;
    context: CanvasRenderingContext2D;
    done: DoneCallback;
}
export declare type Tile = {
    active?: boolean;
    coords: Coords;
    current: boolean;
    el: HTMLCanvasElement;
    loaded?: Date;
    retain?: boolean;
};
export declare type GetValuesOptions = {
    bottom?: number;
    height: number;
    left?: number;
    right?: number;
    top?: number;
    width: number;
    resampleMethod?: string;
};
export declare type GeoRasterValues = number[][][];
export declare type GeoRasterKeys = "height" | "width" | "noDataValue" | "palette" | "pixelHeight" | "pixelWidth" | "projection" | "sourceType" | "xmin" | "xmax" | "ymin" | "ymax";
export interface GeoRaster {
    getValues: (options?: GetValuesOptions) => GeoRasterValues;
    height: number;
    noDataValue: null | undefined | number | typeof NaN;
    numberOfRasters: number;
    palette: string[];
    pixelHeight: number;
    pixelWidth: number;
    projection: number;
    rasterType: "geotiff" | "object";
    sourceType: "url" | "Buffer" | undefined;
    toCanvas: (e: any) => HTMLCanvasElement;
    values: GeoRasterValues | undefined;
    width: number;
    xmax: number;
    xmin: number;
    ymax: number;
    ymin: number;
    _blob_is_available: boolean;
    _data: string;
    _geotiff: Record<string, unknown> | undefined;
    cache: boolean;
    firstIFDOffset: number;
    ghostValues: null;
    ifdRequests: Promise<any>[];
    littleEndian: boolean;
    _url: string;
    _url_is_available: boolean;
    _web_worker_is_available: boolean;
}
export interface CustomCSSStyleDeclaration extends CSSStyleDeclaration {
    WebkitBackfaceVisibility?: string;
}
export interface CustomTransformation extends Transformation {
    _a?: Number;
    _b?: Number;
    _c?: Number;
    _d?: Number;
}
export interface CustomCRS extends CRS {
    transformation?: CustomTransformation;
}
export {};
//# sourceMappingURL=index.d.ts.map