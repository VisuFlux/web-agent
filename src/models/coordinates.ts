export default class Coordinates {
  private readonly x: number;
  private readonly y: number;

  /**
   * Creates an instance of Coordinates.
   * @constructor Attribute the value x and y as a ratio of the window size
   * @param x The x coordinate in pixels
   * @param y The y coordinate in pixels
   * @private Use fromCoordinates static method instead.
   */
  private constructor(x: number, y: number) {
    this.x = x / window.innerWidth;
    this.y = y / window.innerHeight;
  }

  /**
   * Get the x coordinate in ratio of the window size
   * @returns The x coordinate in ratio of the window size
   */
  public getX(): number {
    return this.x;
  }

  /**
   * Get the y coordinate in ratio of the window size
   * @returns The y coordinate in ratio of the window size
   */
  public getY(): number {
    return this.y;
  }

  /**
   * Create a Coordinates instance from x and y values in pixels
   * @param x The x coordinate in pixels
   * @param y The y coordinate in pixels
   * @returns A Coordinates instance
   * @throws Error if x or y is not a finite number
   */
  public static fromCoordinates(x: number, y: number): Coordinates {
    if (!Number.isFinite(x) || !Number.isFinite(y)) throw new Error("Invalid Coordinates");
    return new Coordinates(x, y);
  }
}
