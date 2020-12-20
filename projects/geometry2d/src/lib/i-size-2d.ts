export interface ISize2D {
  width: number;
  height: number;
}
export function isISize2D(o: any): o is ISize2D {
  return typeof (o) === "object" && typeof ((<ISize2D>o).width) === "number" && typeof ((<ISize2D>o).height) === "number";
}