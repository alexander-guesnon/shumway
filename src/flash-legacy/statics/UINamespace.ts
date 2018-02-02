module Shumway.flash.system {
	export class UINamespace extends LegacyNamespace {
		constructor() {
			super();
		}

		Mouse = new MouseClass();
		ContextMenuBuiltInItems = new LegacyClass<ui.ContextMenuBuiltInItems>(ui.ContextMenuBuiltInItems);
	}
}
