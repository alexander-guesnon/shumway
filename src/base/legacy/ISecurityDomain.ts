module Shumway.flash.statics {

	export let _currentDomain: ISecurityDomain = null;

	export function currentDomain() {
		return this._currentDomain;
	}

	export interface ISecurityDomain {
		utils: IUtilsNamespace
	}

	export interface IUtilsNamespace {
		ByteArray: ByteArrayClass
	}
}
