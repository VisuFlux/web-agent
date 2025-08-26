export default class Coordinates {
	private readonly _x: number;
	private readonly _y: number;

	private constructor(x: number, y: number) {
		this._x = x / window.innerWidth;
		this._y = y / window.innerHeight
	}

	public static fromCoordinates(x: number, y: number): Coordinates {
		return new Coordinates(x, y);
	}

	public static fromClick(pointerEvent: PointerEvent): Coordinates {
		return new Coordinates(pointerEvent.x, pointerEvent.y);
	}


	get x(): number {
		return this._x;
	}

	get y(): number {
		return this._y;
	}
}