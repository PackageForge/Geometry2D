import { IPoint2D, isIPoint2D, isIPoint2DArray } from './i-point-2d';
import { IDomPoint2D, isIDomPoint2D, isIDomPoint2DArray } from './i-dom-point-2d';
import { Rectangle2D } from './rectangle-2d';

function isNumberArray(value: any): value is number[] {
  return Array.isArray(value) && value.length > 0 && typeof (value[0]) === "number";

}
export class Polygon2D implements Polygon2D {
  private points: number[];
  private _extents: Rectangle2D | undefined;
  constructor(points: number[])
  constructor(points: IPoint2D[])
  constructor(points: IDomPoint2D[])
  constructor(...points: number[])
  constructor(...points: IPoint2D[])
  constructor(...points: IDomPoint2D[])
  constructor(...points: any[]) {
    if (points.length === 1 && Array.isArray(points[0]))
      points = points[0];
    this.points = [];
    this._extents = undefined;
    if (isIPoint2DArray(points)) {
      this._extents = new Rectangle2D(points[0].x, points[0].y, 0, 0);
      points.forEach((point, index) => {
        if (index < 1 || point.x !== points[index - 1].x || point.y !== points[index - 1].y) {
          this._extents!.contain(point);
          this.points.push(point.x, point.y);
        }
      });
    } else if (isIDomPoint2DArray(points)) {
      this._extents = new Rectangle2D(points[0].left, points[0].top, 0, 0);
      points.forEach((point, index) => {
        if (index < 1 || point.left !== points[index - 1].left || point.top !== points[index - 1].top) {
          this._extents!.contain(point);
          this.points.push(point.left, point.top);
        }
      });
    } else if (isNumberArray(points)) {
      this._extents = new Rectangle2D(points[0], points[1], 0, 0);
      for (let i: number = 1; i < points.length; i += 2)
        if (i < 3 || points[i - 1] !== points[i - 3] || points[i] !== points[i - 2]) {
          this._extents.contain(points[i - 1], points[i]);
          this.points.push(points[i - 1], points[i]);
        }
    }
    while (this.points.length > 2 && this.points[0] === this.points[this.points.length - 2] && this.points[1] === this.points[this.points.length - 1])
      this.points.length -= 2;
  }
  clone(): Polygon2D {
    return new Polygon2D(this.points);
  }
  extents(): Rectangle2D | undefined {
    return this._extents ? this._extents.clone() : undefined;
  }
  contains(point: IPoint2D | IDomPoint2D): boolean
  contains(x: number, y: number): boolean
  contains(x: number | IPoint2D | IDomPoint2D, y?: number): boolean {
    if (typeof (x) === "number" && typeof (y) === "number")
      return this._extents !== undefined && this._extents.contains(x, y);
    if (isIPoint2D(x))
      return this.contains(x.x, x.y);
    if (isIDomPoint2D(x))
      return this.contains(x.left, x.top);
    throw "invalid arguments";
  }
  translate(point: IPoint2D | IDomPoint2D): this
  translate(x: number, y: number): this
  translate(x: number | IPoint2D | IDomPoint2D, y?: number): this {
    if (typeof (x) === "number" && typeof (y) === "number") {
      for (let i = 1; i < this.points.length; i += 2) {
        this.points[i - 1] += x;
        this.points[i] += y;
      }
      if (this._extents)
        this._extents.translate(x, y);
      return this;
    }
    if (isIPoint2D(x))
      return this.translate(x.x, x.y);
    if (isIDomPoint2D(x))
      return this.translate(x.left, x.top);
    throw "invalid arguments";
  }
  forEachPoint(callback: (x: number, y: number, index: number, close: boolean) => void) {
    for (let i = 1; i < this.points.length; i += 2)
      callback(this.points[i - 1], this.points[i], (i - 1) / 2, false);
    if (this.points.length > 1)
      callback(this.points[0], this.points[0], this.points.length / 2, true);
  }
  toPoints(): string {
    let points = "";
    this.forEachPoint((x, y, i, c) => {
      if (c)
        return;
      if (i > 0)
        points += " ";
      points += x + "," + y;
    });
    return points;
  }
  toJSON() {
    return this.points;
  }
}
