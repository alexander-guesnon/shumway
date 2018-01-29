/*
 * Copyright 2014 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

///<reference path='module.ts' />
///<reference path='settings.ts' />

///<reference path='geom/Matrix.ts' />
///<reference path='geom/Matrix3D.ts' />
///<reference path='geom/Orientation3D.ts' />
///<reference path='geom/PerspectiveProjection.ts' />
///<reference path='geom/Point.ts' />
///<reference path='geom/Rectangle.ts' />
///<reference path='geom/Transform.ts' />
///<reference path='geom/Utils3D.ts' />
///<reference path='geom/Vector3D.ts' />
///<reference path='geom/ColorTransform.ts' />

///<reference path='events/Event.ts' />
///<reference path='events/EventDispatcher.ts' />
///<reference path='events/EventPhase.ts' />
///<reference path='events/IEventDispatcher.ts' />
///<reference path='events/ProgressEvent.ts' />

///<reference path='display/DisplayObject.ts' />
///<reference path='display/Bitmap.ts' />
///<reference path='display/Shape.ts' />
///<reference path='display/InteractiveObject.ts' />
///<reference path='display/SimpleButton.ts' />
///<reference path='display/DisplayObjectContainer.ts' />
///<reference path='display/enums/JointStyle.ts' />
///<reference path='display/CapsStyle.ts' />
///<reference path='display/enums/LineScaleMode.ts' />
///<reference path='display/enums/GradientType.ts' />
///<reference path='display/enums/SpreadMethod.ts' />
///<reference path='display/enums/InterpolationMethod.ts' />
///<reference path='display/GraphicsBitmapFill.ts' />
///<reference path='display/GraphicsEndFill.ts' />
///<reference path='display/GraphicsGradientFill.ts' />
///<reference path='display/GraphicsPath.ts' />
///<reference path='display/enums/GraphicsPathCommand.ts' />
///<reference path='display/enums/GraphicsPathWinding.ts' />
// ///<reference path='display/GraphicsShaderFill.ts' />
///<reference path='display/GraphicsSolidFill.ts' />
///<reference path='display/GraphicsStroke.ts' />
///<reference path='display/GraphicsTrianglePath.ts' />
///<reference path='display/IDrawCommand.ts' />
///<reference path='display/IGraphicsData.ts' />
///<reference path='display/IGraphicsFill.ts' />
///<reference path='display/IGraphicsPath.ts' />
///<reference path='display/IGraphicsStroke.ts' />
///<reference path='display/Graphics.ts' />
///<reference path='display/Sprite.ts' />
///<reference path='display/MovieClip.ts' />
///<reference path='display/MovieClipSoundStream.ts' />
///<reference path='display/Stage.ts' />

///<reference path='display/enums/ActionScriptVersion.ts' />
///<reference path='display/enums/BlendMode.ts' />
///<reference path='display/enums/ColorCorrection.ts' />
///<reference path='display/enums/ColorCorrectionSupport.ts' />
///<reference path='display/enums/FocusDirection.ts' />
///<reference path='display/FrameLabel.ts' />
///<reference path='display/BitmapData.ts' />
///<reference path='display/enums/BitmapDataChannel.ts' />
///<reference path='display/enums/BitmapEncodingColorSpace.ts' />
///<reference path='display/IBitmapDrawable.ts' />
///<reference path='display/JPEGEncoderOptions.ts' />
// ///<reference path='display/JPEGXREncoderOptions.ts' />
///<reference path='display/Loader.ts' />
///<reference path='display/LoaderInfo.ts' />
///<reference path='display/MorphShape.ts' />
///<reference path='display/NativeMenu.ts' />
///<reference path='display/NativeMenuItem.ts' />
///<reference path='display/PNGEncoderOptions.ts' />
///<reference path='display/enums/PixelSnapping.ts' />
///<reference path='display/enums/SWFVersion.ts' />
///<reference path='display/Scene.ts' />
// ///<reference path='display/Shader.ts' />
// ///<reference path='display/ShaderData.ts' />
// ///<reference path='display/ShaderInput.ts' />
// ///<reference path='display/ShaderJob.ts' />
// ///<reference path='display/ShaderParameter.ts' />
// ///<reference path='display/ShaderParameterType.ts' />
// ///<reference path='display/ShaderPrecision.ts' />
// ///<reference path='display/Stage3D.ts' />
///<reference path='display/enums/StageAlign.ts' />
///<reference path='display/enums/StageDisplayState.ts' />
///<reference path='display/enums/StageQuality.ts' />
///<reference path='display/enums/StageScaleMode.ts' />
///<reference path='display/TriangleCulling.ts' />
///<reference path='display/AVM1Movie.ts' />

///<reference path='utils/Endian.ts' />
///<reference path='utils/IExternalizable.ts' />

///<reference path='statics/SecurityDomain.ts'/>>
///<reference path='statics/EventsNamespace.ts'/>>
///<reference path='statics/UtilsNamespace.ts'/>>
///<reference path='statics/GeomNamespace.ts'/>>
///<reference path='statics/DisplayNamespace.ts'/>>
///<reference path='statics/errors.ts'/>>