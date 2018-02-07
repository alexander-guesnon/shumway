/**
 * Copyright 2014 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Class: ApplicationDomain
module Shumway.flash.system {
	import notImplemented = Shumway.Debug.notImplemented;

	export class ApplicationDomain extends LegacyEntity implements lang.IApplicationDomain {
		loadABC(file: Shumway.flash.lang.ABCFile): void {
			// nothing
		}

		loadAndExecuteABC(file: Shumway.flash.lang.ABCFile): void {
			// nothing
		}

		getClass(name: lang.Multiname): LegacyClass {
			//@ivanpopelyshev: we need it to work or we're screwed
			return null;
		}

		// axDomain: AXApplicationDomain;
		_parentDomain: ApplicationDomain;

		constructor(parentDomain: any = null) {
			super();
			release || Debug.assert(!(this instanceof ApplicationDomain));
			// this.parentDomain = parentDomain || this._sec.;

			if (parentDomain) {
				this._parentDomain = parentDomain;
			} else if (this._sec.system) {
				this._parentDomain = this._sec.system._applicationDomain;
			} else {
				this._parentDomain = null;
			}
		}

		// This must return a new object each time.
		static get currentDomain(): flash.system.ApplicationDomain {
			return _currentDomain.system._currentDomain;
		}

		static get MIN_DOMAIN_MEMORY_LENGTH(): number /*uint*/ {
			release || notImplemented("public flash.system.ApplicationDomain::get MIN_DOMAIN_MEMORY_LENGTH");
			return 0;
			// return this._MIN_DOMAIN_MEMORY_LENGTH;
		}

		get parentDomain(): flash.system.ApplicationDomain {
			return this._parentDomain;
		}

		get domainMemory(): flash.utils.ByteArray {
			release || notImplemented("public flash.system.ApplicationDomain::get domainMemory");
			return null;
			// return this._domainMemory;
		}

		set domainMemory(mem: flash.utils.ByteArray) {
			mem = mem;
			release || notImplemented("public flash.system.ApplicationDomain::set domainMemory");
			return;
			// this._domainMemory = mem;
		}

		getDefinition(name: string): Object {
			let definition = this.getDefinitionImpl(name);
			if (!definition) {
				this._sec.throwError('ReferenceError', Errors.UndefinedVarError, name);
			}
			return definition;
		}

		hasDefinition(name: string): boolean {
			return !!this.getDefinitionImpl(name);
		}

		private getDefinitionImpl(name: any): any {
			//TODO: @ivanpopelyshev QNF here from AXApplicationDomain


			// if (!name) {
			// 	this.sec.throwError('TypeError', Errors.NullPointerError, 'definitionName');
			// }
			// let simpleName = name.replace("::", ".");
			// let mn = Multiname.FromFQNString(simpleName, NamespaceType.Public);
			// return this.axDomain.getProperty(mn, false, false);
		}

		getQualifiedDefinitionNames(): ArrayLike<any> {
			release || notImplemented("public flash.system.ApplicationDomain::getQualifiedDefinitionNames");
			return null;
		}
	}
}
