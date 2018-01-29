module Shumway.flash.statics {

	export let _currentDomain: ISecurityDomain = null;

	export function currentDomain() {
		return this._currentDomain;
	}

	export interface ISecurityDomain {
		utils: IUtilsNamespace;
		throwError(className: string, error: any, replacement1?: any,
		           replacement2?: any, replacement3?: any, replacement4?: any): void;
	}

	export interface IUtilsNamespace {
		ByteArray: ByteArrayClass
	}
}
