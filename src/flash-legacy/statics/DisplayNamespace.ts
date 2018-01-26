module Shumway.flash.statics {
	import assert = Shumway.Debug.assert;

	// import Stage = display.Stage;
	// import MovieClip = display.MovieClip;
	import IAdvancable = display.IAdvancable;
	import DisplayObjectFlags = display.DisplayObjectFlags;
	// import FrameNavigationModel = display.FrameNavigationModel;

	import enterTimeline = Shumway.enterTimeline;
	import leaveTimeline = Shumway.leaveTimeline;
	// import FrameScript = Shumway.flash.display.FrameScript;

	export class DisplayNamespace extends LegacyNamespace {
		constructor() {
			super();

			this.displayObjectReset();
			this.movieClipReset();

			this.DisplayObject = new LegacyClass(display.DisplayObject);
			this.DisplayObjectContainer = new LegacyClass(display.DisplayObjectContainer);
			// this.Sprite = new LegacyClass(display.Sprite);
			// this.InteractiveObject = new LegacyClass(display.InteractiveObject);
			// this.MovieClip = new LegacyClass(display.MovieClip);
			// this.BitmapData = new LegacyClass(display.BitmapData);
			// this.Bitmap = new LegacyClass(display.Bitmap);
			// this.AVM1Movie = new LegacyClass(display.AVM1Movie);
			// this.Stage = new LegacyClass(display.Stage);
		}

		// classes
		DisplayObject: LegacyClass<display.DisplayObject>;
		DisplayObjectContainer: LegacyClass<display.DisplayObjectContainer>;
		// InteractiveObject: LegacyClass<display.InteractiveObject>;
		// MovieClip: LegacyClass<display.MovieClip>;
		// AVM1Movie: LegacyClass<display.AVM1Movie>;
		// Stage: LegacyClass<display.Stage>;
		// BitmapData: LegacyClass<display.BitmapData>;
		// Bitmap: LegacyClass<display.Bitmap>;
		// Sprite: LegacyClass<display.Sprite>;

		//Statics

		// DisplayObject statics

		_broadcastFrameEvent(type: string): void {
			const events = this._sec.events;
			let event = events.getBroadcastInstance(type);
			events.broadcastEventDispatchQueue.dispatchEvent(event);
		}

		_advancableInstances: WeakList<IAdvancable>;

		_runScripts: boolean = true;

		/**
		 * DisplayObject#name is set to an initial value of 'instanceN', where N is auto-incremented.
		 * This is true for all DisplayObjects except for Stage, so it happens in an overrideable
		 * method.
		 */
		displayObjectReset() {
			this._advancableInstances = new WeakList<IAdvancable>();
		}

		// MOVIE CLIP STATICS

		// _callQueue: MovieClip [];
		// frameNavigationModel: FrameNavigationModel;

		movieClipReset() {
			// this.frameNavigationModel = FrameNavigationModel.SWF10;
			// this._callQueue = [];
		}
	}
}