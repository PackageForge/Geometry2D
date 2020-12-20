import { IPoint2D, isIPoint2D } from './i-point-2d';
import { IDomPoint2D, isIDomPoint2D } from './i-dom-point-2d';
import { IRectangle2D, isIRectangle2D } from './i-rectangle-2d';
import { IDomRectangle2D, isIDomRectangle2D } from './i-dom-rectangle-2d';
import { ISize2D, isISize2D } from './i-size-2d';
import { Point2D } from './point-2d';
import { Size2D } from './size-2d';

export class Rectangle2D implements IRectangle2D, IPoint2D, ISize2D {
  x!: number;
  y!: number;
  width!: number;
  height!: number;
  constructor(x: number, y: number, width: number, height: number)
  constructor(rectangle: IRectangle2D | IDomRectangle2D)
  constructor(point: IPoint2D | IDomPoint2D, size: ISize2D)
  constructor()
  constructor(x?: number | IRectangle2D | IDomRectangle2D | IPoint2D | IDomPoint2D, y?: number | ISize2D, width?: number, height?: number) {
    if (arguments.length === 0)
      this.set(0, 0, 0, 0);
    else
      this.set.apply(this, <any>arguments);
  }
  clone(): Rectangle2D {
    return new Rectangle2D(this);
  }
  set(rectangle: IRectangle2D | IDomRectangle2D): this
  set(point: IPoint2D | IDomPoint2D, size: ISize2D): this
  set(x: number, y: number, width: number, height: number): this
  set(x: number | IRectangle2D | IDomRectangle2D | IPoint2D | IDomPoint2D, y?: number | ISize2D, width?: number, height?: number): this {
    if (typeof (x) === "number" && typeof (y) === "number" && typeof (width) === "number" && typeof (height) === "number") {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      return this;
    }
    if (isIRectangle2D(x))
      return this.set(x.x, x.y, x.width, x.height);
    if (isIDomRectangle2D(x))
      return this.set(x.left, x.top, x.width, x.height);
    if (isIPoint2D(x) && isISize2D(y))
      return this.set(x.x, x.y, y.width, y.height);
    if (isIDomPoint2D(x) && isISize2D(y))
      return this.set(x.left, x.top, y.width, y.height);
    throw "invalid arguments";
  }
  equals(rectangle: IRectangle2D | IDomRectangle2D): boolean
  equals(point: IPoint2D | IDomPoint2D, size: ISize2D): boolean
  equals(x: number, y: number, width: number, height: number): boolean
  equals(x: number | IRectangle2D | IDomRectangle2D | IPoint2D | IDomPoint2D, y?: number | ISize2D, width?: number, height?: number): boolean {
    if (typeof (x) === "number" && typeof (y) === "number" && typeof (width) === "number" && typeof (height) === "number")
      return this.x === x && this.y === y && this.width === width && this.height === height;
    if (isIRectangle2D(x))
      return this.equals(x.x, x.y, x.width, x.height);
    if (isIDomRectangle2D(x))
      return this.equals(x.left, x.top, x.width, x.height);
    if (isIPoint2D(x) && isISize2D(y))
      return this.equals(x.x, x.y, y.width, y.height);
    if (isIDomPoint2D(x) && isISize2D(y))
      return this.equals(x.left, x.top, y.width, y.height);
    throw "invalid arguments";
  }
  translate(x: number, y: number): this
  translate(point: IPoint2D | IDomPoint2D): this
  translate(x: number | IPoint2D | IDomPoint2D, y?: number): this {
    if (typeof (x) === "number" && typeof (y) === "number") {
      this.x += x;
      this.y += y;
      return this;
    }
    if (isIPoint2D(x))
      return this.translate(x.x, x.y);
    if (isIDomPoint2D(x))
      return this.translate(x.left, x.top);
    throw "invalid arguments";
  }
  farX(): number
  farX(farX: number): this
  farX(farX?: number): number | this {
    if (arguments.length === 0)
      return this.x + this.width - 1;
    if (typeof (farX) === "number") {
      this.x = farX - this.width + 1;
      return this;
    }
    throw "invalid arguments";
  }
  farY(): number
  farY(farY: number): this
  farY(farY?: number): number | this {
    if (arguments.length === 0)
      return this.y + this.height - 1;
    if (typeof (farY) === "number") {
      this.y = farY - this.width + 1;
      return this;
    }
    throw "invalid arguments";
  }
  contains(point: IPoint2D | IDomPoint2D): boolean
  contains(x: number, y: number): boolean
  contains(x: number | IPoint2D | IDomPoint2D, y?: number): boolean {
    if (typeof (x) === "number" && typeof (y) === "number")
      return x >= this.x && x <= this.farX() && y >= this.y && y <= this.farY();
    if (isIPoint2D(x))
      return this.contains(x.x, x.y);
    if (isIDomPoint2D(x))
      return this.contains(x.left, x.top);
    throw "invalid arguments";
  }
  contain(point: IPoint2D | IDomPoint2D): this
  contain(x: number, y: number): this
  contain(x: number | IPoint2D | IDomPoint2D, y?: number): this {
    if (typeof (x) === "number" && typeof (y) === "number") {
      if (x < this.x) {
        this.width += this.x - x;
        this.x = x;
      } else if (x > this.farX())
        this.width = x - this.x + 1;
      if (y < this.y) {
        this.height += this.y - y;
        this.y = y;
      } else if (y > this.farY())
        this.height = y - this.y + 1;
      return this;
    }
    if (isIPoint2D(x))
      return this.contain(x.x, x.y);
    if (isIDomPoint2D(x))
      return this.contain(x.left, x.top);
    throw "invalid arguments";
  }
  constrainTo(rectangle: IRectangle2D | IDomRectangle2D): this
  constrainTo(point: IPoint2D | IDomPoint2D, size: ISize2D): this
  constrainTo(x: number, y: number, width: number, height: number): this
  constrainTo(x: number | IRectangle2D | IDomRectangle2D | IPoint2D | IDomPoint2D, y?: number | ISize2D, width?: number, height?: number): this {
    if (typeof (x) === "number" && typeof (y) === "number" && typeof (width) === "number" && typeof (height) === "number") {
      let newX, newY;
      if (this.width > width)
        newX = x + width / 2;
      else if (this.x < x)
        newX = x;
      else if (this.x + this.width > x + width)
        newX = x + width - this.width;
      else
        newX = this.x;
      if (this.height > height)
        newY = y + height / 2;
      else if (this.y < y)
        newY = y;
      else if (this.y + this.height > y + height)
        newY = y + height - this.height;
      else
        newY = this.y;
      return this.origin(newX, newY);
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
  origin(): Point2D
  origin(point: IPoint2D | IDomPoint2D): this
  origin(x: number, y: number): this
  origin(x?: number | IPoint2D | IDomPoint2D, y?: number): Point2D | this {
    if (arguments.length === 0)
      return new Point2D(this);
    if (typeof (x) === "number" && typeof (y) === "number") {
      this.x = x;
      this.y = y;
      return this;
    }
    if (isIPoint2D(x))
      return this.origin(x.x, x.y);
    if (isIDomPoint2D(x))
      return this.origin(x.left, x.top);
    throw "invalid arguments";
  }
  center(): Point2D
  center(point: IPoint2D | IDomPoint2D): this
  center(x: number, y: number): this
  center(x?: number | IPoint2D | IDomPoint2D, y?: number): Point2D | this {
    if (arguments.length === 0)
      return new Point2D(this.x + (this.width + 1) / 2, this.y + (this.height + 1) / 2);
    if (typeof (x) === "number" && typeof (y) === "number") {
      this.x = x - (this.width - 1) / 2;
      this.y = y - (this.height - 1) / 2;
      return this;
    }
    if (isIPoint2D(x))
      return this.center(x.x, x.y);
    if (isIDomPoint2D(x))
      return this.center(x.left, x.top);
    throw "invalid arguments";
  }
  corner(): Point2D
  corner(point: IPoint2D | IDomPoint2D): this
  corner(x: number, y: number): this
  corner(x?: number | IPoint2D | IDomPoint2D, y?: number): Point2D | this {
    if (arguments.length === 0)
      return new Point2D(this.farX(), this.farY());
    if (typeof (x) === "number" && typeof (y) === "number") {
      this.x = x - this.width + 1;
      this.y = y - this.height + 1;
      return this;
    }
    if (isIPoint2D(x))
      return this.corner(x.x, x.y);
    if (isIDomPoint2D(x))
      return this.corner(x.left, x.top);
    throw "invalid arguments";
  }
  size(): Size2D
  size(size: ISize2D, aboutCenter?: boolean): this
  size(width: number, height: number, aboutCenter?: boolean): this
  size(width?: number | ISize2D, height?: number | boolean, aboutCenter?: boolean): Size2D | this {
    if (arguments.length === 0)
      return new Size2D(this);
    if (typeof (width) === "number" && typeof (height) === "number") {
      if (aboutCenter) {
        this.x -= (width - this.width) / 2;
        this.y -= (height - this.height) / 2;
      }
      this.width = width;
      this.height = height;
      return this;
    }
    if (isISize2D(width))
      return this.size(width.width, width.height, !!height);
    throw "invalid arguments";
  }
  grow(size: ISize2D, aboutCenter?: boolean): this
  grow(size: number, aboutCenter?: boolean): this
  grow(width: number, height: number, aboutCenter?: boolean): this
  grow(width: number | ISize2D, height?: number | boolean, aboutCenter?: boolean): Size2D | this {
    if (typeof (width) === "number") {
      if (typeof (height) === "boolean")
        aboutCenter = height;
      if (typeof (height) !== "number")
        height = width;
      if (aboutCenter) {
        this.x -= width / 2;
        this.y -= height / 2;
      }
      this.width += width;
      this.height += height;
      return this;
    }
    if (isISize2D(width))
      return this.grow(width.width, width.height, !!height);
    throw "invalid arguments";
  }
}
