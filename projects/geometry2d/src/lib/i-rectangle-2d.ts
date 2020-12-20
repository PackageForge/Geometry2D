export interface IRectangle2D {
  x: number;
  y: number;
  width: number;
  height: number;
}
export function isIRectangle2D(o: any): o is IRectangle2D {
  return typeof (o) === "object" && typeof ((<IRectangle2D>o).x) === "number" && typeof ((<IRectangle2D>o).y) === "number" && typeof ((<IRectangle2D>o).width) === "number" && typeof ((<IRectangle2D>o).height) === "number";
}