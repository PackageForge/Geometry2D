import { ISize2D, isISize2D } from './i-size-2d';

export class Size2D implements ISize2D {
  width!: number;
  height!: number;
  constructor(width: number, height: number)
  constructor(size: ISize2D)
  constructor()
  constructor(width?: number | ISize2D, height?: number) {
    if (typeof (width) === "number" && typeof (height) === "number")
      this.set(width, height);
    else if (isISize2D(width))
      this.set(width.width, width.height);
    else
      this.set(0, 0);
  }
  clone(): Size2D {
    return new Size2D(this);
  }
  set(point: ISize2D): this
  set(width: number, height: number): this
  set(width: number | ISize2D, height?: number): this {
    if (typeof (width) === "number" && typeof (height) === "number") {
      this.width = width;
      this.height = height;
      return this;
    }
    if (isISize2D(width))
      return this.set(width.width, width.height);
    throw "invalid arguments";
  }
}