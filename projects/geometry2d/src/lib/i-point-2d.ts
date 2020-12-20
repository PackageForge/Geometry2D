export interface IPoint2D {
  x: number;
  y: number;
}
export function isIPoint2D(o: any): o is IPoint2D {
  return typeof (o) === "object" && typeof ((<IPoint2D>o).x) === "number" && typeof ((<IPoint2D>o).y) === "number";
}
export function isIPoint2DArray(o: any): o is IPoint2D[] {
  return o && Array.isArray(o) && o.length>0 && isIPoint2D(o[0]);
}