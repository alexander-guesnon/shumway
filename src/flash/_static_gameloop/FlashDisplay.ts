module Shumway.AVMX.AS.flash.statics {
	import assert = Shumway.Debug.assert;
	import Stage = display.Stage;
	import MovieClip = display.MovieClip;
	import IAdvancable = display.IAdvancable;
	import DisplayObjectFlags = display.DisplayObjectFlags;
	import FrameNavigationModel = display.FrameNavigationModel;

	import enterTimeline = Shumway.AVMX.enterTimeline;
	import leaveTimeline = Shumway.AVMX.leaveTimeline;
	import FrameScript = Shumway.AVMX.AS.flash.display.FrameScript;

	export class FlashDisplay {
		constructor(context: FlashContext) {
			this.context = context;

			this.displayObjectReset();
			this.movieClipReset();
		}

		init() {
			const flash = this.context.sec.flash;

			this.DisplayObject = new FlashClass(flash.display.DisplayObject);
			this.DisplayObjectContainer = new FlashClass(flash.display.DisplayObjectContainer);
			this.InteractiveObject = new FlashClass(flash.display.InteractiveObject);
			this.MovieClip = new FlashClass(flash.display.MovieClip);
			this.BitmapData = new FlashClass(flash.display.BitmapData);
			this.Bitmap = new FlashClass(flash.display.Bitmap);
			this.AVM1Movie = new FlashClass(flash.display.AVM1Movie);
			this.Stage = new FlashClass(flash.display.Stage);
		}

		context: FlashContext;

		// classes
		DisplayObject: FlashClass<flash.display.DisplayObject>;
		DisplayObjectContainer: FlashClass<flash.display.DisplayObjectContainer>;
		InteractiveObject: FlashClass<flash.display.InteractiveObject>;
		MovieClip: FlashClass<flash.display.MovieClip>;
		AVM1Movie: FlashClass<flash.display.AVM1Movie>;
		Stage: FlashClass<flash.display.Stage>;
		BitmapData: FlashClass<flash.display.BitmapData>;
		Bitmap: FlashClass<flash.display.Bitmap>;

		//Statics

		// DisplayObject statics

		_broadcastFrameEvent(type: string): void {
			const events = this.context.events;
			let event = events.getBroadcastInstance(type);
			events.broadcastEventDispatchQueue.dispatchEvent(event);
		}

		_advancableInstances: WeakList<IAdvancable>;

		_runScripts: boolean = true;

		_stage: Stage = null;

		_instanceID = 1;

		/**
		 * DisplayObject#name is set to an initial value of 'instanceN', where N is auto-incremented.
		 * This is true for all DisplayObjects except for Stage, so it happens in an overrideable
		 * method.
		 */
		displayObjectReset() {
			this._advancableInstances = new WeakList<IAdvancable>();
		}

		/**
		 * Runs one full turn of the frame events cycle.
		 *
		 * Frame navigation methods on MovieClip can trigger nested frame events cycles. These nested
		 * cycles do everything the outermost cycle does, except for broadcasting the ENTER_FRAME
		 * event.
		 *
		 * If runScripts is true, no events are dispatched and Movieclip frame scripts are run. This
		 * is true for nested cycles, too. (We keep static state for that.)
		 */
		performFrameNavigation(mainLoop: boolean, runScripts: boolean) {
			if (mainLoop) {
				this._runScripts = runScripts;
			} else {
				runScripts = this._runScripts;
			}

			release || assert(this._advancableInstances.length < 1024 * 16,
				"Too many advancable instances.");

			// Step 1: Remove timeline objects that don't exist on new frame, update existing ones with
			// new properties, and declare, but not create, new ones, update numChildren.
			// NOTE: the Order Of Operations senocular article is wrong on this: timeline objects are
			// removed from stage at the beginning of a frame, just as new objects are declared at that
			// point.
			// Also, changed properties of existing objects are updated here instead of during frame
			// construction after ENTER_FRAME.
			// Thus, all these can be done together.
			enterTimeline("DisplayObject.InitFrame");
			this._advancableInstances.forEach(function (value) {
				value._initFrame(mainLoop);
			});
			leaveTimeline();
			// Step 2: Dispatch ENTER_FRAME, only called in outermost invocation.
			enterTimeline("DisplayObject.EnterFrame");
			if (mainLoop && runScripts) {
				this._broadcastFrameEvent(events.Event.ENTER_FRAME);
			}
			leaveTimeline();
			// Step 3: Create new timeline objects.
			enterTimeline("DisplayObject.ConstructFrame");
			this._advancableInstances.forEach(function (value) {
				value._constructFrame();
			});
			leaveTimeline();
			// Step 4: Dispatch FRAME_CONSTRUCTED.
			if (runScripts) {
				enterTimeline("DisplayObject.FrameConstructed");
				this._broadcastFrameEvent(events.Event.FRAME_CONSTRUCTED);
				leaveTimeline();
				// Step 5: Run frame scripts
				// Flash seems to enqueue all frame scripts recursively, starting at the root of each
				// independent object graph. That can be the stage or a container that isn't itself on
				// stage, but has (grand-)children.
				// The order in which these independent graphs are processed seems not to follow a
				// specific system: in some testing scenarios all independent graphs are processes before
				// the stage, in others the first-created such graph is processes *after* the stage, all
				// others before the stage. There might be other permutations of this, but it seems
				// doubtful anybody could reasonably rely on the exact details of all this.
				// Of course, nothing guarantees that there isn't content that accidentally does, so it'd
				// be nice to eventually get this right.
				enterTimeline("DisplayObject.EnqueueFrameScripts");
				let displayObjectContainerClass = this.context.sec.flash.display.DisplayObjectContainer.axClass;
				this._advancableInstances.forEach(function (value) {
					let container: any = value;
					if (displayObjectContainerClass.axIsType(container) && !container.parent) {
						container._enqueueFrameScripts();
					}
				});
				this._stage._enqueueFrameScripts();
				leaveTimeline();
				enterTimeline("DisplayObject.RunFrameScript");
				if (this.frameNavigationModel === FrameNavigationModel.SWF1) {
					this.runAvm1FrameScripts();
				} else {
					this.runFrameScripts();
				}
				leaveTimeline();
				// Step 6: Dispatch EXIT_FRAME.
				enterTimeline("DisplayObject.ExitFrame");
				this._broadcastFrameEvent(events.Event.EXIT_FRAME);
				leaveTimeline();
			} else {
				this.movieClipReset();
			}
			if (mainLoop) {
				this._runScripts = true;
			}
		}

		// MOVIE CLIP STATICS

		_callQueue: MovieClip [];
		frameNavigationModel: FrameNavigationModel;

		movieClipReset() {
			this.frameNavigationModel = FrameNavigationModel.SWF10;
			this._callQueue = [];
		}

		runFrameScripts() {
			enterTimeline("MovieClip.executeFrame");
			let queue: MovieClip[] = this._callQueue;
			this._callQueue = [];

			for (let i = 0; i < queue.length; i++) {
				let instance = queue[i];

				instance._allowFrameNavigation = false;
				instance.callFrame(instance._currentFrame);
				instance._allowFrameNavigation = true;

				// If the destination frame isn't the same as before the `callFrame` operation, a frame
				// navigation has happened inside the frame script. In that case, we didn't immediately
				// run frame navigation as described in `_gotoFrameAbs`. Instead, we have to do it here.
				if (instance._nextFrame !== instance._currentFrame) {
					if (this.frameNavigationModel === FrameNavigationModel.SWF9) {
						instance._advanceFrame();
						instance._constructFrame();
						instance._removeFlags(DisplayObjectFlags.HasFrameScriptPending);
						instance.callFrame(instance._currentFrame);
					} else {
						this.performFrameNavigation(false, true);
					}
				}
			}

			leaveTimeline();
		}

		runAvm1FrameScripts() {
			enterTimeline("MovieClip.runAvm1FrameScripts");
			let queue: MovieClip[] = this._callQueue;
			this._callQueue = [];
			let unsortedScripts: FrameScript [] = [];

			for (let i = 0; i < queue.length; i++) {
				let instance = queue[i];
				instance.queueAvm1FrameScripts(instance._currentFrame, unsortedScripts);
			}

			if (unsortedScripts.length) {
				unsortedScripts.sort(compareFrameScripts);

				for (let i = 0; i < queue.length; i++) {
					let instance = queue[i];
					instance._allowFrameNavigation = false;
				}

				let frameScripts = unsortedScripts;
				for (let i = 0; i < frameScripts.length; i++) {
					let script = frameScripts[i];
					let mc = script.context;
					release || assert(mc);
					script.call(mc);
				}

				for (let i = 0; i < queue.length; i++) {
					let instance = queue[i];
					instance._allowFrameNavigation = true;
					if (instance._nextFrame !== instance._currentFrame) {
						this.performFrameNavigation(false, true);
					}
				}
			}

			leaveTimeline();
		}
	}

	function compareFrameScripts(a: FrameScript, b: FrameScript): number {
		if (!a.precedence) {
			return !b.precedence ? 0 : -1;
		} else if (!b.precedence) {
			return 1;
		}
		let i = 0;
		while (i < a.precedence.length && i < b.precedence.length &&
		a.precedence[i] === b.precedence[i]) {
			i++;
		}
		if (i >= a.precedence.length) {
			return a.precedence.length === b.precedence.length ? 0 : -1;
		} else {
			return i >= b.precedence.length ? 1 : a.precedence[i] - b.precedence[i];
		}
	}
}