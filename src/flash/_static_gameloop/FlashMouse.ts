module Shumway.AVMX.AS.flash.statics {
	import assert = Shumway.Debug.assert;
	import MouseCursor = flash.ui.MouseCursor;

	export class FlashMouse {
		constructor(context: FlashContext) {
			this.context = context;
		}

		context: FlashContext;

		init() {
			this._currentPosition = new this.context.sec.flash.geom.Point();
			this._cursor = MouseCursor.AUTO;
			this.draggableObject = null;
		}

		draggableObject: flash.display.Sprite;
		_currentPosition: flash.geom.Point;
		_cursor: string;

		//static _supportsCursor: boolean;

		//static _supportsNativeCursor: boolean;
		/**
		 * Remembers the current mouse position.
		 */
		public updateCurrentPosition(value: flash.geom.Point) {
			this._currentPosition.copyFrom(value);
		}
	}
}