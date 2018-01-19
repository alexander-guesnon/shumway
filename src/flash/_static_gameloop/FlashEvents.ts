module Shumway.AVMX.AS.flash.statics {
	import assert = Shumway.Debug.assert;
	import Event = events.Event;

	export class FlashEvents {
		constructor(context: FlashContext) {
			this.context = context;
		}

		context: FlashContext;

		_instances = ObjectUtilities.createMap<Event>();

		clone(event: Event) {
			return new this.context.sec.flash.events.Event(event._type, event._bubbles,
				event._cancelable).setContext(this.context);
		}

		getInstance(type: string, bubbles: boolean = false, cancelable: boolean = false): Event {
			let instance = this._instances[type];
			if (!instance) {
				instance = new this.context.sec.flash.events.Event(type, bubbles, cancelable).setContext(this.context);
				this._instances[type] = instance;
			}
			instance._bubbles = bubbles;
			instance._cancelable = cancelable;
			return instance;
		}

		getBroadcastInstance(type: string, bubbles: boolean = false, cancelable: boolean = false): Event {
			let instance = this._instances[type];
			if (!instance) {
				instance = new this.context.sec.flash.events.Event(type, bubbles, cancelable).setContext(this.context);
				this._instances[type] = instance;
				// Some events are documented as broadcast event in the AS3 docs. We can't set |_isBroadcastEvent| flag in the
				// constructor because if you create custom events with these types they do capture and bubble.
				release || assert(Event.isBroadcastEventType(type));
			}
			instance._isBroadcastEvent = true;
			instance._bubbles = bubbles;
			instance._cancelable = cancelable;
			return instance;
		}

		broadcastEventDispatchQueue = new flash.events.BroadcastEventDispatchQueue();
	}
}