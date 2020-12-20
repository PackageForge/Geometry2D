export interface IDomPoint2D {
  left: number;
  top: number;
}
export function isIDomPoint2D(o: any): o is IDomPoint2D {
  return typeof (o) === "object" && typeof ((<IDomPoint2D>o).left) === "number" && typeof ((<IDomPoint2D>o).top) === "number";
}
export function isIDomPoint2DArray(o: any): o is IDomPoint2D[] {
  return o && Array.isArray(o) && o.length>0 && isIDomPoint2D(o[0]);
}