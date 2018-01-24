module Shumway.flash {
	export class LegacyEntity {
		_sec: statics.ISecurityDomain = null;

		_flashSetSecurityDomain(sec: statics.ISecurityDomain) {
			this._sec = sec;
			this._legacyInit();
		}

		_legacyInit() {

		}
	}
}

module Shumway.flash.statics {
	export class LegacyNamespace extends LegacyEntity {
		key: string = null;

		classMap: MapObject<LegacyEntity>;

		_flashSetSecurityDomain(sec: ISecurityDomain) {
			this._sec = sec;
			this._legacyInit();

			let classMap = this.classMap;
			for (let key in classMap) {
				classMap[key]._flashSetSecurityDomain(sec);
			}
		}

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
			// args.unshift(cls);
			// let inst:T = new (Function.prototype.bind.apply(cls, args));

			let instance: T = new (this.jsClass as any)();
			instance._flashSetSecurityDomain(this._sec);
			return instance;
		}
	}
}
