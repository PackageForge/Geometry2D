export interface IDomRectangle2D {
  left: number;
  top: number;
  width: number;
  height: number;
}
export function isIDomRectangle2D(o: any): o is IDomRectangle2D {
  return typeof (o) === "object" && typeof ((<IDomRectangle2D>o).left) === "number" && typeof ((<IDomRectangle2D>o).top) === "number" && typeof ((<IDomRectangle2D>o).width) === "number" && typeof ((<IDomRectangle2D>o).height) === "number";
}