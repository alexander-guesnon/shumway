module Shumway.flash.system {
	export class NetNamespace {
		constructor() {
		}

		URLRequestHeader = new LegacyClass<net.URLRequestHeader>(net.URLRequestHeader);
		URLVariables = new LegacyClass<net.URLVariables>(net.URLVariables);
		URLStream = new LegacyClass<net.URLStream>(net.URLStream);
	}
}