export interface IPolygon2D extends Array<number> {
}
export function isIPolygon2D(o: any): o is IPolygon2D {
  return typeof (o) === "object" && Array.isArray(o.points) && typeof(o._extents)==="object";
}