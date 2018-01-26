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

/**
 * Flash bugs to keep in mind:
 *
 * http://aaronhardy.com/flex/displayobject-quirks-and-tips/
 * http://blog.anselmbradford.com/2009/02/12/flash-movie-clip-transformational-properties-explorer-x-y-width-height-more/
 * http://gskinner.com/blog/archives/2007/08/annoying_as3_bu.html
 * http://blog.dennisrobinson.name/getbounds-getrect-unexpected-results/
 *
 */
// Class: DisplayObject
module Shumway.flash.display {
	import PlaceObjectFlags = Shumway.SWF.Parser.PlaceObjectFlags;

	/*
	 * Invalid Bits:
	 *
	 * Invalid bits are used to mark path dependent properties of display objects as stale. To compute these properties we either have to
	 * walk the tree all the way the root, or visit all children.
	 *
	 *       +---+
	 *       | A |
	 *       +---+
	 *       /   \
	 *   +---+   +---+
	 *   | B |   | C |
	 *   +---+   +---+
	 *           /   \
	 *       +---+   +---+
	 *       | D |   | E |
	 *       +---+   +---+
	 *
	 * We use a combination of eager invalid bit propagation and lazy property evaluation. If a node becomes invalid because one of its
	 * local properties has changed, we mark all of its valid descendents as invalid. When computing dependent properties, we walk up
	 * the tree until we find a valid node and propagate the computation lazily downwards, marking all the nodes along the path as
	 * valid.
	 *
	 * Suppose we mark A as invalid, this causes nodes B, C, D, and E to become invalid. We then compute a path dependent property
	 * on E, causing A, and C to become valid. If we mark A as invalid again, A and C become invalid again. We don't need to mark
	 * parts of the tree that are already invalid.
	 *
	 *
	 * Dirty Bits:
	 *
	 * These are used to mark properties as having been changed.
	 */
	export const enum DisplayObjectFlags {
		None = 0x0000,

		/**
		 * Display object is visible.
		 */
		Visible = 0x0001,

		/**
		 * Display object has invalid line bounds.
		 */
		InvalidLineBounds = 0x0002,

		/**
		 * Display object has invalid fill bounds.
		 */
		InvalidFillBounds = 0x0004,

		/**
		 * Display object has an invalid matrix because one of its local properties: x, y, scaleX, ...
		 * has been mutated.
		 */
		InvalidMatrix = 0x0008,

		/**
		 * Display object has an invalid inverted matrix because its matrix has been mutated.
		 */
		InvalidInvertedMatrix = 0x0010,

		/**
		 * Display object has an invalid concatenated matrix because its matrix or one of its
		 * ancestor's matrices has been mutated.
		 */
		InvalidConcatenatedMatrix = 0x0020,

		/**
		 * Display object has an invalid inverted concatenated matrix because its matrix or one of its
		 * ancestor's matrices has been mutated. We don't always need to compute the inverted matrix.
		 * This is why we use a sepearete invalid flag for it and don't roll it under the
		 * |InvalidConcatenatedMatrix| flag.
		 */
		InvalidInvertedConcatenatedMatrix = 0x0040,

		/**
		 * Display object has an invalid concatenated color transform because its color transform or
		 * one of its ancestor's color transforms has been mutated.
		 */
		InvalidConcatenatedColorTransform = 0x0080,

		/**
		 * The display object's constructor has been executed or any of the derived class constructors
		 * have executed. It may be that the derived class doesn't call super, in such cases this flag
		 * must be set manually elsewhere.
		 */
		Constructed = 0x0100,

		/**
		 * Display object has been removed by the timeline but it no longer recieves any event.
		 */
		Destroyed = 0x0200,

		/**
		 * Indicates wether an AVM1 load event needs to be dispatched on this display object.
		 */
		NeedsLoadEvent = 0x0400,

		/**
		 * Display object is owned by the timeline, meaning that it is under the control of the
		 * timeline and that a reference to this object has not leaked into AS3 code via the
		 * DisplayObjectContainer methods |getChildAt|,  |getChildByName| or through the execution of
		 * the symbol class constructor.
		 */
		OwnedByTimeline = 0x0800,

		/**
		 * Display object is animated by the timeline. It may no longer be owned by the timeline
		 * (|OwnedByTimeline|) but it is still animated by it. If AS3 code mutates any property on the
		 * display object, this flag is cleared and further timeline mutations are ignored.
		 */
		AnimatedByTimeline = 0x1000,

		/**
		 * MovieClip object has reached a frame with a frame script or ran a frame script that attached
		 * a new one to the current frame. To run the script, it has to be appended to the queue of
		 * scripts.
		 */
		HasFrameScriptPending = 0x2000,

		/**
		 * DisplayObjectContainer contains at least one descendant with the HasFrameScriptPending flag
		 * set.
		 */
		ContainsFrameScriptPendingChildren = 0x4000,

		/**
		 * Indicates whether this display object is a MorphShape or contains at least one descendant
		 * that is.
		 */
		ContainsMorph = 0x8000,

		/**
		 * Indicates whether this display object should be cached as a bitmap. The display object may
		 * be cached as bitmap even if this flag is not set, depending on whether any filters are
		 * applied or if the bitmap is too large or we've run out of memory.
		 */
		CacheAsBitmap = 0x010000,

		/**
		 * Indicates whether an AVM1 timeline needs to initialize an object after place object
		 * occurred.
		 */
		HasPlaceObjectInitPending = 0x020000,

		/**
		 * Indicates whether a transform.perspectiveProjection was set.
		 */
		HasPerspectiveProjection = 0x040000,

		/**
		 * Indicates whether this display object has dirty descendents. If this flag is set then the
		 * subtree need to be synchronized.
		 */
		DirtyDescendents = 0x20000000,

		/**
		 * Masks flags that need to be propagated up when this display object gets added to a parent.
		 */
		Bubbling = ContainsFrameScriptPendingChildren | ContainsMorph | DirtyDescendents
	}

	export const enum DisplayObjectDirtyFlags {
		/**
		 * Indicates whether this display object's matrix has changed since the last time it was
		 * synchronized.
		 */
		DirtyMatrix = 0x001,

		/**
		 * Indicates whether this display object's children list is dirty.
		 */
		DirtyChildren = 0x002,

		/**
		 * Indicates whether this display object's graphics has changed since the last time it was
		 * synchronized.
		 */
		DirtyGraphics = 0x004,

		/**
		 * Indicates whether this display object's text content has changed since the last time it was
		 * synchronized.
		 */
		DirtyTextContent = 0x008,

		/**
		 * Indicates whether this display object's bitmap data has changed since the last time it was
		 * synchronized.
		 */
		DirtyBitmapData = 0x010,

		/**
		 * Indicates whether this display object's bitmap data has changed since the last time it was
		 * synchronized.
		 */
		DirtyNetStream = 0x020,

		/**
		 * Indicates whether this display object's color transform has changed since the last time it
		 * was synchronized.
		 */
		DirtyColorTransform = 0x040,

		/**
		 * Indicates whether this display object's mask has changed since the last time it was
		 * synchronized.
		 */
		DirtyMask = 0x080,

		/**
		 * Indicates whether this display object's clip depth has changed since the last time it was
		 * synchronized.
		 */
		DirtyClipDepth = 0x100,

		/**
		 * Indicates whether this display object's other properties have changed. We need to split this
		 * up in multiple bits so we don't serialize as much:
		 *
		 * So far we only mark these properties here:
		 *
		 * blendMode,
		 * scale9Grid,
		 * cacheAsBitmap,
		 * filters,
		 * visible,
		 */
		DirtyMiscellaneousProperties = 0x200,

		/**
		 * All synchronizable properties are dirty.
		 */
		Dirty = DirtyMatrix | DirtyChildren | DirtyGraphics |
			DirtyTextContent | DirtyBitmapData | DirtyNetStream |
			DirtyColorTransform | DirtyMask | DirtyClipDepth |
			DirtyMiscellaneousProperties
	}

	/**
	 * Controls how the visitor walks the display tree.
	 */
	export const enum VisitorFlags {
		/**
		 * None
		 */
		None = 0,

		/**
		 * Continue with normal traversal.
		 */
		Continue = 0,

		/**
		 * Not used yet, should probably just stop the visitor.
		 */
		Stop = 0x01,

		/**
		 * Skip processing current node.
		 */
		Skip = 0x02,

		/**
		 * Visit front to back.
		 */
		FrontToBack = 0x08,

		/**
		 * Only visit the nodes matching a certain flag set.
		 */
		Filter = 0x10
	}

	export const enum HitTestingType {
		HitTestBounds,
		HitTestBoundsAndMask,
		HitTestShape,
		Mouse,
		ObjectsUnderPoint,
		Drop
	}

	export const enum HitTestingResult {
		None,
		Bounds,
		Shape
	}

	/*
	 * Note: Private or functions are prefixed with "_" and *may* return objects that
	 * should not be mutated. This is for performance reasons and it's up to you to make sure
	 * such return values are cloned.
	 *
	 * Private or functions usually operate on twips, public functions work with pixels
	 * since that's what the AS3 specifies.
	 */

	export interface IAdvancable extends Shumway.IReferenceCountable {
		_initFrame(advance: boolean): void;

		_constructFrame(): void;
	}

	export class DisplayObject extends events.EventDispatcher {
		_parent: DisplayObjectContainer;
		_perspectiveProjectionFOV: number;
		_perspectiveProjectionCenterX: number;
		_perspectiveProjectionCenterY: number;
		_matrix3D: geom.Matrix3D;
		_colorTransform: geom.ColorTransform;

		_getMatrix(): geom.Matrix {
			return null;
		}

		_setMatrix(value: geom.Matrix, flag:boolean) {

		}
		_setColorTransform(value: geom.ColorTransform) {

		}

		_getConcatenatedMatrix(): geom.Matrix {
			return null;
		}

		_getConcatenatedColorTransform(): geom.ColorTransform {
			return null;
		}

		_stage: DisplayObjectContainer;

		getRect(dodo: DisplayObject): geom.Rectangle {
			return null;
		}

		get stage() {
			return this._stage;
		}

		_hasFlags(x: number) {
			return false;
		}

		_setFlags(x: number) {

		}

		_removeFlags(x: number) {

		}
	}
}
