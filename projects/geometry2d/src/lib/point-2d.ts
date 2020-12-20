import { IPoint2D, isIPoint2D } from './i-point-2d';
import { IDomPoint2D, isIDomPoint2D } from './i-dom-point-2d';
import { IRectangle2D, isIRectangle2D } from './i-rectangle-2d';
import { IDomRectangle2D, isIDomRectangle2D } from './i-dom-rectangle-2d';
import { ISize2D, isISize2D } from './i-size-2d';

export class Point2D implements IPoint2D {
  x!: number;
  y!: number;
  constructor(x: number, y: number)
  constructor(point: IPoint2D | IDomPoint2D)
  constructor()
  constructor(x?: number | IPoint2D | IDomPoint2D, y?: number) {
    if (arguments.length === 0)
      this.set(0, 0);
    else
      this.set.apply(this, <any>arguments);
  }
  clone(): Point2D {
    return new Point2D(this);
  }
  set(point: IPoint2D | IDomPoint2D): this
  set(x: number, y: number): this
  set(x: number | IPoint2D | IDomPoint2D, y?: number): this {
    if (typeof (x) === "number" && typeof (y) === "number") {
      this.x = x;
      this.y = y;
      return this;
    }
    if (isIPoint2D(x))
      return this.set(x.x, x.y);
    if (isIDomPoint2D(x))
      return this.set(x.left, x.top);
    throw "invalid arguments";
  }
  equals(point: IPoint2D | IDomPoint2D): boolean
  equals(x: number, y: number): boolean
  equals(x: number | IPoint2D | IDomPoint2D, y?: number): boolean {
    if (typeof (x) === "number" && typeof (y) === "number")
      return this.x === x && this.y === y;
    if (isIPoint2D(x))
      return this.equals(x.x, x.y);
    if (isIDomPoint2D(x))
      return this.equals(x.left, x.top);
    throw "invalid arguments";
  }
  add(point: IPoint2D | IDomPoint2D): this
  add(x: number, y: number): this
  add(x: number | IPoint2D | IDomPoint2D, y?: number): this {
    if (typeof (x) === "number" && typeof (y) === "number") {
      this.x += x;
      this.y += y;
      return this;
    }
    if (isIPoint2D(x))
      return this.add(x.x, x.y);
    if (isIDomPoint2D(x))
      return this.add(x.left, x.top);
    throw "invalid arguments";
  }
  subtract(point: IPoint2D | IDomPoint2D): this
  subtract(x: number, y: number): this
  subtract(x: number | IPoint2D | IDomPoint2D, y?: number): this {
    if (typeof (x) === "number" && typeof (y) === "number") {
      this.x -= x;
      this.y -= y;
      return this;
    }
    if (isIPoint2D(x))
      return this.subtract(x.x, x.y);
    if (isIDomPoint2D(x))
      return this.subtract(x.left, x.top);
    throw "invalid arguments";
  }
  scale(scale: number): this
  scale(scaleX: number, scaleY: number): this
  scale(scale: IPoint2D | IDomPoint2D): this
  scale(scaleX: number | IPoint2D | IDomPoint2D, scaleY?: number): this {
    if (typeof (scaleX) === "number") {
      this.x *= scaleX;
      this.y *= typeof (scaleY) === "number" ? scaleY : scaleX;
      return this;
    }
    if (isIPoint2D(scaleX))
      return this.scale(scaleX.x, scaleX.y);
    if (isIDomPoint2D(scaleX))
      return this.scale(scaleX.left, scaleX.top);
    throw "invalid arguments";
  }
  atan2(): number {
    return Math.atan2(this.y, this.x);
  }
  rotate(angle: number): this {
    const cosA = Math.cos(angle), sinA = Math.sin(angle);
    return this.set(this.x * cosA - this.y * sinA, this.y * cosA + this.x * sinA);
  }
  magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  normalize(): this {
    const magnitude = this.magnitude();
    return magnitude === 0 ? this.set(1, 0) : this.scale(1 / magnitude);
  }
  stepify(): this {
    if (this.x === 0 && this.y === 0)
      throw "Unable to stepify [" + this.x + ", " + this.y + "]";
    return this.scale(1 / (this.x === 0 ? Math.abs(this.y) : this.y === 0 ? Math.abs(this.x) : greatestCommonDivisor(this.x, this.y)));
  }
  constrainTo(rectangle: IRectangle2D | IDomRectangle2D): this
  constrainTo(point: IPoint2D | IDomPoint2D, size: ISize2D): this
  constrainTo(x: number, y: number, width: number, height: number): this
  constrainTo(x: number | IRectangle2D | IDomRectangle2D | IPoint2D | IDomPoint2D, y?: number | ISize2D, width?: number, height?: number): this {
    if (typeof (x) === "number" && typeof (y) === "number" && typeof (width) === "number" && typeof (height) === "number") {
      let newX, newY;
      if (this.x < x)
        newX = x;
      else if (this.x > x + width - 1)
        newX = x + width - 1;
      else
        newX = this.x;
      if (this.y < y)
        newY = y;
      else if (this.y > y + height - 1)
        newY = y + height - 1;
      else
        newY = this.y;
      return this.set(newX, newY);
    }
    if (isIRectangle2D(x))
      return this.constrainTo(x.x, x.y, x.width, x.height);
    if (isIDomRectangle2D(x))
      return this.constrainTo(x.left, x.top, x.width, x.height);
    if (isIPoint2D(x) && isISize2D(y))
      return this.constrainTo(x.x, x.y, y.width, y.height);
    if (isIDomPoint2D(x) && isISize2D(y))
      return this.constrainTo(x.left, x.top, y.width, y.height);
    throw "invalid arguments";
  }
}

function greatestCommonDivisor(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  if (b > a) {
    let temp = a;
    a = b;
    b = temp;
  }
  while (true) {
    if (b === 0)
      return a;
    a %= b;
    if (a === 0)
      return b;
    b %= a;
  }
}