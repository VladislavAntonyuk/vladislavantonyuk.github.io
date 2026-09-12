//! Licensed to the .NET Foundation under one or more agreements.
//! The .NET Foundation licenses this file to you under the MIT license.

const e=()=>(async()=>{try{return new WebAssembly.Module(Uint8Array.from(atob("AGFzbQEAAAABBAFgAAADAgEAChABDgACaR9AAQMAAAsACxoL"),e=>e.codePointAt(0))),!0}catch(e){return!1}})(),o=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,15,1,13,0,65,1,253,15,65,2,253,15,253,128,2,11])),t=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])),n=Symbol.for("wasm promise_control");function r(e,o){let t=null;const r=new Promise(function(n,r){t={isDone:!1,promise:null,resolve:o=>{t.isDone||(t.isDone=!0,n(o),e&&e())},reject:e=>{t.isDone||(t.isDone=!0,r(e),o&&o())}}});t.promise=r;const s=r;return s[n]=t,{promise:s,promise_control:t}}function s(e){return e[n]}function i(e){e&&function(e){return void 0!==e[n]}(e)||We(!1,"Promise is not controllable")}const a="__mono_message__",l=["debug","log","trace","warn","info","error"],c="MONO_WASM: ";let d,u,f,m,g,p;function h(e){m=e}function b(e){if(ke.diagnosticTracing){const o="function"==typeof e?e():e;console.debug(c+o)}}function w(e,...o){console.info(c+e,...o)}function y(e,...o){console.info(e,...o)}function v(e,...o){console.warn(c+e,...o)}function _(e,...o){if(o&&o.length>0&&o[0]&&"object"==typeof o[0]){if(o[0].silent)return;if(o[0].toString)return void console.error(c+e,o[0].toString())}console.error(c+e,...o)}function A(e,o,t){return function(...n){try{let r=n[0];if(void 0===r)r="undefined";else if(null===r)r="null";else if("function"==typeof r)r=r.toString();else if("string"!=typeof r)try{r=JSON.stringify(r)}catch(e){r=r.toString()}o(t?JSON.stringify({method:e,payload:r,arguments:n.slice(1)}):[e+r,...n.slice(1)])}catch(e){f.error(`proxyConsole failed: ${e}`)}}}function x(e,o,t){u=o,m=e,f={...o};const n=`${t}/console`.replace("https://","wss://").replace("http://","ws://");d=new WebSocket(n),d.addEventListener("error",E),d.addEventListener("close",j),function(){for(const e of l)u[e]=A(`console.${e}`,R,!0)}()}function T(e){let o=30;const t=()=>{d?0==d.bufferedAmount||0==o?(e&&y(e),function(){for(const e of l)u[e]=A(`console.${e}`,f.log,!1)}(),d.removeEventListener("error",E),d.removeEventListener("close",j),d.close(1e3,e),d=void 0):(o--,globalThis.setTimeout(t,100)):e&&f&&f.log(e)};t()}function R(e){d&&d.readyState===WebSocket.OPEN?d.send(e):f.log(e)}function E(e){f.error(`[${m}] proxy console websocket error: ${e}`,e)}function j(e){f.debug(`[${m}] proxy console websocket closed: ${e}`,e)}function D(){ke.preferredIcuAsset=C(ke.config);let e="invariant"==ke.config.globalizationMode;if(!e)if(ke.preferredIcuAsset)ke.diagnosticTracing&&b("ICU data archive(s) available, disabling invariant mode");else{if("custom"===ke.config.globalizationMode||"all"===ke.config.globalizationMode||"sharded"===ke.config.globalizationMode){const e="invariant globalization mode is inactive and no ICU data archives are available";throw _(`ERROR: ${e}`),new Error(e)}ke.diagnosticTracing&&b("ICU data archive(s) not available, using invariant globalization mode"),e=!0,ke.preferredIcuAsset=null}const o="DOTNET_SYSTEM_GLOBALIZATION_INVARIANT",t=ke.config.environmentVariables;if(void 0===t[o]&&e&&(t[o]="1"),void 0===t.TZ)try{const e=Intl.DateTimeFormat().resolvedOptions().timeZone||null;e&&(t.TZ=e)}catch(e){w("failed to detect timezone, will fallback to UTC")}}function C(e){var o;if((null===(o=e.resources)||void 0===o?void 0:o.icu)&&"invariant"!=e.globalizationMode){const o=e.applicationCulture||(Me?globalThis.navigator&&globalThis.navigator.languages&&globalThis.navigator.languages[0]:Intl.DateTimeFormat().resolvedOptions().locale);e.applicationCulture||(e.applicationCulture=o);const t=e.resources.icu;let n=null;if("custom"===e.globalizationMode){if(t.length>=1)return t[0].name}else o&&"all"!==e.globalizationMode?"sharded"===e.globalizationMode&&(n=function(e){const o=e.split("-")[0];return"en"===o||["fr","fr-FR","it","it-IT","de","de-DE","es","es-ES"].includes(e)?"icudt_EFIGS.dat":["zh","ko","ja"].includes(o)?"icudt_CJK.dat":"icudt_no_CJK.dat"}(o)):n="icudt.dat";if(n)for(let e=0;e<t.length;e++){const o=t[e];if(o.virtualPath===n)return o.name}}return e.globalizationMode="invariant",null}(new Date).valueOf();const M=class{constructor(e){this.url=e}toString(){return this.url}};async function S(e){if(Se&&"function"!=typeof globalThis.atob){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";globalThis.atob=o=>{const t=String(o).replace(/=+$/,"");let n="";for(let o=0,r=0,s=0;s<t.length;s++){const i=e.indexOf(t.charAt(s));-1!==i&&(r=o%4?64*r+i:i,o++%4&&(n+=String.fromCharCode(255&r>>(-2*o&6))))}return n}}if(Ee){const e=await import(/*! webpackIgnore: true */"process"),o=14;if(e.versions.node.split(".")[0]<o)throw new Error(`NodeJS at '${e.execPath}' has too low version '${e.versions.node}', please use at least ${o}.`)}const o=/*! webpackIgnore: true */import.meta.url,t=o.indexOf("?");var n;if(t>0&&(ke.modulesUniqueQuery=o.substring(t)),ke.scriptUrl=o.replace(/\\/g,"/").replace(/[?#].*/,""),ke.scriptDirectory=(n=ke.scriptUrl).slice(0,n.lastIndexOf("/"))+"/",ke.locateFile=e=>"URL"in globalThis&&globalThis.URL!==M?new URL(e,ke.scriptDirectory).toString():I(e)?e:ke.scriptDirectory+e,ke.fetch_like=U,ke.out=console.log,ke.err=console.error,ke.onDownloadResourceProgress=e.onDownloadResourceProgress,Me&&globalThis.navigator){const e=globalThis.navigator,o=e.userAgentData&&e.userAgentData.brands;o&&o.length>0?ke.isChromium=o.some(e=>"Google Chrome"===e.brand||"Microsoft Edge"===e.brand||"Chromium"===e.brand):e.userAgent&&(ke.isChromium=e.userAgent.includes("Chrome"),ke.isFirefox=e.userAgent.includes("Firefox"))}void 0===globalThis.URL&&(globalThis.URL=M)}async function U(e,o){try{const t="function"==typeof globalThis.fetch;if(Ee){const n=e.startsWith("file://");if(!n&&t)return globalThis.fetch(e,o||{credentials:"same-origin"});g||(p=await import(/*! webpackIgnore: true */"url"),g=await import(/*! webpackIgnore: true */"fs")),n&&(e=p.fileURLToPath(e));const r=await g.promises.readFile(e);return{ok:!0,headers:{length:0,get:()=>null},url:e,arrayBuffer:()=>r,json:()=>JSON.parse(r),text:()=>{throw new Error("NotImplementedException")}}}if(t)return globalThis.fetch(e,o||{credentials:"same-origin"});if("function"==typeof read)return{ok:!0,url:e,headers:{length:0,get:()=>null},arrayBuffer:()=>new Uint8Array(read(e,"binary")),json:()=>JSON.parse(read(e,"utf8")),text:()=>read(e,"utf8")}}catch(o){return{ok:!1,url:e,status:500,headers:{length:0,get:()=>null},statusText:"ERR28: "+o,arrayBuffer:()=>{throw o},json:()=>{throw o},text:()=>{throw o}}}throw new Error("No fetch implementation available")}const P=/^[a-zA-Z][a-zA-Z\d+\-.]*?:\/\//,k=/[a-zA-Z]:[\\/]/;function I(e){return Ee||Se?e.startsWith("/")||e.startsWith("\\")||-1!==e.indexOf("///")||k.test(e):P.test(e)}let O,$=0;const L=[],N=[],z=new Map,F={"js-module-runtime":!0,"js-module-dotnet":!0,"js-module-native":!0,"js-module-diagnostics":!0},W={...F,"js-module-library-initializer":!0},V={...F,dotnetwasm:!0,heap:!0,manifest:!0},B={...W,manifest:!0},J={...W,dotnetwasm:!0},H={dotnetwasm:!0,symbols:!0},Q={...W,dotnetwasm:!0,symbols:!0},q={symbols:!0};function G(e){return!("icu"==e.behavior&&e.name!=ke.preferredIcuAsset)}function Z(e,o,t){null!=o||(o=[]),We(1==o.length,`Expect to have one ${t} asset in resources`);const n=o[0];return n.behavior=t,K(n),e.push(n),n}function K(e){V[e.behavior]&&z.set(e.behavior,e)}function X(e){We(V[e],`Unknown single asset behavior ${e}`);const o=z.get(e);if(o&&!o.resolvedUrl)if(o.resolvedUrl=ke.locateFile(o.name),F[o.behavior]){const e=me(o);e?("string"!=typeof e&&We(!1,"loadBootResource response for 'dotnetjs' type should be a URL string"),o.resolvedUrl=e):o.resolvedUrl=le(o.resolvedUrl,o.behavior)}else if("dotnetwasm"!==o.behavior)throw new Error(`Unknown single asset behavior ${e}`);return o}function Y(e){const o=X(e);return We(o,`Single asset for ${e} not found`),o}let ee=!1;async function oe(){if(!ee){ee=!0,ke.diagnosticTracing&&b("mono_download_assets");try{const e=[],o=[],t=(e,o)=>{!Q[e.behavior]&&G(e)&&ke.expected_instantiated_assets_count++,!J[e.behavior]&&G(e)&&(ke.expected_downloaded_assets_count++,o.push(se(e)))};for(const o of L)t(o,e);for(const e of N)t(e,o);ke.allDownloadsQueued.promise_control.resolve(),Promise.all([...e,...o]).then(()=>{ke.allDownloadsFinished.promise_control.resolve()}).catch(e=>{throw ke.err("Error in mono_download_assets: "+e),Xe(1,e),e}),await ke.runtimeModuleLoaded.promise;const n=async e=>{const o=await e;if(H[o.behavior])return"symbols"===o.behavior&&(await Pe.instantiate_symbols_asset(o),ge(o)),void++ke.actual_downloaded_assets_count;if(o.buffer){if(!Q[o.behavior]){o.buffer&&"object"==typeof o.buffer||We(!1,"asset buffer must be array-like or buffer-like or promise of these"),"string"!=typeof o.resolvedUrl&&We(!1,"resolvedUrl must be string");const e=o.resolvedUrl,t=await o.buffer,n=new Uint8Array(t);ge(o),await Pe.beforeOnRuntimeInitialized.promise,await Pe.afterInstantiateWasm.promise,Pe.instantiate_asset(o,e,n)}}else o.isOptional||We(!1,"Expected asset to have the downloaded buffer"),!J[o.behavior]&&G(o)&&ke.expected_downloaded_assets_count--,!Q[o.behavior]&&G(o)&&ke.expected_instantiated_assets_count--},r=[],s=[];for(const o of e)r.push(n(o));for(const e of o)s.push(n(e));Promise.all(r).then(()=>{Ce||Pe.coreAssetsInMemory.promise_control.resolve()}).catch(e=>{throw ke.err("Error in mono_download_assets: "+e),Xe(1,e),e}),Promise.all(s).then(async()=>{Ce||(await Pe.coreAssetsInMemory.promise,Pe.allAssetsInMemory.promise_control.resolve())}).catch(e=>{throw ke.err("Error in mono_download_assets: "+e),Xe(1,e),e})}catch(e){throw ke.err("Error in mono_download_assets: "+e),e}}}let te=!1;function ne(){if(te)return;te=!0;const e=ke.config,o=[];if(e.assets)for(const o of e.assets)"object"!=typeof o&&We(!1,`asset must be object, it was ${typeof o} : ${o}`),"string"!=typeof o.behavior&&We(!1,"asset behavior must be known string"),"string"!=typeof o.name&&We(!1,"asset name must be string"),o.resolvedUrl&&"string"!=typeof o.resolvedUrl&&We(!1,"asset resolvedUrl could be string"),o.hash&&"string"!=typeof o.hash&&We(!1,"asset resolvedUrl could be string"),o.pendingDownload&&"object"!=typeof o.pendingDownload&&We(!1,"asset pendingDownload could be object"),o.isCore?L.push(o):N.push(o),K(o);else if(e.resources){const t=e.resources;t.wasmNative||We(!1,"resources.wasmNative must be defined"),t.jsModuleNative||We(!1,"resources.jsModuleNative must be defined"),t.jsModuleRuntime||We(!1,"resources.jsModuleRuntime must be defined"),Z(N,t.wasmNative,"dotnetwasm"),Z(o,t.jsModuleNative,"js-module-native"),Z(o,t.jsModuleRuntime,"js-module-runtime"),t.jsModuleDiagnostics&&Z(o,t.jsModuleDiagnostics,"js-module-diagnostics");const n=(e,o,t)=>{const n=e;n.behavior=o,t?(n.isCore=!0,L.push(n)):N.push(n)};if(t.coreAssembly)for(let e=0;e<t.coreAssembly.length;e++)n(t.coreAssembly[e],"assembly",!0);if(t.assembly)for(let e=0;e<t.assembly.length;e++)n(t.assembly[e],"assembly",!t.coreAssembly);if(0!=e.debugLevel&&ke.isDebuggingSupported()){if(t.corePdb)for(let e=0;e<t.corePdb.length;e++)n(t.corePdb[e],"pdb",!0);if(t.pdb)for(let e=0;e<t.pdb.length;e++)n(t.pdb[e],"pdb",!t.corePdb)}if(e.loadAllSatelliteResources&&t.satelliteResources)for(const e in t.satelliteResources)for(let o=0;o<t.satelliteResources[e].length;o++){const r=t.satelliteResources[e][o];r.culture=e,n(r,"resource",!t.coreAssembly)}if(t.coreVfs)for(let e=0;e<t.coreVfs.length;e++)n(t.coreVfs[e],"vfs",!0);if(t.vfs)for(let e=0;e<t.vfs.length;e++)n(t.vfs[e],"vfs",!t.coreVfs);const r=C(e);if(r&&t.icu)for(let e=0;e<t.icu.length;e++){const o=t.icu[e];o.name===r&&n(o,"icu",!1)}if(t.wasmSymbols)for(let e=0;e<t.wasmSymbols.length;e++)n(t.wasmSymbols[e],"symbols",!1)}if(e.appsettings)for(let o=0;o<e.appsettings.length;o++){const t=e.appsettings[o],n=pe(t);"appsettings.json"!==n&&n!==`appsettings.${e.applicationEnvironment}.json`||N.push({name:t,behavior:"vfs",cache:"no-cache",useCredentials:!0})}e.assets=[...L,...N,...o]}async function re(e){const o=await se(e);return await o.pendingDownloadInternal.response,o.buffer}async function se(e){try{return await ie(e)}catch(o){if(!ke.enableDownloadRetry)throw o;if(Se||Ee)throw o;if(e.pendingDownload&&e.pendingDownloadInternal==e.pendingDownload)throw o;if(e.resolvedUrl&&-1!=e.resolvedUrl.indexOf("file://"))throw o;if(o&&404==o.status)throw o;e.pendingDownloadInternal=void 0,await ke.allDownloadsQueued.promise;try{return ke.diagnosticTracing&&b(`Retrying download '${e.name}'`),await ie(e)}catch(o){return e.pendingDownloadInternal=void 0,await new Promise(e=>globalThis.setTimeout(e,100)),ke.diagnosticTracing&&b(`Retrying download (2) '${e.name}' after delay`),await ie(e)}}}async function ie(e){for(;O;)await O.promise;try{++$,$==ke.maxParallelDownloads&&(ke.diagnosticTracing&&b("Throttling further parallel downloads"),O=r());const o=await async function(e){if(e.pendingDownload&&(e.pendingDownloadInternal=e.pendingDownload),e.pendingDownloadInternal&&e.pendingDownloadInternal.response)return e.pendingDownloadInternal.response;if(e.buffer){const o=await e.buffer;return e.resolvedUrl||(e.resolvedUrl="undefined://"+e.name),e.pendingDownloadInternal={url:e.resolvedUrl,name:e.name,response:Promise.resolve({ok:!0,arrayBuffer:()=>o,json:()=>JSON.parse(new TextDecoder("utf-8").decode(o)),text:()=>new TextDecoder("utf-8").decode(o),headers:{get:()=>{}}})},e.pendingDownloadInternal.response}const o=e.loadRemote&&ke.config.remoteSources?ke.config.remoteSources:[""];let t;for(let n of o){n=n.trim(),"./"===n&&(n="");const o=ae(e,n);e.name===o?ke.diagnosticTracing&&b(`Attempting to download '${o}'`):ke.diagnosticTracing&&b(`Attempting to download '${o}' for ${e.name}`);try{e.resolvedUrl=o;const n=ue(e);if(e.pendingDownloadInternal=n,t=await n.response,!t||!t.ok)continue;return t}catch(e){t||(t={ok:!1,url:o,status:0,statusText:""+e});continue}}const n=e.isOptional||e.name.match(/\.pdb$/)&&ke.config.ignorePdbLoadErrors;if(t||We(!1,`Response undefined ${e.name}`),!n){const o=new Error(`download '${t.url}' for ${e.name} failed ${t.status} ${t.statusText}`);throw o.status=t.status,o}w(`optional download '${t.url}' for ${e.name} failed ${t.status} ${t.statusText}`)}(e);return o?(H[e.behavior]||(e.buffer=await o.arrayBuffer(),++ke.actual_downloaded_assets_count),e):e}finally{if(--$,O&&$==ke.maxParallelDownloads-1){ke.diagnosticTracing&&b("Resuming more parallel downloads");const e=O;O=void 0,e.promise_control.resolve()}}}function ae(e,o){let t;return null==o&&We(!1,`sourcePrefix must be provided for ${e.name}`),e.resolvedUrl?t=e.resolvedUrl:(t=""===o?"assembly"===e.behavior||"pdb"===e.behavior?e.name:"resource"===e.behavior&&e.culture&&""!==e.culture?`${e.culture}/${e.name}`:e.name:o+e.name,t=le(ke.locateFile(t),e.behavior)),t&&"string"==typeof t||We(!1,"attemptUrl need to be path or url string"),t}function le(e,o){return ke.modulesUniqueQuery&&B[o]&&(e+=ke.modulesUniqueQuery),e}let ce=0;const de=new Set;function ue(e){try{e.resolvedUrl||We(!1,"Request's resolvedUrl must be set");const o=function(e){let o=e.resolvedUrl;if(ke.loadBootResource){const t=me(e);if(t instanceof Promise)return t;"string"==typeof t&&(o=t)}const t={};return e.cache?t.cache=e.cache:ke.config.disableNoCacheFetch||(t.cache="no-cache"),e.useCredentials?t.credentials="include":!ke.config.disableIntegrityCheck&&e.hash&&(t.integrity=e.hash),ke.fetch_like(o,t)}(e),t={name:e.name,url:e.resolvedUrl,response:o};return de.add(e.name),t.response.then(()=>{"assembly"==e.behavior&&ke.loadedAssemblies.push(e.name),ce++,ke.onDownloadResourceProgress&&ke.onDownloadResourceProgress(ce,de.size)}),t}catch(o){const t={ok:!1,url:e.resolvedUrl,status:500,statusText:"ERR29: "+o,arrayBuffer:()=>{throw o},json:()=>{throw o}};return{name:e.name,url:e.resolvedUrl,response:Promise.resolve(t)}}}const fe={resource:"assembly",assembly:"assembly",pdb:"pdb",icu:"globalization",vfs:"configuration",manifest:"manifest",dotnetwasm:"dotnetwasm","js-module-dotnet":"dotnetjs","js-module-native":"dotnetjs","js-module-runtime":"dotnetjs"};function me(e){var o;if(ke.loadBootResource){const t=null!==(o=e.hash)&&void 0!==o?o:"",n=e.resolvedUrl,r=fe[e.behavior];if(r){const o=ke.loadBootResource(r,e.name,n,t,e.behavior);return"string"==typeof o?function(e){return"string"!=typeof e&&We(!1,"url must be a string"),!I(e)&&0!==e.indexOf("./")&&0!==e.indexOf("../")&&globalThis.URL&&globalThis.document&&globalThis.document.baseURI&&(e=new URL(e,globalThis.document.baseURI).toString()),e}(o):o}}}function ge(e){e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null}function pe(e){let o=e.lastIndexOf("/");return o>=0&&o++,e.substring(o)}async function he(e){e&&await Promise.all((null!=e?e:[]).map(e=>async function(e){try{const o=e.name;if(!e.moduleExports){const t=le(ke.locateFile(o),"js-module-library-initializer");ke.diagnosticTracing&&b(`Attempting to import '${t}' for ${e}`),e.moduleExports=await import(/*! webpackIgnore: true */t)}ke.libraryInitializers.push({scriptName:o,exports:e.moduleExports})}catch(o){v(`Failed to import library initializer '${e}': ${o}`)}}(e)))}async function be(e,o){if(!ke.libraryInitializers)return;const t=[];for(let n=0;n<ke.libraryInitializers.length;n++){const r=ke.libraryInitializers[n];r.exports[e]&&t.push(we(r.scriptName,e,()=>r.exports[e](...o)))}await Promise.all(t)}async function we(e,o,t){try{await t()}catch(t){throw v(`Failed to invoke '${o}' on library initializer '${e}': ${t}`),Xe(1,t),t}}function ye(e,o){if(e===o)return e;const t={...o};return void 0!==t.assets&&t.assets!==e.assets&&(t.assets=[...e.assets||[],...t.assets||[]]),void 0!==t.resources&&(t.resources=_e(e.resources||{assembly:[],jsModuleNative:[],jsModuleRuntime:[],wasmNative:[]},t.resources)),void 0!==t.environmentVariables&&(t.environmentVariables={...e.environmentVariables||{},...t.environmentVariables||{}}),void 0!==t.runtimeOptions&&t.runtimeOptions!==e.runtimeOptions&&(t.runtimeOptions=[...e.runtimeOptions||[],...t.runtimeOptions||[]]),Object.assign(e,t)}function ve(e,o){if(e===o)return e;const t={...o};return t.config&&(e.config||(e.config={}),t.config=ye(e.config,t.config)),Object.assign(e,t)}function _e(e,o){if(e===o)return e;const t={...o};return void 0!==t.coreAssembly&&(t.coreAssembly=[...e.coreAssembly||[],...t.coreAssembly||[]]),void 0!==t.assembly&&(t.assembly=[...e.assembly||[],...t.assembly||[]]),void 0!==t.lazyAssembly&&(t.lazyAssembly=[...e.lazyAssembly||[],...t.lazyAssembly||[]]),void 0!==t.corePdb&&(t.corePdb=[...e.corePdb||[],...t.corePdb||[]]),void 0!==t.pdb&&(t.pdb=[...e.pdb||[],...t.pdb||[]]),void 0!==t.jsModuleNative&&(t.jsModuleNative=[...e.jsModuleNative||[],...t.jsModuleNative||[]]),void 0!==t.jsModuleDiagnostics&&(t.jsModuleDiagnostics=[...e.jsModuleDiagnostics||[],...t.jsModuleDiagnostics||[]]),void 0!==t.jsModuleRuntime&&(t.jsModuleRuntime=[...e.jsModuleRuntime||[],...t.jsModuleRuntime||[]]),void 0!==t.wasmSymbols&&(t.wasmSymbols=[...e.wasmSymbols||[],...t.wasmSymbols||[]]),void 0!==t.wasmNative&&(t.wasmNative=[...e.wasmNative||[],...t.wasmNative||[]]),void 0!==t.icu&&(t.icu=[...e.icu||[],...t.icu||[]]),void 0!==t.satelliteResources&&(t.satelliteResources=function(e,o){if(e===o)return e;for(const t in o)e[t]=[...e[t]||[],...o[t]||[]];return e}(e.satelliteResources||{},t.satelliteResources||{})),void 0!==t.modulesAfterConfigLoaded&&(t.modulesAfterConfigLoaded=[...e.modulesAfterConfigLoaded||[],...t.modulesAfterConfigLoaded||[]]),void 0!==t.modulesAfterRuntimeReady&&(t.modulesAfterRuntimeReady=[...e.modulesAfterRuntimeReady||[],...t.modulesAfterRuntimeReady||[]]),void 0!==t.extensions&&(t.extensions={...e.extensions||{},...t.extensions||{}}),void 0!==t.vfs&&(t.vfs=[...e.vfs||[],...t.vfs||[]]),Object.assign(e,t)}function Ae(){const e=ke.config;if(e.environmentVariables=e.environmentVariables||{},e.runtimeOptions=e.runtimeOptions||[],e.resources=e.resources||{assembly:[],jsModuleNative:[],jsModuleRuntime:[],wasmNative:[],vfs:[],satelliteResources:{}},e.assets){ke.diagnosticTracing&&b("config.assets is deprecated, use config.resources instead");for(const o of e.assets){const t={};switch(o.behavior){case"assembly":t.assembly=[o];break;case"pdb":t.pdb=[o];break;case"resource":t.satelliteResources={},t.satelliteResources[o.culture]=[o];break;case"icu":t.icu=[o];break;case"symbols":t.wasmSymbols=[o];break;case"vfs":t.vfs=[o];break;case"dotnetwasm":t.wasmNative=[o];break;case"js-module-runtime":t.jsModuleRuntime=[o];break;case"js-module-native":t.jsModuleNative=[o];break;case"js-module-diagnostics":t.jsModuleDiagnostics=[o];break;case"js-module-dotnet":break;default:throw new Error(`Unexpected behavior ${o.behavior} of asset ${o.name}`)}_e(e.resources,t)}}e.debugLevel,void 0===e.virtualWorkingDirectory&&(e.virtualWorkingDirectory=Ue),e.applicationEnvironment||(e.applicationEnvironment="Production"),e.applicationCulture&&(e.environmentVariables.LANG=`${e.applicationCulture}.UTF-8`),Pe.diagnosticTracing=ke.diagnosticTracing=!!e.diagnosticTracing,Pe.waitForDebugger=e.waitForDebugger,ke.maxParallelDownloads=e.maxParallelDownloads||ke.maxParallelDownloads,ke.enableDownloadRetry=void 0!==e.enableDownloadRetry?e.enableDownloadRetry:ke.enableDownloadRetry}let xe=!1;async function Te(e){var o;if(xe)await ke.afterConfigLoaded.promise;else try{if(xe=!0,Ae(),await he(null===(o=ke.config.resources)||void 0===o?void 0:o.modulesAfterConfigLoaded),await be("onRuntimeConfigLoaded",[ke.config]),e.onConfigLoaded)try{await e.onConfigLoaded(ke.config,Oe),Ae()}catch(e){throw _("onConfigLoaded() failed",e),e}Ae(),ke.afterConfigLoaded.promise_control.resolve(ke.config)}catch(o){const t=`Failed to initialize config ${o} ${null==o?void 0:o.stack}`;throw ke.config=e.config=Object.assign(ke.config,{message:t,error:o,isError:!0}),Xe(1,new Error(t)),o}}function Re(){return!!globalThis.navigator&&(ke.isChromium||ke.isFirefox)}"function"==typeof importScripts&&(globalThis.dotnetSidecar=!0);const Ee="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,je="function"==typeof importScripts,De=je&&"undefined"!=typeof dotnetSidecar,Ce=je&&!De,Me="object"==typeof window||je&&!Ee,Se=!Me&&!Ee,Ue="/";let Pe={},ke={},Ie={},Oe={},$e={},Le=!1;const Ne={},ze={config:Ne},Fe={mono:{},binding:{},internal:$e,module:ze,loaderHelpers:ke,runtimeHelpers:Pe,diagnosticHelpers:Ie,api:Oe};function We(e,o){if(e)return;const t="Assert failed: "+("function"==typeof o?o():o),n=new Error(t);_(t,n),Pe.nativeAbort(n)}function Ve(){return void 0!==ke.exitCode}function Be(){return Pe.runtimeReady&&!Ve()}function Je(){Ve()&&We(!1,`.NET runtime already exited with ${ke.exitCode} ${ke.exitReason}. You can use dotnet.runMain() which doesn't exit the runtime.`),Pe.runtimeReady||We(!1,".NET runtime didn't start yet. Please call dotnet.create() first.")}function He(){Me&&(globalThis.addEventListener("unhandledrejection",eo),globalThis.addEventListener("error",oo))}let Qe,qe;function Ge(){Qe=ze.onAbort,qe=ze.onExit,ze.onAbort=Ke,ze.onExit=Ze}function Ze(e){qe&&qe(e),Xe(e,ke.exitReason)}function Ke(e){Qe&&Qe(e||ke.exitReason),Xe(1,e||ke.exitReason)}function Xe(e,o){var t;const n=o&&"object"==typeof o;e=n&&"number"==typeof o.status?o.status:void 0===e?-1:e;const r=n&&"string"==typeof o.message?o.message:""+o;(o=n?o:Pe.ExitStatus?function(e,o){const t=new Pe.ExitStatus(e);return t.message=o,t.toString=()=>o,t}(e,r):new Error("Exit with code "+e+" "+r)).status=e,o.message||(o.message=r);const s=""+(o.stack||(new Error).stack);try{Object.defineProperty(o,"stack",{get:()=>s})}catch(e){}const i=!!o.silent;if(o.silent=!0,Ve())ke.diagnosticTracing&&b("mono_exit called after exit");else{try{ze.onAbort==Ke&&(ze.onAbort=Qe),ze.onExit==Ze&&(ze.onExit=qe),Me&&(globalThis.removeEventListener("unhandledrejection",eo),globalThis.removeEventListener("error",oo)),Pe.runtimeReady?(Pe.jiterpreter_dump_stats&&Pe.jiterpreter_dump_stats(!1),0===e&&(null===(t=ke.config)||void 0===t?void 0:t.interopCleanupOnExit)&&Pe.forceDisposeProxies(!0,!0)):(ke.diagnosticTracing&&b(`abort_startup, reason: ${o}`),function(e){ke.allDownloadsQueued.promise_control.reject(e),ke.allDownloadsFinished.promise_control.reject(e),ke.afterConfigLoaded.promise_control.reject(e),ke.wasmCompilePromise.promise_control.reject(e),ke.runtimeModuleLoaded.promise_control.reject(e),Pe.dotnetReady&&(Pe.dotnetReady.promise_control.reject(e),Pe.afterInstantiateWasm.promise_control.reject(e),Pe.afterPreRun.promise_control.reject(e),Pe.beforeOnRuntimeInitialized.promise_control.reject(e),Pe.afterOnRuntimeInitialized.promise_control.reject(e),Pe.afterPostRun.promise_control.reject(e))}(o))}catch(e){v("mono_exit A failed",e)}try{i||(function(e,o){if(0!==e&&o){const e=Pe.ExitStatus&&o instanceof Pe.ExitStatus?b:_;"string"==typeof o?e(o):(void 0===o.stack&&(o.stack=(new Error).stack+""),o.message?e(Pe.stringify_as_error_with_stack?Pe.stringify_as_error_with_stack(o.message+"\n"+o.stack):o.message+"\n"+o.stack):e(JSON.stringify(o)))}!Ce&&ke.config&&(ke.config.logExitCode?ke.config.forwardConsole?T("WASM EXIT "+e):y("WASM EXIT "+e):ke.config.forwardConsole&&T())}(e,o),function(e){if(Me&&!Ce&&ke.config&&ke.config.appendElementOnExit&&document){const o=document.createElement("label");o.id="tests_done",0!==e&&(o.style.background="red"),o.innerHTML=""+e,document.body.appendChild(o)}}(e))}catch(e){v("mono_exit B failed",e)}ke.exitCode=e,ke.exitReason||(ke.exitReason=o),!Ce&&Pe.runtimeReady&&ze.runtimeKeepalivePop()}if(ke.config&&ke.config.asyncFlushOnExit&&0===e)throw(async()=>{try{await async function(){if(Ee)try{const e=await import(/*! webpackIgnore: true */"process"),o=e=>new Promise((o,t)=>{e.on("error",t),e.end("","utf8",o)}),t=o(e.stderr),n=o(e.stdout);let r;const s=new Promise(e=>{r=setTimeout(()=>e("timeout"),1e3)});await Promise.race([Promise.all([n,t]),s]),clearTimeout(r)}catch(e){_(`flushing std* streams failed: ${e}`)}}()}finally{Ye(e,o)}})(),o;Ye(e,o)}function Ye(e,o){if(Pe.runtimeReady&&Pe.nativeExit)try{Pe.nativeExit(e)}catch(e){!Pe.ExitStatus||e instanceof Pe.ExitStatus||v("set_exit_code_and_quit_now failed: "+e.toString())}if(0!==e||!Me)throw Ee?process.exit(e):Pe.quit&&Pe.quit(e,o),o}function eo(e){to(e,e.reason,"rejection")}function oo(e){to(e,e.error,"error")}function to(e,o,t){e.preventDefault();try{o||(o=new Error("Unhandled "+t)),void 0===o.stack&&(o.stack=(new Error).stack),o.stack=o.stack+"",o.silent||(_("Unhandled error:",o),Xe(1,o))}catch(e){}}!function(n){if(Le)throw new Error("Loader module already loaded");Le=!0,Pe=n.runtimeHelpers,ke=n.loaderHelpers,Ie=n.diagnosticHelpers,Oe=n.api,$e=n.internal,Object.assign(Oe,{INTERNAL:$e,invokeLibraryInitializers:be}),Object.assign(n.module,{config:ye(Ne,{environmentVariables:{}})});const a={mono_wasm_bindings_is_ready:!1,config:n.module.config,diagnosticTracing:!1,nativeAbort:e=>{throw e||new Error("abort")},nativeExit:e=>{throw new Error("exit:"+e)}},l={gitHash:"3551975be08744f0418857c5bed8ab1545c5dd47",config:n.module.config,diagnosticTracing:!1,maxParallelDownloads:16,enableDownloadRetry:!0,_loaded_files:[],loadedFiles:[],loadedAssemblies:[],libraryInitializers:[],workerNextNumber:1,actual_downloaded_assets_count:0,actual_instantiated_assets_count:0,expected_downloaded_assets_count:0,expected_instantiated_assets_count:0,afterConfigLoaded:r(),allDownloadsQueued:r(),allDownloadsFinished:r(),wasmCompilePromise:r(),runtimeModuleLoaded:r(),loadingWorkers:r(),is_exited:Ve,is_runtime_running:Be,assert_runtime_running:Je,mono_exit:Xe,createPromiseController:r,getPromiseController:s,assertIsControllablePromise:i,mono_download_assets:oe,resolve_single_asset_path:Y,setup_proxy_console:x,set_thread_prefix:h,installUnhandledErrorHandler:He,retrieve_asset_download:re,invokeLibraryInitializers:be,isDebuggingSupported:Re,exceptionsFinal:e,simd:t,relaxedSimd:o};Object.assign(Pe,a),Object.assign(ke,l)}(Fe);let no,ro,so,io=!1,ao=!1;async function lo(e){if(!ao){if(ao=!0,Me&&ke.config.forwardConsole&&void 0!==globalThis.WebSocket&&x("main",globalThis.console,globalThis.location.origin),ze||We(!1,"Null moduleConfig"),ke.config||We(!1,"Null moduleConfig.config"),"function"==typeof e){const o=e(Fe.api);if(o.ready)throw new Error("Module.ready couldn't be redefined.");Object.assign(ze,o),ve(ze,o)}else{if("object"!=typeof e)throw new Error("Can't use moduleFactory callback of createDotnetRuntime function.");ve(ze,e)}await S(ze)}}async function co(e){return await lo(e),ke.config.exitOnUnhandledError&&He(),Ge(),async function(){var e;await Te(ze),ne();const o=uo();(async function(){try{const e=Y("dotnetwasm");await se(e),e&&e.pendingDownloadInternal&&e.pendingDownloadInternal.response||We(!1,"Can't load dotnet.native.wasm");const o=await e.pendingDownloadInternal.response,t=o.headers&&o.headers.get?o.headers.get("Content-Type"):void 0;let n;if("function"==typeof WebAssembly.compileStreaming&&"application/wasm"===t)n=await WebAssembly.compileStreaming(o);else{Me&&"application/wasm"!==t&&v('WebAssembly resource does not have the expected content type "application/wasm", so falling back to slower ArrayBuffer instantiation.');const e=await o.arrayBuffer();ke.diagnosticTracing&&b("instantiate_wasm_module buffered"),n=Se?await Promise.resolve(new WebAssembly.Module(e)):await WebAssembly.compile(e)}e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null,ke.wasmCompilePromise.promise_control.resolve(n)}catch(e){ke.wasmCompilePromise.promise_control.reject(e)}})(),setTimeout(async()=>{try{D(),await oe()}catch(e){Xe(1,e)}},0);const t=await Promise.all(o);return await fo(t),await Pe.dotnetReady.promise,await he(null===(e=ke.config.resources)||void 0===e?void 0:e.modulesAfterRuntimeReady),await be("onRuntimeReady",[Fe.api]),Oe}()}function uo(){const e=Y("js-module-runtime"),o=Y("js-module-native");if(no&&ro)return[no,ro,so];"object"==typeof e.moduleExports?no=e.moduleExports:(ke.diagnosticTracing&&b(`Attempting to import '${e.resolvedUrl}' for ${e.name}`),no=import(/*! webpackIgnore: true */e.resolvedUrl)),"object"==typeof o.moduleExports?ro=o.moduleExports:(ke.diagnosticTracing&&b(`Attempting to import '${o.resolvedUrl}' for ${o.name}`),ro=import(/*! webpackIgnore: true */o.resolvedUrl));const t=X("js-module-diagnostics");return t&&("object"==typeof t.moduleExports?so=t.moduleExports:(ke.diagnosticTracing&&b(`Attempting to import '${t.resolvedUrl}' for ${t.name}`),so=import(/*! webpackIgnore: true */t.resolvedUrl))),[no,ro,so]}async function fo(e){const{initializeExports:o,initializeReplacements:t,configureRuntimeStartup:n,configureEmscriptenStartup:r,configureWorkerStartup:s,setRuntimeGlobals:i,passEmscriptenInternals:a}=e[0],{default:l}=e[1],c=e[2];i(Fe),o(Fe),c&&c.setRuntimeGlobals(Fe),await n(ze),ke.runtimeModuleLoaded.promise_control.resolve(),l(()=>(Object.assign(ze,{__dotnet_runtime:{initializeReplacements:t,configureEmscriptenStartup:r,configureWorkerStartup:s,passEmscriptenInternals:a}}),ze)).catch(e=>{if(e.message&&e.message.toLowerCase().includes("out of memory"))throw new Error(".NET runtime has failed to start, because too much memory was requested. Please decrease the memory by adjusting EmccMaximumHeapSize.");throw e})}Ce&&async function(){(function(){const e=new MessageChannel,o=e.port1,t=e.port2;o.addEventListener("message",e=>{!function(e){const o=JSON.parse(e.config),t=JSON.parse(e.monoThreadInfo);ze.config=o,ze.wasmModule=e.wasmModule,ze.wasmMemory=e.wasmMemory,ze.handlers=e.handlers,io?ke.diagnosticTracing&&b("mono config already received"):(ye(ke.config,o),Pe.monoThreadInfo=t,Ae(),ke.diagnosticTracing&&b("mono config received"),io=!0,ke.afterConfigLoaded.promise_control.resolve(ke.config),Me&&o.forwardConsole&&void 0!==globalThis.WebSocket&&ke.setup_proxy_console("worker-idle",console,globalThis.location.origin))}(e.data),o.close(),t.close()},{once:!0}),o.start(),self.postMessage({[a]:{monoCmd:"preload",port:t}},[t])})(),await ke.afterConfigLoaded.promise,function(){const e=ke.config;e.assets||We(!1,"config.assets must be defined");for(const o of e.assets)K(o),q[o.behavior]&&N.push(o)}();const e=uo(),o=await Promise.all(e);return globalThis.name="em-pthread",await fo(o),ke.config.exitOnUnhandledError&&He(),Ge(),Me&&ke.config.forwardConsole&&void 0!==globalThis.WebSocket&&x("main",globalThis.console,globalThis.location.origin),await S(ze),await oe(),self.dispatchEvent(new MessageEvent("message",{data:{cmd:1,handlers:ze.handlers,wasmMemory:ze.wasmMemory,wasmModule:ze.wasmModule}})),ze}().catch(e=>Xe(1,e));const mo=new class{withModuleConfig(e){try{return ve(ze,e),this}catch(e){throw Xe(1,e),e}}withInterpreterPgo(e,o){try{return ye(Ne,{interpreterPgo:e,interpreterPgoSaveDelay:o}),Ne.runtimeOptions?Ne.runtimeOptions.push("--interp-pgo-recording"):Ne.runtimeOptions=["--interp-pgo-recording"],this}catch(e){throw Xe(1,e),e}}withConfig(e){try{return ye(Ne,e),this}catch(e){throw Xe(1,e),e}}withConfigSrc(e){return this}withVirtualWorkingDirectory(e){try{return e&&"string"==typeof e||We(!1,"must be directory path"),ye(Ne,{virtualWorkingDirectory:e}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariable(e,o){try{const t={};return t[e]=o,ye(Ne,{environmentVariables:t}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariables(e){try{return e&&"object"==typeof e||We(!1,"must be dictionary object"),ye(Ne,{environmentVariables:e}),this}catch(e){throw Xe(1,e),e}}withDiagnosticTracing(e){try{return"boolean"!=typeof e&&We(!1,"must be boolean"),ye(Ne,{diagnosticTracing:e}),this}catch(e){throw Xe(1,e),e}}withDebugging(e){try{return null!=e&&"number"==typeof e||We(!1,"must be number"),ye(Ne,{debugLevel:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArguments(...e){try{return e&&Array.isArray(e)||We(!1,"must be array of strings"),ye(Ne,{applicationArguments:e}),this}catch(e){throw Xe(1,e),e}}withRuntimeOptions(e){try{return e&&Array.isArray(e)||We(!1,"must be array of strings"),Ne.runtimeOptions?Ne.runtimeOptions.push(...e):Ne.runtimeOptions=e,this}catch(e){throw Xe(1,e),e}}withMainAssembly(e){try{return ye(Ne,{mainAssemblyName:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArgumentsFromQuery(){try{if(!globalThis.window)throw new Error("Missing window to the query parameters from");if(void 0===globalThis.URLSearchParams)throw new Error("URLSearchParams is supported");const e=new URLSearchParams(globalThis.window.location.search).getAll("arg");return this.withApplicationArguments(...e)}catch(e){throw Xe(1,e),e}}withApplicationEnvironment(e){try{return ye(Ne,{applicationEnvironment:e}),this}catch(e){throw Xe(1,e),e}}withApplicationCulture(e){try{return ye(Ne,{applicationCulture:e}),this}catch(e){throw Xe(1,e),e}}withResourceLoader(e){try{return ke.loadBootResource=e,this}catch(e){throw Xe(1,e),e}}async download(){try{await async function(){lo(ze),await Te(ze),ne(),D(),oe(),await ke.allDownloadsFinished.promise}()}catch(e){throw Xe(1,e),e}}async create(){try{return this.instance||(this.instance=await async function(){return await co(ze),Fe.api}()),this.instance}catch(e){throw Xe(1,e),e}}run(){return this.runMainAndExit()}async runMainAndExit(){try{return ze.config||We(!1,"Null moduleConfig.config"),this.instance||await this.create(),this.instance.runMainAndExit()}catch(e){throw Xe(1,e),e}}async runMain(){try{return ze.config||We(!1,"Null moduleConfig.config"),this.instance||await this.create(),this.instance.runMain()}catch(e){throw Xe(1,e),e}}},go=Xe,po=co;Se||"function"==typeof globalThis.URL||We(!1,"This browser/engine doesn't support URL API. Please use a modern version."),"function"!=typeof globalThis.BigInt64Array&&We(!1,"This browser/engine doesn't support BigInt64Array API. Please use a modern version. See also https://learn.microsoft.com/aspnet/core/blazor/supported-platforms"),globalThis.performance&&"function"==typeof globalThis.performance.now||We(!1,"This browser/engine doesn't support performance.now. Please use a modern version."),Se||globalThis.crypto&&"object"==typeof globalThis.crypto.subtle||We(!1,"This engine doesn't support crypto.subtle. Please use a modern version."),Se||globalThis.crypto&&"function"==typeof globalThis.crypto.getRandomValues||We(!1,"This engine doesn't support crypto.getRandomValues. Please use a modern version."),Ee&&"function"!=typeof process.exit&&We(!1,"This engine doesn't support process.exit. Please use a modern version."),mo.withConfig(/*json-start*/{
  "mainAssemblyName": "VladislavAntonyuk",
  "resources": {
    "hash": "sha256-Zx3AO1lAgamlIUI/993rZPmnpr4H/YoFWXjQUBwn02Q=",
    "jsModuleNative": [
      {
        "name": "dotnet.native.eidwi04w2p.js"
      }
    ],
    "jsModuleRuntime": [
      {
        "name": "dotnet.runtime.gqgh3r3nhq.js"
      }
    ],
    "wasmNative": [
      {
        "name": "dotnet.native.daihnlzyds.wasm",
        "hash": "sha256-1RH6jTdlWKInvBb4aUoefgDeryGy2oUwVdbftB4iyoc=",
        "cache": "force-cache"
      }
    ],
    "icu": [
      {
        "virtualPath": "icudt_CJK.dat",
        "name": "icudt_CJK.5lgyv9xn0b.dat",
        "hash": "sha256-eZuX0pntrUwNrAmFCMwpxJjFA3/Myi/rW2x9mEZ+Mbg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "icudt_EFIGS.dat",
        "name": "icudt_EFIGS.xyuimhy3ww.dat",
        "hash": "sha256-SQcxb+bdx2UXUCU9tFdOWCr4Ctk64xghCnr0JGLWWKQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "icudt_no_CJK.dat",
        "name": "icudt_no_CJK.h0en30vv0c.dat",
        "hash": "sha256-T8YllylpxyWp9Aq4AiF+BMAxKXqYyzWB9RA5RqY19vs=",
        "cache": "force-cache"
      }
    ],
    "coreAssembly": [
      {
        "payloadSize": 5405264,
        "virtualPath": "System.Private.CoreLib.wasm",
        "name": "System.Private.CoreLib.664iixq6kt.wasm",
        "hash": "sha256-YoQRXPqdu/e62RTnLaUsZby+DtK2xnjTBHiYQLop/OQ=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 80464,
        "virtualPath": "System.Runtime.InteropServices.JavaScript.wasm",
        "name": "System.Runtime.InteropServices.JavaScript.taha0yk9dz.wasm",
        "hash": "sha256-60FIihRpW/KBxwv+Msy9ThSi9Qjl+TylHuAC1eVIN04=",
        "cache": "force-cache"
      }
    ],
    "assembly": [
      {
        "payloadSize": 9296,
        "virtualPath": "GiscusBlazor.wasm",
        "name": "GiscusBlazor.pcuv0mq90t.wasm",
        "hash": "sha256-l1wTMTENyM79ld4SDLq1FMaVInry9paOdQP7C16wl1E=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 481872,
        "virtualPath": "Markdig.wasm",
        "name": "Markdig.nxd4nvabev.wasm",
        "hash": "sha256-dS2IYpLaOTWAOgniT9b/2CrloiS6EB7XTAeQQbKdZ5U=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 47184,
        "virtualPath": "Microsoft.AspNetCore.Authorization.wasm",
        "name": "Microsoft.AspNetCore.Authorization.zsiysggeka.wasm",
        "hash": "sha256-TRAbBFR7TkKCV6P2t8tlsTCnvYMBLsjMmxHd1pgs//c=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 51280,
        "virtualPath": "Microsoft.AspNetCore.Components.Forms.wasm",
        "name": "Microsoft.AspNetCore.Components.Forms.tfphqlrbnw.wasm",
        "hash": "sha256-CdnwW9UnHMgkVKHMNPZxU5dkO+P3DWsrnOS4xS5xLSc=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 212048,
        "virtualPath": "Microsoft.AspNetCore.Components.Web.wasm",
        "name": "Microsoft.AspNetCore.Components.Web.50mfjj7r39.wasm",
        "hash": "sha256-25OyyGuxVgXgR1KvBN/DCPCmjBZ/6q3+0IdJV3Ni2bE=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 189520,
        "virtualPath": "Microsoft.AspNetCore.Components.WebAssembly.wasm",
        "name": "Microsoft.AspNetCore.Components.WebAssembly.gofdjygftq.wasm",
        "hash": "sha256-YPQZZSf8XITJfWrViy73xYirB7DjSED6FOWJWaRu7f0=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 428112,
        "virtualPath": "Microsoft.AspNetCore.Components.wasm",
        "name": "Microsoft.AspNetCore.Components.fpjwsxchcw.wasm",
        "hash": "sha256-w+v2GgqkH5VFGXHCm7CG1UGlfZW+MM27Njn3fHF7/jQ=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5712,
        "virtualPath": "Microsoft.AspNetCore.Metadata.wasm",
        "name": "Microsoft.AspNetCore.Metadata.0isfa17jer.wasm",
        "hash": "sha256-CFy4miElVRwq/K77Iw+4UDfwexEjOhlnZC3an/IGoto=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 300624,
        "virtualPath": "Microsoft.CSharp.wasm",
        "name": "Microsoft.CSharp.bkgjv0ggbx.wasm",
        "hash": "sha256-m1ns0gAZdRFuPVxjmTAXtGcBE/x7HtGJFdeHSwCgP9A=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 32848,
        "virtualPath": "Microsoft.Extensions.Caching.Abstractions.wasm",
        "name": "Microsoft.Extensions.Caching.Abstractions.a3nqiomi6y.wasm",
        "hash": "sha256-mnYWDeHqJ3uwEwdWP1an2UWg3fjxqge5zlqX1B8+AT4=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 16464,
        "virtualPath": "Microsoft.Extensions.Configuration.Abstractions.wasm",
        "name": "Microsoft.Extensions.Configuration.Abstractions.bk027iu4ue.wasm",
        "hash": "sha256-pcFIHIRjjDysb4oFsG1XLYGC9o9/+FggbkCVvIxnbuY=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 32848,
        "virtualPath": "Microsoft.Extensions.Configuration.Binder.wasm",
        "name": "Microsoft.Extensions.Configuration.Binder.z19rsek1vw.wasm",
        "hash": "sha256-aYW/gbt5mxWIs/iHMKsJqz1vgVm+TO+0OPWn723HmRM=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 16976,
        "virtualPath": "Microsoft.Extensions.Configuration.EnvironmentVariables.wasm",
        "name": "Microsoft.Extensions.Configuration.EnvironmentVariables.n4bws203jd.wasm",
        "hash": "sha256-V6S7Gf3WjHs8WdHMYkf0JofWY07/g4jwxXZPMSxj1pA=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 19024,
        "virtualPath": "Microsoft.Extensions.Configuration.FileExtensions.wasm",
        "name": "Microsoft.Extensions.Configuration.FileExtensions.mrrq1sj78j.wasm",
        "hash": "sha256-EpBsYjtGeL1l7UA+haqsI8vMdaoyvi6uNtshgV02Zlg=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 16976,
        "virtualPath": "Microsoft.Extensions.Configuration.Json.wasm",
        "name": "Microsoft.Extensions.Configuration.Json.esb6ls2nfb.wasm",
        "hash": "sha256-0nlWWzM+/vmEqLeLEJuTFsy/+cW8ZMh/ARRwfDnnmXs=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 34384,
        "virtualPath": "Microsoft.Extensions.Configuration.wasm",
        "name": "Microsoft.Extensions.Configuration.87mwrj8jcx.wasm",
        "hash": "sha256-nGAjUPYmOA79wUHmTc1F/L//qGwRyrx0c8wtJPfkYdw=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 57424,
        "virtualPath": "Microsoft.Extensions.DependencyInjection.Abstractions.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.Abstractions.kz1qf5xkqn.wasm",
        "hash": "sha256-cMBzp4uqhrzw60fJIYdJGdnkV52VcSMMsXybibIDnRI=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 86608,
        "virtualPath": "Microsoft.Extensions.DependencyInjection.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.05ag5yt7y8.wasm",
        "hash": "sha256-rOt/m4YkevDQ0EiEP2OWJ0BV2P1klHnUQzy2IbxOUeI=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 17488,
        "virtualPath": "Microsoft.Extensions.Diagnostics.Abstractions.wasm",
        "name": "Microsoft.Extensions.Diagnostics.Abstractions.p71y90oaol.wasm",
        "hash": "sha256-WxwtiYYxddaRA+tANLq/SrIy3hfkUt17vcZII1UGfys=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 37968,
        "virtualPath": "Microsoft.Extensions.Diagnostics.wasm",
        "name": "Microsoft.Extensions.Diagnostics.gft81p4e9i.wasm",
        "hash": "sha256-BFSB/wJvmLvn1YFMr5H9xxkgG7LKOTmVR3mddvkMttQ=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 11344,
        "virtualPath": "Microsoft.Extensions.FileProviders.Abstractions.wasm",
        "name": "Microsoft.Extensions.FileProviders.Abstractions.mhfyx6gls4.wasm",
        "hash": "sha256-6lteLu/7v38qVm+zGcBRqBS/rYRIYza03vjp4rWIhO4=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 40528,
        "virtualPath": "Microsoft.Extensions.FileProviders.Physical.wasm",
        "name": "Microsoft.Extensions.FileProviders.Physical.oanl7qol6w.wasm",
        "hash": "sha256-0MfNIpB9THq1UtDkIFy084cTR2Nz4WqEcfCHhmRBOF4=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 36944,
        "virtualPath": "Microsoft.Extensions.FileSystemGlobbing.wasm",
        "name": "Microsoft.Extensions.FileSystemGlobbing.tiej803mn6.wasm",
        "hash": "sha256-RYgA3vEn/z9XXH+64gGmMJ6FF/cUCtPtA3yFwzYjxdE=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 22096,
        "virtualPath": "Microsoft.Extensions.Hosting.Abstractions.wasm",
        "name": "Microsoft.Extensions.Hosting.Abstractions.s8out0cwm7.wasm",
        "hash": "sha256-xCwUU3wHa06+4DFH2nXs4d8EjFqwaiHvc4sdx41k/Vo=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 8784,
        "virtualPath": "Microsoft.Extensions.Localization.Abstractions.wasm",
        "name": "Microsoft.Extensions.Localization.Abstractions.np1pf9kp5c.wasm",
        "hash": "sha256-64cIvzz+khMEQASDUNT5UARZQQzisOhvQtAEBY5HPwM=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 21072,
        "virtualPath": "Microsoft.Extensions.Localization.wasm",
        "name": "Microsoft.Extensions.Localization.encwtjc3mu.wasm",
        "hash": "sha256-CvF1oB4KajAMDT6w3eb+WD2UzweG0XvzW/HahCfLjTw=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 56400,
        "virtualPath": "Microsoft.Extensions.Logging.Abstractions.wasm",
        "name": "Microsoft.Extensions.Logging.Abstractions.h9gxsampqy.wasm",
        "hash": "sha256-lXQxA1wnUEBJ06aOxmaqbh3ZMroyOAw1jjLkkWSWIzU=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 41040,
        "virtualPath": "Microsoft.Extensions.Logging.wasm",
        "name": "Microsoft.Extensions.Logging.npgagbw0wd.wasm",
        "hash": "sha256-G4+slSlsGEh/Eqoriq0Q5uhwOUgyYLbSZgrxXEprUoA=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 11344,
        "virtualPath": "Microsoft.Extensions.Options.ConfigurationExtensions.wasm",
        "name": "Microsoft.Extensions.Options.ConfigurationExtensions.w7t3ppb1jz.wasm",
        "hash": "sha256-rGNgxkL+xRQWaaSqOvcee5uQIb4BDWJDA7wawiPdyKU=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 97872,
        "virtualPath": "Microsoft.Extensions.Options.wasm",
        "name": "Microsoft.Extensions.Options.dlm7rjkk49.wasm",
        "hash": "sha256-3yqa3l2PFsmgl5OBzHn702F9gbhpVWyxhv9098TZLdw=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 35408,
        "virtualPath": "Microsoft.Extensions.Primitives.wasm",
        "name": "Microsoft.Extensions.Primitives.7plzop2d6g.wasm",
        "hash": "sha256-ZSuoKVkkIp2EhcKmEZQ6G3vXp65CAS1CUrbB3zXpgsY=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 12880,
        "virtualPath": "Microsoft.Extensions.Validation.wasm",
        "name": "Microsoft.Extensions.Validation.8cv0cczsyc.wasm",
        "hash": "sha256-qAqkcrsiatYEmL5MpTivPt/SZThTQucjnQAzHb+qu9E=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 13904,
        "virtualPath": "Microsoft.JSInterop.WebAssembly.wasm",
        "name": "Microsoft.JSInterop.WebAssembly.lwrfo8i4vl.wasm",
        "hash": "sha256-BZMyOp5J1uIpeT8BLbkY0A2iTsb3LBGS7DKpR7XEni8=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 66640,
        "virtualPath": "Microsoft.JSInterop.wasm",
        "name": "Microsoft.JSInterop.2y6fgwluox.wasm",
        "hash": "sha256-6jB982dJz74YWlRpNRLRVHU5Fxv9BAjsD/QPxjWCo70=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 418384,
        "virtualPath": "Microsoft.VisualBasic.Core.wasm",
        "name": "Microsoft.VisualBasic.Core.kldmj0fe0t.wasm",
        "hash": "sha256-WFGkCeSJCB8V4oKAqMbXYRlG5I3oNMp/L/+E865JGn0=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 6736,
        "virtualPath": "Microsoft.VisualBasic.wasm",
        "name": "Microsoft.VisualBasic.g2bgybgzap.wasm",
        "hash": "sha256-+DWWGQHFU7a98Jd6TxT9VDu4mL3RQNeb+uXcoPLRQMg=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "Microsoft.Win32.Primitives.wasm",
        "name": "Microsoft.Win32.Primitives.9ip24vndlg.wasm",
        "hash": "sha256-of2aYlL1mfogXJq3dYzVw82/uOElKETnhNZO+0y60RI=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 22608,
        "virtualPath": "Microsoft.Win32.Registry.wasm",
        "name": "Microsoft.Win32.Registry.xqv0b23f91.wasm",
        "hash": "sha256-RzzQ4FLtFurGE4haezfRSdQFLXWi+xFNLjG6xA/3w+g=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 94288,
        "virtualPath": "MudBlazor.Markdown.wasm",
        "name": "MudBlazor.Markdown.61onxa7w9a.wasm",
        "hash": "sha256-lo30Ae7PQ62UVMHxe8koYTh6ew12qEt9io8QmmznZ7Q=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 10249296,
        "virtualPath": "MudBlazor.wasm",
        "name": "MudBlazor.gya0e2zdl4.wasm",
        "hash": "sha256-iEK2HEXumL/wLlOd4flcQyPBsgChCLeARJle8Zsi6fk=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 12368,
        "virtualPath": "Shared.wasm",
        "name": "Shared.oe98bmb3yo.wasm",
        "hash": "sha256-oFQsxE7xIGV1KGMPVFhSVX3zvrwyWL/trDyq3kfiV58=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "System.AppContext.wasm",
        "name": "System.AppContext.yst4pku6yn.wasm",
        "hash": "sha256-HqfvqYnWcLPrItwKjs5W1kATQHkAYZiG/mU4hrpHTXo=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "System.Buffers.wasm",
        "name": "System.Buffers.dz7c35lvi6.wasm",
        "hash": "sha256-adpKjSCTQh5hSlzH3zWyznvfQHXD8qQt69008kS15xo=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 53328,
        "virtualPath": "System.Collections.Concurrent.wasm",
        "name": "System.Collections.Concurrent.x9jl4qhdgs.wasm",
        "hash": "sha256-1dATbO59QnU9Ymdcpyg+gupru30bppV5WiwUJTGOkXg=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 242256,
        "virtualPath": "System.Collections.Immutable.wasm",
        "name": "System.Collections.Immutable.kx8wk7vici.wasm",
        "hash": "sha256-yIpmaGSM52zfmghabdFQq1kPWmZMpUbdkEWArChZpsQ=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 37456,
        "virtualPath": "System.Collections.NonGeneric.wasm",
        "name": "System.Collections.NonGeneric.rg164d0d5b.wasm",
        "hash": "sha256-62SPxH+yLbtYaWDMZmt8bTBPxuWMYRXUsrzZNRGzHpE=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 37456,
        "virtualPath": "System.Collections.Specialized.wasm",
        "name": "System.Collections.Specialized.tmqfcyenxv.wasm",
        "hash": "sha256-lSjwj6R4kYlMz4wI6/KU9HhjZnpsYN0BDPIUQa6jJls=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 102480,
        "virtualPath": "System.Collections.wasm",
        "name": "System.Collections.r35q4rsnar.wasm",
        "hash": "sha256-qRMUndux0b6YC2NoJhISRby2hfndGDYiU9LfAamqsmI=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 108624,
        "virtualPath": "System.ComponentModel.Annotations.wasm",
        "name": "System.ComponentModel.Annotations.h2okcie9el.wasm",
        "hash": "sha256-2ermHSqf8WRnJzNQdmPqfiSYbZt4KyFY1AZwoYefJ6Y=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 6224,
        "virtualPath": "System.ComponentModel.DataAnnotations.wasm",
        "name": "System.ComponentModel.DataAnnotations.4zfntuq785.wasm",
        "hash": "sha256-oIUegLWuXE9xNeC17vRR7k+ZUQzqfEp7yfDXSrmJXEM=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 15952,
        "virtualPath": "System.ComponentModel.EventBasedAsync.wasm",
        "name": "System.ComponentModel.EventBasedAsync.if67tuah7t.wasm",
        "hash": "sha256-so5g0k+Az5LwLeRZKd82ILJgxUUq0h0u1BHE4D++vZ4=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 31824,
        "virtualPath": "System.ComponentModel.Primitives.wasm",
        "name": "System.ComponentModel.Primitives.9s3aj0i5ic.wasm",
        "hash": "sha256-V3tZ9qtrSIXC0+ZNrZnMZF0/LyWIgoyk135CqJmrkBI=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 307280,
        "virtualPath": "System.ComponentModel.TypeConverter.wasm",
        "name": "System.ComponentModel.TypeConverter.y564txh256.wasm",
        "hash": "sha256-yhYNzVkxjBvPByL5CMbG4XnvgOiYmpZ03YxuE9RvGx4=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5712,
        "virtualPath": "System.ComponentModel.wasm",
        "name": "System.ComponentModel.7m1jtwm0ia.wasm",
        "hash": "sha256-EVQhnbbV9u/dHM5Rs+05jthF6JFEjY/gYebTyg6xFiw=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 8784,
        "virtualPath": "System.Configuration.wasm",
        "name": "System.Configuration.zbh1p0rn6c.wasm",
        "hash": "sha256-/zYWoaKE0ucOGdhgBeVDnuSO+Bg1QbJpqTjC5dj2f2Q=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 43088,
        "virtualPath": "System.Console.wasm",
        "name": "System.Console.gqiwxss6uo.wasm",
        "hash": "sha256-2BcYaYngkVJlEwbOGcqosG3TFXpaIkqAOn73qRbeNzo=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 12880,
        "virtualPath": "System.Core.wasm",
        "name": "System.Core.vbqi6op61c.wasm",
        "hash": "sha256-y4tlHM0b/kByCrCiz+oRaWnkrT5OGMgMIW41xTdHMzI=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 1007184,
        "virtualPath": "System.Data.Common.wasm",
        "name": "System.Data.Common.90tfgi7gbc.wasm",
        "hash": "sha256-mUjdKeg3gdFqrJ2lxtZlFO6TvCFqarsZzqVsyklDHb8=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "System.Data.DataSetExtensions.wasm",
        "name": "System.Data.DataSetExtensions.hv5mmavht3.wasm",
        "hash": "sha256-w8qz9RpF34nWkJsntqpsmUubgrC8acFrXD3Uugtytj8=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 14928,
        "virtualPath": "System.Data.wasm",
        "name": "System.Data.sdipl88bip.wasm",
        "hash": "sha256-UL4sKbhTUbAZLZxTn5YAcz0YAj3h8RUMpW3mVM7kMdE=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5712,
        "virtualPath": "System.Diagnostics.Contracts.wasm",
        "name": "System.Diagnostics.Contracts.apymkbs8i2.wasm",
        "hash": "sha256-LrlnX/nOIWIkpHIeCeLesWrWdKoZwETe0SfFIVm6Hio=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "System.Diagnostics.Debug.wasm",
        "name": "System.Diagnostics.Debug.91wfpladwl.wasm",
        "hash": "sha256-E6Og22zSKev626/RItPcRknYfZ/K9nDk/kAEB1B53eA=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 198224,
        "virtualPath": "System.Diagnostics.DiagnosticSource.wasm",
        "name": "System.Diagnostics.DiagnosticSource.9kpuqesnqn.wasm",
        "hash": "sha256-6a4I2uoOdZ5rh1DhOvtCzhEqPXHuwkuCPmFUY68K4b4=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 11856,
        "virtualPath": "System.Diagnostics.FileVersionInfo.wasm",
        "name": "System.Diagnostics.FileVersionInfo.cgnost046i.wasm",
        "hash": "sha256-vLwaPx/+1/x8hhGwhh0rVt3SSsAQ+gFrFG33/+JO+Yw=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 58448,
        "virtualPath": "System.Diagnostics.Process.wasm",
        "name": "System.Diagnostics.Process.74z4gdflog.wasm",
        "hash": "sha256-xx5dKDwO3YMRaVZGk5Efsd70m80OaOLMyukCaMuZh6A=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 15440,
        "virtualPath": "System.Diagnostics.StackTrace.wasm",
        "name": "System.Diagnostics.StackTrace.dwqor9b0t1.wasm",
        "hash": "sha256-0/LzU4N6c53rYAtGwReKIDMKbqoM09jBDvtgbyy1FMI=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 21072,
        "virtualPath": "System.Diagnostics.TextWriterTraceListener.wasm",
        "name": "System.Diagnostics.TextWriterTraceListener.rtlrn49gzq.wasm",
        "hash": "sha256-Pz5iZaYX+BhwUMVAdUe2aU8X8DBp9P17FY+gS1isYaM=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "System.Diagnostics.Tools.wasm",
        "name": "System.Diagnostics.Tools.d8qengmja7.wasm",
        "hash": "sha256-TVPy8e8gVb8vn4yLZ89uQ4z1ivAn5vjMUIKfNoEnaO4=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 48208,
        "virtualPath": "System.Diagnostics.TraceSource.wasm",
        "name": "System.Diagnostics.TraceSource.w2qcbzh1mt.wasm",
        "hash": "sha256-+EnQLaaLrbPuC3KzOojbzymIEtu6FQdBjjSruCNLV2c=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5712,
        "virtualPath": "System.Diagnostics.Tracing.wasm",
        "name": "System.Diagnostics.Tracing.ljllbqj6sa.wasm",
        "hash": "sha256-UaP1U1YkUPo7cM8SxIwJ/HPeG6+FYi/hom0DzGow2RA=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 54352,
        "virtualPath": "System.Drawing.Primitives.wasm",
        "name": "System.Drawing.Primitives.m78ihkeo4x.wasm",
        "hash": "sha256-ElumLaTtxoNPdIuiS9e03Pp4RZwT/PTMNFRCtUdENlQ=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 9808,
        "virtualPath": "System.Drawing.wasm",
        "name": "System.Drawing.tcvfza8egf.wasm",
        "hash": "sha256-g0jt876Lx4SEn47aFXyHNBe2ys1/l8ItCEPVRxa610s=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5712,
        "virtualPath": "System.Dynamic.Runtime.wasm",
        "name": "System.Dynamic.Runtime.3661yuqxeq.wasm",
        "hash": "sha256-hbBkASrQjGv/TA6QPZshxlNUw/o9J6khWnWTp6xKGfY=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 96848,
        "virtualPath": "System.Formats.Asn1.wasm",
        "name": "System.Formats.Asn1.dhlskxkm6l.wasm",
        "hash": "sha256-PyzbseLDr1/J1cZA1tAA8plKAR5ztfH/sR/+OiQwyBM=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 30288,
        "virtualPath": "System.Formats.Tar.wasm",
        "name": "System.Formats.Tar.tuvl1d5xpx.wasm",
        "hash": "sha256-e+a9L2EK62LgltgPg4QF+H7OoHsT6RW+ZhGHpaOxz/8=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "System.Globalization.Calendars.wasm",
        "name": "System.Globalization.Calendars.89h7gp4qwv.wasm",
        "hash": "sha256-HCdUv0l5YB0cldGVqxmJ34/zsT/PBjkHjAt8N7lSKas=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "System.Globalization.Extensions.wasm",
        "name": "System.Globalization.Extensions.ooqj5fpugd.wasm",
        "hash": "sha256-2N4Vq99pTcoLDyW19/E0YqJG+oTqa2uFzM/cc1KIlLU=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "System.Globalization.wasm",
        "name": "System.Globalization.q2updydxh5.wasm",
        "hash": "sha256-fpbnY+Ka2eTy4Ux1KyN/vOoRbLdjxUfEEowKL4pi2Vo=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 17488,
        "virtualPath": "System.IO.Compression.Brotli.wasm",
        "name": "System.IO.Compression.Brotli.0l3kgobrkt.wasm",
        "hash": "sha256-JC/WsJ5nQwY8bMd/38ViNsacombUrw5d133XCAhfJe4=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "System.IO.Compression.FileSystem.wasm",
        "name": "System.IO.Compression.FileSystem.1v93bvht92.wasm",
        "hash": "sha256-rWvUrYWAqUIiscJJGYqzTsOVYZSs7jaiBW/OQJS6ZiU=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 56400,
        "virtualPath": "System.IO.Compression.ZipFile.wasm",
        "name": "System.IO.Compression.ZipFile.37ep0vcnrf.wasm",
        "hash": "sha256-H3CvtRagMy1jIrL3Y//kikS2lpWTSFisBlFKllF9dhU=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 210512,
        "virtualPath": "System.IO.Compression.wasm",
        "name": "System.IO.Compression.f00cpvgq7h.wasm",
        "hash": "sha256-D6BR5g48gd8buUFgdpgmLg2yQ+IxPAQrFdV7CaAK2Tc=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 21584,
        "virtualPath": "System.IO.FileSystem.AccessControl.wasm",
        "name": "System.IO.FileSystem.AccessControl.z9urz4biwl.wasm",
        "hash": "sha256-+Wq2/WjQVqWMnS9sEJydTq4KCUIFMt/EcmXQg9btE4k=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 13392,
        "virtualPath": "System.IO.FileSystem.DriveInfo.wasm",
        "name": "System.IO.FileSystem.DriveInfo.ao1i2r5vzv.wasm",
        "hash": "sha256-BomcullID77iB2w4t1m5rH/j7xfI0/9PFgyGDoe6lUc=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "System.IO.FileSystem.Primitives.wasm",
        "name": "System.IO.FileSystem.Primitives.1ydgfa9vh4.wasm",
        "hash": "sha256-Zy6XpeYCozrDDhxRcyjR5hhFCnOlUZ0tV0JMvrH+JBo=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 22608,
        "virtualPath": "System.IO.FileSystem.Watcher.wasm",
        "name": "System.IO.FileSystem.Watcher.hdepgz079j.wasm",
        "hash": "sha256-BVEJm7jVFrBaqvOauqmif7Ah9jlnilHktcEgAuzm/Dg=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "System.IO.FileSystem.wasm",
        "name": "System.IO.FileSystem.b3gb3ma110.wasm",
        "hash": "sha256-NwFlMwmXBOtns7BVxZTSqA0aax+JrSO2fL3xhRe2p0Y=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 24144,
        "virtualPath": "System.IO.IsolatedStorage.wasm",
        "name": "System.IO.IsolatedStorage.5g97jqfjzl.wasm",
        "hash": "sha256-lXYYALSJaPc/L26cvA3orY8TVvOYaa7h3STSt0/zBVw=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 38480,
        "virtualPath": "System.IO.MemoryMappedFiles.wasm",
        "name": "System.IO.MemoryMappedFiles.1w7chqecgn.wasm",
        "hash": "sha256-DxSlq2eCySj3nAjhbCm/hECNqh/wUHK5efpjwg52Y8k=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 73296,
        "virtualPath": "System.IO.Pipelines.wasm",
        "name": "System.IO.Pipelines.9k2s8pra8r.wasm",
        "hash": "sha256-B8ir4tQEHzqjhQ/Q7QW+eCK7mO73vUI9X/wkhb4DQHk=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 12880,
        "virtualPath": "System.IO.Pipes.AccessControl.wasm",
        "name": "System.IO.Pipes.AccessControl.bxhtvr17gc.wasm",
        "hash": "sha256-/5qxfRUNfXMQ/32jZqmp8PEf4tksRdfb9Md4qPMTCew=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 32336,
        "virtualPath": "System.IO.Pipes.wasm",
        "name": "System.IO.Pipes.03vrye9tn9.wasm",
        "hash": "sha256-HACA440/gKhlsvLF7e87BslrqnDIO4aFYIC11Ec9+yw=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "System.IO.UnmanagedMemoryStream.wasm",
        "name": "System.IO.UnmanagedMemoryStream.umvxzkvj3c.wasm",
        "hash": "sha256-ml7taAIeMTG27WsJq93ixDkgR4LouFlRIaiXyHWHeIA=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "System.IO.wasm",
        "name": "System.IO.3s2pw1gujg.wasm",
        "hash": "sha256-Ux6wOC4NbLQ6vfUg5Wb0FgLcGXhEWJam61T7iOv4adk=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 503888,
        "virtualPath": "System.Linq.AsyncEnumerable.wasm",
        "name": "System.Linq.AsyncEnumerable.hxmihh630j.wasm",
        "hash": "sha256-awYZe4wudja7+USTAolNWS1WZ+py0QdqBiDVX+G26+E=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 565328,
        "virtualPath": "System.Linq.Expressions.wasm",
        "name": "System.Linq.Expressions.r0p9drn52o.wasm",
        "hash": "sha256-FfBYv8rrpzHRVnLYwISnWqHrKuyePcJzA0V3nmGN/Fg=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 214608,
        "virtualPath": "System.Linq.Parallel.wasm",
        "name": "System.Linq.Parallel.z2j37pzmz8.wasm",
        "hash": "sha256-W56rzcRXepBhgMmOQI4waRvm1YUDquhzsXyN7jRbru4=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 71248,
        "virtualPath": "System.Linq.Queryable.wasm",
        "name": "System.Linq.Queryable.7dn7k03ksr.wasm",
        "hash": "sha256-9clX4xADEKbvUWHcpdT8eoetB64JCOi+GV0ld8sxy+k=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 202832,
        "virtualPath": "System.Linq.wasm",
        "name": "System.Linq.7u28exgzgu.wasm",
        "hash": "sha256-oY2Y0E0LC4GCMzgo4UpQoeTPwzAY2MAFMB8MtxpICdw=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 49232,
        "virtualPath": "System.Memory.wasm",
        "name": "System.Memory.qcpnllc5fq.wasm",
        "hash": "sha256-Gok9OHUpK5VKgz38tTZldUQHo2L2kwGx73W6/PNaU1k=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 45648,
        "virtualPath": "System.Net.Http.Json.wasm",
        "name": "System.Net.Http.Json.rmz08mwhpz.wasm",
        "hash": "sha256-YxTRjjzorX1xSUo+1Oj/BmxeB0V3yObkUO+FuoQhfQ0=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 293456,
        "virtualPath": "System.Net.Http.wasm",
        "name": "System.Net.Http.pu81j0ysb1.wasm",
        "hash": "sha256-Efa1IsdJz9RuxVAMOrWLxJm0ikUdUFtJztJLtVR7spo=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 45648,
        "virtualPath": "System.Net.HttpListener.wasm",
        "name": "System.Net.HttpListener.rrwkefkaj6.wasm",
        "hash": "sha256-5wwcRlCeICoce19x099DmVXUt6tolRLHfUVrzgjgRaQ=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 126032,
        "virtualPath": "System.Net.Mail.wasm",
        "name": "System.Net.Mail.zu8nqgexe3.wasm",
        "hash": "sha256-ZblHZVnRnSWlukEgNm+mPORz8IFeriixwwTrulJGNDw=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 21072,
        "virtualPath": "System.Net.NameResolution.wasm",
        "name": "System.Net.NameResolution.kl5j87tdtq.wasm",
        "hash": "sha256-GDcY17sjsRA9URS+h4hEkUjemyPfb5l1csbntT/rcSI=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 31824,
        "virtualPath": "System.Net.NetworkInformation.wasm",
        "name": "System.Net.NetworkInformation.y0jdbbbvd5.wasm",
        "hash": "sha256-kghpOjo4o1dA3+vBndCazl38qLHzkjpPX0dfH0lfE8A=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 17488,
        "virtualPath": "System.Net.Ping.wasm",
        "name": "System.Net.Ping.xizc4u9n0h.wasm",
        "hash": "sha256-2UryWQ9L2wdeWSyFzhJXMG7+ulM9RSxRPQIo0wuxS6g=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 97872,
        "virtualPath": "System.Net.Primitives.wasm",
        "name": "System.Net.Primitives.dod08oyswh.wasm",
        "hash": "sha256-Pc3fN7hIdcZQKqpDQyJW+mJ45XSmjQoYIzePRFYZfIo=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 28752,
        "virtualPath": "System.Net.Quic.wasm",
        "name": "System.Net.Quic.nfebwnr5pj.wasm",
        "hash": "sha256-0+mjLoctc4MhNADi8voXsVVFzKCLliiJ3Yk5FMm7FQc=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 55376,
        "virtualPath": "System.Net.Requests.wasm",
        "name": "System.Net.Requests.umwp9i6qan.wasm",
        "hash": "sha256-doLbTV09gAENQNIVYTie0OQHFbbZc3iM8Vzpq3hmb48=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 113744,
        "virtualPath": "System.Net.Security.wasm",
        "name": "System.Net.Security.kb0p836fao.wasm",
        "hash": "sha256-4OEo/qhq+A5eSYEu3+3pROReOCFC4467rjxLgEqQaHM=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 31312,
        "virtualPath": "System.Net.ServerSentEvents.wasm",
        "name": "System.Net.ServerSentEvents.sxefmzdgdk.wasm",
        "hash": "sha256-YAs4xQSkZVN78lsl//S7GiKh0LFFsxqUAFR4BZfEniQ=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "System.Net.ServicePoint.wasm",
        "name": "System.Net.ServicePoint.bt3vrrnckt.wasm",
        "hash": "sha256-D9wmB+L9nl4pMn6tm4kGFHc9BWNxAMixrHLp5ewbm00=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 64080,
        "virtualPath": "System.Net.Sockets.wasm",
        "name": "System.Net.Sockets.fwnhi7lieb.wasm",
        "hash": "sha256-PzFLRFmZ4fZwJIhnz6mp8mRLVgXvdStyhe+2j3VWWtE=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 46672,
        "virtualPath": "System.Net.WebClient.wasm",
        "name": "System.Net.WebClient.gdx7mxntuq.wasm",
        "hash": "sha256-TLEJ8MgmiQmnJT9R8nawRmiO3uNbJHHNin7C86lqo5k=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 22608,
        "virtualPath": "System.Net.WebHeaderCollection.wasm",
        "name": "System.Net.WebHeaderCollection.jaqm9n3qp7.wasm",
        "hash": "sha256-ZbxPg3StaIuIAJLGZLNepfknKInDl1a16aqFHdd+yC0=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 11856,
        "virtualPath": "System.Net.WebProxy.wasm",
        "name": "System.Net.WebProxy.vmcgrl18ap.wasm",
        "hash": "sha256-Cd2BE8XsK2+sOLUrmbrkmbHnLSuMORS4jTddp9b2Rz0=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 41552,
        "virtualPath": "System.Net.WebSockets.Client.wasm",
        "name": "System.Net.WebSockets.Client.onv9dslmw4.wasm",
        "hash": "sha256-fApMfJ4DPFvwK06FsUuYlI53JVuP5TKuuD/M3Qu0VdU=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 100432,
        "virtualPath": "System.Net.WebSockets.wasm",
        "name": "System.Net.WebSockets.barupneqyj.wasm",
        "hash": "sha256-o7pOlsQOa18Aw47O3m4Y01q3Dg1BOaeAUZmK35IR1OU=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 6736,
        "virtualPath": "System.Net.wasm",
        "name": "System.Net.tk1hrv9mvk.wasm",
        "hash": "sha256-PQlqYijQx1BWEhca3nZ6Ek66JwWgaXv3BhnuafQdGfg=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5712,
        "virtualPath": "System.Numerics.Vectors.wasm",
        "name": "System.Numerics.Vectors.eqce1nka0n.wasm",
        "hash": "sha256-9lRAkH/oAjFrzQhRH2NJnnCOOoNqdeI4uaDZMVkdAf8=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "System.Numerics.wasm",
        "name": "System.Numerics.6q8za2i2iw.wasm",
        "hash": "sha256-ErdzqRar7wX2D1dqo8vI3VU/JsDKi3bPtKbU5M5tYos=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 30800,
        "virtualPath": "System.ObjectModel.wasm",
        "name": "System.ObjectModel.avw80u6lhq.wasm",
        "hash": "sha256-ms871ACrJRL/vTYCKBFrJ2xm6bvwTArbDk0cjo5YB6s=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 848976,
        "virtualPath": "System.Private.DataContractSerialization.wasm",
        "name": "System.Private.DataContractSerialization.jtaesdya0r.wasm",
        "hash": "sha256-uUEj8wKXzOHSd2+STO5M0Q4mvD31/5TT3t5VpwoXFBA=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 92752,
        "virtualPath": "System.Private.Uri.wasm",
        "name": "System.Private.Uri.7jjlh4ujxr.wasm",
        "hash": "sha256-3cjyGbwu3FWuzs/MerGUtf3elLcnSo3RrKMo9pn45LI=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 144464,
        "virtualPath": "System.Private.Xml.Linq.wasm",
        "name": "System.Private.Xml.Linq.9hs39y8020.wasm",
        "hash": "sha256-7aONz+HlbTRrcneFFw2tYM1IBJer0QYH5RaY7cDKvsc=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 3108944,
        "virtualPath": "System.Private.Xml.wasm",
        "name": "System.Private.Xml.uu5advpn8n.wasm",
        "hash": "sha256-JpXin+YRCVNnwsezgJEQQRAtEUTnJ54MVqKnQsEudfA=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 27728,
        "virtualPath": "System.Reflection.DispatchProxy.wasm",
        "name": "System.Reflection.DispatchProxy.lddniwfkog.wasm",
        "hash": "sha256-h5omPxZZ0RPKqHbaoCdOyXV69qlAsA5ebAsXg4ctrYo=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "System.Reflection.Emit.ILGeneration.wasm",
        "name": "System.Reflection.Emit.ILGeneration.fcjut8ft3g.wasm",
        "hash": "sha256-b0p0NTi0MyNHKVTv2xY0iLGgbBStuOz00fpu1BcZ2dc=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "System.Reflection.Emit.Lightweight.wasm",
        "name": "System.Reflection.Emit.Lightweight.c8cc4ybch9.wasm",
        "hash": "sha256-FDtxeZPstcGhnkJasv0PqMFxP24hdS2NVC2JSftPE08=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 123984,
        "virtualPath": "System.Reflection.Emit.wasm",
        "name": "System.Reflection.Emit.z7u7395x68.wasm",
        "hash": "sha256-QTQ22ce9S2vN3in36Kn5QKmbAFqjfFl295RNy5SObkI=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "System.Reflection.Extensions.wasm",
        "name": "System.Reflection.Extensions.fa65xpqxi9.wasm",
        "hash": "sha256-F1RfggAnUpcFhBvKDxp9ms0TD1TJe1sl5H4wB1fKUyY=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 494160,
        "virtualPath": "System.Reflection.Metadata.wasm",
        "name": "System.Reflection.Metadata.yanw8gfnfk.wasm",
        "hash": "sha256-Bsr4zZEUzSK3OSdCzCKGu1op4LWLxRMCsn3KROfioPU=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "System.Reflection.Primitives.wasm",
        "name": "System.Reflection.Primitives.lg60w49r43.wasm",
        "hash": "sha256-tSBnmcz2rAspszC4tS7UhNxfOxpopAI5fgk6dChujXk=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 13904,
        "virtualPath": "System.Reflection.TypeExtensions.wasm",
        "name": "System.Reflection.TypeExtensions.5kbmhht1rv.wasm",
        "hash": "sha256-BYlCKiHJYWRE4o+STPVmtXl/9T3c9YiHEXaLtwmTrwQ=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5712,
        "virtualPath": "System.Reflection.wasm",
        "name": "System.Reflection.ad5vcpa8sk.wasm",
        "hash": "sha256-7lyIVcaGC0IuijmTeaTHlnosVAk3IlN8es3xnXfu3vU=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "System.Resources.Reader.wasm",
        "name": "System.Resources.Reader.ueknp02ati.wasm",
        "hash": "sha256-FiDDgCoCs51Eyzkk5PsZ10dTww9E+mm9vVqN+esVFdM=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "System.Resources.ResourceManager.wasm",
        "name": "System.Resources.ResourceManager.ln44ugcssn.wasm",
        "hash": "sha256-kc4JZ4EKjm5PoFf72CrkeiIGWRgzAv0uXis5SUhJvcs=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 16464,
        "virtualPath": "System.Resources.Writer.wasm",
        "name": "System.Resources.Writer.qvmfcne2p3.wasm",
        "hash": "sha256-ajaIeBCjsbu6Ecy6tveUikZHXDzUghdUcth6pe+eDig=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "System.Runtime.CompilerServices.Unsafe.wasm",
        "name": "System.Runtime.CompilerServices.Unsafe.it7ssxlez8.wasm",
        "hash": "sha256-lqan1BI5Nh1ofRnjERSqFu30eogkiNy+wgI/L9uMgww=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 6736,
        "virtualPath": "System.Runtime.CompilerServices.VisualC.wasm",
        "name": "System.Runtime.CompilerServices.VisualC.rrjgtxcosk.wasm",
        "hash": "sha256-6RbHQKY16VmL/8l0tEhjjAe2pv3ohR+TQoYjqnVBiGo=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 7248,
        "virtualPath": "System.Runtime.Extensions.wasm",
        "name": "System.Runtime.Extensions.ul1onzbmzd.wasm",
        "hash": "sha256-IjF5xkbNj4UfAWYMSK6DDOvdrEiFhComQufJZzBh6Z0=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "System.Runtime.Handles.wasm",
        "name": "System.Runtime.Handles.01tu2azyx5.wasm",
        "hash": "sha256-jLcjw31XGMK8RPqtVucwiJ6teivw/pn1Q8WngL9mDh0=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "System.Runtime.InteropServices.RuntimeInformation.wasm",
        "name": "System.Runtime.InteropServices.RuntimeInformation.sti9qvbhp0.wasm",
        "hash": "sha256-kO3LF4xJJwELfqIonhEJhaL7+Jj7te1E68CCe0h3Zlk=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 53840,
        "virtualPath": "System.Runtime.InteropServices.wasm",
        "name": "System.Runtime.InteropServices.d8c39t6eci.wasm",
        "hash": "sha256-U4LMH8Uu0Zb2ljPha4xbX2B1oYTlDiy7QNjv5dPfc04=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 8272,
        "virtualPath": "System.Runtime.Intrinsics.wasm",
        "name": "System.Runtime.Intrinsics.l8ozriwfcm.wasm",
        "hash": "sha256-i1fnSiULOHKDZjJKh3BBVg8C59X0FEYSfgDKiadSZEY=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "System.Runtime.Loader.wasm",
        "name": "System.Runtime.Loader.v3lrwriszd.wasm",
        "hash": "sha256-my8sxlmCETk13ncC6/K2ZO3jJmz2DarbZuYv9f/VAjg=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 176208,
        "virtualPath": "System.Runtime.Numerics.wasm",
        "name": "System.Runtime.Numerics.we79siej03.wasm",
        "hash": "sha256-yFFB+XTZqAJHqXH2IRg4OYSbV+idhcwI4t/UGq5gBuM=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 55376,
        "virtualPath": "System.Runtime.Serialization.Formatters.wasm",
        "name": "System.Runtime.Serialization.Formatters.b8unenqznf.wasm",
        "hash": "sha256-y+IZsXlUmbAufOdQGYuddZCIHjzsmqyD2aVPm5b6FdY=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "System.Runtime.Serialization.Json.wasm",
        "name": "System.Runtime.Serialization.Json.6l2mbglzjn.wasm",
        "hash": "sha256-mvEhh1CnWgZyd+isxd7ebOXuY/qiGGKjqhlASajvGXU=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 12880,
        "virtualPath": "System.Runtime.Serialization.Primitives.wasm",
        "name": "System.Runtime.Serialization.Primitives.aeltiuyoe3.wasm",
        "hash": "sha256-bkT+nIdsFMzHVCNqcsuebvj2DLZoK4vERMKfRnVfYys=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 6224,
        "virtualPath": "System.Runtime.Serialization.Xml.wasm",
        "name": "System.Runtime.Serialization.Xml.iocip9zwmo.wasm",
        "hash": "sha256-sr36xENFxD0YE+qfDdz1vvbsOJ835549LrKzD6EqtKo=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 6736,
        "virtualPath": "System.Runtime.Serialization.wasm",
        "name": "System.Runtime.Serialization.sm22hrw7w8.wasm",
        "hash": "sha256-1DZ6bCvE4clJShRb0VHLJM+esWvCg+xaHFPh+UBRUdY=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 35408,
        "virtualPath": "System.Runtime.wasm",
        "name": "System.Runtime.fisvw61cec.wasm",
        "hash": "sha256-6VXNZMeqNRHl2eA0RqSdDg1nrMNdKXy1/7eaRTpuEbE=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 47184,
        "virtualPath": "System.Security.AccessControl.wasm",
        "name": "System.Security.AccessControl.5u1mivabrz.wasm",
        "hash": "sha256-M7+ewE3RkAGkKzYCu8+VrlVxmDrv9MYAC8+DWMbFao8=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 44112,
        "virtualPath": "System.Security.Claims.wasm",
        "name": "System.Security.Claims.mtz1w2ixwg.wasm",
        "hash": "sha256-Zsx/ouyEqMXcOvWsTKqCzbJBO01TR/PcSX7HMUGjZJA=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 6736,
        "virtualPath": "System.Security.Cryptography.Algorithms.wasm",
        "name": "System.Security.Cryptography.Algorithms.qunn47t9vh.wasm",
        "hash": "sha256-fhdmyenN3WO+cJ3HKBkfKJTtUecdrkwlPJX43Ep4ev4=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5712,
        "virtualPath": "System.Security.Cryptography.Cng.wasm",
        "name": "System.Security.Cryptography.Cng.7vaydygs68.wasm",
        "hash": "sha256-g2CFdBsnSolJZtUwiPCWaLtFHVKYX63GTXLaI7fsdJA=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5712,
        "virtualPath": "System.Security.Cryptography.Csp.wasm",
        "name": "System.Security.Cryptography.Csp.e3zbtfh1wl.wasm",
        "hash": "sha256-aq8hfGUZNAwxNRxEwc17JGnSDgspB3y/vWOudmhmKNw=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "System.Security.Cryptography.Encoding.wasm",
        "name": "System.Security.Cryptography.Encoding.9nz4d94qz2.wasm",
        "hash": "sha256-dT7KbqqM17VdDYZ3B65GqGx9kx6eiVn/+wXdVYhV/1g=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "System.Security.Cryptography.OpenSsl.wasm",
        "name": "System.Security.Cryptography.OpenSsl.x3kr0sj5hp.wasm",
        "hash": "sha256-cwFYE+ITRjy0jzfOTQx3y5qVJKrA6/isecpF3ju34Rg=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "System.Security.Cryptography.Primitives.wasm",
        "name": "System.Security.Cryptography.Primitives.5y8cuxjtmo.wasm",
        "hash": "sha256-s9UFwJS/HiOkDY6bvYo+Y7Tulaj6K00+O7ckk7303yQ=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 6736,
        "virtualPath": "System.Security.Cryptography.X509Certificates.wasm",
        "name": "System.Security.Cryptography.X509Certificates.5cifgdclqs.wasm",
        "hash": "sha256-a5GWXRN73inXfWr9rut2imKlTVm+7L6zWde6PvGiYFw=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 678992,
        "virtualPath": "System.Security.Cryptography.wasm",
        "name": "System.Security.Cryptography.q0i2hr58x2.wasm",
        "hash": "sha256-Ruu0jEH/Rp68fJsPR6/SMn6WQw5NbE4qVTR2REe/Nw0=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 27216,
        "virtualPath": "System.Security.Principal.Windows.wasm",
        "name": "System.Security.Principal.Windows.drtcbozdnq.wasm",
        "hash": "sha256-qdwpMCSfq3Fb8jFZI6/zpmwGhLLQpaDLd0oUao+H420=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "System.Security.Principal.wasm",
        "name": "System.Security.Principal.s09y3f67c0.wasm",
        "hash": "sha256-1P6w+FXhXi+0kFxNxS5wdhTUidYZ1qUrxicq2AVBMQY=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "System.Security.SecureString.wasm",
        "name": "System.Security.SecureString.ea8mh1yzla.wasm",
        "hash": "sha256-dghuX4bKev8+4P8MYbVTXd/AbiNIV9VUtlwNGdQVgu0=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 7760,
        "virtualPath": "System.Security.wasm",
        "name": "System.Security.flqkcierjc.wasm",
        "hash": "sha256-o3dIDEl7Y48qAKy5Y7mDoutPkW++QZLsC+pLY030ojU=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 6224,
        "virtualPath": "System.ServiceModel.Web.wasm",
        "name": "System.ServiceModel.Web.rl8y2at1og.wasm",
        "hash": "sha256-8eXOli8on1G9qggSXJGMjnPg8LFI9bVeveot2oDaXII=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "System.ServiceProcess.wasm",
        "name": "System.ServiceProcess.m3dni99oue.wasm",
        "hash": "sha256-EkgB/at0potD3tqVJ+NgO6WOIiSYERMEP3419RM52Z8=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 731728,
        "virtualPath": "System.Text.Encoding.CodePages.wasm",
        "name": "System.Text.Encoding.CodePages.tzdtpg8zl6.wasm",
        "hash": "sha256-59rX0xS+UrL0/iHY3znCqO28FxWfKnVF4a+KS+L0n1M=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "System.Text.Encoding.Extensions.wasm",
        "name": "System.Text.Encoding.Extensions.gusxmlgm3v.wasm",
        "hash": "sha256-SNpEAnACCN4FWkMHLF2dJEC4D1TeHcjiz5vASPo4NQQ=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "System.Text.Encoding.wasm",
        "name": "System.Text.Encoding.sdinunx5ec.wasm",
        "hash": "sha256-MFnjd+w1InbYZDTb2DDQjUNTIX6pI2gEY4nZeKNMXWg=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 55888,
        "virtualPath": "System.Text.Encodings.Web.wasm",
        "name": "System.Text.Encodings.Web.0qr4e40dhl.wasm",
        "hash": "sha256-qPwMN9FMb0CqVCa2W3wXaTUH2rW46IkOxYGtdMiRPTU=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 726096,
        "virtualPath": "System.Text.Json.wasm",
        "name": "System.Text.Json.z8ea8nv78j.wasm",
        "hash": "sha256-o9qDSRNE4lh4vVzTKjAA1TQgpd/8rZasNBHNs9CSS/w=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 384592,
        "virtualPath": "System.Text.RegularExpressions.wasm",
        "name": "System.Text.RegularExpressions.rh04d4ahcz.wasm",
        "hash": "sha256-gYfE2ivbfrbQiem5OKdSaiSetKRjENLllXiRDS/BV0k=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 23120,
        "virtualPath": "System.Threading.AccessControl.wasm",
        "name": "System.Threading.AccessControl.osyi3oys00.wasm",
        "hash": "sha256-WBznA7B/w6XpYhBae8mpSJ/fB8KUTPVippE1wjOXp2c=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 55888,
        "virtualPath": "System.Threading.Channels.wasm",
        "name": "System.Threading.Channels.hr3lxb0w3n.wasm",
        "hash": "sha256-syynm/o+rSDLvu6WImY+0n1r1x91grP7/rfO6K8oFWk=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "System.Threading.Overlapped.wasm",
        "name": "System.Threading.Overlapped.f6zyr24551.wasm",
        "hash": "sha256-aVaheGp7HH3sHfNjBFuwAAV9BzJGIvX05yJxg5NM0sc=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 175696,
        "virtualPath": "System.Threading.Tasks.Dataflow.wasm",
        "name": "System.Threading.Tasks.Dataflow.c86s1lv6d4.wasm",
        "hash": "sha256-jJMiTVyHlIsndKzPJGS89t99Ox6DZVySpIVVO6kpt2U=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "System.Threading.Tasks.Extensions.wasm",
        "name": "System.Threading.Tasks.Extensions.vfc8q9f6qj.wasm",
        "hash": "sha256-+36t4kcQRYsZb8DHBfV1e/I2tpyeWxUEwJH0Xy0Zpdg=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 51280,
        "virtualPath": "System.Threading.Tasks.Parallel.wasm",
        "name": "System.Threading.Tasks.Parallel.8np3509qum.wasm",
        "hash": "sha256-lNkytRA+4ud6ONtETvEPg7AwU1KZFtSaTnOk6a5077M=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 6224,
        "virtualPath": "System.Threading.Tasks.wasm",
        "name": "System.Threading.Tasks.u9ai1ctmha.wasm",
        "hash": "sha256-flqiXSzqDmuRfgEic90dnk05+w1GRdU21JhxAqmkbWQ=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "System.Threading.Thread.wasm",
        "name": "System.Threading.Thread.oom0tglu76.wasm",
        "hash": "sha256-KECHF68tVnHNB1a9miBucnKks3jJqEEgPwyVnvpsiKI=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "System.Threading.ThreadPool.wasm",
        "name": "System.Threading.ThreadPool.g96xpf75ab.wasm",
        "hash": "sha256-DF0xcg5ZP12UdU8EqKVID3sjqZrK/YE0qRdC9VSvdYU=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "System.Threading.Timer.wasm",
        "name": "System.Threading.Timer.ie2fb9h92f.wasm",
        "hash": "sha256-6rgCShqSCt0S/WPVzn8I3+LI/BjZPsysrLXrDERDIKo=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 34384,
        "virtualPath": "System.Threading.wasm",
        "name": "System.Threading.xl5ozmqm07.wasm",
        "hash": "sha256-m5JWY0ZvOc6duGBmd/vVCr91FkrLzGRaskcvd2qzoXk=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 164432,
        "virtualPath": "System.Transactions.Local.wasm",
        "name": "System.Transactions.Local.m6kxj3dxvz.wasm",
        "hash": "sha256-btNj22QsYc8POHXPUwinrZvnck6H5EdczKrT/CSu1OQ=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 6224,
        "virtualPath": "System.Transactions.wasm",
        "name": "System.Transactions.wlurf7m6nf.wasm",
        "hash": "sha256-TGG99PUUVx6y3T03PNSd67t2AsgGI78PgGuUmI1IOm8=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "System.ValueTuple.wasm",
        "name": "System.ValueTuple.dkje0432yl.wasm",
        "hash": "sha256-jZpEHN+lQT9p/TSXwalKOw1IP0xxungAo+F9sJsE6b4=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 19536,
        "virtualPath": "System.Web.HttpUtility.wasm",
        "name": "System.Web.HttpUtility.nw8r18zlrd.wasm",
        "hash": "sha256-15bLz3esgFUiO4QxMJuKVrxJ2vE28xRxuuIeBKDtTTQ=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "System.Web.wasm",
        "name": "System.Web.sa7wihm2rr.wasm",
        "hash": "sha256-DP3383IZexODn29NFIpzhzM6/SgQT89beqWigsXidew=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "System.Windows.wasm",
        "name": "System.Windows.jgmyqzeowg.wasm",
        "hash": "sha256-zbOvpd7OiW6hmuoOlmrmzMo/6BJvWSOJgMpN243uXIU=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "System.Xml.Linq.wasm",
        "name": "System.Xml.Linq.ofdli0nqes.wasm",
        "hash": "sha256-vIbI9IARicetTiHoBy0acgfg+nI3I9K9hZY4+AO19H0=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 11344,
        "virtualPath": "System.Xml.ReaderWriter.wasm",
        "name": "System.Xml.ReaderWriter.6coy6zu8vs.wasm",
        "hash": "sha256-tsFbAPz098d9u3qQ3UvVTF2wVyCTGti0GaP/10/KX58=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5712,
        "virtualPath": "System.Xml.Serialization.wasm",
        "name": "System.Xml.Serialization.4wizxygf96.wasm",
        "hash": "sha256-ZJMYojXkROMkFCqKad7RTpyyD14SiecRCq7r/SBMdPk=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5712,
        "virtualPath": "System.Xml.XDocument.wasm",
        "name": "System.Xml.XDocument.mf3p0dtx64.wasm",
        "hash": "sha256-Xr7C4uTLtaTRFD1GtmVThpzBKEsH1fJACDs4gi4nTsU=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5712,
        "virtualPath": "System.Xml.XPath.XDocument.wasm",
        "name": "System.Xml.XPath.XDocument.rizy32px1h.wasm",
        "hash": "sha256-U+MO2HK20PsERfUlC/jNQKU/VBupoWVAHKs/TfGkXF0=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "System.Xml.XPath.wasm",
        "name": "System.Xml.XPath.09beyzbtcp.wasm",
        "hash": "sha256-dO4oMM+FYzQnS1RCBi6fE368Lyguccc+pIlTzypOiWY=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "System.Xml.XmlDocument.wasm",
        "name": "System.Xml.XmlDocument.24l31fry6l.wasm",
        "hash": "sha256-ovpA+U44jzYdEYgDzZpEGFqIz7e2qniDRfup0MDKcp8=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 7248,
        "virtualPath": "System.Xml.XmlSerializer.wasm",
        "name": "System.Xml.XmlSerializer.joh891msyi.wasm",
        "hash": "sha256-fUfUATFV1oraAH8ekKa8I16rHxdNGkWpW5f4OVClCqU=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 12880,
        "virtualPath": "System.Xml.wasm",
        "name": "System.Xml.7ngwxmy0ej.wasm",
        "hash": "sha256-QxWpah0imbx63vq2l7+u7akxaOCspSXIqFOTj5858Ig=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 39504,
        "virtualPath": "System.wasm",
        "name": "System.wkgv4u3u5w.wasm",
        "hash": "sha256-sNG5OOhkSM5lXUpYJZa+THCWwE0tcQbkgnji7/Qm5z0=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 125008,
        "virtualPath": "VladislavAntonyuk.wasm",
        "name": "VladislavAntonyuk.hvi5njv5qn.wasm",
        "hash": "sha256-Mz4ERHnIRQfFrvN9DgQ73DsqJ1mgi8kZuxzab912+wA=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5712,
        "virtualPath": "WindowsBase.wasm",
        "name": "WindowsBase.8fdy5bvikc.wasm",
        "hash": "sha256-jOZKFG1xUg60hzqS2iaqGQtYLYuEybE8ult+u1PLiEg=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 49232,
        "virtualPath": "mscorlib.wasm",
        "name": "mscorlib.hxdq2rzizk.wasm",
        "hash": "sha256-+/i3MBEYRXTPTUlLT5MBwo42BP+SbAGwPzlWS64zsVQ=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 90704,
        "virtualPath": "netstandard.wasm",
        "name": "netstandard.ylzna27mbu.wasm",
        "hash": "sha256-+mkTHLHxaZXqp7DWfCbJnmLYqhSpxSHmjKJoBJC4iBQ=",
        "cache": "force-cache"
      }
    ],
    "libraryInitializers": [
      {
        "name": "BlazorWasmPreRendering.Build.lfyg69o9wu.lib.module.js"
      }
    ],
    "modulesAfterConfigLoaded": [
      {
        "name": "../BlazorWasmPreRendering.Build.lfyg69o9wu.lib.module.js"
      }
    ]
  },
  "debugLevel": 0,
  "globalizationMode": "sharded",
  "extensions": {
    "blazor": {}
  },
  "runtimeConfig": {
    "runtimeOptions": {
      "configProperties": {
        "Microsoft.AspNetCore.Components.Routing.RegexConstraintSupport": false,
        "System.Diagnostics.Debugger.IsSupported": false,
        "System.Diagnostics.Metrics.Meter.IsSupported": true,
        "System.Diagnostics.Tracing.EventSource.IsSupported": true,
        "System.GC.Server": true,
        "System.Globalization.Invariant": false,
        "System.TimeZoneInfo.Invariant": false,
        "System.Linq.Enumerable.IsSizeOptimized": true,
        "System.Net.Http.EnableActivityPropagation": true,
        "System.Net.Http.WasmEnableStreamingResponse": true,
        "System.Net.SocketsHttpHandler.Http3Support": false,
        "System.Reflection.Metadata.MetadataUpdater.IsSupported": false,
        "System.Resources.UseSystemResourceKeys": true,
        "System.Runtime.Serialization.EnableUnsafeBinaryFormatterSerialization": false,
        "System.Text.Encoding.EnableUnsafeUTF7Encoding": false,
        "System.Text.Json.JsonSerializer.IsReflectionEnabledByDefault": true,
        "System.Diagnostics.StackTrace.IsLineNumberSupported": false,
        "System.Runtime.CompilerServices.RuntimeFeature.IsMultithreadingSupported": false
      }
    }
  }
}/*json-end*/);export{po as default,mo as dotnet,go as exit};
