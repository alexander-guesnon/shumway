module Shumway.flash.statics {
	export interface ISecurityDomain {
		events: EventsNamespace
	}

	export class LegacySecurityDomain implements ISecurityDomain {
		constructor() {
			const oldDomain = statics._currentDomain;
			statics._currentDomain = this;

			this.events = new EventsNamespace();
			this.utils = new UtilsNamespace();

			if (oldDomain) {
				statics._currentDomain = oldDomain;
			}
		}

		events: EventsNamespace;
		utils: UtilsNamespace;
	}
}
