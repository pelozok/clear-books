(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const h of l.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&i(h)}).observe(document,{childList:!0,subtree:!0});function t(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function i(o){if(o.ep)return;o.ep=!0;const l=t(o);fetch(o.href,l)}})();var _d={exports:{}},ba={},vd={exports:{}},xe={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ig;function tw(){if(Ig)return xe;Ig=1;var r=Symbol.for("react.element"),e=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),i=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),l=Symbol.for("react.provider"),h=Symbol.for("react.context"),p=Symbol.for("react.forward_ref"),g=Symbol.for("react.suspense"),y=Symbol.for("react.memo"),E=Symbol.for("react.lazy"),I=Symbol.iterator;function x(V){return V===null||typeof V!="object"?null:(V=I&&V[I]||V["@@iterator"],typeof V=="function"?V:null)}var O={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},q=Object.assign,$={};function B(V,G,Te){this.props=V,this.context=G,this.refs=$,this.updater=Te||O}B.prototype.isReactComponent={},B.prototype.setState=function(V,G){if(typeof V!="object"&&typeof V!="function"&&V!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,V,G,"setState")},B.prototype.forceUpdate=function(V){this.updater.enqueueForceUpdate(this,V,"forceUpdate")};function Z(){}Z.prototype=B.prototype;function ae(V,G,Te){this.props=V,this.context=G,this.refs=$,this.updater=Te||O}var me=ae.prototype=new Z;me.constructor=ae,q(me,B.prototype),me.isPureReactComponent=!0;var Se=Array.isArray,Me=Object.prototype.hasOwnProperty,Ae={current:null},R={key:!0,ref:!0,__self:!0,__source:!0};function S(V,G,Te){var Ie,ke={},Ce=null,Ue=null;if(G!=null)for(Ie in G.ref!==void 0&&(Ue=G.ref),G.key!==void 0&&(Ce=""+G.key),G)Me.call(G,Ie)&&!R.hasOwnProperty(Ie)&&(ke[Ie]=G[Ie]);var Ve=arguments.length-2;if(Ve===1)ke.children=Te;else if(1<Ve){for(var $e=Array(Ve),qt=0;qt<Ve;qt++)$e[qt]=arguments[qt+2];ke.children=$e}if(V&&V.defaultProps)for(Ie in Ve=V.defaultProps,Ve)ke[Ie]===void 0&&(ke[Ie]=Ve[Ie]);return{$$typeof:r,type:V,key:Ce,ref:Ue,props:ke,_owner:Ae.current}}function C(V,G){return{$$typeof:r,type:V.type,key:G,ref:V.ref,props:V.props,_owner:V._owner}}function D(V){return typeof V=="object"&&V!==null&&V.$$typeof===r}function N(V){var G={"=":"=0",":":"=2"};return"$"+V.replace(/[=:]/g,function(Te){return G[Te]})}var M=/\/+/g;function k(V,G){return typeof V=="object"&&V!==null&&V.key!=null?N(""+V.key):G.toString(36)}function He(V,G,Te,Ie,ke){var Ce=typeof V;(Ce==="undefined"||Ce==="boolean")&&(V=null);var Ue=!1;if(V===null)Ue=!0;else switch(Ce){case"string":case"number":Ue=!0;break;case"object":switch(V.$$typeof){case r:case e:Ue=!0}}if(Ue)return Ue=V,ke=ke(Ue),V=Ie===""?"."+k(Ue,0):Ie,Se(ke)?(Te="",V!=null&&(Te=V.replace(M,"$&/")+"/"),He(ke,G,Te,"",function(qt){return qt})):ke!=null&&(D(ke)&&(ke=C(ke,Te+(!ke.key||Ue&&Ue.key===ke.key?"":(""+ke.key).replace(M,"$&/")+"/")+V)),G.push(ke)),1;if(Ue=0,Ie=Ie===""?".":Ie+":",Se(V))for(var Ve=0;Ve<V.length;Ve++){Ce=V[Ve];var $e=Ie+k(Ce,Ve);Ue+=He(Ce,G,Te,$e,ke)}else if($e=x(V),typeof $e=="function")for(V=$e.call(V),Ve=0;!(Ce=V.next()).done;)Ce=Ce.value,$e=Ie+k(Ce,Ve++),Ue+=He(Ce,G,Te,$e,ke);else if(Ce==="object")throw G=String(V),Error("Objects are not valid as a React child (found: "+(G==="[object Object]"?"object with keys {"+Object.keys(V).join(", ")+"}":G)+"). If you meant to render a collection of children, use an array instead.");return Ue}function Tt(V,G,Te){if(V==null)return V;var Ie=[],ke=0;return He(V,Ie,"","",function(Ce){return G.call(Te,Ce,ke++)}),Ie}function Vt(V){if(V._status===-1){var G=V._result;G=G(),G.then(function(Te){(V._status===0||V._status===-1)&&(V._status=1,V._result=Te)},function(Te){(V._status===0||V._status===-1)&&(V._status=2,V._result=Te)}),V._status===-1&&(V._status=0,V._result=G)}if(V._status===1)return V._result.default;throw V._result}var Xe={current:null},ee={transition:null},he={ReactCurrentDispatcher:Xe,ReactCurrentBatchConfig:ee,ReactCurrentOwner:Ae};function se(){throw Error("act(...) is not supported in production builds of React.")}return xe.Children={map:Tt,forEach:function(V,G,Te){Tt(V,function(){G.apply(this,arguments)},Te)},count:function(V){var G=0;return Tt(V,function(){G++}),G},toArray:function(V){return Tt(V,function(G){return G})||[]},only:function(V){if(!D(V))throw Error("React.Children.only expected to receive a single React element child.");return V}},xe.Component=B,xe.Fragment=t,xe.Profiler=o,xe.PureComponent=ae,xe.StrictMode=i,xe.Suspense=g,xe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=he,xe.act=se,xe.cloneElement=function(V,G,Te){if(V==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+V+".");var Ie=q({},V.props),ke=V.key,Ce=V.ref,Ue=V._owner;if(G!=null){if(G.ref!==void 0&&(Ce=G.ref,Ue=Ae.current),G.key!==void 0&&(ke=""+G.key),V.type&&V.type.defaultProps)var Ve=V.type.defaultProps;for($e in G)Me.call(G,$e)&&!R.hasOwnProperty($e)&&(Ie[$e]=G[$e]===void 0&&Ve!==void 0?Ve[$e]:G[$e])}var $e=arguments.length-2;if($e===1)Ie.children=Te;else if(1<$e){Ve=Array($e);for(var qt=0;qt<$e;qt++)Ve[qt]=arguments[qt+2];Ie.children=Ve}return{$$typeof:r,type:V.type,key:ke,ref:Ce,props:Ie,_owner:Ue}},xe.createContext=function(V){return V={$$typeof:h,_currentValue:V,_currentValue2:V,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},V.Provider={$$typeof:l,_context:V},V.Consumer=V},xe.createElement=S,xe.createFactory=function(V){var G=S.bind(null,V);return G.type=V,G},xe.createRef=function(){return{current:null}},xe.forwardRef=function(V){return{$$typeof:p,render:V}},xe.isValidElement=D,xe.lazy=function(V){return{$$typeof:E,_payload:{_status:-1,_result:V},_init:Vt}},xe.memo=function(V,G){return{$$typeof:y,type:V,compare:G===void 0?null:G}},xe.startTransition=function(V){var G=ee.transition;ee.transition={};try{V()}finally{ee.transition=G}},xe.unstable_act=se,xe.useCallback=function(V,G){return Xe.current.useCallback(V,G)},xe.useContext=function(V){return Xe.current.useContext(V)},xe.useDebugValue=function(){},xe.useDeferredValue=function(V){return Xe.current.useDeferredValue(V)},xe.useEffect=function(V,G){return Xe.current.useEffect(V,G)},xe.useId=function(){return Xe.current.useId()},xe.useImperativeHandle=function(V,G,Te){return Xe.current.useImperativeHandle(V,G,Te)},xe.useInsertionEffect=function(V,G){return Xe.current.useInsertionEffect(V,G)},xe.useLayoutEffect=function(V,G){return Xe.current.useLayoutEffect(V,G)},xe.useMemo=function(V,G){return Xe.current.useMemo(V,G)},xe.useReducer=function(V,G,Te){return Xe.current.useReducer(V,G,Te)},xe.useRef=function(V){return Xe.current.useRef(V)},xe.useState=function(V){return Xe.current.useState(V)},xe.useSyncExternalStore=function(V,G,Te){return Xe.current.useSyncExternalStore(V,G,Te)},xe.useTransition=function(){return Xe.current.useTransition()},xe.version="18.3.1",xe}var Sg;function df(){return Sg||(Sg=1,vd.exports=tw()),vd.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ag;function nw(){if(Ag)return ba;Ag=1;var r=df(),e=Symbol.for("react.element"),t=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,o=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function h(p,g,y){var E,I={},x=null,O=null;y!==void 0&&(x=""+y),g.key!==void 0&&(x=""+g.key),g.ref!==void 0&&(O=g.ref);for(E in g)i.call(g,E)&&!l.hasOwnProperty(E)&&(I[E]=g[E]);if(p&&p.defaultProps)for(E in g=p.defaultProps,g)I[E]===void 0&&(I[E]=g[E]);return{$$typeof:e,type:p,key:x,ref:O,props:I,_owner:o.current}}return ba.Fragment=t,ba.jsx=h,ba.jsxs=h,ba}var xg;function rw(){return xg||(xg=1,_d.exports=nw()),_d.exports}var w=rw(),pe=df(),Ou={},Ed={exports:{}},en={},wd={exports:{}},Td={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var kg;function sw(){return kg||(kg=1,(function(r){function e(ee,he){var se=ee.length;ee.push(he);e:for(;0<se;){var V=se-1>>>1,G=ee[V];if(0<o(G,he))ee[V]=he,ee[se]=G,se=V;else break e}}function t(ee){return ee.length===0?null:ee[0]}function i(ee){if(ee.length===0)return null;var he=ee[0],se=ee.pop();if(se!==he){ee[0]=se;e:for(var V=0,G=ee.length,Te=G>>>1;V<Te;){var Ie=2*(V+1)-1,ke=ee[Ie],Ce=Ie+1,Ue=ee[Ce];if(0>o(ke,se))Ce<G&&0>o(Ue,ke)?(ee[V]=Ue,ee[Ce]=se,V=Ce):(ee[V]=ke,ee[Ie]=se,V=Ie);else if(Ce<G&&0>o(Ue,se))ee[V]=Ue,ee[Ce]=se,V=Ce;else break e}}return he}function o(ee,he){var se=ee.sortIndex-he.sortIndex;return se!==0?se:ee.id-he.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;r.unstable_now=function(){return l.now()}}else{var h=Date,p=h.now();r.unstable_now=function(){return h.now()-p}}var g=[],y=[],E=1,I=null,x=3,O=!1,q=!1,$=!1,B=typeof setTimeout=="function"?setTimeout:null,Z=typeof clearTimeout=="function"?clearTimeout:null,ae=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function me(ee){for(var he=t(y);he!==null;){if(he.callback===null)i(y);else if(he.startTime<=ee)i(y),he.sortIndex=he.expirationTime,e(g,he);else break;he=t(y)}}function Se(ee){if($=!1,me(ee),!q)if(t(g)!==null)q=!0,Vt(Me);else{var he=t(y);he!==null&&Xe(Se,he.startTime-ee)}}function Me(ee,he){q=!1,$&&($=!1,Z(S),S=-1),O=!0;var se=x;try{for(me(he),I=t(g);I!==null&&(!(I.expirationTime>he)||ee&&!N());){var V=I.callback;if(typeof V=="function"){I.callback=null,x=I.priorityLevel;var G=V(I.expirationTime<=he);he=r.unstable_now(),typeof G=="function"?I.callback=G:I===t(g)&&i(g),me(he)}else i(g);I=t(g)}if(I!==null)var Te=!0;else{var Ie=t(y);Ie!==null&&Xe(Se,Ie.startTime-he),Te=!1}return Te}finally{I=null,x=se,O=!1}}var Ae=!1,R=null,S=-1,C=5,D=-1;function N(){return!(r.unstable_now()-D<C)}function M(){if(R!==null){var ee=r.unstable_now();D=ee;var he=!0;try{he=R(!0,ee)}finally{he?k():(Ae=!1,R=null)}}else Ae=!1}var k;if(typeof ae=="function")k=function(){ae(M)};else if(typeof MessageChannel<"u"){var He=new MessageChannel,Tt=He.port2;He.port1.onmessage=M,k=function(){Tt.postMessage(null)}}else k=function(){B(M,0)};function Vt(ee){R=ee,Ae||(Ae=!0,k())}function Xe(ee,he){S=B(function(){ee(r.unstable_now())},he)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(ee){ee.callback=null},r.unstable_continueExecution=function(){q||O||(q=!0,Vt(Me))},r.unstable_forceFrameRate=function(ee){0>ee||125<ee?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):C=0<ee?Math.floor(1e3/ee):5},r.unstable_getCurrentPriorityLevel=function(){return x},r.unstable_getFirstCallbackNode=function(){return t(g)},r.unstable_next=function(ee){switch(x){case 1:case 2:case 3:var he=3;break;default:he=x}var se=x;x=he;try{return ee()}finally{x=se}},r.unstable_pauseExecution=function(){},r.unstable_requestPaint=function(){},r.unstable_runWithPriority=function(ee,he){switch(ee){case 1:case 2:case 3:case 4:case 5:break;default:ee=3}var se=x;x=ee;try{return he()}finally{x=se}},r.unstable_scheduleCallback=function(ee,he,se){var V=r.unstable_now();switch(typeof se=="object"&&se!==null?(se=se.delay,se=typeof se=="number"&&0<se?V+se:V):se=V,ee){case 1:var G=-1;break;case 2:G=250;break;case 5:G=1073741823;break;case 4:G=1e4;break;default:G=5e3}return G=se+G,ee={id:E++,callback:he,priorityLevel:ee,startTime:se,expirationTime:G,sortIndex:-1},se>V?(ee.sortIndex=se,e(y,ee),t(g)===null&&ee===t(y)&&($?(Z(S),S=-1):$=!0,Xe(Se,se-V))):(ee.sortIndex=G,e(g,ee),q||O||(q=!0,Vt(Me))),ee},r.unstable_shouldYield=N,r.unstable_wrapCallback=function(ee){var he=x;return function(){var se=x;x=he;try{return ee.apply(this,arguments)}finally{x=se}}}})(Td)),Td}var Cg;function iw(){return Cg||(Cg=1,wd.exports=sw()),wd.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Rg;function ow(){if(Rg)return en;Rg=1;var r=df(),e=iw();function t(n){for(var s="https://reactjs.org/docs/error-decoder.html?invariant="+n,a=1;a<arguments.length;a++)s+="&args[]="+encodeURIComponent(arguments[a]);return"Minified React error #"+n+"; visit "+s+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var i=new Set,o={};function l(n,s){h(n,s),h(n+"Capture",s)}function h(n,s){for(o[n]=s,n=0;n<s.length;n++)i.add(s[n])}var p=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),g=Object.prototype.hasOwnProperty,y=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,E={},I={};function x(n){return g.call(I,n)?!0:g.call(E,n)?!1:y.test(n)?I[n]=!0:(E[n]=!0,!1)}function O(n,s,a,c){if(a!==null&&a.type===0)return!1;switch(typeof s){case"function":case"symbol":return!0;case"boolean":return c?!1:a!==null?!a.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function q(n,s,a,c){if(s===null||typeof s>"u"||O(n,s,a,c))return!0;if(c)return!1;if(a!==null)switch(a.type){case 3:return!s;case 4:return s===!1;case 5:return isNaN(s);case 6:return isNaN(s)||1>s}return!1}function $(n,s,a,c,d,f,v){this.acceptsBooleans=s===2||s===3||s===4,this.attributeName=c,this.attributeNamespace=d,this.mustUseProperty=a,this.propertyName=n,this.type=s,this.sanitizeURL=f,this.removeEmptyString=v}var B={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){B[n]=new $(n,0,!1,n,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var s=n[0];B[s]=new $(s,1,!1,n[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(n){B[n]=new $(n,2,!1,n.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){B[n]=new $(n,2,!1,n,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){B[n]=new $(n,3,!1,n.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(n){B[n]=new $(n,3,!0,n,null,!1,!1)}),["capture","download"].forEach(function(n){B[n]=new $(n,4,!1,n,null,!1,!1)}),["cols","rows","size","span"].forEach(function(n){B[n]=new $(n,6,!1,n,null,!1,!1)}),["rowSpan","start"].forEach(function(n){B[n]=new $(n,5,!1,n.toLowerCase(),null,!1,!1)});var Z=/[\-:]([a-z])/g;function ae(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var s=n.replace(Z,ae);B[s]=new $(s,1,!1,n,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var s=n.replace(Z,ae);B[s]=new $(s,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(n){var s=n.replace(Z,ae);B[s]=new $(s,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(n){B[n]=new $(n,1,!1,n.toLowerCase(),null,!1,!1)}),B.xlinkHref=new $("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(n){B[n]=new $(n,1,!1,n.toLowerCase(),null,!0,!0)});function me(n,s,a,c){var d=B.hasOwnProperty(s)?B[s]:null;(d!==null?d.type!==0:c||!(2<s.length)||s[0]!=="o"&&s[0]!=="O"||s[1]!=="n"&&s[1]!=="N")&&(q(s,a,d,c)&&(a=null),c||d===null?x(s)&&(a===null?n.removeAttribute(s):n.setAttribute(s,""+a)):d.mustUseProperty?n[d.propertyName]=a===null?d.type===3?!1:"":a:(s=d.attributeName,c=d.attributeNamespace,a===null?n.removeAttribute(s):(d=d.type,a=d===3||d===4&&a===!0?"":""+a,c?n.setAttributeNS(c,s,a):n.setAttribute(s,a))))}var Se=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Me=Symbol.for("react.element"),Ae=Symbol.for("react.portal"),R=Symbol.for("react.fragment"),S=Symbol.for("react.strict_mode"),C=Symbol.for("react.profiler"),D=Symbol.for("react.provider"),N=Symbol.for("react.context"),M=Symbol.for("react.forward_ref"),k=Symbol.for("react.suspense"),He=Symbol.for("react.suspense_list"),Tt=Symbol.for("react.memo"),Vt=Symbol.for("react.lazy"),Xe=Symbol.for("react.offscreen"),ee=Symbol.iterator;function he(n){return n===null||typeof n!="object"?null:(n=ee&&n[ee]||n["@@iterator"],typeof n=="function"?n:null)}var se=Object.assign,V;function G(n){if(V===void 0)try{throw Error()}catch(a){var s=a.stack.trim().match(/\n( *(at )?)/);V=s&&s[1]||""}return`
`+V+n}var Te=!1;function Ie(n,s){if(!n||Te)return"";Te=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(s)if(s=function(){throw Error()},Object.defineProperty(s.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(s,[])}catch(U){var c=U}Reflect.construct(n,[],s)}else{try{s.call()}catch(U){c=U}n.call(s.prototype)}else{try{throw Error()}catch(U){c=U}n()}}catch(U){if(U&&c&&typeof U.stack=="string"){for(var d=U.stack.split(`
`),f=c.stack.split(`
`),v=d.length-1,A=f.length-1;1<=v&&0<=A&&d[v]!==f[A];)A--;for(;1<=v&&0<=A;v--,A--)if(d[v]!==f[A]){if(v!==1||A!==1)do if(v--,A--,0>A||d[v]!==f[A]){var P=`
`+d[v].replace(" at new "," at ");return n.displayName&&P.includes("<anonymous>")&&(P=P.replace("<anonymous>",n.displayName)),P}while(1<=v&&0<=A);break}}}finally{Te=!1,Error.prepareStackTrace=a}return(n=n?n.displayName||n.name:"")?G(n):""}function ke(n){switch(n.tag){case 5:return G(n.type);case 16:return G("Lazy");case 13:return G("Suspense");case 19:return G("SuspenseList");case 0:case 2:case 15:return n=Ie(n.type,!1),n;case 11:return n=Ie(n.type.render,!1),n;case 1:return n=Ie(n.type,!0),n;default:return""}}function Ce(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case R:return"Fragment";case Ae:return"Portal";case C:return"Profiler";case S:return"StrictMode";case k:return"Suspense";case He:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case N:return(n.displayName||"Context")+".Consumer";case D:return(n._context.displayName||"Context")+".Provider";case M:var s=n.render;return n=n.displayName,n||(n=s.displayName||s.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case Tt:return s=n.displayName||null,s!==null?s:Ce(n.type)||"Memo";case Vt:s=n._payload,n=n._init;try{return Ce(n(s))}catch{}}return null}function Ue(n){var s=n.type;switch(n.tag){case 24:return"Cache";case 9:return(s.displayName||"Context")+".Consumer";case 10:return(s._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=s.render,n=n.displayName||n.name||"",s.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return s;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ce(s);case 8:return s===S?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof s=="function")return s.displayName||s.name||null;if(typeof s=="string")return s}return null}function Ve(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function $e(n){var s=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(s==="checkbox"||s==="radio")}function qt(n){var s=$e(n)?"checked":"value",a=Object.getOwnPropertyDescriptor(n.constructor.prototype,s),c=""+n[s];if(!n.hasOwnProperty(s)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var d=a.get,f=a.set;return Object.defineProperty(n,s,{configurable:!0,get:function(){return d.call(this)},set:function(v){c=""+v,f.call(this,v)}}),Object.defineProperty(n,s,{enumerable:a.enumerable}),{getValue:function(){return c},setValue:function(v){c=""+v},stopTracking:function(){n._valueTracker=null,delete n[s]}}}}function Ai(n){n._valueTracker||(n._valueTracker=qt(n))}function jo(n){if(!n)return!1;var s=n._valueTracker;if(!s)return!0;var a=s.getValue(),c="";return n&&(c=$e(n)?n.checked?"true":"false":n.value),n=c,n!==a?(s.setValue(n),!0):!1}function Ur(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function xi(n,s){var a=s.checked;return se({},s,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:a??n._wrapperState.initialChecked})}function El(n,s){var a=s.defaultValue==null?"":s.defaultValue,c=s.checked!=null?s.checked:s.defaultChecked;a=Ve(s.value!=null?s.value:a),n._wrapperState={initialChecked:c,initialValue:a,controlled:s.type==="checkbox"||s.type==="radio"?s.checked!=null:s.value!=null}}function ki(n,s){s=s.checked,s!=null&&me(n,"checked",s,!1)}function Ms(n,s){ki(n,s);var a=Ve(s.value),c=s.type;if(a!=null)c==="number"?(a===0&&n.value===""||n.value!=a)&&(n.value=""+a):n.value!==""+a&&(n.value=""+a);else if(c==="submit"||c==="reset"){n.removeAttribute("value");return}s.hasOwnProperty("value")?dt(n,s.type,a):s.hasOwnProperty("defaultValue")&&dt(n,s.type,Ve(s.defaultValue)),s.checked==null&&s.defaultChecked!=null&&(n.defaultChecked=!!s.defaultChecked)}function Fo(n,s,a){if(s.hasOwnProperty("value")||s.hasOwnProperty("defaultValue")){var c=s.type;if(!(c!=="submit"&&c!=="reset"||s.value!==void 0&&s.value!==null))return;s=""+n._wrapperState.initialValue,a||s===n.value||(n.value=s),n.defaultValue=s}a=n.name,a!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,a!==""&&(n.name=a)}function dt(n,s,a){(s!=="number"||Ur(n.ownerDocument)!==n)&&(a==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+a&&(n.defaultValue=""+a))}var ot=Array.isArray;function xn(n,s,a,c){if(n=n.options,s){s={};for(var d=0;d<a.length;d++)s["$"+a[d]]=!0;for(a=0;a<n.length;a++)d=s.hasOwnProperty("$"+n[a].value),n[a].selected!==d&&(n[a].selected=d),d&&c&&(n[a].defaultSelected=!0)}else{for(a=""+Ve(a),s=null,d=0;d<n.length;d++){if(n[d].value===a){n[d].selected=!0,c&&(n[d].defaultSelected=!0);return}s!==null||n[d].disabled||(s=n[d])}s!==null&&(s.selected=!0)}}function Uo(n,s){if(s.dangerouslySetInnerHTML!=null)throw Error(t(91));return se({},s,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function zo(n,s){var a=s.value;if(a==null){if(a=s.children,s=s.defaultValue,a!=null){if(s!=null)throw Error(t(92));if(ot(a)){if(1<a.length)throw Error(t(93));a=a[0]}s=a}s==null&&(s=""),a=s}n._wrapperState={initialValue:Ve(a)}}function wl(n,s){var a=Ve(s.value),c=Ve(s.defaultValue);a!=null&&(a=""+a,a!==n.value&&(n.value=a),s.defaultValue==null&&n.defaultValue!==a&&(n.defaultValue=a)),c!=null&&(n.defaultValue=""+c)}function zr(n){var s=n.textContent;s===n._wrapperState.initialValue&&s!==""&&s!==null&&(n.value=s)}function Bo(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ci(n,s){return n==null||n==="http://www.w3.org/1999/xhtml"?Bo(s):n==="http://www.w3.org/2000/svg"&&s==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var Br,Tl=(function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(s,a,c,d){MSApp.execUnsafeLocalFunction(function(){return n(s,a,c,d)})}:n})(function(n,s){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=s;else{for(Br=Br||document.createElement("div"),Br.innerHTML="<svg>"+s.valueOf().toString()+"</svg>",s=Br.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;s.firstChild;)n.appendChild(s.firstChild)}});function Ls(n,s){if(s){var a=n.firstChild;if(a&&a===n.lastChild&&a.nodeType===3){a.nodeValue=s;return}}n.textContent=s}var $r={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Il=["Webkit","ms","Moz","O"];Object.keys($r).forEach(function(n){Il.forEach(function(s){s=s+n.charAt(0).toUpperCase()+n.substring(1),$r[s]=$r[n]})});function qr(n,s,a){return s==null||typeof s=="boolean"||s===""?"":a||typeof s!="number"||s===0||$r.hasOwnProperty(n)&&$r[n]?(""+s).trim():s+"px"}function Ri(n,s){n=n.style;for(var a in s)if(s.hasOwnProperty(a)){var c=a.indexOf("--")===0,d=qr(a,s[a],c);a==="float"&&(a="cssFloat"),c?n.setProperty(a,d):n[a]=d}}var $o=se({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function kn(n,s){if(s){if($o[n]&&(s.children!=null||s.dangerouslySetInnerHTML!=null))throw Error(t(137,n));if(s.dangerouslySetInnerHTML!=null){if(s.children!=null)throw Error(t(60));if(typeof s.dangerouslySetInnerHTML!="object"||!("__html"in s.dangerouslySetInnerHTML))throw Error(t(61))}if(s.style!=null&&typeof s.style!="object")throw Error(t(62))}}function Pi(n,s){if(n.indexOf("-")===-1)return typeof s.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Hr=null;function Ni(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var fr=null,pr=null,rt=null;function qo(n){if(n=ya(n)){if(typeof fr!="function")throw Error(t(280));var s=n.stateNode;s&&(s=Yl(s),fr(n.stateNode,n.type,s))}}function Wr(n){pr?rt?rt.push(n):rt=[n]:pr=n}function Gr(){if(pr){var n=pr,s=rt;if(rt=pr=null,qo(n),s)for(n=0;n<s.length;n++)qo(s[n])}}function Sl(n,s){return n(s)}function Al(){}var zn=!1;function xl(n,s,a){if(zn)return n(s,a);zn=!0;try{return Sl(n,s,a)}finally{zn=!1,(pr!==null||rt!==null)&&(Al(),Gr())}}function js(n,s){var a=n.stateNode;if(a===null)return null;var c=Yl(a);if(c===null)return null;a=c[s];e:switch(s){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(c=!c.disabled)||(n=n.type,c=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!c;break e;default:n=!1}if(n)return null;if(a&&typeof a!="function")throw Error(t(231,s,typeof a));return a}var Kr=!1;if(p)try{var Qr={};Object.defineProperty(Qr,"passive",{get:function(){Kr=!0}}),window.addEventListener("test",Qr,Qr),window.removeEventListener("test",Qr,Qr)}catch{Kr=!1}function kl(n,s,a,c,d,f,v,A,P){var U=Array.prototype.slice.call(arguments,3);try{s.apply(a,U)}catch(Q){this.onError(Q)}}var mr=!1,Bn=null,bi=!1,gn=null,Cl={onError:function(n){mr=!0,Bn=n}};function Rl(n,s,a,c,d,f,v,A,P){mr=!1,Bn=null,kl.apply(Cl,arguments)}function Ho(n,s,a,c,d,f,v,A,P){if(Rl.apply(this,arguments),mr){if(mr){var U=Bn;mr=!1,Bn=null}else throw Error(t(198));bi||(bi=!0,gn=U)}}function Cn(n){var s=n,a=n;if(n.alternate)for(;s.return;)s=s.return;else{n=s;do s=n,(s.flags&4098)!==0&&(a=s.return),n=s.return;while(n)}return s.tag===3?a:null}function Wo(n){if(n.tag===13){var s=n.memoizedState;if(s===null&&(n=n.alternate,n!==null&&(s=n.memoizedState)),s!==null)return s.dehydrated}return null}function Pl(n){if(Cn(n)!==n)throw Error(t(188))}function Nl(n){var s=n.alternate;if(!s){if(s=Cn(n),s===null)throw Error(t(188));return s!==n?null:n}for(var a=n,c=s;;){var d=a.return;if(d===null)break;var f=d.alternate;if(f===null){if(c=d.return,c!==null){a=c;continue}break}if(d.child===f.child){for(f=d.child;f;){if(f===a)return Pl(d),n;if(f===c)return Pl(d),s;f=f.sibling}throw Error(t(188))}if(a.return!==c.return)a=d,c=f;else{for(var v=!1,A=d.child;A;){if(A===a){v=!0,a=d,c=f;break}if(A===c){v=!0,c=d,a=f;break}A=A.sibling}if(!v){for(A=f.child;A;){if(A===a){v=!0,a=f,c=d;break}if(A===c){v=!0,c=f,a=d;break}A=A.sibling}if(!v)throw Error(t(189))}}if(a.alternate!==c)throw Error(t(190))}if(a.tag!==3)throw Error(t(188));return a.stateNode.current===a?n:s}function bl(n){return n=Nl(n),n!==null?Fs(n):null}function Fs(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var s=Fs(n);if(s!==null)return s;n=n.sibling}return null}var Go=e.unstable_scheduleCallback,Di=e.unstable_cancelCallback,Us=e.unstable_shouldYield,gr=e.unstable_requestPaint,Ke=e.unstable_now,Qc=e.unstable_getCurrentPriorityLevel,Vi=e.unstable_ImmediatePriority,Ko=e.unstable_UserBlockingPriority,zs=e.unstable_NormalPriority,Qo=e.unstable_LowPriority,Oi=e.unstable_IdlePriority,Bs=null,sn=null;function Dl(n){if(sn&&typeof sn.onCommitFiberRoot=="function")try{sn.onCommitFiberRoot(Bs,n,void 0,(n.current.flags&128)===128)}catch{}}var on=Math.clz32?Math.clz32:$s,$n=Math.log,yn=Math.LN2;function $s(n){return n>>>=0,n===0?32:31-($n(n)/yn|0)|0}var qn=64,Yr=4194304;function Fe(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function yr(n,s){var a=n.pendingLanes;if(a===0)return 0;var c=0,d=n.suspendedLanes,f=n.pingedLanes,v=a&268435455;if(v!==0){var A=v&~d;A!==0?c=Fe(A):(f&=v,f!==0&&(c=Fe(f)))}else v=a&~d,v!==0?c=Fe(v):f!==0&&(c=Fe(f));if(c===0)return 0;if(s!==0&&s!==c&&(s&d)===0&&(d=c&-c,f=s&-s,d>=f||d===16&&(f&4194240)!==0))return s;if((c&4)!==0&&(c|=a&16),s=n.entangledLanes,s!==0)for(n=n.entanglements,s&=c;0<s;)a=31-on(s),d=1<<a,c|=n[a],s&=~d;return c}function qs(n,s){switch(n){case 1:case 2:case 4:return s+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return s+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Hs(n,s){for(var a=n.suspendedLanes,c=n.pingedLanes,d=n.expirationTimes,f=n.pendingLanes;0<f;){var v=31-on(f),A=1<<v,P=d[v];P===-1?((A&a)===0||(A&c)!==0)&&(d[v]=qs(A,s)):P<=s&&(n.expiredLanes|=A),f&=~A}}function Yo(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function Jo(){var n=qn;return qn<<=1,(qn&4194240)===0&&(qn=64),n}function Xo(n){for(var s=[],a=0;31>a;a++)s.push(n);return s}function Ws(n,s,a){n.pendingLanes|=s,s!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,s=31-on(s),n[s]=a}function Yc(n,s){var a=n.pendingLanes&~s;n.pendingLanes=s,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=s,n.mutableReadLanes&=s,n.entangledLanes&=s,s=n.entanglements;var c=n.eventTimes;for(n=n.expirationTimes;0<a;){var d=31-on(a),f=1<<d;s[d]=0,c[d]=-1,n[d]=-1,a&=~f}}function Zo(n,s){var a=n.entangledLanes|=s;for(n=n.entanglements;a;){var c=31-on(a),d=1<<c;d&s|n[c]&s&&(n[c]|=s),a&=~d}}var be=0;function Hn(n){return n&=-n,1<n?4<n?(n&268435455)!==0?16:536870912:4:1}var ea,Mi,ta,na,ra,Wn=!1,Li=[],Gn=null,Kn=null,kt=null,Gs=new Map,_r=new Map,an=[],Vl="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Jr(n,s){switch(n){case"focusin":case"focusout":Gn=null;break;case"dragenter":case"dragleave":Kn=null;break;case"mouseover":case"mouseout":kt=null;break;case"pointerover":case"pointerout":Gs.delete(s.pointerId);break;case"gotpointercapture":case"lostpointercapture":_r.delete(s.pointerId)}}function Rn(n,s,a,c,d,f){return n===null||n.nativeEvent!==f?(n={blockedOn:s,domEventName:a,eventSystemFlags:c,nativeEvent:f,targetContainers:[d]},s!==null&&(s=ya(s),s!==null&&Mi(s)),n):(n.eventSystemFlags|=c,s=n.targetContainers,d!==null&&s.indexOf(d)===-1&&s.push(d),n)}function Ol(n,s,a,c,d){switch(s){case"focusin":return Gn=Rn(Gn,n,s,a,c,d),!0;case"dragenter":return Kn=Rn(Kn,n,s,a,c,d),!0;case"mouseover":return kt=Rn(kt,n,s,a,c,d),!0;case"pointerover":var f=d.pointerId;return Gs.set(f,Rn(Gs.get(f)||null,n,s,a,c,d)),!0;case"gotpointercapture":return f=d.pointerId,_r.set(f,Rn(_r.get(f)||null,n,s,a,c,d)),!0}return!1}function ji(n){var s=Js(n.target);if(s!==null){var a=Cn(s);if(a!==null){if(s=a.tag,s===13){if(s=Wo(a),s!==null){n.blockedOn=s,ra(n.priority,function(){ta(a)});return}}else if(s===3&&a.stateNode.current.memoizedState.isDehydrated){n.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}n.blockedOn=null}function qe(n){if(n.blockedOn!==null)return!1;for(var s=n.targetContainers;0<s.length;){var a=Fi(n.domEventName,n.eventSystemFlags,s[0],n.nativeEvent);if(a===null){a=n.nativeEvent;var c=new a.constructor(a.type,a);Hr=c,a.target.dispatchEvent(c),Hr=null}else return s=ya(a),s!==null&&Mi(s),n.blockedOn=a,!1;s.shift()}return!0}function Ml(n,s,a){qe(n)&&a.delete(s)}function Jc(){Wn=!1,Gn!==null&&qe(Gn)&&(Gn=null),Kn!==null&&qe(Kn)&&(Kn=null),kt!==null&&qe(kt)&&(kt=null),Gs.forEach(Ml),_r.forEach(Ml)}function Xr(n,s){n.blockedOn===s&&(n.blockedOn=null,Wn||(Wn=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,Jc)))}function Zr(n){function s(d){return Xr(d,n)}if(0<Li.length){Xr(Li[0],n);for(var a=1;a<Li.length;a++){var c=Li[a];c.blockedOn===n&&(c.blockedOn=null)}}for(Gn!==null&&Xr(Gn,n),Kn!==null&&Xr(Kn,n),kt!==null&&Xr(kt,n),Gs.forEach(s),_r.forEach(s),a=0;a<an.length;a++)c=an[a],c.blockedOn===n&&(c.blockedOn=null);for(;0<an.length&&(a=an[0],a.blockedOn===null);)ji(a),a.blockedOn===null&&an.shift()}var vr=Se.ReactCurrentBatchConfig,Er=!0;function Qn(n,s,a,c){var d=be,f=vr.transition;vr.transition=null;try{be=1,sa(n,s,a,c)}finally{be=d,vr.transition=f}}function Ll(n,s,a,c){var d=be,f=vr.transition;vr.transition=null;try{be=4,sa(n,s,a,c)}finally{be=d,vr.transition=f}}function sa(n,s,a,c){if(Er){var d=Fi(n,s,a,c);if(d===null)lh(n,s,c,Yn,a),Jr(n,c);else if(Ol(d,n,s,a,c))c.stopPropagation();else if(Jr(n,c),s&4&&-1<Vl.indexOf(n)){for(;d!==null;){var f=ya(d);if(f!==null&&ea(f),f=Fi(n,s,a,c),f===null&&lh(n,s,c,Yn,a),f===d)break;d=f}d!==null&&c.stopPropagation()}else lh(n,s,c,null,a)}}var Yn=null;function Fi(n,s,a,c){if(Yn=null,n=Ni(c),n=Js(n),n!==null)if(s=Cn(n),s===null)n=null;else if(a=s.tag,a===13){if(n=Wo(s),n!==null)return n;n=null}else if(a===3){if(s.stateNode.current.memoizedState.isDehydrated)return s.tag===3?s.stateNode.containerInfo:null;n=null}else s!==n&&(n=null);return Yn=n,null}function Ui(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Qc()){case Vi:return 1;case Ko:return 4;case zs:case Qo:return 16;case Oi:return 536870912;default:return 16}default:return 16}}var ln=null,zi=null,wr=null;function jl(){if(wr)return wr;var n,s=zi,a=s.length,c,d="value"in ln?ln.value:ln.textContent,f=d.length;for(n=0;n<a&&s[n]===d[n];n++);var v=a-n;for(c=1;c<=v&&s[a-c]===d[f-c];c++);return wr=d.slice(n,1<c?1-c:void 0)}function Ks(n){var s=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&s===13&&(n=13)):n=s,n===10&&(n=13),32<=n||n===13?n:0}function Jn(){return!0}function ia(){return!1}function Ot(n){function s(a,c,d,f,v){this._reactName=a,this._targetInst=d,this.type=c,this.nativeEvent=f,this.target=v,this.currentTarget=null;for(var A in n)n.hasOwnProperty(A)&&(a=n[A],this[A]=a?a(f):f[A]);return this.isDefaultPrevented=(f.defaultPrevented!=null?f.defaultPrevented:f.returnValue===!1)?Jn:ia,this.isPropagationStopped=ia,this}return se(s.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Jn)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Jn)},persist:function(){},isPersistent:Jn}),s}var Xn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Qs=Ot(Xn),es=se({},Xn,{view:0,detail:0}),Bi=Ot(es),$i,qi,un,Ys=se({},es,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ee,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==un&&(un&&n.type==="mousemove"?($i=n.screenX-un.screenX,qi=n.screenY-un.screenY):qi=$i=0,un=n),$i)},movementY:function(n){return"movementY"in n?n.movementY:qi}}),oa=Ot(Ys),Fl=se({},Ys,{dataTransfer:0}),Ul=Ot(Fl),Hi=se({},es,{relatedTarget:0}),Ct=Ot(Hi),zl=se({},Xn,{animationName:0,elapsedTime:0,pseudoElement:0}),Bl=Ot(zl),ts=se({},Xn,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),u=Ot(ts),m=se({},Xn,{data:0}),_=Ot(m),T={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},j={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},z={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function X(n){var s=this.nativeEvent;return s.getModifierState?s.getModifierState(n):(n=z[n])?!!s[n]:!1}function Ee(){return X}var at=se({},es,{key:function(n){if(n.key){var s=T[n.key]||n.key;if(s!=="Unidentified")return s}return n.type==="keypress"?(n=Ks(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?j[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ee,charCode:function(n){return n.type==="keypress"?Ks(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?Ks(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),Be=Ot(at),ft=se({},Ys,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),cn=Ot(ft),Tr=se({},es,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ee}),Zn=Ot(Tr),er=se({},Xn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Wi=Ot(er),aa=se({},Ys,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),Q0=Ot(aa),Y0=[9,13,27,32],Xc=p&&"CompositionEvent"in window,la=null;p&&"documentMode"in document&&(la=document.documentMode);var J0=p&&"TextEvent"in window&&!la,mp=p&&(!Xc||la&&8<la&&11>=la),gp=" ",yp=!1;function _p(n,s){switch(n){case"keyup":return Y0.indexOf(s.keyCode)!==-1;case"keydown":return s.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function vp(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var Gi=!1;function X0(n,s){switch(n){case"compositionend":return vp(s);case"keypress":return s.which!==32?null:(yp=!0,gp);case"textInput":return n=s.data,n===gp&&yp?null:n;default:return null}}function Z0(n,s){if(Gi)return n==="compositionend"||!Xc&&_p(n,s)?(n=jl(),wr=zi=ln=null,Gi=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(s.ctrlKey||s.altKey||s.metaKey)||s.ctrlKey&&s.altKey){if(s.char&&1<s.char.length)return s.char;if(s.which)return String.fromCharCode(s.which)}return null;case"compositionend":return mp&&s.locale!=="ko"?null:s.data;default:return null}}var eE={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ep(n){var s=n&&n.nodeName&&n.nodeName.toLowerCase();return s==="input"?!!eE[n.type]:s==="textarea"}function wp(n,s,a,c){Wr(c),s=Gl(s,"onChange"),0<s.length&&(a=new Qs("onChange","change",null,a,c),n.push({event:a,listeners:s}))}var ua=null,ca=null;function tE(n){Fp(n,0)}function $l(n){var s=Xi(n);if(jo(s))return n}function nE(n,s){if(n==="change")return s}var Tp=!1;if(p){var Zc;if(p){var eh="oninput"in document;if(!eh){var Ip=document.createElement("div");Ip.setAttribute("oninput","return;"),eh=typeof Ip.oninput=="function"}Zc=eh}else Zc=!1;Tp=Zc&&(!document.documentMode||9<document.documentMode)}function Sp(){ua&&(ua.detachEvent("onpropertychange",Ap),ca=ua=null)}function Ap(n){if(n.propertyName==="value"&&$l(ca)){var s=[];wp(s,ca,n,Ni(n)),xl(tE,s)}}function rE(n,s,a){n==="focusin"?(Sp(),ua=s,ca=a,ua.attachEvent("onpropertychange",Ap)):n==="focusout"&&Sp()}function sE(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return $l(ca)}function iE(n,s){if(n==="click")return $l(s)}function oE(n,s){if(n==="input"||n==="change")return $l(s)}function aE(n,s){return n===s&&(n!==0||1/n===1/s)||n!==n&&s!==s}var Pn=typeof Object.is=="function"?Object.is:aE;function ha(n,s){if(Pn(n,s))return!0;if(typeof n!="object"||n===null||typeof s!="object"||s===null)return!1;var a=Object.keys(n),c=Object.keys(s);if(a.length!==c.length)return!1;for(c=0;c<a.length;c++){var d=a[c];if(!g.call(s,d)||!Pn(n[d],s[d]))return!1}return!0}function xp(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function kp(n,s){var a=xp(n);n=0;for(var c;a;){if(a.nodeType===3){if(c=n+a.textContent.length,n<=s&&c>=s)return{node:a,offset:s-n};n=c}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=xp(a)}}function Cp(n,s){return n&&s?n===s?!0:n&&n.nodeType===3?!1:s&&s.nodeType===3?Cp(n,s.parentNode):"contains"in n?n.contains(s):n.compareDocumentPosition?!!(n.compareDocumentPosition(s)&16):!1:!1}function Rp(){for(var n=window,s=Ur();s instanceof n.HTMLIFrameElement;){try{var a=typeof s.contentWindow.location.href=="string"}catch{a=!1}if(a)n=s.contentWindow;else break;s=Ur(n.document)}return s}function th(n){var s=n&&n.nodeName&&n.nodeName.toLowerCase();return s&&(s==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||s==="textarea"||n.contentEditable==="true")}function lE(n){var s=Rp(),a=n.focusedElem,c=n.selectionRange;if(s!==a&&a&&a.ownerDocument&&Cp(a.ownerDocument.documentElement,a)){if(c!==null&&th(a)){if(s=c.start,n=c.end,n===void 0&&(n=s),"selectionStart"in a)a.selectionStart=s,a.selectionEnd=Math.min(n,a.value.length);else if(n=(s=a.ownerDocument||document)&&s.defaultView||window,n.getSelection){n=n.getSelection();var d=a.textContent.length,f=Math.min(c.start,d);c=c.end===void 0?f:Math.min(c.end,d),!n.extend&&f>c&&(d=c,c=f,f=d),d=kp(a,f);var v=kp(a,c);d&&v&&(n.rangeCount!==1||n.anchorNode!==d.node||n.anchorOffset!==d.offset||n.focusNode!==v.node||n.focusOffset!==v.offset)&&(s=s.createRange(),s.setStart(d.node,d.offset),n.removeAllRanges(),f>c?(n.addRange(s),n.extend(v.node,v.offset)):(s.setEnd(v.node,v.offset),n.addRange(s)))}}for(s=[],n=a;n=n.parentNode;)n.nodeType===1&&s.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof a.focus=="function"&&a.focus(),a=0;a<s.length;a++)n=s[a],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var uE=p&&"documentMode"in document&&11>=document.documentMode,Ki=null,nh=null,da=null,rh=!1;function Pp(n,s,a){var c=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;rh||Ki==null||Ki!==Ur(c)||(c=Ki,"selectionStart"in c&&th(c)?c={start:c.selectionStart,end:c.selectionEnd}:(c=(c.ownerDocument&&c.ownerDocument.defaultView||window).getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}),da&&ha(da,c)||(da=c,c=Gl(nh,"onSelect"),0<c.length&&(s=new Qs("onSelect","select",null,s,a),n.push({event:s,listeners:c}),s.target=Ki)))}function ql(n,s){var a={};return a[n.toLowerCase()]=s.toLowerCase(),a["Webkit"+n]="webkit"+s,a["Moz"+n]="moz"+s,a}var Qi={animationend:ql("Animation","AnimationEnd"),animationiteration:ql("Animation","AnimationIteration"),animationstart:ql("Animation","AnimationStart"),transitionend:ql("Transition","TransitionEnd")},sh={},Np={};p&&(Np=document.createElement("div").style,"AnimationEvent"in window||(delete Qi.animationend.animation,delete Qi.animationiteration.animation,delete Qi.animationstart.animation),"TransitionEvent"in window||delete Qi.transitionend.transition);function Hl(n){if(sh[n])return sh[n];if(!Qi[n])return n;var s=Qi[n],a;for(a in s)if(s.hasOwnProperty(a)&&a in Np)return sh[n]=s[a];return n}var bp=Hl("animationend"),Dp=Hl("animationiteration"),Vp=Hl("animationstart"),Op=Hl("transitionend"),Mp=new Map,Lp="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function ns(n,s){Mp.set(n,s),l(s,[n])}for(var ih=0;ih<Lp.length;ih++){var oh=Lp[ih],cE=oh.toLowerCase(),hE=oh[0].toUpperCase()+oh.slice(1);ns(cE,"on"+hE)}ns(bp,"onAnimationEnd"),ns(Dp,"onAnimationIteration"),ns(Vp,"onAnimationStart"),ns("dblclick","onDoubleClick"),ns("focusin","onFocus"),ns("focusout","onBlur"),ns(Op,"onTransitionEnd"),h("onMouseEnter",["mouseout","mouseover"]),h("onMouseLeave",["mouseout","mouseover"]),h("onPointerEnter",["pointerout","pointerover"]),h("onPointerLeave",["pointerout","pointerover"]),l("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),l("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),l("onBeforeInput",["compositionend","keypress","textInput","paste"]),l("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var fa="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),dE=new Set("cancel close invalid load scroll toggle".split(" ").concat(fa));function jp(n,s,a){var c=n.type||"unknown-event";n.currentTarget=a,Ho(c,s,void 0,n),n.currentTarget=null}function Fp(n,s){s=(s&4)!==0;for(var a=0;a<n.length;a++){var c=n[a],d=c.event;c=c.listeners;e:{var f=void 0;if(s)for(var v=c.length-1;0<=v;v--){var A=c[v],P=A.instance,U=A.currentTarget;if(A=A.listener,P!==f&&d.isPropagationStopped())break e;jp(d,A,U),f=P}else for(v=0;v<c.length;v++){if(A=c[v],P=A.instance,U=A.currentTarget,A=A.listener,P!==f&&d.isPropagationStopped())break e;jp(d,A,U),f=P}}}if(bi)throw n=gn,bi=!1,gn=null,n}function Qe(n,s){var a=s[ph];a===void 0&&(a=s[ph]=new Set);var c=n+"__bubble";a.has(c)||(Up(s,n,2,!1),a.add(c))}function ah(n,s,a){var c=0;s&&(c|=4),Up(a,n,c,s)}var Wl="_reactListening"+Math.random().toString(36).slice(2);function pa(n){if(!n[Wl]){n[Wl]=!0,i.forEach(function(a){a!=="selectionchange"&&(dE.has(a)||ah(a,!1,n),ah(a,!0,n))});var s=n.nodeType===9?n:n.ownerDocument;s===null||s[Wl]||(s[Wl]=!0,ah("selectionchange",!1,s))}}function Up(n,s,a,c){switch(Ui(s)){case 1:var d=Qn;break;case 4:d=Ll;break;default:d=sa}a=d.bind(null,s,a,n),d=void 0,!Kr||s!=="touchstart"&&s!=="touchmove"&&s!=="wheel"||(d=!0),c?d!==void 0?n.addEventListener(s,a,{capture:!0,passive:d}):n.addEventListener(s,a,!0):d!==void 0?n.addEventListener(s,a,{passive:d}):n.addEventListener(s,a,!1)}function lh(n,s,a,c,d){var f=c;if((s&1)===0&&(s&2)===0&&c!==null)e:for(;;){if(c===null)return;var v=c.tag;if(v===3||v===4){var A=c.stateNode.containerInfo;if(A===d||A.nodeType===8&&A.parentNode===d)break;if(v===4)for(v=c.return;v!==null;){var P=v.tag;if((P===3||P===4)&&(P=v.stateNode.containerInfo,P===d||P.nodeType===8&&P.parentNode===d))return;v=v.return}for(;A!==null;){if(v=Js(A),v===null)return;if(P=v.tag,P===5||P===6){c=f=v;continue e}A=A.parentNode}}c=c.return}xl(function(){var U=f,Q=Ni(a),Y=[];e:{var K=Mp.get(n);if(K!==void 0){var ne=Qs,oe=n;switch(n){case"keypress":if(Ks(a)===0)break e;case"keydown":case"keyup":ne=Be;break;case"focusin":oe="focus",ne=Ct;break;case"focusout":oe="blur",ne=Ct;break;case"beforeblur":case"afterblur":ne=Ct;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ne=oa;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ne=Ul;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ne=Zn;break;case bp:case Dp:case Vp:ne=Bl;break;case Op:ne=Wi;break;case"scroll":ne=Bi;break;case"wheel":ne=Q0;break;case"copy":case"cut":case"paste":ne=u;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ne=cn}var le=(s&4)!==0,lt=!le&&n==="scroll",L=le?K!==null?K+"Capture":null:K;le=[];for(var b=U,F;b!==null;){F=b;var J=F.stateNode;if(F.tag===5&&J!==null&&(F=J,L!==null&&(J=js(b,L),J!=null&&le.push(ma(b,J,F)))),lt)break;b=b.return}0<le.length&&(K=new ne(K,oe,null,a,Q),Y.push({event:K,listeners:le}))}}if((s&7)===0){e:{if(K=n==="mouseover"||n==="pointerover",ne=n==="mouseout"||n==="pointerout",K&&a!==Hr&&(oe=a.relatedTarget||a.fromElement)&&(Js(oe)||oe[Ir]))break e;if((ne||K)&&(K=Q.window===Q?Q:(K=Q.ownerDocument)?K.defaultView||K.parentWindow:window,ne?(oe=a.relatedTarget||a.toElement,ne=U,oe=oe?Js(oe):null,oe!==null&&(lt=Cn(oe),oe!==lt||oe.tag!==5&&oe.tag!==6)&&(oe=null)):(ne=null,oe=U),ne!==oe)){if(le=oa,J="onMouseLeave",L="onMouseEnter",b="mouse",(n==="pointerout"||n==="pointerover")&&(le=cn,J="onPointerLeave",L="onPointerEnter",b="pointer"),lt=ne==null?K:Xi(ne),F=oe==null?K:Xi(oe),K=new le(J,b+"leave",ne,a,Q),K.target=lt,K.relatedTarget=F,J=null,Js(Q)===U&&(le=new le(L,b+"enter",oe,a,Q),le.target=F,le.relatedTarget=lt,J=le),lt=J,ne&&oe)t:{for(le=ne,L=oe,b=0,F=le;F;F=Yi(F))b++;for(F=0,J=L;J;J=Yi(J))F++;for(;0<b-F;)le=Yi(le),b--;for(;0<F-b;)L=Yi(L),F--;for(;b--;){if(le===L||L!==null&&le===L.alternate)break t;le=Yi(le),L=Yi(L)}le=null}else le=null;ne!==null&&zp(Y,K,ne,le,!1),oe!==null&&lt!==null&&zp(Y,lt,oe,le,!0)}}e:{if(K=U?Xi(U):window,ne=K.nodeName&&K.nodeName.toLowerCase(),ne==="select"||ne==="input"&&K.type==="file")var ue=nE;else if(Ep(K))if(Tp)ue=oE;else{ue=sE;var de=rE}else(ne=K.nodeName)&&ne.toLowerCase()==="input"&&(K.type==="checkbox"||K.type==="radio")&&(ue=iE);if(ue&&(ue=ue(n,U))){wp(Y,ue,a,Q);break e}de&&de(n,K,U),n==="focusout"&&(de=K._wrapperState)&&de.controlled&&K.type==="number"&&dt(K,"number",K.value)}switch(de=U?Xi(U):window,n){case"focusin":(Ep(de)||de.contentEditable==="true")&&(Ki=de,nh=U,da=null);break;case"focusout":da=nh=Ki=null;break;case"mousedown":rh=!0;break;case"contextmenu":case"mouseup":case"dragend":rh=!1,Pp(Y,a,Q);break;case"selectionchange":if(uE)break;case"keydown":case"keyup":Pp(Y,a,Q)}var fe;if(Xc)e:{switch(n){case"compositionstart":var ye="onCompositionStart";break e;case"compositionend":ye="onCompositionEnd";break e;case"compositionupdate":ye="onCompositionUpdate";break e}ye=void 0}else Gi?_p(n,a)&&(ye="onCompositionEnd"):n==="keydown"&&a.keyCode===229&&(ye="onCompositionStart");ye&&(mp&&a.locale!=="ko"&&(Gi||ye!=="onCompositionStart"?ye==="onCompositionEnd"&&Gi&&(fe=jl()):(ln=Q,zi="value"in ln?ln.value:ln.textContent,Gi=!0)),de=Gl(U,ye),0<de.length&&(ye=new _(ye,n,null,a,Q),Y.push({event:ye,listeners:de}),fe?ye.data=fe:(fe=vp(a),fe!==null&&(ye.data=fe)))),(fe=J0?X0(n,a):Z0(n,a))&&(U=Gl(U,"onBeforeInput"),0<U.length&&(Q=new _("onBeforeInput","beforeinput",null,a,Q),Y.push({event:Q,listeners:U}),Q.data=fe))}Fp(Y,s)})}function ma(n,s,a){return{instance:n,listener:s,currentTarget:a}}function Gl(n,s){for(var a=s+"Capture",c=[];n!==null;){var d=n,f=d.stateNode;d.tag===5&&f!==null&&(d=f,f=js(n,a),f!=null&&c.unshift(ma(n,f,d)),f=js(n,s),f!=null&&c.push(ma(n,f,d))),n=n.return}return c}function Yi(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function zp(n,s,a,c,d){for(var f=s._reactName,v=[];a!==null&&a!==c;){var A=a,P=A.alternate,U=A.stateNode;if(P!==null&&P===c)break;A.tag===5&&U!==null&&(A=U,d?(P=js(a,f),P!=null&&v.unshift(ma(a,P,A))):d||(P=js(a,f),P!=null&&v.push(ma(a,P,A)))),a=a.return}v.length!==0&&n.push({event:s,listeners:v})}var fE=/\r\n?/g,pE=/\u0000|\uFFFD/g;function Bp(n){return(typeof n=="string"?n:""+n).replace(fE,`
`).replace(pE,"")}function Kl(n,s,a){if(s=Bp(s),Bp(n)!==s&&a)throw Error(t(425))}function Ql(){}var uh=null,ch=null;function hh(n,s){return n==="textarea"||n==="noscript"||typeof s.children=="string"||typeof s.children=="number"||typeof s.dangerouslySetInnerHTML=="object"&&s.dangerouslySetInnerHTML!==null&&s.dangerouslySetInnerHTML.__html!=null}var dh=typeof setTimeout=="function"?setTimeout:void 0,mE=typeof clearTimeout=="function"?clearTimeout:void 0,$p=typeof Promise=="function"?Promise:void 0,gE=typeof queueMicrotask=="function"?queueMicrotask:typeof $p<"u"?function(n){return $p.resolve(null).then(n).catch(yE)}:dh;function yE(n){setTimeout(function(){throw n})}function fh(n,s){var a=s,c=0;do{var d=a.nextSibling;if(n.removeChild(a),d&&d.nodeType===8)if(a=d.data,a==="/$"){if(c===0){n.removeChild(d),Zr(s);return}c--}else a!=="$"&&a!=="$?"&&a!=="$!"||c++;a=d}while(a);Zr(s)}function rs(n){for(;n!=null;n=n.nextSibling){var s=n.nodeType;if(s===1||s===3)break;if(s===8){if(s=n.data,s==="$"||s==="$!"||s==="$?")break;if(s==="/$")return null}}return n}function qp(n){n=n.previousSibling;for(var s=0;n;){if(n.nodeType===8){var a=n.data;if(a==="$"||a==="$!"||a==="$?"){if(s===0)return n;s--}else a==="/$"&&s++}n=n.previousSibling}return null}var Ji=Math.random().toString(36).slice(2),tr="__reactFiber$"+Ji,ga="__reactProps$"+Ji,Ir="__reactContainer$"+Ji,ph="__reactEvents$"+Ji,_E="__reactListeners$"+Ji,vE="__reactHandles$"+Ji;function Js(n){var s=n[tr];if(s)return s;for(var a=n.parentNode;a;){if(s=a[Ir]||a[tr]){if(a=s.alternate,s.child!==null||a!==null&&a.child!==null)for(n=qp(n);n!==null;){if(a=n[tr])return a;n=qp(n)}return s}n=a,a=n.parentNode}return null}function ya(n){return n=n[tr]||n[Ir],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function Xi(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(t(33))}function Yl(n){return n[ga]||null}var mh=[],Zi=-1;function ss(n){return{current:n}}function Ye(n){0>Zi||(n.current=mh[Zi],mh[Zi]=null,Zi--)}function We(n,s){Zi++,mh[Zi]=n.current,n.current=s}var is={},Mt=ss(is),Qt=ss(!1),Xs=is;function eo(n,s){var a=n.type.contextTypes;if(!a)return is;var c=n.stateNode;if(c&&c.__reactInternalMemoizedUnmaskedChildContext===s)return c.__reactInternalMemoizedMaskedChildContext;var d={},f;for(f in a)d[f]=s[f];return c&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=s,n.__reactInternalMemoizedMaskedChildContext=d),d}function Yt(n){return n=n.childContextTypes,n!=null}function Jl(){Ye(Qt),Ye(Mt)}function Hp(n,s,a){if(Mt.current!==is)throw Error(t(168));We(Mt,s),We(Qt,a)}function Wp(n,s,a){var c=n.stateNode;if(s=s.childContextTypes,typeof c.getChildContext!="function")return a;c=c.getChildContext();for(var d in c)if(!(d in s))throw Error(t(108,Ue(n)||"Unknown",d));return se({},a,c)}function Xl(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||is,Xs=Mt.current,We(Mt,n),We(Qt,Qt.current),!0}function Gp(n,s,a){var c=n.stateNode;if(!c)throw Error(t(169));a?(n=Wp(n,s,Xs),c.__reactInternalMemoizedMergedChildContext=n,Ye(Qt),Ye(Mt),We(Mt,n)):Ye(Qt),We(Qt,a)}var Sr=null,Zl=!1,gh=!1;function Kp(n){Sr===null?Sr=[n]:Sr.push(n)}function EE(n){Zl=!0,Kp(n)}function os(){if(!gh&&Sr!==null){gh=!0;var n=0,s=be;try{var a=Sr;for(be=1;n<a.length;n++){var c=a[n];do c=c(!0);while(c!==null)}Sr=null,Zl=!1}catch(d){throw Sr!==null&&(Sr=Sr.slice(n+1)),Go(Vi,os),d}finally{be=s,gh=!1}}return null}var to=[],no=0,eu=null,tu=0,_n=[],vn=0,Zs=null,Ar=1,xr="";function ei(n,s){to[no++]=tu,to[no++]=eu,eu=n,tu=s}function Qp(n,s,a){_n[vn++]=Ar,_n[vn++]=xr,_n[vn++]=Zs,Zs=n;var c=Ar;n=xr;var d=32-on(c)-1;c&=~(1<<d),a+=1;var f=32-on(s)+d;if(30<f){var v=d-d%5;f=(c&(1<<v)-1).toString(32),c>>=v,d-=v,Ar=1<<32-on(s)+d|a<<d|c,xr=f+n}else Ar=1<<f|a<<d|c,xr=n}function yh(n){n.return!==null&&(ei(n,1),Qp(n,1,0))}function _h(n){for(;n===eu;)eu=to[--no],to[no]=null,tu=to[--no],to[no]=null;for(;n===Zs;)Zs=_n[--vn],_n[vn]=null,xr=_n[--vn],_n[vn]=null,Ar=_n[--vn],_n[vn]=null}var hn=null,dn=null,Ze=!1,Nn=null;function Yp(n,s){var a=In(5,null,null,0);a.elementType="DELETED",a.stateNode=s,a.return=n,s=n.deletions,s===null?(n.deletions=[a],n.flags|=16):s.push(a)}function Jp(n,s){switch(n.tag){case 5:var a=n.type;return s=s.nodeType!==1||a.toLowerCase()!==s.nodeName.toLowerCase()?null:s,s!==null?(n.stateNode=s,hn=n,dn=rs(s.firstChild),!0):!1;case 6:return s=n.pendingProps===""||s.nodeType!==3?null:s,s!==null?(n.stateNode=s,hn=n,dn=null,!0):!1;case 13:return s=s.nodeType!==8?null:s,s!==null?(a=Zs!==null?{id:Ar,overflow:xr}:null,n.memoizedState={dehydrated:s,treeContext:a,retryLane:1073741824},a=In(18,null,null,0),a.stateNode=s,a.return=n,n.child=a,hn=n,dn=null,!0):!1;default:return!1}}function vh(n){return(n.mode&1)!==0&&(n.flags&128)===0}function Eh(n){if(Ze){var s=dn;if(s){var a=s;if(!Jp(n,s)){if(vh(n))throw Error(t(418));s=rs(a.nextSibling);var c=hn;s&&Jp(n,s)?Yp(c,a):(n.flags=n.flags&-4097|2,Ze=!1,hn=n)}}else{if(vh(n))throw Error(t(418));n.flags=n.flags&-4097|2,Ze=!1,hn=n}}}function Xp(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;hn=n}function nu(n){if(n!==hn)return!1;if(!Ze)return Xp(n),Ze=!0,!1;var s;if((s=n.tag!==3)&&!(s=n.tag!==5)&&(s=n.type,s=s!=="head"&&s!=="body"&&!hh(n.type,n.memoizedProps)),s&&(s=dn)){if(vh(n))throw Zp(),Error(t(418));for(;s;)Yp(n,s),s=rs(s.nextSibling)}if(Xp(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(t(317));e:{for(n=n.nextSibling,s=0;n;){if(n.nodeType===8){var a=n.data;if(a==="/$"){if(s===0){dn=rs(n.nextSibling);break e}s--}else a!=="$"&&a!=="$!"&&a!=="$?"||s++}n=n.nextSibling}dn=null}}else dn=hn?rs(n.stateNode.nextSibling):null;return!0}function Zp(){for(var n=dn;n;)n=rs(n.nextSibling)}function ro(){dn=hn=null,Ze=!1}function wh(n){Nn===null?Nn=[n]:Nn.push(n)}var wE=Se.ReactCurrentBatchConfig;function _a(n,s,a){if(n=a.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(a._owner){if(a=a._owner,a){if(a.tag!==1)throw Error(t(309));var c=a.stateNode}if(!c)throw Error(t(147,n));var d=c,f=""+n;return s!==null&&s.ref!==null&&typeof s.ref=="function"&&s.ref._stringRef===f?s.ref:(s=function(v){var A=d.refs;v===null?delete A[f]:A[f]=v},s._stringRef=f,s)}if(typeof n!="string")throw Error(t(284));if(!a._owner)throw Error(t(290,n))}return n}function ru(n,s){throw n=Object.prototype.toString.call(s),Error(t(31,n==="[object Object]"?"object with keys {"+Object.keys(s).join(", ")+"}":n))}function em(n){var s=n._init;return s(n._payload)}function tm(n){function s(L,b){if(n){var F=L.deletions;F===null?(L.deletions=[b],L.flags|=16):F.push(b)}}function a(L,b){if(!n)return null;for(;b!==null;)s(L,b),b=b.sibling;return null}function c(L,b){for(L=new Map;b!==null;)b.key!==null?L.set(b.key,b):L.set(b.index,b),b=b.sibling;return L}function d(L,b){return L=ps(L,b),L.index=0,L.sibling=null,L}function f(L,b,F){return L.index=F,n?(F=L.alternate,F!==null?(F=F.index,F<b?(L.flags|=2,b):F):(L.flags|=2,b)):(L.flags|=1048576,b)}function v(L){return n&&L.alternate===null&&(L.flags|=2),L}function A(L,b,F,J){return b===null||b.tag!==6?(b=dd(F,L.mode,J),b.return=L,b):(b=d(b,F),b.return=L,b)}function P(L,b,F,J){var ue=F.type;return ue===R?Q(L,b,F.props.children,J,F.key):b!==null&&(b.elementType===ue||typeof ue=="object"&&ue!==null&&ue.$$typeof===Vt&&em(ue)===b.type)?(J=d(b,F.props),J.ref=_a(L,b,F),J.return=L,J):(J=ku(F.type,F.key,F.props,null,L.mode,J),J.ref=_a(L,b,F),J.return=L,J)}function U(L,b,F,J){return b===null||b.tag!==4||b.stateNode.containerInfo!==F.containerInfo||b.stateNode.implementation!==F.implementation?(b=fd(F,L.mode,J),b.return=L,b):(b=d(b,F.children||[]),b.return=L,b)}function Q(L,b,F,J,ue){return b===null||b.tag!==7?(b=li(F,L.mode,J,ue),b.return=L,b):(b=d(b,F),b.return=L,b)}function Y(L,b,F){if(typeof b=="string"&&b!==""||typeof b=="number")return b=dd(""+b,L.mode,F),b.return=L,b;if(typeof b=="object"&&b!==null){switch(b.$$typeof){case Me:return F=ku(b.type,b.key,b.props,null,L.mode,F),F.ref=_a(L,null,b),F.return=L,F;case Ae:return b=fd(b,L.mode,F),b.return=L,b;case Vt:var J=b._init;return Y(L,J(b._payload),F)}if(ot(b)||he(b))return b=li(b,L.mode,F,null),b.return=L,b;ru(L,b)}return null}function K(L,b,F,J){var ue=b!==null?b.key:null;if(typeof F=="string"&&F!==""||typeof F=="number")return ue!==null?null:A(L,b,""+F,J);if(typeof F=="object"&&F!==null){switch(F.$$typeof){case Me:return F.key===ue?P(L,b,F,J):null;case Ae:return F.key===ue?U(L,b,F,J):null;case Vt:return ue=F._init,K(L,b,ue(F._payload),J)}if(ot(F)||he(F))return ue!==null?null:Q(L,b,F,J,null);ru(L,F)}return null}function ne(L,b,F,J,ue){if(typeof J=="string"&&J!==""||typeof J=="number")return L=L.get(F)||null,A(b,L,""+J,ue);if(typeof J=="object"&&J!==null){switch(J.$$typeof){case Me:return L=L.get(J.key===null?F:J.key)||null,P(b,L,J,ue);case Ae:return L=L.get(J.key===null?F:J.key)||null,U(b,L,J,ue);case Vt:var de=J._init;return ne(L,b,F,de(J._payload),ue)}if(ot(J)||he(J))return L=L.get(F)||null,Q(b,L,J,ue,null);ru(b,J)}return null}function oe(L,b,F,J){for(var ue=null,de=null,fe=b,ye=b=0,At=null;fe!==null&&ye<F.length;ye++){fe.index>ye?(At=fe,fe=null):At=fe.sibling;var Le=K(L,fe,F[ye],J);if(Le===null){fe===null&&(fe=At);break}n&&fe&&Le.alternate===null&&s(L,fe),b=f(Le,b,ye),de===null?ue=Le:de.sibling=Le,de=Le,fe=At}if(ye===F.length)return a(L,fe),Ze&&ei(L,ye),ue;if(fe===null){for(;ye<F.length;ye++)fe=Y(L,F[ye],J),fe!==null&&(b=f(fe,b,ye),de===null?ue=fe:de.sibling=fe,de=fe);return Ze&&ei(L,ye),ue}for(fe=c(L,fe);ye<F.length;ye++)At=ne(fe,L,ye,F[ye],J),At!==null&&(n&&At.alternate!==null&&fe.delete(At.key===null?ye:At.key),b=f(At,b,ye),de===null?ue=At:de.sibling=At,de=At);return n&&fe.forEach(function(ms){return s(L,ms)}),Ze&&ei(L,ye),ue}function le(L,b,F,J){var ue=he(F);if(typeof ue!="function")throw Error(t(150));if(F=ue.call(F),F==null)throw Error(t(151));for(var de=ue=null,fe=b,ye=b=0,At=null,Le=F.next();fe!==null&&!Le.done;ye++,Le=F.next()){fe.index>ye?(At=fe,fe=null):At=fe.sibling;var ms=K(L,fe,Le.value,J);if(ms===null){fe===null&&(fe=At);break}n&&fe&&ms.alternate===null&&s(L,fe),b=f(ms,b,ye),de===null?ue=ms:de.sibling=ms,de=ms,fe=At}if(Le.done)return a(L,fe),Ze&&ei(L,ye),ue;if(fe===null){for(;!Le.done;ye++,Le=F.next())Le=Y(L,Le.value,J),Le!==null&&(b=f(Le,b,ye),de===null?ue=Le:de.sibling=Le,de=Le);return Ze&&ei(L,ye),ue}for(fe=c(L,fe);!Le.done;ye++,Le=F.next())Le=ne(fe,L,ye,Le.value,J),Le!==null&&(n&&Le.alternate!==null&&fe.delete(Le.key===null?ye:Le.key),b=f(Le,b,ye),de===null?ue=Le:de.sibling=Le,de=Le);return n&&fe.forEach(function(ew){return s(L,ew)}),Ze&&ei(L,ye),ue}function lt(L,b,F,J){if(typeof F=="object"&&F!==null&&F.type===R&&F.key===null&&(F=F.props.children),typeof F=="object"&&F!==null){switch(F.$$typeof){case Me:e:{for(var ue=F.key,de=b;de!==null;){if(de.key===ue){if(ue=F.type,ue===R){if(de.tag===7){a(L,de.sibling),b=d(de,F.props.children),b.return=L,L=b;break e}}else if(de.elementType===ue||typeof ue=="object"&&ue!==null&&ue.$$typeof===Vt&&em(ue)===de.type){a(L,de.sibling),b=d(de,F.props),b.ref=_a(L,de,F),b.return=L,L=b;break e}a(L,de);break}else s(L,de);de=de.sibling}F.type===R?(b=li(F.props.children,L.mode,J,F.key),b.return=L,L=b):(J=ku(F.type,F.key,F.props,null,L.mode,J),J.ref=_a(L,b,F),J.return=L,L=J)}return v(L);case Ae:e:{for(de=F.key;b!==null;){if(b.key===de)if(b.tag===4&&b.stateNode.containerInfo===F.containerInfo&&b.stateNode.implementation===F.implementation){a(L,b.sibling),b=d(b,F.children||[]),b.return=L,L=b;break e}else{a(L,b);break}else s(L,b);b=b.sibling}b=fd(F,L.mode,J),b.return=L,L=b}return v(L);case Vt:return de=F._init,lt(L,b,de(F._payload),J)}if(ot(F))return oe(L,b,F,J);if(he(F))return le(L,b,F,J);ru(L,F)}return typeof F=="string"&&F!==""||typeof F=="number"?(F=""+F,b!==null&&b.tag===6?(a(L,b.sibling),b=d(b,F),b.return=L,L=b):(a(L,b),b=dd(F,L.mode,J),b.return=L,L=b),v(L)):a(L,b)}return lt}var so=tm(!0),nm=tm(!1),su=ss(null),iu=null,io=null,Th=null;function Ih(){Th=io=iu=null}function Sh(n){var s=su.current;Ye(su),n._currentValue=s}function Ah(n,s,a){for(;n!==null;){var c=n.alternate;if((n.childLanes&s)!==s?(n.childLanes|=s,c!==null&&(c.childLanes|=s)):c!==null&&(c.childLanes&s)!==s&&(c.childLanes|=s),n===a)break;n=n.return}}function oo(n,s){iu=n,Th=io=null,n=n.dependencies,n!==null&&n.firstContext!==null&&((n.lanes&s)!==0&&(Jt=!0),n.firstContext=null)}function En(n){var s=n._currentValue;if(Th!==n)if(n={context:n,memoizedValue:s,next:null},io===null){if(iu===null)throw Error(t(308));io=n,iu.dependencies={lanes:0,firstContext:n}}else io=io.next=n;return s}var ti=null;function xh(n){ti===null?ti=[n]:ti.push(n)}function rm(n,s,a,c){var d=s.interleaved;return d===null?(a.next=a,xh(s)):(a.next=d.next,d.next=a),s.interleaved=a,kr(n,c)}function kr(n,s){n.lanes|=s;var a=n.alternate;for(a!==null&&(a.lanes|=s),a=n,n=n.return;n!==null;)n.childLanes|=s,a=n.alternate,a!==null&&(a.childLanes|=s),a=n,n=n.return;return a.tag===3?a.stateNode:null}var as=!1;function kh(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function sm(n,s){n=n.updateQueue,s.updateQueue===n&&(s.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function Cr(n,s){return{eventTime:n,lane:s,tag:0,payload:null,callback:null,next:null}}function ls(n,s,a){var c=n.updateQueue;if(c===null)return null;if(c=c.shared,(Oe&2)!==0){var d=c.pending;return d===null?s.next=s:(s.next=d.next,d.next=s),c.pending=s,kr(n,a)}return d=c.interleaved,d===null?(s.next=s,xh(c)):(s.next=d.next,d.next=s),c.interleaved=s,kr(n,a)}function ou(n,s,a){if(s=s.updateQueue,s!==null&&(s=s.shared,(a&4194240)!==0)){var c=s.lanes;c&=n.pendingLanes,a|=c,s.lanes=a,Zo(n,a)}}function im(n,s){var a=n.updateQueue,c=n.alternate;if(c!==null&&(c=c.updateQueue,a===c)){var d=null,f=null;if(a=a.firstBaseUpdate,a!==null){do{var v={eventTime:a.eventTime,lane:a.lane,tag:a.tag,payload:a.payload,callback:a.callback,next:null};f===null?d=f=v:f=f.next=v,a=a.next}while(a!==null);f===null?d=f=s:f=f.next=s}else d=f=s;a={baseState:c.baseState,firstBaseUpdate:d,lastBaseUpdate:f,shared:c.shared,effects:c.effects},n.updateQueue=a;return}n=a.lastBaseUpdate,n===null?a.firstBaseUpdate=s:n.next=s,a.lastBaseUpdate=s}function au(n,s,a,c){var d=n.updateQueue;as=!1;var f=d.firstBaseUpdate,v=d.lastBaseUpdate,A=d.shared.pending;if(A!==null){d.shared.pending=null;var P=A,U=P.next;P.next=null,v===null?f=U:v.next=U,v=P;var Q=n.alternate;Q!==null&&(Q=Q.updateQueue,A=Q.lastBaseUpdate,A!==v&&(A===null?Q.firstBaseUpdate=U:A.next=U,Q.lastBaseUpdate=P))}if(f!==null){var Y=d.baseState;v=0,Q=U=P=null,A=f;do{var K=A.lane,ne=A.eventTime;if((c&K)===K){Q!==null&&(Q=Q.next={eventTime:ne,lane:0,tag:A.tag,payload:A.payload,callback:A.callback,next:null});e:{var oe=n,le=A;switch(K=s,ne=a,le.tag){case 1:if(oe=le.payload,typeof oe=="function"){Y=oe.call(ne,Y,K);break e}Y=oe;break e;case 3:oe.flags=oe.flags&-65537|128;case 0:if(oe=le.payload,K=typeof oe=="function"?oe.call(ne,Y,K):oe,K==null)break e;Y=se({},Y,K);break e;case 2:as=!0}}A.callback!==null&&A.lane!==0&&(n.flags|=64,K=d.effects,K===null?d.effects=[A]:K.push(A))}else ne={eventTime:ne,lane:K,tag:A.tag,payload:A.payload,callback:A.callback,next:null},Q===null?(U=Q=ne,P=Y):Q=Q.next=ne,v|=K;if(A=A.next,A===null){if(A=d.shared.pending,A===null)break;K=A,A=K.next,K.next=null,d.lastBaseUpdate=K,d.shared.pending=null}}while(!0);if(Q===null&&(P=Y),d.baseState=P,d.firstBaseUpdate=U,d.lastBaseUpdate=Q,s=d.shared.interleaved,s!==null){d=s;do v|=d.lane,d=d.next;while(d!==s)}else f===null&&(d.shared.lanes=0);si|=v,n.lanes=v,n.memoizedState=Y}}function om(n,s,a){if(n=s.effects,s.effects=null,n!==null)for(s=0;s<n.length;s++){var c=n[s],d=c.callback;if(d!==null){if(c.callback=null,c=a,typeof d!="function")throw Error(t(191,d));d.call(c)}}}var va={},nr=ss(va),Ea=ss(va),wa=ss(va);function ni(n){if(n===va)throw Error(t(174));return n}function Ch(n,s){switch(We(wa,s),We(Ea,n),We(nr,va),n=s.nodeType,n){case 9:case 11:s=(s=s.documentElement)?s.namespaceURI:Ci(null,"");break;default:n=n===8?s.parentNode:s,s=n.namespaceURI||null,n=n.tagName,s=Ci(s,n)}Ye(nr),We(nr,s)}function ao(){Ye(nr),Ye(Ea),Ye(wa)}function am(n){ni(wa.current);var s=ni(nr.current),a=Ci(s,n.type);s!==a&&(We(Ea,n),We(nr,a))}function Rh(n){Ea.current===n&&(Ye(nr),Ye(Ea))}var et=ss(0);function lu(n){for(var s=n;s!==null;){if(s.tag===13){var a=s.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||a.data==="$?"||a.data==="$!"))return s}else if(s.tag===19&&s.memoizedProps.revealOrder!==void 0){if((s.flags&128)!==0)return s}else if(s.child!==null){s.child.return=s,s=s.child;continue}if(s===n)break;for(;s.sibling===null;){if(s.return===null||s.return===n)return null;s=s.return}s.sibling.return=s.return,s=s.sibling}return null}var Ph=[];function Nh(){for(var n=0;n<Ph.length;n++)Ph[n]._workInProgressVersionPrimary=null;Ph.length=0}var uu=Se.ReactCurrentDispatcher,bh=Se.ReactCurrentBatchConfig,ri=0,tt=null,vt=null,It=null,cu=!1,Ta=!1,Ia=0,TE=0;function Lt(){throw Error(t(321))}function Dh(n,s){if(s===null)return!1;for(var a=0;a<s.length&&a<n.length;a++)if(!Pn(n[a],s[a]))return!1;return!0}function Vh(n,s,a,c,d,f){if(ri=f,tt=s,s.memoizedState=null,s.updateQueue=null,s.lanes=0,uu.current=n===null||n.memoizedState===null?xE:kE,n=a(c,d),Ta){f=0;do{if(Ta=!1,Ia=0,25<=f)throw Error(t(301));f+=1,It=vt=null,s.updateQueue=null,uu.current=CE,n=a(c,d)}while(Ta)}if(uu.current=fu,s=vt!==null&&vt.next!==null,ri=0,It=vt=tt=null,cu=!1,s)throw Error(t(300));return n}function Oh(){var n=Ia!==0;return Ia=0,n}function rr(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return It===null?tt.memoizedState=It=n:It=It.next=n,It}function wn(){if(vt===null){var n=tt.alternate;n=n!==null?n.memoizedState:null}else n=vt.next;var s=It===null?tt.memoizedState:It.next;if(s!==null)It=s,vt=n;else{if(n===null)throw Error(t(310));vt=n,n={memoizedState:vt.memoizedState,baseState:vt.baseState,baseQueue:vt.baseQueue,queue:vt.queue,next:null},It===null?tt.memoizedState=It=n:It=It.next=n}return It}function Sa(n,s){return typeof s=="function"?s(n):s}function Mh(n){var s=wn(),a=s.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=n;var c=vt,d=c.baseQueue,f=a.pending;if(f!==null){if(d!==null){var v=d.next;d.next=f.next,f.next=v}c.baseQueue=d=f,a.pending=null}if(d!==null){f=d.next,c=c.baseState;var A=v=null,P=null,U=f;do{var Q=U.lane;if((ri&Q)===Q)P!==null&&(P=P.next={lane:0,action:U.action,hasEagerState:U.hasEagerState,eagerState:U.eagerState,next:null}),c=U.hasEagerState?U.eagerState:n(c,U.action);else{var Y={lane:Q,action:U.action,hasEagerState:U.hasEagerState,eagerState:U.eagerState,next:null};P===null?(A=P=Y,v=c):P=P.next=Y,tt.lanes|=Q,si|=Q}U=U.next}while(U!==null&&U!==f);P===null?v=c:P.next=A,Pn(c,s.memoizedState)||(Jt=!0),s.memoizedState=c,s.baseState=v,s.baseQueue=P,a.lastRenderedState=c}if(n=a.interleaved,n!==null){d=n;do f=d.lane,tt.lanes|=f,si|=f,d=d.next;while(d!==n)}else d===null&&(a.lanes=0);return[s.memoizedState,a.dispatch]}function Lh(n){var s=wn(),a=s.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=n;var c=a.dispatch,d=a.pending,f=s.memoizedState;if(d!==null){a.pending=null;var v=d=d.next;do f=n(f,v.action),v=v.next;while(v!==d);Pn(f,s.memoizedState)||(Jt=!0),s.memoizedState=f,s.baseQueue===null&&(s.baseState=f),a.lastRenderedState=f}return[f,c]}function lm(){}function um(n,s){var a=tt,c=wn(),d=s(),f=!Pn(c.memoizedState,d);if(f&&(c.memoizedState=d,Jt=!0),c=c.queue,jh(dm.bind(null,a,c,n),[n]),c.getSnapshot!==s||f||It!==null&&It.memoizedState.tag&1){if(a.flags|=2048,Aa(9,hm.bind(null,a,c,d,s),void 0,null),St===null)throw Error(t(349));(ri&30)!==0||cm(a,s,d)}return d}function cm(n,s,a){n.flags|=16384,n={getSnapshot:s,value:a},s=tt.updateQueue,s===null?(s={lastEffect:null,stores:null},tt.updateQueue=s,s.stores=[n]):(a=s.stores,a===null?s.stores=[n]:a.push(n))}function hm(n,s,a,c){s.value=a,s.getSnapshot=c,fm(s)&&pm(n)}function dm(n,s,a){return a(function(){fm(s)&&pm(n)})}function fm(n){var s=n.getSnapshot;n=n.value;try{var a=s();return!Pn(n,a)}catch{return!0}}function pm(n){var s=kr(n,1);s!==null&&On(s,n,1,-1)}function mm(n){var s=rr();return typeof n=="function"&&(n=n()),s.memoizedState=s.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Sa,lastRenderedState:n},s.queue=n,n=n.dispatch=AE.bind(null,tt,n),[s.memoizedState,n]}function Aa(n,s,a,c){return n={tag:n,create:s,destroy:a,deps:c,next:null},s=tt.updateQueue,s===null?(s={lastEffect:null,stores:null},tt.updateQueue=s,s.lastEffect=n.next=n):(a=s.lastEffect,a===null?s.lastEffect=n.next=n:(c=a.next,a.next=n,n.next=c,s.lastEffect=n)),n}function gm(){return wn().memoizedState}function hu(n,s,a,c){var d=rr();tt.flags|=n,d.memoizedState=Aa(1|s,a,void 0,c===void 0?null:c)}function du(n,s,a,c){var d=wn();c=c===void 0?null:c;var f=void 0;if(vt!==null){var v=vt.memoizedState;if(f=v.destroy,c!==null&&Dh(c,v.deps)){d.memoizedState=Aa(s,a,f,c);return}}tt.flags|=n,d.memoizedState=Aa(1|s,a,f,c)}function ym(n,s){return hu(8390656,8,n,s)}function jh(n,s){return du(2048,8,n,s)}function _m(n,s){return du(4,2,n,s)}function vm(n,s){return du(4,4,n,s)}function Em(n,s){if(typeof s=="function")return n=n(),s(n),function(){s(null)};if(s!=null)return n=n(),s.current=n,function(){s.current=null}}function wm(n,s,a){return a=a!=null?a.concat([n]):null,du(4,4,Em.bind(null,s,n),a)}function Fh(){}function Tm(n,s){var a=wn();s=s===void 0?null:s;var c=a.memoizedState;return c!==null&&s!==null&&Dh(s,c[1])?c[0]:(a.memoizedState=[n,s],n)}function Im(n,s){var a=wn();s=s===void 0?null:s;var c=a.memoizedState;return c!==null&&s!==null&&Dh(s,c[1])?c[0]:(n=n(),a.memoizedState=[n,s],n)}function Sm(n,s,a){return(ri&21)===0?(n.baseState&&(n.baseState=!1,Jt=!0),n.memoizedState=a):(Pn(a,s)||(a=Jo(),tt.lanes|=a,si|=a,n.baseState=!0),s)}function IE(n,s){var a=be;be=a!==0&&4>a?a:4,n(!0);var c=bh.transition;bh.transition={};try{n(!1),s()}finally{be=a,bh.transition=c}}function Am(){return wn().memoizedState}function SE(n,s,a){var c=ds(n);if(a={lane:c,action:a,hasEagerState:!1,eagerState:null,next:null},xm(n))km(s,a);else if(a=rm(n,s,a,c),a!==null){var d=Wt();On(a,n,c,d),Cm(a,s,c)}}function AE(n,s,a){var c=ds(n),d={lane:c,action:a,hasEagerState:!1,eagerState:null,next:null};if(xm(n))km(s,d);else{var f=n.alternate;if(n.lanes===0&&(f===null||f.lanes===0)&&(f=s.lastRenderedReducer,f!==null))try{var v=s.lastRenderedState,A=f(v,a);if(d.hasEagerState=!0,d.eagerState=A,Pn(A,v)){var P=s.interleaved;P===null?(d.next=d,xh(s)):(d.next=P.next,P.next=d),s.interleaved=d;return}}catch{}finally{}a=rm(n,s,d,c),a!==null&&(d=Wt(),On(a,n,c,d),Cm(a,s,c))}}function xm(n){var s=n.alternate;return n===tt||s!==null&&s===tt}function km(n,s){Ta=cu=!0;var a=n.pending;a===null?s.next=s:(s.next=a.next,a.next=s),n.pending=s}function Cm(n,s,a){if((a&4194240)!==0){var c=s.lanes;c&=n.pendingLanes,a|=c,s.lanes=a,Zo(n,a)}}var fu={readContext:En,useCallback:Lt,useContext:Lt,useEffect:Lt,useImperativeHandle:Lt,useInsertionEffect:Lt,useLayoutEffect:Lt,useMemo:Lt,useReducer:Lt,useRef:Lt,useState:Lt,useDebugValue:Lt,useDeferredValue:Lt,useTransition:Lt,useMutableSource:Lt,useSyncExternalStore:Lt,useId:Lt,unstable_isNewReconciler:!1},xE={readContext:En,useCallback:function(n,s){return rr().memoizedState=[n,s===void 0?null:s],n},useContext:En,useEffect:ym,useImperativeHandle:function(n,s,a){return a=a!=null?a.concat([n]):null,hu(4194308,4,Em.bind(null,s,n),a)},useLayoutEffect:function(n,s){return hu(4194308,4,n,s)},useInsertionEffect:function(n,s){return hu(4,2,n,s)},useMemo:function(n,s){var a=rr();return s=s===void 0?null:s,n=n(),a.memoizedState=[n,s],n},useReducer:function(n,s,a){var c=rr();return s=a!==void 0?a(s):s,c.memoizedState=c.baseState=s,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:s},c.queue=n,n=n.dispatch=SE.bind(null,tt,n),[c.memoizedState,n]},useRef:function(n){var s=rr();return n={current:n},s.memoizedState=n},useState:mm,useDebugValue:Fh,useDeferredValue:function(n){return rr().memoizedState=n},useTransition:function(){var n=mm(!1),s=n[0];return n=IE.bind(null,n[1]),rr().memoizedState=n,[s,n]},useMutableSource:function(){},useSyncExternalStore:function(n,s,a){var c=tt,d=rr();if(Ze){if(a===void 0)throw Error(t(407));a=a()}else{if(a=s(),St===null)throw Error(t(349));(ri&30)!==0||cm(c,s,a)}d.memoizedState=a;var f={value:a,getSnapshot:s};return d.queue=f,ym(dm.bind(null,c,f,n),[n]),c.flags|=2048,Aa(9,hm.bind(null,c,f,a,s),void 0,null),a},useId:function(){var n=rr(),s=St.identifierPrefix;if(Ze){var a=xr,c=Ar;a=(c&~(1<<32-on(c)-1)).toString(32)+a,s=":"+s+"R"+a,a=Ia++,0<a&&(s+="H"+a.toString(32)),s+=":"}else a=TE++,s=":"+s+"r"+a.toString(32)+":";return n.memoizedState=s},unstable_isNewReconciler:!1},kE={readContext:En,useCallback:Tm,useContext:En,useEffect:jh,useImperativeHandle:wm,useInsertionEffect:_m,useLayoutEffect:vm,useMemo:Im,useReducer:Mh,useRef:gm,useState:function(){return Mh(Sa)},useDebugValue:Fh,useDeferredValue:function(n){var s=wn();return Sm(s,vt.memoizedState,n)},useTransition:function(){var n=Mh(Sa)[0],s=wn().memoizedState;return[n,s]},useMutableSource:lm,useSyncExternalStore:um,useId:Am,unstable_isNewReconciler:!1},CE={readContext:En,useCallback:Tm,useContext:En,useEffect:jh,useImperativeHandle:wm,useInsertionEffect:_m,useLayoutEffect:vm,useMemo:Im,useReducer:Lh,useRef:gm,useState:function(){return Lh(Sa)},useDebugValue:Fh,useDeferredValue:function(n){var s=wn();return vt===null?s.memoizedState=n:Sm(s,vt.memoizedState,n)},useTransition:function(){var n=Lh(Sa)[0],s=wn().memoizedState;return[n,s]},useMutableSource:lm,useSyncExternalStore:um,useId:Am,unstable_isNewReconciler:!1};function bn(n,s){if(n&&n.defaultProps){s=se({},s),n=n.defaultProps;for(var a in n)s[a]===void 0&&(s[a]=n[a]);return s}return s}function Uh(n,s,a,c){s=n.memoizedState,a=a(c,s),a=a==null?s:se({},s,a),n.memoizedState=a,n.lanes===0&&(n.updateQueue.baseState=a)}var pu={isMounted:function(n){return(n=n._reactInternals)?Cn(n)===n:!1},enqueueSetState:function(n,s,a){n=n._reactInternals;var c=Wt(),d=ds(n),f=Cr(c,d);f.payload=s,a!=null&&(f.callback=a),s=ls(n,f,d),s!==null&&(On(s,n,d,c),ou(s,n,d))},enqueueReplaceState:function(n,s,a){n=n._reactInternals;var c=Wt(),d=ds(n),f=Cr(c,d);f.tag=1,f.payload=s,a!=null&&(f.callback=a),s=ls(n,f,d),s!==null&&(On(s,n,d,c),ou(s,n,d))},enqueueForceUpdate:function(n,s){n=n._reactInternals;var a=Wt(),c=ds(n),d=Cr(a,c);d.tag=2,s!=null&&(d.callback=s),s=ls(n,d,c),s!==null&&(On(s,n,c,a),ou(s,n,c))}};function Rm(n,s,a,c,d,f,v){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(c,f,v):s.prototype&&s.prototype.isPureReactComponent?!ha(a,c)||!ha(d,f):!0}function Pm(n,s,a){var c=!1,d=is,f=s.contextType;return typeof f=="object"&&f!==null?f=En(f):(d=Yt(s)?Xs:Mt.current,c=s.contextTypes,f=(c=c!=null)?eo(n,d):is),s=new s(a,f),n.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,s.updater=pu,n.stateNode=s,s._reactInternals=n,c&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=d,n.__reactInternalMemoizedMaskedChildContext=f),s}function Nm(n,s,a,c){n=s.state,typeof s.componentWillReceiveProps=="function"&&s.componentWillReceiveProps(a,c),typeof s.UNSAFE_componentWillReceiveProps=="function"&&s.UNSAFE_componentWillReceiveProps(a,c),s.state!==n&&pu.enqueueReplaceState(s,s.state,null)}function zh(n,s,a,c){var d=n.stateNode;d.props=a,d.state=n.memoizedState,d.refs={},kh(n);var f=s.contextType;typeof f=="object"&&f!==null?d.context=En(f):(f=Yt(s)?Xs:Mt.current,d.context=eo(n,f)),d.state=n.memoizedState,f=s.getDerivedStateFromProps,typeof f=="function"&&(Uh(n,s,f,a),d.state=n.memoizedState),typeof s.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(s=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),s!==d.state&&pu.enqueueReplaceState(d,d.state,null),au(n,a,d,c),d.state=n.memoizedState),typeof d.componentDidMount=="function"&&(n.flags|=4194308)}function lo(n,s){try{var a="",c=s;do a+=ke(c),c=c.return;while(c);var d=a}catch(f){d=`
Error generating stack: `+f.message+`
`+f.stack}return{value:n,source:s,stack:d,digest:null}}function Bh(n,s,a){return{value:n,source:null,stack:a??null,digest:s??null}}function $h(n,s){try{console.error(s.value)}catch(a){setTimeout(function(){throw a})}}var RE=typeof WeakMap=="function"?WeakMap:Map;function bm(n,s,a){a=Cr(-1,a),a.tag=3,a.payload={element:null};var c=s.value;return a.callback=function(){wu||(wu=!0,sd=c),$h(n,s)},a}function Dm(n,s,a){a=Cr(-1,a),a.tag=3;var c=n.type.getDerivedStateFromError;if(typeof c=="function"){var d=s.value;a.payload=function(){return c(d)},a.callback=function(){$h(n,s)}}var f=n.stateNode;return f!==null&&typeof f.componentDidCatch=="function"&&(a.callback=function(){$h(n,s),typeof c!="function"&&(cs===null?cs=new Set([this]):cs.add(this));var v=s.stack;this.componentDidCatch(s.value,{componentStack:v!==null?v:""})}),a}function Vm(n,s,a){var c=n.pingCache;if(c===null){c=n.pingCache=new RE;var d=new Set;c.set(s,d)}else d=c.get(s),d===void 0&&(d=new Set,c.set(s,d));d.has(a)||(d.add(a),n=$E.bind(null,n,s,a),s.then(n,n))}function Om(n){do{var s;if((s=n.tag===13)&&(s=n.memoizedState,s=s!==null?s.dehydrated!==null:!0),s)return n;n=n.return}while(n!==null);return null}function Mm(n,s,a,c,d){return(n.mode&1)===0?(n===s?n.flags|=65536:(n.flags|=128,a.flags|=131072,a.flags&=-52805,a.tag===1&&(a.alternate===null?a.tag=17:(s=Cr(-1,1),s.tag=2,ls(a,s,1))),a.lanes|=1),n):(n.flags|=65536,n.lanes=d,n)}var PE=Se.ReactCurrentOwner,Jt=!1;function Ht(n,s,a,c){s.child=n===null?nm(s,null,a,c):so(s,n.child,a,c)}function Lm(n,s,a,c,d){a=a.render;var f=s.ref;return oo(s,d),c=Vh(n,s,a,c,f,d),a=Oh(),n!==null&&!Jt?(s.updateQueue=n.updateQueue,s.flags&=-2053,n.lanes&=~d,Rr(n,s,d)):(Ze&&a&&yh(s),s.flags|=1,Ht(n,s,c,d),s.child)}function jm(n,s,a,c,d){if(n===null){var f=a.type;return typeof f=="function"&&!hd(f)&&f.defaultProps===void 0&&a.compare===null&&a.defaultProps===void 0?(s.tag=15,s.type=f,Fm(n,s,f,c,d)):(n=ku(a.type,null,c,s,s.mode,d),n.ref=s.ref,n.return=s,s.child=n)}if(f=n.child,(n.lanes&d)===0){var v=f.memoizedProps;if(a=a.compare,a=a!==null?a:ha,a(v,c)&&n.ref===s.ref)return Rr(n,s,d)}return s.flags|=1,n=ps(f,c),n.ref=s.ref,n.return=s,s.child=n}function Fm(n,s,a,c,d){if(n!==null){var f=n.memoizedProps;if(ha(f,c)&&n.ref===s.ref)if(Jt=!1,s.pendingProps=c=f,(n.lanes&d)!==0)(n.flags&131072)!==0&&(Jt=!0);else return s.lanes=n.lanes,Rr(n,s,d)}return qh(n,s,a,c,d)}function Um(n,s,a){var c=s.pendingProps,d=c.children,f=n!==null?n.memoizedState:null;if(c.mode==="hidden")if((s.mode&1)===0)s.memoizedState={baseLanes:0,cachePool:null,transitions:null},We(co,fn),fn|=a;else{if((a&1073741824)===0)return n=f!==null?f.baseLanes|a:a,s.lanes=s.childLanes=1073741824,s.memoizedState={baseLanes:n,cachePool:null,transitions:null},s.updateQueue=null,We(co,fn),fn|=n,null;s.memoizedState={baseLanes:0,cachePool:null,transitions:null},c=f!==null?f.baseLanes:a,We(co,fn),fn|=c}else f!==null?(c=f.baseLanes|a,s.memoizedState=null):c=a,We(co,fn),fn|=c;return Ht(n,s,d,a),s.child}function zm(n,s){var a=s.ref;(n===null&&a!==null||n!==null&&n.ref!==a)&&(s.flags|=512,s.flags|=2097152)}function qh(n,s,a,c,d){var f=Yt(a)?Xs:Mt.current;return f=eo(s,f),oo(s,d),a=Vh(n,s,a,c,f,d),c=Oh(),n!==null&&!Jt?(s.updateQueue=n.updateQueue,s.flags&=-2053,n.lanes&=~d,Rr(n,s,d)):(Ze&&c&&yh(s),s.flags|=1,Ht(n,s,a,d),s.child)}function Bm(n,s,a,c,d){if(Yt(a)){var f=!0;Xl(s)}else f=!1;if(oo(s,d),s.stateNode===null)gu(n,s),Pm(s,a,c),zh(s,a,c,d),c=!0;else if(n===null){var v=s.stateNode,A=s.memoizedProps;v.props=A;var P=v.context,U=a.contextType;typeof U=="object"&&U!==null?U=En(U):(U=Yt(a)?Xs:Mt.current,U=eo(s,U));var Q=a.getDerivedStateFromProps,Y=typeof Q=="function"||typeof v.getSnapshotBeforeUpdate=="function";Y||typeof v.UNSAFE_componentWillReceiveProps!="function"&&typeof v.componentWillReceiveProps!="function"||(A!==c||P!==U)&&Nm(s,v,c,U),as=!1;var K=s.memoizedState;v.state=K,au(s,c,v,d),P=s.memoizedState,A!==c||K!==P||Qt.current||as?(typeof Q=="function"&&(Uh(s,a,Q,c),P=s.memoizedState),(A=as||Rm(s,a,A,c,K,P,U))?(Y||typeof v.UNSAFE_componentWillMount!="function"&&typeof v.componentWillMount!="function"||(typeof v.componentWillMount=="function"&&v.componentWillMount(),typeof v.UNSAFE_componentWillMount=="function"&&v.UNSAFE_componentWillMount()),typeof v.componentDidMount=="function"&&(s.flags|=4194308)):(typeof v.componentDidMount=="function"&&(s.flags|=4194308),s.memoizedProps=c,s.memoizedState=P),v.props=c,v.state=P,v.context=U,c=A):(typeof v.componentDidMount=="function"&&(s.flags|=4194308),c=!1)}else{v=s.stateNode,sm(n,s),A=s.memoizedProps,U=s.type===s.elementType?A:bn(s.type,A),v.props=U,Y=s.pendingProps,K=v.context,P=a.contextType,typeof P=="object"&&P!==null?P=En(P):(P=Yt(a)?Xs:Mt.current,P=eo(s,P));var ne=a.getDerivedStateFromProps;(Q=typeof ne=="function"||typeof v.getSnapshotBeforeUpdate=="function")||typeof v.UNSAFE_componentWillReceiveProps!="function"&&typeof v.componentWillReceiveProps!="function"||(A!==Y||K!==P)&&Nm(s,v,c,P),as=!1,K=s.memoizedState,v.state=K,au(s,c,v,d);var oe=s.memoizedState;A!==Y||K!==oe||Qt.current||as?(typeof ne=="function"&&(Uh(s,a,ne,c),oe=s.memoizedState),(U=as||Rm(s,a,U,c,K,oe,P)||!1)?(Q||typeof v.UNSAFE_componentWillUpdate!="function"&&typeof v.componentWillUpdate!="function"||(typeof v.componentWillUpdate=="function"&&v.componentWillUpdate(c,oe,P),typeof v.UNSAFE_componentWillUpdate=="function"&&v.UNSAFE_componentWillUpdate(c,oe,P)),typeof v.componentDidUpdate=="function"&&(s.flags|=4),typeof v.getSnapshotBeforeUpdate=="function"&&(s.flags|=1024)):(typeof v.componentDidUpdate!="function"||A===n.memoizedProps&&K===n.memoizedState||(s.flags|=4),typeof v.getSnapshotBeforeUpdate!="function"||A===n.memoizedProps&&K===n.memoizedState||(s.flags|=1024),s.memoizedProps=c,s.memoizedState=oe),v.props=c,v.state=oe,v.context=P,c=U):(typeof v.componentDidUpdate!="function"||A===n.memoizedProps&&K===n.memoizedState||(s.flags|=4),typeof v.getSnapshotBeforeUpdate!="function"||A===n.memoizedProps&&K===n.memoizedState||(s.flags|=1024),c=!1)}return Hh(n,s,a,c,f,d)}function Hh(n,s,a,c,d,f){zm(n,s);var v=(s.flags&128)!==0;if(!c&&!v)return d&&Gp(s,a,!1),Rr(n,s,f);c=s.stateNode,PE.current=s;var A=v&&typeof a.getDerivedStateFromError!="function"?null:c.render();return s.flags|=1,n!==null&&v?(s.child=so(s,n.child,null,f),s.child=so(s,null,A,f)):Ht(n,s,A,f),s.memoizedState=c.state,d&&Gp(s,a,!0),s.child}function $m(n){var s=n.stateNode;s.pendingContext?Hp(n,s.pendingContext,s.pendingContext!==s.context):s.context&&Hp(n,s.context,!1),Ch(n,s.containerInfo)}function qm(n,s,a,c,d){return ro(),wh(d),s.flags|=256,Ht(n,s,a,c),s.child}var Wh={dehydrated:null,treeContext:null,retryLane:0};function Gh(n){return{baseLanes:n,cachePool:null,transitions:null}}function Hm(n,s,a){var c=s.pendingProps,d=et.current,f=!1,v=(s.flags&128)!==0,A;if((A=v)||(A=n!==null&&n.memoizedState===null?!1:(d&2)!==0),A?(f=!0,s.flags&=-129):(n===null||n.memoizedState!==null)&&(d|=1),We(et,d&1),n===null)return Eh(s),n=s.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?((s.mode&1)===0?s.lanes=1:n.data==="$!"?s.lanes=8:s.lanes=1073741824,null):(v=c.children,n=c.fallback,f?(c=s.mode,f=s.child,v={mode:"hidden",children:v},(c&1)===0&&f!==null?(f.childLanes=0,f.pendingProps=v):f=Cu(v,c,0,null),n=li(n,c,a,null),f.return=s,n.return=s,f.sibling=n,s.child=f,s.child.memoizedState=Gh(a),s.memoizedState=Wh,n):Kh(s,v));if(d=n.memoizedState,d!==null&&(A=d.dehydrated,A!==null))return NE(n,s,v,c,A,d,a);if(f){f=c.fallback,v=s.mode,d=n.child,A=d.sibling;var P={mode:"hidden",children:c.children};return(v&1)===0&&s.child!==d?(c=s.child,c.childLanes=0,c.pendingProps=P,s.deletions=null):(c=ps(d,P),c.subtreeFlags=d.subtreeFlags&14680064),A!==null?f=ps(A,f):(f=li(f,v,a,null),f.flags|=2),f.return=s,c.return=s,c.sibling=f,s.child=c,c=f,f=s.child,v=n.child.memoizedState,v=v===null?Gh(a):{baseLanes:v.baseLanes|a,cachePool:null,transitions:v.transitions},f.memoizedState=v,f.childLanes=n.childLanes&~a,s.memoizedState=Wh,c}return f=n.child,n=f.sibling,c=ps(f,{mode:"visible",children:c.children}),(s.mode&1)===0&&(c.lanes=a),c.return=s,c.sibling=null,n!==null&&(a=s.deletions,a===null?(s.deletions=[n],s.flags|=16):a.push(n)),s.child=c,s.memoizedState=null,c}function Kh(n,s){return s=Cu({mode:"visible",children:s},n.mode,0,null),s.return=n,n.child=s}function mu(n,s,a,c){return c!==null&&wh(c),so(s,n.child,null,a),n=Kh(s,s.pendingProps.children),n.flags|=2,s.memoizedState=null,n}function NE(n,s,a,c,d,f,v){if(a)return s.flags&256?(s.flags&=-257,c=Bh(Error(t(422))),mu(n,s,v,c)):s.memoizedState!==null?(s.child=n.child,s.flags|=128,null):(f=c.fallback,d=s.mode,c=Cu({mode:"visible",children:c.children},d,0,null),f=li(f,d,v,null),f.flags|=2,c.return=s,f.return=s,c.sibling=f,s.child=c,(s.mode&1)!==0&&so(s,n.child,null,v),s.child.memoizedState=Gh(v),s.memoizedState=Wh,f);if((s.mode&1)===0)return mu(n,s,v,null);if(d.data==="$!"){if(c=d.nextSibling&&d.nextSibling.dataset,c)var A=c.dgst;return c=A,f=Error(t(419)),c=Bh(f,c,void 0),mu(n,s,v,c)}if(A=(v&n.childLanes)!==0,Jt||A){if(c=St,c!==null){switch(v&-v){case 4:d=2;break;case 16:d=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:d=32;break;case 536870912:d=268435456;break;default:d=0}d=(d&(c.suspendedLanes|v))!==0?0:d,d!==0&&d!==f.retryLane&&(f.retryLane=d,kr(n,d),On(c,n,d,-1))}return cd(),c=Bh(Error(t(421))),mu(n,s,v,c)}return d.data==="$?"?(s.flags|=128,s.child=n.child,s=qE.bind(null,n),d._reactRetry=s,null):(n=f.treeContext,dn=rs(d.nextSibling),hn=s,Ze=!0,Nn=null,n!==null&&(_n[vn++]=Ar,_n[vn++]=xr,_n[vn++]=Zs,Ar=n.id,xr=n.overflow,Zs=s),s=Kh(s,c.children),s.flags|=4096,s)}function Wm(n,s,a){n.lanes|=s;var c=n.alternate;c!==null&&(c.lanes|=s),Ah(n.return,s,a)}function Qh(n,s,a,c,d){var f=n.memoizedState;f===null?n.memoizedState={isBackwards:s,rendering:null,renderingStartTime:0,last:c,tail:a,tailMode:d}:(f.isBackwards=s,f.rendering=null,f.renderingStartTime=0,f.last=c,f.tail=a,f.tailMode=d)}function Gm(n,s,a){var c=s.pendingProps,d=c.revealOrder,f=c.tail;if(Ht(n,s,c.children,a),c=et.current,(c&2)!==0)c=c&1|2,s.flags|=128;else{if(n!==null&&(n.flags&128)!==0)e:for(n=s.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&Wm(n,a,s);else if(n.tag===19)Wm(n,a,s);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===s)break e;for(;n.sibling===null;){if(n.return===null||n.return===s)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}c&=1}if(We(et,c),(s.mode&1)===0)s.memoizedState=null;else switch(d){case"forwards":for(a=s.child,d=null;a!==null;)n=a.alternate,n!==null&&lu(n)===null&&(d=a),a=a.sibling;a=d,a===null?(d=s.child,s.child=null):(d=a.sibling,a.sibling=null),Qh(s,!1,d,a,f);break;case"backwards":for(a=null,d=s.child,s.child=null;d!==null;){if(n=d.alternate,n!==null&&lu(n)===null){s.child=d;break}n=d.sibling,d.sibling=a,a=d,d=n}Qh(s,!0,a,null,f);break;case"together":Qh(s,!1,null,null,void 0);break;default:s.memoizedState=null}return s.child}function gu(n,s){(s.mode&1)===0&&n!==null&&(n.alternate=null,s.alternate=null,s.flags|=2)}function Rr(n,s,a){if(n!==null&&(s.dependencies=n.dependencies),si|=s.lanes,(a&s.childLanes)===0)return null;if(n!==null&&s.child!==n.child)throw Error(t(153));if(s.child!==null){for(n=s.child,a=ps(n,n.pendingProps),s.child=a,a.return=s;n.sibling!==null;)n=n.sibling,a=a.sibling=ps(n,n.pendingProps),a.return=s;a.sibling=null}return s.child}function bE(n,s,a){switch(s.tag){case 3:$m(s),ro();break;case 5:am(s);break;case 1:Yt(s.type)&&Xl(s);break;case 4:Ch(s,s.stateNode.containerInfo);break;case 10:var c=s.type._context,d=s.memoizedProps.value;We(su,c._currentValue),c._currentValue=d;break;case 13:if(c=s.memoizedState,c!==null)return c.dehydrated!==null?(We(et,et.current&1),s.flags|=128,null):(a&s.child.childLanes)!==0?Hm(n,s,a):(We(et,et.current&1),n=Rr(n,s,a),n!==null?n.sibling:null);We(et,et.current&1);break;case 19:if(c=(a&s.childLanes)!==0,(n.flags&128)!==0){if(c)return Gm(n,s,a);s.flags|=128}if(d=s.memoizedState,d!==null&&(d.rendering=null,d.tail=null,d.lastEffect=null),We(et,et.current),c)break;return null;case 22:case 23:return s.lanes=0,Um(n,s,a)}return Rr(n,s,a)}var Km,Yh,Qm,Ym;Km=function(n,s){for(var a=s.child;a!==null;){if(a.tag===5||a.tag===6)n.appendChild(a.stateNode);else if(a.tag!==4&&a.child!==null){a.child.return=a,a=a.child;continue}if(a===s)break;for(;a.sibling===null;){if(a.return===null||a.return===s)return;a=a.return}a.sibling.return=a.return,a=a.sibling}},Yh=function(){},Qm=function(n,s,a,c){var d=n.memoizedProps;if(d!==c){n=s.stateNode,ni(nr.current);var f=null;switch(a){case"input":d=xi(n,d),c=xi(n,c),f=[];break;case"select":d=se({},d,{value:void 0}),c=se({},c,{value:void 0}),f=[];break;case"textarea":d=Uo(n,d),c=Uo(n,c),f=[];break;default:typeof d.onClick!="function"&&typeof c.onClick=="function"&&(n.onclick=Ql)}kn(a,c);var v;a=null;for(U in d)if(!c.hasOwnProperty(U)&&d.hasOwnProperty(U)&&d[U]!=null)if(U==="style"){var A=d[U];for(v in A)A.hasOwnProperty(v)&&(a||(a={}),a[v]="")}else U!=="dangerouslySetInnerHTML"&&U!=="children"&&U!=="suppressContentEditableWarning"&&U!=="suppressHydrationWarning"&&U!=="autoFocus"&&(o.hasOwnProperty(U)?f||(f=[]):(f=f||[]).push(U,null));for(U in c){var P=c[U];if(A=d!=null?d[U]:void 0,c.hasOwnProperty(U)&&P!==A&&(P!=null||A!=null))if(U==="style")if(A){for(v in A)!A.hasOwnProperty(v)||P&&P.hasOwnProperty(v)||(a||(a={}),a[v]="");for(v in P)P.hasOwnProperty(v)&&A[v]!==P[v]&&(a||(a={}),a[v]=P[v])}else a||(f||(f=[]),f.push(U,a)),a=P;else U==="dangerouslySetInnerHTML"?(P=P?P.__html:void 0,A=A?A.__html:void 0,P!=null&&A!==P&&(f=f||[]).push(U,P)):U==="children"?typeof P!="string"&&typeof P!="number"||(f=f||[]).push(U,""+P):U!=="suppressContentEditableWarning"&&U!=="suppressHydrationWarning"&&(o.hasOwnProperty(U)?(P!=null&&U==="onScroll"&&Qe("scroll",n),f||A===P||(f=[])):(f=f||[]).push(U,P))}a&&(f=f||[]).push("style",a);var U=f;(s.updateQueue=U)&&(s.flags|=4)}},Ym=function(n,s,a,c){a!==c&&(s.flags|=4)};function xa(n,s){if(!Ze)switch(n.tailMode){case"hidden":s=n.tail;for(var a=null;s!==null;)s.alternate!==null&&(a=s),s=s.sibling;a===null?n.tail=null:a.sibling=null;break;case"collapsed":a=n.tail;for(var c=null;a!==null;)a.alternate!==null&&(c=a),a=a.sibling;c===null?s||n.tail===null?n.tail=null:n.tail.sibling=null:c.sibling=null}}function jt(n){var s=n.alternate!==null&&n.alternate.child===n.child,a=0,c=0;if(s)for(var d=n.child;d!==null;)a|=d.lanes|d.childLanes,c|=d.subtreeFlags&14680064,c|=d.flags&14680064,d.return=n,d=d.sibling;else for(d=n.child;d!==null;)a|=d.lanes|d.childLanes,c|=d.subtreeFlags,c|=d.flags,d.return=n,d=d.sibling;return n.subtreeFlags|=c,n.childLanes=a,s}function DE(n,s,a){var c=s.pendingProps;switch(_h(s),s.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return jt(s),null;case 1:return Yt(s.type)&&Jl(),jt(s),null;case 3:return c=s.stateNode,ao(),Ye(Qt),Ye(Mt),Nh(),c.pendingContext&&(c.context=c.pendingContext,c.pendingContext=null),(n===null||n.child===null)&&(nu(s)?s.flags|=4:n===null||n.memoizedState.isDehydrated&&(s.flags&256)===0||(s.flags|=1024,Nn!==null&&(ad(Nn),Nn=null))),Yh(n,s),jt(s),null;case 5:Rh(s);var d=ni(wa.current);if(a=s.type,n!==null&&s.stateNode!=null)Qm(n,s,a,c,d),n.ref!==s.ref&&(s.flags|=512,s.flags|=2097152);else{if(!c){if(s.stateNode===null)throw Error(t(166));return jt(s),null}if(n=ni(nr.current),nu(s)){c=s.stateNode,a=s.type;var f=s.memoizedProps;switch(c[tr]=s,c[ga]=f,n=(s.mode&1)!==0,a){case"dialog":Qe("cancel",c),Qe("close",c);break;case"iframe":case"object":case"embed":Qe("load",c);break;case"video":case"audio":for(d=0;d<fa.length;d++)Qe(fa[d],c);break;case"source":Qe("error",c);break;case"img":case"image":case"link":Qe("error",c),Qe("load",c);break;case"details":Qe("toggle",c);break;case"input":El(c,f),Qe("invalid",c);break;case"select":c._wrapperState={wasMultiple:!!f.multiple},Qe("invalid",c);break;case"textarea":zo(c,f),Qe("invalid",c)}kn(a,f),d=null;for(var v in f)if(f.hasOwnProperty(v)){var A=f[v];v==="children"?typeof A=="string"?c.textContent!==A&&(f.suppressHydrationWarning!==!0&&Kl(c.textContent,A,n),d=["children",A]):typeof A=="number"&&c.textContent!==""+A&&(f.suppressHydrationWarning!==!0&&Kl(c.textContent,A,n),d=["children",""+A]):o.hasOwnProperty(v)&&A!=null&&v==="onScroll"&&Qe("scroll",c)}switch(a){case"input":Ai(c),Fo(c,f,!0);break;case"textarea":Ai(c),zr(c);break;case"select":case"option":break;default:typeof f.onClick=="function"&&(c.onclick=Ql)}c=d,s.updateQueue=c,c!==null&&(s.flags|=4)}else{v=d.nodeType===9?d:d.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=Bo(a)),n==="http://www.w3.org/1999/xhtml"?a==="script"?(n=v.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof c.is=="string"?n=v.createElement(a,{is:c.is}):(n=v.createElement(a),a==="select"&&(v=n,c.multiple?v.multiple=!0:c.size&&(v.size=c.size))):n=v.createElementNS(n,a),n[tr]=s,n[ga]=c,Km(n,s,!1,!1),s.stateNode=n;e:{switch(v=Pi(a,c),a){case"dialog":Qe("cancel",n),Qe("close",n),d=c;break;case"iframe":case"object":case"embed":Qe("load",n),d=c;break;case"video":case"audio":for(d=0;d<fa.length;d++)Qe(fa[d],n);d=c;break;case"source":Qe("error",n),d=c;break;case"img":case"image":case"link":Qe("error",n),Qe("load",n),d=c;break;case"details":Qe("toggle",n),d=c;break;case"input":El(n,c),d=xi(n,c),Qe("invalid",n);break;case"option":d=c;break;case"select":n._wrapperState={wasMultiple:!!c.multiple},d=se({},c,{value:void 0}),Qe("invalid",n);break;case"textarea":zo(n,c),d=Uo(n,c),Qe("invalid",n);break;default:d=c}kn(a,d),A=d;for(f in A)if(A.hasOwnProperty(f)){var P=A[f];f==="style"?Ri(n,P):f==="dangerouslySetInnerHTML"?(P=P?P.__html:void 0,P!=null&&Tl(n,P)):f==="children"?typeof P=="string"?(a!=="textarea"||P!=="")&&Ls(n,P):typeof P=="number"&&Ls(n,""+P):f!=="suppressContentEditableWarning"&&f!=="suppressHydrationWarning"&&f!=="autoFocus"&&(o.hasOwnProperty(f)?P!=null&&f==="onScroll"&&Qe("scroll",n):P!=null&&me(n,f,P,v))}switch(a){case"input":Ai(n),Fo(n,c,!1);break;case"textarea":Ai(n),zr(n);break;case"option":c.value!=null&&n.setAttribute("value",""+Ve(c.value));break;case"select":n.multiple=!!c.multiple,f=c.value,f!=null?xn(n,!!c.multiple,f,!1):c.defaultValue!=null&&xn(n,!!c.multiple,c.defaultValue,!0);break;default:typeof d.onClick=="function"&&(n.onclick=Ql)}switch(a){case"button":case"input":case"select":case"textarea":c=!!c.autoFocus;break e;case"img":c=!0;break e;default:c=!1}}c&&(s.flags|=4)}s.ref!==null&&(s.flags|=512,s.flags|=2097152)}return jt(s),null;case 6:if(n&&s.stateNode!=null)Ym(n,s,n.memoizedProps,c);else{if(typeof c!="string"&&s.stateNode===null)throw Error(t(166));if(a=ni(wa.current),ni(nr.current),nu(s)){if(c=s.stateNode,a=s.memoizedProps,c[tr]=s,(f=c.nodeValue!==a)&&(n=hn,n!==null))switch(n.tag){case 3:Kl(c.nodeValue,a,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&Kl(c.nodeValue,a,(n.mode&1)!==0)}f&&(s.flags|=4)}else c=(a.nodeType===9?a:a.ownerDocument).createTextNode(c),c[tr]=s,s.stateNode=c}return jt(s),null;case 13:if(Ye(et),c=s.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(Ze&&dn!==null&&(s.mode&1)!==0&&(s.flags&128)===0)Zp(),ro(),s.flags|=98560,f=!1;else if(f=nu(s),c!==null&&c.dehydrated!==null){if(n===null){if(!f)throw Error(t(318));if(f=s.memoizedState,f=f!==null?f.dehydrated:null,!f)throw Error(t(317));f[tr]=s}else ro(),(s.flags&128)===0&&(s.memoizedState=null),s.flags|=4;jt(s),f=!1}else Nn!==null&&(ad(Nn),Nn=null),f=!0;if(!f)return s.flags&65536?s:null}return(s.flags&128)!==0?(s.lanes=a,s):(c=c!==null,c!==(n!==null&&n.memoizedState!==null)&&c&&(s.child.flags|=8192,(s.mode&1)!==0&&(n===null||(et.current&1)!==0?Et===0&&(Et=3):cd())),s.updateQueue!==null&&(s.flags|=4),jt(s),null);case 4:return ao(),Yh(n,s),n===null&&pa(s.stateNode.containerInfo),jt(s),null;case 10:return Sh(s.type._context),jt(s),null;case 17:return Yt(s.type)&&Jl(),jt(s),null;case 19:if(Ye(et),f=s.memoizedState,f===null)return jt(s),null;if(c=(s.flags&128)!==0,v=f.rendering,v===null)if(c)xa(f,!1);else{if(Et!==0||n!==null&&(n.flags&128)!==0)for(n=s.child;n!==null;){if(v=lu(n),v!==null){for(s.flags|=128,xa(f,!1),c=v.updateQueue,c!==null&&(s.updateQueue=c,s.flags|=4),s.subtreeFlags=0,c=a,a=s.child;a!==null;)f=a,n=c,f.flags&=14680066,v=f.alternate,v===null?(f.childLanes=0,f.lanes=n,f.child=null,f.subtreeFlags=0,f.memoizedProps=null,f.memoizedState=null,f.updateQueue=null,f.dependencies=null,f.stateNode=null):(f.childLanes=v.childLanes,f.lanes=v.lanes,f.child=v.child,f.subtreeFlags=0,f.deletions=null,f.memoizedProps=v.memoizedProps,f.memoizedState=v.memoizedState,f.updateQueue=v.updateQueue,f.type=v.type,n=v.dependencies,f.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),a=a.sibling;return We(et,et.current&1|2),s.child}n=n.sibling}f.tail!==null&&Ke()>ho&&(s.flags|=128,c=!0,xa(f,!1),s.lanes=4194304)}else{if(!c)if(n=lu(v),n!==null){if(s.flags|=128,c=!0,a=n.updateQueue,a!==null&&(s.updateQueue=a,s.flags|=4),xa(f,!0),f.tail===null&&f.tailMode==="hidden"&&!v.alternate&&!Ze)return jt(s),null}else 2*Ke()-f.renderingStartTime>ho&&a!==1073741824&&(s.flags|=128,c=!0,xa(f,!1),s.lanes=4194304);f.isBackwards?(v.sibling=s.child,s.child=v):(a=f.last,a!==null?a.sibling=v:s.child=v,f.last=v)}return f.tail!==null?(s=f.tail,f.rendering=s,f.tail=s.sibling,f.renderingStartTime=Ke(),s.sibling=null,a=et.current,We(et,c?a&1|2:a&1),s):(jt(s),null);case 22:case 23:return ud(),c=s.memoizedState!==null,n!==null&&n.memoizedState!==null!==c&&(s.flags|=8192),c&&(s.mode&1)!==0?(fn&1073741824)!==0&&(jt(s),s.subtreeFlags&6&&(s.flags|=8192)):jt(s),null;case 24:return null;case 25:return null}throw Error(t(156,s.tag))}function VE(n,s){switch(_h(s),s.tag){case 1:return Yt(s.type)&&Jl(),n=s.flags,n&65536?(s.flags=n&-65537|128,s):null;case 3:return ao(),Ye(Qt),Ye(Mt),Nh(),n=s.flags,(n&65536)!==0&&(n&128)===0?(s.flags=n&-65537|128,s):null;case 5:return Rh(s),null;case 13:if(Ye(et),n=s.memoizedState,n!==null&&n.dehydrated!==null){if(s.alternate===null)throw Error(t(340));ro()}return n=s.flags,n&65536?(s.flags=n&-65537|128,s):null;case 19:return Ye(et),null;case 4:return ao(),null;case 10:return Sh(s.type._context),null;case 22:case 23:return ud(),null;case 24:return null;default:return null}}var yu=!1,Ft=!1,OE=typeof WeakSet=="function"?WeakSet:Set,ie=null;function uo(n,s){var a=n.ref;if(a!==null)if(typeof a=="function")try{a(null)}catch(c){st(n,s,c)}else a.current=null}function Jh(n,s,a){try{a()}catch(c){st(n,s,c)}}var Jm=!1;function ME(n,s){if(uh=Er,n=Rp(),th(n)){if("selectionStart"in n)var a={start:n.selectionStart,end:n.selectionEnd};else e:{a=(a=n.ownerDocument)&&a.defaultView||window;var c=a.getSelection&&a.getSelection();if(c&&c.rangeCount!==0){a=c.anchorNode;var d=c.anchorOffset,f=c.focusNode;c=c.focusOffset;try{a.nodeType,f.nodeType}catch{a=null;break e}var v=0,A=-1,P=-1,U=0,Q=0,Y=n,K=null;t:for(;;){for(var ne;Y!==a||d!==0&&Y.nodeType!==3||(A=v+d),Y!==f||c!==0&&Y.nodeType!==3||(P=v+c),Y.nodeType===3&&(v+=Y.nodeValue.length),(ne=Y.firstChild)!==null;)K=Y,Y=ne;for(;;){if(Y===n)break t;if(K===a&&++U===d&&(A=v),K===f&&++Q===c&&(P=v),(ne=Y.nextSibling)!==null)break;Y=K,K=Y.parentNode}Y=ne}a=A===-1||P===-1?null:{start:A,end:P}}else a=null}a=a||{start:0,end:0}}else a=null;for(ch={focusedElem:n,selectionRange:a},Er=!1,ie=s;ie!==null;)if(s=ie,n=s.child,(s.subtreeFlags&1028)!==0&&n!==null)n.return=s,ie=n;else for(;ie!==null;){s=ie;try{var oe=s.alternate;if((s.flags&1024)!==0)switch(s.tag){case 0:case 11:case 15:break;case 1:if(oe!==null){var le=oe.memoizedProps,lt=oe.memoizedState,L=s.stateNode,b=L.getSnapshotBeforeUpdate(s.elementType===s.type?le:bn(s.type,le),lt);L.__reactInternalSnapshotBeforeUpdate=b}break;case 3:var F=s.stateNode.containerInfo;F.nodeType===1?F.textContent="":F.nodeType===9&&F.documentElement&&F.removeChild(F.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(t(163))}}catch(J){st(s,s.return,J)}if(n=s.sibling,n!==null){n.return=s.return,ie=n;break}ie=s.return}return oe=Jm,Jm=!1,oe}function ka(n,s,a){var c=s.updateQueue;if(c=c!==null?c.lastEffect:null,c!==null){var d=c=c.next;do{if((d.tag&n)===n){var f=d.destroy;d.destroy=void 0,f!==void 0&&Jh(s,a,f)}d=d.next}while(d!==c)}}function _u(n,s){if(s=s.updateQueue,s=s!==null?s.lastEffect:null,s!==null){var a=s=s.next;do{if((a.tag&n)===n){var c=a.create;a.destroy=c()}a=a.next}while(a!==s)}}function Xh(n){var s=n.ref;if(s!==null){var a=n.stateNode;switch(n.tag){case 5:n=a;break;default:n=a}typeof s=="function"?s(n):s.current=n}}function Xm(n){var s=n.alternate;s!==null&&(n.alternate=null,Xm(s)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(s=n.stateNode,s!==null&&(delete s[tr],delete s[ga],delete s[ph],delete s[_E],delete s[vE])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function Zm(n){return n.tag===5||n.tag===3||n.tag===4}function eg(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||Zm(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function Zh(n,s,a){var c=n.tag;if(c===5||c===6)n=n.stateNode,s?a.nodeType===8?a.parentNode.insertBefore(n,s):a.insertBefore(n,s):(a.nodeType===8?(s=a.parentNode,s.insertBefore(n,a)):(s=a,s.appendChild(n)),a=a._reactRootContainer,a!=null||s.onclick!==null||(s.onclick=Ql));else if(c!==4&&(n=n.child,n!==null))for(Zh(n,s,a),n=n.sibling;n!==null;)Zh(n,s,a),n=n.sibling}function ed(n,s,a){var c=n.tag;if(c===5||c===6)n=n.stateNode,s?a.insertBefore(n,s):a.appendChild(n);else if(c!==4&&(n=n.child,n!==null))for(ed(n,s,a),n=n.sibling;n!==null;)ed(n,s,a),n=n.sibling}var Rt=null,Dn=!1;function us(n,s,a){for(a=a.child;a!==null;)tg(n,s,a),a=a.sibling}function tg(n,s,a){if(sn&&typeof sn.onCommitFiberUnmount=="function")try{sn.onCommitFiberUnmount(Bs,a)}catch{}switch(a.tag){case 5:Ft||uo(a,s);case 6:var c=Rt,d=Dn;Rt=null,us(n,s,a),Rt=c,Dn=d,Rt!==null&&(Dn?(n=Rt,a=a.stateNode,n.nodeType===8?n.parentNode.removeChild(a):n.removeChild(a)):Rt.removeChild(a.stateNode));break;case 18:Rt!==null&&(Dn?(n=Rt,a=a.stateNode,n.nodeType===8?fh(n.parentNode,a):n.nodeType===1&&fh(n,a),Zr(n)):fh(Rt,a.stateNode));break;case 4:c=Rt,d=Dn,Rt=a.stateNode.containerInfo,Dn=!0,us(n,s,a),Rt=c,Dn=d;break;case 0:case 11:case 14:case 15:if(!Ft&&(c=a.updateQueue,c!==null&&(c=c.lastEffect,c!==null))){d=c=c.next;do{var f=d,v=f.destroy;f=f.tag,v!==void 0&&((f&2)!==0||(f&4)!==0)&&Jh(a,s,v),d=d.next}while(d!==c)}us(n,s,a);break;case 1:if(!Ft&&(uo(a,s),c=a.stateNode,typeof c.componentWillUnmount=="function"))try{c.props=a.memoizedProps,c.state=a.memoizedState,c.componentWillUnmount()}catch(A){st(a,s,A)}us(n,s,a);break;case 21:us(n,s,a);break;case 22:a.mode&1?(Ft=(c=Ft)||a.memoizedState!==null,us(n,s,a),Ft=c):us(n,s,a);break;default:us(n,s,a)}}function ng(n){var s=n.updateQueue;if(s!==null){n.updateQueue=null;var a=n.stateNode;a===null&&(a=n.stateNode=new OE),s.forEach(function(c){var d=HE.bind(null,n,c);a.has(c)||(a.add(c),c.then(d,d))})}}function Vn(n,s){var a=s.deletions;if(a!==null)for(var c=0;c<a.length;c++){var d=a[c];try{var f=n,v=s,A=v;e:for(;A!==null;){switch(A.tag){case 5:Rt=A.stateNode,Dn=!1;break e;case 3:Rt=A.stateNode.containerInfo,Dn=!0;break e;case 4:Rt=A.stateNode.containerInfo,Dn=!0;break e}A=A.return}if(Rt===null)throw Error(t(160));tg(f,v,d),Rt=null,Dn=!1;var P=d.alternate;P!==null&&(P.return=null),d.return=null}catch(U){st(d,s,U)}}if(s.subtreeFlags&12854)for(s=s.child;s!==null;)rg(s,n),s=s.sibling}function rg(n,s){var a=n.alternate,c=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(Vn(s,n),sr(n),c&4){try{ka(3,n,n.return),_u(3,n)}catch(le){st(n,n.return,le)}try{ka(5,n,n.return)}catch(le){st(n,n.return,le)}}break;case 1:Vn(s,n),sr(n),c&512&&a!==null&&uo(a,a.return);break;case 5:if(Vn(s,n),sr(n),c&512&&a!==null&&uo(a,a.return),n.flags&32){var d=n.stateNode;try{Ls(d,"")}catch(le){st(n,n.return,le)}}if(c&4&&(d=n.stateNode,d!=null)){var f=n.memoizedProps,v=a!==null?a.memoizedProps:f,A=n.type,P=n.updateQueue;if(n.updateQueue=null,P!==null)try{A==="input"&&f.type==="radio"&&f.name!=null&&ki(d,f),Pi(A,v);var U=Pi(A,f);for(v=0;v<P.length;v+=2){var Q=P[v],Y=P[v+1];Q==="style"?Ri(d,Y):Q==="dangerouslySetInnerHTML"?Tl(d,Y):Q==="children"?Ls(d,Y):me(d,Q,Y,U)}switch(A){case"input":Ms(d,f);break;case"textarea":wl(d,f);break;case"select":var K=d._wrapperState.wasMultiple;d._wrapperState.wasMultiple=!!f.multiple;var ne=f.value;ne!=null?xn(d,!!f.multiple,ne,!1):K!==!!f.multiple&&(f.defaultValue!=null?xn(d,!!f.multiple,f.defaultValue,!0):xn(d,!!f.multiple,f.multiple?[]:"",!1))}d[ga]=f}catch(le){st(n,n.return,le)}}break;case 6:if(Vn(s,n),sr(n),c&4){if(n.stateNode===null)throw Error(t(162));d=n.stateNode,f=n.memoizedProps;try{d.nodeValue=f}catch(le){st(n,n.return,le)}}break;case 3:if(Vn(s,n),sr(n),c&4&&a!==null&&a.memoizedState.isDehydrated)try{Zr(s.containerInfo)}catch(le){st(n,n.return,le)}break;case 4:Vn(s,n),sr(n);break;case 13:Vn(s,n),sr(n),d=n.child,d.flags&8192&&(f=d.memoizedState!==null,d.stateNode.isHidden=f,!f||d.alternate!==null&&d.alternate.memoizedState!==null||(rd=Ke())),c&4&&ng(n);break;case 22:if(Q=a!==null&&a.memoizedState!==null,n.mode&1?(Ft=(U=Ft)||Q,Vn(s,n),Ft=U):Vn(s,n),sr(n),c&8192){if(U=n.memoizedState!==null,(n.stateNode.isHidden=U)&&!Q&&(n.mode&1)!==0)for(ie=n,Q=n.child;Q!==null;){for(Y=ie=Q;ie!==null;){switch(K=ie,ne=K.child,K.tag){case 0:case 11:case 14:case 15:ka(4,K,K.return);break;case 1:uo(K,K.return);var oe=K.stateNode;if(typeof oe.componentWillUnmount=="function"){c=K,a=K.return;try{s=c,oe.props=s.memoizedProps,oe.state=s.memoizedState,oe.componentWillUnmount()}catch(le){st(c,a,le)}}break;case 5:uo(K,K.return);break;case 22:if(K.memoizedState!==null){og(Y);continue}}ne!==null?(ne.return=K,ie=ne):og(Y)}Q=Q.sibling}e:for(Q=null,Y=n;;){if(Y.tag===5){if(Q===null){Q=Y;try{d=Y.stateNode,U?(f=d.style,typeof f.setProperty=="function"?f.setProperty("display","none","important"):f.display="none"):(A=Y.stateNode,P=Y.memoizedProps.style,v=P!=null&&P.hasOwnProperty("display")?P.display:null,A.style.display=qr("display",v))}catch(le){st(n,n.return,le)}}}else if(Y.tag===6){if(Q===null)try{Y.stateNode.nodeValue=U?"":Y.memoizedProps}catch(le){st(n,n.return,le)}}else if((Y.tag!==22&&Y.tag!==23||Y.memoizedState===null||Y===n)&&Y.child!==null){Y.child.return=Y,Y=Y.child;continue}if(Y===n)break e;for(;Y.sibling===null;){if(Y.return===null||Y.return===n)break e;Q===Y&&(Q=null),Y=Y.return}Q===Y&&(Q=null),Y.sibling.return=Y.return,Y=Y.sibling}}break;case 19:Vn(s,n),sr(n),c&4&&ng(n);break;case 21:break;default:Vn(s,n),sr(n)}}function sr(n){var s=n.flags;if(s&2){try{e:{for(var a=n.return;a!==null;){if(Zm(a)){var c=a;break e}a=a.return}throw Error(t(160))}switch(c.tag){case 5:var d=c.stateNode;c.flags&32&&(Ls(d,""),c.flags&=-33);var f=eg(n);ed(n,f,d);break;case 3:case 4:var v=c.stateNode.containerInfo,A=eg(n);Zh(n,A,v);break;default:throw Error(t(161))}}catch(P){st(n,n.return,P)}n.flags&=-3}s&4096&&(n.flags&=-4097)}function LE(n,s,a){ie=n,sg(n)}function sg(n,s,a){for(var c=(n.mode&1)!==0;ie!==null;){var d=ie,f=d.child;if(d.tag===22&&c){var v=d.memoizedState!==null||yu;if(!v){var A=d.alternate,P=A!==null&&A.memoizedState!==null||Ft;A=yu;var U=Ft;if(yu=v,(Ft=P)&&!U)for(ie=d;ie!==null;)v=ie,P=v.child,v.tag===22&&v.memoizedState!==null?ag(d):P!==null?(P.return=v,ie=P):ag(d);for(;f!==null;)ie=f,sg(f),f=f.sibling;ie=d,yu=A,Ft=U}ig(n)}else(d.subtreeFlags&8772)!==0&&f!==null?(f.return=d,ie=f):ig(n)}}function ig(n){for(;ie!==null;){var s=ie;if((s.flags&8772)!==0){var a=s.alternate;try{if((s.flags&8772)!==0)switch(s.tag){case 0:case 11:case 15:Ft||_u(5,s);break;case 1:var c=s.stateNode;if(s.flags&4&&!Ft)if(a===null)c.componentDidMount();else{var d=s.elementType===s.type?a.memoizedProps:bn(s.type,a.memoizedProps);c.componentDidUpdate(d,a.memoizedState,c.__reactInternalSnapshotBeforeUpdate)}var f=s.updateQueue;f!==null&&om(s,f,c);break;case 3:var v=s.updateQueue;if(v!==null){if(a=null,s.child!==null)switch(s.child.tag){case 5:a=s.child.stateNode;break;case 1:a=s.child.stateNode}om(s,v,a)}break;case 5:var A=s.stateNode;if(a===null&&s.flags&4){a=A;var P=s.memoizedProps;switch(s.type){case"button":case"input":case"select":case"textarea":P.autoFocus&&a.focus();break;case"img":P.src&&(a.src=P.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(s.memoizedState===null){var U=s.alternate;if(U!==null){var Q=U.memoizedState;if(Q!==null){var Y=Q.dehydrated;Y!==null&&Zr(Y)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(t(163))}Ft||s.flags&512&&Xh(s)}catch(K){st(s,s.return,K)}}if(s===n){ie=null;break}if(a=s.sibling,a!==null){a.return=s.return,ie=a;break}ie=s.return}}function og(n){for(;ie!==null;){var s=ie;if(s===n){ie=null;break}var a=s.sibling;if(a!==null){a.return=s.return,ie=a;break}ie=s.return}}function ag(n){for(;ie!==null;){var s=ie;try{switch(s.tag){case 0:case 11:case 15:var a=s.return;try{_u(4,s)}catch(P){st(s,a,P)}break;case 1:var c=s.stateNode;if(typeof c.componentDidMount=="function"){var d=s.return;try{c.componentDidMount()}catch(P){st(s,d,P)}}var f=s.return;try{Xh(s)}catch(P){st(s,f,P)}break;case 5:var v=s.return;try{Xh(s)}catch(P){st(s,v,P)}}}catch(P){st(s,s.return,P)}if(s===n){ie=null;break}var A=s.sibling;if(A!==null){A.return=s.return,ie=A;break}ie=s.return}}var jE=Math.ceil,vu=Se.ReactCurrentDispatcher,td=Se.ReactCurrentOwner,Tn=Se.ReactCurrentBatchConfig,Oe=0,St=null,pt=null,Pt=0,fn=0,co=ss(0),Et=0,Ca=null,si=0,Eu=0,nd=0,Ra=null,Xt=null,rd=0,ho=1/0,Pr=null,wu=!1,sd=null,cs=null,Tu=!1,hs=null,Iu=0,Pa=0,id=null,Su=-1,Au=0;function Wt(){return(Oe&6)!==0?Ke():Su!==-1?Su:Su=Ke()}function ds(n){return(n.mode&1)===0?1:(Oe&2)!==0&&Pt!==0?Pt&-Pt:wE.transition!==null?(Au===0&&(Au=Jo()),Au):(n=be,n!==0||(n=window.event,n=n===void 0?16:Ui(n.type)),n)}function On(n,s,a,c){if(50<Pa)throw Pa=0,id=null,Error(t(185));Ws(n,a,c),((Oe&2)===0||n!==St)&&(n===St&&((Oe&2)===0&&(Eu|=a),Et===4&&fs(n,Pt)),Zt(n,c),a===1&&Oe===0&&(s.mode&1)===0&&(ho=Ke()+500,Zl&&os()))}function Zt(n,s){var a=n.callbackNode;Hs(n,s);var c=yr(n,n===St?Pt:0);if(c===0)a!==null&&Di(a),n.callbackNode=null,n.callbackPriority=0;else if(s=c&-c,n.callbackPriority!==s){if(a!=null&&Di(a),s===1)n.tag===0?EE(ug.bind(null,n)):Kp(ug.bind(null,n)),gE(function(){(Oe&6)===0&&os()}),a=null;else{switch(Hn(c)){case 1:a=Vi;break;case 4:a=Ko;break;case 16:a=zs;break;case 536870912:a=Oi;break;default:a=zs}a=yg(a,lg.bind(null,n))}n.callbackPriority=s,n.callbackNode=a}}function lg(n,s){if(Su=-1,Au=0,(Oe&6)!==0)throw Error(t(327));var a=n.callbackNode;if(fo()&&n.callbackNode!==a)return null;var c=yr(n,n===St?Pt:0);if(c===0)return null;if((c&30)!==0||(c&n.expiredLanes)!==0||s)s=xu(n,c);else{s=c;var d=Oe;Oe|=2;var f=hg();(St!==n||Pt!==s)&&(Pr=null,ho=Ke()+500,oi(n,s));do try{zE();break}catch(A){cg(n,A)}while(!0);Ih(),vu.current=f,Oe=d,pt!==null?s=0:(St=null,Pt=0,s=Et)}if(s!==0){if(s===2&&(d=Yo(n),d!==0&&(c=d,s=od(n,d))),s===1)throw a=Ca,oi(n,0),fs(n,c),Zt(n,Ke()),a;if(s===6)fs(n,c);else{if(d=n.current.alternate,(c&30)===0&&!FE(d)&&(s=xu(n,c),s===2&&(f=Yo(n),f!==0&&(c=f,s=od(n,f))),s===1))throw a=Ca,oi(n,0),fs(n,c),Zt(n,Ke()),a;switch(n.finishedWork=d,n.finishedLanes=c,s){case 0:case 1:throw Error(t(345));case 2:ai(n,Xt,Pr);break;case 3:if(fs(n,c),(c&130023424)===c&&(s=rd+500-Ke(),10<s)){if(yr(n,0)!==0)break;if(d=n.suspendedLanes,(d&c)!==c){Wt(),n.pingedLanes|=n.suspendedLanes&d;break}n.timeoutHandle=dh(ai.bind(null,n,Xt,Pr),s);break}ai(n,Xt,Pr);break;case 4:if(fs(n,c),(c&4194240)===c)break;for(s=n.eventTimes,d=-1;0<c;){var v=31-on(c);f=1<<v,v=s[v],v>d&&(d=v),c&=~f}if(c=d,c=Ke()-c,c=(120>c?120:480>c?480:1080>c?1080:1920>c?1920:3e3>c?3e3:4320>c?4320:1960*jE(c/1960))-c,10<c){n.timeoutHandle=dh(ai.bind(null,n,Xt,Pr),c);break}ai(n,Xt,Pr);break;case 5:ai(n,Xt,Pr);break;default:throw Error(t(329))}}}return Zt(n,Ke()),n.callbackNode===a?lg.bind(null,n):null}function od(n,s){var a=Ra;return n.current.memoizedState.isDehydrated&&(oi(n,s).flags|=256),n=xu(n,s),n!==2&&(s=Xt,Xt=a,s!==null&&ad(s)),n}function ad(n){Xt===null?Xt=n:Xt.push.apply(Xt,n)}function FE(n){for(var s=n;;){if(s.flags&16384){var a=s.updateQueue;if(a!==null&&(a=a.stores,a!==null))for(var c=0;c<a.length;c++){var d=a[c],f=d.getSnapshot;d=d.value;try{if(!Pn(f(),d))return!1}catch{return!1}}}if(a=s.child,s.subtreeFlags&16384&&a!==null)a.return=s,s=a;else{if(s===n)break;for(;s.sibling===null;){if(s.return===null||s.return===n)return!0;s=s.return}s.sibling.return=s.return,s=s.sibling}}return!0}function fs(n,s){for(s&=~nd,s&=~Eu,n.suspendedLanes|=s,n.pingedLanes&=~s,n=n.expirationTimes;0<s;){var a=31-on(s),c=1<<a;n[a]=-1,s&=~c}}function ug(n){if((Oe&6)!==0)throw Error(t(327));fo();var s=yr(n,0);if((s&1)===0)return Zt(n,Ke()),null;var a=xu(n,s);if(n.tag!==0&&a===2){var c=Yo(n);c!==0&&(s=c,a=od(n,c))}if(a===1)throw a=Ca,oi(n,0),fs(n,s),Zt(n,Ke()),a;if(a===6)throw Error(t(345));return n.finishedWork=n.current.alternate,n.finishedLanes=s,ai(n,Xt,Pr),Zt(n,Ke()),null}function ld(n,s){var a=Oe;Oe|=1;try{return n(s)}finally{Oe=a,Oe===0&&(ho=Ke()+500,Zl&&os())}}function ii(n){hs!==null&&hs.tag===0&&(Oe&6)===0&&fo();var s=Oe;Oe|=1;var a=Tn.transition,c=be;try{if(Tn.transition=null,be=1,n)return n()}finally{be=c,Tn.transition=a,Oe=s,(Oe&6)===0&&os()}}function ud(){fn=co.current,Ye(co)}function oi(n,s){n.finishedWork=null,n.finishedLanes=0;var a=n.timeoutHandle;if(a!==-1&&(n.timeoutHandle=-1,mE(a)),pt!==null)for(a=pt.return;a!==null;){var c=a;switch(_h(c),c.tag){case 1:c=c.type.childContextTypes,c!=null&&Jl();break;case 3:ao(),Ye(Qt),Ye(Mt),Nh();break;case 5:Rh(c);break;case 4:ao();break;case 13:Ye(et);break;case 19:Ye(et);break;case 10:Sh(c.type._context);break;case 22:case 23:ud()}a=a.return}if(St=n,pt=n=ps(n.current,null),Pt=fn=s,Et=0,Ca=null,nd=Eu=si=0,Xt=Ra=null,ti!==null){for(s=0;s<ti.length;s++)if(a=ti[s],c=a.interleaved,c!==null){a.interleaved=null;var d=c.next,f=a.pending;if(f!==null){var v=f.next;f.next=d,c.next=v}a.pending=c}ti=null}return n}function cg(n,s){do{var a=pt;try{if(Ih(),uu.current=fu,cu){for(var c=tt.memoizedState;c!==null;){var d=c.queue;d!==null&&(d.pending=null),c=c.next}cu=!1}if(ri=0,It=vt=tt=null,Ta=!1,Ia=0,td.current=null,a===null||a.return===null){Et=1,Ca=s,pt=null;break}e:{var f=n,v=a.return,A=a,P=s;if(s=Pt,A.flags|=32768,P!==null&&typeof P=="object"&&typeof P.then=="function"){var U=P,Q=A,Y=Q.tag;if((Q.mode&1)===0&&(Y===0||Y===11||Y===15)){var K=Q.alternate;K?(Q.updateQueue=K.updateQueue,Q.memoizedState=K.memoizedState,Q.lanes=K.lanes):(Q.updateQueue=null,Q.memoizedState=null)}var ne=Om(v);if(ne!==null){ne.flags&=-257,Mm(ne,v,A,f,s),ne.mode&1&&Vm(f,U,s),s=ne,P=U;var oe=s.updateQueue;if(oe===null){var le=new Set;le.add(P),s.updateQueue=le}else oe.add(P);break e}else{if((s&1)===0){Vm(f,U,s),cd();break e}P=Error(t(426))}}else if(Ze&&A.mode&1){var lt=Om(v);if(lt!==null){(lt.flags&65536)===0&&(lt.flags|=256),Mm(lt,v,A,f,s),wh(lo(P,A));break e}}f=P=lo(P,A),Et!==4&&(Et=2),Ra===null?Ra=[f]:Ra.push(f),f=v;do{switch(f.tag){case 3:f.flags|=65536,s&=-s,f.lanes|=s;var L=bm(f,P,s);im(f,L);break e;case 1:A=P;var b=f.type,F=f.stateNode;if((f.flags&128)===0&&(typeof b.getDerivedStateFromError=="function"||F!==null&&typeof F.componentDidCatch=="function"&&(cs===null||!cs.has(F)))){f.flags|=65536,s&=-s,f.lanes|=s;var J=Dm(f,A,s);im(f,J);break e}}f=f.return}while(f!==null)}fg(a)}catch(ue){s=ue,pt===a&&a!==null&&(pt=a=a.return);continue}break}while(!0)}function hg(){var n=vu.current;return vu.current=fu,n===null?fu:n}function cd(){(Et===0||Et===3||Et===2)&&(Et=4),St===null||(si&268435455)===0&&(Eu&268435455)===0||fs(St,Pt)}function xu(n,s){var a=Oe;Oe|=2;var c=hg();(St!==n||Pt!==s)&&(Pr=null,oi(n,s));do try{UE();break}catch(d){cg(n,d)}while(!0);if(Ih(),Oe=a,vu.current=c,pt!==null)throw Error(t(261));return St=null,Pt=0,Et}function UE(){for(;pt!==null;)dg(pt)}function zE(){for(;pt!==null&&!Us();)dg(pt)}function dg(n){var s=gg(n.alternate,n,fn);n.memoizedProps=n.pendingProps,s===null?fg(n):pt=s,td.current=null}function fg(n){var s=n;do{var a=s.alternate;if(n=s.return,(s.flags&32768)===0){if(a=DE(a,s,fn),a!==null){pt=a;return}}else{if(a=VE(a,s),a!==null){a.flags&=32767,pt=a;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{Et=6,pt=null;return}}if(s=s.sibling,s!==null){pt=s;return}pt=s=n}while(s!==null);Et===0&&(Et=5)}function ai(n,s,a){var c=be,d=Tn.transition;try{Tn.transition=null,be=1,BE(n,s,a,c)}finally{Tn.transition=d,be=c}return null}function BE(n,s,a,c){do fo();while(hs!==null);if((Oe&6)!==0)throw Error(t(327));a=n.finishedWork;var d=n.finishedLanes;if(a===null)return null;if(n.finishedWork=null,n.finishedLanes=0,a===n.current)throw Error(t(177));n.callbackNode=null,n.callbackPriority=0;var f=a.lanes|a.childLanes;if(Yc(n,f),n===St&&(pt=St=null,Pt=0),(a.subtreeFlags&2064)===0&&(a.flags&2064)===0||Tu||(Tu=!0,yg(zs,function(){return fo(),null})),f=(a.flags&15990)!==0,(a.subtreeFlags&15990)!==0||f){f=Tn.transition,Tn.transition=null;var v=be;be=1;var A=Oe;Oe|=4,td.current=null,ME(n,a),rg(a,n),lE(ch),Er=!!uh,ch=uh=null,n.current=a,LE(a),gr(),Oe=A,be=v,Tn.transition=f}else n.current=a;if(Tu&&(Tu=!1,hs=n,Iu=d),f=n.pendingLanes,f===0&&(cs=null),Dl(a.stateNode),Zt(n,Ke()),s!==null)for(c=n.onRecoverableError,a=0;a<s.length;a++)d=s[a],c(d.value,{componentStack:d.stack,digest:d.digest});if(wu)throw wu=!1,n=sd,sd=null,n;return(Iu&1)!==0&&n.tag!==0&&fo(),f=n.pendingLanes,(f&1)!==0?n===id?Pa++:(Pa=0,id=n):Pa=0,os(),null}function fo(){if(hs!==null){var n=Hn(Iu),s=Tn.transition,a=be;try{if(Tn.transition=null,be=16>n?16:n,hs===null)var c=!1;else{if(n=hs,hs=null,Iu=0,(Oe&6)!==0)throw Error(t(331));var d=Oe;for(Oe|=4,ie=n.current;ie!==null;){var f=ie,v=f.child;if((ie.flags&16)!==0){var A=f.deletions;if(A!==null){for(var P=0;P<A.length;P++){var U=A[P];for(ie=U;ie!==null;){var Q=ie;switch(Q.tag){case 0:case 11:case 15:ka(8,Q,f)}var Y=Q.child;if(Y!==null)Y.return=Q,ie=Y;else for(;ie!==null;){Q=ie;var K=Q.sibling,ne=Q.return;if(Xm(Q),Q===U){ie=null;break}if(K!==null){K.return=ne,ie=K;break}ie=ne}}}var oe=f.alternate;if(oe!==null){var le=oe.child;if(le!==null){oe.child=null;do{var lt=le.sibling;le.sibling=null,le=lt}while(le!==null)}}ie=f}}if((f.subtreeFlags&2064)!==0&&v!==null)v.return=f,ie=v;else e:for(;ie!==null;){if(f=ie,(f.flags&2048)!==0)switch(f.tag){case 0:case 11:case 15:ka(9,f,f.return)}var L=f.sibling;if(L!==null){L.return=f.return,ie=L;break e}ie=f.return}}var b=n.current;for(ie=b;ie!==null;){v=ie;var F=v.child;if((v.subtreeFlags&2064)!==0&&F!==null)F.return=v,ie=F;else e:for(v=b;ie!==null;){if(A=ie,(A.flags&2048)!==0)try{switch(A.tag){case 0:case 11:case 15:_u(9,A)}}catch(ue){st(A,A.return,ue)}if(A===v){ie=null;break e}var J=A.sibling;if(J!==null){J.return=A.return,ie=J;break e}ie=A.return}}if(Oe=d,os(),sn&&typeof sn.onPostCommitFiberRoot=="function")try{sn.onPostCommitFiberRoot(Bs,n)}catch{}c=!0}return c}finally{be=a,Tn.transition=s}}return!1}function pg(n,s,a){s=lo(a,s),s=bm(n,s,1),n=ls(n,s,1),s=Wt(),n!==null&&(Ws(n,1,s),Zt(n,s))}function st(n,s,a){if(n.tag===3)pg(n,n,a);else for(;s!==null;){if(s.tag===3){pg(s,n,a);break}else if(s.tag===1){var c=s.stateNode;if(typeof s.type.getDerivedStateFromError=="function"||typeof c.componentDidCatch=="function"&&(cs===null||!cs.has(c))){n=lo(a,n),n=Dm(s,n,1),s=ls(s,n,1),n=Wt(),s!==null&&(Ws(s,1,n),Zt(s,n));break}}s=s.return}}function $E(n,s,a){var c=n.pingCache;c!==null&&c.delete(s),s=Wt(),n.pingedLanes|=n.suspendedLanes&a,St===n&&(Pt&a)===a&&(Et===4||Et===3&&(Pt&130023424)===Pt&&500>Ke()-rd?oi(n,0):nd|=a),Zt(n,s)}function mg(n,s){s===0&&((n.mode&1)===0?s=1:(s=Yr,Yr<<=1,(Yr&130023424)===0&&(Yr=4194304)));var a=Wt();n=kr(n,s),n!==null&&(Ws(n,s,a),Zt(n,a))}function qE(n){var s=n.memoizedState,a=0;s!==null&&(a=s.retryLane),mg(n,a)}function HE(n,s){var a=0;switch(n.tag){case 13:var c=n.stateNode,d=n.memoizedState;d!==null&&(a=d.retryLane);break;case 19:c=n.stateNode;break;default:throw Error(t(314))}c!==null&&c.delete(s),mg(n,a)}var gg;gg=function(n,s,a){if(n!==null)if(n.memoizedProps!==s.pendingProps||Qt.current)Jt=!0;else{if((n.lanes&a)===0&&(s.flags&128)===0)return Jt=!1,bE(n,s,a);Jt=(n.flags&131072)!==0}else Jt=!1,Ze&&(s.flags&1048576)!==0&&Qp(s,tu,s.index);switch(s.lanes=0,s.tag){case 2:var c=s.type;gu(n,s),n=s.pendingProps;var d=eo(s,Mt.current);oo(s,a),d=Vh(null,s,c,n,d,a);var f=Oh();return s.flags|=1,typeof d=="object"&&d!==null&&typeof d.render=="function"&&d.$$typeof===void 0?(s.tag=1,s.memoizedState=null,s.updateQueue=null,Yt(c)?(f=!0,Xl(s)):f=!1,s.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,kh(s),d.updater=pu,s.stateNode=d,d._reactInternals=s,zh(s,c,n,a),s=Hh(null,s,c,!0,f,a)):(s.tag=0,Ze&&f&&yh(s),Ht(null,s,d,a),s=s.child),s;case 16:c=s.elementType;e:{switch(gu(n,s),n=s.pendingProps,d=c._init,c=d(c._payload),s.type=c,d=s.tag=GE(c),n=bn(c,n),d){case 0:s=qh(null,s,c,n,a);break e;case 1:s=Bm(null,s,c,n,a);break e;case 11:s=Lm(null,s,c,n,a);break e;case 14:s=jm(null,s,c,bn(c.type,n),a);break e}throw Error(t(306,c,""))}return s;case 0:return c=s.type,d=s.pendingProps,d=s.elementType===c?d:bn(c,d),qh(n,s,c,d,a);case 1:return c=s.type,d=s.pendingProps,d=s.elementType===c?d:bn(c,d),Bm(n,s,c,d,a);case 3:e:{if($m(s),n===null)throw Error(t(387));c=s.pendingProps,f=s.memoizedState,d=f.element,sm(n,s),au(s,c,null,a);var v=s.memoizedState;if(c=v.element,f.isDehydrated)if(f={element:c,isDehydrated:!1,cache:v.cache,pendingSuspenseBoundaries:v.pendingSuspenseBoundaries,transitions:v.transitions},s.updateQueue.baseState=f,s.memoizedState=f,s.flags&256){d=lo(Error(t(423)),s),s=qm(n,s,c,a,d);break e}else if(c!==d){d=lo(Error(t(424)),s),s=qm(n,s,c,a,d);break e}else for(dn=rs(s.stateNode.containerInfo.firstChild),hn=s,Ze=!0,Nn=null,a=nm(s,null,c,a),s.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(ro(),c===d){s=Rr(n,s,a);break e}Ht(n,s,c,a)}s=s.child}return s;case 5:return am(s),n===null&&Eh(s),c=s.type,d=s.pendingProps,f=n!==null?n.memoizedProps:null,v=d.children,hh(c,d)?v=null:f!==null&&hh(c,f)&&(s.flags|=32),zm(n,s),Ht(n,s,v,a),s.child;case 6:return n===null&&Eh(s),null;case 13:return Hm(n,s,a);case 4:return Ch(s,s.stateNode.containerInfo),c=s.pendingProps,n===null?s.child=so(s,null,c,a):Ht(n,s,c,a),s.child;case 11:return c=s.type,d=s.pendingProps,d=s.elementType===c?d:bn(c,d),Lm(n,s,c,d,a);case 7:return Ht(n,s,s.pendingProps,a),s.child;case 8:return Ht(n,s,s.pendingProps.children,a),s.child;case 12:return Ht(n,s,s.pendingProps.children,a),s.child;case 10:e:{if(c=s.type._context,d=s.pendingProps,f=s.memoizedProps,v=d.value,We(su,c._currentValue),c._currentValue=v,f!==null)if(Pn(f.value,v)){if(f.children===d.children&&!Qt.current){s=Rr(n,s,a);break e}}else for(f=s.child,f!==null&&(f.return=s);f!==null;){var A=f.dependencies;if(A!==null){v=f.child;for(var P=A.firstContext;P!==null;){if(P.context===c){if(f.tag===1){P=Cr(-1,a&-a),P.tag=2;var U=f.updateQueue;if(U!==null){U=U.shared;var Q=U.pending;Q===null?P.next=P:(P.next=Q.next,Q.next=P),U.pending=P}}f.lanes|=a,P=f.alternate,P!==null&&(P.lanes|=a),Ah(f.return,a,s),A.lanes|=a;break}P=P.next}}else if(f.tag===10)v=f.type===s.type?null:f.child;else if(f.tag===18){if(v=f.return,v===null)throw Error(t(341));v.lanes|=a,A=v.alternate,A!==null&&(A.lanes|=a),Ah(v,a,s),v=f.sibling}else v=f.child;if(v!==null)v.return=f;else for(v=f;v!==null;){if(v===s){v=null;break}if(f=v.sibling,f!==null){f.return=v.return,v=f;break}v=v.return}f=v}Ht(n,s,d.children,a),s=s.child}return s;case 9:return d=s.type,c=s.pendingProps.children,oo(s,a),d=En(d),c=c(d),s.flags|=1,Ht(n,s,c,a),s.child;case 14:return c=s.type,d=bn(c,s.pendingProps),d=bn(c.type,d),jm(n,s,c,d,a);case 15:return Fm(n,s,s.type,s.pendingProps,a);case 17:return c=s.type,d=s.pendingProps,d=s.elementType===c?d:bn(c,d),gu(n,s),s.tag=1,Yt(c)?(n=!0,Xl(s)):n=!1,oo(s,a),Pm(s,c,d),zh(s,c,d,a),Hh(null,s,c,!0,n,a);case 19:return Gm(n,s,a);case 22:return Um(n,s,a)}throw Error(t(156,s.tag))};function yg(n,s){return Go(n,s)}function WE(n,s,a,c){this.tag=n,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=s,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=c,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function In(n,s,a,c){return new WE(n,s,a,c)}function hd(n){return n=n.prototype,!(!n||!n.isReactComponent)}function GE(n){if(typeof n=="function")return hd(n)?1:0;if(n!=null){if(n=n.$$typeof,n===M)return 11;if(n===Tt)return 14}return 2}function ps(n,s){var a=n.alternate;return a===null?(a=In(n.tag,s,n.key,n.mode),a.elementType=n.elementType,a.type=n.type,a.stateNode=n.stateNode,a.alternate=n,n.alternate=a):(a.pendingProps=s,a.type=n.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=n.flags&14680064,a.childLanes=n.childLanes,a.lanes=n.lanes,a.child=n.child,a.memoizedProps=n.memoizedProps,a.memoizedState=n.memoizedState,a.updateQueue=n.updateQueue,s=n.dependencies,a.dependencies=s===null?null:{lanes:s.lanes,firstContext:s.firstContext},a.sibling=n.sibling,a.index=n.index,a.ref=n.ref,a}function ku(n,s,a,c,d,f){var v=2;if(c=n,typeof n=="function")hd(n)&&(v=1);else if(typeof n=="string")v=5;else e:switch(n){case R:return li(a.children,d,f,s);case S:v=8,d|=8;break;case C:return n=In(12,a,s,d|2),n.elementType=C,n.lanes=f,n;case k:return n=In(13,a,s,d),n.elementType=k,n.lanes=f,n;case He:return n=In(19,a,s,d),n.elementType=He,n.lanes=f,n;case Xe:return Cu(a,d,f,s);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case D:v=10;break e;case N:v=9;break e;case M:v=11;break e;case Tt:v=14;break e;case Vt:v=16,c=null;break e}throw Error(t(130,n==null?n:typeof n,""))}return s=In(v,a,s,d),s.elementType=n,s.type=c,s.lanes=f,s}function li(n,s,a,c){return n=In(7,n,c,s),n.lanes=a,n}function Cu(n,s,a,c){return n=In(22,n,c,s),n.elementType=Xe,n.lanes=a,n.stateNode={isHidden:!1},n}function dd(n,s,a){return n=In(6,n,null,s),n.lanes=a,n}function fd(n,s,a){return s=In(4,n.children!==null?n.children:[],n.key,s),s.lanes=a,s.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},s}function KE(n,s,a,c,d){this.tag=s,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Xo(0),this.expirationTimes=Xo(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Xo(0),this.identifierPrefix=c,this.onRecoverableError=d,this.mutableSourceEagerHydrationData=null}function pd(n,s,a,c,d,f,v,A,P){return n=new KE(n,s,a,A,P),s===1?(s=1,f===!0&&(s|=8)):s=0,f=In(3,null,null,s),n.current=f,f.stateNode=n,f.memoizedState={element:c,isDehydrated:a,cache:null,transitions:null,pendingSuspenseBoundaries:null},kh(f),n}function QE(n,s,a){var c=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Ae,key:c==null?null:""+c,children:n,containerInfo:s,implementation:a}}function _g(n){if(!n)return is;n=n._reactInternals;e:{if(Cn(n)!==n||n.tag!==1)throw Error(t(170));var s=n;do{switch(s.tag){case 3:s=s.stateNode.context;break e;case 1:if(Yt(s.type)){s=s.stateNode.__reactInternalMemoizedMergedChildContext;break e}}s=s.return}while(s!==null);throw Error(t(171))}if(n.tag===1){var a=n.type;if(Yt(a))return Wp(n,a,s)}return s}function vg(n,s,a,c,d,f,v,A,P){return n=pd(a,c,!0,n,d,f,v,A,P),n.context=_g(null),a=n.current,c=Wt(),d=ds(a),f=Cr(c,d),f.callback=s??null,ls(a,f,d),n.current.lanes=d,Ws(n,d,c),Zt(n,c),n}function Ru(n,s,a,c){var d=s.current,f=Wt(),v=ds(d);return a=_g(a),s.context===null?s.context=a:s.pendingContext=a,s=Cr(f,v),s.payload={element:n},c=c===void 0?null:c,c!==null&&(s.callback=c),n=ls(d,s,v),n!==null&&(On(n,d,v,f),ou(n,d,v)),v}function Pu(n){if(n=n.current,!n.child)return null;switch(n.child.tag){case 5:return n.child.stateNode;default:return n.child.stateNode}}function Eg(n,s){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var a=n.retryLane;n.retryLane=a!==0&&a<s?a:s}}function md(n,s){Eg(n,s),(n=n.alternate)&&Eg(n,s)}function YE(){return null}var wg=typeof reportError=="function"?reportError:function(n){console.error(n)};function gd(n){this._internalRoot=n}Nu.prototype.render=gd.prototype.render=function(n){var s=this._internalRoot;if(s===null)throw Error(t(409));Ru(n,s,null,null)},Nu.prototype.unmount=gd.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var s=n.containerInfo;ii(function(){Ru(null,n,null,null)}),s[Ir]=null}};function Nu(n){this._internalRoot=n}Nu.prototype.unstable_scheduleHydration=function(n){if(n){var s=na();n={blockedOn:null,target:n,priority:s};for(var a=0;a<an.length&&s!==0&&s<an[a].priority;a++);an.splice(a,0,n),a===0&&ji(n)}};function yd(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function bu(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function Tg(){}function JE(n,s,a,c,d){if(d){if(typeof c=="function"){var f=c;c=function(){var U=Pu(v);f.call(U)}}var v=vg(s,c,n,0,null,!1,!1,"",Tg);return n._reactRootContainer=v,n[Ir]=v.current,pa(n.nodeType===8?n.parentNode:n),ii(),v}for(;d=n.lastChild;)n.removeChild(d);if(typeof c=="function"){var A=c;c=function(){var U=Pu(P);A.call(U)}}var P=pd(n,0,!1,null,null,!1,!1,"",Tg);return n._reactRootContainer=P,n[Ir]=P.current,pa(n.nodeType===8?n.parentNode:n),ii(function(){Ru(s,P,a,c)}),P}function Du(n,s,a,c,d){var f=a._reactRootContainer;if(f){var v=f;if(typeof d=="function"){var A=d;d=function(){var P=Pu(v);A.call(P)}}Ru(s,v,n,d)}else v=JE(a,s,n,d,c);return Pu(v)}ea=function(n){switch(n.tag){case 3:var s=n.stateNode;if(s.current.memoizedState.isDehydrated){var a=Fe(s.pendingLanes);a!==0&&(Zo(s,a|1),Zt(s,Ke()),(Oe&6)===0&&(ho=Ke()+500,os()))}break;case 13:ii(function(){var c=kr(n,1);if(c!==null){var d=Wt();On(c,n,1,d)}}),md(n,1)}},Mi=function(n){if(n.tag===13){var s=kr(n,134217728);if(s!==null){var a=Wt();On(s,n,134217728,a)}md(n,134217728)}},ta=function(n){if(n.tag===13){var s=ds(n),a=kr(n,s);if(a!==null){var c=Wt();On(a,n,s,c)}md(n,s)}},na=function(){return be},ra=function(n,s){var a=be;try{return be=n,s()}finally{be=a}},fr=function(n,s,a){switch(s){case"input":if(Ms(n,a),s=a.name,a.type==="radio"&&s!=null){for(a=n;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll("input[name="+JSON.stringify(""+s)+'][type="radio"]'),s=0;s<a.length;s++){var c=a[s];if(c!==n&&c.form===n.form){var d=Yl(c);if(!d)throw Error(t(90));jo(c),Ms(c,d)}}}break;case"textarea":wl(n,a);break;case"select":s=a.value,s!=null&&xn(n,!!a.multiple,s,!1)}},Sl=ld,Al=ii;var XE={usingClientEntryPoint:!1,Events:[ya,Xi,Yl,Wr,Gr,ld]},Na={findFiberByHostInstance:Js,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},ZE={bundleType:Na.bundleType,version:Na.version,rendererPackageName:Na.rendererPackageName,rendererConfig:Na.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Se.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=bl(n),n===null?null:n.stateNode},findFiberByHostInstance:Na.findFiberByHostInstance||YE,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Vu=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Vu.isDisabled&&Vu.supportsFiber)try{Bs=Vu.inject(ZE),sn=Vu}catch{}}return en.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=XE,en.createPortal=function(n,s){var a=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!yd(s))throw Error(t(200));return QE(n,s,null,a)},en.createRoot=function(n,s){if(!yd(n))throw Error(t(299));var a=!1,c="",d=wg;return s!=null&&(s.unstable_strictMode===!0&&(a=!0),s.identifierPrefix!==void 0&&(c=s.identifierPrefix),s.onRecoverableError!==void 0&&(d=s.onRecoverableError)),s=pd(n,1,!1,null,null,a,!1,c,d),n[Ir]=s.current,pa(n.nodeType===8?n.parentNode:n),new gd(s)},en.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var s=n._reactInternals;if(s===void 0)throw typeof n.render=="function"?Error(t(188)):(n=Object.keys(n).join(","),Error(t(268,n)));return n=bl(s),n=n===null?null:n.stateNode,n},en.flushSync=function(n){return ii(n)},en.hydrate=function(n,s,a){if(!bu(s))throw Error(t(200));return Du(null,n,s,!0,a)},en.hydrateRoot=function(n,s,a){if(!yd(n))throw Error(t(405));var c=a!=null&&a.hydratedSources||null,d=!1,f="",v=wg;if(a!=null&&(a.unstable_strictMode===!0&&(d=!0),a.identifierPrefix!==void 0&&(f=a.identifierPrefix),a.onRecoverableError!==void 0&&(v=a.onRecoverableError)),s=vg(s,null,n,1,a??null,d,!1,f,v),n[Ir]=s.current,pa(n),c)for(n=0;n<c.length;n++)a=c[n],d=a._getVersion,d=d(a._source),s.mutableSourceEagerHydrationData==null?s.mutableSourceEagerHydrationData=[a,d]:s.mutableSourceEagerHydrationData.push(a,d);return new Nu(s)},en.render=function(n,s,a){if(!bu(s))throw Error(t(200));return Du(null,n,s,!1,a)},en.unmountComponentAtNode=function(n){if(!bu(n))throw Error(t(40));return n._reactRootContainer?(ii(function(){Du(null,null,n,!1,function(){n._reactRootContainer=null,n[Ir]=null})}),!0):!1},en.unstable_batchedUpdates=ld,en.unstable_renderSubtreeIntoContainer=function(n,s,a,c){if(!bu(a))throw Error(t(200));if(n==null||n._reactInternals===void 0)throw Error(t(38));return Du(n,s,a,!1,c)},en.version="18.3.1-next-f1338f8080-20240426",en}var Pg;function aw(){if(Pg)return Ed.exports;Pg=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),Ed.exports=ow(),Ed.exports}var Ng;function lw(){if(Ng)return Ou;Ng=1;var r=aw();return Ou.createRoot=r.createRoot,Ou.hydrateRoot=r.hydrateRoot,Ou}var uw=lw();const cw=()=>{};var bg={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const u_=function(r){const e=[];let t=0;for(let i=0;i<r.length;i++){let o=r.charCodeAt(i);o<128?e[t++]=o:o<2048?(e[t++]=o>>6|192,e[t++]=o&63|128):(o&64512)===55296&&i+1<r.length&&(r.charCodeAt(i+1)&64512)===56320?(o=65536+((o&1023)<<10)+(r.charCodeAt(++i)&1023),e[t++]=o>>18|240,e[t++]=o>>12&63|128,e[t++]=o>>6&63|128,e[t++]=o&63|128):(e[t++]=o>>12|224,e[t++]=o>>6&63|128,e[t++]=o&63|128)}return e},hw=function(r){const e=[];let t=0,i=0;for(;t<r.length;){const o=r[t++];if(o<128)e[i++]=String.fromCharCode(o);else if(o>191&&o<224){const l=r[t++];e[i++]=String.fromCharCode((o&31)<<6|l&63)}else if(o>239&&o<365){const l=r[t++],h=r[t++],p=r[t++],g=((o&7)<<18|(l&63)<<12|(h&63)<<6|p&63)-65536;e[i++]=String.fromCharCode(55296+(g>>10)),e[i++]=String.fromCharCode(56320+(g&1023))}else{const l=r[t++],h=r[t++];e[i++]=String.fromCharCode((o&15)<<12|(l&63)<<6|h&63)}}return e.join("")},c_={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let o=0;o<r.length;o+=3){const l=r[o],h=o+1<r.length,p=h?r[o+1]:0,g=o+2<r.length,y=g?r[o+2]:0,E=l>>2,I=(l&3)<<4|p>>4;let x=(p&15)<<2|y>>6,O=y&63;g||(O=64,h||(x=64)),i.push(t[E],t[I],t[x],t[O])}return i.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(u_(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):hw(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let o=0;o<r.length;){const l=t[r.charAt(o++)],p=o<r.length?t[r.charAt(o)]:0;++o;const y=o<r.length?t[r.charAt(o)]:64;++o;const I=o<r.length?t[r.charAt(o)]:64;if(++o,l==null||p==null||y==null||I==null)throw new dw;const x=l<<2|p>>4;if(i.push(x),y!==64){const O=p<<4&240|y>>2;if(i.push(O),I!==64){const q=y<<6&192|I;i.push(q)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class dw extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const fw=function(r){const e=u_(r);return c_.encodeByteArray(e,!0)},Xu=function(r){return fw(r).replace(/\./g,"")},h_=function(r){try{return c_.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pw(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mw=()=>pw().__FIREBASE_DEFAULTS__,gw=()=>{if(typeof process>"u"||typeof bg>"u")return;const r=bg.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},yw=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=r&&h_(r[1]);return e&&JSON.parse(e)},Ic=()=>{try{return cw()||mw()||gw()||yw()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},d_=r=>{var e,t;return(t=(e=Ic())==null?void 0:e.emulatorHosts)==null?void 0:t[r]},_w=r=>{const e=d_(r);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},f_=()=>{var r;return(r=Ic())==null?void 0:r.config},p_=r=>{var e;return(e=Ic())==null?void 0:e[`_${r}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vw{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ew(r,e){if(r.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",o=r.iat||0,l=r.sub||r.user_id;if(!l)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const h={iss:`https://securetoken.google.com/${i}`,aud:i,iat:o,exp:o+3600,auth_time:o,sub:l,user_id:l,firebase:{sign_in_provider:"custom",identities:{}},...r};return[Xu(JSON.stringify(t)),Xu(JSON.stringify(h)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $t(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ww(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test($t())}function Tw(){var e;const r=(e=Ic())==null?void 0:e.forceEnvironment;if(r==="node")return!0;if(r==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Iw(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Sw(){const r=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof r=="object"&&r.id!==void 0}function Aw(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function xw(){const r=$t();return r.indexOf("MSIE ")>=0||r.indexOf("Trident/")>=0}function kw(){return!Tw()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Cw(){try{return typeof indexedDB=="object"}catch{return!1}}function Rw(){return new Promise((r,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",o=self.indexedDB.open(i);o.onsuccess=()=>{o.result.close(),t||self.indexedDB.deleteDatabase(i),r(!0)},o.onupgradeneeded=()=>{t=!1},o.onerror=()=>{var l;e(((l=o.error)==null?void 0:l.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pw="FirebaseError";class Fr extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=Pw,Object.setPrototypeOf(this,Fr.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,nl.prototype.create)}}class nl{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},o=`${this.service}/${e}`,l=this.errors[e],h=l?Nw(l,i):"Error",p=`${this.serviceName}: ${h} (${o}).`;return new Fr(o,p,i)}}function Nw(r,e){return r.replace(bw,(t,i)=>{const o=e[i];return o!=null?String(o):`<${i}?>`})}const bw=/\{\$([^}]+)}/g;function Dw(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}function gi(r,e){if(r===e)return!0;const t=Object.keys(r),i=Object.keys(e);for(const o of t){if(!i.includes(o))return!1;const l=r[o],h=e[o];if(Dg(l)&&Dg(h)){if(!gi(l,h))return!1}else if(l!==h)return!1}for(const o of i)if(!t.includes(o))return!1;return!0}function Dg(r){return r!==null&&typeof r=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rl(r){const e=[];for(const[t,i]of Object.entries(r))Array.isArray(i)?i.forEach(o=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(o))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}function Vw(r,e){const t=new Ow(r,e);return t.subscribe.bind(t)}class Ow{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let o;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");Mw(e,["next","error","complete"])?o=e:o={next:e,error:t,complete:i},o.next===void 0&&(o.next=Id),o.error===void 0&&(o.error=Id),o.complete===void 0&&(o.complete=Id);const l=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?o.error(this.finalError):o.complete()}catch{}}),this.observers.push(o),l}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Mw(r,e){if(typeof r!="object"||r===null)return!1;for(const t of e)if(t in r&&typeof r[t]=="function")return!0;return!1}function Id(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _t(r){return r&&r._delegate?r._delegate:r}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sl(r){try{return(r.startsWith("http://")||r.startsWith("https://")?new URL(r).hostname:r).endsWith(".cloudworkstations.dev")}catch{return!1}}async function m_(r){return(await fetch(r,{credentials:"include"})).ok}class yi{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ui="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lw{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new vw;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const o=this.getOrInitializeService({instanceIdentifier:t});o&&i.resolve(o)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(o){if(i)return null;throw o}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Fw(e))try{this.getOrInitializeService({instanceIdentifier:ui})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const o=this.normalizeInstanceIdentifier(t);try{const l=this.getOrInitializeService({instanceIdentifier:o});i.resolve(l)}catch{}}}}clearInstance(e=ui){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=ui){return this.instances.has(e)}getOptions(e=ui){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const o=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[l,h]of this.instancesDeferred.entries()){const p=this.normalizeInstanceIdentifier(l);i===p&&h.resolve(o)}return o}onInit(e,t){const i=this.normalizeInstanceIdentifier(t),o=this.onInitCallbacks.get(i)??new Set;o.add(e),this.onInitCallbacks.set(i,o);const l=this.instances.get(i);return l&&e(l,i),()=>{o.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const o of i)try{o(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:jw(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=ui){return this.component?this.component.multipleInstances?e:ui:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function jw(r){return r===ui?void 0:r}function Fw(r){return r.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uw{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Lw(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Re;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(Re||(Re={}));const zw={debug:Re.DEBUG,verbose:Re.VERBOSE,info:Re.INFO,warn:Re.WARN,error:Re.ERROR,silent:Re.SILENT},Bw=Re.INFO,$w={[Re.DEBUG]:"log",[Re.VERBOSE]:"log",[Re.INFO]:"info",[Re.WARN]:"warn",[Re.ERROR]:"error"},qw=(r,e,...t)=>{if(e<r.logLevel)return;const i=new Date().toISOString(),o=$w[e];if(o)console[o](`[${i}]  ${r.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ff{constructor(e){this.name=e,this._logLevel=Bw,this._logHandler=qw,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Re))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?zw[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Re.DEBUG,...e),this._logHandler(this,Re.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Re.VERBOSE,...e),this._logHandler(this,Re.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Re.INFO,...e),this._logHandler(this,Re.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Re.WARN,...e),this._logHandler(this,Re.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Re.ERROR,...e),this._logHandler(this,Re.ERROR,...e)}}const Hw=(r,e)=>e.some(t=>r instanceof t);let Vg,Og;function Ww(){return Vg||(Vg=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Gw(){return Og||(Og=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const g_=new WeakMap,Fd=new WeakMap,y_=new WeakMap,Sd=new WeakMap,pf=new WeakMap;function Kw(r){const e=new Promise((t,i)=>{const o=()=>{r.removeEventListener("success",l),r.removeEventListener("error",h)},l=()=>{t(ws(r.result)),o()},h=()=>{i(r.error),o()};r.addEventListener("success",l),r.addEventListener("error",h)});return e.then(t=>{t instanceof IDBCursor&&g_.set(t,r)}).catch(()=>{}),pf.set(e,r),e}function Qw(r){if(Fd.has(r))return;const e=new Promise((t,i)=>{const o=()=>{r.removeEventListener("complete",l),r.removeEventListener("error",h),r.removeEventListener("abort",h)},l=()=>{t(),o()},h=()=>{i(r.error||new DOMException("AbortError","AbortError")),o()};r.addEventListener("complete",l),r.addEventListener("error",h),r.addEventListener("abort",h)});Fd.set(r,e)}let Ud={get(r,e,t){if(r instanceof IDBTransaction){if(e==="done")return Fd.get(r);if(e==="objectStoreNames")return r.objectStoreNames||y_.get(r);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return ws(r[e])},set(r,e,t){return r[e]=t,!0},has(r,e){return r instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in r}};function Yw(r){Ud=r(Ud)}function Jw(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=r.call(Ad(this),e,...t);return y_.set(i,e.sort?e.sort():[e]),ws(i)}:Gw().includes(r)?function(...e){return r.apply(Ad(this),e),ws(g_.get(this))}:function(...e){return ws(r.apply(Ad(this),e))}}function Xw(r){return typeof r=="function"?Jw(r):(r instanceof IDBTransaction&&Qw(r),Hw(r,Ww())?new Proxy(r,Ud):r)}function ws(r){if(r instanceof IDBRequest)return Kw(r);if(Sd.has(r))return Sd.get(r);const e=Xw(r);return e!==r&&(Sd.set(r,e),pf.set(e,r)),e}const Ad=r=>pf.get(r);function Zw(r,e,{blocked:t,upgrade:i,blocking:o,terminated:l}={}){const h=indexedDB.open(r,e),p=ws(h);return i&&h.addEventListener("upgradeneeded",g=>{i(ws(h.result),g.oldVersion,g.newVersion,ws(h.transaction),g)}),t&&h.addEventListener("blocked",g=>t(g.oldVersion,g.newVersion,g)),p.then(g=>{l&&g.addEventListener("close",()=>l()),o&&g.addEventListener("versionchange",y=>o(y.oldVersion,y.newVersion,y))}).catch(()=>{}),p}const e1=["get","getKey","getAll","getAllKeys","count"],t1=["put","add","delete","clear"],xd=new Map;function Mg(r,e){if(!(r instanceof IDBDatabase&&!(e in r)&&typeof e=="string"))return;if(xd.get(e))return xd.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,o=t1.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(o||e1.includes(t)))return;const l=async function(h,...p){const g=this.transaction(h,o?"readwrite":"readonly");let y=g.store;return i&&(y=y.index(p.shift())),(await Promise.all([y[t](...p),o&&g.done]))[0]};return xd.set(e,l),l}Yw(r=>({...r,get:(e,t,i)=>Mg(e,t)||r.get(e,t,i),has:(e,t)=>!!Mg(e,t)||r.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n1{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(r1(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function r1(r){const e=r.getComponent();return(e==null?void 0:e.type)==="VERSION"}const zd="@firebase/app",Lg="0.14.11";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Or=new ff("@firebase/app"),s1="@firebase/app-compat",i1="@firebase/analytics-compat",o1="@firebase/analytics",a1="@firebase/app-check-compat",l1="@firebase/app-check",u1="@firebase/auth",c1="@firebase/auth-compat",h1="@firebase/database",d1="@firebase/data-connect",f1="@firebase/database-compat",p1="@firebase/functions",m1="@firebase/functions-compat",g1="@firebase/installations",y1="@firebase/installations-compat",_1="@firebase/messaging",v1="@firebase/messaging-compat",E1="@firebase/performance",w1="@firebase/performance-compat",T1="@firebase/remote-config",I1="@firebase/remote-config-compat",S1="@firebase/storage",A1="@firebase/storage-compat",x1="@firebase/firestore",k1="@firebase/ai",C1="@firebase/firestore-compat",R1="firebase",P1="12.12.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bd="[DEFAULT]",N1={[zd]:"fire-core",[s1]:"fire-core-compat",[o1]:"fire-analytics",[i1]:"fire-analytics-compat",[l1]:"fire-app-check",[a1]:"fire-app-check-compat",[u1]:"fire-auth",[c1]:"fire-auth-compat",[h1]:"fire-rtdb",[d1]:"fire-data-connect",[f1]:"fire-rtdb-compat",[p1]:"fire-fn",[m1]:"fire-fn-compat",[g1]:"fire-iid",[y1]:"fire-iid-compat",[_1]:"fire-fcm",[v1]:"fire-fcm-compat",[E1]:"fire-perf",[w1]:"fire-perf-compat",[T1]:"fire-rc",[I1]:"fire-rc-compat",[S1]:"fire-gcs",[A1]:"fire-gcs-compat",[x1]:"fire-fst",[C1]:"fire-fst-compat",[k1]:"fire-vertex","fire-js":"fire-js",[R1]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zu=new Map,b1=new Map,$d=new Map;function jg(r,e){try{r.container.addComponent(e)}catch(t){Or.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,t)}}function Io(r){const e=r.name;if($d.has(e))return Or.debug(`There were multiple attempts to register component ${e}.`),!1;$d.set(e,r);for(const t of Zu.values())jg(t,r);for(const t of b1.values())jg(t,r);return!0}function mf(r,e){const t=r.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),r.container.getProvider(e)}function Mn(r){return r==null?!1:r.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D1={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ts=new nl("app","Firebase",D1);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V1{constructor(e,t,i){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new yi("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ts.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const No=P1;function __(r,e={}){let t=r;typeof e!="object"&&(e={name:e});const i={name:Bd,automaticDataCollectionEnabled:!0,...e},o=i.name;if(typeof o!="string"||!o)throw Ts.create("bad-app-name",{appName:String(o)});if(t||(t=f_()),!t)throw Ts.create("no-options");const l=Zu.get(o);if(l){if(gi(t,l.options)&&gi(i,l.config))return l;throw Ts.create("duplicate-app",{appName:o})}const h=new Uw(o);for(const g of $d.values())h.addComponent(g);const p=new V1(t,i,h);return Zu.set(o,p),p}function v_(r=Bd){const e=Zu.get(r);if(!e&&r===Bd&&f_())return __();if(!e)throw Ts.create("no-app",{appName:r});return e}function Is(r,e,t){let i=N1[r]??r;t&&(i+=`-${t}`);const o=i.match(/\s|\//),l=e.match(/\s|\//);if(o||l){const h=[`Unable to register library "${i}" with version "${e}":`];o&&h.push(`library name "${i}" contains illegal characters (whitespace or "/")`),o&&l&&h.push("and"),l&&h.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Or.warn(h.join(" "));return}Io(new yi(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const O1="firebase-heartbeat-database",M1=1,Ha="firebase-heartbeat-store";let kd=null;function E_(){return kd||(kd=Zw(O1,M1,{upgrade:(r,e)=>{switch(e){case 0:try{r.createObjectStore(Ha)}catch(t){console.warn(t)}}}}).catch(r=>{throw Ts.create("idb-open",{originalErrorMessage:r.message})})),kd}async function L1(r){try{const t=(await E_()).transaction(Ha),i=await t.objectStore(Ha).get(w_(r));return await t.done,i}catch(e){if(e instanceof Fr)Or.warn(e.message);else{const t=Ts.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Or.warn(t.message)}}}async function Fg(r,e){try{const i=(await E_()).transaction(Ha,"readwrite");await i.objectStore(Ha).put(e,w_(r)),await i.done}catch(t){if(t instanceof Fr)Or.warn(t.message);else{const i=Ts.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Or.warn(i.message)}}}function w_(r){return`${r.name}!${r.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const j1=1024,F1=30;class U1{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new B1(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,t;try{const o=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),l=Ug();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===l||this._heartbeatsCache.heartbeats.some(h=>h.date===l))return;if(this._heartbeatsCache.heartbeats.push({date:l,agent:o}),this._heartbeatsCache.heartbeats.length>F1){const h=$1(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(h,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(i){Or.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Ug(),{heartbeatsToSend:i,unsentEntries:o}=z1(this._heartbeatsCache.heartbeats),l=Xu(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=t,o.length>0?(this._heartbeatsCache.heartbeats=o,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),l}catch(t){return Or.warn(t),""}}}function Ug(){return new Date().toISOString().substring(0,10)}function z1(r,e=j1){const t=[];let i=r.slice();for(const o of r){const l=t.find(h=>h.agent===o.agent);if(l){if(l.dates.push(o.date),zg(t)>e){l.dates.pop();break}}else if(t.push({agent:o.agent,dates:[o.date]}),zg(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class B1{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Cw()?Rw().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await L1(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return Fg(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return Fg(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function zg(r){return Xu(JSON.stringify({version:2,heartbeats:r})).length}function $1(r){if(r.length===0)return-1;let e=0,t=r[0].date;for(let i=1;i<r.length;i++)r[i].date<t&&(t=r[i].date,e=i);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function q1(r){Io(new yi("platform-logger",e=>new n1(e),"PRIVATE")),Io(new yi("heartbeat",e=>new U1(e),"PRIVATE")),Is(zd,Lg,r),Is(zd,Lg,"esm2020"),Is("fire-js","")}q1("");var Bg=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ss,T_;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(R,S){function C(){}C.prototype=S.prototype,R.F=S.prototype,R.prototype=new C,R.prototype.constructor=R,R.D=function(D,N,M){for(var k=Array(arguments.length-2),He=2;He<arguments.length;He++)k[He-2]=arguments[He];return S.prototype[N].apply(D,k)}}function t(){this.blockSize=-1}function i(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(i,t),i.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function o(R,S,C){C||(C=0);const D=Array(16);if(typeof S=="string")for(var N=0;N<16;++N)D[N]=S.charCodeAt(C++)|S.charCodeAt(C++)<<8|S.charCodeAt(C++)<<16|S.charCodeAt(C++)<<24;else for(N=0;N<16;++N)D[N]=S[C++]|S[C++]<<8|S[C++]<<16|S[C++]<<24;S=R.g[0],C=R.g[1],N=R.g[2];let M=R.g[3],k;k=S+(M^C&(N^M))+D[0]+3614090360&4294967295,S=C+(k<<7&4294967295|k>>>25),k=M+(N^S&(C^N))+D[1]+3905402710&4294967295,M=S+(k<<12&4294967295|k>>>20),k=N+(C^M&(S^C))+D[2]+606105819&4294967295,N=M+(k<<17&4294967295|k>>>15),k=C+(S^N&(M^S))+D[3]+3250441966&4294967295,C=N+(k<<22&4294967295|k>>>10),k=S+(M^C&(N^M))+D[4]+4118548399&4294967295,S=C+(k<<7&4294967295|k>>>25),k=M+(N^S&(C^N))+D[5]+1200080426&4294967295,M=S+(k<<12&4294967295|k>>>20),k=N+(C^M&(S^C))+D[6]+2821735955&4294967295,N=M+(k<<17&4294967295|k>>>15),k=C+(S^N&(M^S))+D[7]+4249261313&4294967295,C=N+(k<<22&4294967295|k>>>10),k=S+(M^C&(N^M))+D[8]+1770035416&4294967295,S=C+(k<<7&4294967295|k>>>25),k=M+(N^S&(C^N))+D[9]+2336552879&4294967295,M=S+(k<<12&4294967295|k>>>20),k=N+(C^M&(S^C))+D[10]+4294925233&4294967295,N=M+(k<<17&4294967295|k>>>15),k=C+(S^N&(M^S))+D[11]+2304563134&4294967295,C=N+(k<<22&4294967295|k>>>10),k=S+(M^C&(N^M))+D[12]+1804603682&4294967295,S=C+(k<<7&4294967295|k>>>25),k=M+(N^S&(C^N))+D[13]+4254626195&4294967295,M=S+(k<<12&4294967295|k>>>20),k=N+(C^M&(S^C))+D[14]+2792965006&4294967295,N=M+(k<<17&4294967295|k>>>15),k=C+(S^N&(M^S))+D[15]+1236535329&4294967295,C=N+(k<<22&4294967295|k>>>10),k=S+(N^M&(C^N))+D[1]+4129170786&4294967295,S=C+(k<<5&4294967295|k>>>27),k=M+(C^N&(S^C))+D[6]+3225465664&4294967295,M=S+(k<<9&4294967295|k>>>23),k=N+(S^C&(M^S))+D[11]+643717713&4294967295,N=M+(k<<14&4294967295|k>>>18),k=C+(M^S&(N^M))+D[0]+3921069994&4294967295,C=N+(k<<20&4294967295|k>>>12),k=S+(N^M&(C^N))+D[5]+3593408605&4294967295,S=C+(k<<5&4294967295|k>>>27),k=M+(C^N&(S^C))+D[10]+38016083&4294967295,M=S+(k<<9&4294967295|k>>>23),k=N+(S^C&(M^S))+D[15]+3634488961&4294967295,N=M+(k<<14&4294967295|k>>>18),k=C+(M^S&(N^M))+D[4]+3889429448&4294967295,C=N+(k<<20&4294967295|k>>>12),k=S+(N^M&(C^N))+D[9]+568446438&4294967295,S=C+(k<<5&4294967295|k>>>27),k=M+(C^N&(S^C))+D[14]+3275163606&4294967295,M=S+(k<<9&4294967295|k>>>23),k=N+(S^C&(M^S))+D[3]+4107603335&4294967295,N=M+(k<<14&4294967295|k>>>18),k=C+(M^S&(N^M))+D[8]+1163531501&4294967295,C=N+(k<<20&4294967295|k>>>12),k=S+(N^M&(C^N))+D[13]+2850285829&4294967295,S=C+(k<<5&4294967295|k>>>27),k=M+(C^N&(S^C))+D[2]+4243563512&4294967295,M=S+(k<<9&4294967295|k>>>23),k=N+(S^C&(M^S))+D[7]+1735328473&4294967295,N=M+(k<<14&4294967295|k>>>18),k=C+(M^S&(N^M))+D[12]+2368359562&4294967295,C=N+(k<<20&4294967295|k>>>12),k=S+(C^N^M)+D[5]+4294588738&4294967295,S=C+(k<<4&4294967295|k>>>28),k=M+(S^C^N)+D[8]+2272392833&4294967295,M=S+(k<<11&4294967295|k>>>21),k=N+(M^S^C)+D[11]+1839030562&4294967295,N=M+(k<<16&4294967295|k>>>16),k=C+(N^M^S)+D[14]+4259657740&4294967295,C=N+(k<<23&4294967295|k>>>9),k=S+(C^N^M)+D[1]+2763975236&4294967295,S=C+(k<<4&4294967295|k>>>28),k=M+(S^C^N)+D[4]+1272893353&4294967295,M=S+(k<<11&4294967295|k>>>21),k=N+(M^S^C)+D[7]+4139469664&4294967295,N=M+(k<<16&4294967295|k>>>16),k=C+(N^M^S)+D[10]+3200236656&4294967295,C=N+(k<<23&4294967295|k>>>9),k=S+(C^N^M)+D[13]+681279174&4294967295,S=C+(k<<4&4294967295|k>>>28),k=M+(S^C^N)+D[0]+3936430074&4294967295,M=S+(k<<11&4294967295|k>>>21),k=N+(M^S^C)+D[3]+3572445317&4294967295,N=M+(k<<16&4294967295|k>>>16),k=C+(N^M^S)+D[6]+76029189&4294967295,C=N+(k<<23&4294967295|k>>>9),k=S+(C^N^M)+D[9]+3654602809&4294967295,S=C+(k<<4&4294967295|k>>>28),k=M+(S^C^N)+D[12]+3873151461&4294967295,M=S+(k<<11&4294967295|k>>>21),k=N+(M^S^C)+D[15]+530742520&4294967295,N=M+(k<<16&4294967295|k>>>16),k=C+(N^M^S)+D[2]+3299628645&4294967295,C=N+(k<<23&4294967295|k>>>9),k=S+(N^(C|~M))+D[0]+4096336452&4294967295,S=C+(k<<6&4294967295|k>>>26),k=M+(C^(S|~N))+D[7]+1126891415&4294967295,M=S+(k<<10&4294967295|k>>>22),k=N+(S^(M|~C))+D[14]+2878612391&4294967295,N=M+(k<<15&4294967295|k>>>17),k=C+(M^(N|~S))+D[5]+4237533241&4294967295,C=N+(k<<21&4294967295|k>>>11),k=S+(N^(C|~M))+D[12]+1700485571&4294967295,S=C+(k<<6&4294967295|k>>>26),k=M+(C^(S|~N))+D[3]+2399980690&4294967295,M=S+(k<<10&4294967295|k>>>22),k=N+(S^(M|~C))+D[10]+4293915773&4294967295,N=M+(k<<15&4294967295|k>>>17),k=C+(M^(N|~S))+D[1]+2240044497&4294967295,C=N+(k<<21&4294967295|k>>>11),k=S+(N^(C|~M))+D[8]+1873313359&4294967295,S=C+(k<<6&4294967295|k>>>26),k=M+(C^(S|~N))+D[15]+4264355552&4294967295,M=S+(k<<10&4294967295|k>>>22),k=N+(S^(M|~C))+D[6]+2734768916&4294967295,N=M+(k<<15&4294967295|k>>>17),k=C+(M^(N|~S))+D[13]+1309151649&4294967295,C=N+(k<<21&4294967295|k>>>11),k=S+(N^(C|~M))+D[4]+4149444226&4294967295,S=C+(k<<6&4294967295|k>>>26),k=M+(C^(S|~N))+D[11]+3174756917&4294967295,M=S+(k<<10&4294967295|k>>>22),k=N+(S^(M|~C))+D[2]+718787259&4294967295,N=M+(k<<15&4294967295|k>>>17),k=C+(M^(N|~S))+D[9]+3951481745&4294967295,R.g[0]=R.g[0]+S&4294967295,R.g[1]=R.g[1]+(N+(k<<21&4294967295|k>>>11))&4294967295,R.g[2]=R.g[2]+N&4294967295,R.g[3]=R.g[3]+M&4294967295}i.prototype.v=function(R,S){S===void 0&&(S=R.length);const C=S-this.blockSize,D=this.C;let N=this.h,M=0;for(;M<S;){if(N==0)for(;M<=C;)o(this,R,M),M+=this.blockSize;if(typeof R=="string"){for(;M<S;)if(D[N++]=R.charCodeAt(M++),N==this.blockSize){o(this,D),N=0;break}}else for(;M<S;)if(D[N++]=R[M++],N==this.blockSize){o(this,D),N=0;break}}this.h=N,this.o+=S},i.prototype.A=function(){var R=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);R[0]=128;for(var S=1;S<R.length-8;++S)R[S]=0;S=this.o*8;for(var C=R.length-8;C<R.length;++C)R[C]=S&255,S/=256;for(this.v(R),R=Array(16),S=0,C=0;C<4;++C)for(let D=0;D<32;D+=8)R[S++]=this.g[C]>>>D&255;return R};function l(R,S){var C=p;return Object.prototype.hasOwnProperty.call(C,R)?C[R]:C[R]=S(R)}function h(R,S){this.h=S;const C=[];let D=!0;for(let N=R.length-1;N>=0;N--){const M=R[N]|0;D&&M==S||(C[N]=M,D=!1)}this.g=C}var p={};function g(R){return-128<=R&&R<128?l(R,function(S){return new h([S|0],S<0?-1:0)}):new h([R|0],R<0?-1:0)}function y(R){if(isNaN(R)||!isFinite(R))return I;if(R<0)return B(y(-R));const S=[];let C=1;for(let D=0;R>=C;D++)S[D]=R/C|0,C*=4294967296;return new h(S,0)}function E(R,S){if(R.length==0)throw Error("number format error: empty string");if(S=S||10,S<2||36<S)throw Error("radix out of range: "+S);if(R.charAt(0)=="-")return B(E(R.substring(1),S));if(R.indexOf("-")>=0)throw Error('number format error: interior "-" character');const C=y(Math.pow(S,8));let D=I;for(let M=0;M<R.length;M+=8){var N=Math.min(8,R.length-M);const k=parseInt(R.substring(M,M+N),S);N<8?(N=y(Math.pow(S,N)),D=D.j(N).add(y(k))):(D=D.j(C),D=D.add(y(k)))}return D}var I=g(0),x=g(1),O=g(16777216);r=h.prototype,r.m=function(){if($(this))return-B(this).m();let R=0,S=1;for(let C=0;C<this.g.length;C++){const D=this.i(C);R+=(D>=0?D:4294967296+D)*S,S*=4294967296}return R},r.toString=function(R){if(R=R||10,R<2||36<R)throw Error("radix out of range: "+R);if(q(this))return"0";if($(this))return"-"+B(this).toString(R);const S=y(Math.pow(R,6));var C=this;let D="";for(;;){const N=Se(C,S).g;C=Z(C,N.j(S));let M=((C.g.length>0?C.g[0]:C.h)>>>0).toString(R);if(C=N,q(C))return M+D;for(;M.length<6;)M="0"+M;D=M+D}},r.i=function(R){return R<0?0:R<this.g.length?this.g[R]:this.h};function q(R){if(R.h!=0)return!1;for(let S=0;S<R.g.length;S++)if(R.g[S]!=0)return!1;return!0}function $(R){return R.h==-1}r.l=function(R){return R=Z(this,R),$(R)?-1:q(R)?0:1};function B(R){const S=R.g.length,C=[];for(let D=0;D<S;D++)C[D]=~R.g[D];return new h(C,~R.h).add(x)}r.abs=function(){return $(this)?B(this):this},r.add=function(R){const S=Math.max(this.g.length,R.g.length),C=[];let D=0;for(let N=0;N<=S;N++){let M=D+(this.i(N)&65535)+(R.i(N)&65535),k=(M>>>16)+(this.i(N)>>>16)+(R.i(N)>>>16);D=k>>>16,M&=65535,k&=65535,C[N]=k<<16|M}return new h(C,C[C.length-1]&-2147483648?-1:0)};function Z(R,S){return R.add(B(S))}r.j=function(R){if(q(this)||q(R))return I;if($(this))return $(R)?B(this).j(B(R)):B(B(this).j(R));if($(R))return B(this.j(B(R)));if(this.l(O)<0&&R.l(O)<0)return y(this.m()*R.m());const S=this.g.length+R.g.length,C=[];for(var D=0;D<2*S;D++)C[D]=0;for(D=0;D<this.g.length;D++)for(let N=0;N<R.g.length;N++){const M=this.i(D)>>>16,k=this.i(D)&65535,He=R.i(N)>>>16,Tt=R.i(N)&65535;C[2*D+2*N]+=k*Tt,ae(C,2*D+2*N),C[2*D+2*N+1]+=M*Tt,ae(C,2*D+2*N+1),C[2*D+2*N+1]+=k*He,ae(C,2*D+2*N+1),C[2*D+2*N+2]+=M*He,ae(C,2*D+2*N+2)}for(R=0;R<S;R++)C[R]=C[2*R+1]<<16|C[2*R];for(R=S;R<2*S;R++)C[R]=0;return new h(C,0)};function ae(R,S){for(;(R[S]&65535)!=R[S];)R[S+1]+=R[S]>>>16,R[S]&=65535,S++}function me(R,S){this.g=R,this.h=S}function Se(R,S){if(q(S))throw Error("division by zero");if(q(R))return new me(I,I);if($(R))return S=Se(B(R),S),new me(B(S.g),B(S.h));if($(S))return S=Se(R,B(S)),new me(B(S.g),S.h);if(R.g.length>30){if($(R)||$(S))throw Error("slowDivide_ only works with positive integers.");for(var C=x,D=S;D.l(R)<=0;)C=Me(C),D=Me(D);var N=Ae(C,1),M=Ae(D,1);for(D=Ae(D,2),C=Ae(C,2);!q(D);){var k=M.add(D);k.l(R)<=0&&(N=N.add(C),M=k),D=Ae(D,1),C=Ae(C,1)}return S=Z(R,N.j(S)),new me(N,S)}for(N=I;R.l(S)>=0;){for(C=Math.max(1,Math.floor(R.m()/S.m())),D=Math.ceil(Math.log(C)/Math.LN2),D=D<=48?1:Math.pow(2,D-48),M=y(C),k=M.j(S);$(k)||k.l(R)>0;)C-=D,M=y(C),k=M.j(S);q(M)&&(M=x),N=N.add(M),R=Z(R,k)}return new me(N,R)}r.B=function(R){return Se(this,R).h},r.and=function(R){const S=Math.max(this.g.length,R.g.length),C=[];for(let D=0;D<S;D++)C[D]=this.i(D)&R.i(D);return new h(C,this.h&R.h)},r.or=function(R){const S=Math.max(this.g.length,R.g.length),C=[];for(let D=0;D<S;D++)C[D]=this.i(D)|R.i(D);return new h(C,this.h|R.h)},r.xor=function(R){const S=Math.max(this.g.length,R.g.length),C=[];for(let D=0;D<S;D++)C[D]=this.i(D)^R.i(D);return new h(C,this.h^R.h)};function Me(R){const S=R.g.length+1,C=[];for(let D=0;D<S;D++)C[D]=R.i(D)<<1|R.i(D-1)>>>31;return new h(C,R.h)}function Ae(R,S){const C=S>>5;S%=32;const D=R.g.length-C,N=[];for(let M=0;M<D;M++)N[M]=S>0?R.i(M+C)>>>S|R.i(M+C+1)<<32-S:R.i(M+C);return new h(N,R.h)}i.prototype.digest=i.prototype.A,i.prototype.reset=i.prototype.u,i.prototype.update=i.prototype.v,T_=i,h.prototype.add=h.prototype.add,h.prototype.multiply=h.prototype.j,h.prototype.modulo=h.prototype.B,h.prototype.compare=h.prototype.l,h.prototype.toNumber=h.prototype.m,h.prototype.toString=h.prototype.toString,h.prototype.getBits=h.prototype.i,h.fromNumber=y,h.fromString=E,Ss=h}).apply(typeof Bg<"u"?Bg:typeof self<"u"?self:typeof window<"u"?window:{});var Mu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var I_,Ma,S_,Bu,qd,A_,x_,k_;(function(){var r,e=Object.defineProperty;function t(u){u=[typeof globalThis=="object"&&globalThis,u,typeof window=="object"&&window,typeof self=="object"&&self,typeof Mu=="object"&&Mu];for(var m=0;m<u.length;++m){var _=u[m];if(_&&_.Math==Math)return _}throw Error("Cannot find global object")}var i=t(this);function o(u,m){if(m)e:{var _=i;u=u.split(".");for(var T=0;T<u.length-1;T++){var j=u[T];if(!(j in _))break e;_=_[j]}u=u[u.length-1],T=_[u],m=m(T),m!=T&&m!=null&&e(_,u,{configurable:!0,writable:!0,value:m})}}o("Symbol.dispose",function(u){return u||Symbol("Symbol.dispose")}),o("Array.prototype.values",function(u){return u||function(){return this[Symbol.iterator]()}}),o("Object.entries",function(u){return u||function(m){var _=[],T;for(T in m)Object.prototype.hasOwnProperty.call(m,T)&&_.push([T,m[T]]);return _}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var l=l||{},h=this||self;function p(u){var m=typeof u;return m=="object"&&u!=null||m=="function"}function g(u,m,_){return u.call.apply(u.bind,arguments)}function y(u,m,_){return y=g,y.apply(null,arguments)}function E(u,m){var _=Array.prototype.slice.call(arguments,1);return function(){var T=_.slice();return T.push.apply(T,arguments),u.apply(this,T)}}function I(u,m){function _(){}_.prototype=m.prototype,u.Z=m.prototype,u.prototype=new _,u.prototype.constructor=u,u.Ob=function(T,j,z){for(var X=Array(arguments.length-2),Ee=2;Ee<arguments.length;Ee++)X[Ee-2]=arguments[Ee];return m.prototype[j].apply(T,X)}}var x=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?u=>u&&AsyncContext.Snapshot.wrap(u):u=>u;function O(u){const m=u.length;if(m>0){const _=Array(m);for(let T=0;T<m;T++)_[T]=u[T];return _}return[]}function q(u,m){for(let T=1;T<arguments.length;T++){const j=arguments[T];var _=typeof j;if(_=_!="object"?_:j?Array.isArray(j)?"array":_:"null",_=="array"||_=="object"&&typeof j.length=="number"){_=u.length||0;const z=j.length||0;u.length=_+z;for(let X=0;X<z;X++)u[_+X]=j[X]}else u.push(j)}}class ${constructor(m,_){this.i=m,this.j=_,this.h=0,this.g=null}get(){let m;return this.h>0?(this.h--,m=this.g,this.g=m.next,m.next=null):m=this.i(),m}}function B(u){h.setTimeout(()=>{throw u},0)}function Z(){var u=R;let m=null;return u.g&&(m=u.g,u.g=u.g.next,u.g||(u.h=null),m.next=null),m}class ae{constructor(){this.h=this.g=null}add(m,_){const T=me.get();T.set(m,_),this.h?this.h.next=T:this.g=T,this.h=T}}var me=new $(()=>new Se,u=>u.reset());class Se{constructor(){this.next=this.g=this.h=null}set(m,_){this.h=m,this.g=_,this.next=null}reset(){this.next=this.g=this.h=null}}let Me,Ae=!1,R=new ae,S=()=>{const u=Promise.resolve(void 0);Me=()=>{u.then(C)}};function C(){for(var u;u=Z();){try{u.h.call(u.g)}catch(_){B(_)}var m=me;m.j(u),m.h<100&&(m.h++,u.next=m.g,m.g=u)}Ae=!1}function D(){this.u=this.u,this.C=this.C}D.prototype.u=!1,D.prototype.dispose=function(){this.u||(this.u=!0,this.N())},D.prototype[Symbol.dispose]=function(){this.dispose()},D.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function N(u,m){this.type=u,this.g=this.target=m,this.defaultPrevented=!1}N.prototype.h=function(){this.defaultPrevented=!0};var M=(function(){if(!h.addEventListener||!Object.defineProperty)return!1;var u=!1,m=Object.defineProperty({},"passive",{get:function(){u=!0}});try{const _=()=>{};h.addEventListener("test",_,m),h.removeEventListener("test",_,m)}catch{}return u})();function k(u){return/^[\s\xa0]*$/.test(u)}function He(u,m){N.call(this,u?u.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,u&&this.init(u,m)}I(He,N),He.prototype.init=function(u,m){const _=this.type=u.type,T=u.changedTouches&&u.changedTouches.length?u.changedTouches[0]:null;this.target=u.target||u.srcElement,this.g=m,m=u.relatedTarget,m||(_=="mouseover"?m=u.fromElement:_=="mouseout"&&(m=u.toElement)),this.relatedTarget=m,T?(this.clientX=T.clientX!==void 0?T.clientX:T.pageX,this.clientY=T.clientY!==void 0?T.clientY:T.pageY,this.screenX=T.screenX||0,this.screenY=T.screenY||0):(this.clientX=u.clientX!==void 0?u.clientX:u.pageX,this.clientY=u.clientY!==void 0?u.clientY:u.pageY,this.screenX=u.screenX||0,this.screenY=u.screenY||0),this.button=u.button,this.key=u.key||"",this.ctrlKey=u.ctrlKey,this.altKey=u.altKey,this.shiftKey=u.shiftKey,this.metaKey=u.metaKey,this.pointerId=u.pointerId||0,this.pointerType=u.pointerType,this.state=u.state,this.i=u,u.defaultPrevented&&He.Z.h.call(this)},He.prototype.h=function(){He.Z.h.call(this);const u=this.i;u.preventDefault?u.preventDefault():u.returnValue=!1};var Tt="closure_listenable_"+(Math.random()*1e6|0),Vt=0;function Xe(u,m,_,T,j){this.listener=u,this.proxy=null,this.src=m,this.type=_,this.capture=!!T,this.ha=j,this.key=++Vt,this.da=this.fa=!1}function ee(u){u.da=!0,u.listener=null,u.proxy=null,u.src=null,u.ha=null}function he(u,m,_){for(const T in u)m.call(_,u[T],T,u)}function se(u,m){for(const _ in u)m.call(void 0,u[_],_,u)}function V(u){const m={};for(const _ in u)m[_]=u[_];return m}const G="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Te(u,m){let _,T;for(let j=1;j<arguments.length;j++){T=arguments[j];for(_ in T)u[_]=T[_];for(let z=0;z<G.length;z++)_=G[z],Object.prototype.hasOwnProperty.call(T,_)&&(u[_]=T[_])}}function Ie(u){this.src=u,this.g={},this.h=0}Ie.prototype.add=function(u,m,_,T,j){const z=u.toString();u=this.g[z],u||(u=this.g[z]=[],this.h++);const X=Ce(u,m,T,j);return X>-1?(m=u[X],_||(m.fa=!1)):(m=new Xe(m,this.src,z,!!T,j),m.fa=_,u.push(m)),m};function ke(u,m){const _=m.type;if(_ in u.g){var T=u.g[_],j=Array.prototype.indexOf.call(T,m,void 0),z;(z=j>=0)&&Array.prototype.splice.call(T,j,1),z&&(ee(m),u.g[_].length==0&&(delete u.g[_],u.h--))}}function Ce(u,m,_,T){for(let j=0;j<u.length;++j){const z=u[j];if(!z.da&&z.listener==m&&z.capture==!!_&&z.ha==T)return j}return-1}var Ue="closure_lm_"+(Math.random()*1e6|0),Ve={};function $e(u,m,_,T,j){if(Array.isArray(m)){for(let z=0;z<m.length;z++)$e(u,m[z],_,T,j);return null}return _=Fo(_),u&&u[Tt]?u.J(m,_,p(T)?!!T.capture:!1,j):qt(u,m,_,!1,T,j)}function qt(u,m,_,T,j,z){if(!m)throw Error("Invalid event type");const X=p(j)?!!j.capture:!!j;let Ee=ki(u);if(Ee||(u[Ue]=Ee=new Ie(u)),_=Ee.add(m,_,T,X,z),_.proxy)return _;if(T=Ai(),_.proxy=T,T.src=u,T.listener=_,u.addEventListener)M||(j=X),j===void 0&&(j=!1),u.addEventListener(m.toString(),T,j);else if(u.attachEvent)u.attachEvent(xi(m.toString()),T);else if(u.addListener&&u.removeListener)u.addListener(T);else throw Error("addEventListener and attachEvent are unavailable.");return _}function Ai(){function u(_){return m.call(u.src,u.listener,_)}const m=El;return u}function jo(u,m,_,T,j){if(Array.isArray(m))for(var z=0;z<m.length;z++)jo(u,m[z],_,T,j);else T=p(T)?!!T.capture:!!T,_=Fo(_),u&&u[Tt]?(u=u.i,z=String(m).toString(),z in u.g&&(m=u.g[z],_=Ce(m,_,T,j),_>-1&&(ee(m[_]),Array.prototype.splice.call(m,_,1),m.length==0&&(delete u.g[z],u.h--)))):u&&(u=ki(u))&&(m=u.g[m.toString()],u=-1,m&&(u=Ce(m,_,T,j)),(_=u>-1?m[u]:null)&&Ur(_))}function Ur(u){if(typeof u!="number"&&u&&!u.da){var m=u.src;if(m&&m[Tt])ke(m.i,u);else{var _=u.type,T=u.proxy;m.removeEventListener?m.removeEventListener(_,T,u.capture):m.detachEvent?m.detachEvent(xi(_),T):m.addListener&&m.removeListener&&m.removeListener(T),(_=ki(m))?(ke(_,u),_.h==0&&(_.src=null,m[Ue]=null)):ee(u)}}}function xi(u){return u in Ve?Ve[u]:Ve[u]="on"+u}function El(u,m){if(u.da)u=!0;else{m=new He(m,this);const _=u.listener,T=u.ha||u.src;u.fa&&Ur(u),u=_.call(T,m)}return u}function ki(u){return u=u[Ue],u instanceof Ie?u:null}var Ms="__closure_events_fn_"+(Math.random()*1e9>>>0);function Fo(u){return typeof u=="function"?u:(u[Ms]||(u[Ms]=function(m){return u.handleEvent(m)}),u[Ms])}function dt(){D.call(this),this.i=new Ie(this),this.M=this,this.G=null}I(dt,D),dt.prototype[Tt]=!0,dt.prototype.removeEventListener=function(u,m,_,T){jo(this,u,m,_,T)};function ot(u,m){var _,T=u.G;if(T)for(_=[];T;T=T.G)_.push(T);if(u=u.M,T=m.type||m,typeof m=="string")m=new N(m,u);else if(m instanceof N)m.target=m.target||u;else{var j=m;m=new N(T,u),Te(m,j)}j=!0;let z,X;if(_)for(X=_.length-1;X>=0;X--)z=m.g=_[X],j=xn(z,T,!0,m)&&j;if(z=m.g=u,j=xn(z,T,!0,m)&&j,j=xn(z,T,!1,m)&&j,_)for(X=0;X<_.length;X++)z=m.g=_[X],j=xn(z,T,!1,m)&&j}dt.prototype.N=function(){if(dt.Z.N.call(this),this.i){var u=this.i;for(const m in u.g){const _=u.g[m];for(let T=0;T<_.length;T++)ee(_[T]);delete u.g[m],u.h--}}this.G=null},dt.prototype.J=function(u,m,_,T){return this.i.add(String(u),m,!1,_,T)},dt.prototype.K=function(u,m,_,T){return this.i.add(String(u),m,!0,_,T)};function xn(u,m,_,T){if(m=u.i.g[String(m)],!m)return!0;m=m.concat();let j=!0;for(let z=0;z<m.length;++z){const X=m[z];if(X&&!X.da&&X.capture==_){const Ee=X.listener,at=X.ha||X.src;X.fa&&ke(u.i,X),j=Ee.call(at,T)!==!1&&j}}return j&&!T.defaultPrevented}function Uo(u,m){if(typeof u!="function")if(u&&typeof u.handleEvent=="function")u=y(u.handleEvent,u);else throw Error("Invalid listener argument");return Number(m)>2147483647?-1:h.setTimeout(u,m||0)}function zo(u){u.g=Uo(()=>{u.g=null,u.i&&(u.i=!1,zo(u))},u.l);const m=u.h;u.h=null,u.m.apply(null,m)}class wl extends D{constructor(m,_){super(),this.m=m,this.l=_,this.h=null,this.i=!1,this.g=null}j(m){this.h=arguments,this.g?this.i=!0:zo(this)}N(){super.N(),this.g&&(h.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function zr(u){D.call(this),this.h=u,this.g={}}I(zr,D);var Bo=[];function Ci(u){he(u.g,function(m,_){this.g.hasOwnProperty(_)&&Ur(m)},u),u.g={}}zr.prototype.N=function(){zr.Z.N.call(this),Ci(this)},zr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Br=h.JSON.stringify,Tl=h.JSON.parse,Ls=class{stringify(u){return h.JSON.stringify(u,void 0)}parse(u){return h.JSON.parse(u,void 0)}};function $r(){}function Il(){}var qr={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Ri(){N.call(this,"d")}I(Ri,N);function $o(){N.call(this,"c")}I($o,N);var kn={},Pi=null;function Hr(){return Pi=Pi||new dt}kn.Ia="serverreachability";function Ni(u){N.call(this,kn.Ia,u)}I(Ni,N);function fr(u){const m=Hr();ot(m,new Ni(m))}kn.STAT_EVENT="statevent";function pr(u,m){N.call(this,kn.STAT_EVENT,u),this.stat=m}I(pr,N);function rt(u){const m=Hr();ot(m,new pr(m,u))}kn.Ja="timingevent";function qo(u,m){N.call(this,kn.Ja,u),this.size=m}I(qo,N);function Wr(u,m){if(typeof u!="function")throw Error("Fn must not be null and must be a function");return h.setTimeout(function(){u()},m)}function Gr(){this.g=!0}Gr.prototype.ua=function(){this.g=!1};function Sl(u,m,_,T,j,z){u.info(function(){if(u.g)if(z){var X="",Ee=z.split("&");for(let Be=0;Be<Ee.length;Be++){var at=Ee[Be].split("=");if(at.length>1){const ft=at[0];at=at[1];const cn=ft.split("_");X=cn.length>=2&&cn[1]=="type"?X+(ft+"="+at+"&"):X+(ft+"=redacted&")}}}else X=null;else X=z;return"XMLHTTP REQ ("+T+") [attempt "+j+"]: "+m+`
`+_+`
`+X})}function Al(u,m,_,T,j,z,X){u.info(function(){return"XMLHTTP RESP ("+T+") [ attempt "+j+"]: "+m+`
`+_+`
`+z+" "+X})}function zn(u,m,_,T){u.info(function(){return"XMLHTTP TEXT ("+m+"): "+js(u,_)+(T?" "+T:"")})}function xl(u,m){u.info(function(){return"TIMEOUT: "+m})}Gr.prototype.info=function(){};function js(u,m){if(!u.g)return m;if(!m)return null;try{const z=JSON.parse(m);if(z){for(u=0;u<z.length;u++)if(Array.isArray(z[u])){var _=z[u];if(!(_.length<2)){var T=_[1];if(Array.isArray(T)&&!(T.length<1)){var j=T[0];if(j!="noop"&&j!="stop"&&j!="close")for(let X=1;X<T.length;X++)T[X]=""}}}}return Br(z)}catch{return m}}var Kr={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Qr={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},kl;function mr(){}I(mr,$r),mr.prototype.g=function(){return new XMLHttpRequest},kl=new mr;function Bn(u){return encodeURIComponent(String(u))}function bi(u){var m=1;u=u.split(":");const _=[];for(;m>0&&u.length;)_.push(u.shift()),m--;return u.length&&_.push(u.join(":")),_}function gn(u,m,_,T){this.j=u,this.i=m,this.l=_,this.S=T||1,this.V=new zr(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Cl}function Cl(){this.i=null,this.g="",this.h=!1}var Rl={},Ho={};function Cn(u,m,_){u.M=1,u.A=yr(yn(m)),u.u=_,u.R=!0,Wo(u,null)}function Wo(u,m){u.F=Date.now(),Fs(u),u.B=yn(u.A);var _=u.B,T=u.S;Array.isArray(T)||(T=[String(T)]),na(_.i,"t",T),u.C=0,_=u.j.L,u.h=new Cl,u.g=Fl(u.j,_?m:null,!u.u),u.P>0&&(u.O=new wl(y(u.Y,u,u.g),u.P)),m=u.V,_=u.g,T=u.ba;var j="readystatechange";Array.isArray(j)||(j&&(Bo[0]=j.toString()),j=Bo);for(let z=0;z<j.length;z++){const X=$e(_,j[z],T||m.handleEvent,!1,m.h||m);if(!X)break;m.g[X.key]=X}m=u.J?V(u.J):{},u.u?(u.v||(u.v="POST"),m["Content-Type"]="application/x-www-form-urlencoded",u.g.ea(u.B,u.v,u.u,m)):(u.v="GET",u.g.ea(u.B,u.v,null,m)),fr(),Sl(u.i,u.v,u.B,u.l,u.S,u.u)}gn.prototype.ba=function(u){u=u.target;const m=this.O;m&&Qn(u)==3?m.j():this.Y(u)},gn.prototype.Y=function(u){try{if(u==this.g)e:{const Ee=Qn(this.g),at=this.g.ya(),Be=this.g.ca();if(!(Ee<3)&&(Ee!=3||this.g&&(this.h.h||this.g.la()||Ll(this.g)))){this.K||Ee!=4||at==7||(at==8||Be<=0?fr(3):fr(2)),Di(this);var m=this.g.ca();this.X=m;var _=Pl(this);if(this.o=m==200,Al(this.i,this.v,this.B,this.l,this.S,Ee,m),this.o){if(this.U&&!this.L){t:{if(this.g){var T,j=this.g;if((T=j.g?j.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!k(T)){var z=T;break t}}z=null}if(u=z)zn(this.i,this.l,u,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Ke(this,u);else{this.o=!1,this.m=3,rt(12),gr(this),Us(this);break e}}if(this.R){u=!0;let ft;for(;!this.K&&this.C<_.length;)if(ft=bl(this,_),ft==Ho){Ee==4&&(this.m=4,rt(14),u=!1),zn(this.i,this.l,null,"[Incomplete Response]");break}else if(ft==Rl){this.m=4,rt(15),zn(this.i,this.l,_,"[Invalid Chunk]"),u=!1;break}else zn(this.i,this.l,ft,null),Ke(this,ft);if(Nl(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Ee!=4||_.length!=0||this.h.h||(this.m=1,rt(16),u=!1),this.o=this.o&&u,!u)zn(this.i,this.l,_,"[Invalid Chunked Response]"),gr(this),Us(this);else if(_.length>0&&!this.W){this.W=!0;var X=this.j;X.g==this&&X.aa&&!X.P&&(X.j.info("Great, no buffering proxy detected. Bytes received: "+_.length),Qs(X),X.P=!0,rt(11))}}else zn(this.i,this.l,_,null),Ke(this,_);Ee==4&&gr(this),this.o&&!this.K&&(Ee==4?$i(this.j,this):(this.o=!1,Fs(this)))}else sa(this.g),m==400&&_.indexOf("Unknown SID")>0?(this.m=3,rt(12)):(this.m=0,rt(13)),gr(this),Us(this)}}}catch{}finally{}};function Pl(u){if(!Nl(u))return u.g.la();const m=Ll(u.g);if(m==="")return"";let _="";const T=m.length,j=Qn(u.g)==4;if(!u.h.i){if(typeof TextDecoder>"u")return gr(u),Us(u),"";u.h.i=new h.TextDecoder}for(let z=0;z<T;z++)u.h.h=!0,_+=u.h.i.decode(m[z],{stream:!(j&&z==T-1)});return m.length=0,u.h.g+=_,u.C=0,u.h.g}function Nl(u){return u.g?u.v=="GET"&&u.M!=2&&u.j.Aa:!1}function bl(u,m){var _=u.C,T=m.indexOf(`
`,_);return T==-1?Ho:(_=Number(m.substring(_,T)),isNaN(_)?Rl:(T+=1,T+_>m.length?Ho:(m=m.slice(T,T+_),u.C=T+_,m)))}gn.prototype.cancel=function(){this.K=!0,gr(this)};function Fs(u){u.T=Date.now()+u.H,Go(u,u.H)}function Go(u,m){if(u.D!=null)throw Error("WatchDog timer not null");u.D=Wr(y(u.aa,u),m)}function Di(u){u.D&&(h.clearTimeout(u.D),u.D=null)}gn.prototype.aa=function(){this.D=null;const u=Date.now();u-this.T>=0?(xl(this.i,this.B),this.M!=2&&(fr(),rt(17)),gr(this),this.m=2,Us(this)):Go(this,this.T-u)};function Us(u){u.j.I==0||u.K||$i(u.j,u)}function gr(u){Di(u);var m=u.O;m&&typeof m.dispose=="function"&&m.dispose(),u.O=null,Ci(u.V),u.g&&(m=u.g,u.g=null,m.abort(),m.dispose())}function Ke(u,m){try{var _=u.j;if(_.I!=0&&(_.g==u||Qo(_.h,u))){if(!u.L&&Qo(_.h,u)&&_.I==3){try{var T=_.Ba.g.parse(m)}catch{T=null}if(Array.isArray(T)&&T.length==3){var j=T;if(j[0]==0){e:if(!_.v){if(_.g)if(_.g.F+3e3<u.F)Bi(_),ln(_);else break e;Xn(_),rt(18)}}else _.xa=j[1],0<_.xa-_.K&&j[2]<37500&&_.F&&_.A==0&&!_.C&&(_.C=Wr(y(_.Va,_),6e3));zs(_.h)<=1&&_.ta&&(_.ta=void 0)}else un(_,11)}else if((u.L||_.g==u)&&Bi(_),!k(m))for(j=_.Ba.g.parse(m),m=0;m<j.length;m++){let Be=j[m];const ft=Be[0];if(!(ft<=_.K))if(_.K=ft,Be=Be[1],_.I==2)if(Be[0]=="c"){_.M=Be[1],_.ba=Be[2];const cn=Be[3];cn!=null&&(_.ka=cn,_.j.info("VER="+_.ka));const Tr=Be[4];Tr!=null&&(_.za=Tr,_.j.info("SVER="+_.za));const Zn=Be[5];Zn!=null&&typeof Zn=="number"&&Zn>0&&(T=1.5*Zn,_.O=T,_.j.info("backChannelRequestTimeoutMs_="+T)),T=_;const er=u.g;if(er){const Wi=er.g?er.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Wi){var z=T.h;z.g||Wi.indexOf("spdy")==-1&&Wi.indexOf("quic")==-1&&Wi.indexOf("h2")==-1||(z.j=z.l,z.g=new Set,z.h&&(Oi(z,z.h),z.h=null))}if(T.G){const aa=er.g?er.g.getResponseHeader("X-HTTP-Session-Id"):null;aa&&(T.wa=aa,Fe(T.J,T.G,aa))}}_.I=3,_.l&&_.l.ra(),_.aa&&(_.T=Date.now()-u.F,_.j.info("Handshake RTT: "+_.T+"ms")),T=_;var X=u;if(T.na=oa(T,T.L?T.ba:null,T.W),X.L){Bs(T.h,X);var Ee=X,at=T.O;at&&(Ee.H=at),Ee.D&&(Di(Ee),Fs(Ee)),T.g=X}else Ot(T);_.i.length>0&&wr(_)}else Be[0]!="stop"&&Be[0]!="close"||un(_,7);else _.I==3&&(Be[0]=="stop"||Be[0]=="close"?Be[0]=="stop"?un(_,7):Ui(_):Be[0]!="noop"&&_.l&&_.l.qa(Be),_.A=0)}}fr(4)}catch{}}var Qc=class{constructor(u,m){this.g=u,this.map=m}};function Vi(u){this.l=u||10,h.PerformanceNavigationTiming?(u=h.performance.getEntriesByType("navigation"),u=u.length>0&&(u[0].nextHopProtocol=="hq"||u[0].nextHopProtocol=="h2")):u=!!(h.chrome&&h.chrome.loadTimes&&h.chrome.loadTimes()&&h.chrome.loadTimes().wasFetchedViaSpdy),this.j=u?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Ko(u){return u.h?!0:u.g?u.g.size>=u.j:!1}function zs(u){return u.h?1:u.g?u.g.size:0}function Qo(u,m){return u.h?u.h==m:u.g?u.g.has(m):!1}function Oi(u,m){u.g?u.g.add(m):u.h=m}function Bs(u,m){u.h&&u.h==m?u.h=null:u.g&&u.g.has(m)&&u.g.delete(m)}Vi.prototype.cancel=function(){if(this.i=sn(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const u of this.g.values())u.cancel();this.g.clear()}};function sn(u){if(u.h!=null)return u.i.concat(u.h.G);if(u.g!=null&&u.g.size!==0){let m=u.i;for(const _ of u.g.values())m=m.concat(_.G);return m}return O(u.i)}var Dl=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function on(u,m){if(u){u=u.split("&");for(let _=0;_<u.length;_++){const T=u[_].indexOf("=");let j,z=null;T>=0?(j=u[_].substring(0,T),z=u[_].substring(T+1)):j=u[_],m(j,z?decodeURIComponent(z.replace(/\+/g," ")):"")}}}function $n(u){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let m;u instanceof $n?(this.l=u.l,$s(this,u.j),this.o=u.o,this.g=u.g,qn(this,u.u),this.h=u.h,Yr(this,ra(u.i)),this.m=u.m):u&&(m=String(u).match(Dl))?(this.l=!1,$s(this,m[1]||"",!0),this.o=qs(m[2]||""),this.g=qs(m[3]||"",!0),qn(this,m[4]),this.h=qs(m[5]||"",!0),Yr(this,m[6]||"",!0),this.m=qs(m[7]||"")):(this.l=!1,this.i=new be(null,this.l))}$n.prototype.toString=function(){const u=[];var m=this.j;m&&u.push(Hs(m,Jo,!0),":");var _=this.g;return(_||m=="file")&&(u.push("//"),(m=this.o)&&u.push(Hs(m,Jo,!0),"@"),u.push(Bn(_).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),_=this.u,_!=null&&u.push(":",String(_))),(_=this.h)&&(this.g&&_.charAt(0)!="/"&&u.push("/"),u.push(Hs(_,_.charAt(0)=="/"?Ws:Xo,!0))),(_=this.i.toString())&&u.push("?",_),(_=this.m)&&u.push("#",Hs(_,Zo)),u.join("")},$n.prototype.resolve=function(u){const m=yn(this);let _=!!u.j;_?$s(m,u.j):_=!!u.o,_?m.o=u.o:_=!!u.g,_?m.g=u.g:_=u.u!=null;var T=u.h;if(_)qn(m,u.u);else if(_=!!u.h){if(T.charAt(0)!="/")if(this.g&&!this.h)T="/"+T;else{var j=m.h.lastIndexOf("/");j!=-1&&(T=m.h.slice(0,j+1)+T)}if(j=T,j==".."||j==".")T="";else if(j.indexOf("./")!=-1||j.indexOf("/.")!=-1){T=j.lastIndexOf("/",0)==0,j=j.split("/");const z=[];for(let X=0;X<j.length;){const Ee=j[X++];Ee=="."?T&&X==j.length&&z.push(""):Ee==".."?((z.length>1||z.length==1&&z[0]!="")&&z.pop(),T&&X==j.length&&z.push("")):(z.push(Ee),T=!0)}T=z.join("/")}else T=j}return _?m.h=T:_=u.i.toString()!=="",_?Yr(m,ra(u.i)):_=!!u.m,_&&(m.m=u.m),m};function yn(u){return new $n(u)}function $s(u,m,_){u.j=_?qs(m,!0):m,u.j&&(u.j=u.j.replace(/:$/,""))}function qn(u,m){if(m){if(m=Number(m),isNaN(m)||m<0)throw Error("Bad port number "+m);u.u=m}else u.u=null}function Yr(u,m,_){m instanceof be?(u.i=m,Li(u.i,u.l)):(_||(m=Hs(m,Yc)),u.i=new be(m,u.l))}function Fe(u,m,_){u.i.set(m,_)}function yr(u){return Fe(u,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),u}function qs(u,m){return u?m?decodeURI(u.replace(/%25/g,"%2525")):decodeURIComponent(u):""}function Hs(u,m,_){return typeof u=="string"?(u=encodeURI(u).replace(m,Yo),_&&(u=u.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u):null}function Yo(u){return u=u.charCodeAt(0),"%"+(u>>4&15).toString(16)+(u&15).toString(16)}var Jo=/[#\/\?@]/g,Xo=/[#\?:]/g,Ws=/[#\?]/g,Yc=/[#\?@]/g,Zo=/#/g;function be(u,m){this.h=this.g=null,this.i=u||null,this.j=!!m}function Hn(u){u.g||(u.g=new Map,u.h=0,u.i&&on(u.i,function(m,_){u.add(decodeURIComponent(m.replace(/\+/g," ")),_)}))}r=be.prototype,r.add=function(u,m){Hn(this),this.i=null,u=Wn(this,u);let _=this.g.get(u);return _||this.g.set(u,_=[]),_.push(m),this.h+=1,this};function ea(u,m){Hn(u),m=Wn(u,m),u.g.has(m)&&(u.i=null,u.h-=u.g.get(m).length,u.g.delete(m))}function Mi(u,m){return Hn(u),m=Wn(u,m),u.g.has(m)}r.forEach=function(u,m){Hn(this),this.g.forEach(function(_,T){_.forEach(function(j){u.call(m,j,T,this)},this)},this)};function ta(u,m){Hn(u);let _=[];if(typeof m=="string")Mi(u,m)&&(_=_.concat(u.g.get(Wn(u,m))));else for(u=Array.from(u.g.values()),m=0;m<u.length;m++)_=_.concat(u[m]);return _}r.set=function(u,m){return Hn(this),this.i=null,u=Wn(this,u),Mi(this,u)&&(this.h-=this.g.get(u).length),this.g.set(u,[m]),this.h+=1,this},r.get=function(u,m){return u?(u=ta(this,u),u.length>0?String(u[0]):m):m};function na(u,m,_){ea(u,m),_.length>0&&(u.i=null,u.g.set(Wn(u,m),O(_)),u.h+=_.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const u=[],m=Array.from(this.g.keys());for(let T=0;T<m.length;T++){var _=m[T];const j=Bn(_);_=ta(this,_);for(let z=0;z<_.length;z++){let X=j;_[z]!==""&&(X+="="+Bn(_[z])),u.push(X)}}return this.i=u.join("&")};function ra(u){const m=new be;return m.i=u.i,u.g&&(m.g=new Map(u.g),m.h=u.h),m}function Wn(u,m){return m=String(m),u.j&&(m=m.toLowerCase()),m}function Li(u,m){m&&!u.j&&(Hn(u),u.i=null,u.g.forEach(function(_,T){const j=T.toLowerCase();T!=j&&(ea(this,T),na(this,j,_))},u)),u.j=m}function Gn(u,m){const _=new Gr;if(h.Image){const T=new Image;T.onload=E(kt,_,"TestLoadImage: loaded",!0,m,T),T.onerror=E(kt,_,"TestLoadImage: error",!1,m,T),T.onabort=E(kt,_,"TestLoadImage: abort",!1,m,T),T.ontimeout=E(kt,_,"TestLoadImage: timeout",!1,m,T),h.setTimeout(function(){T.ontimeout&&T.ontimeout()},1e4),T.src=u}else m(!1)}function Kn(u,m){const _=new Gr,T=new AbortController,j=setTimeout(()=>{T.abort(),kt(_,"TestPingServer: timeout",!1,m)},1e4);fetch(u,{signal:T.signal}).then(z=>{clearTimeout(j),z.ok?kt(_,"TestPingServer: ok",!0,m):kt(_,"TestPingServer: server error",!1,m)}).catch(()=>{clearTimeout(j),kt(_,"TestPingServer: error",!1,m)})}function kt(u,m,_,T,j){try{j&&(j.onload=null,j.onerror=null,j.onabort=null,j.ontimeout=null),T(_)}catch{}}function Gs(){this.g=new Ls}function _r(u){this.i=u.Sb||null,this.h=u.ab||!1}I(_r,$r),_r.prototype.g=function(){return new an(this.i,this.h)};function an(u,m){dt.call(this),this.H=u,this.o=m,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}I(an,dt),r=an.prototype,r.open=function(u,m){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=u,this.D=m,this.readyState=1,Rn(this)},r.send=function(u){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const m={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};u&&(m.body=u),(this.H||h).fetch(new Request(this.D,m)).then(this.Pa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Jr(this)),this.readyState=0},r.Pa=function(u){if(this.g&&(this.l=u,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=u.headers,this.readyState=2,Rn(this)),this.g&&(this.readyState=3,Rn(this),this.g)))if(this.responseType==="arraybuffer")u.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof h.ReadableStream<"u"&&"body"in u){if(this.j=u.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Vl(this)}else u.text().then(this.Oa.bind(this),this.ga.bind(this))};function Vl(u){u.j.read().then(u.Ma.bind(u)).catch(u.ga.bind(u))}r.Ma=function(u){if(this.g){if(this.o&&u.value)this.response.push(u.value);else if(!this.o){var m=u.value?u.value:new Uint8Array(0);(m=this.B.decode(m,{stream:!u.done}))&&(this.response=this.responseText+=m)}u.done?Jr(this):Rn(this),this.readyState==3&&Vl(this)}},r.Oa=function(u){this.g&&(this.response=this.responseText=u,Jr(this))},r.Na=function(u){this.g&&(this.response=u,Jr(this))},r.ga=function(){this.g&&Jr(this)};function Jr(u){u.readyState=4,u.l=null,u.j=null,u.B=null,Rn(u)}r.setRequestHeader=function(u,m){this.A.append(u,m)},r.getResponseHeader=function(u){return this.h&&this.h.get(u.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const u=[],m=this.h.entries();for(var _=m.next();!_.done;)_=_.value,u.push(_[0]+": "+_[1]),_=m.next();return u.join(`\r
`)};function Rn(u){u.onreadystatechange&&u.onreadystatechange.call(u)}Object.defineProperty(an.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(u){this.m=u?"include":"same-origin"}});function Ol(u){let m="";return he(u,function(_,T){m+=T,m+=":",m+=_,m+=`\r
`}),m}function ji(u,m,_){e:{for(T in _){var T=!1;break e}T=!0}T||(_=Ol(_),typeof u=="string"?_!=null&&Bn(_):Fe(u,m,_))}function qe(u){dt.call(this),this.headers=new Map,this.L=u||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}I(qe,dt);var Ml=/^https?$/i,Jc=["POST","PUT"];r=qe.prototype,r.Fa=function(u){this.H=u},r.ea=function(u,m,_,T){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+u);m=m?m.toUpperCase():"GET",this.D=u,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():kl.g(),this.g.onreadystatechange=x(y(this.Ca,this));try{this.B=!0,this.g.open(m,String(u),!0),this.B=!1}catch(z){Xr(this,z);return}if(u=_||"",_=new Map(this.headers),T)if(Object.getPrototypeOf(T)===Object.prototype)for(var j in T)_.set(j,T[j]);else if(typeof T.keys=="function"&&typeof T.get=="function")for(const z of T.keys())_.set(z,T.get(z));else throw Error("Unknown input type for opt_headers: "+String(T));T=Array.from(_.keys()).find(z=>z.toLowerCase()=="content-type"),j=h.FormData&&u instanceof h.FormData,!(Array.prototype.indexOf.call(Jc,m,void 0)>=0)||T||j||_.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[z,X]of _)this.g.setRequestHeader(z,X);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(u),this.v=!1}catch(z){Xr(this,z)}};function Xr(u,m){u.h=!1,u.g&&(u.j=!0,u.g.abort(),u.j=!1),u.l=m,u.o=5,Zr(u),Er(u)}function Zr(u){u.A||(u.A=!0,ot(u,"complete"),ot(u,"error"))}r.abort=function(u){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=u||7,ot(this,"complete"),ot(this,"abort"),Er(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Er(this,!0)),qe.Z.N.call(this)},r.Ca=function(){this.u||(this.B||this.v||this.j?vr(this):this.Xa())},r.Xa=function(){vr(this)};function vr(u){if(u.h&&typeof l<"u"){if(u.v&&Qn(u)==4)setTimeout(u.Ca.bind(u),0);else if(ot(u,"readystatechange"),Qn(u)==4){u.h=!1;try{const z=u.ca();e:switch(z){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var m=!0;break e;default:m=!1}var _;if(!(_=m)){var T;if(T=z===0){let X=String(u.D).match(Dl)[1]||null;!X&&h.self&&h.self.location&&(X=h.self.location.protocol.slice(0,-1)),T=!Ml.test(X?X.toLowerCase():"")}_=T}if(_)ot(u,"complete"),ot(u,"success");else{u.o=6;try{var j=Qn(u)>2?u.g.statusText:""}catch{j=""}u.l=j+" ["+u.ca()+"]",Zr(u)}}finally{Er(u)}}}}function Er(u,m){if(u.g){u.m&&(clearTimeout(u.m),u.m=null);const _=u.g;u.g=null,m||ot(u,"ready");try{_.onreadystatechange=null}catch{}}}r.isActive=function(){return!!this.g};function Qn(u){return u.g?u.g.readyState:0}r.ca=function(){try{return Qn(this)>2?this.g.status:-1}catch{return-1}},r.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.La=function(u){if(this.g){var m=this.g.responseText;return u&&m.indexOf(u)==0&&(m=m.substring(u.length)),Tl(m)}};function Ll(u){try{if(!u.g)return null;if("response"in u.g)return u.g.response;switch(u.F){case"":case"text":return u.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in u.g)return u.g.mozResponseArrayBuffer}return null}catch{return null}}function sa(u){const m={};u=(u.g&&Qn(u)>=2&&u.g.getAllResponseHeaders()||"").split(`\r
`);for(let T=0;T<u.length;T++){if(k(u[T]))continue;var _=bi(u[T]);const j=_[0];if(_=_[1],typeof _!="string")continue;_=_.trim();const z=m[j]||[];m[j]=z,z.push(_)}se(m,function(T){return T.join(", ")})}r.ya=function(){return this.o},r.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Yn(u,m,_){return _&&_.internalChannelParams&&_.internalChannelParams[u]||m}function Fi(u){this.za=0,this.i=[],this.j=new Gr,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Yn("failFast",!1,u),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Yn("baseRetryDelayMs",5e3,u),this.Za=Yn("retryDelaySeedMs",1e4,u),this.Ta=Yn("forwardChannelMaxRetries",2,u),this.va=Yn("forwardChannelRequestTimeoutMs",2e4,u),this.ma=u&&u.xmlHttpFactory||void 0,this.Ua=u&&u.Rb||void 0,this.Aa=u&&u.useFetchStreams||!1,this.O=void 0,this.L=u&&u.supportsCrossDomainXhr||!1,this.M="",this.h=new Vi(u&&u.concurrentRequestLimit),this.Ba=new Gs,this.S=u&&u.fastHandshake||!1,this.R=u&&u.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=u&&u.Pb||!1,u&&u.ua&&this.j.ua(),u&&u.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&u&&u.detectBufferingProxy||!1,this.ia=void 0,u&&u.longPollingTimeout&&u.longPollingTimeout>0&&(this.ia=u.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}r=Fi.prototype,r.ka=8,r.I=1,r.connect=function(u,m,_,T){rt(0),this.W=u,this.H=m||{},_&&T!==void 0&&(this.H.OSID=_,this.H.OAID=T),this.F=this.X,this.J=oa(this,null,this.W),wr(this)};function Ui(u){if(zi(u),u.I==3){var m=u.V++,_=yn(u.J);if(Fe(_,"SID",u.M),Fe(_,"RID",m),Fe(_,"TYPE","terminate"),Jn(u,_),m=new gn(u,u.j,m),m.M=2,m.A=yr(yn(_)),_=!1,h.navigator&&h.navigator.sendBeacon)try{_=h.navigator.sendBeacon(m.A.toString(),"")}catch{}!_&&h.Image&&(new Image().src=m.A,_=!0),_||(m.g=Fl(m.j,null),m.g.ea(m.A)),m.F=Date.now(),Fs(m)}Ys(u)}function ln(u){u.g&&(Qs(u),u.g.cancel(),u.g=null)}function zi(u){ln(u),u.v&&(h.clearTimeout(u.v),u.v=null),Bi(u),u.h.cancel(),u.m&&(typeof u.m=="number"&&h.clearTimeout(u.m),u.m=null)}function wr(u){if(!Ko(u.h)&&!u.m){u.m=!0;var m=u.Ea;Me||S(),Ae||(Me(),Ae=!0),R.add(m,u),u.D=0}}function jl(u,m){return zs(u.h)>=u.h.j-(u.m?1:0)?!1:u.m?(u.i=m.G.concat(u.i),!0):u.I==1||u.I==2||u.D>=(u.Sa?0:u.Ta)?!1:(u.m=Wr(y(u.Ea,u,m),qi(u,u.D)),u.D++,!0)}r.Ea=function(u){if(this.m)if(this.m=null,this.I==1){if(!u){this.V=Math.floor(Math.random()*1e5),u=this.V++;const j=new gn(this,this.j,u);let z=this.o;if(this.U&&(z?(z=V(z),Te(z,this.U)):z=this.U),this.u!==null||this.R||(j.J=z,z=null),this.S)e:{for(var m=0,_=0;_<this.i.length;_++){t:{var T=this.i[_];if("__data__"in T.map&&(T=T.map.__data__,typeof T=="string")){T=T.length;break t}T=void 0}if(T===void 0)break;if(m+=T,m>4096){m=_;break e}if(m===4096||_===this.i.length-1){m=_+1;break e}}m=1e3}else m=1e3;m=ia(this,j,m),_=yn(this.J),Fe(_,"RID",u),Fe(_,"CVER",22),this.G&&Fe(_,"X-HTTP-Session-Id",this.G),Jn(this,_),z&&(this.R?m="headers="+Bn(Ol(z))+"&"+m:this.u&&ji(_,this.u,z)),Oi(this.h,j),this.Ra&&Fe(_,"TYPE","init"),this.S?(Fe(_,"$req",m),Fe(_,"SID","null"),j.U=!0,Cn(j,_,null)):Cn(j,_,m),this.I=2}}else this.I==3&&(u?Ks(this,u):this.i.length==0||Ko(this.h)||Ks(this))};function Ks(u,m){var _;m?_=m.l:_=u.V++;const T=yn(u.J);Fe(T,"SID",u.M),Fe(T,"RID",_),Fe(T,"AID",u.K),Jn(u,T),u.u&&u.o&&ji(T,u.u,u.o),_=new gn(u,u.j,_,u.D+1),u.u===null&&(_.J=u.o),m&&(u.i=m.G.concat(u.i)),m=ia(u,_,1e3),_.H=Math.round(u.va*.5)+Math.round(u.va*.5*Math.random()),Oi(u.h,_),Cn(_,T,m)}function Jn(u,m){u.H&&he(u.H,function(_,T){Fe(m,T,_)}),u.l&&he({},function(_,T){Fe(m,T,_)})}function ia(u,m,_){_=Math.min(u.i.length,_);const T=u.l?y(u.l.Ka,u.l,u):null;e:{var j=u.i;let Ee=-1;for(;;){const at=["count="+_];Ee==-1?_>0?(Ee=j[0].g,at.push("ofs="+Ee)):Ee=0:at.push("ofs="+Ee);let Be=!0;for(let ft=0;ft<_;ft++){var z=j[ft].g;const cn=j[ft].map;if(z-=Ee,z<0)Ee=Math.max(0,j[ft].g-100),Be=!1;else try{z="req"+z+"_"||"";try{var X=cn instanceof Map?cn:Object.entries(cn);for(const[Tr,Zn]of X){let er=Zn;p(Zn)&&(er=Br(Zn)),at.push(z+Tr+"="+encodeURIComponent(er))}}catch(Tr){throw at.push(z+"type="+encodeURIComponent("_badmap")),Tr}}catch{T&&T(cn)}}if(Be){X=at.join("&");break e}}X=void 0}return u=u.i.splice(0,_),m.G=u,X}function Ot(u){if(!u.g&&!u.v){u.Y=1;var m=u.Da;Me||S(),Ae||(Me(),Ae=!0),R.add(m,u),u.A=0}}function Xn(u){return u.g||u.v||u.A>=3?!1:(u.Y++,u.v=Wr(y(u.Da,u),qi(u,u.A)),u.A++,!0)}r.Da=function(){if(this.v=null,es(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var u=4*this.T;this.j.info("BP detection timer enabled: "+u),this.B=Wr(y(this.Wa,this),u)}},r.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,rt(10),ln(this),es(this))};function Qs(u){u.B!=null&&(h.clearTimeout(u.B),u.B=null)}function es(u){u.g=new gn(u,u.j,"rpc",u.Y),u.u===null&&(u.g.J=u.o),u.g.P=0;var m=yn(u.na);Fe(m,"RID","rpc"),Fe(m,"SID",u.M),Fe(m,"AID",u.K),Fe(m,"CI",u.F?"0":"1"),!u.F&&u.ia&&Fe(m,"TO",u.ia),Fe(m,"TYPE","xmlhttp"),Jn(u,m),u.u&&u.o&&ji(m,u.u,u.o),u.O&&(u.g.H=u.O);var _=u.g;u=u.ba,_.M=1,_.A=yr(yn(m)),_.u=null,_.R=!0,Wo(_,u)}r.Va=function(){this.C!=null&&(this.C=null,ln(this),Xn(this),rt(19))};function Bi(u){u.C!=null&&(h.clearTimeout(u.C),u.C=null)}function $i(u,m){var _=null;if(u.g==m){Bi(u),Qs(u),u.g=null;var T=2}else if(Qo(u.h,m))_=m.G,Bs(u.h,m),T=1;else return;if(u.I!=0){if(m.o)if(T==1){_=m.u?m.u.length:0,m=Date.now()-m.F;var j=u.D;T=Hr(),ot(T,new qo(T,_)),wr(u)}else Ot(u);else if(j=m.m,j==3||j==0&&m.X>0||!(T==1&&jl(u,m)||T==2&&Xn(u)))switch(_&&_.length>0&&(m=u.h,m.i=m.i.concat(_)),j){case 1:un(u,5);break;case 4:un(u,10);break;case 3:un(u,6);break;default:un(u,2)}}}function qi(u,m){let _=u.Qa+Math.floor(Math.random()*u.Za);return u.isActive()||(_*=2),_*m}function un(u,m){if(u.j.info("Error code "+m),m==2){var _=y(u.bb,u),T=u.Ua;const j=!T;T=new $n(T||"//www.google.com/images/cleardot.gif"),h.location&&h.location.protocol=="http"||$s(T,"https"),yr(T),j?Gn(T.toString(),_):Kn(T.toString(),_)}else rt(2);u.I=0,u.l&&u.l.pa(m),Ys(u),zi(u)}r.bb=function(u){u?(this.j.info("Successfully pinged google.com"),rt(2)):(this.j.info("Failed to ping google.com"),rt(1))};function Ys(u){if(u.I=0,u.ja=[],u.l){const m=sn(u.h);(m.length!=0||u.i.length!=0)&&(q(u.ja,m),q(u.ja,u.i),u.h.i.length=0,O(u.i),u.i.length=0),u.l.oa()}}function oa(u,m,_){var T=_ instanceof $n?yn(_):new $n(_);if(T.g!="")m&&(T.g=m+"."+T.g),qn(T,T.u);else{var j=h.location;T=j.protocol,m=m?m+"."+j.hostname:j.hostname,j=+j.port;const z=new $n(null);T&&$s(z,T),m&&(z.g=m),j&&qn(z,j),_&&(z.h=_),T=z}return _=u.G,m=u.wa,_&&m&&Fe(T,_,m),Fe(T,"VER",u.ka),Jn(u,T),T}function Fl(u,m,_){if(m&&!u.L)throw Error("Can't create secondary domain capable XhrIo object.");return m=u.Aa&&!u.ma?new qe(new _r({ab:_})):new qe(u.ma),m.Fa(u.L),m}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function Ul(){}r=Ul.prototype,r.ra=function(){},r.qa=function(){},r.pa=function(){},r.oa=function(){},r.isActive=function(){return!0},r.Ka=function(){};function Hi(){}Hi.prototype.g=function(u,m){return new Ct(u,m)};function Ct(u,m){dt.call(this),this.g=new Fi(m),this.l=u,this.h=m&&m.messageUrlParams||null,u=m&&m.messageHeaders||null,m&&m.clientProtocolHeaderRequired&&(u?u["X-Client-Protocol"]="webchannel":u={"X-Client-Protocol":"webchannel"}),this.g.o=u,u=m&&m.initMessageHeaders||null,m&&m.messageContentType&&(u?u["X-WebChannel-Content-Type"]=m.messageContentType:u={"X-WebChannel-Content-Type":m.messageContentType}),m&&m.sa&&(u?u["X-WebChannel-Client-Profile"]=m.sa:u={"X-WebChannel-Client-Profile":m.sa}),this.g.U=u,(u=m&&m.Qb)&&!k(u)&&(this.g.u=u),this.A=m&&m.supportsCrossDomainXhr||!1,this.v=m&&m.sendRawJson||!1,(m=m&&m.httpSessionIdParam)&&!k(m)&&(this.g.G=m,u=this.h,u!==null&&m in u&&(u=this.h,m in u&&delete u[m])),this.j=new ts(this)}I(Ct,dt),Ct.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Ct.prototype.close=function(){Ui(this.g)},Ct.prototype.o=function(u){var m=this.g;if(typeof u=="string"){var _={};_.__data__=u,u=_}else this.v&&(_={},_.__data__=Br(u),u=_);m.i.push(new Qc(m.Ya++,u)),m.I==3&&wr(m)},Ct.prototype.N=function(){this.g.l=null,delete this.j,Ui(this.g),delete this.g,Ct.Z.N.call(this)};function zl(u){Ri.call(this),u.__headers__&&(this.headers=u.__headers__,this.statusCode=u.__status__,delete u.__headers__,delete u.__status__);var m=u.__sm__;if(m){e:{for(const _ in m){u=_;break e}u=void 0}(this.i=u)&&(u=this.i,m=m!==null&&u in m?m[u]:void 0),this.data=m}else this.data=u}I(zl,Ri);function Bl(){$o.call(this),this.status=1}I(Bl,$o);function ts(u){this.g=u}I(ts,Ul),ts.prototype.ra=function(){ot(this.g,"a")},ts.prototype.qa=function(u){ot(this.g,new zl(u))},ts.prototype.pa=function(u){ot(this.g,new Bl)},ts.prototype.oa=function(){ot(this.g,"b")},Hi.prototype.createWebChannel=Hi.prototype.g,Ct.prototype.send=Ct.prototype.o,Ct.prototype.open=Ct.prototype.m,Ct.prototype.close=Ct.prototype.close,k_=function(){return new Hi},x_=function(){return Hr()},A_=kn,qd={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Kr.NO_ERROR=0,Kr.TIMEOUT=8,Kr.HTTP_ERROR=6,Bu=Kr,Qr.COMPLETE="complete",S_=Qr,Il.EventType=qr,qr.OPEN="a",qr.CLOSE="b",qr.ERROR="c",qr.MESSAGE="d",dt.prototype.listen=dt.prototype.J,Ma=Il,qe.prototype.listenOnce=qe.prototype.K,qe.prototype.getLastError=qe.prototype.Ha,qe.prototype.getLastErrorCode=qe.prototype.ya,qe.prototype.getStatus=qe.prototype.ca,qe.prototype.getResponseJson=qe.prototype.La,qe.prototype.getResponseText=qe.prototype.la,qe.prototype.send=qe.prototype.ea,qe.prototype.setWithCredentials=qe.prototype.Fa,I_=qe}).apply(typeof Mu<"u"?Mu:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let zt=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};zt.UNAUTHENTICATED=new zt(null),zt.GOOGLE_CREDENTIALS=new zt("google-credentials-uid"),zt.FIRST_PARTY=new zt("first-party-uid"),zt.MOCK_USER=new zt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let bo="12.12.0";function H1(r){bo=r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _i=new ff("@firebase/firestore");function po(){return _i.logLevel}function re(r,...e){if(_i.logLevel<=Re.DEBUG){const t=e.map(gf);_i.debug(`Firestore (${bo}): ${r}`,...t)}}function Mr(r,...e){if(_i.logLevel<=Re.ERROR){const t=e.map(gf);_i.error(`Firestore (${bo}): ${r}`,...t)}}function vi(r,...e){if(_i.logLevel<=Re.WARN){const t=e.map(gf);_i.warn(`Firestore (${bo}): ${r}`,...t)}}function gf(r){if(typeof r=="string")return r;try{return(function(t){return JSON.stringify(t)})(r)}catch{return r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ge(r,e,t){let i="Unexpected state";typeof e=="string"?i=e:t=e,C_(r,i,t)}function C_(r,e,t){let i=`FIRESTORE (${bo}) INTERNAL ASSERTION FAILED: ${e} (ID: ${r.toString(16)})`;if(t!==void 0)try{i+=" CONTEXT: "+JSON.stringify(t)}catch{i+=" CONTEXT: "+t}throw Mr(i),new Error(i)}function ze(r,e,t,i){let o="Unexpected state";typeof t=="string"?o=t:i=t,r||C_(e,o,i)}function we(r,e){return r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const H={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class te extends Fr{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vr{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R_{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class W1{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(zt.UNAUTHENTICATED)))}shutdown(){}}class G1{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class K1{constructor(e){this.t=e,this.currentUser=zt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){ze(this.o===void 0,42304);let i=this.i;const o=g=>this.i!==i?(i=this.i,t(g)):Promise.resolve();let l=new Vr;this.o=()=>{this.i++,this.currentUser=this.u(),l.resolve(),l=new Vr,e.enqueueRetryable((()=>o(this.currentUser)))};const h=()=>{const g=l;e.enqueueRetryable((async()=>{await g.promise,await o(this.currentUser)}))},p=g=>{re("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=g,this.o&&(this.auth.addAuthTokenListener(this.o),h())};this.t.onInit((g=>p(g))),setTimeout((()=>{if(!this.auth){const g=this.t.getImmediate({optional:!0});g?p(g):(re("FirebaseAuthCredentialsProvider","Auth not yet detected"),l.resolve(),l=new Vr)}}),0),h()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((i=>this.i!==e?(re("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):i?(ze(typeof i.accessToken=="string",31837,{l:i}),new R_(i.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ze(e===null||typeof e=="string",2055,{h:e}),new zt(e)}}class Q1{constructor(e,t,i){this.P=e,this.T=t,this.I=i,this.type="FirstParty",this.user=zt.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class Y1{constructor(e,t,i){this.P=e,this.T=t,this.I=i}getToken(){return Promise.resolve(new Q1(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(zt.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class $g{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class J1{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Mn(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){ze(this.o===void 0,3512);const i=l=>{l.error!=null&&re("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${l.error.message}`);const h=l.token!==this.m;return this.m=l.token,re("FirebaseAppCheckTokenProvider",`Received ${h?"new":"existing"} token.`),h?t(l.token):Promise.resolve()};this.o=l=>{e.enqueueRetryable((()=>i(l)))};const o=l=>{re("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=l,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((l=>o(l))),setTimeout((()=>{if(!this.appCheck){const l=this.V.getImmediate({optional:!0});l?o(l):re("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new $g(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(ze(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new $g(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function X1(r){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(r);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let i=0;i<r;i++)t[i]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yf{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let i="";for(;i.length<20;){const o=X1(40);for(let l=0;l<o.length;++l)i.length<20&&o[l]<t&&(i+=e.charAt(o[l]%62))}return i}}function Pe(r,e){return r<e?-1:r>e?1:0}function Hd(r,e){const t=Math.min(r.length,e.length);for(let i=0;i<t;i++){const o=r.charAt(i),l=e.charAt(i);if(o!==l)return Cd(o)===Cd(l)?Pe(o,l):Cd(o)?1:-1}return Pe(r.length,e.length)}const Z1=55296,eT=57343;function Cd(r){const e=r.charCodeAt(0);return e>=Z1&&e<=eT}function So(r,e,t){return r.length===e.length&&r.every(((i,o)=>t(i,e[o])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qg="__name__";class ir{constructor(e,t,i){t===void 0?t=0:t>e.length&&ge(637,{offset:t,range:e.length}),i===void 0?i=e.length-t:i>e.length-t&&ge(1746,{length:i,range:e.length-t}),this.segments=e,this.offset=t,this.len=i}get length(){return this.len}isEqual(e){return ir.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof ir?e.forEach((i=>{t.push(i)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,i=this.limit();t<i;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const i=Math.min(e.length,t.length);for(let o=0;o<i;o++){const l=ir.compareSegments(e.get(o),t.get(o));if(l!==0)return l}return Pe(e.length,t.length)}static compareSegments(e,t){const i=ir.isNumericId(e),o=ir.isNumericId(t);return i&&!o?-1:!i&&o?1:i&&o?ir.extractNumericId(e).compare(ir.extractNumericId(t)):Hd(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Ss.fromString(e.substring(4,e.length-2))}}class Ge extends ir{construct(e,t,i){return new Ge(e,t,i)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const i of e){if(i.indexOf("//")>=0)throw new te(H.INVALID_ARGUMENT,`Invalid segment (${i}). Paths must not contain // in them.`);t.push(...i.split("/").filter((o=>o.length>0)))}return new Ge(t)}static emptyPath(){return new Ge([])}}const tT=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class bt extends ir{construct(e,t,i){return new bt(e,t,i)}static isValidIdentifier(e){return tT.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),bt.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===qg}static keyField(){return new bt([qg])}static fromServerFormat(e){const t=[];let i="",o=0;const l=()=>{if(i.length===0)throw new te(H.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(i),i=""};let h=!1;for(;o<e.length;){const p=e[o];if(p==="\\"){if(o+1===e.length)throw new te(H.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const g=e[o+1];if(g!=="\\"&&g!=="."&&g!=="`")throw new te(H.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);i+=g,o+=2}else p==="`"?(h=!h,o++):p!=="."||h?(i+=p,o++):(l(),o++)}if(l(),h)throw new te(H.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new bt(t)}static emptyPath(){return new bt([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ce{constructor(e){this.path=e}static fromPath(e){return new ce(Ge.fromString(e))}static fromName(e){return new ce(Ge.fromString(e).popFirst(5))}static empty(){return new ce(Ge.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Ge.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Ge.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new ce(new Ge(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function P_(r,e,t){if(!t)throw new te(H.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${e}.`)}function nT(r,e,t,i){if(e===!0&&i===!0)throw new te(H.INVALID_ARGUMENT,`${r} and ${t} cannot be used together.`)}function Hg(r){if(!ce.isDocumentKey(r))throw new te(H.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function Wg(r){if(ce.isDocumentKey(r))throw new te(H.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function N_(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}function Sc(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const e=(function(i){return i.constructor?i.constructor.name:null})(r);return e?`a custom ${e} object`:"an object"}}return typeof r=="function"?"a function":ge(12329,{type:typeof r})}function Gt(r,e){if("_delegate"in r&&(r=r._delegate),!(r instanceof e)){if(e.name===r.constructor.name)throw new te(H.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Sc(r);throw new te(H.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return r}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yt(r,e){const t={typeString:r};return e&&(t.value=e),t}function il(r,e){if(!N_(r))throw new te(H.INVALID_ARGUMENT,"JSON must be an object");let t;for(const i in e)if(e[i]){const o=e[i].typeString,l="value"in e[i]?{value:e[i].value}:void 0;if(!(i in r)){t=`JSON missing required field: '${i}'`;break}const h=r[i];if(o&&typeof h!==o){t=`JSON field '${i}' must be a ${o}.`;break}if(l!==void 0&&h!==l.value){t=`Expected '${i}' field to equal '${l.value}'`;break}}if(t)throw new te(H.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gg=-62135596800,Kg=1e6;class Je{static now(){return Je.fromMillis(Date.now())}static fromDate(e){return Je.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),i=Math.floor((e-1e3*t)*Kg);return new Je(t,i)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new te(H.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new te(H.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Gg)throw new te(H.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new te(H.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Kg}_compareTo(e){return this.seconds===e.seconds?Pe(this.nanoseconds,e.nanoseconds):Pe(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Je._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(il(e,Je._jsonSchema))return new Je(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Gg;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Je._jsonSchemaVersion="firestore/timestamp/1.0",Je._jsonSchema={type:yt("string",Je._jsonSchemaVersion),seconds:yt("number"),nanoseconds:yt("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{static fromTimestamp(e){return new ve(e)}static min(){return new ve(new Je(0,0))}static max(){return new ve(new Je(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wa=-1;function rT(r,e){const t=r.toTimestamp().seconds,i=r.toTimestamp().nanoseconds+1,o=ve.fromTimestamp(i===1e9?new Je(t+1,0):new Je(t,i));return new xs(o,ce.empty(),e)}function sT(r){return new xs(r.readTime,r.key,Wa)}class xs{constructor(e,t,i){this.readTime=e,this.documentKey=t,this.largestBatchId=i}static min(){return new xs(ve.min(),ce.empty(),Wa)}static max(){return new xs(ve.max(),ce.empty(),Wa)}}function iT(r,e){let t=r.readTime.compareTo(e.readTime);return t!==0?t:(t=ce.comparator(r.documentKey,e.documentKey),t!==0?t:Pe(r.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oT="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class aT{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Do(r){if(r.code!==H.FAILED_PRECONDITION||r.message!==oT)throw r;re("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&ge(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new W(((i,o)=>{this.nextCallback=l=>{this.wrapSuccess(e,l).next(i,o)},this.catchCallback=l=>{this.wrapFailure(t,l).next(i,o)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof W?t:W.resolve(t)}catch(t){return W.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):W.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):W.reject(t)}static resolve(e){return new W(((t,i)=>{t(e)}))}static reject(e){return new W(((t,i)=>{i(e)}))}static waitFor(e){return new W(((t,i)=>{let o=0,l=0,h=!1;e.forEach((p=>{++o,p.next((()=>{++l,h&&l===o&&t()}),(g=>i(g)))})),h=!0,l===o&&t()}))}static or(e){let t=W.resolve(!1);for(const i of e)t=t.next((o=>o?W.resolve(o):i()));return t}static forEach(e,t){const i=[];return e.forEach(((o,l)=>{i.push(t.call(this,o,l))})),this.waitFor(i)}static mapArray(e,t){return new W(((i,o)=>{const l=e.length,h=new Array(l);let p=0;for(let g=0;g<l;g++){const y=g;t(e[y]).next((E=>{h[y]=E,++p,p===l&&i(h)}),(E=>o(E)))}}))}static doWhile(e,t){return new W(((i,o)=>{const l=()=>{e()===!0?t().next((()=>{l()}),o):i()};l()}))}}function lT(r){const e=r.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Vo(r){return r.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ac{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=i=>this.ae(i),this.ue=i=>t.writeSequenceNumber(i))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Ac.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _f=-1;function xc(r){return r==null}function ec(r){return r===0&&1/r==-1/0}function uT(r){return typeof r=="number"&&Number.isInteger(r)&&!ec(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b_="";function cT(r){let e="";for(let t=0;t<r.length;t++)e.length>0&&(e=Qg(e)),e=hT(r.get(t),e);return Qg(e)}function hT(r,e){let t=e;const i=r.length;for(let o=0;o<i;o++){const l=r.charAt(o);switch(l){case"\0":t+="";break;case b_:t+="";break;default:t+=l}}return t}function Qg(r){return r+b_+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yg(r){let e=0;for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e++;return e}function Ds(r,e){for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e(t,r[t])}function D_(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(e,t){this.comparator=e,this.root=t||Nt.EMPTY}insert(e,t){return new nt(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Nt.BLACK,null,null))}remove(e){return new nt(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Nt.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const i=this.comparator(e,t.key);if(i===0)return t.value;i<0?t=t.left:i>0&&(t=t.right)}return null}indexOf(e){let t=0,i=this.root;for(;!i.isEmpty();){const o=this.comparator(e,i.key);if(o===0)return t+i.left.size;o<0?i=i.left:(t+=i.left.size+1,i=i.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,i)=>(e(t,i),!1)))}toString(){const e=[];return this.inorderTraversal(((t,i)=>(e.push(`${t}:${i}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Lu(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Lu(this.root,e,this.comparator,!1)}getReverseIterator(){return new Lu(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Lu(this.root,e,this.comparator,!0)}}class Lu{constructor(e,t,i,o){this.isReverse=o,this.nodeStack=[];let l=1;for(;!e.isEmpty();)if(l=t?i(e.key,t):1,t&&o&&(l*=-1),l<0)e=this.isReverse?e.left:e.right;else{if(l===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Nt{constructor(e,t,i,o,l){this.key=e,this.value=t,this.color=i??Nt.RED,this.left=o??Nt.EMPTY,this.right=l??Nt.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,i,o,l){return new Nt(e??this.key,t??this.value,i??this.color,o??this.left,l??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let o=this;const l=i(e,o.key);return o=l<0?o.copy(null,null,null,o.left.insert(e,t,i),null):l===0?o.copy(null,t,null,null,null):o.copy(null,null,null,null,o.right.insert(e,t,i)),o.fixUp()}removeMin(){if(this.left.isEmpty())return Nt.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let i,o=this;if(t(e,o.key)<0)o.left.isEmpty()||o.left.isRed()||o.left.left.isRed()||(o=o.moveRedLeft()),o=o.copy(null,null,null,o.left.remove(e,t),null);else{if(o.left.isRed()&&(o=o.rotateRight()),o.right.isEmpty()||o.right.isRed()||o.right.left.isRed()||(o=o.moveRedRight()),t(e,o.key)===0){if(o.right.isEmpty())return Nt.EMPTY;i=o.right.min(),o=o.copy(i.key,i.value,null,null,o.right.removeMin())}o=o.copy(null,null,null,null,o.right.remove(e,t))}return o.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Nt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Nt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw ge(43730,{key:this.key,value:this.value});if(this.right.isRed())throw ge(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw ge(27949);return e+(this.isRed()?0:1)}}Nt.EMPTY=null,Nt.RED=!0,Nt.BLACK=!1;Nt.EMPTY=new class{constructor(){this.size=0}get key(){throw ge(57766)}get value(){throw ge(16141)}get color(){throw ge(16727)}get left(){throw ge(29726)}get right(){throw ge(36894)}copy(e,t,i,o,l){return this}insert(e,t,i){return new Nt(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(e){this.comparator=e,this.data=new nt(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,i)=>(e(t),!1)))}forEachInRange(e,t){const i=this.data.getIteratorFrom(e[0]);for(;i.hasNext();){const o=i.getNext();if(this.comparator(o.key,e[1])>=0)return;t(o.key)}}forEachWhile(e,t){let i;for(i=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();i.hasNext();)if(!e(i.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Jg(this.data.getIterator())}getIteratorFrom(e){return new Jg(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((i=>{t=t.add(i)})),t}isEqual(e){if(!(e instanceof wt)||this.size!==e.size)return!1;const t=this.data.getIterator(),i=e.data.getIterator();for(;t.hasNext();){const o=t.getNext().key,l=i.getNext().key;if(this.comparator(o,l)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new wt(this.comparator);return t.data=e,t}}class Jg{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mn{constructor(e){this.fields=e,e.sort(bt.comparator)}static empty(){return new mn([])}unionWith(e){let t=new wt(bt.comparator);for(const i of this.fields)t=t.add(i);for(const i of e)t=t.add(i);return new mn(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return So(this.fields,e.fields,((t,i)=>t.isEqual(i)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V_ extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(o){try{return atob(o)}catch(l){throw typeof DOMException<"u"&&l instanceof DOMException?new V_("Invalid base64 string: "+l):l}})(e);return new Dt(t)}static fromUint8Array(e){const t=(function(o){let l="";for(let h=0;h<o.length;++h)l+=String.fromCharCode(o[h]);return l})(e);return new Dt(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const i=new Uint8Array(t.length);for(let o=0;o<t.length;o++)i[o]=t.charCodeAt(o);return i})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Pe(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Dt.EMPTY_BYTE_STRING=new Dt("");const dT=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ks(r){if(ze(!!r,39018),typeof r=="string"){let e=0;const t=dT.exec(r);if(ze(!!t,46558,{timestamp:r}),t[1]){let o=t[1];o=(o+"000000000").substr(0,9),e=Number(o)}const i=new Date(r);return{seconds:Math.floor(i.getTime()/1e3),nanos:e}}return{seconds:ut(r.seconds),nanos:ut(r.nanos)}}function ut(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function Cs(r){return typeof r=="string"?Dt.fromBase64String(r):Dt.fromUint8Array(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const O_="server_timestamp",M_="__type__",L_="__previous_value__",j_="__local_write_time__";function vf(r){var t,i;return((i=(((t=r==null?void 0:r.mapValue)==null?void 0:t.fields)||{})[M_])==null?void 0:i.stringValue)===O_}function kc(r){const e=r.mapValue.fields[L_];return vf(e)?kc(e):e}function Ga(r){const e=ks(r.mapValue.fields[j_].timestampValue);return new Je(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fT{constructor(e,t,i,o,l,h,p,g,y,E,I){this.databaseId=e,this.appId=t,this.persistenceKey=i,this.host=o,this.ssl=l,this.forceLongPolling=h,this.autoDetectLongPolling=p,this.longPollingOptions=g,this.useFetchStreams=y,this.isUsingEmulator=E,this.apiKey=I}}const tc="(default)";class Ka{constructor(e,t){this.projectId=e,this.database=t||tc}static empty(){return new Ka("","")}get isDefaultDatabase(){return this.database===tc}isEqual(e){return e instanceof Ka&&e.projectId===this.projectId&&e.database===this.database}}function pT(r,e){if(!Object.prototype.hasOwnProperty.apply(r.options,["projectId"]))throw new te(H.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ka(r.options.projectId,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const F_="__type__",mT="__max__",ju={mapValue:{}},U_="__vector__",nc="value";function Rs(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?vf(r)?4:yT(r)?9007199254740991:gT(r)?10:11:ge(28295,{value:r})}function cr(r,e){if(r===e)return!0;const t=Rs(r);if(t!==Rs(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===e.booleanValue;case 4:return Ga(r).isEqual(Ga(e));case 3:return(function(o,l){if(typeof o.timestampValue=="string"&&typeof l.timestampValue=="string"&&o.timestampValue.length===l.timestampValue.length)return o.timestampValue===l.timestampValue;const h=ks(o.timestampValue),p=ks(l.timestampValue);return h.seconds===p.seconds&&h.nanos===p.nanos})(r,e);case 5:return r.stringValue===e.stringValue;case 6:return(function(o,l){return Cs(o.bytesValue).isEqual(Cs(l.bytesValue))})(r,e);case 7:return r.referenceValue===e.referenceValue;case 8:return(function(o,l){return ut(o.geoPointValue.latitude)===ut(l.geoPointValue.latitude)&&ut(o.geoPointValue.longitude)===ut(l.geoPointValue.longitude)})(r,e);case 2:return(function(o,l){if("integerValue"in o&&"integerValue"in l)return ut(o.integerValue)===ut(l.integerValue);if("doubleValue"in o&&"doubleValue"in l){const h=ut(o.doubleValue),p=ut(l.doubleValue);return h===p?ec(h)===ec(p):isNaN(h)&&isNaN(p)}return!1})(r,e);case 9:return So(r.arrayValue.values||[],e.arrayValue.values||[],cr);case 10:case 11:return(function(o,l){const h=o.mapValue.fields||{},p=l.mapValue.fields||{};if(Yg(h)!==Yg(p))return!1;for(const g in h)if(h.hasOwnProperty(g)&&(p[g]===void 0||!cr(h[g],p[g])))return!1;return!0})(r,e);default:return ge(52216,{left:r})}}function Qa(r,e){return(r.values||[]).find((t=>cr(t,e)))!==void 0}function Ao(r,e){if(r===e)return 0;const t=Rs(r),i=Rs(e);if(t!==i)return Pe(t,i);switch(t){case 0:case 9007199254740991:return 0;case 1:return Pe(r.booleanValue,e.booleanValue);case 2:return(function(l,h){const p=ut(l.integerValue||l.doubleValue),g=ut(h.integerValue||h.doubleValue);return p<g?-1:p>g?1:p===g?0:isNaN(p)?isNaN(g)?0:-1:1})(r,e);case 3:return Xg(r.timestampValue,e.timestampValue);case 4:return Xg(Ga(r),Ga(e));case 5:return Hd(r.stringValue,e.stringValue);case 6:return(function(l,h){const p=Cs(l),g=Cs(h);return p.compareTo(g)})(r.bytesValue,e.bytesValue);case 7:return(function(l,h){const p=l.split("/"),g=h.split("/");for(let y=0;y<p.length&&y<g.length;y++){const E=Pe(p[y],g[y]);if(E!==0)return E}return Pe(p.length,g.length)})(r.referenceValue,e.referenceValue);case 8:return(function(l,h){const p=Pe(ut(l.latitude),ut(h.latitude));return p!==0?p:Pe(ut(l.longitude),ut(h.longitude))})(r.geoPointValue,e.geoPointValue);case 9:return Zg(r.arrayValue,e.arrayValue);case 10:return(function(l,h){var x,O,q,$;const p=l.fields||{},g=h.fields||{},y=(x=p[nc])==null?void 0:x.arrayValue,E=(O=g[nc])==null?void 0:O.arrayValue,I=Pe(((q=y==null?void 0:y.values)==null?void 0:q.length)||0,(($=E==null?void 0:E.values)==null?void 0:$.length)||0);return I!==0?I:Zg(y,E)})(r.mapValue,e.mapValue);case 11:return(function(l,h){if(l===ju.mapValue&&h===ju.mapValue)return 0;if(l===ju.mapValue)return 1;if(h===ju.mapValue)return-1;const p=l.fields||{},g=Object.keys(p),y=h.fields||{},E=Object.keys(y);g.sort(),E.sort();for(let I=0;I<g.length&&I<E.length;++I){const x=Hd(g[I],E[I]);if(x!==0)return x;const O=Ao(p[g[I]],y[E[I]]);if(O!==0)return O}return Pe(g.length,E.length)})(r.mapValue,e.mapValue);default:throw ge(23264,{he:t})}}function Xg(r,e){if(typeof r=="string"&&typeof e=="string"&&r.length===e.length)return Pe(r,e);const t=ks(r),i=ks(e),o=Pe(t.seconds,i.seconds);return o!==0?o:Pe(t.nanos,i.nanos)}function Zg(r,e){const t=r.values||[],i=e.values||[];for(let o=0;o<t.length&&o<i.length;++o){const l=Ao(t[o],i[o]);if(l)return l}return Pe(t.length,i.length)}function xo(r){return Wd(r)}function Wd(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?(function(t){const i=ks(t);return`time(${i.seconds},${i.nanos})`})(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?(function(t){return Cs(t).toBase64()})(r.bytesValue):"referenceValue"in r?(function(t){return ce.fromName(t).toString()})(r.referenceValue):"geoPointValue"in r?(function(t){return`geo(${t.latitude},${t.longitude})`})(r.geoPointValue):"arrayValue"in r?(function(t){let i="[",o=!0;for(const l of t.values||[])o?o=!1:i+=",",i+=Wd(l);return i+"]"})(r.arrayValue):"mapValue"in r?(function(t){const i=Object.keys(t.fields||{}).sort();let o="{",l=!0;for(const h of i)l?l=!1:o+=",",o+=`${h}:${Wd(t.fields[h])}`;return o+"}"})(r.mapValue):ge(61005,{value:r})}function $u(r){switch(Rs(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=kc(r);return e?16+$u(e):16;case 5:return 2*r.stringValue.length;case 6:return Cs(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return(function(i){return(i.values||[]).reduce(((o,l)=>o+$u(l)),0)})(r.arrayValue);case 10:case 11:return(function(i){let o=0;return Ds(i.fields,((l,h)=>{o+=l.length+$u(h)})),o})(r.mapValue);default:throw ge(13486,{value:r})}}function ey(r,e){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${e.path.canonicalString()}`}}function Gd(r){return!!r&&"integerValue"in r}function Ef(r){return!!r&&"arrayValue"in r}function ty(r){return!!r&&"nullValue"in r}function ny(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function qu(r){return!!r&&"mapValue"in r}function gT(r){var t,i;return((i=(((t=r==null?void 0:r.mapValue)==null?void 0:t.fields)||{})[F_])==null?void 0:i.stringValue)===U_}function Ua(r){if(r.geoPointValue)return{geoPointValue:{...r.geoPointValue}};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:{...r.timestampValue}};if(r.mapValue){const e={mapValue:{fields:{}}};return Ds(r.mapValue.fields,((t,i)=>e.mapValue.fields[t]=Ua(i))),e}if(r.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(r.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Ua(r.arrayValue.values[t]);return e}return{...r}}function yT(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue===mT}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nn{constructor(e){this.value=e}static empty(){return new nn({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let i=0;i<e.length-1;++i)if(t=(t.mapValue.fields||{})[e.get(i)],!qu(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ua(t)}setAll(e){let t=bt.emptyPath(),i={},o=[];e.forEach(((h,p)=>{if(!t.isImmediateParentOf(p)){const g=this.getFieldsMap(t);this.applyChanges(g,i,o),i={},o=[],t=p.popLast()}h?i[p.lastSegment()]=Ua(h):o.push(p.lastSegment())}));const l=this.getFieldsMap(t);this.applyChanges(l,i,o)}delete(e){const t=this.field(e.popLast());qu(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return cr(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let i=0;i<e.length;++i){let o=t.mapValue.fields[e.get(i)];qu(o)&&o.mapValue.fields||(o={mapValue:{fields:{}}},t.mapValue.fields[e.get(i)]=o),t=o}return t.mapValue.fields}applyChanges(e,t,i){Ds(t,((o,l)=>e[o]=l));for(const o of i)delete e[o]}clone(){return new nn(Ua(this.value))}}function z_(r){const e=[];return Ds(r.fields,((t,i)=>{const o=new bt([t]);if(qu(i)){const l=z_(i.mapValue).fields;if(l.length===0)e.push(o);else for(const h of l)e.push(o.child(h))}else e.push(o)})),new mn(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(e,t,i,o,l,h,p){this.key=e,this.documentType=t,this.version=i,this.readTime=o,this.createTime=l,this.data=h,this.documentState=p}static newInvalidDocument(e){return new Bt(e,0,ve.min(),ve.min(),ve.min(),nn.empty(),0)}static newFoundDocument(e,t,i,o){return new Bt(e,1,t,ve.min(),i,o,0)}static newNoDocument(e,t){return new Bt(e,2,t,ve.min(),ve.min(),nn.empty(),0)}static newUnknownDocument(e,t){return new Bt(e,3,t,ve.min(),ve.min(),nn.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(ve.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=nn.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=nn.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ve.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Bt&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Bt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rc{constructor(e,t){this.position=e,this.inclusive=t}}function ry(r,e,t){let i=0;for(let o=0;o<r.position.length;o++){const l=e[o],h=r.position[o];if(l.field.isKeyField()?i=ce.comparator(ce.fromName(h.referenceValue),t.key):i=Ao(h,t.data.field(l.field)),l.dir==="desc"&&(i*=-1),i!==0)break}return i}function sy(r,e){if(r===null)return e===null;if(e===null||r.inclusive!==e.inclusive||r.position.length!==e.position.length)return!1;for(let t=0;t<r.position.length;t++)if(!cr(r.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sc{constructor(e,t="asc"){this.field=e,this.dir=t}}function _T(r,e){return r.dir===e.dir&&r.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B_{}class gt extends B_{constructor(e,t,i){super(),this.field=e,this.op=t,this.value=i}static create(e,t,i){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,i):new ET(e,t,i):t==="array-contains"?new IT(e,i):t==="in"?new ST(e,i):t==="not-in"?new AT(e,i):t==="array-contains-any"?new xT(e,i):new gt(e,t,i)}static createKeyFieldInFilter(e,t,i){return t==="in"?new wT(e,i):new TT(e,i)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Ao(t,this.value)):t!==null&&Rs(this.value)===Rs(t)&&this.matchesComparison(Ao(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return ge(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Un extends B_{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new Un(e,t)}matches(e){return $_(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function $_(r){return r.op==="and"}function q_(r){return vT(r)&&$_(r)}function vT(r){for(const e of r.filters)if(e instanceof Un)return!1;return!0}function Kd(r){if(r instanceof gt)return r.field.canonicalString()+r.op.toString()+xo(r.value);if(q_(r))return r.filters.map((e=>Kd(e))).join(",");{const e=r.filters.map((t=>Kd(t))).join(",");return`${r.op}(${e})`}}function H_(r,e){return r instanceof gt?(function(i,o){return o instanceof gt&&i.op===o.op&&i.field.isEqual(o.field)&&cr(i.value,o.value)})(r,e):r instanceof Un?(function(i,o){return o instanceof Un&&i.op===o.op&&i.filters.length===o.filters.length?i.filters.reduce(((l,h,p)=>l&&H_(h,o.filters[p])),!0):!1})(r,e):void ge(19439)}function W_(r){return r instanceof gt?(function(t){return`${t.field.canonicalString()} ${t.op} ${xo(t.value)}`})(r):r instanceof Un?(function(t){return t.op.toString()+" {"+t.getFilters().map(W_).join(" ,")+"}"})(r):"Filter"}class ET extends gt{constructor(e,t,i){super(e,t,i),this.key=ce.fromName(i.referenceValue)}matches(e){const t=ce.comparator(e.key,this.key);return this.matchesComparison(t)}}class wT extends gt{constructor(e,t){super(e,"in",t),this.keys=G_("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class TT extends gt{constructor(e,t){super(e,"not-in",t),this.keys=G_("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function G_(r,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map((i=>ce.fromName(i.referenceValue)))}class IT extends gt{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Ef(t)&&Qa(t.arrayValue,this.value)}}class ST extends gt{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Qa(this.value.arrayValue,t)}}class AT extends gt{constructor(e,t){super(e,"not-in",t)}matches(e){if(Qa(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Qa(this.value.arrayValue,t)}}class xT extends gt{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Ef(t)||!t.arrayValue.values)&&t.arrayValue.values.some((i=>Qa(this.value.arrayValue,i)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kT{constructor(e,t=null,i=[],o=[],l=null,h=null,p=null){this.path=e,this.collectionGroup=t,this.orderBy=i,this.filters=o,this.limit=l,this.startAt=h,this.endAt=p,this.Te=null}}function iy(r,e=null,t=[],i=[],o=null,l=null,h=null){return new kT(r,e,t,i,o,l,h)}function wf(r){const e=we(r);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((i=>Kd(i))).join(","),t+="|ob:",t+=e.orderBy.map((i=>(function(l){return l.field.canonicalString()+l.dir})(i))).join(","),xc(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((i=>xo(i))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((i=>xo(i))).join(",")),e.Te=t}return e.Te}function Tf(r,e){if(r.limit!==e.limit||r.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<r.orderBy.length;t++)if(!_T(r.orderBy[t],e.orderBy[t]))return!1;if(r.filters.length!==e.filters.length)return!1;for(let t=0;t<r.filters.length;t++)if(!H_(r.filters[t],e.filters[t]))return!1;return r.collectionGroup===e.collectionGroup&&!!r.path.isEqual(e.path)&&!!sy(r.startAt,e.startAt)&&sy(r.endAt,e.endAt)}function Qd(r){return ce.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ol{constructor(e,t=null,i=[],o=[],l=null,h="F",p=null,g=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=i,this.filters=o,this.limit=l,this.limitType=h,this.startAt=p,this.endAt=g,this.Ee=null,this.Ie=null,this.Re=null,this.startAt,this.endAt}}function CT(r,e,t,i,o,l,h,p){return new ol(r,e,t,i,o,l,h,p)}function Cc(r){return new ol(r)}function oy(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function RT(r){return ce.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function K_(r){return r.collectionGroup!==null}function za(r){const e=we(r);if(e.Ee===null){e.Ee=[];const t=new Set;for(const l of e.explicitOrderBy)e.Ee.push(l),t.add(l.field.canonicalString());const i=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(h){let p=new wt(bt.comparator);return h.filters.forEach((g=>{g.getFlattenedFilters().forEach((y=>{y.isInequality()&&(p=p.add(y.field))}))})),p})(e).forEach((l=>{t.has(l.canonicalString())||l.isKeyField()||e.Ee.push(new sc(l,i))})),t.has(bt.keyField().canonicalString())||e.Ee.push(new sc(bt.keyField(),i))}return e.Ee}function or(r){const e=we(r);return e.Ie||(e.Ie=PT(e,za(r))),e.Ie}function PT(r,e){if(r.limitType==="F")return iy(r.path,r.collectionGroup,e,r.filters,r.limit,r.startAt,r.endAt);{e=e.map((o=>{const l=o.dir==="desc"?"asc":"desc";return new sc(o.field,l)}));const t=r.endAt?new rc(r.endAt.position,r.endAt.inclusive):null,i=r.startAt?new rc(r.startAt.position,r.startAt.inclusive):null;return iy(r.path,r.collectionGroup,e,r.filters,r.limit,t,i)}}function Yd(r,e){const t=r.filters.concat([e]);return new ol(r.path,r.collectionGroup,r.explicitOrderBy.slice(),t,r.limit,r.limitType,r.startAt,r.endAt)}function Jd(r,e,t){return new ol(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),e,t,r.startAt,r.endAt)}function Rc(r,e){return Tf(or(r),or(e))&&r.limitType===e.limitType}function Q_(r){return`${wf(or(r))}|lt:${r.limitType}`}function mo(r){return`Query(target=${(function(t){let i=t.path.canonicalString();return t.collectionGroup!==null&&(i+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(i+=`, filters: [${t.filters.map((o=>W_(o))).join(", ")}]`),xc(t.limit)||(i+=", limit: "+t.limit),t.orderBy.length>0&&(i+=`, orderBy: [${t.orderBy.map((o=>(function(h){return`${h.field.canonicalString()} (${h.dir})`})(o))).join(", ")}]`),t.startAt&&(i+=", startAt: ",i+=t.startAt.inclusive?"b:":"a:",i+=t.startAt.position.map((o=>xo(o))).join(",")),t.endAt&&(i+=", endAt: ",i+=t.endAt.inclusive?"a:":"b:",i+=t.endAt.position.map((o=>xo(o))).join(",")),`Target(${i})`})(or(r))}; limitType=${r.limitType})`}function Pc(r,e){return e.isFoundDocument()&&(function(i,o){const l=o.key.path;return i.collectionGroup!==null?o.key.hasCollectionId(i.collectionGroup)&&i.path.isPrefixOf(l):ce.isDocumentKey(i.path)?i.path.isEqual(l):i.path.isImmediateParentOf(l)})(r,e)&&(function(i,o){for(const l of za(i))if(!l.field.isKeyField()&&o.data.field(l.field)===null)return!1;return!0})(r,e)&&(function(i,o){for(const l of i.filters)if(!l.matches(o))return!1;return!0})(r,e)&&(function(i,o){return!(i.startAt&&!(function(h,p,g){const y=ry(h,p,g);return h.inclusive?y<=0:y<0})(i.startAt,za(i),o)||i.endAt&&!(function(h,p,g){const y=ry(h,p,g);return h.inclusive?y>=0:y>0})(i.endAt,za(i),o))})(r,e)}function NT(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function Y_(r){return(e,t)=>{let i=!1;for(const o of za(r)){const l=bT(o,e,t);if(l!==0)return l;i=i||o.field.isKeyField()}return 0}}function bT(r,e,t){const i=r.field.isKeyField()?ce.comparator(e.key,t.key):(function(l,h,p){const g=h.data.field(l),y=p.data.field(l);return g!==null&&y!==null?Ao(g,y):ge(42886)})(r.field,e,t);switch(r.dir){case"asc":return i;case"desc":return-1*i;default:return ge(19790,{direction:r.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ti{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),i=this.inner[t];if(i!==void 0){for(const[o,l]of i)if(this.equalsFn(o,e))return l}}has(e){return this.get(e)!==void 0}set(e,t){const i=this.mapKeyFn(e),o=this.inner[i];if(o===void 0)return this.inner[i]=[[e,t]],void this.innerSize++;for(let l=0;l<o.length;l++)if(this.equalsFn(o[l][0],e))return void(o[l]=[e,t]);o.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),i=this.inner[t];if(i===void 0)return!1;for(let o=0;o<i.length;o++)if(this.equalsFn(i[o][0],e))return i.length===1?delete this.inner[t]:i.splice(o,1),this.innerSize--,!0;return!1}forEach(e){Ds(this.inner,((t,i)=>{for(const[o,l]of i)e(o,l)}))}isEmpty(){return D_(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DT=new nt(ce.comparator);function Lr(){return DT}const J_=new nt(ce.comparator);function La(...r){let e=J_;for(const t of r)e=e.insert(t.key,t);return e}function X_(r){let e=J_;return r.forEach(((t,i)=>e=e.insert(t,i.overlayedDocument))),e}function ci(){return Ba()}function Z_(){return Ba()}function Ba(){return new Ti((r=>r.toString()),((r,e)=>r.isEqual(e)))}const VT=new nt(ce.comparator),OT=new wt(ce.comparator);function Ne(...r){let e=OT;for(const t of r)e=e.add(t);return e}const MT=new wt(Pe);function LT(){return MT}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function If(r,e){if(r.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ec(e)?"-0":e}}function ev(r){return{integerValue:""+r}}function jT(r,e){return uT(e)?ev(e):If(r,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nc{constructor(){this._=void 0}}function FT(r,e,t){return r instanceof Ya?(function(o,l){const h={fields:{[M_]:{stringValue:O_},[j_]:{timestampValue:{seconds:o.seconds,nanos:o.nanoseconds}}}};return l&&vf(l)&&(l=kc(l)),l&&(h.fields[L_]=l),{mapValue:h}})(t,e):r instanceof Ja?nv(r,e):r instanceof Xa?rv(r,e):(function(o,l){const h=tv(o,l),p=ay(h)+ay(o.Ae);return Gd(h)&&Gd(o.Ae)?ev(p):If(o.serializer,p)})(r,e)}function UT(r,e,t){return r instanceof Ja?nv(r,e):r instanceof Xa?rv(r,e):t}function tv(r,e){return r instanceof ic?(function(i){return Gd(i)||(function(l){return!!l&&"doubleValue"in l})(i)})(e)?e:{integerValue:0}:null}class Ya extends Nc{}class Ja extends Nc{constructor(e){super(),this.elements=e}}function nv(r,e){const t=sv(e);for(const i of r.elements)t.some((o=>cr(o,i)))||t.push(i);return{arrayValue:{values:t}}}class Xa extends Nc{constructor(e){super(),this.elements=e}}function rv(r,e){let t=sv(e);for(const i of r.elements)t=t.filter((o=>!cr(o,i)));return{arrayValue:{values:t}}}class ic extends Nc{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function ay(r){return ut(r.integerValue||r.doubleValue)}function sv(r){return Ef(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zT{constructor(e,t){this.field=e,this.transform=t}}function BT(r,e){return r.field.isEqual(e.field)&&(function(i,o){return i instanceof Ja&&o instanceof Ja||i instanceof Xa&&o instanceof Xa?So(i.elements,o.elements,cr):i instanceof ic&&o instanceof ic?cr(i.Ae,o.Ae):i instanceof Ya&&o instanceof Ya})(r.transform,e.transform)}class $T{constructor(e,t){this.version=e,this.transformResults=t}}class Kt{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Kt}static exists(e){return new Kt(void 0,e)}static updateTime(e){return new Kt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Hu(r,e){return r.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(r.updateTime):r.exists===void 0||r.exists===e.isFoundDocument()}class bc{}function iv(r,e){if(!r.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return r.isNoDocument()?new Dc(r.key,Kt.none()):new al(r.key,r.data,Kt.none());{const t=r.data,i=nn.empty();let o=new wt(bt.comparator);for(let l of e.fields)if(!o.has(l)){let h=t.field(l);h===null&&l.length>1&&(l=l.popLast(),h=t.field(l)),h===null?i.delete(l):i.set(l,h),o=o.add(l)}return new Vs(r.key,i,new mn(o.toArray()),Kt.none())}}function qT(r,e,t){r instanceof al?(function(o,l,h){const p=o.value.clone(),g=uy(o.fieldTransforms,l,h.transformResults);p.setAll(g),l.convertToFoundDocument(h.version,p).setHasCommittedMutations()})(r,e,t):r instanceof Vs?(function(o,l,h){if(!Hu(o.precondition,l))return void l.convertToUnknownDocument(h.version);const p=uy(o.fieldTransforms,l,h.transformResults),g=l.data;g.setAll(ov(o)),g.setAll(p),l.convertToFoundDocument(h.version,g).setHasCommittedMutations()})(r,e,t):(function(o,l,h){l.convertToNoDocument(h.version).setHasCommittedMutations()})(0,e,t)}function $a(r,e,t,i){return r instanceof al?(function(l,h,p,g){if(!Hu(l.precondition,h))return p;const y=l.value.clone(),E=cy(l.fieldTransforms,g,h);return y.setAll(E),h.convertToFoundDocument(h.version,y).setHasLocalMutations(),null})(r,e,t,i):r instanceof Vs?(function(l,h,p,g){if(!Hu(l.precondition,h))return p;const y=cy(l.fieldTransforms,g,h),E=h.data;return E.setAll(ov(l)),E.setAll(y),h.convertToFoundDocument(h.version,E).setHasLocalMutations(),p===null?null:p.unionWith(l.fieldMask.fields).unionWith(l.fieldTransforms.map((I=>I.field)))})(r,e,t,i):(function(l,h,p){return Hu(l.precondition,h)?(h.convertToNoDocument(h.version).setHasLocalMutations(),null):p})(r,e,t)}function HT(r,e){let t=null;for(const i of r.fieldTransforms){const o=e.data.field(i.field),l=tv(i.transform,o||null);l!=null&&(t===null&&(t=nn.empty()),t.set(i.field,l))}return t||null}function ly(r,e){return r.type===e.type&&!!r.key.isEqual(e.key)&&!!r.precondition.isEqual(e.precondition)&&!!(function(i,o){return i===void 0&&o===void 0||!(!i||!o)&&So(i,o,((l,h)=>BT(l,h)))})(r.fieldTransforms,e.fieldTransforms)&&(r.type===0?r.value.isEqual(e.value):r.type!==1||r.data.isEqual(e.data)&&r.fieldMask.isEqual(e.fieldMask))}class al extends bc{constructor(e,t,i,o=[]){super(),this.key=e,this.value=t,this.precondition=i,this.fieldTransforms=o,this.type=0}getFieldMask(){return null}}class Vs extends bc{constructor(e,t,i,o,l=[]){super(),this.key=e,this.data=t,this.fieldMask=i,this.precondition=o,this.fieldTransforms=l,this.type=1}getFieldMask(){return this.fieldMask}}function ov(r){const e=new Map;return r.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const i=r.data.field(t);e.set(t,i)}})),e}function uy(r,e,t){const i=new Map;ze(r.length===t.length,32656,{Ve:t.length,de:r.length});for(let o=0;o<t.length;o++){const l=r[o],h=l.transform,p=e.data.field(l.field);i.set(l.field,UT(h,p,t[o]))}return i}function cy(r,e,t){const i=new Map;for(const o of r){const l=o.transform,h=t.data.field(o.field);i.set(o.field,FT(l,h,e))}return i}class Dc extends bc{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class WT extends bc{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GT{constructor(e,t,i,o){this.batchId=e,this.localWriteTime=t,this.baseMutations=i,this.mutations=o}applyToRemoteDocument(e,t){const i=t.mutationResults;for(let o=0;o<this.mutations.length;o++){const l=this.mutations[o];l.key.isEqual(e.key)&&qT(l,e,i[o])}}applyToLocalView(e,t){for(const i of this.baseMutations)i.key.isEqual(e.key)&&(t=$a(i,e,t,this.localWriteTime));for(const i of this.mutations)i.key.isEqual(e.key)&&(t=$a(i,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const i=Z_();return this.mutations.forEach((o=>{const l=e.get(o.key),h=l.overlayedDocument;let p=this.applyToLocalView(h,l.mutatedFields);p=t.has(o.key)?null:p;const g=iv(h,p);g!==null&&i.set(o.key,g),h.isValidDocument()||h.convertToNoDocument(ve.min())})),i}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),Ne())}isEqual(e){return this.batchId===e.batchId&&So(this.mutations,e.mutations,((t,i)=>ly(t,i)))&&So(this.baseMutations,e.baseMutations,((t,i)=>ly(t,i)))}}class Sf{constructor(e,t,i,o){this.batch=e,this.commitVersion=t,this.mutationResults=i,this.docVersions=o}static from(e,t,i){ze(e.mutations.length===i.length,58842,{me:e.mutations.length,fe:i.length});let o=(function(){return VT})();const l=e.mutations;for(let h=0;h<l.length;h++)o=o.insert(l[h].key,i[h].version);return new Sf(e,t,i,o)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KT{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QT{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var mt,De;function YT(r){switch(r){case H.OK:return ge(64938);case H.CANCELLED:case H.UNKNOWN:case H.DEADLINE_EXCEEDED:case H.RESOURCE_EXHAUSTED:case H.INTERNAL:case H.UNAVAILABLE:case H.UNAUTHENTICATED:return!1;case H.INVALID_ARGUMENT:case H.NOT_FOUND:case H.ALREADY_EXISTS:case H.PERMISSION_DENIED:case H.FAILED_PRECONDITION:case H.ABORTED:case H.OUT_OF_RANGE:case H.UNIMPLEMENTED:case H.DATA_LOSS:return!0;default:return ge(15467,{code:r})}}function av(r){if(r===void 0)return Mr("GRPC error has no .code"),H.UNKNOWN;switch(r){case mt.OK:return H.OK;case mt.CANCELLED:return H.CANCELLED;case mt.UNKNOWN:return H.UNKNOWN;case mt.DEADLINE_EXCEEDED:return H.DEADLINE_EXCEEDED;case mt.RESOURCE_EXHAUSTED:return H.RESOURCE_EXHAUSTED;case mt.INTERNAL:return H.INTERNAL;case mt.UNAVAILABLE:return H.UNAVAILABLE;case mt.UNAUTHENTICATED:return H.UNAUTHENTICATED;case mt.INVALID_ARGUMENT:return H.INVALID_ARGUMENT;case mt.NOT_FOUND:return H.NOT_FOUND;case mt.ALREADY_EXISTS:return H.ALREADY_EXISTS;case mt.PERMISSION_DENIED:return H.PERMISSION_DENIED;case mt.FAILED_PRECONDITION:return H.FAILED_PRECONDITION;case mt.ABORTED:return H.ABORTED;case mt.OUT_OF_RANGE:return H.OUT_OF_RANGE;case mt.UNIMPLEMENTED:return H.UNIMPLEMENTED;case mt.DATA_LOSS:return H.DATA_LOSS;default:return ge(39323,{code:r})}}(De=mt||(mt={}))[De.OK=0]="OK",De[De.CANCELLED=1]="CANCELLED",De[De.UNKNOWN=2]="UNKNOWN",De[De.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",De[De.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",De[De.NOT_FOUND=5]="NOT_FOUND",De[De.ALREADY_EXISTS=6]="ALREADY_EXISTS",De[De.PERMISSION_DENIED=7]="PERMISSION_DENIED",De[De.UNAUTHENTICATED=16]="UNAUTHENTICATED",De[De.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",De[De.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",De[De.ABORTED=10]="ABORTED",De[De.OUT_OF_RANGE=11]="OUT_OF_RANGE",De[De.UNIMPLEMENTED=12]="UNIMPLEMENTED",De[De.INTERNAL=13]="INTERNAL",De[De.UNAVAILABLE=14]="UNAVAILABLE",De[De.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function JT(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XT=new Ss([4294967295,4294967295],0);function hy(r){const e=JT().encode(r),t=new T_;return t.update(e),new Uint8Array(t.digest())}function dy(r){const e=new DataView(r.buffer),t=e.getUint32(0,!0),i=e.getUint32(4,!0),o=e.getUint32(8,!0),l=e.getUint32(12,!0);return[new Ss([t,i],0),new Ss([o,l],0)]}class Af{constructor(e,t,i){if(this.bitmap=e,this.padding=t,this.hashCount=i,t<0||t>=8)throw new ja(`Invalid padding: ${t}`);if(i<0)throw new ja(`Invalid hash count: ${i}`);if(e.length>0&&this.hashCount===0)throw new ja(`Invalid hash count: ${i}`);if(e.length===0&&t!==0)throw new ja(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=Ss.fromNumber(this.ge)}ye(e,t,i){let o=e.add(t.multiply(Ss.fromNumber(i)));return o.compare(XT)===1&&(o=new Ss([o.getBits(0),o.getBits(1)],0)),o.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=hy(e),[i,o]=dy(t);for(let l=0;l<this.hashCount;l++){const h=this.ye(i,o,l);if(!this.we(h))return!1}return!0}static create(e,t,i){const o=e%8==0?0:8-e%8,l=new Uint8Array(Math.ceil(e/8)),h=new Af(l,o,t);return i.forEach((p=>h.insert(p))),h}insert(e){if(this.ge===0)return;const t=hy(e),[i,o]=dy(t);for(let l=0;l<this.hashCount;l++){const h=this.ye(i,o,l);this.Se(h)}}Se(e){const t=Math.floor(e/8),i=e%8;this.bitmap[t]|=1<<i}}class ja extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vc{constructor(e,t,i,o,l){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=i,this.documentUpdates=o,this.resolvedLimboDocuments=l}static createSynthesizedRemoteEventForCurrentChange(e,t,i){const o=new Map;return o.set(e,ll.createSynthesizedTargetChangeForCurrentChange(e,t,i)),new Vc(ve.min(),o,new nt(Pe),Lr(),Ne())}}class ll{constructor(e,t,i,o,l){this.resumeToken=e,this.current=t,this.addedDocuments=i,this.modifiedDocuments=o,this.removedDocuments=l}static createSynthesizedTargetChangeForCurrentChange(e,t,i){return new ll(i,t,Ne(),Ne(),Ne())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wu{constructor(e,t,i,o){this.be=e,this.removedTargetIds=t,this.key=i,this.De=o}}class lv{constructor(e,t){this.targetId=e,this.Ce=t}}class uv{constructor(e,t,i=Dt.EMPTY_BYTE_STRING,o=null){this.state=e,this.targetIds=t,this.resumeToken=i,this.cause=o}}class fy{constructor(){this.ve=0,this.Fe=py(),this.Me=Dt.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=Ne(),t=Ne(),i=Ne();return this.Fe.forEach(((o,l)=>{switch(l){case 0:e=e.add(o);break;case 2:t=t.add(o);break;case 1:i=i.add(o);break;default:ge(38017,{changeType:l})}})),new ll(this.Me,this.xe,e,t,i)}qe(){this.Oe=!1,this.Fe=py()}Ke(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,ze(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class ZT{constructor(e){this.Ge=e,this.ze=new Map,this.je=Lr(),this.Je=Fu(),this.He=Fu(),this.Ze=new nt(Pe)}Xe(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{const i=this.nt(t);switch(e.state){case 0:this.rt(t)&&i.Le(e.resumeToken);break;case 1:i.We(),i.Ne||i.qe(),i.Le(e.resumeToken);break;case 2:i.We(),i.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(i.Qe(),i.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),i.Le(e.resumeToken));break;default:ge(56790,{state:e.state})}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((i,o)=>{this.rt(o)&&t(o)}))}st(e){const t=e.targetId,i=e.Ce.count,o=this.ot(t);if(o){const l=o.target;if(Qd(l))if(i===0){const h=new ce(l.path);this.et(t,h,Bt.newNoDocument(h,ve.min()))}else ze(i===1,20013,{expectedCount:i});else{const h=this._t(t);if(h!==i){const p=this.ut(e),g=p?this.ct(p,e,h):1;if(g!==0){this.it(t);const y=g===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,y)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:i="",padding:o=0},hashCount:l=0}=t;let h,p;try{h=Cs(i).toUint8Array()}catch(g){if(g instanceof V_)return vi("Decoding the base64 bloom filter in existence filter failed ("+g.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw g}try{p=new Af(h,o,l)}catch(g){return vi(g instanceof ja?"BloomFilter error: ":"Applying bloom filter failed: ",g),null}return p.ge===0?null:p}ct(e,t,i){return t.Ce.count===i-this.Pt(e,t.targetId)?0:2}Pt(e,t){const i=this.Ge.getRemoteKeysForTarget(t);let o=0;return i.forEach((l=>{const h=this.Ge.ht(),p=`projects/${h.projectId}/databases/${h.database}/documents/${l.path.canonicalString()}`;e.mightContain(p)||(this.et(t,l,null),o++)})),o}Tt(e){const t=new Map;this.ze.forEach(((l,h)=>{const p=this.ot(h);if(p){if(l.current&&Qd(p.target)){const g=new ce(p.target.path);this.Et(g).has(h)||this.It(h,g)||this.et(h,g,Bt.newNoDocument(g,e))}l.Be&&(t.set(h,l.ke()),l.qe())}}));let i=Ne();this.He.forEach(((l,h)=>{let p=!0;h.forEachWhile((g=>{const y=this.ot(g);return!y||y.purpose==="TargetPurposeLimboResolution"||(p=!1,!1)})),p&&(i=i.add(l))})),this.je.forEach(((l,h)=>h.setReadTime(e)));const o=new Vc(e,t,this.Ze,this.je,i);return this.je=Lr(),this.Je=Fu(),this.He=Fu(),this.Ze=new nt(Pe),o}Ye(e,t){if(!this.rt(e))return;const i=this.It(e,t.key)?2:0;this.nt(e).Ke(t.key,i),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.Et(t.key).add(e)),this.He=this.He.insert(t.key,this.Rt(t.key).add(e))}et(e,t,i){if(!this.rt(e))return;const o=this.nt(e);this.It(e,t)?o.Ke(t,1):o.Ue(t),this.He=this.He.insert(t,this.Rt(t).delete(e)),this.He=this.He.insert(t,this.Rt(t).add(e)),i&&(this.je=this.je.insert(t,i))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new fy,this.ze.set(e,t)),t}Rt(e){let t=this.He.get(e);return t||(t=new wt(Pe),this.He=this.He.insert(e,t)),t}Et(e){let t=this.Je.get(e);return t||(t=new wt(Pe),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||re("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new fy),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}It(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function Fu(){return new nt(ce.comparator)}function py(){return new nt(ce.comparator)}const eI={asc:"ASCENDING",desc:"DESCENDING"},tI={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},nI={and:"AND",or:"OR"};class rI{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Xd(r,e){return r.useProto3Json||xc(e)?e:{value:e}}function oc(r,e){return r.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function cv(r,e){return r.useProto3Json?e.toBase64():e.toUint8Array()}function sI(r,e){return oc(r,e.toTimestamp())}function ar(r){return ze(!!r,49232),ve.fromTimestamp((function(t){const i=ks(t);return new Je(i.seconds,i.nanos)})(r))}function xf(r,e){return Zd(r,e).canonicalString()}function Zd(r,e){const t=(function(o){return new Ge(["projects",o.projectId,"databases",o.database])})(r).child("documents");return e===void 0?t:t.child(e)}function hv(r){const e=Ge.fromString(r);return ze(gv(e),10190,{key:e.toString()}),e}function ef(r,e){return xf(r.databaseId,e.path)}function Rd(r,e){const t=hv(e);if(t.get(1)!==r.databaseId.projectId)throw new te(H.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+r.databaseId.projectId);if(t.get(3)!==r.databaseId.database)throw new te(H.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+r.databaseId.database);return new ce(fv(t))}function dv(r,e){return xf(r.databaseId,e)}function iI(r){const e=hv(r);return e.length===4?Ge.emptyPath():fv(e)}function tf(r){return new Ge(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function fv(r){return ze(r.length>4&&r.get(4)==="documents",29091,{key:r.toString()}),r.popFirst(5)}function my(r,e,t){return{name:ef(r,e),fields:t.value.mapValue.fields}}function oI(r,e){let t;if("targetChange"in e){e.targetChange;const i=(function(y){return y==="NO_CHANGE"?0:y==="ADD"?1:y==="REMOVE"?2:y==="CURRENT"?3:y==="RESET"?4:ge(39313,{state:y})})(e.targetChange.targetChangeType||"NO_CHANGE"),o=e.targetChange.targetIds||[],l=(function(y,E){return y.useProto3Json?(ze(E===void 0||typeof E=="string",58123),Dt.fromBase64String(E||"")):(ze(E===void 0||E instanceof Buffer||E instanceof Uint8Array,16193),Dt.fromUint8Array(E||new Uint8Array))})(r,e.targetChange.resumeToken),h=e.targetChange.cause,p=h&&(function(y){const E=y.code===void 0?H.UNKNOWN:av(y.code);return new te(E,y.message||"")})(h);t=new uv(i,o,l,p||null)}else if("documentChange"in e){e.documentChange;const i=e.documentChange;i.document,i.document.name,i.document.updateTime;const o=Rd(r,i.document.name),l=ar(i.document.updateTime),h=i.document.createTime?ar(i.document.createTime):ve.min(),p=new nn({mapValue:{fields:i.document.fields}}),g=Bt.newFoundDocument(o,l,h,p),y=i.targetIds||[],E=i.removedTargetIds||[];t=new Wu(y,E,g.key,g)}else if("documentDelete"in e){e.documentDelete;const i=e.documentDelete;i.document;const o=Rd(r,i.document),l=i.readTime?ar(i.readTime):ve.min(),h=Bt.newNoDocument(o,l),p=i.removedTargetIds||[];t=new Wu([],p,h.key,h)}else if("documentRemove"in e){e.documentRemove;const i=e.documentRemove;i.document;const o=Rd(r,i.document),l=i.removedTargetIds||[];t=new Wu([],l,o,null)}else{if(!("filter"in e))return ge(11601,{Vt:e});{e.filter;const i=e.filter;i.targetId;const{count:o=0,unchangedNames:l}=i,h=new QT(o,l),p=i.targetId;t=new lv(p,h)}}return t}function aI(r,e){let t;if(e instanceof al)t={update:my(r,e.key,e.value)};else if(e instanceof Dc)t={delete:ef(r,e.key)};else if(e instanceof Vs)t={update:my(r,e.key,e.data),updateMask:gI(e.fieldMask)};else{if(!(e instanceof WT))return ge(16599,{dt:e.type});t={verify:ef(r,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((i=>(function(l,h){const p=h.transform;if(p instanceof Ya)return{fieldPath:h.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(p instanceof Ja)return{fieldPath:h.field.canonicalString(),appendMissingElements:{values:p.elements}};if(p instanceof Xa)return{fieldPath:h.field.canonicalString(),removeAllFromArray:{values:p.elements}};if(p instanceof ic)return{fieldPath:h.field.canonicalString(),increment:p.Ae};throw ge(20930,{transform:h.transform})})(0,i)))),e.precondition.isNone||(t.currentDocument=(function(o,l){return l.updateTime!==void 0?{updateTime:sI(o,l.updateTime)}:l.exists!==void 0?{exists:l.exists}:ge(27497)})(r,e.precondition)),t}function lI(r,e){return r&&r.length>0?(ze(e!==void 0,14353),r.map((t=>(function(o,l){let h=o.updateTime?ar(o.updateTime):ar(l);return h.isEqual(ve.min())&&(h=ar(l)),new $T(h,o.transformResults||[])})(t,e)))):[]}function uI(r,e){return{documents:[dv(r,e.path)]}}function cI(r,e){const t={structuredQuery:{}},i=e.path;let o;e.collectionGroup!==null?(o=i,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(o=i.popLast(),t.structuredQuery.from=[{collectionId:i.lastSegment()}]),t.parent=dv(r,o);const l=(function(y){if(y.length!==0)return mv(Un.create(y,"and"))})(e.filters);l&&(t.structuredQuery.where=l);const h=(function(y){if(y.length!==0)return y.map((E=>(function(x){return{field:go(x.field),direction:fI(x.dir)}})(E)))})(e.orderBy);h&&(t.structuredQuery.orderBy=h);const p=Xd(r,e.limit);return p!==null&&(t.structuredQuery.limit=p),e.startAt&&(t.structuredQuery.startAt=(function(y){return{before:y.inclusive,values:y.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(y){return{before:!y.inclusive,values:y.position}})(e.endAt)),{ft:t,parent:o}}function hI(r){let e=iI(r.parent);const t=r.structuredQuery,i=t.from?t.from.length:0;let o=null;if(i>0){ze(i===1,65062);const E=t.from[0];E.allDescendants?o=E.collectionId:e=e.child(E.collectionId)}let l=[];t.where&&(l=(function(I){const x=pv(I);return x instanceof Un&&q_(x)?x.getFilters():[x]})(t.where));let h=[];t.orderBy&&(h=(function(I){return I.map((x=>(function(q){return new sc(yo(q.field),(function(B){switch(B){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(q.direction))})(x)))})(t.orderBy));let p=null;t.limit&&(p=(function(I){let x;return x=typeof I=="object"?I.value:I,xc(x)?null:x})(t.limit));let g=null;t.startAt&&(g=(function(I){const x=!!I.before,O=I.values||[];return new rc(O,x)})(t.startAt));let y=null;return t.endAt&&(y=(function(I){const x=!I.before,O=I.values||[];return new rc(O,x)})(t.endAt)),CT(e,o,h,l,p,"F",g,y)}function dI(r,e){const t=(function(o){switch(o){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return ge(28987,{purpose:o})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function pv(r){return r.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const i=yo(t.unaryFilter.field);return gt.create(i,"==",{doubleValue:NaN});case"IS_NULL":const o=yo(t.unaryFilter.field);return gt.create(o,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const l=yo(t.unaryFilter.field);return gt.create(l,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const h=yo(t.unaryFilter.field);return gt.create(h,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return ge(61313);default:return ge(60726)}})(r):r.fieldFilter!==void 0?(function(t){return gt.create(yo(t.fieldFilter.field),(function(o){switch(o){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return ge(58110);default:return ge(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(r):r.compositeFilter!==void 0?(function(t){return Un.create(t.compositeFilter.filters.map((i=>pv(i))),(function(o){switch(o){case"AND":return"and";case"OR":return"or";default:return ge(1026)}})(t.compositeFilter.op))})(r):ge(30097,{filter:r})}function fI(r){return eI[r]}function pI(r){return tI[r]}function mI(r){return nI[r]}function go(r){return{fieldPath:r.canonicalString()}}function yo(r){return bt.fromServerFormat(r.fieldPath)}function mv(r){return r instanceof gt?(function(t){if(t.op==="=="){if(ny(t.value))return{unaryFilter:{field:go(t.field),op:"IS_NAN"}};if(ty(t.value))return{unaryFilter:{field:go(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(ny(t.value))return{unaryFilter:{field:go(t.field),op:"IS_NOT_NAN"}};if(ty(t.value))return{unaryFilter:{field:go(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:go(t.field),op:pI(t.op),value:t.value}}})(r):r instanceof Un?(function(t){const i=t.getFilters().map((o=>mv(o)));return i.length===1?i[0]:{compositeFilter:{op:mI(t.op),filters:i}}})(r):ge(54877,{filter:r})}function gI(r){const e=[];return r.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function gv(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}function yv(r){return!!r&&typeof r._toProto=="function"&&r._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Es{constructor(e,t,i,o,l=ve.min(),h=ve.min(),p=Dt.EMPTY_BYTE_STRING,g=null){this.target=e,this.targetId=t,this.purpose=i,this.sequenceNumber=o,this.snapshotVersion=l,this.lastLimboFreeSnapshotVersion=h,this.resumeToken=p,this.expectedCount=g}withSequenceNumber(e){return new Es(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Es(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Es(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Es(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yI{constructor(e){this.yt=e}}function _I(r){const e=hI({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?Jd(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vI{constructor(){this.bn=new EI}addToCollectionParentIndex(e,t){return this.bn.add(t),W.resolve()}getCollectionParents(e,t){return W.resolve(this.bn.getEntries(t))}addFieldIndex(e,t){return W.resolve()}deleteFieldIndex(e,t){return W.resolve()}deleteAllFieldIndexes(e){return W.resolve()}createTargetIndexes(e,t){return W.resolve()}getDocumentsMatchingTarget(e,t){return W.resolve(null)}getIndexType(e,t){return W.resolve(0)}getFieldIndexes(e,t){return W.resolve([])}getNextCollectionGroupToUpdate(e){return W.resolve(null)}getMinOffset(e,t){return W.resolve(xs.min())}getMinOffsetFromCollectionGroup(e,t){return W.resolve(xs.min())}updateCollectionGroup(e,t,i){return W.resolve()}updateIndexEntries(e,t){return W.resolve()}}class EI{constructor(){this.index={}}add(e){const t=e.lastSegment(),i=e.popLast(),o=this.index[t]||new wt(Ge.comparator),l=!o.has(i);return this.index[t]=o.add(i),l}has(e){const t=e.lastSegment(),i=e.popLast(),o=this.index[t];return o&&o.has(i)}getEntries(e){return(this.index[e]||new wt(Ge.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gy={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},_v=41943040;class tn{static withCacheSize(e){return new tn(e,tn.DEFAULT_COLLECTION_PERCENTILE,tn.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,i){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */tn.DEFAULT_COLLECTION_PERCENTILE=10,tn.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,tn.DEFAULT=new tn(_v,tn.DEFAULT_COLLECTION_PERCENTILE,tn.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),tn.DISABLED=new tn(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ko{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new ko(0)}static ar(){return new ko(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yy="LruGarbageCollector",wI=1048576;function _y([r,e],[t,i]){const o=Pe(r,t);return o===0?Pe(e,i):o}class TI{constructor(e){this.Pr=e,this.buffer=new wt(_y),this.Tr=0}Er(){return++this.Tr}Ir(e){const t=[e,this.Er()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const i=this.buffer.last();_y(t,i)<0&&(this.buffer=this.buffer.delete(i).add(t))}}get maxValue(){return this.buffer.last()[0]}}class II{constructor(e,t,i){this.garbageCollector=e,this.asyncQueue=t,this.localStore=i,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){re(yy,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Vo(t)?re(yy,"Ignoring IndexedDB error during garbage collection: ",t):await Do(t)}await this.Ar(3e5)}))}}class SI{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next((i=>Math.floor(t/100*i)))}nthSequenceNumber(e,t){if(t===0)return W.resolve(Ac.ce);const i=new TI(t);return this.Vr.forEachTarget(e,(o=>i.Ir(o.sequenceNumber))).next((()=>this.Vr.mr(e,(o=>i.Ir(o))))).next((()=>i.maxValue))}removeTargets(e,t,i){return this.Vr.removeTargets(e,t,i)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(re("LruGarbageCollector","Garbage collection skipped; disabled"),W.resolve(gy)):this.getCacheSize(e).next((i=>i<this.params.cacheSizeCollectionThreshold?(re("LruGarbageCollector",`Garbage collection skipped; Cache size ${i} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),gy):this.gr(e,t)))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let i,o,l,h,p,g,y;const E=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((I=>(I>this.params.maximumSequenceNumbersToCollect?(re("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${I}`),o=this.params.maximumSequenceNumbersToCollect):o=I,h=Date.now(),this.nthSequenceNumber(e,o)))).next((I=>(i=I,p=Date.now(),this.removeTargets(e,i,t)))).next((I=>(l=I,g=Date.now(),this.removeOrphanedDocuments(e,i)))).next((I=>(y=Date.now(),po()<=Re.DEBUG&&re("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${h-E}ms
	Determined least recently used ${o} in `+(p-h)+`ms
	Removed ${l} targets in `+(g-p)+`ms
	Removed ${I} documents in `+(y-g)+`ms
Total Duration: ${y-E}ms`),W.resolve({didRun:!0,sequenceNumbersCollected:o,targetsRemoved:l,documentsRemoved:I}))))}}function AI(r,e){return new SI(r,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xI{constructor(){this.changes=new Ti((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Bt.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const i=this.changes.get(t);return i!==void 0?W.resolve(i):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kI{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CI{constructor(e,t,i,o){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=i,this.indexManager=o}getDocument(e,t){let i=null;return this.documentOverlayCache.getOverlay(e,t).next((o=>(i=o,this.remoteDocumentCache.getEntry(e,t)))).next((o=>(i!==null&&$a(i.mutation,o,mn.empty(),Je.now()),o)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((i=>this.getLocalViewOfDocuments(e,i,Ne()).next((()=>i))))}getLocalViewOfDocuments(e,t,i=Ne()){const o=ci();return this.populateOverlays(e,o,t).next((()=>this.computeViews(e,t,o,i).next((l=>{let h=La();return l.forEach(((p,g)=>{h=h.insert(p,g.overlayedDocument)})),h}))))}getOverlayedDocuments(e,t){const i=ci();return this.populateOverlays(e,i,t).next((()=>this.computeViews(e,t,i,Ne())))}populateOverlays(e,t,i){const o=[];return i.forEach((l=>{t.has(l)||o.push(l)})),this.documentOverlayCache.getOverlays(e,o).next((l=>{l.forEach(((h,p)=>{t.set(h,p)}))}))}computeViews(e,t,i,o){let l=Lr();const h=Ba(),p=(function(){return Ba()})();return t.forEach(((g,y)=>{const E=i.get(y.key);o.has(y.key)&&(E===void 0||E.mutation instanceof Vs)?l=l.insert(y.key,y):E!==void 0?(h.set(y.key,E.mutation.getFieldMask()),$a(E.mutation,y,E.mutation.getFieldMask(),Je.now())):h.set(y.key,mn.empty())})),this.recalculateAndSaveOverlays(e,l).next((g=>(g.forEach(((y,E)=>h.set(y,E))),t.forEach(((y,E)=>p.set(y,new kI(E,h.get(y)??null)))),p)))}recalculateAndSaveOverlays(e,t){const i=Ba();let o=new nt(((h,p)=>h-p)),l=Ne();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((h=>{for(const p of h)p.keys().forEach((g=>{const y=t.get(g);if(y===null)return;let E=i.get(g)||mn.empty();E=p.applyToLocalView(y,E),i.set(g,E);const I=(o.get(p.batchId)||Ne()).add(g);o=o.insert(p.batchId,I)}))})).next((()=>{const h=[],p=o.getReverseIterator();for(;p.hasNext();){const g=p.getNext(),y=g.key,E=g.value,I=Z_();E.forEach((x=>{if(!l.has(x)){const O=iv(t.get(x),i.get(x));O!==null&&I.set(x,O),l=l.add(x)}})),h.push(this.documentOverlayCache.saveOverlays(e,y,I))}return W.waitFor(h)})).next((()=>i))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((i=>this.recalculateAndSaveOverlays(e,i)))}getDocumentsMatchingQuery(e,t,i,o){return RT(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):K_(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,i,o):this.getDocumentsMatchingCollectionQuery(e,t,i,o)}getNextDocuments(e,t,i,o){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,i,o).next((l=>{const h=o-l.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,i.largestBatchId,o-l.size):W.resolve(ci());let p=Wa,g=l;return h.next((y=>W.forEach(y,((E,I)=>(p<I.largestBatchId&&(p=I.largestBatchId),l.get(E)?W.resolve():this.remoteDocumentCache.getEntry(e,E).next((x=>{g=g.insert(E,x)}))))).next((()=>this.populateOverlays(e,y,l))).next((()=>this.computeViews(e,g,y,Ne()))).next((E=>({batchId:p,changes:X_(E)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new ce(t)).next((i=>{let o=La();return i.isFoundDocument()&&(o=o.insert(i.key,i)),o}))}getDocumentsMatchingCollectionGroupQuery(e,t,i,o){const l=t.collectionGroup;let h=La();return this.indexManager.getCollectionParents(e,l).next((p=>W.forEach(p,(g=>{const y=(function(I,x){return new ol(x,null,I.explicitOrderBy.slice(),I.filters.slice(),I.limit,I.limitType,I.startAt,I.endAt)})(t,g.child(l));return this.getDocumentsMatchingCollectionQuery(e,y,i,o).next((E=>{E.forEach(((I,x)=>{h=h.insert(I,x)}))}))})).next((()=>h))))}getDocumentsMatchingCollectionQuery(e,t,i,o){let l;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,i.largestBatchId).next((h=>(l=h,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,i,l,o)))).next((h=>{l.forEach(((g,y)=>{const E=y.getKey();h.get(E)===null&&(h=h.insert(E,Bt.newInvalidDocument(E)))}));let p=La();return h.forEach(((g,y)=>{const E=l.get(g);E!==void 0&&$a(E.mutation,y,mn.empty(),Je.now()),Pc(t,y)&&(p=p.insert(g,y))})),p}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RI{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return W.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,(function(o){return{id:o.id,version:o.version,createTime:ar(o.createTime)}})(t)),W.resolve()}getNamedQuery(e,t){return W.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,(function(o){return{name:o.name,query:_I(o.bundledQuery),readTime:ar(o.readTime)}})(t)),W.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PI{constructor(){this.overlays=new nt(ce.comparator),this.Lr=new Map}getOverlay(e,t){return W.resolve(this.overlays.get(t))}getOverlays(e,t){const i=ci();return W.forEach(t,(o=>this.getOverlay(e,o).next((l=>{l!==null&&i.set(o,l)})))).next((()=>i))}saveOverlays(e,t,i){return i.forEach(((o,l)=>{this.St(e,t,l)})),W.resolve()}removeOverlaysForBatchId(e,t,i){const o=this.Lr.get(i);return o!==void 0&&(o.forEach((l=>this.overlays=this.overlays.remove(l))),this.Lr.delete(i)),W.resolve()}getOverlaysForCollection(e,t,i){const o=ci(),l=t.length+1,h=new ce(t.child("")),p=this.overlays.getIteratorFrom(h);for(;p.hasNext();){const g=p.getNext().value,y=g.getKey();if(!t.isPrefixOf(y.path))break;y.path.length===l&&g.largestBatchId>i&&o.set(g.getKey(),g)}return W.resolve(o)}getOverlaysForCollectionGroup(e,t,i,o){let l=new nt(((y,E)=>y-E));const h=this.overlays.getIterator();for(;h.hasNext();){const y=h.getNext().value;if(y.getKey().getCollectionGroup()===t&&y.largestBatchId>i){let E=l.get(y.largestBatchId);E===null&&(E=ci(),l=l.insert(y.largestBatchId,E)),E.set(y.getKey(),y)}}const p=ci(),g=l.getIterator();for(;g.hasNext()&&(g.getNext().value.forEach(((y,E)=>p.set(y,E))),!(p.size()>=o)););return W.resolve(p)}St(e,t,i){const o=this.overlays.get(i.key);if(o!==null){const h=this.Lr.get(o.largestBatchId).delete(i.key);this.Lr.set(o.largestBatchId,h)}this.overlays=this.overlays.insert(i.key,new KT(t,i));let l=this.Lr.get(t);l===void 0&&(l=Ne(),this.Lr.set(t,l)),this.Lr.set(t,l.add(i.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NI{constructor(){this.sessionToken=Dt.EMPTY_BYTE_STRING}getSessionToken(e){return W.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,W.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kf{constructor(){this.kr=new wt(xt.qr),this.Kr=new wt(xt.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const i=new xt(e,t);this.kr=this.kr.add(i),this.Kr=this.Kr.add(i)}$r(e,t){e.forEach((i=>this.addReference(i,t)))}removeReference(e,t){this.Wr(new xt(e,t))}Qr(e,t){e.forEach((i=>this.removeReference(i,t)))}Gr(e){const t=new ce(new Ge([])),i=new xt(t,e),o=new xt(t,e+1),l=[];return this.Kr.forEachInRange([i,o],(h=>{this.Wr(h),l.push(h.key)})),l}zr(){this.kr.forEach((e=>this.Wr(e)))}Wr(e){this.kr=this.kr.delete(e),this.Kr=this.Kr.delete(e)}jr(e){const t=new ce(new Ge([])),i=new xt(t,e),o=new xt(t,e+1);let l=Ne();return this.Kr.forEachInRange([i,o],(h=>{l=l.add(h.key)})),l}containsKey(e){const t=new xt(e,0),i=this.kr.firstAfterOrEqual(t);return i!==null&&e.isEqual(i.key)}}class xt{constructor(e,t){this.key=e,this.Jr=t}static qr(e,t){return ce.comparator(e.key,t.key)||Pe(e.Jr,t.Jr)}static Ur(e,t){return Pe(e.Jr,t.Jr)||ce.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bI{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Hr=new wt(xt.qr)}checkEmpty(e){return W.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,i,o){const l=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const h=new GT(l,t,i,o);this.mutationQueue.push(h);for(const p of o)this.Hr=this.Hr.add(new xt(p.key,l)),this.indexManager.addToCollectionParentIndex(e,p.key.path.popLast());return W.resolve(h)}lookupMutationBatch(e,t){return W.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const i=t+1,o=this.Xr(i),l=o<0?0:o;return W.resolve(this.mutationQueue.length>l?this.mutationQueue[l]:null)}getHighestUnacknowledgedBatchId(){return W.resolve(this.mutationQueue.length===0?_f:this.Yn-1)}getAllMutationBatches(e){return W.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const i=new xt(t,0),o=new xt(t,Number.POSITIVE_INFINITY),l=[];return this.Hr.forEachInRange([i,o],(h=>{const p=this.Zr(h.Jr);l.push(p)})),W.resolve(l)}getAllMutationBatchesAffectingDocumentKeys(e,t){let i=new wt(Pe);return t.forEach((o=>{const l=new xt(o,0),h=new xt(o,Number.POSITIVE_INFINITY);this.Hr.forEachInRange([l,h],(p=>{i=i.add(p.Jr)}))})),W.resolve(this.Yr(i))}getAllMutationBatchesAffectingQuery(e,t){const i=t.path,o=i.length+1;let l=i;ce.isDocumentKey(l)||(l=l.child(""));const h=new xt(new ce(l),0);let p=new wt(Pe);return this.Hr.forEachWhile((g=>{const y=g.key.path;return!!i.isPrefixOf(y)&&(y.length===o&&(p=p.add(g.Jr)),!0)}),h),W.resolve(this.Yr(p))}Yr(e){const t=[];return e.forEach((i=>{const o=this.Zr(i);o!==null&&t.push(o)})),t}removeMutationBatch(e,t){ze(this.ei(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let i=this.Hr;return W.forEach(t.mutations,(o=>{const l=new xt(o.key,t.batchId);return i=i.delete(l),this.referenceDelegate.markPotentiallyOrphaned(e,o.key)})).next((()=>{this.Hr=i}))}nr(e){}containsKey(e,t){const i=new xt(t,0),o=this.Hr.firstAfterOrEqual(i);return W.resolve(t.isEqual(o&&o.key))}performConsistencyCheck(e){return this.mutationQueue.length,W.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DI{constructor(e){this.ti=e,this.docs=(function(){return new nt(ce.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const i=t.key,o=this.docs.get(i),l=o?o.size:0,h=this.ti(t);return this.docs=this.docs.insert(i,{document:t.mutableCopy(),size:h}),this.size+=h-l,this.indexManager.addToCollectionParentIndex(e,i.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const i=this.docs.get(t);return W.resolve(i?i.document.mutableCopy():Bt.newInvalidDocument(t))}getEntries(e,t){let i=Lr();return t.forEach((o=>{const l=this.docs.get(o);i=i.insert(o,l?l.document.mutableCopy():Bt.newInvalidDocument(o))})),W.resolve(i)}getDocumentsMatchingQuery(e,t,i,o){let l=Lr();const h=t.path,p=new ce(h.child("__id-9223372036854775808__")),g=this.docs.getIteratorFrom(p);for(;g.hasNext();){const{key:y,value:{document:E}}=g.getNext();if(!h.isPrefixOf(y.path))break;y.path.length>h.length+1||iT(sT(E),i)<=0||(o.has(E.key)||Pc(t,E))&&(l=l.insert(E.key,E.mutableCopy()))}return W.resolve(l)}getAllFromCollectionGroup(e,t,i,o){ge(9500)}ni(e,t){return W.forEach(this.docs,(i=>t(i)))}newChangeBuffer(e){return new VI(this)}getSize(e){return W.resolve(this.size)}}class VI extends xI{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach(((i,o)=>{o.isValidDocument()?t.push(this.Mr.addEntry(e,o)):this.Mr.removeEntry(i)})),W.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OI{constructor(e){this.persistence=e,this.ri=new Ti((t=>wf(t)),Tf),this.lastRemoteSnapshotVersion=ve.min(),this.highestTargetId=0,this.ii=0,this.si=new kf,this.targetCount=0,this.oi=ko._r()}forEachTarget(e,t){return this.ri.forEach(((i,o)=>t(o))),W.resolve()}getLastRemoteSnapshotVersion(e){return W.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return W.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),W.resolve(this.highestTargetId)}setTargetsMetadata(e,t,i){return i&&(this.lastRemoteSnapshotVersion=i),t>this.ii&&(this.ii=t),W.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new ko(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,W.resolve()}updateTargetData(e,t){return this.lr(t),W.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,W.resolve()}removeTargets(e,t,i){let o=0;const l=[];return this.ri.forEach(((h,p)=>{p.sequenceNumber<=t&&i.get(p.targetId)===null&&(this.ri.delete(h),l.push(this.removeMatchingKeysForTargetId(e,p.targetId)),o++)})),W.waitFor(l).next((()=>o))}getTargetCount(e){return W.resolve(this.targetCount)}getTargetData(e,t){const i=this.ri.get(t)||null;return W.resolve(i)}addMatchingKeys(e,t,i){return this.si.$r(t,i),W.resolve()}removeMatchingKeys(e,t,i){this.si.Qr(t,i);const o=this.persistence.referenceDelegate,l=[];return o&&t.forEach((h=>{l.push(o.markPotentiallyOrphaned(e,h))})),W.waitFor(l)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),W.resolve()}getMatchingKeysForTargetId(e,t){const i=this.si.jr(t);return W.resolve(i)}containsKey(e,t){return W.resolve(this.si.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vv{constructor(e,t){this._i={},this.overlays={},this.ai=new Ac(0),this.ui=!1,this.ui=!0,this.ci=new NI,this.referenceDelegate=e(this),this.li=new OI(this),this.indexManager=new vI,this.remoteDocumentCache=(function(o){return new DI(o)})((i=>this.referenceDelegate.hi(i))),this.serializer=new yI(t),this.Pi=new RI(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new PI,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let i=this._i[e.toKey()];return i||(i=new bI(t,this.referenceDelegate),this._i[e.toKey()]=i),i}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,i){re("MemoryPersistence","Starting transaction:",e);const o=new MI(this.ai.next());return this.referenceDelegate.Ti(),i(o).next((l=>this.referenceDelegate.Ei(o).next((()=>l)))).toPromise().then((l=>(o.raiseOnCommittedEvent(),l)))}Ii(e,t){return W.or(Object.values(this._i).map((i=>()=>i.containsKey(e,t))))}}class MI extends aT{constructor(e){super(),this.currentSequenceNumber=e}}class Cf{constructor(e){this.persistence=e,this.Ri=new kf,this.Ai=null}static Vi(e){return new Cf(e)}get di(){if(this.Ai)return this.Ai;throw ge(60996)}addReference(e,t,i){return this.Ri.addReference(i,t),this.di.delete(i.toString()),W.resolve()}removeReference(e,t,i){return this.Ri.removeReference(i,t),this.di.add(i.toString()),W.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),W.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach((o=>this.di.add(o.toString())));const i=this.persistence.getTargetCache();return i.getMatchingKeysForTargetId(e,t.targetId).next((o=>{o.forEach((l=>this.di.add(l.toString())))})).next((()=>i.removeTargetData(e,t)))}Ti(){this.Ai=new Set}Ei(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return W.forEach(this.di,(i=>{const o=ce.fromPath(i);return this.mi(e,o).next((l=>{l||t.removeEntry(o,ve.min())}))})).next((()=>(this.Ai=null,t.apply(e))))}updateLimboDocument(e,t){return this.mi(e,t).next((i=>{i?this.di.delete(t.toString()):this.di.add(t.toString())}))}hi(e){return 0}mi(e,t){return W.or([()=>W.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ii(e,t)])}}class ac{constructor(e,t){this.persistence=e,this.fi=new Ti((i=>cT(i.path)),((i,o)=>i.isEqual(o))),this.garbageCollector=AI(this,t)}static Vi(e,t){return new ac(e,t)}Ti(){}Ei(e){return W.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next((i=>t.next((o=>i+o))))}pr(e){let t=0;return this.mr(e,(i=>{t++})).next((()=>t))}mr(e,t){return W.forEach(this.fi,((i,o)=>this.wr(e,i,o).next((l=>l?W.resolve():t(o)))))}removeTargets(e,t,i){return this.persistence.getTargetCache().removeTargets(e,t,i)}removeOrphanedDocuments(e,t){let i=0;const o=this.persistence.getRemoteDocumentCache(),l=o.newChangeBuffer();return o.ni(e,(h=>this.wr(e,h,t).next((p=>{p||(i++,l.removeEntry(h,ve.min()))})))).next((()=>l.apply(e))).next((()=>i))}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),W.resolve()}removeTarget(e,t){const i=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,i)}addReference(e,t,i){return this.fi.set(i,e.currentSequenceNumber),W.resolve()}removeReference(e,t,i){return this.fi.set(i,e.currentSequenceNumber),W.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),W.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=$u(e.data.value)),t}wr(e,t,i){return W.or([()=>this.persistence.Ii(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const o=this.fi.get(t);return W.resolve(o!==void 0&&o>i)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rf{constructor(e,t,i,o){this.targetId=e,this.fromCache=t,this.Ts=i,this.Es=o}static Is(e,t){let i=Ne(),o=Ne();for(const l of t.docChanges)switch(l.type){case 0:i=i.add(l.doc.key);break;case 1:o=o.add(l.doc.key)}return new Rf(e,t.fromCache,i,o)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LI{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jI{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=(function(){return kw()?8:lT($t())>0?6:4})()}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,i,o){const l={result:null};return this.gs(e,t).next((h=>{l.result=h})).next((()=>{if(!l.result)return this.ps(e,t,o,i).next((h=>{l.result=h}))})).next((()=>{if(l.result)return;const h=new LI;return this.ys(e,t,h).next((p=>{if(l.result=p,this.As)return this.ws(e,t,h,p.size)}))})).next((()=>l.result))}ws(e,t,i,o){return i.documentReadCount<this.Vs?(po()<=Re.DEBUG&&re("QueryEngine","SDK will not create cache indexes for query:",mo(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),W.resolve()):(po()<=Re.DEBUG&&re("QueryEngine","Query:",mo(t),"scans",i.documentReadCount,"local documents and returns",o,"documents as results."),i.documentReadCount>this.ds*o?(po()<=Re.DEBUG&&re("QueryEngine","The SDK decides to create cache indexes for query:",mo(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,or(t))):W.resolve())}gs(e,t){if(oy(t))return W.resolve(null);let i=or(t);return this.indexManager.getIndexType(e,i).next((o=>o===0?null:(t.limit!==null&&o===1&&(t=Jd(t,null,"F"),i=or(t)),this.indexManager.getDocumentsMatchingTarget(e,i).next((l=>{const h=Ne(...l);return this.fs.getDocuments(e,h).next((p=>this.indexManager.getMinOffset(e,i).next((g=>{const y=this.Ss(t,p);return this.bs(t,y,h,g.readTime)?this.gs(e,Jd(t,null,"F")):this.Ds(e,y,t,g)}))))})))))}ps(e,t,i,o){return oy(t)||o.isEqual(ve.min())?W.resolve(null):this.fs.getDocuments(e,i).next((l=>{const h=this.Ss(t,l);return this.bs(t,h,i,o)?W.resolve(null):(po()<=Re.DEBUG&&re("QueryEngine","Re-using previous result from %s to execute query: %s",o.toString(),mo(t)),this.Ds(e,h,t,rT(o,Wa)).next((p=>p)))}))}Ss(e,t){let i=new wt(Y_(e));return t.forEach(((o,l)=>{Pc(e,l)&&(i=i.add(l))})),i}bs(e,t,i,o){if(e.limit===null)return!1;if(i.size!==t.size)return!0;const l=e.limitType==="F"?t.last():t.first();return!!l&&(l.hasPendingWrites||l.version.compareTo(o)>0)}ys(e,t,i){return po()<=Re.DEBUG&&re("QueryEngine","Using full collection scan to execute query:",mo(t)),this.fs.getDocumentsMatchingQuery(e,t,xs.min(),i)}Ds(e,t,i,o){return this.fs.getDocumentsMatchingQuery(e,i,o).next((l=>(t.forEach((h=>{l=l.insert(h.key,h)})),l)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pf="LocalStore",FI=3e8;class UI{constructor(e,t,i,o){this.persistence=e,this.Cs=t,this.serializer=o,this.vs=new nt(Pe),this.Fs=new Ti((l=>wf(l)),Tf),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(i)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new CI(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.vs)))}}function zI(r,e,t,i){return new UI(r,e,t,i)}async function Ev(r,e){const t=we(r);return await t.persistence.runTransaction("Handle user change","readonly",(i=>{let o;return t.mutationQueue.getAllMutationBatches(i).next((l=>(o=l,t.Os(e),t.mutationQueue.getAllMutationBatches(i)))).next((l=>{const h=[],p=[];let g=Ne();for(const y of o){h.push(y.batchId);for(const E of y.mutations)g=g.add(E.key)}for(const y of l){p.push(y.batchId);for(const E of y.mutations)g=g.add(E.key)}return t.localDocuments.getDocuments(i,g).next((y=>({Ns:y,removedBatchIds:h,addedBatchIds:p})))}))}))}function BI(r,e){const t=we(r);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(i=>{const o=e.batch.keys(),l=t.xs.newChangeBuffer({trackRemovals:!0});return(function(p,g,y,E){const I=y.batch,x=I.keys();let O=W.resolve();return x.forEach((q=>{O=O.next((()=>E.getEntry(g,q))).next(($=>{const B=y.docVersions.get(q);ze(B!==null,48541),$.version.compareTo(B)<0&&(I.applyToRemoteDocument($,y),$.isValidDocument()&&($.setReadTime(y.commitVersion),E.addEntry($)))}))})),O.next((()=>p.mutationQueue.removeMutationBatch(g,I)))})(t,i,e,l).next((()=>l.apply(i))).next((()=>t.mutationQueue.performConsistencyCheck(i))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(i,o,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(i,(function(p){let g=Ne();for(let y=0;y<p.mutationResults.length;++y)p.mutationResults[y].transformResults.length>0&&(g=g.add(p.batch.mutations[y].key));return g})(e)))).next((()=>t.localDocuments.getDocuments(i,o)))}))}function wv(r){const e=we(r);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.li.getLastRemoteSnapshotVersion(t)))}function $I(r,e){const t=we(r),i=e.snapshotVersion;let o=t.vs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(l=>{const h=t.xs.newChangeBuffer({trackRemovals:!0});o=t.vs;const p=[];e.targetChanges.forEach(((E,I)=>{const x=o.get(I);if(!x)return;p.push(t.li.removeMatchingKeys(l,E.removedDocuments,I).next((()=>t.li.addMatchingKeys(l,E.addedDocuments,I))));let O=x.withSequenceNumber(l.currentSequenceNumber);e.targetMismatches.get(I)!==null?O=O.withResumeToken(Dt.EMPTY_BYTE_STRING,ve.min()).withLastLimboFreeSnapshotVersion(ve.min()):E.resumeToken.approximateByteSize()>0&&(O=O.withResumeToken(E.resumeToken,i)),o=o.insert(I,O),(function($,B,Z){return $.resumeToken.approximateByteSize()===0||B.snapshotVersion.toMicroseconds()-$.snapshotVersion.toMicroseconds()>=FI?!0:Z.addedDocuments.size+Z.modifiedDocuments.size+Z.removedDocuments.size>0})(x,O,E)&&p.push(t.li.updateTargetData(l,O))}));let g=Lr(),y=Ne();if(e.documentUpdates.forEach((E=>{e.resolvedLimboDocuments.has(E)&&p.push(t.persistence.referenceDelegate.updateLimboDocument(l,E))})),p.push(qI(l,h,e.documentUpdates).next((E=>{g=E.Bs,y=E.Ls}))),!i.isEqual(ve.min())){const E=t.li.getLastRemoteSnapshotVersion(l).next((I=>t.li.setTargetsMetadata(l,l.currentSequenceNumber,i)));p.push(E)}return W.waitFor(p).next((()=>h.apply(l))).next((()=>t.localDocuments.getLocalViewOfDocuments(l,g,y))).next((()=>g))})).then((l=>(t.vs=o,l)))}function qI(r,e,t){let i=Ne(),o=Ne();return t.forEach((l=>i=i.add(l))),e.getEntries(r,i).next((l=>{let h=Lr();return t.forEach(((p,g)=>{const y=l.get(p);g.isFoundDocument()!==y.isFoundDocument()&&(o=o.add(p)),g.isNoDocument()&&g.version.isEqual(ve.min())?(e.removeEntry(p,g.readTime),h=h.insert(p,g)):!y.isValidDocument()||g.version.compareTo(y.version)>0||g.version.compareTo(y.version)===0&&y.hasPendingWrites?(e.addEntry(g),h=h.insert(p,g)):re(Pf,"Ignoring outdated watch update for ",p,". Current version:",y.version," Watch version:",g.version)})),{Bs:h,Ls:o}}))}function HI(r,e){const t=we(r);return t.persistence.runTransaction("Get next mutation batch","readonly",(i=>(e===void 0&&(e=_f),t.mutationQueue.getNextMutationBatchAfterBatchId(i,e))))}function WI(r,e){const t=we(r);return t.persistence.runTransaction("Allocate target","readwrite",(i=>{let o;return t.li.getTargetData(i,e).next((l=>l?(o=l,W.resolve(o)):t.li.allocateTargetId(i).next((h=>(o=new Es(e,h,"TargetPurposeListen",i.currentSequenceNumber),t.li.addTargetData(i,o).next((()=>o)))))))})).then((i=>{const o=t.vs.get(i.targetId);return(o===null||i.snapshotVersion.compareTo(o.snapshotVersion)>0)&&(t.vs=t.vs.insert(i.targetId,i),t.Fs.set(e,i.targetId)),i}))}async function nf(r,e,t){const i=we(r),o=i.vs.get(e),l=t?"readwrite":"readwrite-primary";try{t||await i.persistence.runTransaction("Release target",l,(h=>i.persistence.referenceDelegate.removeTarget(h,o)))}catch(h){if(!Vo(h))throw h;re(Pf,`Failed to update sequence numbers for target ${e}: ${h}`)}i.vs=i.vs.remove(e),i.Fs.delete(o.target)}function vy(r,e,t){const i=we(r);let o=ve.min(),l=Ne();return i.persistence.runTransaction("Execute query","readwrite",(h=>(function(g,y,E){const I=we(g),x=I.Fs.get(E);return x!==void 0?W.resolve(I.vs.get(x)):I.li.getTargetData(y,E)})(i,h,or(e)).next((p=>{if(p)return o=p.lastLimboFreeSnapshotVersion,i.li.getMatchingKeysForTargetId(h,p.targetId).next((g=>{l=g}))})).next((()=>i.Cs.getDocumentsMatchingQuery(h,e,t?o:ve.min(),t?l:Ne()))).next((p=>(GI(i,NT(e),p),{documents:p,ks:l})))))}function GI(r,e,t){let i=r.Ms.get(e)||ve.min();t.forEach(((o,l)=>{l.readTime.compareTo(i)>0&&(i=l.readTime)})),r.Ms.set(e,i)}class Ey{constructor(){this.activeTargetIds=LT()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class KI{constructor(){this.vo=new Ey,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,i){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,i){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new Ey,Promise.resolve()}handleUserChange(e,t,i){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QI{Mo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wy="ConnectivityMonitor";class Ty{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){re(wy,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){re(wy,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Uu=null;function rf(){return Uu===null?Uu=(function(){return 268435456+Math.round(2147483648*Math.random())})():Uu++,"0x"+Uu.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pd="RestConnection",YI={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class JI{get qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),o=encodeURIComponent(this.databaseId.database);this.Ko=t+"://"+e.host,this.Uo=`projects/${i}/databases/${o}`,this.$o=this.databaseId.database===tc?`project_id=${i}`:`project_id=${i}&database_id=${o}`}Wo(e,t,i,o,l){const h=rf(),p=this.Qo(e,t.toUriEncodedString());re(Pd,`Sending RPC '${e}' ${h}:`,p,i);const g={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(g,o,l);const{host:y}=new URL(p),E=sl(y);return this.zo(e,p,g,i,E).then((I=>(re(Pd,`Received RPC '${e}' ${h}: `,I),I)),(I=>{throw vi(Pd,`RPC '${e}' ${h} failed with error: `,I,"url: ",p,"request:",i),I}))}jo(e,t,i,o,l,h){return this.Wo(e,t,i,o,l)}Go(e,t,i){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+bo})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((o,l)=>e[l]=o)),i&&i.headers.forEach(((o,l)=>e[l]=o))}Qo(e,t){const i=YI[e];let o=`${this.Ko}/v1/${t}:${i}`;return this.databaseInfo.apiKey&&(o=`${o}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),o}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XI{constructor(e){this.Jo=e.Jo,this.Ho=e.Ho}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Ho()}send(e){this.Jo(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ut="WebChannelConnection",Da=(r,e,t)=>{r.listen(e,(i=>{try{t(i)}catch(o){setTimeout((()=>{throw o}),0)}}))};class _o extends JI{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!_o.c_){const e=x_();Da(e,A_.STAT_EVENT,(t=>{t.stat===qd.PROXY?re(Ut,"STAT_EVENT: detected buffering proxy"):t.stat===qd.NOPROXY&&re(Ut,"STAT_EVENT: detected no buffering proxy")})),_o.c_=!0}}zo(e,t,i,o,l){const h=rf();return new Promise(((p,g)=>{const y=new I_;y.setWithCredentials(!0),y.listenOnce(S_.COMPLETE,(()=>{try{switch(y.getLastErrorCode()){case Bu.NO_ERROR:const I=y.getResponseJson();re(Ut,`XHR for RPC '${e}' ${h} received:`,JSON.stringify(I)),p(I);break;case Bu.TIMEOUT:re(Ut,`RPC '${e}' ${h} timed out`),g(new te(H.DEADLINE_EXCEEDED,"Request time out"));break;case Bu.HTTP_ERROR:const x=y.getStatus();if(re(Ut,`RPC '${e}' ${h} failed with status:`,x,"response text:",y.getResponseText()),x>0){let O=y.getResponseJson();Array.isArray(O)&&(O=O[0]);const q=O==null?void 0:O.error;if(q&&q.status&&q.message){const $=(function(Z){const ae=Z.toLowerCase().replace(/_/g,"-");return Object.values(H).indexOf(ae)>=0?ae:H.UNKNOWN})(q.status);g(new te($,q.message))}else g(new te(H.UNKNOWN,"Server responded with status "+y.getStatus()))}else g(new te(H.UNAVAILABLE,"Connection failed."));break;default:ge(9055,{l_:e,streamId:h,h_:y.getLastErrorCode(),P_:y.getLastError()})}}finally{re(Ut,`RPC '${e}' ${h} completed.`)}}));const E=JSON.stringify(o);re(Ut,`RPC '${e}' ${h} sending request:`,o),y.send(t,"POST",E,i,15)}))}T_(e,t,i){const o=rf(),l=[this.Ko,"/","google.firestore.v1.Firestore","/",e,"/channel"],h=this.createWebChannelTransport(),p={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},g=this.longPollingOptions.timeoutSeconds;g!==void 0&&(p.longPollingTimeout=Math.round(1e3*g)),this.useFetchStreams&&(p.useFetchStreams=!0),this.Go(p.initMessageHeaders,t,i),p.encodeInitMessageHeaders=!0;const y=l.join("");re(Ut,`Creating RPC '${e}' stream ${o}: ${y}`,p);const E=h.createWebChannel(y,p);this.E_(E);let I=!1,x=!1;const O=new XI({Jo:q=>{x?re(Ut,`Not sending because RPC '${e}' stream ${o} is closed:`,q):(I||(re(Ut,`Opening RPC '${e}' stream ${o} transport.`),E.open(),I=!0),re(Ut,`RPC '${e}' stream ${o} sending:`,q),E.send(q))},Ho:()=>E.close()});return Da(E,Ma.EventType.OPEN,(()=>{x||(re(Ut,`RPC '${e}' stream ${o} transport opened.`),O.i_())})),Da(E,Ma.EventType.CLOSE,(()=>{x||(x=!0,re(Ut,`RPC '${e}' stream ${o} transport closed`),O.o_(),this.I_(E))})),Da(E,Ma.EventType.ERROR,(q=>{x||(x=!0,vi(Ut,`RPC '${e}' stream ${o} transport errored. Name:`,q.name,"Message:",q.message),O.o_(new te(H.UNAVAILABLE,"The operation could not be completed")))})),Da(E,Ma.EventType.MESSAGE,(q=>{var $;if(!x){const B=q.data[0];ze(!!B,16349);const Z=B,ae=(Z==null?void 0:Z.error)||(($=Z[0])==null?void 0:$.error);if(ae){re(Ut,`RPC '${e}' stream ${o} received error:`,ae);const me=ae.status;let Se=(function(R){const S=mt[R];if(S!==void 0)return av(S)})(me),Me=ae.message;me==="NOT_FOUND"&&Me.includes("database")&&Me.includes("does not exist")&&Me.includes(this.databaseId.database)&&vi(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),Se===void 0&&(Se=H.INTERNAL,Me="Unknown error status: "+me+" with message "+ae.message),x=!0,O.o_(new te(Se,Me)),E.close()}else re(Ut,`RPC '${e}' stream ${o} received:`,B),O.__(B)}})),_o.u_(),setTimeout((()=>{O.s_()}),0),O}terminate(){this.a_.forEach((e=>e.close())),this.a_=[]}E_(e){this.a_.push(e)}I_(e){this.a_=this.a_.filter((t=>t===e))}Go(e,t,i){super.Go(e,t,i),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return k_()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ZI(r){return new _o(r)}function Nd(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oc(r){return new rI(r,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */_o.c_=!1;class Tv{constructor(e,t,i=1e3,o=1.5,l=6e4){this.Ci=e,this.timerId=t,this.R_=i,this.A_=o,this.V_=l,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),i=Math.max(0,Date.now()-this.f_),o=Math.max(0,t-i);o>0&&re("ExponentialBackoff",`Backing off for ${o} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${i} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,o,(()=>(this.f_=Date.now(),e()))),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Iy="PersistentStream";class Iv{constructor(e,t,i,o,l,h,p,g){this.Ci=e,this.S_=i,this.b_=o,this.connection=l,this.authCredentialsProvider=h,this.appCheckCredentialsProvider=p,this.listener=g,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Tv(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(e){this.K_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.K_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===H.RESOURCE_EXHAUSTED?(Mr(t.toString()),Mr("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===H.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([i,o])=>{this.D_===t&&this.G_(i,o)}),(i=>{e((()=>{const o=new te(H.UNKNOWN,"Fetching auth token failed: "+i.message);return this.z_(o)}))}))}G_(e,t){const i=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo((()=>{i((()=>this.listener.Zo()))})),this.stream.Yo((()=>{i((()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.Yo())))})),this.stream.t_((o=>{i((()=>this.z_(o)))})),this.stream.onMessage((o=>{i((()=>++this.F_==1?this.J_(o):this.onNext(o)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(e){return re(Iy,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget((()=>this.D_===e?t():(re(Iy,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class eS extends Iv{constructor(e,t,i,o,l,h){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,i,o,h),this.serializer=l}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=oI(this.serializer,e),i=(function(l){if(!("targetChange"in l))return ve.min();const h=l.targetChange;return h.targetIds&&h.targetIds.length?ve.min():h.readTime?ar(h.readTime):ve.min()})(e);return this.listener.H_(t,i)}Z_(e){const t={};t.database=tf(this.serializer),t.addTarget=(function(l,h){let p;const g=h.target;if(p=Qd(g)?{documents:uI(l,g)}:{query:cI(l,g).ft},p.targetId=h.targetId,h.resumeToken.approximateByteSize()>0){p.resumeToken=cv(l,h.resumeToken);const y=Xd(l,h.expectedCount);y!==null&&(p.expectedCount=y)}else if(h.snapshotVersion.compareTo(ve.min())>0){p.readTime=oc(l,h.snapshotVersion.toTimestamp());const y=Xd(l,h.expectedCount);y!==null&&(p.expectedCount=y)}return p})(this.serializer,e);const i=dI(this.serializer,e);i&&(t.labels=i),this.q_(t)}X_(e){const t={};t.database=tf(this.serializer),t.removeTarget=e,this.q_(t)}}class tS extends Iv{constructor(e,t,i,o,l,h){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,i,o,h),this.serializer=l}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return ze(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,ze(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){ze(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=lI(e.writeResults,e.commitTime),i=ar(e.commitTime);return this.listener.na(i,t)}ra(){const e={};e.database=tf(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map((i=>aI(this.serializer,i)))};this.q_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nS{}class rS extends nS{constructor(e,t,i,o){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=i,this.serializer=o,this.ia=!1}sa(){if(this.ia)throw new te(H.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,i,o){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([l,h])=>this.connection.Wo(e,Zd(t,i),o,l,h))).catch((l=>{throw l.name==="FirebaseError"?(l.code===H.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),l):new te(H.UNKNOWN,l.toString())}))}jo(e,t,i,o,l){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([h,p])=>this.connection.jo(e,Zd(t,i),o,h,p,l))).catch((h=>{throw h.name==="FirebaseError"?(h.code===H.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),h):new te(H.UNKNOWN,h.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}function sS(r,e,t,i){return new rS(r,e,t,i)}class iS{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Mr(t),this.aa=!1):re("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ei="RemoteStore";class oS{constructor(e,t,i,o,l){this.localStore=e,this.datastore=t,this.asyncQueue=i,this.remoteSyncer={},this.Ta=[],this.Ea=new Map,this.Ia=new Set,this.Ra=[],this.Aa=l,this.Aa.Mo((h=>{i.enqueueAndForget((async()=>{Ii(this)&&(re(Ei,"Restarting streams for network reachability change."),await(async function(g){const y=we(g);y.Ia.add(4),await ul(y),y.Va.set("Unknown"),y.Ia.delete(4),await Mc(y)})(this))}))})),this.Va=new iS(i,o)}}async function Mc(r){if(Ii(r))for(const e of r.Ra)await e(!0)}async function ul(r){for(const e of r.Ra)await e(!1)}function Sv(r,e){const t=we(r);t.Ea.has(e.targetId)||(t.Ea.set(e.targetId,e),Vf(t)?Df(t):Oo(t).O_()&&bf(t,e))}function Nf(r,e){const t=we(r),i=Oo(t);t.Ea.delete(e),i.O_()&&Av(t,e),t.Ea.size===0&&(i.O_()?i.L_():Ii(t)&&t.Va.set("Unknown"))}function bf(r,e){if(r.da.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(ve.min())>0){const t=r.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Oo(r).Z_(e)}function Av(r,e){r.da.$e(e),Oo(r).X_(e)}function Df(r){r.da=new ZT({getRemoteKeysForTarget:e=>r.remoteSyncer.getRemoteKeysForTarget(e),At:e=>r.Ea.get(e)||null,ht:()=>r.datastore.serializer.databaseId}),Oo(r).start(),r.Va.ua()}function Vf(r){return Ii(r)&&!Oo(r).x_()&&r.Ea.size>0}function Ii(r){return we(r).Ia.size===0}function xv(r){r.da=void 0}async function aS(r){r.Va.set("Online")}async function lS(r){r.Ea.forEach(((e,t)=>{bf(r,e)}))}async function uS(r,e){xv(r),Vf(r)?(r.Va.ha(e),Df(r)):r.Va.set("Unknown")}async function cS(r,e,t){if(r.Va.set("Online"),e instanceof uv&&e.state===2&&e.cause)try{await(async function(o,l){const h=l.cause;for(const p of l.targetIds)o.Ea.has(p)&&(await o.remoteSyncer.rejectListen(p,h),o.Ea.delete(p),o.da.removeTarget(p))})(r,e)}catch(i){re(Ei,"Failed to remove targets %s: %s ",e.targetIds.join(","),i),await lc(r,i)}else if(e instanceof Wu?r.da.Xe(e):e instanceof lv?r.da.st(e):r.da.tt(e),!t.isEqual(ve.min()))try{const i=await wv(r.localStore);t.compareTo(i)>=0&&await(function(l,h){const p=l.da.Tt(h);return p.targetChanges.forEach(((g,y)=>{if(g.resumeToken.approximateByteSize()>0){const E=l.Ea.get(y);E&&l.Ea.set(y,E.withResumeToken(g.resumeToken,h))}})),p.targetMismatches.forEach(((g,y)=>{const E=l.Ea.get(g);if(!E)return;l.Ea.set(g,E.withResumeToken(Dt.EMPTY_BYTE_STRING,E.snapshotVersion)),Av(l,g);const I=new Es(E.target,g,y,E.sequenceNumber);bf(l,I)})),l.remoteSyncer.applyRemoteEvent(p)})(r,t)}catch(i){re(Ei,"Failed to raise snapshot:",i),await lc(r,i)}}async function lc(r,e,t){if(!Vo(e))throw e;r.Ia.add(1),await ul(r),r.Va.set("Offline"),t||(t=()=>wv(r.localStore)),r.asyncQueue.enqueueRetryable((async()=>{re(Ei,"Retrying IndexedDB access"),await t(),r.Ia.delete(1),await Mc(r)}))}function kv(r,e){return e().catch((t=>lc(r,t,e)))}async function Lc(r){const e=we(r),t=Ps(e);let i=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:_f;for(;hS(e);)try{const o=await HI(e.localStore,i);if(o===null){e.Ta.length===0&&t.L_();break}i=o.batchId,dS(e,o)}catch(o){await lc(e,o)}Cv(e)&&Rv(e)}function hS(r){return Ii(r)&&r.Ta.length<10}function dS(r,e){r.Ta.push(e);const t=Ps(r);t.O_()&&t.Y_&&t.ea(e.mutations)}function Cv(r){return Ii(r)&&!Ps(r).x_()&&r.Ta.length>0}function Rv(r){Ps(r).start()}async function fS(r){Ps(r).ra()}async function pS(r){const e=Ps(r);for(const t of r.Ta)e.ea(t.mutations)}async function mS(r,e,t){const i=r.Ta.shift(),o=Sf.from(i,e,t);await kv(r,(()=>r.remoteSyncer.applySuccessfulWrite(o))),await Lc(r)}async function gS(r,e){e&&Ps(r).Y_&&await(async function(i,o){if((function(h){return YT(h)&&h!==H.ABORTED})(o.code)){const l=i.Ta.shift();Ps(i).B_(),await kv(i,(()=>i.remoteSyncer.rejectFailedWrite(l.batchId,o))),await Lc(i)}})(r,e),Cv(r)&&Rv(r)}async function Sy(r,e){const t=we(r);t.asyncQueue.verifyOperationInProgress(),re(Ei,"RemoteStore received new credentials");const i=Ii(t);t.Ia.add(3),await ul(t),i&&t.Va.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await Mc(t)}async function yS(r,e){const t=we(r);e?(t.Ia.delete(2),await Mc(t)):e||(t.Ia.add(2),await ul(t),t.Va.set("Unknown"))}function Oo(r){return r.ma||(r.ma=(function(t,i,o){const l=we(t);return l.sa(),new eS(i,l.connection,l.authCredentials,l.appCheckCredentials,l.serializer,o)})(r.datastore,r.asyncQueue,{Zo:aS.bind(null,r),Yo:lS.bind(null,r),t_:uS.bind(null,r),H_:cS.bind(null,r)}),r.Ra.push((async e=>{e?(r.ma.B_(),Vf(r)?Df(r):r.Va.set("Unknown")):(await r.ma.stop(),xv(r))}))),r.ma}function Ps(r){return r.fa||(r.fa=(function(t,i,o){const l=we(t);return l.sa(),new tS(i,l.connection,l.authCredentials,l.appCheckCredentials,l.serializer,o)})(r.datastore,r.asyncQueue,{Zo:()=>Promise.resolve(),Yo:fS.bind(null,r),t_:gS.bind(null,r),ta:pS.bind(null,r),na:mS.bind(null,r)}),r.Ra.push((async e=>{e?(r.fa.B_(),await Lc(r)):(await r.fa.stop(),r.Ta.length>0&&(re(Ei,`Stopping write stream with ${r.Ta.length} pending writes`),r.Ta=[]))}))),r.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Of{constructor(e,t,i,o,l){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=i,this.op=o,this.removalCallback=l,this.deferred=new Vr,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((h=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,i,o,l){const h=Date.now()+i,p=new Of(e,t,h,o,l);return p.start(i),p}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new te(H.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Mf(r,e){if(Mr("AsyncQueue",`${e}: ${r}`),Vo(r))return new te(H.UNAVAILABLE,`${e}: ${r}`);throw r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vo{static emptySet(e){return new vo(e.comparator)}constructor(e){this.comparator=e?(t,i)=>e(t,i)||ce.comparator(t.key,i.key):(t,i)=>ce.comparator(t.key,i.key),this.keyedMap=La(),this.sortedSet=new nt(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,i)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof vo)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),i=e.sortedSet.getIterator();for(;t.hasNext();){const o=t.getNext().key,l=i.getNext().key;if(!o.isEqual(l))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const i=new vo;return i.comparator=this.comparator,i.keyedMap=e,i.sortedSet=t,i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ay{constructor(){this.ga=new nt(ce.comparator)}track(e){const t=e.doc.key,i=this.ga.get(t);i?e.type!==0&&i.type===3?this.ga=this.ga.insert(t,e):e.type===3&&i.type!==1?this.ga=this.ga.insert(t,{type:i.type,doc:e.doc}):e.type===2&&i.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&i.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&i.type===0?this.ga=this.ga.remove(t):e.type===1&&i.type===2?this.ga=this.ga.insert(t,{type:1,doc:i.doc}):e.type===0&&i.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):ge(63341,{Vt:e,pa:i}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal(((t,i)=>{e.push(i)})),e}}class Co{constructor(e,t,i,o,l,h,p,g,y){this.query=e,this.docs=t,this.oldDocs=i,this.docChanges=o,this.mutatedKeys=l,this.fromCache=h,this.syncStateChanged=p,this.excludesMetadataChanges=g,this.hasCachedResults=y}static fromInitialDocuments(e,t,i,o,l){const h=[];return t.forEach((p=>{h.push({type:0,doc:p})})),new Co(e,t,vo.emptySet(t),h,i,o,!0,!1,l)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Rc(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,i=e.docChanges;if(t.length!==i.length)return!1;for(let o=0;o<t.length;o++)if(t[o].type!==i[o].type||!t[o].doc.isEqual(i[o].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _S{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((e=>e.Da()))}}class vS{constructor(){this.queries=xy(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,i){const o=we(t),l=o.queries;o.queries=xy(),l.forEach(((h,p)=>{for(const g of p.Sa)g.onError(i)}))})(this,new te(H.ABORTED,"Firestore shutting down"))}}function xy(){return new Ti((r=>Q_(r)),Rc)}async function Lf(r,e){const t=we(r);let i=3;const o=e.query;let l=t.queries.get(o);l?!l.ba()&&e.Da()&&(i=2):(l=new _S,i=e.Da()?0:1);try{switch(i){case 0:l.wa=await t.onListen(o,!0);break;case 1:l.wa=await t.onListen(o,!1);break;case 2:await t.onFirstRemoteStoreListen(o)}}catch(h){const p=Mf(h,`Initialization of query '${mo(e.query)}' failed`);return void e.onError(p)}t.queries.set(o,l),l.Sa.push(e),e.va(t.onlineState),l.wa&&e.Fa(l.wa)&&Ff(t)}async function jf(r,e){const t=we(r),i=e.query;let o=3;const l=t.queries.get(i);if(l){const h=l.Sa.indexOf(e);h>=0&&(l.Sa.splice(h,1),l.Sa.length===0?o=e.Da()?0:1:!l.ba()&&e.Da()&&(o=2))}switch(o){case 0:return t.queries.delete(i),t.onUnlisten(i,!0);case 1:return t.queries.delete(i),t.onUnlisten(i,!1);case 2:return t.onLastRemoteStoreUnlisten(i);default:return}}function ES(r,e){const t=we(r);let i=!1;for(const o of e){const l=o.query,h=t.queries.get(l);if(h){for(const p of h.Sa)p.Fa(o)&&(i=!0);h.wa=o}}i&&Ff(t)}function wS(r,e,t){const i=we(r),o=i.queries.get(e);if(o)for(const l of o.Sa)l.onError(t);i.queries.delete(e)}function Ff(r){r.Ca.forEach((e=>{e.next()}))}var sf,ky;(ky=sf||(sf={})).Ma="default",ky.Cache="cache";class Uf{constructor(e,t,i){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=i||{}}Fa(e){if(!this.options.includeMetadataChanges){const i=[];for(const o of e.docChanges)o.type!==3&&i.push(o);e=new Co(e.query,e.docs,e.oldDocs,i,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const i=t!=="Offline";return(!this.options.qa||!i)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=Co.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==sf.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pv{constructor(e){this.key=e}}class Nv{constructor(e){this.key=e}}class TS{constructor(e,t){this.query=e,this.Za=t,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=Ne(),this.mutatedKeys=Ne(),this.eu=Y_(e),this.tu=new vo(this.eu)}get nu(){return this.Za}ru(e,t){const i=t?t.iu:new Ay,o=t?t.tu:this.tu;let l=t?t.mutatedKeys:this.mutatedKeys,h=o,p=!1;const g=this.query.limitType==="F"&&o.size===this.query.limit?o.last():null,y=this.query.limitType==="L"&&o.size===this.query.limit?o.first():null;if(e.inorderTraversal(((E,I)=>{const x=o.get(E),O=Pc(this.query,I)?I:null,q=!!x&&this.mutatedKeys.has(x.key),$=!!O&&(O.hasLocalMutations||this.mutatedKeys.has(O.key)&&O.hasCommittedMutations);let B=!1;x&&O?x.data.isEqual(O.data)?q!==$&&(i.track({type:3,doc:O}),B=!0):this.su(x,O)||(i.track({type:2,doc:O}),B=!0,(g&&this.eu(O,g)>0||y&&this.eu(O,y)<0)&&(p=!0)):!x&&O?(i.track({type:0,doc:O}),B=!0):x&&!O&&(i.track({type:1,doc:x}),B=!0,(g||y)&&(p=!0)),B&&(O?(h=h.add(O),l=$?l.add(E):l.delete(E)):(h=h.delete(E),l=l.delete(E)))})),this.query.limit!==null)for(;h.size>this.query.limit;){const E=this.query.limitType==="F"?h.last():h.first();h=h.delete(E.key),l=l.delete(E.key),i.track({type:1,doc:E})}return{tu:h,iu:i,bs:p,mutatedKeys:l}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,i,o){const l=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const h=e.iu.ya();h.sort(((E,I)=>(function(O,q){const $=B=>{switch(B){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return ge(20277,{Vt:B})}};return $(O)-$(q)})(E.type,I.type)||this.eu(E.doc,I.doc))),this.ou(i),o=o??!1;const p=t&&!o?this._u():[],g=this.Ya.size===0&&this.current&&!o?1:0,y=g!==this.Xa;return this.Xa=g,h.length!==0||y?{snapshot:new Co(this.query,e.tu,l,h,e.mutatedKeys,g===0,y,!1,!!i&&i.resumeToken.approximateByteSize()>0),au:p}:{au:p}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Ay,mutatedKeys:this.mutatedKeys,bs:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach((t=>this.Za=this.Za.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Za=this.Za.delete(t))),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=Ne(),this.tu.forEach((i=>{this.uu(i.key)&&(this.Ya=this.Ya.add(i.key))}));const t=[];return e.forEach((i=>{this.Ya.has(i)||t.push(new Nv(i))})),this.Ya.forEach((i=>{e.has(i)||t.push(new Pv(i))})),t}cu(e){this.Za=e.ks,this.Ya=Ne();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return Co.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const zf="SyncEngine";class IS{constructor(e,t,i){this.query=e,this.targetId=t,this.view=i}}class SS{constructor(e){this.key=e,this.hu=!1}}class AS{constructor(e,t,i,o,l,h){this.localStore=e,this.remoteStore=t,this.eventManager=i,this.sharedClientState=o,this.currentUser=l,this.maxConcurrentLimboResolutions=h,this.Pu={},this.Tu=new Ti((p=>Q_(p)),Rc),this.Eu=new Map,this.Iu=new Set,this.Ru=new nt(ce.comparator),this.Au=new Map,this.Vu=new kf,this.du={},this.mu=new Map,this.fu=ko.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function xS(r,e,t=!0){const i=Lv(r);let o;const l=i.Tu.get(e);return l?(i.sharedClientState.addLocalQueryTarget(l.targetId),o=l.view.lu()):o=await bv(i,e,t,!0),o}async function kS(r,e){const t=Lv(r);await bv(t,e,!0,!1)}async function bv(r,e,t,i){const o=await WI(r.localStore,or(e)),l=o.targetId,h=r.sharedClientState.addLocalQueryTarget(l,t);let p;return i&&(p=await CS(r,e,l,h==="current",o.resumeToken)),r.isPrimaryClient&&t&&Sv(r.remoteStore,o),p}async function CS(r,e,t,i,o){r.pu=(I,x,O)=>(async function($,B,Z,ae){let me=B.view.ru(Z);me.bs&&(me=await vy($.localStore,B.query,!1).then((({documents:R})=>B.view.ru(R,me))));const Se=ae&&ae.targetChanges.get(B.targetId),Me=ae&&ae.targetMismatches.get(B.targetId)!=null,Ae=B.view.applyChanges(me,$.isPrimaryClient,Se,Me);return Ry($,B.targetId,Ae.au),Ae.snapshot})(r,I,x,O);const l=await vy(r.localStore,e,!0),h=new TS(e,l.ks),p=h.ru(l.documents),g=ll.createSynthesizedTargetChangeForCurrentChange(t,i&&r.onlineState!=="Offline",o),y=h.applyChanges(p,r.isPrimaryClient,g);Ry(r,t,y.au);const E=new IS(e,t,h);return r.Tu.set(e,E),r.Eu.has(t)?r.Eu.get(t).push(e):r.Eu.set(t,[e]),y.snapshot}async function RS(r,e,t){const i=we(r),o=i.Tu.get(e),l=i.Eu.get(o.targetId);if(l.length>1)return i.Eu.set(o.targetId,l.filter((h=>!Rc(h,e)))),void i.Tu.delete(e);i.isPrimaryClient?(i.sharedClientState.removeLocalQueryTarget(o.targetId),i.sharedClientState.isActiveQueryTarget(o.targetId)||await nf(i.localStore,o.targetId,!1).then((()=>{i.sharedClientState.clearQueryState(o.targetId),t&&Nf(i.remoteStore,o.targetId),of(i,o.targetId)})).catch(Do)):(of(i,o.targetId),await nf(i.localStore,o.targetId,!0))}async function PS(r,e){const t=we(r),i=t.Tu.get(e),o=t.Eu.get(i.targetId);t.isPrimaryClient&&o.length===1&&(t.sharedClientState.removeLocalQueryTarget(i.targetId),Nf(t.remoteStore,i.targetId))}async function NS(r,e,t){const i=jS(r);try{const o=await(function(h,p){const g=we(h),y=Je.now(),E=p.reduce(((O,q)=>O.add(q.key)),Ne());let I,x;return g.persistence.runTransaction("Locally write mutations","readwrite",(O=>{let q=Lr(),$=Ne();return g.xs.getEntries(O,E).next((B=>{q=B,q.forEach(((Z,ae)=>{ae.isValidDocument()||($=$.add(Z))}))})).next((()=>g.localDocuments.getOverlayedDocuments(O,q))).next((B=>{I=B;const Z=[];for(const ae of p){const me=HT(ae,I.get(ae.key).overlayedDocument);me!=null&&Z.push(new Vs(ae.key,me,z_(me.value.mapValue),Kt.exists(!0)))}return g.mutationQueue.addMutationBatch(O,y,Z,p)})).next((B=>{x=B;const Z=B.applyToLocalDocumentSet(I,$);return g.documentOverlayCache.saveOverlays(O,B.batchId,Z)}))})).then((()=>({batchId:x.batchId,changes:X_(I)})))})(i.localStore,e);i.sharedClientState.addPendingMutation(o.batchId),(function(h,p,g){let y=h.du[h.currentUser.toKey()];y||(y=new nt(Pe)),y=y.insert(p,g),h.du[h.currentUser.toKey()]=y})(i,o.batchId,t),await cl(i,o.changes),await Lc(i.remoteStore)}catch(o){const l=Mf(o,"Failed to persist write");t.reject(l)}}async function Dv(r,e){const t=we(r);try{const i=await $I(t.localStore,e);e.targetChanges.forEach(((o,l)=>{const h=t.Au.get(l);h&&(ze(o.addedDocuments.size+o.modifiedDocuments.size+o.removedDocuments.size<=1,22616),o.addedDocuments.size>0?h.hu=!0:o.modifiedDocuments.size>0?ze(h.hu,14607):o.removedDocuments.size>0&&(ze(h.hu,42227),h.hu=!1))})),await cl(t,i,e)}catch(i){await Do(i)}}function Cy(r,e,t){const i=we(r);if(i.isPrimaryClient&&t===0||!i.isPrimaryClient&&t===1){const o=[];i.Tu.forEach(((l,h)=>{const p=h.view.va(e);p.snapshot&&o.push(p.snapshot)})),(function(h,p){const g=we(h);g.onlineState=p;let y=!1;g.queries.forEach(((E,I)=>{for(const x of I.Sa)x.va(p)&&(y=!0)})),y&&Ff(g)})(i.eventManager,e),o.length&&i.Pu.H_(o),i.onlineState=e,i.isPrimaryClient&&i.sharedClientState.setOnlineState(e)}}async function bS(r,e,t){const i=we(r);i.sharedClientState.updateQueryState(e,"rejected",t);const o=i.Au.get(e),l=o&&o.key;if(l){let h=new nt(ce.comparator);h=h.insert(l,Bt.newNoDocument(l,ve.min()));const p=Ne().add(l),g=new Vc(ve.min(),new Map,new nt(Pe),h,p);await Dv(i,g),i.Ru=i.Ru.remove(l),i.Au.delete(e),Bf(i)}else await nf(i.localStore,e,!1).then((()=>of(i,e,t))).catch(Do)}async function DS(r,e){const t=we(r),i=e.batch.batchId;try{const o=await BI(t.localStore,e);Ov(t,i,null),Vv(t,i),t.sharedClientState.updateMutationState(i,"acknowledged"),await cl(t,o)}catch(o){await Do(o)}}async function VS(r,e,t){const i=we(r);try{const o=await(function(h,p){const g=we(h);return g.persistence.runTransaction("Reject batch","readwrite-primary",(y=>{let E;return g.mutationQueue.lookupMutationBatch(y,p).next((I=>(ze(I!==null,37113),E=I.keys(),g.mutationQueue.removeMutationBatch(y,I)))).next((()=>g.mutationQueue.performConsistencyCheck(y))).next((()=>g.documentOverlayCache.removeOverlaysForBatchId(y,E,p))).next((()=>g.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(y,E))).next((()=>g.localDocuments.getDocuments(y,E)))}))})(i.localStore,e);Ov(i,e,t),Vv(i,e),i.sharedClientState.updateMutationState(e,"rejected",t),await cl(i,o)}catch(o){await Do(o)}}function Vv(r,e){(r.mu.get(e)||[]).forEach((t=>{t.resolve()})),r.mu.delete(e)}function Ov(r,e,t){const i=we(r);let o=i.du[i.currentUser.toKey()];if(o){const l=o.get(e);l&&(t?l.reject(t):l.resolve(),o=o.remove(e)),i.du[i.currentUser.toKey()]=o}}function of(r,e,t=null){r.sharedClientState.removeLocalQueryTarget(e);for(const i of r.Eu.get(e))r.Tu.delete(i),t&&r.Pu.yu(i,t);r.Eu.delete(e),r.isPrimaryClient&&r.Vu.Gr(e).forEach((i=>{r.Vu.containsKey(i)||Mv(r,i)}))}function Mv(r,e){r.Iu.delete(e.path.canonicalString());const t=r.Ru.get(e);t!==null&&(Nf(r.remoteStore,t),r.Ru=r.Ru.remove(e),r.Au.delete(t),Bf(r))}function Ry(r,e,t){for(const i of t)i instanceof Pv?(r.Vu.addReference(i.key,e),OS(r,i)):i instanceof Nv?(re(zf,"Document no longer in limbo: "+i.key),r.Vu.removeReference(i.key,e),r.Vu.containsKey(i.key)||Mv(r,i.key)):ge(19791,{wu:i})}function OS(r,e){const t=e.key,i=t.path.canonicalString();r.Ru.get(t)||r.Iu.has(i)||(re(zf,"New document in limbo: "+t),r.Iu.add(i),Bf(r))}function Bf(r){for(;r.Iu.size>0&&r.Ru.size<r.maxConcurrentLimboResolutions;){const e=r.Iu.values().next().value;r.Iu.delete(e);const t=new ce(Ge.fromString(e)),i=r.fu.next();r.Au.set(i,new SS(t)),r.Ru=r.Ru.insert(t,i),Sv(r.remoteStore,new Es(or(Cc(t.path)),i,"TargetPurposeLimboResolution",Ac.ce))}}async function cl(r,e,t){const i=we(r),o=[],l=[],h=[];i.Tu.isEmpty()||(i.Tu.forEach(((p,g)=>{h.push(i.pu(g,e,t).then((y=>{var E;if((y||t)&&i.isPrimaryClient){const I=y?!y.fromCache:(E=t==null?void 0:t.targetChanges.get(g.targetId))==null?void 0:E.current;i.sharedClientState.updateQueryState(g.targetId,I?"current":"not-current")}if(y){o.push(y);const I=Rf.Is(g.targetId,y);l.push(I)}})))})),await Promise.all(h),i.Pu.H_(o),await(async function(g,y){const E=we(g);try{await E.persistence.runTransaction("notifyLocalViewChanges","readwrite",(I=>W.forEach(y,(x=>W.forEach(x.Ts,(O=>E.persistence.referenceDelegate.addReference(I,x.targetId,O))).next((()=>W.forEach(x.Es,(O=>E.persistence.referenceDelegate.removeReference(I,x.targetId,O)))))))))}catch(I){if(!Vo(I))throw I;re(Pf,"Failed to update sequence numbers: "+I)}for(const I of y){const x=I.targetId;if(!I.fromCache){const O=E.vs.get(x),q=O.snapshotVersion,$=O.withLastLimboFreeSnapshotVersion(q);E.vs=E.vs.insert(x,$)}}})(i.localStore,l))}async function MS(r,e){const t=we(r);if(!t.currentUser.isEqual(e)){re(zf,"User change. New user:",e.toKey());const i=await Ev(t.localStore,e);t.currentUser=e,(function(l,h){l.mu.forEach((p=>{p.forEach((g=>{g.reject(new te(H.CANCELLED,h))}))})),l.mu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,i.removedBatchIds,i.addedBatchIds),await cl(t,i.Ns)}}function LS(r,e){const t=we(r),i=t.Au.get(e);if(i&&i.hu)return Ne().add(i.key);{let o=Ne();const l=t.Eu.get(e);if(!l)return o;for(const h of l){const p=t.Tu.get(h);o=o.unionWith(p.view.nu)}return o}}function Lv(r){const e=we(r);return e.remoteStore.remoteSyncer.applyRemoteEvent=Dv.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=LS.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=bS.bind(null,e),e.Pu.H_=ES.bind(null,e.eventManager),e.Pu.yu=wS.bind(null,e.eventManager),e}function jS(r){const e=we(r);return e.remoteStore.remoteSyncer.applySuccessfulWrite=DS.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=VS.bind(null,e),e}class uc{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Oc(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return zI(this.persistence,new jI,e.initialUser,this.serializer)}Cu(e){return new vv(Cf.Vi,this.serializer)}Du(e){return new KI}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}uc.provider={build:()=>new uc};class FS extends uc{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){ze(this.persistence.referenceDelegate instanceof ac,46915);const i=this.persistence.referenceDelegate.garbageCollector;return new II(i,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?tn.withCacheSize(this.cacheSizeBytes):tn.DEFAULT;return new vv((i=>ac.Vi(i,t)),this.serializer)}}class af{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=i=>Cy(this.syncEngine,i,1),this.remoteStore.remoteSyncer.handleCredentialChange=MS.bind(null,this.syncEngine),await yS(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new vS})()}createDatastore(e){const t=Oc(e.databaseInfo.databaseId),i=ZI(e.databaseInfo);return sS(e.authCredentials,e.appCheckCredentials,i,t)}createRemoteStore(e){return(function(i,o,l,h,p){return new oS(i,o,l,h,p)})(this.localStore,this.datastore,e.asyncQueue,(t=>Cy(this.syncEngine,t,0)),(function(){return Ty.v()?new Ty:new QI})())}createSyncEngine(e,t){return(function(o,l,h,p,g,y,E){const I=new AS(o,l,h,p,g,y);return E&&(I.gu=!0),I})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await(async function(o){const l=we(o);re(Ei,"RemoteStore shutting down."),l.Ia.add(5),await ul(l),l.Aa.shutdown(),l.Va.set("Unknown")})(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}af.provider={build:()=>new af};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $f{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):Mr("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ns="FirestoreClient";class US{constructor(e,t,i,o,l){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=i,this._databaseInfo=o,this.user=zt.UNAUTHENTICATED,this.clientId=yf.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=l,this.authCredentials.start(i,(async h=>{re(Ns,"Received user=",h.uid),await this.authCredentialListener(h),this.user=h})),this.appCheckCredentials.start(i,(h=>(re(Ns,"Received new app check token=",h),this.appCheckCredentialListener(h,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Vr;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const i=Mf(t,"Failed to shutdown persistence");e.reject(i)}})),e.promise}}async function bd(r,e){r.asyncQueue.verifyOperationInProgress(),re(Ns,"Initializing OfflineComponentProvider");const t=r.configuration;await e.initialize(t);let i=t.initialUser;r.setCredentialChangeListener((async o=>{i.isEqual(o)||(await Ev(e.localStore,o),i=o)})),e.persistence.setDatabaseDeletedListener((()=>r.terminate())),r._offlineComponents=e}async function Py(r,e){r.asyncQueue.verifyOperationInProgress();const t=await zS(r);re(Ns,"Initializing OnlineComponentProvider"),await e.initialize(t,r.configuration),r.setCredentialChangeListener((i=>Sy(e.remoteStore,i))),r.setAppCheckTokenChangeListener(((i,o)=>Sy(e.remoteStore,o))),r._onlineComponents=e}async function zS(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){re(Ns,"Using user provided OfflineComponentProvider");try{await bd(r,r._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(o){return o.name==="FirebaseError"?o.code===H.FAILED_PRECONDITION||o.code===H.UNIMPLEMENTED:!(typeof DOMException<"u"&&o instanceof DOMException)||o.code===22||o.code===20||o.code===11})(t))throw t;vi("Error using user provided cache. Falling back to memory cache: "+t),await bd(r,new uc)}}else re(Ns,"Using default OfflineComponentProvider"),await bd(r,new FS(void 0));return r._offlineComponents}async function jv(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(re(Ns,"Using user provided OnlineComponentProvider"),await Py(r,r._uninitializedComponentsProvider._online)):(re(Ns,"Using default OnlineComponentProvider"),await Py(r,new af))),r._onlineComponents}function BS(r){return jv(r).then((e=>e.syncEngine))}async function cc(r){const e=await jv(r),t=e.eventManager;return t.onListen=xS.bind(null,e.syncEngine),t.onUnlisten=RS.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=kS.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=PS.bind(null,e.syncEngine),t}function $S(r,e,t,i){const o=new $f(i),l=new Uf(e,o,t);return r.asyncQueue.enqueueAndForget((async()=>Lf(await cc(r),l))),()=>{o.Nu(),r.asyncQueue.enqueueAndForget((async()=>jf(await cc(r),l)))}}function qS(r,e,t={}){const i=new Vr;return r.asyncQueue.enqueueAndForget((async()=>(function(l,h,p,g,y){const E=new $f({next:x=>{E.Nu(),h.enqueueAndForget((()=>jf(l,I)));const O=x.docs.has(p);!O&&x.fromCache?y.reject(new te(H.UNAVAILABLE,"Failed to get document because the client is offline.")):O&&x.fromCache&&g&&g.source==="server"?y.reject(new te(H.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):y.resolve(x)},error:x=>y.reject(x)}),I=new Uf(Cc(p.path),E,{includeMetadataChanges:!0,qa:!0});return Lf(l,I)})(await cc(r),r.asyncQueue,e,t,i))),i.promise}function HS(r,e,t={}){const i=new Vr;return r.asyncQueue.enqueueAndForget((async()=>(function(l,h,p,g,y){const E=new $f({next:x=>{E.Nu(),h.enqueueAndForget((()=>jf(l,I))),x.fromCache&&g.source==="server"?y.reject(new te(H.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):y.resolve(x)},error:x=>y.reject(x)}),I=new Uf(p,E,{includeMetadataChanges:!0,qa:!0});return Lf(l,I)})(await cc(r),r.asyncQueue,e,t,i))),i.promise}function WS(r,e){const t=new Vr;return r.asyncQueue.enqueueAndForget((async()=>NS(await BS(r),e,t))),t.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fv(r){const e={};return r.timeoutSeconds!==void 0&&(e.timeoutSeconds=r.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GS="ComponentProvider",Ny=new Map;function KS(r,e,t,i,o){return new fT(r,e,t,o.host,o.ssl,o.experimentalForceLongPolling,o.experimentalAutoDetectLongPolling,Fv(o.experimentalLongPollingOptions),o.useFetchStreams,o.isUsingEmulator,i)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uv="firestore.googleapis.com",by=!0;class Dy{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new te(H.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Uv,this.ssl=by}else this.host=e.host,this.ssl=e.ssl??by;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=_v;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<wI)throw new te(H.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}nT("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Fv(e.experimentalLongPollingOptions??{}),(function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new te(H.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new te(H.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new te(H.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(i,o){return i.timeoutSeconds===o.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class jc{constructor(e,t,i,o){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=i,this._app=o,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Dy({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new te(H.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new te(H.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Dy(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(i){if(!i)return new W1;switch(i.type){case"firstParty":return new Y1(i.sessionIndex||"0",i.iamToken||null,i.authTokenFactory||null);case"provider":return i.client;default:throw new te(H.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const i=Ny.get(t);i&&(re(GS,"Removing Datastore"),Ny.delete(t),i.terminate())})(this),Promise.resolve()}}function QS(r,e,t,i={}){var y;r=Gt(r,jc);const o=sl(e),l=r._getSettings(),h={...l,emulatorOptions:r._getEmulatorOptions()},p=`${e}:${t}`;o&&m_(`https://${p}`),l.host!==Uv&&l.host!==p&&vi("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const g={...l,host:p,ssl:o,emulatorOptions:i};if(!gi(g,h)&&(r._setSettings(g),i.mockUserToken)){let E,I;if(typeof i.mockUserToken=="string")E=i.mockUserToken,I=zt.MOCK_USER;else{E=Ew(i.mockUserToken,(y=r._app)==null?void 0:y.options.projectId);const x=i.mockUserToken.sub||i.mockUserToken.user_id;if(!x)throw new te(H.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");I=new zt(x)}r._authCredentials=new G1(new R_(E,I))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Si{constructor(e,t,i){this.converter=t,this._query=i,this.type="query",this.firestore=e}withConverter(e){return new Si(this.firestore,e,this._query)}}class it{constructor(e,t,i){this.converter=t,this._key=i,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new As(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new it(this.firestore,e,this._key)}toJSON(){return{type:it._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,i){if(il(t,it._jsonSchema))return new it(e,i||null,new ce(Ge.fromString(t.referencePath)))}}it._jsonSchemaVersion="firestore/documentReference/1.0",it._jsonSchema={type:yt("string",it._jsonSchemaVersion),referencePath:yt("string")};class As extends Si{constructor(e,t,i){super(e,t,Cc(i)),this._path=i,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new it(this.firestore,null,new ce(e))}withConverter(e){return new As(this.firestore,e,this._path)}}function qf(r,e,...t){if(r=_t(r),P_("collection","path",e),r instanceof jc){const i=Ge.fromString(e,...t);return Wg(i),new As(r,null,i)}{if(!(r instanceof it||r instanceof As))throw new te(H.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=r._path.child(Ge.fromString(e,...t));return Wg(i),new As(r.firestore,null,i)}}function Mo(r,e,...t){if(r=_t(r),arguments.length===1&&(e=yf.newId()),P_("doc","path",e),r instanceof jc){const i=Ge.fromString(e,...t);return Hg(i),new it(r,null,new ce(i))}{if(!(r instanceof it||r instanceof As))throw new te(H.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=r._path.child(Ge.fromString(e,...t));return Hg(i),new it(r.firestore,r instanceof As?r.converter:null,new ce(i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vy="AsyncQueue";class Oy{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Tv(this,"async_queue_retry"),this._c=()=>{const i=Nd();i&&re(Vy,"Visibility state changed to "+i.visibilityState),this.M_.w_()},this.ac=e;const t=Nd();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=Nd();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise((()=>{}));const t=new Vr;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Yu.push(e),this.lc())))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!Vo(e))throw e;re(Vy,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_((()=>this.lc()))}}cc(e){const t=this.ac.then((()=>(this.rc=!0,e().catch((i=>{throw this.nc=i,this.rc=!1,Mr("INTERNAL UNHANDLED ERROR: ",My(i)),i})).then((i=>(this.rc=!1,i))))));return this.ac=t,t}enqueueAfterDelay(e,t,i){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const o=Of.createAndSchedule(this,e,t,i,(l=>this.hc(l)));return this.tc.push(o),o}uc(){this.nc&&ge(47125,{Pc:My(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ec(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ic(e){return this.Tc().then((()=>{this.tc.sort(((t,i)=>t.targetTimeMs-i.targetTimeMs));for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()}))}Rc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function My(r){let e=r.message||"";return r.stack&&(e=r.stack.includes(r.message)?r.stack:r.message+`
`+r.stack),e}class hr extends jc{constructor(e,t,i,o){super(e,t,i,o),this.type="firestore",this._queue=new Oy,this._persistenceKey=(o==null?void 0:o.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Oy(e),this._firestoreClient=void 0,await e}}}function YS(r,e){const t=typeof r=="object"?r:v_(),i=typeof r=="string"?r:tc,o=mf(t,"firestore").getImmediate({identifier:i});if(!o._initialized){const l=_w("firestore");l&&QS(o,...l)}return o}function hl(r){if(r._terminated)throw new te(H.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||JS(r),r._firestoreClient}function JS(r){var i,o,l,h;const e=r._freezeSettings(),t=KS(r._databaseId,((i=r._app)==null?void 0:i.options.appId)||"",r._persistenceKey,(o=r._app)==null?void 0:o.options.apiKey,e);r._componentsProvider||(l=e.localCache)!=null&&l._offlineComponentProvider&&((h=e.localCache)!=null&&h._onlineComponentProvider)&&(r._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),r._firestoreClient=new US(r._authCredentials,r._appCheckCredentials,r._queue,t,r._componentsProvider&&(function(g){const y=g==null?void 0:g._online.build();return{_offline:g==null?void 0:g._offline.build(y),_online:y}})(r._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Sn(Dt.fromBase64String(e))}catch(t){throw new te(H.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Sn(Dt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Sn._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(il(e,Sn._jsonSchema))return Sn.fromBase64String(e.bytes)}}Sn._jsonSchemaVersion="firestore/bytes/1.0",Sn._jsonSchema={type:yt("string",Sn._jsonSchemaVersion),bytes:yt("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fc{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new te(H.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new bt(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uc{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lr{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new te(H.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new te(H.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return Pe(this._lat,e._lat)||Pe(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:lr._jsonSchemaVersion}}static fromJSON(e){if(il(e,lr._jsonSchema))return new lr(e.latitude,e.longitude)}}lr._jsonSchemaVersion="firestore/geoPoint/1.0",lr._jsonSchema={type:yt("string",lr._jsonSchemaVersion),latitude:yt("number"),longitude:yt("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jn{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(i,o){if(i.length!==o.length)return!1;for(let l=0;l<i.length;++l)if(i[l]!==o[l])return!1;return!0})(this._values,e._values)}toJSON(){return{type:jn._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(il(e,jn._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new jn(e.vectorValues);throw new te(H.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}jn._jsonSchemaVersion="firestore/vectorValue/1.0",jn._jsonSchema={type:yt("string",jn._jsonSchemaVersion),vectorValues:yt("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XS=/^__.*__$/;class ZS{constructor(e,t,i){this.data=e,this.fieldMask=t,this.fieldTransforms=i}toMutation(e,t){return this.fieldMask!==null?new Vs(e,this.data,this.fieldMask,t,this.fieldTransforms):new al(e,this.data,t,this.fieldTransforms)}}class zv{constructor(e,t,i){this.data=e,this.fieldMask=t,this.fieldTransforms=i}toMutation(e,t){return new Vs(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Bv(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw ge(40011,{dataSource:r})}}class Hf{constructor(e,t,i,o,l,h){this.settings=e,this.databaseId=t,this.serializer=i,this.ignoreUndefinedProperties=o,l===void 0&&this.Ac(),this.fieldTransforms=l||[],this.fieldMask=h||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new Hf({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}dc(e){var o;const t=(o=this.path)==null?void 0:o.child(e),i=this.i({path:t,arrayElement:!1});return i.mc(e),i}fc(e){var o;const t=(o=this.path)==null?void 0:o.child(e),i=this.i({path:t,arrayElement:!1});return i.Ac(),i}gc(e){return this.i({path:void 0,arrayElement:!0})}yc(e){return hc(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.mc(this.path.get(e))}mc(e){if(e.length===0)throw this.yc("Document fields must not be empty");if(Bv(this.dataSource)&&XS.test(e))throw this.yc('Document fields cannot begin and end with "__"')}}class eA{constructor(e,t,i){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=i||Oc(e)}I(e,t,i,o=!1){return new Hf({dataSource:e,methodName:t,targetDoc:i,path:bt.emptyPath(),arrayElement:!1,hasConverter:o},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function dl(r){const e=r._freezeSettings(),t=Oc(r._databaseId);return new eA(r._databaseId,!!e.ignoreUndefinedProperties,t)}function Wf(r,e,t,i,o,l={}){const h=r.I(l.merge||l.mergeFields?2:0,e,t,o);Kf("Data must be an object, but it was:",h,i);const p=Hv(i,h);let g,y;if(l.merge)g=new mn(h.fieldMask),y=h.fieldTransforms;else if(l.mergeFields){const E=[];for(const I of l.mergeFields){const x=Ro(e,I,t);if(!h.contains(x))throw new te(H.INVALID_ARGUMENT,`Field '${x}' is specified in your field mask but missing from your input data.`);Kv(E,x)||E.push(x)}g=new mn(E),y=h.fieldTransforms.filter((I=>g.covers(I.field)))}else g=null,y=h.fieldTransforms;return new ZS(new nn(p),g,y)}class zc extends Uc{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.yc(`${this._methodName}() can only appear at the top level of your update data`):e.yc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof zc}}class Gf extends Uc{_toFieldTransform(e){return new zT(e.path,new Ya)}isEqual(e){return e instanceof Gf}}function $v(r,e,t,i){const o=r.I(1,e,t);Kf("Data must be an object, but it was:",o,i);const l=[],h=nn.empty();Ds(i,((g,y)=>{const E=Gv(e,g,t);y=_t(y);const I=o.fc(E);if(y instanceof zc)l.push(E);else{const x=fl(y,I);x!=null&&(l.push(E),h.set(E,x))}}));const p=new mn(l);return new zv(h,p,o.fieldTransforms)}function qv(r,e,t,i,o,l){const h=r.I(1,e,t),p=[Ro(e,i,t)],g=[o];if(l.length%2!=0)throw new te(H.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let x=0;x<l.length;x+=2)p.push(Ro(e,l[x])),g.push(l[x+1]);const y=[],E=nn.empty();for(let x=p.length-1;x>=0;--x)if(!Kv(y,p[x])){const O=p[x];let q=g[x];q=_t(q);const $=h.fc(O);if(q instanceof zc)y.push(O);else{const B=fl(q,$);B!=null&&(y.push(O),E.set(O,B))}}const I=new mn(y);return new zv(E,I,h.fieldTransforms)}function tA(r,e,t,i=!1){return fl(t,r.I(i?4:3,e))}function fl(r,e){if(Wv(r=_t(r)))return Kf("Unsupported field value:",e,r),Hv(r,e);if(r instanceof Uc)return(function(i,o){if(!Bv(o.dataSource))throw o.yc(`${i._methodName}() can only be used with update() and set()`);if(!o.path)throw o.yc(`${i._methodName}() is not currently supported inside arrays`);const l=i._toFieldTransform(o);l&&o.fieldTransforms.push(l)})(r,e),null;if(r===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),r instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.yc("Nested arrays are not supported");return(function(i,o){const l=[];let h=0;for(const p of i){let g=fl(p,o.gc(h));g==null&&(g={nullValue:"NULL_VALUE"}),l.push(g),h++}return{arrayValue:{values:l}}})(r,e)}return(function(i,o){if((i=_t(i))===null)return{nullValue:"NULL_VALUE"};if(typeof i=="number")return jT(o.serializer,i);if(typeof i=="boolean")return{booleanValue:i};if(typeof i=="string")return{stringValue:i};if(i instanceof Date){const l=Je.fromDate(i);return{timestampValue:oc(o.serializer,l)}}if(i instanceof Je){const l=new Je(i.seconds,1e3*Math.floor(i.nanoseconds/1e3));return{timestampValue:oc(o.serializer,l)}}if(i instanceof lr)return{geoPointValue:{latitude:i.latitude,longitude:i.longitude}};if(i instanceof Sn)return{bytesValue:cv(o.serializer,i._byteString)};if(i instanceof it){const l=o.databaseId,h=i.firestore._databaseId;if(!h.isEqual(l))throw o.yc(`Document reference is for database ${h.projectId}/${h.database} but should be for database ${l.projectId}/${l.database}`);return{referenceValue:xf(i.firestore._databaseId||o.databaseId,i._key.path)}}if(i instanceof jn)return(function(h,p){const g=h instanceof jn?h.toArray():h;return{mapValue:{fields:{[F_]:{stringValue:U_},[nc]:{arrayValue:{values:g.map((E=>{if(typeof E!="number")throw p.yc("VectorValues must only contain numeric values.");return If(p.serializer,E)}))}}}}}})(i,o);if(yv(i))return i._toProto(o.serializer);throw o.yc(`Unsupported field value: ${Sc(i)}`)})(r,e)}function Hv(r,e){const t={};return D_(r)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Ds(r,((i,o)=>{const l=fl(o,e.dc(i));l!=null&&(t[i]=l)})),{mapValue:{fields:t}}}function Wv(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof Je||r instanceof lr||r instanceof Sn||r instanceof it||r instanceof Uc||r instanceof jn||yv(r))}function Kf(r,e,t){if(!Wv(t)||!N_(t)){const i=Sc(t);throw i==="an object"?e.yc(r+" a custom object"):e.yc(r+" "+i)}}function Ro(r,e,t){if((e=_t(e))instanceof Fc)return e._internalPath;if(typeof e=="string")return Gv(r,e);throw hc("Field path arguments must be of type string or ",r,!1,void 0,t)}const nA=new RegExp("[~\\*/\\[\\]]");function Gv(r,e,t){if(e.search(nA)>=0)throw hc(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,t);try{return new Fc(...e.split("."))._internalPath}catch{throw hc(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,t)}}function hc(r,e,t,i,o){const l=i&&!i.isEmpty(),h=o!==void 0;let p=`Function ${e}() called with invalid data`;t&&(p+=" (via `toFirestore()`)"),p+=". ";let g="";return(l||h)&&(g+=" (found",l&&(g+=` in field ${i}`),h&&(g+=` in document ${o}`),g+=")"),new te(H.INVALID_ARGUMENT,p+r+g)}function Kv(r,e){return r.some((t=>t.isEqual(e)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rA{convertValue(e,t="none"){switch(Rs(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ut(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Cs(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw ge(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const i={};return Ds(e,((o,l)=>{i[o]=this.convertValue(l,t)})),i}convertVectorValue(e){var i,o,l;const t=(l=(o=(i=e.fields)==null?void 0:i[nc].arrayValue)==null?void 0:o.values)==null?void 0:l.map((h=>ut(h.doubleValue)));return new jn(t)}convertGeoPoint(e){return new lr(ut(e.latitude),ut(e.longitude))}convertArray(e,t){return(e.values||[]).map((i=>this.convertValue(i,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const i=kc(e);return i==null?null:this.convertValue(i,t);case"estimate":return this.convertTimestamp(Ga(e));default:return null}}convertTimestamp(e){const t=ks(e);return new Je(t.seconds,t.nanos)}convertDocumentKey(e,t){const i=Ge.fromString(e);ze(gv(i),9688,{name:e});const o=new Ka(i.get(1),i.get(3)),l=new ce(i.popFirst(5));return o.isEqual(t)||Mr(`Document ${l} contains a document reference within a different database (${o.projectId}/${o.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),l}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qf extends rA{constructor(e){super(),this.firestore=e}convertBytes(e){return new Sn(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new it(this.firestore,null,t)}}function Za(){return new Gf("serverTimestamp")}const Ly="@firebase/firestore",jy="4.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fy(r){return(function(t,i){if(typeof t!="object"||t===null)return!1;const o=t;for(const l of i)if(l in o&&typeof o[l]=="function")return!0;return!1})(r,["next","error","complete"])}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qv{constructor(e,t,i,o,l){this._firestore=e,this._userDataWriter=t,this._key=i,this._document=o,this._converter=l}get id(){return this._key.path.lastSegment()}get ref(){return new it(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new sA(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(Ro("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class sA extends Qv{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yv(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new te(H.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Yf{}class iA extends Yf{}function oA(r,e,...t){let i=[];e instanceof Yf&&i.push(e),i=i.concat(t),(function(l){const h=l.filter((g=>g instanceof Jf)).length,p=l.filter((g=>g instanceof Bc)).length;if(h>1||h>0&&p>0)throw new te(H.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(i);for(const o of i)r=o._apply(r);return r}class Bc extends iA{constructor(e,t,i){super(),this._field=e,this._op=t,this._value=i,this.type="where"}static _create(e,t,i){return new Bc(e,t,i)}_apply(e){const t=this._parse(e);return Jv(e._query,t),new Si(e.firestore,e.converter,Yd(e._query,t))}_parse(e){const t=dl(e.firestore);return(function(l,h,p,g,y,E,I){let x;if(y.isKeyField()){if(E==="array-contains"||E==="array-contains-any")throw new te(H.INVALID_ARGUMENT,`Invalid Query. You can't perform '${E}' queries on documentId().`);if(E==="in"||E==="not-in"){zy(I,E);const q=[];for(const $ of I)q.push(Uy(g,l,$));x={arrayValue:{values:q}}}else x=Uy(g,l,I)}else E!=="in"&&E!=="not-in"&&E!=="array-contains-any"||zy(I,E),x=tA(p,h,I,E==="in"||E==="not-in");return gt.create(y,E,x)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function aA(r,e,t){const i=e,o=Ro("where",r);return Bc._create(o,i,t)}class Jf extends Yf{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Jf(e,t)}_parse(e){const t=this._queryConstraints.map((i=>i._parse(e))).filter((i=>i.getFilters().length>0));return t.length===1?t[0]:Un.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(o,l){let h=o;const p=l.getFlattenedFilters();for(const g of p)Jv(h,g),h=Yd(h,g)})(e._query,t),new Si(e.firestore,e.converter,Yd(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function Uy(r,e,t){if(typeof(t=_t(t))=="string"){if(t==="")throw new te(H.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!K_(e)&&t.indexOf("/")!==-1)throw new te(H.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const i=e.path.child(Ge.fromString(t));if(!ce.isDocumentKey(i))throw new te(H.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${i}' is not because it has an odd number of segments (${i.length}).`);return ey(r,new ce(i))}if(t instanceof it)return ey(r,t._key);throw new te(H.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Sc(t)}.`)}function zy(r,e){if(!Array.isArray(r)||r.length===0)throw new te(H.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Jv(r,e){const t=(function(o,l){for(const h of o)for(const p of h.getFlattenedFilters())if(l.indexOf(p.op)>=0)return p.op;return null})(r.filters,(function(o){switch(o){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new te(H.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new te(H.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function Xf(r,e,t){let i;return i=r?t&&(t.merge||t.mergeFields)?r.toFirestore(e,t):r.toFirestore(e):e,i}class Fa{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class fi extends Qv{constructor(e,t,i,o,l,h){super(e,t,i,o,h),this._firestore=e,this._firestoreImpl=e,this.metadata=l}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Gu(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const i=this._document.data.field(Ro("DocumentSnapshot.get",e));if(i!==null)return this._userDataWriter.convertValue(i,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new te(H.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=fi._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}fi._jsonSchemaVersion="firestore/documentSnapshot/1.0",fi._jsonSchema={type:yt("string",fi._jsonSchemaVersion),bundleSource:yt("string","DocumentSnapshot"),bundleName:yt("string"),bundle:yt("string")};class Gu extends fi{data(e={}){return super.data(e)}}class pi{constructor(e,t,i,o){this._firestore=e,this._userDataWriter=t,this._snapshot=o,this.metadata=new Fa(o.hasPendingWrites,o.fromCache),this.query=i}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((i=>{e.call(t,new Gu(this._firestore,this._userDataWriter,i.key,i,new Fa(this._snapshot.mutatedKeys.has(i.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new te(H.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(o,l){if(o._snapshot.oldDocs.isEmpty()){let h=0;return o._snapshot.docChanges.map((p=>{const g=new Gu(o._firestore,o._userDataWriter,p.doc.key,p.doc,new Fa(o._snapshot.mutatedKeys.has(p.doc.key),o._snapshot.fromCache),o.query.converter);return p.doc,{type:"added",doc:g,oldIndex:-1,newIndex:h++}}))}{let h=o._snapshot.oldDocs;return o._snapshot.docChanges.filter((p=>l||p.type!==3)).map((p=>{const g=new Gu(o._firestore,o._userDataWriter,p.doc.key,p.doc,new Fa(o._snapshot.mutatedKeys.has(p.doc.key),o._snapshot.fromCache),o.query.converter);let y=-1,E=-1;return p.type!==0&&(y=h.indexOf(p.doc.key),h=h.delete(p.doc.key)),p.type!==1&&(h=h.add(p.doc),E=h.indexOf(p.doc.key)),{type:lA(p.type),doc:g,oldIndex:y,newIndex:E}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new te(H.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=pi._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=yf.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],i=[],o=[];return this.docs.forEach((l=>{l._document!==null&&(t.push(l._document),i.push(this._userDataWriter.convertObjectMap(l._document.data.value.mapValue.fields,"previous")),o.push(l.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function lA(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return ge(61501,{type:r})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */pi._jsonSchemaVersion="firestore/querySnapshot/1.0",pi._jsonSchema={type:yt("string",pi._jsonSchemaVersion),bundleSource:yt("string","QuerySnapshot"),bundleName:yt("string"),bundle:yt("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uA{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=dl(e)}set(e,t,i){this._verifyNotCommitted();const o=Dd(e,this._firestore),l=Xf(o.converter,t,i),h=Wf(this._dataReader,"WriteBatch.set",o._key,l,o.converter!==null,i);return this._mutations.push(h.toMutation(o._key,Kt.none())),this}update(e,t,i,...o){this._verifyNotCommitted();const l=Dd(e,this._firestore);let h;return h=typeof(t=_t(t))=="string"||t instanceof Fc?qv(this._dataReader,"WriteBatch.update",l._key,t,i,o):$v(this._dataReader,"WriteBatch.update",l._key,t),this._mutations.push(h.toMutation(l._key,Kt.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=Dd(e,this._firestore);return this._mutations=this._mutations.concat(new Dc(t._key,Kt.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new te(H.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Dd(r,e){if((r=_t(r)).firestore!==e)throw new te(H.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cA(r){r=Gt(r,it);const e=Gt(r.firestore,hr),t=hl(e);return qS(t,r._key).then((i=>n0(e,r,i)))}function Vd(r){r=Gt(r,Si);const e=Gt(r.firestore,hr),t=hl(e),i=new Qf(e);return Yv(r._query),HS(t,r._query).then((o=>new pi(e,i,r,o)))}function Xv(r,e,t){r=Gt(r,it);const i=Gt(r.firestore,hr),o=Xf(r.converter,e,t),l=dl(i);return pl(i,[Wf(l,"setDoc",r._key,o,r.converter!==null,t).toMutation(r._key,Kt.none())])}function Zv(r,e,t,...i){r=Gt(r,it);const o=Gt(r.firestore,hr),l=dl(o);let h;return h=typeof(e=_t(e))=="string"||e instanceof Fc?qv(l,"updateDoc",r._key,e,t,i):$v(l,"updateDoc",r._key,e),pl(o,[h.toMutation(r._key,Kt.exists(!0))])}function e0(r){return pl(Gt(r.firestore,hr),[new Dc(r._key,Kt.none())])}function t0(r,e){const t=Gt(r.firestore,hr),i=Mo(r),o=Xf(r.converter,e),l=dl(r.firestore);return pl(t,[Wf(l,"addDoc",i._key,o,r.converter!==null,{}).toMutation(i._key,Kt.exists(!1))]).then((()=>i))}function $c(r,...e){var y,E,I;r=_t(r);let t={includeMetadataChanges:!1,source:"default"},i=0;typeof e[i]!="object"||Fy(e[i])||(t=e[i++]);const o={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(Fy(e[i])){const x=e[i];e[i]=(y=x.next)==null?void 0:y.bind(x),e[i+1]=(E=x.error)==null?void 0:E.bind(x),e[i+2]=(I=x.complete)==null?void 0:I.bind(x)}let l,h,p;if(r instanceof it)h=Gt(r.firestore,hr),p=Cc(r._key.path),l={next:x=>{e[i]&&e[i](n0(h,r,x))},error:e[i+1],complete:e[i+2]};else{const x=Gt(r,Si);h=Gt(x.firestore,hr),p=x._query;const O=new Qf(h);l={next:q=>{e[i]&&e[i](new pi(h,O,x,q))},error:e[i+1],complete:e[i+2]},Yv(r._query)}const g=hl(h);return $S(g,p,o,l)}function pl(r,e){const t=hl(r);return WS(t,e)}function n0(r,e,t){const i=t.docs.get(e._key),o=new Qf(r);return new fi(r,o,e._key,i,new Fa(t.hasPendingWrites,t.fromCache),e.converter)}function hA(r){return r=Gt(r,hr),hl(r),new uA(r,(e=>pl(r,e)))}(function(e,t=!0){H1(No),Io(new yi("firestore",((i,{instanceIdentifier:o,options:l})=>{const h=i.getProvider("app").getImmediate(),p=new hr(new K1(i.getProvider("auth-internal")),new J1(h,i.getProvider("app-check-internal")),pT(h,o),h);return l={useFetchStreams:t,...l},p._setSettings(l),p}),"PUBLIC").setMultipleInstances(!0)),Is(Ly,jy,e),Is(Ly,jy,"esm2020")})();var dA="firebase",fA="12.12.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Is(dA,fA,"app");function r0(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const pA=r0,s0=new nl("auth","Firebase",r0());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dc=new ff("@firebase/auth");function mA(r,...e){dc.logLevel<=Re.WARN&&dc.warn(`Auth (${No}): ${r}`,...e)}function Ku(r,...e){dc.logLevel<=Re.ERROR&&dc.error(`Auth (${No}): ${r}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dr(r,...e){throw ep(r,...e)}function Fn(r,...e){return ep(r,...e)}function Zf(r,e,t){const i={...pA(),[e]:t};return new nl("auth","Firebase",i).create(e,{appName:r.name})}function mi(r){return Zf(r,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function gA(r,e,t){const i=t;if(!(e instanceof i))throw i.name!==e.constructor.name&&dr(r,"argument-error"),Zf(r,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function ep(r,...e){if(typeof r!="string"){const t=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=r.name),r._errorFactory.create(t,...i)}return s0.create(r,...e)}function _e(r,e,...t){if(!r)throw ep(e,...t)}function br(r){const e="INTERNAL ASSERTION FAILED: "+r;throw Ku(e),new Error(e)}function jr(r,e){r||br(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lf(){var r;return typeof self<"u"&&((r=self.location)==null?void 0:r.href)||""}function yA(){return By()==="http:"||By()==="https:"}function By(){var r;return typeof self<"u"&&((r=self.location)==null?void 0:r.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _A(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(yA()||Sw()||"connection"in navigator)?navigator.onLine:!0}function vA(){if(typeof navigator>"u")return null;const r=navigator;return r.languages&&r.languages[0]||r.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ml{constructor(e,t){this.shortDelay=e,this.longDelay=t,jr(t>e,"Short delay should be less than long delay!"),this.isMobile=ww()||Aw()}get(){return _A()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tp(r,e){jr(r.emulator,"Emulator should always be set here");const{url:t}=r.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i0{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;br("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;br("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;br("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const EA={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wA=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],TA=new ml(3e4,6e4);function np(r,e){return r.tenantId&&!e.tenantId?{...e,tenantId:r.tenantId}:e}async function Lo(r,e,t,i,o={}){return o0(r,o,async()=>{let l={},h={};i&&(e==="GET"?h=i:l={body:JSON.stringify(i)});const p=rl({key:r.config.apiKey,...h}).slice(1),g=await r._getAdditionalHeaders();g["Content-Type"]="application/json",r.languageCode&&(g["X-Firebase-Locale"]=r.languageCode);const y={method:e,headers:g,...l};return Iw()||(y.referrerPolicy="no-referrer"),r.emulatorConfig&&sl(r.emulatorConfig.host)&&(y.credentials="include"),i0.fetch()(await a0(r,r.config.apiHost,t,p),y)})}async function o0(r,e,t){r._canInitEmulator=!1;const i={...EA,...e};try{const o=new SA(r),l=await Promise.race([t(),o.promise]);o.clearNetworkTimeout();const h=await l.json();if("needConfirmation"in h)throw zu(r,"account-exists-with-different-credential",h);if(l.ok&&!("errorMessage"in h))return h;{const p=l.ok?h.errorMessage:h.error.message,[g,y]=p.split(" : ");if(g==="FEDERATED_USER_ID_ALREADY_LINKED")throw zu(r,"credential-already-in-use",h);if(g==="EMAIL_EXISTS")throw zu(r,"email-already-in-use",h);if(g==="USER_DISABLED")throw zu(r,"user-disabled",h);const E=i[g]||g.toLowerCase().replace(/[_\s]+/g,"-");if(y)throw Zf(r,E,y);dr(r,E)}}catch(o){if(o instanceof Fr)throw o;dr(r,"network-request-failed",{message:String(o)})}}async function IA(r,e,t,i,o={}){const l=await Lo(r,e,t,i,o);return"mfaPendingCredential"in l&&dr(r,"multi-factor-auth-required",{_serverResponse:l}),l}async function a0(r,e,t,i){const o=`${e}${t}?${i}`,l=r,h=l.config.emulator?tp(r.config,o):`${r.config.apiScheme}://${o}`;return wA.includes(t)&&(await l._persistenceManagerAvailable,l._getPersistenceType()==="COOKIE")?l._getPersistence()._getFinalTarget(h).toString():h}class SA{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,i)=>{this.timer=setTimeout(()=>i(Fn(this.auth,"network-request-failed")),TA.get())})}}function zu(r,e,t){const i={appName:r.name};t.email&&(i.email=t.email),t.phoneNumber&&(i.phoneNumber=t.phoneNumber);const o=Fn(r,e,i);return o.customData._tokenResponse=t,o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function AA(r,e){return Lo(r,"POST","/v1/accounts:delete",e)}async function fc(r,e){return Lo(r,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qa(r){if(r)try{const e=new Date(Number(r));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function xA(r,e=!1){const t=_t(r),i=await t.getIdToken(e),o=rp(i);_e(o&&o.exp&&o.auth_time&&o.iat,t.auth,"internal-error");const l=typeof o.firebase=="object"?o.firebase:void 0,h=l==null?void 0:l.sign_in_provider;return{claims:o,token:i,authTime:qa(Od(o.auth_time)),issuedAtTime:qa(Od(o.iat)),expirationTime:qa(Od(o.exp)),signInProvider:h||null,signInSecondFactor:(l==null?void 0:l.sign_in_second_factor)||null}}function Od(r){return Number(r)*1e3}function rp(r){const[e,t,i]=r.split(".");if(e===void 0||t===void 0||i===void 0)return Ku("JWT malformed, contained fewer than 3 sections"),null;try{const o=h_(t);return o?JSON.parse(o):(Ku("Failed to decode base64 JWT payload"),null)}catch(o){return Ku("Caught error parsing JWT payload as JSON",o==null?void 0:o.toString()),null}}function $y(r){const e=rp(r);return _e(e,"internal-error"),_e(typeof e.exp<"u","internal-error"),_e(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function el(r,e,t=!1){if(t)return e;try{return await e}catch(i){throw i instanceof Fr&&kA(i)&&r.auth.currentUser===r&&await r.auth.signOut(),i}}function kA({code:r}){return r==="auth/user-disabled"||r==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CA{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const i=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uf{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=qa(this.lastLoginAt),this.creationTime=qa(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pc(r){var I;const e=r.auth,t=await r.getIdToken(),i=await el(r,fc(e,{idToken:t}));_e(i==null?void 0:i.users.length,e,"internal-error");const o=i.users[0];r._notifyReloadListener(o);const l=(I=o.providerUserInfo)!=null&&I.length?l0(o.providerUserInfo):[],h=PA(r.providerData,l),p=r.isAnonymous,g=!(r.email&&o.passwordHash)&&!(h!=null&&h.length),y=p?g:!1,E={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:h,metadata:new uf(o.createdAt,o.lastLoginAt),isAnonymous:y};Object.assign(r,E)}async function RA(r){const e=_t(r);await pc(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function PA(r,e){return[...r.filter(i=>!e.some(o=>o.providerId===i.providerId)),...e]}function l0(r){return r.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function NA(r,e){const t=await o0(r,{},async()=>{const i=rl({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:o,apiKey:l}=r.config,h=await a0(r,o,"/v1/token",`key=${l}`),p=await r._getAdditionalHeaders();p["Content-Type"]="application/x-www-form-urlencoded";const g={method:"POST",headers:p,body:i};return r.emulatorConfig&&sl(r.emulatorConfig.host)&&(g.credentials="include"),i0.fetch()(h,g)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function bA(r,e){return Lo(r,"POST","/v2/accounts:revokeToken",np(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eo{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){_e(e.idToken,"internal-error"),_e(typeof e.idToken<"u","internal-error"),_e(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):$y(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){_e(e.length!==0,"internal-error");const t=$y(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(_e(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:i,refreshToken:o,expiresIn:l}=await NA(e,t);this.updateTokensAndExpiration(i,o,Number(l))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,t){const{refreshToken:i,accessToken:o,expirationTime:l}=t,h=new Eo;return i&&(_e(typeof i=="string","internal-error",{appName:e}),h.refreshToken=i),o&&(_e(typeof o=="string","internal-error",{appName:e}),h.accessToken=o),l&&(_e(typeof l=="number","internal-error",{appName:e}),h.expirationTime=l),h}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Eo,this.toJSON())}_performRefresh(){return br("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gs(r,e){_e(typeof r=="string"||typeof r>"u","internal-error",{appName:e})}class Ln{constructor({uid:e,auth:t,stsTokenManager:i,...o}){this.providerId="firebase",this.proactiveRefresh=new CA(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=o.displayName||null,this.email=o.email||null,this.emailVerified=o.emailVerified||!1,this.phoneNumber=o.phoneNumber||null,this.photoURL=o.photoURL||null,this.isAnonymous=o.isAnonymous||!1,this.tenantId=o.tenantId||null,this.providerData=o.providerData?[...o.providerData]:[],this.metadata=new uf(o.createdAt||void 0,o.lastLoginAt||void 0)}async getIdToken(e){const t=await el(this,this.stsTokenManager.getToken(this.auth,e));return _e(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return xA(this,e)}reload(){return RA(this)}_assign(e){this!==e&&(_e(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Ln({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){_e(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await pc(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Mn(this.auth.app))return Promise.reject(mi(this.auth));const e=await this.getIdToken();return await el(this,AA(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const i=t.displayName??void 0,o=t.email??void 0,l=t.phoneNumber??void 0,h=t.photoURL??void 0,p=t.tenantId??void 0,g=t._redirectEventId??void 0,y=t.createdAt??void 0,E=t.lastLoginAt??void 0,{uid:I,emailVerified:x,isAnonymous:O,providerData:q,stsTokenManager:$}=t;_e(I&&$,e,"internal-error");const B=Eo.fromJSON(this.name,$);_e(typeof I=="string",e,"internal-error"),gs(i,e.name),gs(o,e.name),_e(typeof x=="boolean",e,"internal-error"),_e(typeof O=="boolean",e,"internal-error"),gs(l,e.name),gs(h,e.name),gs(p,e.name),gs(g,e.name),gs(y,e.name),gs(E,e.name);const Z=new Ln({uid:I,auth:e,email:o,emailVerified:x,displayName:i,isAnonymous:O,photoURL:h,phoneNumber:l,tenantId:p,stsTokenManager:B,createdAt:y,lastLoginAt:E});return q&&Array.isArray(q)&&(Z.providerData=q.map(ae=>({...ae}))),g&&(Z._redirectEventId=g),Z}static async _fromIdTokenResponse(e,t,i=!1){const o=new Eo;o.updateFromServerResponse(t);const l=new Ln({uid:t.localId,auth:e,stsTokenManager:o,isAnonymous:i});return await pc(l),l}static async _fromGetAccountInfoResponse(e,t,i){const o=t.users[0];_e(o.localId!==void 0,"internal-error");const l=o.providerUserInfo!==void 0?l0(o.providerUserInfo):[],h=!(o.email&&o.passwordHash)&&!(l!=null&&l.length),p=new Eo;p.updateFromIdToken(i);const g=new Ln({uid:o.localId,auth:e,stsTokenManager:p,isAnonymous:h}),y={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:l,metadata:new uf(o.createdAt,o.lastLoginAt),isAnonymous:!(o.email&&o.passwordHash)&&!(l!=null&&l.length)};return Object.assign(g,y),g}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qy=new Map;function Dr(r){jr(r instanceof Function,"Expected a class definition");let e=qy.get(r);return e?(jr(e instanceof r,"Instance stored in cache mismatched with class"),e):(e=new r,qy.set(r,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u0{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}u0.type="NONE";const Hy=u0;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qu(r,e,t){return`firebase:${r}:${e}:${t}`}class wo{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;const{config:o,name:l}=this.auth;this.fullUserKey=Qu(this.userKey,o.apiKey,l),this.fullPersistenceKey=Qu("persistence",o.apiKey,l),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await fc(this.auth,{idToken:e}).catch(()=>{});return t?Ln._fromGetAccountInfoResponse(this.auth,t,e):null}return Ln._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new wo(Dr(Hy),e,i);const o=(await Promise.all(t.map(async y=>{if(await y._isAvailable())return y}))).filter(y=>y);let l=o[0]||Dr(Hy);const h=Qu(i,e.config.apiKey,e.name);let p=null;for(const y of t)try{const E=await y._get(h);if(E){let I;if(typeof E=="string"){const x=await fc(e,{idToken:E}).catch(()=>{});if(!x)break;I=await Ln._fromGetAccountInfoResponse(e,x,E)}else I=Ln._fromJSON(e,E);y!==l&&(p=I),l=y;break}}catch{}const g=o.filter(y=>y._shouldAllowMigration);return!l._shouldAllowMigration||!g.length?new wo(l,e,i):(l=g[0],p&&await l._set(h,p.toJSON()),await Promise.all(t.map(async y=>{if(y!==l)try{await y._remove(h)}catch{}})),new wo(l,e,i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wy(r){const e=r.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(f0(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(c0(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(m0(e))return"Blackberry";if(g0(e))return"Webos";if(h0(e))return"Safari";if((e.includes("chrome/")||d0(e))&&!e.includes("edge/"))return"Chrome";if(p0(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=r.match(t);if((i==null?void 0:i.length)===2)return i[1]}return"Other"}function c0(r=$t()){return/firefox\//i.test(r)}function h0(r=$t()){const e=r.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function d0(r=$t()){return/crios\//i.test(r)}function f0(r=$t()){return/iemobile/i.test(r)}function p0(r=$t()){return/android/i.test(r)}function m0(r=$t()){return/blackberry/i.test(r)}function g0(r=$t()){return/webos/i.test(r)}function sp(r=$t()){return/iphone|ipad|ipod/i.test(r)||/macintosh/i.test(r)&&/mobile/i.test(r)}function DA(r=$t()){var e;return sp(r)&&!!((e=window.navigator)!=null&&e.standalone)}function VA(){return xw()&&document.documentMode===10}function y0(r=$t()){return sp(r)||p0(r)||g0(r)||m0(r)||/windows phone/i.test(r)||f0(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _0(r,e=[]){let t;switch(r){case"Browser":t=Wy($t());break;case"Worker":t=`${Wy($t())}-${r}`;break;default:t=r}const i=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${No}/${i}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OA{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const i=l=>new Promise((h,p)=>{try{const g=e(l);h(g)}catch(g){p(g)}});i.onAbort=t,this.queue.push(i);const o=this.queue.length-1;return()=>{this.queue[o]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(i){t.reverse();for(const o of t)try{o()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i==null?void 0:i.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function MA(r,e={}){return Lo(r,"GET","/v2/passwordPolicy",np(r,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LA=6;class jA{constructor(e){var i;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??LA,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((i=e.allowedNonAlphanumericCharacters)==null?void 0:i.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const i=this.customStrengthOptions.minPasswordLength,o=this.customStrengthOptions.maxPasswordLength;i&&(t.meetsMinPasswordLength=e.length>=i),o&&(t.meetsMaxPasswordLength=e.length<=o)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let i;for(let o=0;o<e.length;o++)i=e.charAt(o),this.updatePasswordCharacterOptionsStatuses(t,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,t,i,o,l){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=o)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=l))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FA{constructor(e,t,i,o){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=i,this.config=o,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Gy(this),this.idTokenSubscription=new Gy(this),this.beforeStateQueue=new OA(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=s0,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=o.sdkClientVersion,this._persistenceManagerAvailable=new Promise(l=>this._resolvePersistenceManagerAvailable=l)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Dr(t)),this._initializationPromise=this.queue(async()=>{var i,o,l;if(!this._deleted&&(this.persistenceManager=await wo.create(this,e),(i=this._resolvePersistenceManagerAvailable)==null||i.call(this),!this._deleted)){if((o=this._popupRedirectResolver)!=null&&o._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((l=this.currentUser)==null?void 0:l.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await fc(this,{idToken:e}),i=await Ln._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(i)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var l;if(Mn(this.app)){const h=this.app.settings.authIdToken;return h?new Promise(p=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(h).then(p,p))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let i=t,o=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const h=(l=this.redirectUser)==null?void 0:l._redirectEventId,p=i==null?void 0:i._redirectEventId,g=await this.tryRedirectSignIn(e);(!h||h===p)&&(g!=null&&g.user)&&(i=g.user,o=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(o)try{await this.beforeStateQueue.runMiddleware(i)}catch(h){i=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(h))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return _e(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await pc(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=vA()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Mn(this.app))return Promise.reject(mi(this));const t=e?_t(e):null;return t&&_e(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&_e(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Mn(this.app)?Promise.reject(mi(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Mn(this.app)?Promise.reject(mi(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Dr(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await MA(this),t=new jA(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new nl("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(i.tenantId=this.tenantId),await bA(this,i)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const i=await this.getOrInitRedirectPersistenceManager(t);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Dr(e)||this._popupRedirectResolver;_e(t,this,"argument-error"),this.redirectPersistenceManager=await wo.create(this,[Dr(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,i;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((i=this.redirectUser)==null?void 0:i._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,o){if(this._deleted)return()=>{};const l=typeof t=="function"?t:t.next.bind(t);let h=!1;const p=this._isInitialized?Promise.resolve():this._initializationPromise;if(_e(p,this,"internal-error"),p.then(()=>{h||l(this.currentUser)}),typeof t=="function"){const g=e.addObserver(t,i,o);return()=>{h=!0,g()}}else{const g=e.addObserver(t);return()=>{h=!0,g()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return _e(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=_0(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var o;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((o=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:o.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const i=await this._getAppCheckToken();return i&&(e["X-Firebase-AppCheck"]=i),e}async _getAppCheckToken(){var t;if(Mn(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&mA(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function qc(r){return _t(r)}class Gy{constructor(e){this.auth=e,this.observer=null,this.addObserver=Vw(t=>this.observer=t)}get next(){return _e(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ip={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function UA(r){ip=r}function zA(r){return ip.loadJS(r)}function BA(){return ip.gapiScript}function $A(r){return`__${r}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qA(r,e){const t=mf(r,"auth");if(t.isInitialized()){const o=t.getImmediate(),l=t.getOptions();if(gi(l,e??{}))return o;dr(o,"already-initialized")}return t.initialize({options:e})}function HA(r,e){const t=(e==null?void 0:e.persistence)||[],i=(Array.isArray(t)?t:[t]).map(Dr);e!=null&&e.errorMap&&r._updateErrorMap(e.errorMap),r._initializeWithPersistence(i,e==null?void 0:e.popupRedirectResolver)}function WA(r,e,t){const i=qc(r);_e(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const o=!1,l=v0(e),{host:h,port:p}=GA(e),g=p===null?"":`:${p}`,y={url:`${l}//${h}${g}/`},E=Object.freeze({host:h,port:p,protocol:l.replace(":",""),options:Object.freeze({disableWarnings:o})});if(!i._canInitEmulator){_e(i.config.emulator&&i.emulatorConfig,i,"emulator-config-failed"),_e(gi(y,i.config.emulator)&&gi(E,i.emulatorConfig),i,"emulator-config-failed");return}i.config.emulator=y,i.emulatorConfig=E,i.settings.appVerificationDisabledForTesting=!0,sl(h)?m_(`${l}//${h}${g}`):KA()}function v0(r){const e=r.indexOf(":");return e<0?"":r.substr(0,e+1)}function GA(r){const e=v0(r),t=/(\/\/)?([^?#/]+)/.exec(r.substr(e.length));if(!t)return{host:"",port:null};const i=t[2].split("@").pop()||"",o=/^(\[[^\]]+\])(:|$)/.exec(i);if(o){const l=o[1];return{host:l,port:Ky(i.substr(l.length+1))}}else{const[l,h]=i.split(":");return{host:l,port:Ky(h)}}}function Ky(r){if(!r)return null;const e=Number(r);return isNaN(e)?null:e}function KA(){function r(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",r):r())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E0{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return br("not implemented")}_getIdTokenResponse(e){return br("not implemented")}_linkToIdToken(e,t){return br("not implemented")}_getReauthenticationResolver(e){return br("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function To(r,e){return IA(r,"POST","/v1/accounts:signInWithIdp",np(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QA="http://localhost";class wi extends E0{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new wi(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):dr("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:o,...l}=t;if(!i||!o)return null;const h=new wi(i,o);return h.idToken=l.idToken||void 0,h.accessToken=l.accessToken||void 0,h.secret=l.secret,h.nonce=l.nonce,h.pendingToken=l.pendingToken||null,h}_getIdTokenResponse(e){const t=this.buildRequest();return To(e,t)}_linkToIdToken(e,t){const i=this.buildRequest();return i.idToken=t,To(e,i)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,To(e,t)}buildRequest(){const e={requestUri:QA,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=rl(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class op{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gl extends op{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ys extends gl{constructor(){super("facebook.com")}static credential(e){return wi._fromParams({providerId:ys.PROVIDER_ID,signInMethod:ys.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ys.credentialFromTaggedObject(e)}static credentialFromError(e){return ys.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ys.credential(e.oauthAccessToken)}catch{return null}}}ys.FACEBOOK_SIGN_IN_METHOD="facebook.com";ys.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nr extends gl{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return wi._fromParams({providerId:Nr.PROVIDER_ID,signInMethod:Nr.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Nr.credentialFromTaggedObject(e)}static credentialFromError(e){return Nr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return Nr.credential(t,i)}catch{return null}}}Nr.GOOGLE_SIGN_IN_METHOD="google.com";Nr.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _s extends gl{constructor(){super("github.com")}static credential(e){return wi._fromParams({providerId:_s.PROVIDER_ID,signInMethod:_s.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return _s.credentialFromTaggedObject(e)}static credentialFromError(e){return _s.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return _s.credential(e.oauthAccessToken)}catch{return null}}}_s.GITHUB_SIGN_IN_METHOD="github.com";_s.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vs extends gl{constructor(){super("twitter.com")}static credential(e,t){return wi._fromParams({providerId:vs.PROVIDER_ID,signInMethod:vs.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return vs.credentialFromTaggedObject(e)}static credentialFromError(e){return vs.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return vs.credential(t,i)}catch{return null}}}vs.TWITTER_SIGN_IN_METHOD="twitter.com";vs.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Po{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,o=!1){const l=await Ln._fromIdTokenResponse(e,i,o),h=Qy(i);return new Po({user:l,providerId:h,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);const o=Qy(i);return new Po({user:e,providerId:o,_tokenResponse:i,operationType:t})}}function Qy(r){return r.providerId?r.providerId:"phoneNumber"in r?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mc extends Fr{constructor(e,t,i,o){super(t.code,t.message),this.operationType=i,this.user=o,Object.setPrototypeOf(this,mc.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,o){return new mc(e,t,i,o)}}function w0(r,e,t,i){return(e==="reauthenticate"?t._getReauthenticationResolver(r):t._getIdTokenResponse(r)).catch(l=>{throw l.code==="auth/multi-factor-auth-required"?mc._fromErrorAndOperation(r,l,e,i):l})}async function YA(r,e,t=!1){const i=await el(r,e._linkToIdToken(r.auth,await r.getIdToken()),t);return Po._forOperation(r,"link",i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function JA(r,e,t=!1){const{auth:i}=r;if(Mn(i.app))return Promise.reject(mi(i));const o="reauthenticate";try{const l=await el(r,w0(i,o,e,r),t);_e(l.idToken,i,"internal-error");const h=rp(l.idToken);_e(h,i,"internal-error");const{sub:p}=h;return _e(r.uid===p,i,"user-mismatch"),Po._forOperation(r,o,l)}catch(l){throw(l==null?void 0:l.code)==="auth/user-not-found"&&dr(i,"user-mismatch"),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function XA(r,e,t=!1){if(Mn(r.app))return Promise.reject(mi(r));const i="signIn",o=await w0(r,i,e),l=await Po._fromIdTokenResponse(r,i,o);return t||await r._updateCurrentUser(l.user),l}function ZA(r,e,t,i){return _t(r).onIdTokenChanged(e,t,i)}function ex(r,e,t){return _t(r).beforeAuthStateChanged(e,t)}function tx(r,e,t,i){return _t(r).onAuthStateChanged(e,t,i)}function nx(r){return _t(r).signOut()}const gc="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T0{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(gc,"1"),this.storage.removeItem(gc),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rx=1e3,sx=10;class I0 extends T0{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=y0(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const i=this.storage.getItem(t),o=this.localCache[t];i!==o&&e(t,o,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((h,p,g)=>{this.notifyListeners(h,g)});return}const i=e.key;t?this.detachListener():this.stopPolling();const o=()=>{const h=this.storage.getItem(i);!t&&this.localCache[i]===h||this.notifyListeners(i,h)},l=this.storage.getItem(i);VA()&&l!==e.newValue&&e.newValue!==e.oldValue?setTimeout(o,sx):o()}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const o of Array.from(i))o(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},rx)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}I0.type="LOCAL";const ix=I0;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S0 extends T0{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}S0.type="SESSION";const A0=S0;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ox(r){return Promise.all(r.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hc{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(o=>o.isListeningto(e));if(t)return t;const i=new Hc(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:i,eventType:o,data:l}=t.data,h=this.handlersMap[o];if(!(h!=null&&h.size))return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:o});const p=Array.from(h).map(async y=>y(t.origin,l)),g=await ox(p);t.ports[0].postMessage({status:"done",eventId:i,eventType:o,response:g})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Hc.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ap(r="",e=10){let t="";for(let i=0;i<e;i++)t+=Math.floor(Math.random()*10);return r+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ax{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){const o=typeof MessageChannel<"u"?new MessageChannel:null;if(!o)throw new Error("connection_unavailable");let l,h;return new Promise((p,g)=>{const y=ap("",20);o.port1.start();const E=setTimeout(()=>{g(new Error("unsupported_event"))},i);h={messageChannel:o,onMessage(I){const x=I;if(x.data.eventId===y)switch(x.data.status){case"ack":clearTimeout(E),l=setTimeout(()=>{g(new Error("timeout"))},3e3);break;case"done":clearTimeout(l),p(x.data.response);break;default:clearTimeout(E),clearTimeout(l),g(new Error("invalid_response"));break}}},this.handlers.add(h),o.port1.addEventListener("message",h.onMessage),this.target.postMessage({eventType:e,eventId:y,data:t},[o.port2])}).finally(()=>{h&&this.removeMessageHandler(h)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ur(){return window}function lx(r){ur().location.href=r}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x0(){return typeof ur().WorkerGlobalScope<"u"&&typeof ur().importScripts=="function"}async function ux(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function cx(){var r;return((r=navigator==null?void 0:navigator.serviceWorker)==null?void 0:r.controller)||null}function hx(){return x0()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k0="firebaseLocalStorageDb",dx=1,yc="firebaseLocalStorage",C0="fbase_key";class yl{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Wc(r,e){return r.transaction([yc],e?"readwrite":"readonly").objectStore(yc)}function fx(){const r=indexedDB.deleteDatabase(k0);return new yl(r).toPromise()}function cf(){const r=indexedDB.open(k0,dx);return new Promise((e,t)=>{r.addEventListener("error",()=>{t(r.error)}),r.addEventListener("upgradeneeded",()=>{const i=r.result;try{i.createObjectStore(yc,{keyPath:C0})}catch(o){t(o)}}),r.addEventListener("success",async()=>{const i=r.result;i.objectStoreNames.contains(yc)?e(i):(i.close(),await fx(),e(await cf()))})})}async function Yy(r,e,t){const i=Wc(r,!0).put({[C0]:e,value:t});return new yl(i).toPromise()}async function px(r,e){const t=Wc(r,!1).get(e),i=await new yl(t).toPromise();return i===void 0?null:i.value}function Jy(r,e){const t=Wc(r,!0).delete(e);return new yl(t).toPromise()}const mx=800,gx=3;class R0{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await cf(),this.db)}async _withRetries(e){let t=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(t++>gx)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return x0()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Hc._getInstance(hx()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,i;if(this.activeServiceWorker=await ux(),!this.activeServiceWorker)return;this.sender=new ax(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(i=e[0])!=null&&i.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||cx()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await cf();return await Yy(e,gc,"1"),await Jy(e,gc),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>Yy(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(i=>px(i,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Jy(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(o=>{const l=Wc(o,!1).getAll();return new yl(l).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],i=new Set;if(e.length!==0)for(const{fbase_key:o,value:l}of e)i.add(o),JSON.stringify(this.localCache[o])!==JSON.stringify(l)&&(this.notifyListeners(o,l),t.push(o));for(const o of Object.keys(this.localCache))this.localCache[o]&&!i.has(o)&&(this.notifyListeners(o,null),t.push(o));return t}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const o of Array.from(i))o(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),mx)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}R0.type="LOCAL";const yx=R0;new ml(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function P0(r,e){return e?Dr(e):(_e(r._popupRedirectResolver,r,"argument-error"),r._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lp extends E0{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return To(e,this._buildIdpRequest())}_linkToIdToken(e,t){return To(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return To(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function _x(r){return XA(r.auth,new lp(r),r.bypassAuthState)}function vx(r){const{auth:e,user:t}=r;return _e(t,e,"internal-error"),JA(t,new lp(r),r.bypassAuthState)}async function Ex(r){const{auth:e,user:t}=r;return _e(t,e,"internal-error"),YA(t,new lp(r),r.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N0{constructor(e,t,i,o,l=!1){this.auth=e,this.resolver=i,this.user=o,this.bypassAuthState=l,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:i,postBody:o,tenantId:l,error:h,type:p}=e;if(h){this.reject(h);return}const g={auth:this.auth,requestUri:t,sessionId:i,tenantId:l||void 0,postBody:o||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(p)(g))}catch(y){this.reject(y)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return _x;case"linkViaPopup":case"linkViaRedirect":return Ex;case"reauthViaPopup":case"reauthViaRedirect":return vx;default:dr(this.auth,"internal-error")}}resolve(e){jr(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){jr(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wx=new ml(2e3,1e4);async function Tx(r,e,t){if(Mn(r.app))return Promise.reject(Fn(r,"operation-not-supported-in-this-environment"));const i=qc(r);gA(r,e,op);const o=P0(i,t);return new hi(i,"signInViaPopup",e,o).executeNotNull()}class hi extends N0{constructor(e,t,i,o,l){super(e,t,o,l),this.provider=i,this.authWindow=null,this.pollId=null,hi.currentPopupAction&&hi.currentPopupAction.cancel(),hi.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return _e(e,this.auth,"internal-error"),e}async onExecution(){jr(this.filter.length===1,"Popup operations only handle one event");const e=ap();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Fn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(Fn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,hi.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,i;if((i=(t=this.authWindow)==null?void 0:t.window)!=null&&i.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Fn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,wx.get())};e()}}hi.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ix="pendingRedirect",Yu=new Map;class Sx extends N0{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=Yu.get(this.auth._key());if(!e){try{const i=await Ax(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(t){e=()=>Promise.reject(t)}Yu.set(this.auth._key(),e)}return this.bypassAuthState||Yu.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Ax(r,e){const t=Cx(e),i=kx(r);if(!await i._isAvailable())return!1;const o=await i._get(t)==="true";return await i._remove(t),o}function xx(r,e){Yu.set(r._key(),e)}function kx(r){return Dr(r._redirectPersistence)}function Cx(r){return Qu(Ix,r.config.apiKey,r.name)}async function Rx(r,e,t=!1){if(Mn(r.app))return Promise.reject(mi(r));const i=qc(r),o=P0(i,e),h=await new Sx(i,o,t).execute();return h&&!t&&(delete h.user._redirectEventId,await i._persistUserIfCurrent(h.user),await i._setRedirectUser(null,e)),h}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Px=600*1e3;class Nx{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!bx(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var i;if(e.error&&!b0(e)){const o=((i=e.error.code)==null?void 0:i.split("auth/")[1])||"internal-error";t.onError(Fn(this.auth,o))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const i=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Px&&this.cachedEventUids.clear(),this.cachedEventUids.has(Xy(e))}saveEventToCache(e){this.cachedEventUids.add(Xy(e)),this.lastProcessedEventTime=Date.now()}}function Xy(r){return[r.type,r.eventId,r.sessionId,r.tenantId].filter(e=>e).join("-")}function b0({type:r,error:e}){return r==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function bx(r){switch(r.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return b0(r);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Dx(r,e={}){return Lo(r,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vx=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Ox=/^https?/;async function Mx(r){if(r.config.emulator)return;const{authorizedDomains:e}=await Dx(r);for(const t of e)try{if(Lx(t))return}catch{}dr(r,"unauthorized-domain")}function Lx(r){const e=lf(),{protocol:t,hostname:i}=new URL(e);if(r.startsWith("chrome-extension://")){const h=new URL(r);return h.hostname===""&&i===""?t==="chrome-extension:"&&r.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&h.hostname===i}if(!Ox.test(t))return!1;if(Vx.test(r))return i===r;const o=r.replace(/\./g,"\\.");return new RegExp("^(.+\\."+o+"|"+o+")$","i").test(i)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jx=new ml(3e4,6e4);function Zy(){const r=ur().___jsl;if(r!=null&&r.H){for(const e of Object.keys(r.H))if(r.H[e].r=r.H[e].r||[],r.H[e].L=r.H[e].L||[],r.H[e].r=[...r.H[e].L],r.CP)for(let t=0;t<r.CP.length;t++)r.CP[t]=null}}function Fx(r){return new Promise((e,t)=>{var o,l,h;function i(){Zy(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Zy(),t(Fn(r,"network-request-failed"))},timeout:jx.get()})}if((l=(o=ur().gapi)==null?void 0:o.iframes)!=null&&l.Iframe)e(gapi.iframes.getContext());else if((h=ur().gapi)!=null&&h.load)i();else{const p=$A("iframefcb");return ur()[p]=()=>{gapi.load?i():t(Fn(r,"network-request-failed"))},zA(`${BA()}?onload=${p}`).catch(g=>t(g))}}).catch(e=>{throw Ju=null,e})}let Ju=null;function Ux(r){return Ju=Ju||Fx(r),Ju}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zx=new ml(5e3,15e3),Bx="__/auth/iframe",$x="emulator/auth/iframe",qx={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Hx=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Wx(r){const e=r.config;_e(e.authDomain,r,"auth-domain-config-required");const t=e.emulator?tp(e,$x):`https://${r.config.authDomain}/${Bx}`,i={apiKey:e.apiKey,appName:r.name,v:No},o=Hx.get(r.config.apiHost);o&&(i.eid=o);const l=r._getFrameworks();return l.length&&(i.fw=l.join(",")),`${t}?${rl(i).slice(1)}`}async function Gx(r){const e=await Ux(r),t=ur().gapi;return _e(t,r,"internal-error"),e.open({where:document.body,url:Wx(r),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:qx,dontclear:!0},i=>new Promise(async(o,l)=>{await i.restyle({setHideOnLeave:!1});const h=Fn(r,"network-request-failed"),p=ur().setTimeout(()=>{l(h)},zx.get());function g(){ur().clearTimeout(p),o(i)}i.ping(g).then(g,()=>{l(h)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kx={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Qx=500,Yx=600,Jx="_blank",Xx="http://localhost";class e_{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Zx(r,e,t,i=Qx,o=Yx){const l=Math.max((window.screen.availHeight-o)/2,0).toString(),h=Math.max((window.screen.availWidth-i)/2,0).toString();let p="";const g={...Kx,width:i.toString(),height:o.toString(),top:l,left:h},y=$t().toLowerCase();t&&(p=d0(y)?Jx:t),c0(y)&&(e=e||Xx,g.scrollbars="yes");const E=Object.entries(g).reduce((x,[O,q])=>`${x}${O}=${q},`,"");if(DA(y)&&p!=="_self")return ek(e||"",p),new e_(null);const I=window.open(e||"",p,E);_e(I,r,"popup-blocked");try{I.focus()}catch{}return new e_(I)}function ek(r,e){const t=document.createElement("a");t.href=r,t.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tk="__/auth/handler",nk="emulator/auth/handler",rk=encodeURIComponent("fac");async function t_(r,e,t,i,o,l){_e(r.config.authDomain,r,"auth-domain-config-required"),_e(r.config.apiKey,r,"invalid-api-key");const h={apiKey:r.config.apiKey,appName:r.name,authType:t,redirectUrl:i,v:No,eventId:o};if(e instanceof op){e.setDefaultLanguage(r.languageCode),h.providerId=e.providerId||"",Dw(e.getCustomParameters())||(h.customParameters=JSON.stringify(e.getCustomParameters()));for(const[E,I]of Object.entries({}))h[E]=I}if(e instanceof gl){const E=e.getScopes().filter(I=>I!=="");E.length>0&&(h.scopes=E.join(","))}r.tenantId&&(h.tid=r.tenantId);const p=h;for(const E of Object.keys(p))p[E]===void 0&&delete p[E];const g=await r._getAppCheckToken(),y=g?`#${rk}=${encodeURIComponent(g)}`:"";return`${sk(r)}?${rl(p).slice(1)}${y}`}function sk({config:r}){return r.emulator?tp(r,nk):`https://${r.authDomain}/${tk}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Md="webStorageSupport";class ik{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=A0,this._completeRedirectFn=Rx,this._overrideRedirectResult=xx}async _openPopup(e,t,i,o){var h;jr((h=this.eventManagers[e._key()])==null?void 0:h.manager,"_initialize() not called before _openPopup()");const l=await t_(e,t,i,lf(),o);return Zx(e,l,ap())}async _openRedirect(e,t,i,o){await this._originValidation(e);const l=await t_(e,t,i,lf(),o);return lx(l),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:o,promise:l}=this.eventManagers[t];return o?Promise.resolve(o):(jr(l,"If manager is not set, promise should be"),l)}const i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){const t=await Gx(e),i=new Nx(e);return t.register("authEvent",o=>(_e(o==null?void 0:o.authEvent,e,"invalid-auth-event"),{status:i.onEvent(o.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Md,{type:Md},o=>{var h;const l=(h=o==null?void 0:o[0])==null?void 0:h[Md];l!==void 0&&t(!!l),dr(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Mx(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return y0()||h0()||sp()}}const ok=ik;var n_="@firebase/auth",r_="1.13.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ak{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(i=>{e((i==null?void 0:i.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){_e(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lk(r){switch(r){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function uk(r){Io(new yi("auth",(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),o=e.getProvider("heartbeat"),l=e.getProvider("app-check-internal"),{apiKey:h,authDomain:p}=i.options;_e(h&&!h.includes(":"),"invalid-api-key",{appName:i.name});const g={apiKey:h,authDomain:p,clientPlatform:r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:_0(r)},y=new FA(i,o,l,g);return HA(y,t),y},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),Io(new yi("auth-internal",e=>{const t=qc(e.getProvider("auth").getImmediate());return(i=>new ak(i))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Is(n_,r_,lk(r)),Is(n_,r_,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ck=300,hk=p_("authIdTokenMaxAge")||ck;let s_=null;const dk=r=>async e=>{const t=e&&await e.getIdTokenResult(),i=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(i&&i>hk)return;const o=t==null?void 0:t.token;s_!==o&&(s_=o,await fetch(r,{method:o?"POST":"DELETE",headers:o?{Authorization:`Bearer ${o}`}:{}}))};function fk(r=v_()){const e=mf(r,"auth");if(e.isInitialized())return e.getImmediate();const t=qA(r,{popupRedirectResolver:ok,persistence:[yx,ix,A0]}),i=p_("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const l=new URL(i,location.origin);if(location.origin===l.origin){const h=dk(l.toString());ex(t,h,()=>h(t.currentUser)),ZA(t,p=>h(p))}}const o=d_("auth");return o&&WA(t,`http://${o}`),t}function pk(){var r;return((r=document.getElementsByTagName("head"))==null?void 0:r[0])??document}UA({loadJS(r){return new Promise((e,t)=>{const i=document.createElement("script");i.setAttribute("src",r),i.onload=e,i.onerror=o=>{const l=Fn("internal-error");l.customData=o,t(l)},i.type="text/javascript",i.charset="UTF-8",pk().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});uk("Browser");const mk={apiKey:"AIzaSyAk9m9zMwIDDRgXOFMNkZl-Vj0xTAkVLE8",authDomain:"clear-books-56595.firebaseapp.com",projectId:"clear-books-56595",appId:"1:515919325072:web:9bf4cac42f119cbe467515"},D0=__(mk),Os=YS(D0),hf=fk(D0),_c=r=>Mo(Os,"users",r,"config","profile"),vc=r=>qf(Os,"users",r,"fixedTemplate"),i_=(r,e)=>Mo(Os,"users",r,"fixedTemplate",e),Ld=(r,e)=>Mo(Os,"users",r,"periods",e),gk=r=>qf(Os,"users",r,"periods"),up=r=>qf(Os,"users",r,"expenses"),yk=(r,e)=>Mo(Os,"users",r,"expenses",e),_k=(r,e)=>oA(up(r),aA("periodKey","==",e));function vk(r){const[e,t]=pe.useState(void 0);return pe.useEffect(()=>$c(_c(r),o=>t(o.exists()?o.data():null),()=>t(null)),[r]),{profile:e,saveProfile:o=>Xv(_c(r),o,{merge:!0})}}async function Ek(r,e,t){const i=hA(Os);i.set(_c(r),{...e,onboardingComplete:!0,createdAt:Za()}),t.forEach((o,l)=>{i.set(Mo(vc(r)),{name:o.name,amount:Number(o.amount)||0,currency:o.currency||"CRC",order:l,createdAt:Za()})}),await i.commit()}function V0(r){const[e,t]=pe.useState(null);return pe.useEffect(()=>$c(vc(r),h=>{const p=h.docs.map(g=>({id:g.id,...g.data()}));p.sort((g,y)=>(g.order??0)-(y.order??0)),t(p)}),[r]),{items:e,addItem:h=>t0(vc(r),{name:h.name,amount:Number(h.amount)||0,currency:h.currency||"CRC",order:h.order??((e==null?void 0:e.length)||0),createdAt:Za()}),updateItem:(h,p)=>Zv(i_(r,h),p),removeItem:h=>e0(i_(r,h))}}const wk=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],tl=r=>String(r).padStart(2,"0"),O0=()=>{const r=new Date;return`${r.getFullYear()}-${tl(r.getMonth()+1)}-${tl(r.getDate())}`},Tk=r=>r.slice(0,7),Ik=(r,e)=>{const t=Tk(r);if(e!=="quincenal")return t;const i=parseInt(r.slice(8,10),10);return`${t}-Q${i<=15?1:2}`},Ec=r=>Ik(O0(),r),_l=r=>{const[e,t]=[r.slice(0,7),r.slice(8)];return{month:e,half:t==="Q1"?1:t==="Q2"?2:null}},M0=r=>{const{month:e,half:t}=_l(r),[i,o]=e.split("-"),l=`${wk[+o-1]} ${i}`;return t?`${t===1?"1ra":"2da"} quincena · ${l}`:l},wc=(r,e)=>{const[t,i]=r.split("-").map(Number),o=t*12+(i-1)+e;return`${Math.floor(o/12)}-${tl(o%12+1)}`},Sk=r=>{const{month:e,half:t}=_l(r);return t===null?wc(e,-1):t===2?`${e}-Q1`:`${wc(e,-1)}-Q2`},Ak=r=>{const{month:e,half:t}=_l(r);return t===null?wc(e,1):t===1?`${e}-Q2`:`${wc(e,1)}-Q1`},o_=r=>{const[e,t]=r.split("-").map(Number);return new Date(e,t,0).getDate()},L0=r=>{const{month:e,half:t}=_l(r);return t===1?{start:`${e}-01`,end:`${e}-15`}:t===2?{start:`${e}-16`,end:`${e}-${tl(o_(e))}`}:{start:`${e}-01`,end:`${e}-${tl(o_(e))}`}},xk=r=>{const e=O0(),{start:t,end:i}=L0(r);return e>=t&&e<=i?e:t};function kk(r,e,t,i){const[o,l]=pe.useState(null),[h,p]=pe.useState(!1),g=pe.useRef(null);pe.useEffect(()=>(l(null),p(!1),$c(Ld(r,e),x=>{x.exists()?(p(!1),l(x.data())):p(!0)})),[r,e]),pe.useEffect(()=>{if(!h||!t||!i||g.current===e)return;g.current=e;const{month:x,half:O}=_l(e);Xv(Ld(r,e),{key:e,month:x,half:O,fixedItems:i.map(q=>({templateId:q.id,name:q.name,amount:q.amount,currency:q.currency,paid:!1,paidAt:null})),incomes:Object.fromEntries(t.people.map(q=>[q.id,{crc:q.incomeCRC||0,usd:q.incomeUSD||0}])),savingsGoal:t.savingsGoal||0,exchangeRate:t.exchangeRate,createdAt:Za()})},[h,t,i,r,e]);const y=x=>Zv(Ld(r,e),x),E=(x,O)=>y({fixedItems:o.fixedItems.map((q,$)=>$===x?{...q,...O}:q)});return{period:o,updatePeriod:y,patchFixedItem:E,togglePaid:x=>{const O=!o.fixedItems[x].paid;return E(x,{paid:O,paidAt:O?new Date().toISOString():null})}}}function Ck(r,e){const[t,i]=pe.useState(null);return pe.useEffect(()=>(i(null),$c(_k(r,e),h=>{const p=h.docs.map(g=>({id:g.id,...g.data()}));p.sort((g,y)=>{var E,I;return y.date.localeCompare(g.date)||(((E=y.createdAt)==null?void 0:E.seconds)||0)-(((I=g.createdAt)==null?void 0:I.seconds)||0)}),i(p)})),[r,e]),{expenses:t,addExpense:h=>t0(up(r),{periodKey:e,date:h.date,description:h.description||"",amount:Number(h.amount)||0,currency:h.currency||"CRC",categoryId:h.categoryId,createdAt:Za()}),removeExpense:h=>e0(yk(r,h))}}const Gc=(r,e,t)=>e==="USD"?r*t:r,ct=r=>{if(r==null||isNaN(r))return"₡0";const e=Math.abs(Math.round(r)).toLocaleString("es-CR");return`${r<0?"−":""}₡${e}`},Rk=r=>r==null||isNaN(r)?"$0":`$${Number(r).toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2})}`,j0=(r,e)=>e==="USD"?Rk(r):ct(r),bs=(r,e)=>r.reduce((t,i)=>t+Gc(Number(i.amount)||0,i.currency,e),0),F0=(r,e)=>(Number(r==null?void 0:r.incomeCRC)||0)+(Number(r==null?void 0:r.incomeUSD)||0)*e,Pk=(r,e)=>{const t={};for(const i of r){const o=i.categoryId||"otros";t[o]=(t[o]||0)+Gc(Number(i.amount)||0,i.currency,e)}return t},Nk=({income:r,fixed:e,variable:t,savings:i})=>{const o=e+t,l=r-o;return{gastos:o,sobrante:l,final:l-i}},bk=({income1:r,income2:e,gastos:t,ahorro:i})=>{const o=(r+e-t-i)/2,l=i/2,h=r-l-o,p=e-l-o,g=h<0||p<0,y=g?h<0?0:t:h,E=g?p<0?0:t:p;return{restante:o,ahorroCada:l,aporte1:y,aporte2:E,deficit:o<0,desbalance:g}},di=455,Dk=async()=>{var i;const r=await fetch("https://api.hacienda.go.cr/indicadores/tc/dolar");if(!r.ok)throw new Error("HTTP error");const e=await r.json(),t=Number((i=e==null?void 0:e.venta)==null?void 0:i.valor);if(!t||t<=0)throw new Error("No venta in response");return Math.round(t*100)/100},Vk=async()=>{var t;const r=await fetch("https://open.er-api.com/v6/latest/USD");if(!r.ok)throw new Error("HTTP error");const e=await r.json();if(!((t=e.rates)!=null&&t.CRC))throw new Error("No CRC in response");return Math.round(e.rates.CRC)},cp=async()=>{try{return await Dk()}catch{return await Vk()}},Ok=r=>r?Date.now()-new Date(r).getTime()>1440*60*1e3:!0;/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mk=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),U0=(...r)=>r.filter((e,t,i)=>!!e&&e.trim()!==""&&i.indexOf(e)===t).join(" ").trim();/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Lk={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jk=pe.forwardRef(({color:r="currentColor",size:e=24,strokeWidth:t=2,absoluteStrokeWidth:i,className:o="",children:l,iconNode:h,...p},g)=>pe.createElement("svg",{ref:g,...Lk,width:e,height:e,stroke:r,strokeWidth:i?Number(t)*24/Number(e):t,className:U0("lucide",o),...p},[...h.map(([y,E])=>pe.createElement(y,E)),...Array.isArray(l)?l:[l]]));/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const je=(r,e)=>{const t=pe.forwardRef(({className:i,...o},l)=>pe.createElement(jk,{ref:l,iconNode:e,className:U0(`lucide-${Mk(r)}`,i),...o}));return t.displayName=`${r}`,t};/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fk=je("Baby",[["path",{d:"M9 12h.01",key:"157uk2"}],["path",{d:"M15 12h.01",key:"1k8ypt"}],["path",{d:"M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5",key:"1u7htd"}],["path",{d:"M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1",key:"5yv0yz"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uk=je("BookOpen",[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zk=je("Car",[["path",{d:"M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2",key:"5owen"}],["circle",{cx:"7",cy:"17",r:"2",key:"u2ysq9"}],["path",{d:"M9 17h6",key:"r8uit2"}],["circle",{cx:"17",cy:"17",r:"2",key:"axvx0g"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bk=je("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hp=je("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $k=je("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qk=je("Clapperboard",[["path",{d:"M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z",key:"1tn4o7"}],["path",{d:"m6.2 5.3 3.1 3.9",key:"iuk76l"}],["path",{d:"m12.4 3.4 3.1 4",key:"6hsd6n"}],["path",{d:"M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z",key:"ltgou9"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hk=je("ClipboardList",[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}],["path",{d:"M12 11h4",key:"1jrz19"}],["path",{d:"M12 16h4",key:"n85exb"}],["path",{d:"M8 11h.01",key:"1dfujw"}],["path",{d:"M8 16h.01",key:"18s6g9"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wk=je("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gk=je("Dumbbell",[["path",{d:"M14.4 14.4 9.6 9.6",key:"ic80wn"}],["path",{d:"M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z",key:"nnl7wr"}],["path",{d:"m21.5 21.5-1.4-1.4",key:"1f1ice"}],["path",{d:"M3.9 3.9 2.5 2.5",key:"1evmna"}],["path",{d:"M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z",key:"yhosts"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kk=je("Gift",[["rect",{x:"3",y:"8",width:"18",height:"4",rx:"1",key:"bkv52"}],["path",{d:"M12 8v13",key:"1c76mn"}],["path",{d:"M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7",key:"6wjy6b"}],["path",{d:"M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5",key:"1ihvrl"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qk=je("Heart",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z0=je("History",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yk=je("House",[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jk=je("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xk=je("PawPrint",[["circle",{cx:"11",cy:"4",r:"2",key:"vol9p0"}],["circle",{cx:"18",cy:"8",r:"2",key:"17gozi"}],["circle",{cx:"20",cy:"16",r:"2",key:"1v9bxh"}],["path",{d:"M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z",key:"1ydw1z"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zk=je("PiggyBank",[["path",{d:"M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z",key:"1ivx2i"}],["path",{d:"M2 9v1c0 1.1.9 2 2 2h1",key:"nm575m"}],["path",{d:"M16 11h.01",key:"xkw8gn"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e2=je("Pin",[["path",{d:"M12 17v5",key:"bb1du9"}],["path",{d:"M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",key:"1nkz8b"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t2=je("Plane",[["path",{d:"M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",key:"1v9wt8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kc=je("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n2=je("Receipt",[["path",{d:"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z",key:"q3az6g"}],["path",{d:"M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8",key:"1h4pet"}],["path",{d:"M12 17.5v-11",key:"1jc1ny"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r2=je("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s2=je("Shirt",[["path",{d:"M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z",key:"1wgbhj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i2=je("ShoppingCart",[["circle",{cx:"8",cy:"21",r:"1",key:"jimo8o"}],["circle",{cx:"19",cy:"21",r:"1",key:"13723u"}],["path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",key:"9zh506"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B0=je("Tag",[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o2=je("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a2=je("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l2=je("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u2=je("UtensilsCrossed",[["path",{d:"m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8",key:"n7qcjb"}],["path",{d:"M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7",key:"d0u48b"}],["path",{d:"m2.1 21.8 6.4-6.3",key:"yn04lh"}],["path",{d:"m19 5-7 7",key:"194lzd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c2=je("Wallet",[["path",{d:"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",key:"18etb6"}],["path",{d:"M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",key:"xoc0q4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vl=je("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h2=je("Zap",[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]]);function rn({title:r,subtitle:e,action:t,children:i,className:o=""}){return w.jsxs("section",{className:`bg-white border border-line rounded-2xl p-4 sm:p-5 ${o}`,children:[(r||t)&&w.jsxs("header",{className:"flex items-center justify-between mb-3",children:[w.jsxs("div",{children:[r&&w.jsx("h2",{className:"text-sm font-bold text-ink",children:r}),e&&w.jsx("p",{className:"text-xs text-muted mt-0.5",children:e})]}),t]}),i]})}function An({variant:r="primary",className:e="",...t}){const i={primary:"bg-accent text-white hover:opacity-90 disabled:opacity-40",ghost:"bg-transparent text-ink2 border border-line hover:bg-bg2",soft:"bg-accent-soft text-accent hover:opacity-80",danger:"bg-transparent text-bad border border-line hover:bg-red-50"};return w.jsx("button",{className:`px-4 py-2 rounded-xl text-sm font-semibold transition cursor-pointer disabled:cursor-not-allowed ${i[r]} ${e}`,...t})}function pn({label:r,hint:e,children:t}){return w.jsxs("label",{className:"block",children:[w.jsx("span",{className:"block text-xs font-semibold text-ink2 mb-1",children:r}),t,e&&w.jsx("span",{className:"block text-[11px] text-muted mt-1",children:e})]})}function ht({className:r="",...e}){return w.jsx("input",{className:`w-full px-3 py-2 rounded-xl border border-line bg-white text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent ${r}`,...e})}function $0({className:r="",children:e,...t}){return w.jsx("select",{className:`w-full px-3 py-2 rounded-xl border border-line bg-white text-sm text-ink focus:outline-none focus:border-accent ${r}`,...t,children:e})}function Tc({value:r,onChange:e,options:t}){return w.jsx("div",{className:"inline-flex bg-bg2 rounded-xl p-1 gap-1",children:t.map(i=>w.jsx("button",{type:"button",onClick:()=>e(i.value),className:`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition ${r===i.value?"bg-white text-ink shadow-sm":"text-ink2 hover:text-ink"}`,children:i.label},i.value))})}function d2({title:r,onClose:e,children:t}){return pe.useEffect(()=>{const i=o=>o.key==="Escape"&&e();return window.addEventListener("keydown",i),()=>window.removeEventListener("keydown",i)},[e]),w.jsx("div",{className:"fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30 p-0 sm:p-6",onClick:e,children:w.jsxs("div",{className:"bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl p-5 max-h-[90vh] overflow-y-auto",onClick:i=>i.stopPropagation(),children:[w.jsxs("header",{className:"flex items-center justify-between mb-4",children:[w.jsx("h3",{className:"text-base font-bold text-ink",children:r}),w.jsx("button",{onClick:e,"aria-label":"Cerrar",className:"text-muted hover:text-ink p-1",children:w.jsx(vl,{size:18})})]}),t]})})}function f2({pct:r,color:e}){const t=Math.min(100,Math.max(0,r));return w.jsx("div",{className:"h-2 rounded-full bg-bg2 overflow-hidden",children:w.jsx("div",{className:"h-full rounded-full transition-all",style:{width:`${t}%`,background:e}})})}function dp({icon:r=Hk,text:e}){return w.jsxs("div",{className:"text-center py-8",children:[w.jsx(r,{size:28,className:"mx-auto mb-2 text-muted",strokeWidth:1.75}),w.jsx("p",{className:"text-sm text-muted",children:e})]})}function p2({message:r}){return r?w.jsx("div",{className:"fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] bg-ink text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg",children:r}):null}function m2({periodKey:r,setPeriodKey:e,frequency:t}){const i=Ec(t),o=r===i,l=({dir:h,onClick:p})=>w.jsx("button",{type:"button",onClick:p,className:"w-9 h-9 rounded-xl border border-line bg-white text-ink2 hover:text-ink hover:bg-bg2 flex items-center justify-center","aria-label":h==="prev"?"Período anterior":"Período siguiente",children:h==="prev"?w.jsx(hp,{size:18}):w.jsx($k,{size:18})});return w.jsxs("div",{className:"flex items-center justify-between gap-2",children:[w.jsx(l,{dir:"prev",onClick:()=>e(Sk(r))}),w.jsxs("div",{className:"text-center",children:[w.jsx("div",{className:"text-sm font-bold text-ink",children:M0(r)}),!o&&w.jsx("button",{type:"button",onClick:()=>e(i),className:"text-[11px] text-accent font-semibold hover:underline",children:"Volver a hoy"})]}),w.jsx(l,{dir:"next",onClick:()=>e(Ak(r))})]})}function g2({profile:r,rate:e,periodKey:t,setPeriodKey:i,onOpenHistory:o,onOpenSettings:l,onSignOut:h}){const p=r.mode==="pareja"?"Presupuesto del hogar":"Mi presupuesto",g=r.people.map(E=>E.name).filter(Boolean).join(" y "),y=Number(e).toLocaleString("es-CR",{maximumFractionDigits:2});return w.jsxs("header",{className:"mb-5",children:[w.jsxs("div",{className:"flex items-center justify-between mb-4",children:[w.jsxs("div",{children:[w.jsx("h1",{className:"text-lg font-extrabold text-ink leading-tight",children:p}),w.jsxs("p",{className:"text-xs text-muted",children:[g," · $1 = ₡",y]})]}),w.jsxs("div",{className:"flex items-center gap-1",children:[w.jsx("button",{type:"button",onClick:o,title:"Historial",className:"w-9 h-9 rounded-xl flex items-center justify-center text-ink2 hover:text-ink hover:bg-bg2",children:w.jsx(z0,{size:18})}),w.jsx("button",{type:"button",onClick:l,title:"Ajustes",className:"w-9 h-9 rounded-xl flex items-center justify-center text-ink2 hover:text-ink hover:bg-bg2",children:w.jsx(r2,{size:18})}),w.jsx("button",{type:"button",onClick:h,title:"Cerrar sesión",className:"w-9 h-9 rounded-xl flex items-center justify-center text-ink2 hover:text-ink hover:bg-bg2",children:w.jsx(Jk,{size:18})})]})]}),w.jsx(m2,{periodKey:t,setPeriodKey:i,frequency:r.frequency})]})}function y2({periodKey:r,categories:e,onSave:t,onClose:i}){var x;const o=L0(r),[l,h]=pe.useState({description:"",amount:"",currency:"CRC",categoryId:((x=e[0])==null?void 0:x.id)||"otros",date:xk(r)}),[p,g]=pe.useState(!1),y=O=>q=>h($=>({...$,[O]:q})),E=Number(l.amount)>0&&l.date>=o.start&&l.date<=o.end,I=async()=>{g(!0);try{await t(l),i()}catch{g(!1)}};return w.jsx(d2,{title:"Agregar gasto",onClose:i,children:w.jsxs("div",{className:"space-y-4",children:[w.jsxs("div",{className:"flex gap-3 items-end",children:[w.jsx(pn,{label:"Monto",children:w.jsx(ht,{type:"number",inputMode:"decimal",min:"0",autoFocus:!0,value:l.amount,onChange:O=>y("amount")(O.target.value),placeholder:"0"})}),w.jsx(Tc,{value:l.currency,onChange:y("currency"),options:[{value:"CRC",label:"₡"},{value:"USD",label:"$"}]})]}),w.jsx(pn,{label:"Descripción",hint:"Opcional",children:w.jsx(ht,{value:l.description,onChange:O=>y("description")(O.target.value),placeholder:"Ej: Farmacia"})}),w.jsx(pn,{label:"Categoría",children:w.jsx($0,{value:l.categoryId,onChange:O=>y("categoryId")(O.target.value),children:e.map(O=>w.jsx("option",{value:O.id,children:O.label},O.id))})}),w.jsx(pn,{label:"Fecha",hint:"Dentro del período actual",children:w.jsx(ht,{type:"date",min:o.start,max:o.end,value:l.date,onChange:O=>y("date")(O.target.value)})}),w.jsx(An,{className:"w-full",onClick:I,disabled:!E||p,children:p?"Guardando…":"Guardar gasto"})]})})}const _2={bad:"#dc2626"},v2=[{id:"vivienda",label:"Vivienda",icon:"home",color:"#4f46e5",budget:0},{id:"alimentacion",label:"Alimentación",icon:"utensils",color:"#7c3aed",budget:0},{id:"transporte",label:"Transporte",icon:"car",color:"#0891b2",budget:0},{id:"servicios",label:"Servicios",icon:"zap",color:"#0369a1",budget:0},{id:"salud",label:"Salud",icon:"heart",color:"#0f766e",budget:0},{id:"entretenimiento",label:"Entretenimiento",icon:"film",color:"#d97706",budget:0},{id:"ropa",label:"Ropa",icon:"shirt",color:"#db2777",budget:0},{id:"otros",label:"Otros",icon:"wallet",color:"#64748b",budget:0}],Va=["#4f46e5","#7c3aed","#0891b2","#0369a1","#0f766e","#059669","#d97706","#dc2626","#db2777","#64748b","#92400e","#1d4ed8"],E2=[{name:"Alquiler / Apartamento"},{name:"Internet"},{name:"Electricidad"},{name:"Agua"},{name:"Celulares"},{name:"Auto (cuota)"},{name:"Gasolina"},{name:"Mercado"},{name:"Streaming (Netflix…)"}],w2=(r,e)=>e.find(t=>t.id===r)||e[e.length-1],T2=[{value:"individual",icon:a2,title:"Individual",desc:"Un salario. Tu presupuesto personal."},{value:"pareja",icon:l2,title:"Pareja",desc:"Dos salarios. El presupuesto del hogar."}];function I2({mode:r,setMode:e,frequency:t,setFrequency:i,people:o,setPeople:l}){const h=(p,g)=>l(o.map((y,E)=>E===p?{...y,name:g}:y));return w.jsxs("div",{className:"space-y-6",children:[w.jsxs("div",{children:[w.jsx("p",{className:"text-xs font-semibold text-ink2 mb-2",children:"¿Cómo es tu presupuesto?"}),w.jsx("div",{className:"grid grid-cols-2 gap-3",children:T2.map(p=>w.jsxs("button",{type:"button",onClick:()=>e(p.value),className:`text-left p-4 rounded-2xl border-2 transition ${r===p.value?"border-accent bg-accent-soft":"border-line bg-white hover:border-muted"}`,children:[w.jsx(p.icon,{size:22,className:`mb-2 ${r===p.value?"text-accent":"text-ink2"}`}),w.jsx("div",{className:"text-sm font-bold text-ink",children:p.title}),w.jsx("div",{className:"text-xs text-ink2 mt-0.5 leading-snug",children:p.desc})]},p.value))})]}),w.jsxs("div",{children:[w.jsx("p",{className:"text-xs font-semibold text-ink2 mb-2",children:"¿Cada cuánto recibís el salario?"}),w.jsx(Tc,{value:t,onChange:i,options:[{value:"mensual",label:"Mensual"},{value:"quincenal",label:"Quincenal"}]}),w.jsx("p",{className:"text-[11px] text-muted mt-1.5",children:t==="quincenal"?"Todo se organiza por quincena: del 1 al 15 y del 16 a fin de mes.":"Todo se organiza por mes calendario."})]}),r&&w.jsx("div",{className:"space-y-3",children:o.map((p,g)=>w.jsx(pn,{label:r==="pareja"?`Nombre de la persona ${g+1}`:"Tu nombre",children:w.jsx(ht,{value:p.name,onChange:y=>h(g,y.target.value),placeholder:g===0?"Ej: Kevin":"Ej: Ale"})},p.id))})]})}function S2({people:r,setPeople:e,savingsGoal:t,setSavingsGoal:i,frequency:o,rate:l}){const h=o==="quincenal"?"por quincena":"por mes",p=(y,E,I)=>e(r.map((x,O)=>O===y?{...x,[E]:I}:x)),g=r.reduce((y,E)=>y+F0(E,l),0);return w.jsxs("div",{className:"space-y-5",children:[r.map((y,E)=>w.jsx(rn,{title:y.name||`Persona ${E+1}`,subtitle:`Salario ${h}`,children:w.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[w.jsx(pn,{label:"En colones (₡)",children:w.jsx(ht,{type:"number",inputMode:"numeric",min:"0",value:y.incomeCRC,onChange:I=>p(E,"incomeCRC",I.target.value),placeholder:"0"})}),w.jsx(pn,{label:"En dólares ($)",hint:"Opcional, si parte del salario es en USD",children:w.jsx(ht,{type:"number",inputMode:"numeric",min:"0",value:y.incomeUSD,onChange:I=>p(E,"incomeUSD",I.target.value),placeholder:"0"})})]})},y.id)),w.jsx(pn,{label:`Meta de ahorro ${h} (₡)`,hint:r.length===2?"Se divide 50/50 entre los dos.":"Lo que querés apartar antes de gastar.",children:w.jsx(ht,{type:"number",inputMode:"numeric",min:"0",value:t,onChange:y=>i(y.target.value),placeholder:"0"})}),w.jsxs("div",{className:"flex items-center justify-between bg-bg2 rounded-xl px-4 py-3",children:[w.jsxs("span",{className:"text-xs font-semibold text-ink2",children:["Ingresos totales ",h]}),w.jsx("span",{className:"text-sm font-bold text-ink font-mono",children:ct(g)})]})]})}function A2({fixed:r,setFixed:e,frequency:t,rate:i}){const o=t==="quincenal"?"por quincena":"por mes",l=(y,E,I)=>e(r.map((x,O)=>O===y?{...x,[E]:I}:x)),h=y=>e(r.filter((E,I)=>I!==y)),p=()=>e([...r,{name:"",amount:"",currency:"CRC"}]),g=r.filter(y=>y.name.trim()&&Number(y.amount)>0);return w.jsxs("div",{className:"space-y-4",children:[w.jsxs("p",{className:"text-xs text-ink2 leading-relaxed",children:["Estos son los gastos que se repiten cada período (alquiler, internet, luz…). Aparecerán automáticamente en cada ",t==="quincenal"?"quincena":"mes"," para que solo los marqués como pagados. Dejá el monto vacío en los que no apliquen, o borralos."]}),w.jsx("div",{className:"space-y-2",children:r.map((y,E)=>w.jsxs("div",{className:"flex gap-2 items-center",children:[w.jsx(ht,{className:"flex-1",value:y.name,onChange:I=>l(E,"name",I.target.value),placeholder:"Nombre del gasto"}),w.jsx(ht,{type:"number",inputMode:"numeric",min:"0",className:"!w-32 text-right font-mono",value:y.amount,onChange:I=>l(E,"amount",I.target.value),placeholder:"₡ monto"}),w.jsx("button",{type:"button",onClick:()=>h(E),className:"text-muted hover:text-bad p-1",title:"Quitar",children:w.jsx(vl,{size:16})})]},E))}),w.jsxs(An,{variant:"ghost",onClick:p,className:"flex items-center gap-1.5",children:[w.jsx(Kc,{size:15})," Agregar otro"]}),w.jsxs("div",{className:"flex items-center justify-between bg-bg2 rounded-xl px-4 py-3",children:[w.jsxs("span",{className:"text-xs font-semibold text-ink2",children:["Total de gastos fijos ",o]}),w.jsx("span",{className:"text-sm font-bold text-ink font-mono",children:ct(bs(g,i))})]})]})}const a_=[{title:"Empecemos",sub:"Contanos cómo manejás tu plata."},{title:"Ingresos y ahorro",sub:"Los salarios y lo que querés apartar."},{title:"Gastos fijos",sub:"Los que se repiten todos los períodos."}];function x2({uid:r}){const[e,t]=pe.useState(0),[i,o]=pe.useState(null),[l,h]=pe.useState("mensual"),[p,g]=pe.useState([{id:"p1",name:"",incomeCRC:"",incomeUSD:""}]),[y,E]=pe.useState(""),[I,x]=pe.useState(E2.map(R=>({...R,amount:"",currency:"CRC"}))),[O,q]=pe.useState(!1),[$,B]=pe.useState(null),Z=R=>{o(R),R==="pareja"&&p.length===1?g([...p,{id:"p2",name:"",incomeCRC:"",incomeUSD:""}]):R==="individual"&&p.length===2&&g(p.slice(0,1))},ae=p.reduce((R,S)=>R+F0(S,di),0),me=e===0?i&&p.every(R=>R.name.trim()):e===1?ae>0:!0,Se=async()=>{q(!0),B(null);let R=di;try{R=await cp()}catch{}try{await Ek(r,{mode:i,frequency:l,people:p.map(S=>({id:S.id,name:S.name.trim(),incomeCRC:Number(S.incomeCRC)||0,incomeUSD:Number(S.incomeUSD)||0})),savingsGoal:Number(y)||0,categories:v2,exchangeRate:R,exchangeRateUpdatedAt:new Date().toISOString()},I.filter(S=>S.name.trim()&&Number(S.amount)>0))}catch{B("No se pudo guardar. Revisá tu conexión e intentá de nuevo."),q(!1)}},{title:Me,sub:Ae}=a_[e];return w.jsx("div",{className:"min-h-screen bg-bg flex justify-center px-4 py-8 sm:py-14",children:w.jsxs("div",{className:"w-full max-w-lg",children:[w.jsx("div",{className:"flex gap-1.5 mb-8",children:a_.map((R,S)=>w.jsx("div",{className:`h-1 flex-1 rounded-full ${S<=e?"bg-accent":"bg-line"}`},S))}),w.jsx("h1",{className:"text-2xl font-extrabold text-ink",children:Me}),w.jsx("p",{className:"text-sm text-ink2 mt-1 mb-6",children:Ae}),e===0&&w.jsx(I2,{mode:i,setMode:Z,frequency:l,setFrequency:h,people:p,setPeople:g}),e===1&&w.jsx(S2,{people:p,setPeople:g,savingsGoal:y,setSavingsGoal:E,frequency:l,rate:di}),e===2&&w.jsx(A2,{fixed:I,setFixed:x,frequency:l,rate:di}),$&&w.jsx("p",{className:"text-xs text-bad mt-4",children:$}),w.jsxs("div",{className:"flex justify-between mt-8",children:[e>0?w.jsx(An,{variant:"ghost",onClick:()=>t(e-1),disabled:O,children:"Atrás"}):w.jsx("span",{}),e<2?w.jsx(An,{onClick:()=>t(e+1),disabled:!me,children:"Continuar"}):w.jsx(An,{onClick:Se,disabled:O,children:O?"Guardando…":"Empezar"})]})]})})}function Oa({label:r,value:e,sign:t,bold:i,color:o}){return w.jsxs("div",{className:`flex items-center justify-between py-1.5 ${i?"font-bold":""}`,children:[w.jsx("span",{className:`text-sm ${i?"text-ink":"text-ink2"}`,children:r}),w.jsxs("span",{className:`text-sm font-mono font-semibold ${o||"text-ink"}`,children:[t&&w.jsx("span",{className:"text-muted mr-1",children:t}),ct(e)]})]})}function q0({income:r,fixedTotal:e,variableTotal:t,savings:i,frequency:o}){const l=Nk({income:r,fixed:e,variable:t,savings:i}),h=o==="quincenal"?"la quincena":"el mes",p=l.final>=0?"text-good":"text-bad";return w.jsxs(rn,{children:[w.jsxs("div",{className:"text-center pb-4 mb-3 border-b border-line",children:[w.jsxs("p",{className:"text-xs font-semibold text-muted uppercase tracking-wide mb-1",children:["Terminamos ",h," con"]}),w.jsx("p",{className:`text-4xl font-extrabold font-mono ${p}`,children:ct(l.final)}),l.final<0&&w.jsx("p",{className:"text-xs text-bad mt-1.5",children:"Los gastos y el ahorro superan los ingresos de este período."})]}),w.jsx(Oa,{label:"Ingresos",value:r,sign:"+"}),w.jsx(Oa,{label:"Gastos fijos",value:e,sign:"−"}),w.jsx(Oa,{label:"Gastos variables",value:t,sign:"−"}),w.jsx("div",{className:"border-t border-line mt-1 pt-1",children:w.jsx(Oa,{label:"Sobrante",value:l.sobrante,bold:!0,color:l.sobrante>=0?"text-ink":"text-bad"})}),i>0&&w.jsx(Oa,{label:"Meta de ahorro",value:i,sign:"−"})]})}function H0({items:r,rate:e,onTogglePaid:t,onPatchItem:i}){const[o,l]=pe.useState(null),[h,p]=pe.useState(""),g=bs(r,e),y=r.filter(x=>x.paid).length,E=x=>{l(x),p(String(r[x].amount||""))},I=()=>{if(o===null)return;const x=Number(h);!isNaN(x)&&x>=0&&x!==r[o].amount&&i(o,{amount:x}),l(null)};return w.jsx(rn,{title:"Gastos fijos",subtitle:r.length?`${y} de ${r.length} pagados`:null,action:w.jsx("span",{className:"text-sm font-bold font-mono text-ink",children:ct(g)}),children:r.length===0?w.jsx(dp,{icon:e2,text:"No hay gastos fijos. Agregalos en Ajustes → Gastos fijos."}):w.jsx("ul",{className:"divide-y divide-line -mx-1",children:r.map((x,O)=>w.jsxs("li",{className:`flex items-center gap-3 px-1 py-2.5 rounded-lg transition ${x.paid?"bg-green-50":""}`,children:[w.jsx("button",{type:"button",onClick:()=>t(O),"aria-label":x.paid?"Marcar como no pagado":"Marcar como pagado",className:`w-5 h-5 shrink-0 rounded-md border-2 flex items-center justify-center transition ${x.paid?"bg-good border-good text-white":"border-line bg-white text-transparent hover:border-good"}`,children:w.jsx(Bk,{size:13,strokeWidth:3})}),w.jsx("span",{className:`flex-1 text-sm truncate ${x.paid?"text-ink2 line-through decoration-good/40":"text-ink"}`,children:x.name}),o===O?w.jsx(ht,{type:"number",inputMode:"numeric",autoFocus:!0,className:"!w-28 !py-1 text-right font-mono",value:h,onChange:q=>p(q.target.value),onBlur:I,onKeyDown:q=>q.key==="Enter"&&I()}):w.jsxs("button",{type:"button",onClick:()=>E(O),title:"Editar monto (solo este período)",className:"text-sm font-mono font-semibold text-ink hover:text-accent",children:[j0(x.amount,x.currency),x.currency==="USD"&&w.jsxs("span",{className:"block text-[10px] text-muted font-sans font-normal",children:["≈ ",ct(Gc(x.amount,"USD",e))]})]})]},x.templateId||O))})})}const fp={home:Yk,utensils:u2,car:zk,zap:h2,heart:Qk,film:qk,shirt:s2,wallet:c2,cart:i2,gift:Kk,plane:t2,paw:Xk,book:Uk,dumbbell:Gk,baby:Fk,tag:B0},k2={vivienda:"home",alimentacion:"utensils",transporte:"car",servicios:"zap",salud:"heart",educacion:"book",entretenimiento:"film",ropa:"shirt",otros:"wallet"};function pp({category:r,size:e=16,className:t="text-ink2"}){const i=(r==null?void 0:r.icon)||k2[r==null?void 0:r.id]||"tag",o=fp[i]||B0;return w.jsx(o,{size:e,className:t,strokeWidth:2})}const C2=r=>`${parseInt(r.slice(8,10),10)}`;function W0({expenses:r,categories:e,rate:t,onAdd:i,onRemove:o}){const l=bs(r||[],t);return w.jsxs(rn,{title:"Gastos variables",subtitle:"Lo que va saliendo en el período",action:w.jsx("span",{className:"text-sm font-bold font-mono text-ink",children:ct(l)}),children:[!r||r.length===0?w.jsx(dp,{icon:n2,text:"Todavía no hay gastos variables este período."}):w.jsx("ul",{className:"divide-y divide-line -mx-1 mb-3",children:r.map(h=>{const p=w2(h.categoryId,e);return w.jsxs("li",{className:"flex items-center gap-3 px-1 py-2.5 group",children:[w.jsxs("span",{className:"w-7 shrink-0 text-center",children:[w.jsx("span",{className:"block text-[10px] text-muted font-semibold uppercase",children:"día"}),w.jsx("span",{className:"block text-sm font-bold text-ink2 -mt-0.5",children:C2(h.date)})]}),w.jsx("span",{className:"shrink-0",title:p.label,children:w.jsx(pp,{category:p})}),w.jsx("span",{className:"flex-1 text-sm text-ink truncate",children:h.description||p.label}),w.jsxs("span",{className:"text-sm font-mono font-semibold text-ink text-right",children:[j0(h.amount,h.currency),h.currency==="USD"&&w.jsxs("span",{className:"block text-[10px] text-muted font-sans font-normal",children:["≈ ",ct(Gc(h.amount,"USD",t))]})]}),w.jsx("button",{type:"button",onClick:()=>o(h.id),title:"Borrar gasto",className:"text-muted hover:text-bad p-1 opacity-0 group-hover:opacity-100 focus:opacity-100 transition",children:w.jsx(vl,{size:15})})]},h.id)})}),w.jsxs(An,{variant:"soft",className:"w-full flex items-center justify-center gap-1.5",onClick:i,children:[w.jsx(Kc,{size:16})," Agregar gasto"]})]})}function G0({categories:r,expenses:e,rate:t}){const i=Pk(e,t),o=r.map(h=>({...h,spent:i[h.id]||0})).filter(h=>h.budget>0||h.spent>0);if(o.length===0)return null;const l=o.some(h=>h.budget>0);return w.jsx(rn,{title:"Por categoría",subtitle:l?"Gasto variable del período contra tu presupuesto":"Definí presupuestos por categoría en Ajustes",children:w.jsx("div",{className:"space-y-3.5",children:o.map(h=>{const p=h.budget>0?h.spent/h.budget*100:0,g=h.budget>0&&h.spent>h.budget;return w.jsxs("div",{children:[w.jsxs("div",{className:"flex items-center justify-between mb-1",children:[w.jsxs("span",{className:"text-sm text-ink flex items-center gap-1.5",children:[w.jsx(pp,{category:h,size:15}),h.label]}),w.jsxs("span",{className:`text-xs font-mono font-semibold ${g?"text-bad":"text-ink2"}`,children:[ct(h.spent),h.budget>0&&w.jsxs("span",{className:"text-muted font-normal",children:[" / ",ct(h.budget)]})]})]}),h.budget>0&&w.jsx(f2,{pct:p,color:g?_2.bad:h.color})]},h.id)})})})}function R2({profile:r,period:e,expenses:t,rate:i,totals:o,onTogglePaid:l,onPatchItem:h,onAddExpense:p,onRemoveExpense:g}){return w.jsxs("div",{className:"space-y-4",children:[w.jsx(q0,{income:o.income,fixedTotal:o.fixed,variableTotal:o.variable,savings:e.savingsGoal||0,frequency:r.frequency}),w.jsx(H0,{items:e.fixedItems,rate:i,onTogglePaid:l,onPatchItem:h}),w.jsx(W0,{expenses:t,categories:r.categories,rate:i,onAdd:p,onRemove:g}),w.jsx(G0,{categories:r.categories,expenses:t||[],rate:i})]})}function P2({people:r,incomes:e,gastos:t,ahorro:i,rate:o,frequency:l}){const[h,p]=r,g=q=>{const $=(e==null?void 0:e[q.id])||{};return(Number($.crc)||0)+(Number($.usd)||0)*o},y=g(h),E=g(p),I=bk({income1:y,income2:E,gastos:t,ahorro:i}),x=l==="quincenal"?"quincena":"mes",O=({person:q,income:$,aporte:B})=>w.jsxs("div",{className:"flex-1 bg-bg2 rounded-xl p-3.5",children:[w.jsx("p",{className:"text-sm font-bold text-ink mb-2",children:q.name}),w.jsxs("dl",{className:"space-y-1 text-xs",children:[w.jsxs("div",{className:"flex justify-between",children:[w.jsx("dt",{className:"text-ink2",children:"Salario"}),w.jsx("dd",{className:"font-mono font-semibold text-ink",children:ct($)})]}),w.jsxs("div",{className:"flex justify-between",children:[w.jsx("dt",{className:"text-ink2",children:"Aporta a gastos"}),w.jsx("dd",{className:"font-mono font-semibold text-ink",children:ct(B)})]}),i>0&&w.jsxs("div",{className:"flex justify-between",children:[w.jsx("dt",{className:"text-ink2",children:"Ahorra"}),w.jsx("dd",{className:"font-mono font-semibold text-ink",children:ct(I.ahorroCada)})]})]})]});return w.jsxs(rn,{title:"Reparto proporcional",subtitle:`Cada uno aporta según su salario; a ambos les queda lo mismo por ${x}.`,children:[w.jsxs("div",{className:"flex gap-3 mb-4",children:[w.jsx(O,{person:h,income:y,aporte:I.aporte1}),w.jsx(O,{person:p,income:E,aporte:I.aporte2})]}),w.jsxs("div",{className:`rounded-xl px-4 py-3 text-center ${I.deficit?"bg-red-50":"bg-green-50"}`,children:[w.jsx("p",{className:"text-xs font-semibold text-ink2 mb-0.5",children:I.deficit?"A cada uno le falta":"A cada uno le queda"}),w.jsx("p",{className:`text-2xl font-extrabold font-mono ${I.deficit?"text-bad":"text-good"}`,children:ct(Math.abs(I.restante))})]}),I.desbalance&&w.jsxs("p",{className:"text-xs text-warn mt-3 leading-relaxed flex gap-1.5",children:[w.jsx(o2,{size:14,className:"shrink-0 mt-0.5"}),w.jsx("span",{children:"Un salario no alcanza para cubrir su parte del ahorro; el otro cubre todos los gastos del hogar. Revisá los montos o bajá la meta de ahorro."})]})]})}function N2({profile:r,period:e,expenses:t,rate:i,totals:o,onTogglePaid:l,onPatchItem:h,onAddExpense:p,onRemoveExpense:g}){return w.jsxs("div",{className:"space-y-4",children:[w.jsx(q0,{income:o.income,fixedTotal:o.fixed,variableTotal:o.variable,savings:e.savingsGoal||0,frequency:r.frequency}),w.jsx(P2,{people:r.people,incomes:e.incomes,gastos:o.fixed+o.variable,ahorro:e.savingsGoal||0,rate:i,frequency:r.frequency}),w.jsx(H0,{items:e.fixedItems,rate:i,onTogglePaid:l,onPatchItem:h}),w.jsx(W0,{expenses:t,categories:r.categories,rate:i,onAdd:p,onRemove:g}),w.jsx(G0,{categories:r.categories,expenses:t||[],rate:i})]})}function b2({profile:r,saveProfile:e,showToast:t}){const[i,o]=pe.useState({mode:r.mode,frequency:r.frequency,people:r.people.map($=>({...$})),savingsGoal:r.savingsGoal||"",exchangeRate:r.exchangeRate}),[l,h]=pe.useState(!1),[p,g]=pe.useState(!1),y=i.frequency==="quincenal"?"por quincena":"por mes",E=$=>{let B=i.people;$==="pareja"&&B.length===1?B=[...B,{id:"p2",name:"",incomeCRC:0,incomeUSD:0}]:$==="individual"&&(B=B.slice(0,1)),o({...i,mode:$,people:B})},I=($,B,Z)=>o({...i,people:i.people.map((ae,me)=>me===$?{...ae,[B]:Z}:ae)}),x=async()=>{g(!0);try{const $=await cp();o(B=>({...B,exchangeRate:$})),t(`Tipo de cambio BCCR: ₡${$}`)}catch{t("No se pudo obtener el tipo de cambio")}g(!1)},O=i.people.every($=>$.name.trim())&&Number(i.exchangeRate)>0,q=async()=>{h(!0),await e({mode:i.mode,frequency:i.frequency,people:i.people.map($=>({id:$.id,name:$.name.trim(),incomeCRC:Number($.incomeCRC)||0,incomeUSD:Number($.incomeUSD)||0})),savingsGoal:Number(i.savingsGoal)||0,exchangeRate:Number(i.exchangeRate),exchangeRateUpdatedAt:new Date().toISOString()}),h(!1),t("Perfil guardado")};return w.jsx(rn,{title:"Perfil",subtitle:"Los cambios aplican a los períodos nuevos; los pasados no se tocan.",children:w.jsxs("div",{className:"space-y-5",children:[w.jsxs("div",{className:"flex flex-wrap gap-x-8 gap-y-4",children:[w.jsxs("div",{children:[w.jsx("p",{className:"text-xs font-semibold text-ink2 mb-1.5",children:"Modo"}),w.jsx(Tc,{value:i.mode,onChange:E,options:[{value:"individual",label:"Individual"},{value:"pareja",label:"Pareja"}]})]}),w.jsxs("div",{children:[w.jsx("p",{className:"text-xs font-semibold text-ink2 mb-1.5",children:"Frecuencia"}),w.jsx(Tc,{value:i.frequency,onChange:$=>o({...i,frequency:$}),options:[{value:"mensual",label:"Mensual"},{value:"quincenal",label:"Quincenal"}]})]})]}),i.people.map(($,B)=>w.jsxs("div",{className:"grid grid-cols-3 gap-3",children:[w.jsx(pn,{label:i.mode==="pareja"?`Persona ${B+1}`:"Nombre",children:w.jsx(ht,{value:$.name,onChange:Z=>I(B,"name",Z.target.value)})}),w.jsx(pn,{label:`Salario ₡ ${y}`,children:w.jsx(ht,{type:"number",inputMode:"numeric",min:"0",value:$.incomeCRC,onChange:Z=>I(B,"incomeCRC",Z.target.value)})}),w.jsx(pn,{label:`Salario $ ${y}`,children:w.jsx(ht,{type:"number",inputMode:"numeric",min:"0",value:$.incomeUSD,onChange:Z=>I(B,"incomeUSD",Z.target.value)})})]},$.id)),w.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[w.jsx(pn,{label:`Meta de ahorro ₡ ${y}`,hint:i.mode==="pareja"?"Se divide 50/50.":null,children:w.jsx(ht,{type:"number",inputMode:"numeric",min:"0",value:i.savingsGoal,onChange:$=>o({...i,savingsGoal:$.target.value})})}),w.jsx(pn,{label:"Tipo de cambio (₡ por $)",hint:"Venta del BCCR; se actualiza solo cada día.",children:w.jsxs("div",{className:"flex gap-2",children:[w.jsx(ht,{type:"number",inputMode:"decimal",min:"1",step:"0.01",value:i.exchangeRate,onChange:$=>o({...i,exchangeRate:$.target.value})}),w.jsx(An,{variant:"ghost",onClick:x,disabled:p,className:"whitespace-nowrap",children:p?"…":"↻"})]})})]}),w.jsx(An,{onClick:q,disabled:!O||l,children:l?"Guardando…":"Guardar perfil"})]})})}function D2({uid:r,showToast:e,rate:t}){const{items:i,addItem:o,updateItem:l,removeItem:h}=V0(r),[p,g]=pe.useState({name:"",amount:"",currency:"CRC"});if(i===null)return w.jsx(rn,{title:"Gastos fijos",children:w.jsx("p",{className:"text-sm text-muted",children:"Cargando…"})});const y=async()=>{!p.name.trim()||!(Number(p.amount)>0)||(await o({...p,name:p.name.trim()}),g({name:"",amount:"",currency:"CRC"}),e("Gasto fijo agregado"))},E=(I,x,O)=>{const q=x==="amount"?Number(O)||0:O;q!==I[x]&&l(I.id,{[x]:q})};return w.jsxs(rn,{title:"Gastos fijos",subtitle:"Se copian a cada período nuevo. Los períodos ya creados no cambian.",action:w.jsx("span",{className:"text-sm font-bold font-mono text-ink",children:ct(bs(i,t))}),children:[w.jsxs("div",{className:"space-y-2 mb-4",children:[i.map(I=>w.jsxs("div",{className:"flex gap-2 items-center",children:[w.jsx(ht,{className:"flex-1",defaultValue:I.name,onBlur:x=>E(I,"name",x.target.value.trim()||I.name)}),w.jsx(ht,{type:"number",inputMode:"numeric",min:"0",className:"!w-28 text-right font-mono",defaultValue:I.amount,onBlur:x=>E(I,"amount",x.target.value)}),w.jsxs($0,{className:"!w-16 !px-1",value:I.currency,onChange:x=>E(I,"currency",x.target.value),children:[w.jsx("option",{value:"CRC",children:"₡"}),w.jsx("option",{value:"USD",children:"$"})]}),w.jsx("button",{type:"button",onClick:()=>h(I.id).then(()=>e("Gasto fijo eliminado")),className:"text-muted hover:text-bad p-1",title:"Eliminar",children:w.jsx(vl,{size:16})})]},I.id)),i.length===0&&w.jsx("p",{className:"text-sm text-muted py-2",children:"No hay gastos fijos todavía."})]}),w.jsxs("div",{className:"flex gap-2 items-center border-t border-line pt-4",children:[w.jsx(ht,{className:"flex-1",placeholder:"Nuevo gasto fijo",value:p.name,onChange:I=>g({...p,name:I.target.value})}),w.jsx(ht,{type:"number",inputMode:"numeric",min:"0",className:"!w-28 text-right font-mono",placeholder:"Monto",value:p.amount,onChange:I=>g({...p,amount:I.target.value}),onKeyDown:I=>I.key==="Enter"&&y()}),w.jsx(An,{variant:"soft",onClick:y,disabled:!p.name.trim()||!(Number(p.amount)>0),className:"!px-3",title:"Agregar",children:w.jsx(Kc,{size:16})})]})]})}const V2=Object.keys(fp);function O2({profile:r,saveProfile:e,showToast:t}){const[i,o]=pe.useState(r.categories.map(B=>({...B}))),[l,h]=pe.useState(null),[p,g]=pe.useState(!1),y=r.frequency==="quincenal"?"por quincena":"por mes",E=(B,Z,ae)=>o(i.map((me,Se)=>Se===B?{...me,[Z]:ae}:me)),I=B=>{const Z=Va.indexOf(i[B].color);E(B,"color",Va[(Z+1)%Va.length])},x=B=>o(i.filter((Z,ae)=>ae!==B)),O=()=>o([...i,{id:"cat_"+Date.now().toString(36),label:"",icon:"tag",color:Va[i.length%Va.length],budget:0}]),q=i.length>0&&i.every(B=>B.label.trim()),$=async()=>{g(!0),await e({categories:i.map(({emoji:B,...Z})=>({...Z,icon:Z.icon||"tag",label:Z.label.trim(),budget:Number(Z.budget)||0}))}),g(!1),t("Categorías guardadas")};return w.jsxs(rn,{title:"Categorías",subtitle:`El presupuesto es ${y}. Los gastos de una categoría borrada se muestran en la última.`,children:[w.jsx("div",{className:"space-y-2 mb-4",children:i.map((B,Z)=>w.jsxs("div",{children:[w.jsxs("div",{className:"flex gap-2 items-center",children:[w.jsx("button",{type:"button",onClick:()=>h(l===Z?null:Z),className:`w-9 h-9 shrink-0 rounded-lg border flex items-center justify-center hover:bg-bg2 ${l===Z?"border-accent bg-accent-soft":"border-line"}`,title:"Cambiar ícono",children:w.jsx(pp,{category:B,size:17})}),w.jsx(ht,{className:"flex-1",value:B.label,onChange:ae=>E(Z,"label",ae.target.value),placeholder:"Nombre"}),w.jsx("button",{type:"button",onClick:()=>I(Z),className:"w-8 h-8 shrink-0 rounded-lg border border-line",style:{background:B.color},title:"Cambiar color"}),w.jsx(ht,{type:"number",inputMode:"numeric",min:"0",className:"!w-28 text-right font-mono",value:B.budget||"",onChange:ae=>E(Z,"budget",ae.target.value),placeholder:"₡ ppto.",title:`Presupuesto ${y}`}),w.jsx("button",{type:"button",onClick:()=>x(Z),className:"text-muted hover:text-bad p-1",title:"Eliminar",children:w.jsx(vl,{size:16})})]}),l===Z&&w.jsx("div",{className:"flex flex-wrap gap-1.5 mt-2 p-2.5 bg-bg2 rounded-xl",children:V2.map(ae=>{const me=fp[ae];return w.jsx("button",{type:"button",onClick:()=>{E(Z,"icon",ae),h(null)},className:`w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white ${(B.icon||"tag")===ae?"bg-white shadow-sm text-accent":"text-ink2"}`,children:w.jsx(me,{size:17})},ae)})})]},B.id))}),w.jsxs("div",{className:"flex gap-2",children:[w.jsxs(An,{variant:"ghost",onClick:O,className:"flex items-center gap-1.5",children:[w.jsx(Kc,{size:15})," Agregar categoría"]}),w.jsx(An,{onClick:$,disabled:!q||p,children:p?"Guardando…":"Guardar categorías"})]})]})}async function K0(r){const[e,t,i,o]=await Promise.all([cA(_c(r)),Vd(vc(r)),Vd(gk(r)),Vd(up(r))]);return{profile:e.exists()?e.data():null,fixedTemplate:t.docs.map(l=>({id:l.id,...l.data()})),periods:i.docs.map(l=>({id:l.id,...l.data()})),expenses:o.docs.map(l=>({id:l.id,...l.data()}))}}async function M2(r){const e=await K0(r),t=new Date().toISOString().slice(0,10),i=new Blob([JSON.stringify({exportedAt:new Date().toISOString(),...e},null,2)],{type:"application/json"}),o=URL.createObjectURL(i),l=document.createElement("a");l.href=o,l.download=`clear-books-respaldo-${t}.json`,l.click(),URL.revokeObjectURL(o)}function L2({uid:r,showToast:e}){const[t,i]=pe.useState(!1),o=async()=>{i(!0);try{await M2(r),e("Respaldo descargado")}catch{e("No se pudo descargar el respaldo")}i(!1)};return w.jsx(rn,{title:"Datos",subtitle:"Descargá una copia de todo (perfil, gastos fijos, períodos y gastos) en un archivo JSON.",children:w.jsxs(An,{variant:"ghost",onClick:o,disabled:t,className:"flex items-center gap-1.5",children:[w.jsx(Wk,{size:15}),t?"Preparando…":"Descargar respaldo"]})})}function j2({uid:r,profile:e,saveProfile:t,onBack:i,showToast:o}){const l=e.exchangeRate||di;return w.jsxs("div",{className:"max-w-xl mx-auto px-4 py-6 pb-16",children:[w.jsxs("header",{className:"flex items-center gap-3 mb-5",children:[w.jsx("button",{type:"button",onClick:i,className:"w-9 h-9 rounded-xl border border-line bg-white text-ink2 hover:bg-bg2 flex items-center justify-center","aria-label":"Volver",children:w.jsx(hp,{size:18})}),w.jsx("h1",{className:"text-lg font-extrabold text-ink",children:"Ajustes"})]}),w.jsxs("div",{className:"space-y-4",children:[w.jsx(b2,{profile:e,saveProfile:t,showToast:o}),w.jsx(D2,{uid:r,showToast:o,rate:l}),w.jsx(O2,{profile:e,saveProfile:t,showToast:o}),w.jsx(L2,{uid:r,showToast:o})]})]})}function F2({uid:r,profile:e,onBack:t}){const[i,o]=pe.useState(null);pe.useEffect(()=>{let y=!0;return K0(r).then(({periods:E,expenses:I})=>{if(!y)return;const x=E.map(O=>{const q=O.exchangeRate||di,$=Object.values(O.incomes||{}).reduce((me,Se)=>me+(Number(Se.crc)||0)+(Number(Se.usd)||0)*q,0),B=bs(O.fixedItems||[],q),Z=bs(I.filter(me=>me.periodKey===O.key),q),ae=Number(O.savingsGoal)||0;return{key:O.key,income:$,gastos:B+Z,savings:ae,final:$-B-Z-ae}}).sort((O,q)=>q.key.localeCompare(O.key));o(x)}),()=>{y=!1}},[r]);const l=Ec(e.frequency),h=(i==null?void 0:i.filter(y=>y.key!==l))||[],p=h.reduce((y,E)=>y+E.savings,0),g=h.filter(y=>y.final>=0).length;return w.jsxs("div",{className:"max-w-xl mx-auto px-4 py-6 pb-16",children:[w.jsxs("header",{className:"flex items-center gap-3 mb-5",children:[w.jsx("button",{type:"button",onClick:t,className:"w-9 h-9 rounded-xl border border-line bg-white text-ink2 hover:bg-bg2 flex items-center justify-center","aria-label":"Volver",children:w.jsx(hp,{size:18})}),w.jsx("h1",{className:"text-lg font-extrabold text-ink",children:"Historial"})]}),i===null?w.jsx("p",{className:"text-sm text-muted text-center py-16",children:"Cargando…"}):i.length===0?w.jsx(rn,{children:w.jsx(dp,{icon:z0,text:"Todavía no hay períodos guardados."})}):w.jsxs("div",{className:"space-y-4",children:[h.length>0&&w.jsxs(rn,{children:[w.jsxs("div",{className:"flex items-center gap-3",children:[w.jsx("div",{className:"w-10 h-10 rounded-xl bg-accent-soft text-accent flex items-center justify-center shrink-0",children:w.jsx(Zk,{size:20})}),w.jsxs("div",{className:"flex-1",children:[w.jsx("p",{className:"text-xs font-semibold text-ink2",children:"Ahorro acumulado (metas de períodos pasados)"}),w.jsx("p",{className:"text-2xl font-extrabold font-mono text-ink",children:ct(p)})]})]}),w.jsxs("p",{className:"text-[11px] text-muted mt-2",children:[g," de ",h.length," períodos terminaron en positivo."]})]}),w.jsx(rn,{title:"Períodos",subtitle:"Con cuánto terminaron cada uno, después del ahorro.",children:w.jsx("ul",{className:"divide-y divide-line -mx-1",children:i.map(y=>w.jsxs("li",{className:"flex items-center gap-3 px-1 py-3",children:[w.jsxs("div",{className:"flex-1",children:[w.jsxs("p",{className:"text-sm font-semibold text-ink",children:[M0(y.key),y.key===l&&w.jsx("span",{className:"ml-2 text-[10px] font-bold uppercase tracking-wide text-accent bg-accent-soft rounded-full px-2 py-0.5",children:"En curso"})]}),w.jsxs("p",{className:"text-[11px] text-muted",children:["Ingresos ",ct(y.income)," · Gastos ",ct(y.gastos),y.savings>0&&w.jsxs(w.Fragment,{children:[" · Ahorro ",ct(y.savings)]})]})]}),w.jsx("span",{className:`text-sm font-mono font-bold ${y.final>=0?"text-good":"text-bad"}`,children:ct(y.final)})]},y.key))})})]})]})}function U2({text:r="Cargando…"}){return w.jsx("div",{className:"min-h-screen bg-bg flex items-center justify-center",children:w.jsx("div",{className:"text-muted text-sm font-medium tracking-widest uppercase",children:r})})}function z2({uid:r,profile:e,onOpenHistory:t,onOpenSettings:i,onSignOut:o,showToast:l}){const[h,p]=pe.useState(()=>Ec(e.frequency));pe.useEffect(()=>{p(Ec(e.frequency))},[e.frequency]);const{items:g}=V0(r),{period:y,togglePaid:E,patchFixedItem:I}=kk(r,h,e,g),{expenses:x,addExpense:O,removeExpense:q}=Ck(r,h),[$,B]=pe.useState(!1),Z=(y==null?void 0:y.exchangeRate)??e.exchangeRate??di,ae=(()=>{if(!y)return w.jsx("div",{className:"text-center text-muted text-sm py-16",children:"Preparando el período…"});const Se={income:e.people.reduce((Ae,R)=>{var C;const S=((C=y.incomes)==null?void 0:C[R.id])||{};return Ae+(Number(S.crc)||0)+(Number(S.usd)||0)*Z},0),fixed:bs(y.fixedItems,Z),variable:bs(x||[],Z)},Me=e.mode==="pareja"?N2:R2;return w.jsx(Me,{profile:e,period:y,expenses:x,rate:Z,totals:Se,onTogglePaid:E,onPatchItem:I,onAddExpense:()=>B(!0),onRemoveExpense:Ae=>q(Ae).then(()=>l("Gasto borrado"))})})();return w.jsxs("div",{className:"max-w-xl mx-auto px-4 py-6 pb-16",children:[w.jsx(g2,{profile:e,rate:Z,periodKey:h,setPeriodKey:p,onOpenHistory:t,onOpenSettings:i,onSignOut:o}),ae,$&&w.jsx(y2,{periodKey:h,categories:e.categories,onSave:me=>O(me).then(()=>l("Gasto agregado")),onClose:()=>B(!1)})]})}function B2({user:r,onSignOut:e}){const{profile:t,saveProfile:i}=vk(r.uid),[o,l]=pe.useState("dashboard"),[h,p]=pe.useState(null),g=pe.useRef(null),y=I=>{clearTimeout(g.current),p(I),g.current=setTimeout(()=>p(null),2500)},E=!!t&&Ok(t.exchangeRateUpdatedAt);return pe.useEffect(()=>{E&&cp().then(I=>i({exchangeRate:I,exchangeRateUpdatedAt:new Date().toISOString()})).catch(()=>{})},[E]),t===void 0?w.jsx(U2,{}):t===null||!t.onboardingComplete?w.jsx(x2,{uid:r.uid}):w.jsxs("div",{className:"min-h-screen bg-bg",children:[o==="settings"?w.jsx(j2,{uid:r.uid,profile:t,saveProfile:i,onBack:()=>l("dashboard"),showToast:y}):o==="history"?w.jsx(F2,{uid:r.uid,profile:t,onBack:()=>l("dashboard")}):w.jsx(z2,{uid:r.uid,profile:t,onOpenHistory:()=>l("history"),onOpenSettings:()=>l("settings"),onSignOut:e,showToast:y}),w.jsx(p2,{message:h})]})}const l_=`
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
`,jd={fontFamily:"'Plus Jakarta Sans', system-ui, sans-serif"},$2=()=>w.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 18 18",fill:"none",children:[w.jsx("path",{d:"M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z",fill:"#4285F4"}),w.jsx("path",{d:"M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z",fill:"#34A853"}),w.jsx("path",{d:"M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z",fill:"#FBBC05"}),w.jsx("path",{d:"M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z",fill:"#EA4335"})]});function q2({children:r}){const[e,t]=pe.useState(void 0),[i,o]=pe.useState(!1),[l,h]=pe.useState(null);if(pe.useEffect(()=>tx(hf,p=>t(p)),[]),e===void 0)return w.jsxs("div",{style:{background:"#f8fafc",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",...jd},children:[w.jsx("style",{children:l_}),w.jsx("div",{style:{color:"#94a3b8",fontSize:"0.875rem",fontWeight:500,letterSpacing:"0.1em",textTransform:"uppercase"},children:"Cargando…"})]});if(!e){const p=async()=>{o(!0),h(null);try{await Tx(hf,new Nr)}catch(g){g.code!=="auth/popup-closed-by-user"&&h("No se pudo iniciar sesión. Intentá de nuevo.")}finally{o(!1)}};return w.jsxs("div",{style:{background:"#f8fafc",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"2rem",...jd},children:[w.jsx("style",{children:l_}),w.jsxs("div",{style:{width:"100%",maxWidth:"380px",textAlign:"center"},children:[w.jsx("div",{style:{color:"#4f46e5",fontSize:"0.7rem",fontWeight:600,letterSpacing:"0.25em",textTransform:"uppercase",marginBottom:"1.5rem"},children:"Libro de cuentas"}),w.jsxs("h1",{style:{fontSize:"3rem",fontWeight:800,color:"#0f172a",lineHeight:1.05,letterSpacing:"-0.02em",marginBottom:"0.75rem"},children:["Finanzas",w.jsx("br",{}),w.jsx("em",{style:{color:"#4f46e5",fontStyle:"italic",fontWeight:700},children:"personales."})]}),w.jsx("p",{style:{color:"#475569",fontSize:"0.9rem",lineHeight:1.6,marginBottom:"2.5rem"},children:"Iniciá sesión para acceder a tus datos desde cualquier dispositivo."}),w.jsxs("button",{onClick:p,disabled:i,style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"0.625rem",width:"100%",padding:"0.875rem 1.5rem",background:"white",border:"1px solid #e2e8f0",borderRadius:"0.875rem",fontSize:"0.9rem",fontWeight:600,color:"#0f172a",cursor:i?"not-allowed":"pointer",opacity:i?.6:1,boxShadow:"0 1px 3px rgba(0,0,0,0.08)",transition:"box-shadow 150ms",...jd},children:[w.jsx($2,{}),i?"Iniciando sesión…":"Continuar con Google"]}),l&&w.jsx("p",{style:{color:"#dc2626",fontSize:"0.8rem",marginTop:"1rem"},children:l})]})]})}return typeof r=="function"?r(e):r}uw.createRoot(document.getElementById("root")).render(w.jsx(pe.StrictMode,{children:w.jsx(q2,{children:r=>w.jsx(B2,{user:r,onSignOut:()=>nx(hf)})})}));
