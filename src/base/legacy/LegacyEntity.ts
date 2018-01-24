module Shumway.flash {
	export class LegacyEntity {
		_sec: statics.ISecurityDomain;

		constructor() {
			this._sec = statics._currentDomain;
		}
	}
}

module Shumway.flash.statics {
	export class LegacyNamespace extends LegacyEntity {
		key: string = null;

		classMap: MapObject<LegacyEntity>;

		_registerClass(cl: LegacyClass) {
			this.classMap[cl.key] = cl;
		}
	}

	export class LegacyClass<T extends LegacyEntity = any> extends LegacyEntity {
		key: string = null;

		jsClass: Function;

		constructor(jsClass: Function) {
			super();
			this.jsClass = jsClass;
		}

		create(): T {
			// new (Function.prototype.bind.apply(cls, [cls].concat(args)));
			const oldDomain = statics._currentDomain;
			if (oldDomain !== this._sec) {
				statics._currentDomain = this._sec;
				try {
					return new (this.jsClass as any)();
				} catch (e) {
					throwError("LegacyEntity.create", e);
				} finally {
					statics._currentDomain = oldDomain;
				}
			}

			return new (this.jsClass as any)();
		}
	}
}
