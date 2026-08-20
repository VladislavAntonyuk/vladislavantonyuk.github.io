//! Licensed to the .NET Foundation under one or more agreements.
//! The .NET Foundation licenses this file to you under the MIT license.

const e=()=>(async()=>{try{return new WebAssembly.Module(Uint8Array.from(atob("AGFzbQEAAAABBAFgAAADAgEAChABDgACaR9AAQMAAAsACxoL"),e=>e.codePointAt(0))),!0}catch(e){return!1}})(),o=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,15,1,13,0,65,1,253,15,65,2,253,15,253,128,2,11])),t=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])),n=Symbol.for("wasm promise_control");function r(e,o){let t=null;const r=new Promise(function(n,r){t={isDone:!1,promise:null,resolve:o=>{t.isDone||(t.isDone=!0,n(o),e&&e())},reject:e=>{t.isDone||(t.isDone=!0,r(e),o&&o())}}});t.promise=r;const s=r;return s[n]=t,{promise:s,promise_control:t}}function s(e){return e[n]}function i(e){e&&function(e){return void 0!==e[n]}(e)||We(!1,"Promise is not controllable")}const a="__mono_message__",l=["debug","log","trace","warn","info","error"],c="MONO_WASM: ";let d,u,f,m,g,p;function h(e){m=e}function b(e){if(ke.diagnosticTracing){const o="function"==typeof e?e():e;console.debug(c+o)}}function w(e,...o){console.info(c+e,...o)}function y(e,...o){console.info(e,...o)}function v(e,...o){console.warn(c+e,...o)}function _(e,...o){if(o&&o.length>0&&o[0]&&"object"==typeof o[0]){if(o[0].silent)return;if(o[0].toString)return void console.error(c+e,o[0].toString())}console.error(c+e,...o)}function A(e,o,t){return function(...n){try{let r=n[0];if(void 0===r)r="undefined";else if(null===r)r="null";else if("function"==typeof r)r=r.toString();else if("string"!=typeof r)try{r=JSON.stringify(r)}catch(e){r=r.toString()}o(t?JSON.stringify({method:e,payload:r,arguments:n.slice(1)}):[e+r,...n.slice(1)])}catch(e){f.error(`proxyConsole failed: ${e}`)}}}function x(e,o,t){u=o,m=e,f={...o};const n=`${t}/console`.replace("https://","wss://").replace("http://","ws://");d=new WebSocket(n),d.addEventListener("error",E),d.addEventListener("close",j),function(){for(const e of l)u[e]=A(`console.${e}`,R,!0)}()}function T(e){let o=30;const t=()=>{d?0==d.bufferedAmount||0==o?(e&&y(e),function(){for(const e of l)u[e]=A(`console.${e}`,f.log,!1)}(),d.removeEventListener("error",E),d.removeEventListener("close",j),d.close(1e3,e),d=void 0):(o--,globalThis.setTimeout(t,100)):e&&f&&f.log(e)};t()}function R(e){d&&d.readyState===WebSocket.OPEN?d.send(e):f.log(e)}function E(e){f.error(`[${m}] proxy console websocket error: ${e}`,e)}function j(e){f.debug(`[${m}] proxy console websocket closed: ${e}`,e)}function D(){ke.preferredIcuAsset=C(ke.config);let e="invariant"==ke.config.globalizationMode;if(!e)if(ke.preferredIcuAsset)ke.diagnosticTracing&&b("ICU data archive(s) available, disabling invariant mode");else{if("custom"===ke.config.globalizationMode||"all"===ke.config.globalizationMode||"sharded"===ke.config.globalizationMode){const e="invariant globalization mode is inactive and no ICU data archives are available";throw _(`ERROR: ${e}`),new Error(e)}ke.diagnosticTracing&&b("ICU data archive(s) not available, using invariant globalization mode"),e=!0,ke.preferredIcuAsset=null}const o="DOTNET_SYSTEM_GLOBALIZATION_INVARIANT",t=ke.config.environmentVariables;if(void 0===t[o]&&e&&(t[o]="1"),void 0===t.TZ)try{const e=Intl.DateTimeFormat().resolvedOptions().timeZone||null;e&&(t.TZ=e)}catch(e){w("failed to detect timezone, will fallback to UTC")}}function C(e){var o;if((null===(o=e.resources)||void 0===o?void 0:o.icu)&&"invariant"!=e.globalizationMode){const o=e.applicationCulture||(Me?globalThis.navigator&&globalThis.navigator.languages&&globalThis.navigator.languages[0]:Intl.DateTimeFormat().resolvedOptions().locale);e.applicationCulture||(e.applicationCulture=o);const t=e.resources.icu;let n=null;if("custom"===e.globalizationMode){if(t.length>=1)return t[0].name}else o&&"all"!==e.globalizationMode?"sharded"===e.globalizationMode&&(n=function(e){const o=e.split("-")[0];return"en"===o||["fr","fr-FR","it","it-IT","de","de-DE","es","es-ES"].includes(e)?"icudt_EFIGS.dat":["zh","ko","ja"].includes(o)?"icudt_CJK.dat":"icudt_no_CJK.dat"}(o)):n="icudt.dat";if(n)for(let e=0;e<t.length;e++){const o=t[e];if(o.virtualPath===n)return o.name}}return e.globalizationMode="invariant",null}(new Date).valueOf();const M=class{constructor(e){this.url=e}toString(){return this.url}};async function S(e){if(Se&&"function"!=typeof globalThis.atob){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";globalThis.atob=o=>{const t=String(o).replace(/=+$/,"");let n="";for(let o=0,r=0,s=0;s<t.length;s++){const i=e.indexOf(t.charAt(s));-1!==i&&(r=o%4?64*r+i:i,o++%4&&(n+=String.fromCharCode(255&r>>(-2*o&6))))}return n}}if(Ee){const e=await import(/*! webpackIgnore: true */"process"),o=14;if(e.versions.node.split(".")[0]<o)throw new Error(`NodeJS at '${e.execPath}' has too low version '${e.versions.node}', please use at least ${o}.`)}const o=/*! webpackIgnore: true */import.meta.url,t=o.indexOf("?");var n;if(t>0&&(ke.modulesUniqueQuery=o.substring(t)),ke.scriptUrl=o.replace(/\\/g,"/").replace(/[?#].*/,""),ke.scriptDirectory=(n=ke.scriptUrl).slice(0,n.lastIndexOf("/"))+"/",ke.locateFile=e=>"URL"in globalThis&&globalThis.URL!==M?new URL(e,ke.scriptDirectory).toString():I(e)?e:ke.scriptDirectory+e,ke.fetch_like=U,ke.out=console.log,ke.err=console.error,ke.onDownloadResourceProgress=e.onDownloadResourceProgress,Me&&globalThis.navigator){const e=globalThis.navigator,o=e.userAgentData&&e.userAgentData.brands;o&&o.length>0?ke.isChromium=o.some(e=>"Google Chrome"===e.brand||"Microsoft Edge"===e.brand||"Chromium"===e.brand):e.userAgent&&(ke.isChromium=e.userAgent.includes("Chrome"),ke.isFirefox=e.userAgent.includes("Firefox"))}void 0===globalThis.URL&&(globalThis.URL=M)}async function U(e,o){try{const t="function"==typeof globalThis.fetch;if(Ee){const n=e.startsWith("file://");if(!n&&t)return globalThis.fetch(e,o||{credentials:"same-origin"});g||(p=await import(/*! webpackIgnore: true */"url"),g=await import(/*! webpackIgnore: true */"fs")),n&&(e=p.fileURLToPath(e));const r=await g.promises.readFile(e);return{ok:!0,headers:{length:0,get:()=>null},url:e,arrayBuffer:()=>r,json:()=>JSON.parse(r),text:()=>{throw new Error("NotImplementedException")}}}if(t)return globalThis.fetch(e,o||{credentials:"same-origin"});if("function"==typeof read)return{ok:!0,url:e,headers:{length:0,get:()=>null},arrayBuffer:()=>new Uint8Array(read(e,"binary")),json:()=>JSON.parse(read(e,"utf8")),text:()=>read(e,"utf8")}}catch(o){return{ok:!1,url:e,status:500,headers:{length:0,get:()=>null},statusText:"ERR28: "+o,arrayBuffer:()=>{throw o},json:()=>{throw o},text:()=>{throw o}}}throw new Error("No fetch implementation available")}const P=/^[a-zA-Z][a-zA-Z\d+\-.]*?:\/\//,k=/[a-zA-Z]:[\\/]/;function I(e){return Ee||Se?e.startsWith("/")||e.startsWith("\\")||-1!==e.indexOf("///")||k.test(e):P.test(e)}let O,$=0;const L=[],N=[],z=new Map,F={"js-module-runtime":!0,"js-module-dotnet":!0,"js-module-native":!0,"js-module-diagnostics":!0},W={...F,"js-module-library-initializer":!0},V={...F,dotnetwasm:!0,heap:!0,manifest:!0},B={...W,manifest:!0},J={...W,dotnetwasm:!0},H={dotnetwasm:!0,symbols:!0},Q={...W,dotnetwasm:!0,symbols:!0},q={symbols:!0};function G(e){return!("icu"==e.behavior&&e.name!=ke.preferredIcuAsset)}function Z(e,o,t){null!=o||(o=[]),We(1==o.length,`Expect to have one ${t} asset in resources`);const n=o[0];return n.behavior=t,K(n),e.push(n),n}function K(e){V[e.behavior]&&z.set(e.behavior,e)}function X(e){We(V[e],`Unknown single asset behavior ${e}`);const o=z.get(e);if(o&&!o.resolvedUrl)if(o.resolvedUrl=ke.locateFile(o.name),F[o.behavior]){const e=me(o);e?("string"!=typeof e&&We(!1,"loadBootResource response for 'dotnetjs' type should be a URL string"),o.resolvedUrl=e):o.resolvedUrl=le(o.resolvedUrl,o.behavior)}else if("dotnetwasm"!==o.behavior)throw new Error(`Unknown single asset behavior ${e}`);return o}function Y(e){const o=X(e);return We(o,`Single asset for ${e} not found`),o}let ee=!1;async function oe(){if(!ee){ee=!0,ke.diagnosticTracing&&b("mono_download_assets");try{const e=[],o=[],t=(e,o)=>{!Q[e.behavior]&&G(e)&&ke.expected_instantiated_assets_count++,!J[e.behavior]&&G(e)&&(ke.expected_downloaded_assets_count++,o.push(se(e)))};for(const o of L)t(o,e);for(const e of N)t(e,o);ke.allDownloadsQueued.promise_control.resolve(),Promise.all([...e,...o]).then(()=>{ke.allDownloadsFinished.promise_control.resolve()}).catch(e=>{throw ke.err("Error in mono_download_assets: "+e),Xe(1,e),e}),await ke.runtimeModuleLoaded.promise;const n=async e=>{const o=await e;if(H[o.behavior])return"symbols"===o.behavior&&(await Pe.instantiate_symbols_asset(o),ge(o)),void++ke.actual_downloaded_assets_count;if(o.buffer){if(!Q[o.behavior]){o.buffer&&"object"==typeof o.buffer||We(!1,"asset buffer must be array-like or buffer-like or promise of these"),"string"!=typeof o.resolvedUrl&&We(!1,"resolvedUrl must be string");const e=o.resolvedUrl,t=await o.buffer,n=new Uint8Array(t);ge(o),await Pe.beforeOnRuntimeInitialized.promise,await Pe.afterInstantiateWasm.promise,Pe.instantiate_asset(o,e,n)}}else o.isOptional||We(!1,"Expected asset to have the downloaded buffer"),!J[o.behavior]&&G(o)&&ke.expected_downloaded_assets_count--,!Q[o.behavior]&&G(o)&&ke.expected_instantiated_assets_count--},r=[],s=[];for(const o of e)r.push(n(o));for(const e of o)s.push(n(e));Promise.all(r).then(()=>{Ce||Pe.coreAssetsInMemory.promise_control.resolve()}).catch(e=>{throw ke.err("Error in mono_download_assets: "+e),Xe(1,e),e}),Promise.all(s).then(async()=>{Ce||(await Pe.coreAssetsInMemory.promise,Pe.allAssetsInMemory.promise_control.resolve())}).catch(e=>{throw ke.err("Error in mono_download_assets: "+e),Xe(1,e),e})}catch(e){throw ke.err("Error in mono_download_assets: "+e),e}}}let te=!1;function ne(){if(te)return;te=!0;const e=ke.config,o=[];if(e.assets)for(const o of e.assets)"object"!=typeof o&&We(!1,`asset must be object, it was ${typeof o} : ${o}`),"string"!=typeof o.behavior&&We(!1,"asset behavior must be known string"),"string"!=typeof o.name&&We(!1,"asset name must be string"),o.resolvedUrl&&"string"!=typeof o.resolvedUrl&&We(!1,"asset resolvedUrl could be string"),o.hash&&"string"!=typeof o.hash&&We(!1,"asset resolvedUrl could be string"),o.pendingDownload&&"object"!=typeof o.pendingDownload&&We(!1,"asset pendingDownload could be object"),o.isCore?L.push(o):N.push(o),K(o);else if(e.resources){const t=e.resources;t.wasmNative||We(!1,"resources.wasmNative must be defined"),t.jsModuleNative||We(!1,"resources.jsModuleNative must be defined"),t.jsModuleRuntime||We(!1,"resources.jsModuleRuntime must be defined"),Z(N,t.wasmNative,"dotnetwasm"),Z(o,t.jsModuleNative,"js-module-native"),Z(o,t.jsModuleRuntime,"js-module-runtime"),t.jsModuleDiagnostics&&Z(o,t.jsModuleDiagnostics,"js-module-diagnostics");const n=(e,o,t)=>{const n=e;n.behavior=o,t?(n.isCore=!0,L.push(n)):N.push(n)};if(t.coreAssembly)for(let e=0;e<t.coreAssembly.length;e++)n(t.coreAssembly[e],"assembly",!0);if(t.assembly)for(let e=0;e<t.assembly.length;e++)n(t.assembly[e],"assembly",!t.coreAssembly);if(0!=e.debugLevel&&ke.isDebuggingSupported()){if(t.corePdb)for(let e=0;e<t.corePdb.length;e++)n(t.corePdb[e],"pdb",!0);if(t.pdb)for(let e=0;e<t.pdb.length;e++)n(t.pdb[e],"pdb",!t.corePdb)}if(e.loadAllSatelliteResources&&t.satelliteResources)for(const e in t.satelliteResources)for(let o=0;o<t.satelliteResources[e].length;o++){const r=t.satelliteResources[e][o];r.culture=e,n(r,"resource",!t.coreAssembly)}if(t.coreVfs)for(let e=0;e<t.coreVfs.length;e++)n(t.coreVfs[e],"vfs",!0);if(t.vfs)for(let e=0;e<t.vfs.length;e++)n(t.vfs[e],"vfs",!t.coreVfs);const r=C(e);if(r&&t.icu)for(let e=0;e<t.icu.length;e++){const o=t.icu[e];o.name===r&&n(o,"icu",!1)}if(t.wasmSymbols)for(let e=0;e<t.wasmSymbols.length;e++)n(t.wasmSymbols[e],"symbols",!1)}if(e.appsettings)for(let o=0;o<e.appsettings.length;o++){const t=e.appsettings[o],n=pe(t);"appsettings.json"!==n&&n!==`appsettings.${e.applicationEnvironment}.json`||N.push({name:t,behavior:"vfs",cache:"no-cache",useCredentials:!0})}e.assets=[...L,...N,...o]}async function re(e){const o=await se(e);return await o.pendingDownloadInternal.response,o.buffer}async function se(e){try{return await ie(e)}catch(o){if(!ke.enableDownloadRetry)throw o;if(Se||Ee)throw o;if(e.pendingDownload&&e.pendingDownloadInternal==e.pendingDownload)throw o;if(e.resolvedUrl&&-1!=e.resolvedUrl.indexOf("file://"))throw o;if(o&&404==o.status)throw o;e.pendingDownloadInternal=void 0,await ke.allDownloadsQueued.promise;try{return ke.diagnosticTracing&&b(`Retrying download '${e.name}'`),await ie(e)}catch(o){return e.pendingDownloadInternal=void 0,await new Promise(e=>globalThis.setTimeout(e,100)),ke.diagnosticTracing&&b(`Retrying download (2) '${e.name}' after delay`),await ie(e)}}}async function ie(e){for(;O;)await O.promise;try{++$,$==ke.maxParallelDownloads&&(ke.diagnosticTracing&&b("Throttling further parallel downloads"),O=r());const o=await async function(e){if(e.pendingDownload&&(e.pendingDownloadInternal=e.pendingDownload),e.pendingDownloadInternal&&e.pendingDownloadInternal.response)return e.pendingDownloadInternal.response;if(e.buffer){const o=await e.buffer;return e.resolvedUrl||(e.resolvedUrl="undefined://"+e.name),e.pendingDownloadInternal={url:e.resolvedUrl,name:e.name,response:Promise.resolve({ok:!0,arrayBuffer:()=>o,json:()=>JSON.parse(new TextDecoder("utf-8").decode(o)),text:()=>new TextDecoder("utf-8").decode(o),headers:{get:()=>{}}})},e.pendingDownloadInternal.response}const o=e.loadRemote&&ke.config.remoteSources?ke.config.remoteSources:[""];let t;for(let n of o){n=n.trim(),"./"===n&&(n="");const o=ae(e,n);e.name===o?ke.diagnosticTracing&&b(`Attempting to download '${o}'`):ke.diagnosticTracing&&b(`Attempting to download '${o}' for ${e.name}`);try{e.resolvedUrl=o;const n=ue(e);if(e.pendingDownloadInternal=n,t=await n.response,!t||!t.ok)continue;return t}catch(e){t||(t={ok:!1,url:o,status:0,statusText:""+e});continue}}const n=e.isOptional||e.name.match(/\.pdb$/)&&ke.config.ignorePdbLoadErrors;if(t||We(!1,`Response undefined ${e.name}`),!n){const o=new Error(`download '${t.url}' for ${e.name} failed ${t.status} ${t.statusText}`);throw o.status=t.status,o}w(`optional download '${t.url}' for ${e.name} failed ${t.status} ${t.statusText}`)}(e);return o?(H[e.behavior]||(e.buffer=await o.arrayBuffer(),++ke.actual_downloaded_assets_count),e):e}finally{if(--$,O&&$==ke.maxParallelDownloads-1){ke.diagnosticTracing&&b("Resuming more parallel downloads");const e=O;O=void 0,e.promise_control.resolve()}}}function ae(e,o){let t;return null==o&&We(!1,`sourcePrefix must be provided for ${e.name}`),e.resolvedUrl?t=e.resolvedUrl:(t=""===o?"assembly"===e.behavior||"pdb"===e.behavior?e.name:"resource"===e.behavior&&e.culture&&""!==e.culture?`${e.culture}/${e.name}`:e.name:o+e.name,t=le(ke.locateFile(t),e.behavior)),t&&"string"==typeof t||We(!1,"attemptUrl need to be path or url string"),t}function le(e,o){return ke.modulesUniqueQuery&&B[o]&&(e+=ke.modulesUniqueQuery),e}let ce=0;const de=new Set;function ue(e){try{e.resolvedUrl||We(!1,"Request's resolvedUrl must be set");const o=function(e){let o=e.resolvedUrl;if(ke.loadBootResource){const t=me(e);if(t instanceof Promise)return t;"string"==typeof t&&(o=t)}const t={};return e.cache?t.cache=e.cache:ke.config.disableNoCacheFetch||(t.cache="no-cache"),e.useCredentials?t.credentials="include":!ke.config.disableIntegrityCheck&&e.hash&&(t.integrity=e.hash),ke.fetch_like(o,t)}(e),t={name:e.name,url:e.resolvedUrl,response:o};return de.add(e.name),t.response.then(()=>{"assembly"==e.behavior&&ke.loadedAssemblies.push(e.name),ce++,ke.onDownloadResourceProgress&&ke.onDownloadResourceProgress(ce,de.size)}),t}catch(o){const t={ok:!1,url:e.resolvedUrl,status:500,statusText:"ERR29: "+o,arrayBuffer:()=>{throw o},json:()=>{throw o}};return{name:e.name,url:e.resolvedUrl,response:Promise.resolve(t)}}}const fe={resource:"assembly",assembly:"assembly",pdb:"pdb",icu:"globalization",vfs:"configuration",manifest:"manifest",dotnetwasm:"dotnetwasm","js-module-dotnet":"dotnetjs","js-module-native":"dotnetjs","js-module-runtime":"dotnetjs"};function me(e){var o;if(ke.loadBootResource){const t=null!==(o=e.hash)&&void 0!==o?o:"",n=e.resolvedUrl,r=fe[e.behavior];if(r){const o=ke.loadBootResource(r,e.name,n,t,e.behavior);return"string"==typeof o?function(e){return"string"!=typeof e&&We(!1,"url must be a string"),!I(e)&&0!==e.indexOf("./")&&0!==e.indexOf("../")&&globalThis.URL&&globalThis.document&&globalThis.document.baseURI&&(e=new URL(e,globalThis.document.baseURI).toString()),e}(o):o}}}function ge(e){e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null}function pe(e){let o=e.lastIndexOf("/");return o>=0&&o++,e.substring(o)}async function he(e){e&&await Promise.all((null!=e?e:[]).map(e=>async function(e){try{const o=e.name;if(!e.moduleExports){const t=le(ke.locateFile(o),"js-module-library-initializer");ke.diagnosticTracing&&b(`Attempting to import '${t}' for ${e}`),e.moduleExports=await import(/*! webpackIgnore: true */t)}ke.libraryInitializers.push({scriptName:o,exports:e.moduleExports})}catch(o){v(`Failed to import library initializer '${e}': ${o}`)}}(e)))}async function be(e,o){if(!ke.libraryInitializers)return;const t=[];for(let n=0;n<ke.libraryInitializers.length;n++){const r=ke.libraryInitializers[n];r.exports[e]&&t.push(we(r.scriptName,e,()=>r.exports[e](...o)))}await Promise.all(t)}async function we(e,o,t){try{await t()}catch(t){throw v(`Failed to invoke '${o}' on library initializer '${e}': ${t}`),Xe(1,t),t}}function ye(e,o){if(e===o)return e;const t={...o};return void 0!==t.assets&&t.assets!==e.assets&&(t.assets=[...e.assets||[],...t.assets||[]]),void 0!==t.resources&&(t.resources=_e(e.resources||{assembly:[],jsModuleNative:[],jsModuleRuntime:[],wasmNative:[]},t.resources)),void 0!==t.environmentVariables&&(t.environmentVariables={...e.environmentVariables||{},...t.environmentVariables||{}}),void 0!==t.runtimeOptions&&t.runtimeOptions!==e.runtimeOptions&&(t.runtimeOptions=[...e.runtimeOptions||[],...t.runtimeOptions||[]]),Object.assign(e,t)}function ve(e,o){if(e===o)return e;const t={...o};return t.config&&(e.config||(e.config={}),t.config=ye(e.config,t.config)),Object.assign(e,t)}function _e(e,o){if(e===o)return e;const t={...o};return void 0!==t.coreAssembly&&(t.coreAssembly=[...e.coreAssembly||[],...t.coreAssembly||[]]),void 0!==t.assembly&&(t.assembly=[...e.assembly||[],...t.assembly||[]]),void 0!==t.lazyAssembly&&(t.lazyAssembly=[...e.lazyAssembly||[],...t.lazyAssembly||[]]),void 0!==t.corePdb&&(t.corePdb=[...e.corePdb||[],...t.corePdb||[]]),void 0!==t.pdb&&(t.pdb=[...e.pdb||[],...t.pdb||[]]),void 0!==t.jsModuleNative&&(t.jsModuleNative=[...e.jsModuleNative||[],...t.jsModuleNative||[]]),void 0!==t.jsModuleDiagnostics&&(t.jsModuleDiagnostics=[...e.jsModuleDiagnostics||[],...t.jsModuleDiagnostics||[]]),void 0!==t.jsModuleRuntime&&(t.jsModuleRuntime=[...e.jsModuleRuntime||[],...t.jsModuleRuntime||[]]),void 0!==t.wasmSymbols&&(t.wasmSymbols=[...e.wasmSymbols||[],...t.wasmSymbols||[]]),void 0!==t.wasmNative&&(t.wasmNative=[...e.wasmNative||[],...t.wasmNative||[]]),void 0!==t.icu&&(t.icu=[...e.icu||[],...t.icu||[]]),void 0!==t.satelliteResources&&(t.satelliteResources=function(e,o){if(e===o)return e;for(const t in o)e[t]=[...e[t]||[],...o[t]||[]];return e}(e.satelliteResources||{},t.satelliteResources||{})),void 0!==t.modulesAfterConfigLoaded&&(t.modulesAfterConfigLoaded=[...e.modulesAfterConfigLoaded||[],...t.modulesAfterConfigLoaded||[]]),void 0!==t.modulesAfterRuntimeReady&&(t.modulesAfterRuntimeReady=[...e.modulesAfterRuntimeReady||[],...t.modulesAfterRuntimeReady||[]]),void 0!==t.extensions&&(t.extensions={...e.extensions||{},...t.extensions||{}}),void 0!==t.vfs&&(t.vfs=[...e.vfs||[],...t.vfs||[]]),Object.assign(e,t)}function Ae(){const e=ke.config;if(e.environmentVariables=e.environmentVariables||{},e.runtimeOptions=e.runtimeOptions||[],e.resources=e.resources||{assembly:[],jsModuleNative:[],jsModuleRuntime:[],wasmNative:[],vfs:[],satelliteResources:{}},e.assets){ke.diagnosticTracing&&b("config.assets is deprecated, use config.resources instead");for(const o of e.assets){const t={};switch(o.behavior){case"assembly":t.assembly=[o];break;case"pdb":t.pdb=[o];break;case"resource":t.satelliteResources={},t.satelliteResources[o.culture]=[o];break;case"icu":t.icu=[o];break;case"symbols":t.wasmSymbols=[o];break;case"vfs":t.vfs=[o];break;case"dotnetwasm":t.wasmNative=[o];break;case"js-module-runtime":t.jsModuleRuntime=[o];break;case"js-module-native":t.jsModuleNative=[o];break;case"js-module-diagnostics":t.jsModuleDiagnostics=[o];break;case"js-module-dotnet":break;default:throw new Error(`Unexpected behavior ${o.behavior} of asset ${o.name}`)}_e(e.resources,t)}}e.debugLevel,void 0===e.virtualWorkingDirectory&&(e.virtualWorkingDirectory=Ue),e.applicationEnvironment||(e.applicationEnvironment="Production"),e.applicationCulture&&(e.environmentVariables.LANG=`${e.applicationCulture}.UTF-8`),Pe.diagnosticTracing=ke.diagnosticTracing=!!e.diagnosticTracing,Pe.waitForDebugger=e.waitForDebugger,ke.maxParallelDownloads=e.maxParallelDownloads||ke.maxParallelDownloads,ke.enableDownloadRetry=void 0!==e.enableDownloadRetry?e.enableDownloadRetry:ke.enableDownloadRetry}let xe=!1;async function Te(e){var o;if(xe)await ke.afterConfigLoaded.promise;else try{if(xe=!0,Ae(),await he(null===(o=ke.config.resources)||void 0===o?void 0:o.modulesAfterConfigLoaded),await be("onRuntimeConfigLoaded",[ke.config]),e.onConfigLoaded)try{await e.onConfigLoaded(ke.config,Oe),Ae()}catch(e){throw _("onConfigLoaded() failed",e),e}Ae(),ke.afterConfigLoaded.promise_control.resolve(ke.config)}catch(o){const t=`Failed to initialize config ${o} ${null==o?void 0:o.stack}`;throw ke.config=e.config=Object.assign(ke.config,{message:t,error:o,isError:!0}),Xe(1,new Error(t)),o}}function Re(){return!!globalThis.navigator&&(ke.isChromium||ke.isFirefox)}"function"==typeof importScripts&&(globalThis.dotnetSidecar=!0);const Ee="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,je="function"==typeof importScripts,De=je&&"undefined"!=typeof dotnetSidecar,Ce=je&&!De,Me="object"==typeof window||je&&!Ee,Se=!Me&&!Ee,Ue="/";let Pe={},ke={},Ie={},Oe={},$e={},Le=!1;const Ne={},ze={config:Ne},Fe={mono:{},binding:{},internal:$e,module:ze,loaderHelpers:ke,runtimeHelpers:Pe,diagnosticHelpers:Ie,api:Oe};function We(e,o){if(e)return;const t="Assert failed: "+("function"==typeof o?o():o),n=new Error(t);_(t,n),Pe.nativeAbort(n)}function Ve(){return void 0!==ke.exitCode}function Be(){return Pe.runtimeReady&&!Ve()}function Je(){Ve()&&We(!1,`.NET runtime already exited with ${ke.exitCode} ${ke.exitReason}. You can use dotnet.runMain() which doesn't exit the runtime.`),Pe.runtimeReady||We(!1,".NET runtime didn't start yet. Please call dotnet.create() first.")}function He(){Me&&(globalThis.addEventListener("unhandledrejection",eo),globalThis.addEventListener("error",oo))}let Qe,qe;function Ge(){Qe=ze.onAbort,qe=ze.onExit,ze.onAbort=Ke,ze.onExit=Ze}function Ze(e){qe&&qe(e),Xe(e,ke.exitReason)}function Ke(e){Qe&&Qe(e||ke.exitReason),Xe(1,e||ke.exitReason)}function Xe(e,o){var t;const n=o&&"object"==typeof o;e=n&&"number"==typeof o.status?o.status:void 0===e?-1:e;const r=n&&"string"==typeof o.message?o.message:""+o;(o=n?o:Pe.ExitStatus?function(e,o){const t=new Pe.ExitStatus(e);return t.message=o,t.toString=()=>o,t}(e,r):new Error("Exit with code "+e+" "+r)).status=e,o.message||(o.message=r);const s=""+(o.stack||(new Error).stack);try{Object.defineProperty(o,"stack",{get:()=>s})}catch(e){}const i=!!o.silent;if(o.silent=!0,Ve())ke.diagnosticTracing&&b("mono_exit called after exit");else{try{ze.onAbort==Ke&&(ze.onAbort=Qe),ze.onExit==Ze&&(ze.onExit=qe),Me&&(globalThis.removeEventListener("unhandledrejection",eo),globalThis.removeEventListener("error",oo)),Pe.runtimeReady?(Pe.jiterpreter_dump_stats&&Pe.jiterpreter_dump_stats(!1),0===e&&(null===(t=ke.config)||void 0===t?void 0:t.interopCleanupOnExit)&&Pe.forceDisposeProxies(!0,!0)):(ke.diagnosticTracing&&b(`abort_startup, reason: ${o}`),function(e){ke.allDownloadsQueued.promise_control.reject(e),ke.allDownloadsFinished.promise_control.reject(e),ke.afterConfigLoaded.promise_control.reject(e),ke.wasmCompilePromise.promise_control.reject(e),ke.runtimeModuleLoaded.promise_control.reject(e),Pe.dotnetReady&&(Pe.dotnetReady.promise_control.reject(e),Pe.afterInstantiateWasm.promise_control.reject(e),Pe.afterPreRun.promise_control.reject(e),Pe.beforeOnRuntimeInitialized.promise_control.reject(e),Pe.afterOnRuntimeInitialized.promise_control.reject(e),Pe.afterPostRun.promise_control.reject(e))}(o))}catch(e){v("mono_exit A failed",e)}try{i||(function(e,o){if(0!==e&&o){const e=Pe.ExitStatus&&o instanceof Pe.ExitStatus?b:_;"string"==typeof o?e(o):(void 0===o.stack&&(o.stack=(new Error).stack+""),o.message?e(Pe.stringify_as_error_with_stack?Pe.stringify_as_error_with_stack(o.message+"\n"+o.stack):o.message+"\n"+o.stack):e(JSON.stringify(o)))}!Ce&&ke.config&&(ke.config.logExitCode?ke.config.forwardConsole?T("WASM EXIT "+e):y("WASM EXIT "+e):ke.config.forwardConsole&&T())}(e,o),function(e){if(Me&&!Ce&&ke.config&&ke.config.appendElementOnExit&&document){const o=document.createElement("label");o.id="tests_done",0!==e&&(o.style.background="red"),o.innerHTML=""+e,document.body.appendChild(o)}}(e))}catch(e){v("mono_exit B failed",e)}ke.exitCode=e,ke.exitReason||(ke.exitReason=o),!Ce&&Pe.runtimeReady&&ze.runtimeKeepalivePop()}if(ke.config&&ke.config.asyncFlushOnExit&&0===e)throw(async()=>{try{await async function(){if(Ee)try{const e=await import(/*! webpackIgnore: true */"process"),o=e=>new Promise((o,t)=>{e.on("error",t),e.end("","utf8",o)}),t=o(e.stderr),n=o(e.stdout);let r;const s=new Promise(e=>{r=setTimeout(()=>e("timeout"),1e3)});await Promise.race([Promise.all([n,t]),s]),clearTimeout(r)}catch(e){_(`flushing std* streams failed: ${e}`)}}()}finally{Ye(e,o)}})(),o;Ye(e,o)}function Ye(e,o){if(Pe.runtimeReady&&Pe.nativeExit)try{Pe.nativeExit(e)}catch(e){!Pe.ExitStatus||e instanceof Pe.ExitStatus||v("set_exit_code_and_quit_now failed: "+e.toString())}if(0!==e||!Me)throw Ee?process.exit(e):Pe.quit&&Pe.quit(e,o),o}function eo(e){to(e,e.reason,"rejection")}function oo(e){to(e,e.error,"error")}function to(e,o,t){e.preventDefault();try{o||(o=new Error("Unhandled "+t)),void 0===o.stack&&(o.stack=(new Error).stack),o.stack=o.stack+"",o.silent||(_("Unhandled error:",o),Xe(1,o))}catch(e){}}!function(n){if(Le)throw new Error("Loader module already loaded");Le=!0,Pe=n.runtimeHelpers,ke=n.loaderHelpers,Ie=n.diagnosticHelpers,Oe=n.api,$e=n.internal,Object.assign(Oe,{INTERNAL:$e,invokeLibraryInitializers:be}),Object.assign(n.module,{config:ye(Ne,{environmentVariables:{}})});const a={mono_wasm_bindings_is_ready:!1,config:n.module.config,diagnosticTracing:!1,nativeAbort:e=>{throw e||new Error("abort")},nativeExit:e=>{throw new Error("exit:"+e)}},l={gitHash:"e2c1e00b3d0f96afb892fb261d5921565b400246",config:n.module.config,diagnosticTracing:!1,maxParallelDownloads:16,enableDownloadRetry:!0,_loaded_files:[],loadedFiles:[],loadedAssemblies:[],libraryInitializers:[],workerNextNumber:1,actual_downloaded_assets_count:0,actual_instantiated_assets_count:0,expected_downloaded_assets_count:0,expected_instantiated_assets_count:0,afterConfigLoaded:r(),allDownloadsQueued:r(),allDownloadsFinished:r(),wasmCompilePromise:r(),runtimeModuleLoaded:r(),loadingWorkers:r(),is_exited:Ve,is_runtime_running:Be,assert_runtime_running:Je,mono_exit:Xe,createPromiseController:r,getPromiseController:s,assertIsControllablePromise:i,mono_download_assets:oe,resolve_single_asset_path:Y,setup_proxy_console:x,set_thread_prefix:h,installUnhandledErrorHandler:He,retrieve_asset_download:re,invokeLibraryInitializers:be,isDebuggingSupported:Re,exceptionsFinal:e,simd:t,relaxedSimd:o};Object.assign(Pe,a),Object.assign(ke,l)}(Fe);let no,ro,so,io=!1,ao=!1;async function lo(e){if(!ao){if(ao=!0,Me&&ke.config.forwardConsole&&void 0!==globalThis.WebSocket&&x("main",globalThis.console,globalThis.location.origin),ze||We(!1,"Null moduleConfig"),ke.config||We(!1,"Null moduleConfig.config"),"function"==typeof e){const o=e(Fe.api);if(o.ready)throw new Error("Module.ready couldn't be redefined.");Object.assign(ze,o),ve(ze,o)}else{if("object"!=typeof e)throw new Error("Can't use moduleFactory callback of createDotnetRuntime function.");ve(ze,e)}await S(ze)}}async function co(e){return await lo(e),ke.config.exitOnUnhandledError&&He(),Ge(),async function(){var e;await Te(ze),ne();const o=uo();(async function(){try{const e=Y("dotnetwasm");await se(e),e&&e.pendingDownloadInternal&&e.pendingDownloadInternal.response||We(!1,"Can't load dotnet.native.wasm");const o=await e.pendingDownloadInternal.response,t=o.headers&&o.headers.get?o.headers.get("Content-Type"):void 0;let n;if("function"==typeof WebAssembly.compileStreaming&&"application/wasm"===t)n=await WebAssembly.compileStreaming(o);else{Me&&"application/wasm"!==t&&v('WebAssembly resource does not have the expected content type "application/wasm", so falling back to slower ArrayBuffer instantiation.');const e=await o.arrayBuffer();ke.diagnosticTracing&&b("instantiate_wasm_module buffered"),n=Se?await Promise.resolve(new WebAssembly.Module(e)):await WebAssembly.compile(e)}e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null,ke.wasmCompilePromise.promise_control.resolve(n)}catch(e){ke.wasmCompilePromise.promise_control.reject(e)}})(),setTimeout(async()=>{try{D(),await oe()}catch(e){Xe(1,e)}},0);const t=await Promise.all(o);return await fo(t),await Pe.dotnetReady.promise,await he(null===(e=ke.config.resources)||void 0===e?void 0:e.modulesAfterRuntimeReady),await be("onRuntimeReady",[Fe.api]),Oe}()}function uo(){const e=Y("js-module-runtime"),o=Y("js-module-native");if(no&&ro)return[no,ro,so];"object"==typeof e.moduleExports?no=e.moduleExports:(ke.diagnosticTracing&&b(`Attempting to import '${e.resolvedUrl}' for ${e.name}`),no=import(/*! webpackIgnore: true */e.resolvedUrl)),"object"==typeof o.moduleExports?ro=o.moduleExports:(ke.diagnosticTracing&&b(`Attempting to import '${o.resolvedUrl}' for ${o.name}`),ro=import(/*! webpackIgnore: true */o.resolvedUrl));const t=X("js-module-diagnostics");return t&&("object"==typeof t.moduleExports?so=t.moduleExports:(ke.diagnosticTracing&&b(`Attempting to import '${t.resolvedUrl}' for ${t.name}`),so=import(/*! webpackIgnore: true */t.resolvedUrl))),[no,ro,so]}async function fo(e){const{initializeExports:o,initializeReplacements:t,configureRuntimeStartup:n,configureEmscriptenStartup:r,configureWorkerStartup:s,setRuntimeGlobals:i,passEmscriptenInternals:a}=e[0],{default:l}=e[1],c=e[2];i(Fe),o(Fe),c&&c.setRuntimeGlobals(Fe),await n(ze),ke.runtimeModuleLoaded.promise_control.resolve(),l(()=>(Object.assign(ze,{__dotnet_runtime:{initializeReplacements:t,configureEmscriptenStartup:r,configureWorkerStartup:s,passEmscriptenInternals:a}}),ze)).catch(e=>{if(e.message&&e.message.toLowerCase().includes("out of memory"))throw new Error(".NET runtime has failed to start, because too much memory was requested. Please decrease the memory by adjusting EmccMaximumHeapSize.");throw e})}Ce&&async function(){(function(){const e=new MessageChannel,o=e.port1,t=e.port2;o.addEventListener("message",e=>{!function(e){const o=JSON.parse(e.config),t=JSON.parse(e.monoThreadInfo);ze.config=o,ze.wasmModule=e.wasmModule,ze.wasmMemory=e.wasmMemory,ze.handlers=e.handlers,io?ke.diagnosticTracing&&b("mono config already received"):(ye(ke.config,o),Pe.monoThreadInfo=t,Ae(),ke.diagnosticTracing&&b("mono config received"),io=!0,ke.afterConfigLoaded.promise_control.resolve(ke.config),Me&&o.forwardConsole&&void 0!==globalThis.WebSocket&&ke.setup_proxy_console("worker-idle",console,globalThis.location.origin))}(e.data),o.close(),t.close()},{once:!0}),o.start(),self.postMessage({[a]:{monoCmd:"preload",port:t}},[t])})(),await ke.afterConfigLoaded.promise,function(){const e=ke.config;e.assets||We(!1,"config.assets must be defined");for(const o of e.assets)K(o),q[o.behavior]&&N.push(o)}();const e=uo(),o=await Promise.all(e);return globalThis.name="em-pthread",await fo(o),ke.config.exitOnUnhandledError&&He(),Ge(),Me&&ke.config.forwardConsole&&void 0!==globalThis.WebSocket&&x("main",globalThis.console,globalThis.location.origin),await S(ze),await oe(),self.dispatchEvent(new MessageEvent("message",{data:{cmd:1,handlers:ze.handlers,wasmMemory:ze.wasmMemory,wasmModule:ze.wasmModule}})),ze}().catch(e=>Xe(1,e));const mo=new class{withModuleConfig(e){try{return ve(ze,e),this}catch(e){throw Xe(1,e),e}}withInterpreterPgo(e,o){try{return ye(Ne,{interpreterPgo:e,interpreterPgoSaveDelay:o}),Ne.runtimeOptions?Ne.runtimeOptions.push("--interp-pgo-recording"):Ne.runtimeOptions=["--interp-pgo-recording"],this}catch(e){throw Xe(1,e),e}}withConfig(e){try{return ye(Ne,e),this}catch(e){throw Xe(1,e),e}}withConfigSrc(e){return this}withVirtualWorkingDirectory(e){try{return e&&"string"==typeof e||We(!1,"must be directory path"),ye(Ne,{virtualWorkingDirectory:e}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariable(e,o){try{const t={};return t[e]=o,ye(Ne,{environmentVariables:t}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariables(e){try{return e&&"object"==typeof e||We(!1,"must be dictionary object"),ye(Ne,{environmentVariables:e}),this}catch(e){throw Xe(1,e),e}}withDiagnosticTracing(e){try{return"boolean"!=typeof e&&We(!1,"must be boolean"),ye(Ne,{diagnosticTracing:e}),this}catch(e){throw Xe(1,e),e}}withDebugging(e){try{return null!=e&&"number"==typeof e||We(!1,"must be number"),ye(Ne,{debugLevel:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArguments(...e){try{return e&&Array.isArray(e)||We(!1,"must be array of strings"),ye(Ne,{applicationArguments:e}),this}catch(e){throw Xe(1,e),e}}withRuntimeOptions(e){try{return e&&Array.isArray(e)||We(!1,"must be array of strings"),Ne.runtimeOptions?Ne.runtimeOptions.push(...e):Ne.runtimeOptions=e,this}catch(e){throw Xe(1,e),e}}withMainAssembly(e){try{return ye(Ne,{mainAssemblyName:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArgumentsFromQuery(){try{if(!globalThis.window)throw new Error("Missing window to the query parameters from");if(void 0===globalThis.URLSearchParams)throw new Error("URLSearchParams is supported");const e=new URLSearchParams(globalThis.window.location.search).getAll("arg");return this.withApplicationArguments(...e)}catch(e){throw Xe(1,e),e}}withApplicationEnvironment(e){try{return ye(Ne,{applicationEnvironment:e}),this}catch(e){throw Xe(1,e),e}}withApplicationCulture(e){try{return ye(Ne,{applicationCulture:e}),this}catch(e){throw Xe(1,e),e}}withResourceLoader(e){try{return ke.loadBootResource=e,this}catch(e){throw Xe(1,e),e}}async download(){try{await async function(){lo(ze),await Te(ze),ne(),D(),oe(),await ke.allDownloadsFinished.promise}()}catch(e){throw Xe(1,e),e}}async create(){try{return this.instance||(this.instance=await async function(){return await co(ze),Fe.api}()),this.instance}catch(e){throw Xe(1,e),e}}run(){return this.runMainAndExit()}async runMainAndExit(){try{return ze.config||We(!1,"Null moduleConfig.config"),this.instance||await this.create(),this.instance.runMainAndExit()}catch(e){throw Xe(1,e),e}}async runMain(){try{return ze.config||We(!1,"Null moduleConfig.config"),this.instance||await this.create(),this.instance.runMain()}catch(e){throw Xe(1,e),e}}},go=Xe,po=co;Se||"function"==typeof globalThis.URL||We(!1,"This browser/engine doesn't support URL API. Please use a modern version."),"function"!=typeof globalThis.BigInt64Array&&We(!1,"This browser/engine doesn't support BigInt64Array API. Please use a modern version. See also https://learn.microsoft.com/aspnet/core/blazor/supported-platforms"),globalThis.performance&&"function"==typeof globalThis.performance.now||We(!1,"This browser/engine doesn't support performance.now. Please use a modern version."),Se||globalThis.crypto&&"object"==typeof globalThis.crypto.subtle||We(!1,"This engine doesn't support crypto.subtle. Please use a modern version."),Se||globalThis.crypto&&"function"==typeof globalThis.crypto.getRandomValues||We(!1,"This engine doesn't support crypto.getRandomValues. Please use a modern version."),Ee&&"function"!=typeof process.exit&&We(!1,"This engine doesn't support process.exit. Please use a modern version."),mo.withConfig(/*json-start*/{
  "mainAssemblyName": "VladislavAntonyuk",
  "resources": {
    "hash": "sha256-YChKbxXNpO5Xn1o+HtsFLI/1qQThBiA5MC+wzQVRylw=",
    "jsModuleNative": [
      {
        "name": "dotnet.native.j4essksm1v.js"
      }
    ],
    "jsModuleRuntime": [
      {
        "name": "dotnet.runtime.u7u1yxqnoc.js"
      }
    ],
    "wasmNative": [
      {
        "name": "dotnet.native.5tuvvxitcf.wasm",
        "hash": "sha256-R09buz2DJ6PpptklCwnYwu7LtCKhdjbYi+aoh3HZmCk=",
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
        "virtualPath": "System.Private.CoreLib.wasm",
        "name": "System.Private.CoreLib.je2iqy740j.wasm",
        "hash": "sha256-q26/oBsRRmETJ/YYZ3z7iNeXArrGybABVxadNKfAmMI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.JavaScript.wasm",
        "name": "System.Runtime.InteropServices.JavaScript.filmu8kzst.wasm",
        "hash": "sha256-ZxQ2nBhJahZIWrgYmWhzhiRbQyk6vR8TaiH9zxmGKK8=",
        "cache": "force-cache"
      }
    ],
    "assembly": [
      {
        "virtualPath": "GiscusBlazor.wasm",
        "name": "GiscusBlazor.pcuv0mq90t.wasm",
        "hash": "sha256-l1wTMTENyM79ld4SDLq1FMaVInry9paOdQP7C16wl1E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Markdig.wasm",
        "name": "Markdig.nxd4nvabev.wasm",
        "hash": "sha256-dS2IYpLaOTWAOgniT9b/2CrloiS6EB7XTAeQQbKdZ5U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Authorization.wasm",
        "name": "Microsoft.AspNetCore.Authorization.1s0zlijjbt.wasm",
        "hash": "sha256-sZsOCcO5uxpAFfShL98Kz7zq+vIGN/anMMXtae6XS8k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Forms.wasm",
        "name": "Microsoft.AspNetCore.Components.Forms.frurgradkk.wasm",
        "hash": "sha256-he++wAmk5mG4lNjF5icopo//rnOMjNUr3V1aaRT3v4g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Web.wasm",
        "name": "Microsoft.AspNetCore.Components.Web.vlkdo0xmuq.wasm",
        "hash": "sha256-ba5ezsxpfMvCv23LRLXqFdkb+cKGw+GXj5oFwE+MbIM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.WebAssembly.wasm",
        "name": "Microsoft.AspNetCore.Components.WebAssembly.lgsumg381b.wasm",
        "hash": "sha256-lTHQiYGruS99S6s9frqyaxRY+GalyRO/i+WoGVDzzs0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.wasm",
        "name": "Microsoft.AspNetCore.Components.fnu8mj9qsn.wasm",
        "hash": "sha256-1aCpwHYyYtnXW2jaeLmwgTcA7TZZsO8cO3i5ATG74VE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Metadata.wasm",
        "name": "Microsoft.AspNetCore.Metadata.f2y1c47nbg.wasm",
        "hash": "sha256-SVFU/JaykGnFdQ6V0QJqVjiuriqWaHpZ2WtEdpB+wIU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.CSharp.wasm",
        "name": "Microsoft.CSharp.e0qo7pq431.wasm",
        "hash": "sha256-rqQ2JaETUegTZtdqhcVJuh7pbMTG59ldQST2vmASZ9Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Caching.Abstractions.wasm",
        "name": "Microsoft.Extensions.Caching.Abstractions.ji92f2ue2r.wasm",
        "hash": "sha256-q7PwnZrsORljKbf7o3Cma/JpB3jbzqTAo96sJJzsWqg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Abstractions.wasm",
        "name": "Microsoft.Extensions.Configuration.Abstractions.jr2rndi3l2.wasm",
        "hash": "sha256-QQ7eTNeEi3GAFe8eR4I4unS2IaCGPqH2cVBQSKG0L04=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Binder.wasm",
        "name": "Microsoft.Extensions.Configuration.Binder.o7zikme31w.wasm",
        "hash": "sha256-PDEppNYA2T/wUYcXH//TWrl4F1vmONNcLbmpAp6mTgw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.EnvironmentVariables.wasm",
        "name": "Microsoft.Extensions.Configuration.EnvironmentVariables.81p1gld0yj.wasm",
        "hash": "sha256-/IgcKSegDLdpscjjBOYHA7qGzQKxWJYdHN+xJltK/Gs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.FileExtensions.wasm",
        "name": "Microsoft.Extensions.Configuration.FileExtensions.ertgfpps4p.wasm",
        "hash": "sha256-qv3FbL0VKG8XqIzOdTHEdSU7UwT3nK7MowzIDoaoniI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Json.wasm",
        "name": "Microsoft.Extensions.Configuration.Json.9tralt5y4o.wasm",
        "hash": "sha256-s7vliIB7VHTWTL9rTrZ6np+UITlIz906JZyuHUiR+dI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.wasm",
        "name": "Microsoft.Extensions.Configuration.jpah6kjowj.wasm",
        "hash": "sha256-dxbbOwuMK8h/B/J+GpKnt7PfAjUfeLve2MDHoG9IMIg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.Abstractions.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.Abstractions.2pkt53d3zg.wasm",
        "hash": "sha256-Bq8GJGmEfQsST6fHarWzhoIte2a0mpIRTVaR12n8T9c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.8nrtvux4zz.wasm",
        "hash": "sha256-zAcIoedFEBXm31mGrnQJOH8HecJ7xRI3+a3C9xU7Hro=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Diagnostics.Abstractions.wasm",
        "name": "Microsoft.Extensions.Diagnostics.Abstractions.xkjbjlcndq.wasm",
        "hash": "sha256-4R7w08qi1w45nXleCjTS8iMb8aifrdF1K0YozDnAyrY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Diagnostics.wasm",
        "name": "Microsoft.Extensions.Diagnostics.ixmwysmqet.wasm",
        "hash": "sha256-6pE3ulnkg+/RiKe4aAmel+siQsP9HiO24QXTKho1mIU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.FileProviders.Abstractions.wasm",
        "name": "Microsoft.Extensions.FileProviders.Abstractions.js7xg1qaa3.wasm",
        "hash": "sha256-s3n4ARw/zBk1jKMNOFh7UxZGb3AsqLs+TOOrG/8PXm4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.FileProviders.Physical.wasm",
        "name": "Microsoft.Extensions.FileProviders.Physical.cjr067e0v9.wasm",
        "hash": "sha256-aK2qkwii+CQRFgz9dohIArf/RKBml7QuuPH9XYplYW4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.FileSystemGlobbing.wasm",
        "name": "Microsoft.Extensions.FileSystemGlobbing.ret9i7c178.wasm",
        "hash": "sha256-3TQXNa4DmfrUVIOAN23IC5zSrIK11UarKqguRzkIPCM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Hosting.Abstractions.wasm",
        "name": "Microsoft.Extensions.Hosting.Abstractions.wcjo6wo4we.wasm",
        "hash": "sha256-AMK1H7TkjtDsS+0XSSyBuXNV3WNNv/QWI+McocFENAI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Localization.Abstractions.wasm",
        "name": "Microsoft.Extensions.Localization.Abstractions.4b6nbsrv3k.wasm",
        "hash": "sha256-sMqH24BDBWsGI6eYfwtElCeNOahgfOXNm9/+t3CtSuY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Localization.wasm",
        "name": "Microsoft.Extensions.Localization.encwtjc3mu.wasm",
        "hash": "sha256-CvF1oB4KajAMDT6w3eb+WD2UzweG0XvzW/HahCfLjTw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.Abstractions.wasm",
        "name": "Microsoft.Extensions.Logging.Abstractions.3baor7lyek.wasm",
        "hash": "sha256-L5GOJx0/pHBRIgD/p0K019Fc1ZuqGXlM9/7uLxv6ILA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.wasm",
        "name": "Microsoft.Extensions.Logging.bej5obyinr.wasm",
        "hash": "sha256-jUrMP3vls5GbVpq+GVqw7YXCvgb92F58FDK1to4sWnQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Options.ConfigurationExtensions.wasm",
        "name": "Microsoft.Extensions.Options.ConfigurationExtensions.npdf2mew2x.wasm",
        "hash": "sha256-1dIG0hXzZZ6+VXI0dQgU91WylwRrrCFBQtRXAGUVVIE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Options.wasm",
        "name": "Microsoft.Extensions.Options.lle9bjpr7x.wasm",
        "hash": "sha256-1+YQApNeRAfUdok5pPpxfcFmtLmXw2KNYqPbPi4E2Z4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Primitives.wasm",
        "name": "Microsoft.Extensions.Primitives.qkg5z54yxk.wasm",
        "hash": "sha256-1iXUKVxGzSXG+fn15eAGT+HwPAk56KxBcznvZ8x/sIY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Validation.wasm",
        "name": "Microsoft.Extensions.Validation.aen3kvkd3s.wasm",
        "hash": "sha256-znYpz0bhZzrN4JCiqtsXSYGAEXR/aQfQo7Vy3LFk7tE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.JSInterop.WebAssembly.wasm",
        "name": "Microsoft.JSInterop.WebAssembly.nspfts9ll4.wasm",
        "hash": "sha256-qdJLQQMF51yCG9ogc2saHYHtUNaU78uUlRN1rx+hsNs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.JSInterop.wasm",
        "name": "Microsoft.JSInterop.nttqb51axg.wasm",
        "hash": "sha256-e8hAgf33xr5ooTFf2OEaw46Iw7hlpel5Xx/VtHYCncE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.VisualBasic.Core.wasm",
        "name": "Microsoft.VisualBasic.Core.9hp7heuzvd.wasm",
        "hash": "sha256-vcUXV6JrhYxptkhl7EcH4SyLyuK96vw1epgTbtTdPww=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.VisualBasic.wasm",
        "name": "Microsoft.VisualBasic.3153rv77ud.wasm",
        "hash": "sha256-ybxwZrDDWwj4UymqAppeNrWEPP4H+byRhW1PDyMXop0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Win32.Primitives.wasm",
        "name": "Microsoft.Win32.Primitives.7l2w0jy3gh.wasm",
        "hash": "sha256-5R4Qr47+vUaDbUuGhaTe8WkG0YASwLxmT5duS1Ua+iU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Win32.Registry.wasm",
        "name": "Microsoft.Win32.Registry.8k03oo4pvj.wasm",
        "hash": "sha256-aOIri4L7lK3G3Z67snRr5LQDSHq2qaTCAZXhYeM7ZTI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "MudBlazor.Markdown.wasm",
        "name": "MudBlazor.Markdown.61onxa7w9a.wasm",
        "hash": "sha256-lo30Ae7PQ62UVMHxe8koYTh6ew12qEt9io8QmmznZ7Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "MudBlazor.wasm",
        "name": "MudBlazor.d6zit4s54v.wasm",
        "hash": "sha256-lU8M10pmVzYzqxKT0rLyYN4SVxJlh6zzjbahtnentF8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Shared.wasm",
        "name": "Shared.qne5xscrzw.wasm",
        "hash": "sha256-dgokOvI3CZs82GHgjSilGW7ksVPwrm6O/3V6Eix7dwY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.AppContext.wasm",
        "name": "System.AppContext.w0q6o3xz0p.wasm",
        "hash": "sha256-wGIcsM0d3um7FU+HueKFoMIO0tmAQtaVlYc+jzD5C94=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Buffers.wasm",
        "name": "System.Buffers.kisxcel5aj.wasm",
        "hash": "sha256-ZN31aT91bEbOPqI+exdkI/WBC/xb3TE8OgraSp85rfI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Concurrent.wasm",
        "name": "System.Collections.Concurrent.0fm2dujsxz.wasm",
        "hash": "sha256-/HJoU+E90rVRr24iylJD1xFsvm0WIoqc2jSYBiBkpDw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Immutable.wasm",
        "name": "System.Collections.Immutable.i38mtk9wpz.wasm",
        "hash": "sha256-fm+gGE6KUb88UFgJldNYo0czFF8mvIsJRWxTf159oPI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.NonGeneric.wasm",
        "name": "System.Collections.NonGeneric.hh51n9wlll.wasm",
        "hash": "sha256-BU2kR4OKejFJ8RR7wHRcqsAAFueiRyAt6fxlTR08sVw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Specialized.wasm",
        "name": "System.Collections.Specialized.zjw1cf3gk9.wasm",
        "hash": "sha256-8UzSts9Wr77/+25jklEAaWL+okg2wbInBdaZzAnHiNw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.wasm",
        "name": "System.Collections.jfnn2w5kyl.wasm",
        "hash": "sha256-X+gW9nT5M5VxzSjcPvwo98P5CPYtEvek/3vxbMK4zeQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Annotations.wasm",
        "name": "System.ComponentModel.Annotations.sqwmiddbni.wasm",
        "hash": "sha256-RIXn7qYxTdU1gmHxl12+SEQwmOLGLjA7HX1AvlZ2xco=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.DataAnnotations.wasm",
        "name": "System.ComponentModel.DataAnnotations.kde5mvd7o9.wasm",
        "hash": "sha256-+OWaI8QOYjOuvrUbYQTiRajm8SEKYUNu2MY1tpm55/g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.EventBasedAsync.wasm",
        "name": "System.ComponentModel.EventBasedAsync.matliiwap8.wasm",
        "hash": "sha256-juGVYo0DPVF5MgEeKC+ATabkMqq23g7XDkLNpdlqFpw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Primitives.wasm",
        "name": "System.ComponentModel.Primitives.p7dqt4az7y.wasm",
        "hash": "sha256-ZfKsqUioyM0i4GrbcS9hpzFRCpxSabz7iauTQ484RUQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.TypeConverter.wasm",
        "name": "System.ComponentModel.TypeConverter.l2w3ujaycm.wasm",
        "hash": "sha256-4xAj0CfPaQ+ySaW9fnFC63pReAO4pDKEq/XVHZcZBro=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.wasm",
        "name": "System.ComponentModel.lyf3vi548v.wasm",
        "hash": "sha256-czWrQdROLrPMOvy1ng7V/rwX82lc56F1pgG08zoP37A=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Configuration.wasm",
        "name": "System.Configuration.oxcmk91qen.wasm",
        "hash": "sha256-/NIbFnkprFUDRLZFgJh3Y1Ar1c3f5o2cKFzHs1Il/2I=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Console.wasm",
        "name": "System.Console.4bqcuf4zvd.wasm",
        "hash": "sha256-MIo7Ru99hiBlhn4YIrKv7MVK2BspLdTx371G+AQMrxY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Core.wasm",
        "name": "System.Core.vsc2owax53.wasm",
        "hash": "sha256-sdrEetomojq50Zf5jEDLrzJ6IinZdA0qQs9cAL5vpgY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Data.Common.wasm",
        "name": "System.Data.Common.cdvytj5kih.wasm",
        "hash": "sha256-sHN3qI9ez7GSXpicT5kjOtJnAztiWqUbCDLe5dO9ViY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Data.DataSetExtensions.wasm",
        "name": "System.Data.DataSetExtensions.mfqnim5j9f.wasm",
        "hash": "sha256-kl+XiDTc72cpzCLdoH4p3Raa7MItKsKVL102FJudKXw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Data.wasm",
        "name": "System.Data.kkwgyw7heh.wasm",
        "hash": "sha256-HGV6TVTjam7LI2o+jvp2/KDXw81BvdtP5RZHkj/uHec=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Contracts.wasm",
        "name": "System.Diagnostics.Contracts.du5hz8jbzh.wasm",
        "hash": "sha256-K7XrFYpPmNevtHZhmNd/OXIeeTVp0Hjbck3GdUSCP1A=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Debug.wasm",
        "name": "System.Diagnostics.Debug.d2k39tffay.wasm",
        "hash": "sha256-VXUnnnGLm0BeUqoK7Rid4iHkFEZ0A4PAbL7iolf8B8o=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.DiagnosticSource.wasm",
        "name": "System.Diagnostics.DiagnosticSource.iej85cqmw9.wasm",
        "hash": "sha256-xvYUqMkwxtK/gVZjB5hvYJ7p4dmMvlieTTDq3TICnZg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.FileVersionInfo.wasm",
        "name": "System.Diagnostics.FileVersionInfo.eh47cjnlir.wasm",
        "hash": "sha256-cnrWnGPSbK8B+56z1O0LbtoeMtowS10Se5BKji0Z33E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Process.wasm",
        "name": "System.Diagnostics.Process.xfnck8u481.wasm",
        "hash": "sha256-U2qYkifvvs/t1IWTNPVdC9IVQ88hwSmJVQza4G8N2Nc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.StackTrace.wasm",
        "name": "System.Diagnostics.StackTrace.sxp1526n68.wasm",
        "hash": "sha256-cDnR0hKtlDjoGsS80qp+mYKEGnWkymHHMi47FfCFg4I=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.TextWriterTraceListener.wasm",
        "name": "System.Diagnostics.TextWriterTraceListener.hoifzgunui.wasm",
        "hash": "sha256-Ue+3ZIO8fgkBX2GBVgStWYeDONbxgv4VH2E7qt0ymJ0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Tools.wasm",
        "name": "System.Diagnostics.Tools.7w00d3dvtc.wasm",
        "hash": "sha256-h60nFQthuOIkNU/5MT2lBMqSHM2SJeSkWd7ZnC2cJoY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.TraceSource.wasm",
        "name": "System.Diagnostics.TraceSource.1b8o5yjdmc.wasm",
        "hash": "sha256-DZ3o0NI+MC42xydYJXNLpEMuOQ0XEtI/omIFbPNqulo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Tracing.wasm",
        "name": "System.Diagnostics.Tracing.hp8yc23mvz.wasm",
        "hash": "sha256-axt9fKJEt92VyJZZ5yNj6R97fLsdlQRNZzQA5FGA4NQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.Primitives.wasm",
        "name": "System.Drawing.Primitives.hili0ra45p.wasm",
        "hash": "sha256-l9ZKO7tnAuak3jiET4gqekx7M9fEveSqyEHcYyrvMyI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.wasm",
        "name": "System.Drawing.w8e69s8x36.wasm",
        "hash": "sha256-oObO7Ino77Q+kHpcMRIXmsTV1QPQrynaS1QjTGLQZjU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Dynamic.Runtime.wasm",
        "name": "System.Dynamic.Runtime.kfzo4qqdha.wasm",
        "hash": "sha256-YNUW5Vz0k4MfhmPH5TPXlCwHNAkPcK7sAcQz4KJDWtA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Formats.Asn1.wasm",
        "name": "System.Formats.Asn1.mk0nj000ys.wasm",
        "hash": "sha256-plXpLawJD65l33oTZXlQzj0Ifm5mSQ4MijneMQH+n9s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Formats.Tar.wasm",
        "name": "System.Formats.Tar.jnijfxpjfj.wasm",
        "hash": "sha256-L8g/3SvLN7QwYxj525muTlqDDo5OKzH3b/Ex09G4rBg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Globalization.Calendars.wasm",
        "name": "System.Globalization.Calendars.wv3fd32294.wasm",
        "hash": "sha256-bHr7Swq3yqcVoHsl+VuDWlxDYqQIvTPDe+FKtrMzDw0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Globalization.Extensions.wasm",
        "name": "System.Globalization.Extensions.lt4rir5e9e.wasm",
        "hash": "sha256-Kb/jpE9N16oqL5X0KK/s+pQW4LWDo4r+8L3M67SgfF8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Globalization.wasm",
        "name": "System.Globalization.inpdihpm04.wasm",
        "hash": "sha256-4vYhe7l0Pj/8mcCwNOr70h0nuqko9I+4EkCCr7H2OLw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.Brotli.wasm",
        "name": "System.IO.Compression.Brotli.vpocjaaqs6.wasm",
        "hash": "sha256-3XyIF/aMJCqIz+lyAGGmR272XaFVes/NXwFB90TvTpQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.FileSystem.wasm",
        "name": "System.IO.Compression.FileSystem.rv0f03pedo.wasm",
        "hash": "sha256-N67n44gt2lU14+EQNXVp4zoNZ3SlQjsicw7BjmgTWko=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.ZipFile.wasm",
        "name": "System.IO.Compression.ZipFile.vz3kccsfhi.wasm",
        "hash": "sha256-xfIJFA4NAFmdlUjpj3mllAKukJrncr6QFOBWj3ybezw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.wasm",
        "name": "System.IO.Compression.yytijsjrx3.wasm",
        "hash": "sha256-Ojv6qs6P09kNzjPIvC7J2tRb+WIAzUTkEzEvM+KIk/E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.AccessControl.wasm",
        "name": "System.IO.FileSystem.AccessControl.qtmuvtfapv.wasm",
        "hash": "sha256-8q21cc85usGcVxpJRJ2SbYJALCcfgLiSFCJRKG6jGtI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.DriveInfo.wasm",
        "name": "System.IO.FileSystem.DriveInfo.76qy4l8g2f.wasm",
        "hash": "sha256-Ac82Y9vA08buPcOi8AYEuTbxrbv4w1f1GOVt0wJTojY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.Primitives.wasm",
        "name": "System.IO.FileSystem.Primitives.81dkwsayi1.wasm",
        "hash": "sha256-/K4NTeUHTkcHLlQEe+kEMxrAW89Sz7vjk8VqtCqNtiU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.Watcher.wasm",
        "name": "System.IO.FileSystem.Watcher.wyqgyyjs60.wasm",
        "hash": "sha256-iEYQinNSg8Y6efbq5kB/kx9mNY8z55OSi58QKa3dpD4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.wasm",
        "name": "System.IO.FileSystem.x6zrim19qp.wasm",
        "hash": "sha256-F1u3Ro+060+2C1rh2Cnd7GBLKJTXLVP7NaVeI6NuG/k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.IsolatedStorage.wasm",
        "name": "System.IO.IsolatedStorage.b1greon3kc.wasm",
        "hash": "sha256-7+eS9MPqE5IqMqNyWLcBsXbyfIVKBygqs4Vj24cSoa0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.MemoryMappedFiles.wasm",
        "name": "System.IO.MemoryMappedFiles.hyd5prdx8h.wasm",
        "hash": "sha256-6ep5Pt1LGvhU25+jaZ/tvI6vO6erjJtBMjrBvrZ5mso=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Pipelines.wasm",
        "name": "System.IO.Pipelines.i7m0o88yyv.wasm",
        "hash": "sha256-bqgX2HbU4yUavPNlp9U6MDvZJf6oy4eBQcaBd0kUbv4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Pipes.AccessControl.wasm",
        "name": "System.IO.Pipes.AccessControl.9i2h8efeq0.wasm",
        "hash": "sha256-D2muxqDO6CKP8hRBfENP/t2LsHsG6IHJR/K/KcwPMko=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Pipes.wasm",
        "name": "System.IO.Pipes.qqn34nouvl.wasm",
        "hash": "sha256-8trFkn+SkpBYatKlmPpUFJebm/eaBeySAKGBkNXcTZ0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.UnmanagedMemoryStream.wasm",
        "name": "System.IO.UnmanagedMemoryStream.i5d70a2pe5.wasm",
        "hash": "sha256-qvlbywsb08aVy0CIkBVLrJzLJTqrkuiLiSkaDXo21eU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.wasm",
        "name": "System.IO.io16bl7y4v.wasm",
        "hash": "sha256-/mIkACiWrgHuhaN/AmvxFvGQgWOhoHWmxsDdDx44JSs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.AsyncEnumerable.wasm",
        "name": "System.Linq.AsyncEnumerable.camefdrzw6.wasm",
        "hash": "sha256-rGRpK3T2gvadTU7PzBXcc7ggqseTABXxw+fkJHqrpKk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Expressions.wasm",
        "name": "System.Linq.Expressions.jdp183gnbq.wasm",
        "hash": "sha256-t+oZYKGCszVlxUNNR4yHugJJ1jLKBwxvJNmT6w00g2o=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Parallel.wasm",
        "name": "System.Linq.Parallel.1ymg6nuczv.wasm",
        "hash": "sha256-18XHdmzdzQ37bQeL4bFcJ2RCpIBUOBEzZi7ZoRD21Oo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Queryable.wasm",
        "name": "System.Linq.Queryable.o30dlt2t6i.wasm",
        "hash": "sha256-xGoh/lMEpnNdj0hHno6dR6VV/r5TyuXlDHmni+xdhoY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.wasm",
        "name": "System.Linq.t8t4mrpfpe.wasm",
        "hash": "sha256-Dd91l+ulaLZO7vbeyp0V2Vr/gn4GUXDEi7CZousve/8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Memory.wasm",
        "name": "System.Memory.oq442f53lw.wasm",
        "hash": "sha256-ACFPmduenV/o2I26S962v4LLC6GAcAxhwYGxZEsavd8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Http.Json.wasm",
        "name": "System.Net.Http.Json.brwnbcmxs8.wasm",
        "hash": "sha256-l0A4l0MVsK1DDlbqq95+tQOJajHi12/PbhGLwNBZjDk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Http.wasm",
        "name": "System.Net.Http.8ls8lyr1c3.wasm",
        "hash": "sha256-vC83VphPmMFMCuIVcZjOe6BZGsChhuU0T30NXqtSQBQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.HttpListener.wasm",
        "name": "System.Net.HttpListener.hzgg5ejx4f.wasm",
        "hash": "sha256-A7ma7ZaHQFKBIJ37SGibOzHGLrjgCP1+XXiNMkfbV0I=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Mail.wasm",
        "name": "System.Net.Mail.o78aikxytd.wasm",
        "hash": "sha256-FPrvdolysvthF+8jhvS9wSIiAPZC98wWQe9lvx9yIsY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.NameResolution.wasm",
        "name": "System.Net.NameResolution.gq9w8wv4bi.wasm",
        "hash": "sha256-SHFXNw97GvIA/qo4gK5ozt0OSXoI1ZhhizNEiQkoA18=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.NetworkInformation.wasm",
        "name": "System.Net.NetworkInformation.n0docqneqh.wasm",
        "hash": "sha256-GYR2JaGvhiu/sOY2/KDyY9W4rQ8XxcWHGt6PIsnLmBg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Ping.wasm",
        "name": "System.Net.Ping.wd2qb9vkad.wasm",
        "hash": "sha256-lC2ahw8pDrFuLxWf/dtKJZVx4CAYj5CdpZHChrK5fNM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Primitives.wasm",
        "name": "System.Net.Primitives.hutl0oz2b9.wasm",
        "hash": "sha256-p2U2ovyJBpDsO3avwRmoGlfXXtN8/KMOhgpXK4JLtGM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Quic.wasm",
        "name": "System.Net.Quic.xbjteeoeq4.wasm",
        "hash": "sha256-Hc2bpSCcfcF9c/BPUnltKaR/0OvDiuw+blAHTQ5+7Dg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Requests.wasm",
        "name": "System.Net.Requests.221e5hzt9o.wasm",
        "hash": "sha256-2nV0MO1+JIFbE+uok7r1F7BlrxSeiVgS6TBHjqwZxaY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Security.wasm",
        "name": "System.Net.Security.k0ujiy0am5.wasm",
        "hash": "sha256-tLgt8DxiguUh7+nFXslFB40olz2gq8Jl6I8wzlbh5Zo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.ServerSentEvents.wasm",
        "name": "System.Net.ServerSentEvents.i0kw51enn5.wasm",
        "hash": "sha256-UpZHwWUUU1o7o6YPF9dObUcTGDWy/ihtOHpaDU9c+T4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.ServicePoint.wasm",
        "name": "System.Net.ServicePoint.6j6e2849b4.wasm",
        "hash": "sha256-kvpJqiAQXf52lvCuybaq1TuceM7mk6YSLkLFSzPS1sw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Sockets.wasm",
        "name": "System.Net.Sockets.vkb1pnt9as.wasm",
        "hash": "sha256-IYq6oB4A6zC7W/MdXRGPkMWTybnckRPlX/Fgv0qOteY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebClient.wasm",
        "name": "System.Net.WebClient.juxsrxk1vz.wasm",
        "hash": "sha256-pcZRciVNFnuShRXIQkdqOn54ESfw1XOzFLATx5/a5FM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebHeaderCollection.wasm",
        "name": "System.Net.WebHeaderCollection.tcsjniqirb.wasm",
        "hash": "sha256-TTX6S9/Dqn5X892NMWpXLHTeeABCb6Y0MOgfGbW6u+g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebProxy.wasm",
        "name": "System.Net.WebProxy.6xt1ac7vz5.wasm",
        "hash": "sha256-unfr0lXiSQ4E3HcS3qxROctgAQEqFnDWOOCq/urYuvw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebSockets.Client.wasm",
        "name": "System.Net.WebSockets.Client.dz4re4lafi.wasm",
        "hash": "sha256-+X9mcXV+2SNk5/k1UxF/8oQxD3pLkL4icqgjL+wCKj0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebSockets.wasm",
        "name": "System.Net.WebSockets.khfecpbems.wasm",
        "hash": "sha256-GPr0sS0BNWD2rt3XKRidmnnDpxwcS/St1RwpYRZ1dV4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.wasm",
        "name": "System.Net.0d6cm0w934.wasm",
        "hash": "sha256-zD4+e5/XhG3q02z+Q+ZpgEPvfB/WNOaOmSvfMfXIe/8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Numerics.Vectors.wasm",
        "name": "System.Numerics.Vectors.0x1c7sjktv.wasm",
        "hash": "sha256-tBtKJ/DXu80DlsRjXDFB+HhMwM7BeK9jNhKmZULBAkA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Numerics.wasm",
        "name": "System.Numerics.leckpftrej.wasm",
        "hash": "sha256-M5+xKGKyO/ziOOxxIOmDwaMObeANMN7yycDen3alNM4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ObjectModel.wasm",
        "name": "System.ObjectModel.0qpny5tqd4.wasm",
        "hash": "sha256-CDiumMgRPaeH4U0+BvaT1bZYMZ/Jvbx4cJIl0mz1wNM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.DataContractSerialization.wasm",
        "name": "System.Private.DataContractSerialization.3qgpohup6a.wasm",
        "hash": "sha256-6zwkhnp8CZNO7XKTsPUUWtcenaomX3Jv3uEW9BJVERk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Uri.wasm",
        "name": "System.Private.Uri.aknhnp8ddv.wasm",
        "hash": "sha256-iszuZW03s4VKjdw59s0RoiIA7w6XgF80ZiE6lP4PwnI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.Linq.wasm",
        "name": "System.Private.Xml.Linq.r97hx586ch.wasm",
        "hash": "sha256-8ctCsjy6K8j8yTg0EF4YSWhSk9k0lK9L/YE6z/dWlPQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.wasm",
        "name": "System.Private.Xml.mlaajvyexj.wasm",
        "hash": "sha256-1jwjX825zi/De8meS1tdN/FibyrX347bKjtHsCWW4VI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.DispatchProxy.wasm",
        "name": "System.Reflection.DispatchProxy.vlmtgv65wf.wasm",
        "hash": "sha256-TVx54RsHDR+gmLqsXHiNlvvI9z9ql4Or+F1XzH9xqBY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.ILGeneration.wasm",
        "name": "System.Reflection.Emit.ILGeneration.kyal0on48t.wasm",
        "hash": "sha256-RAWim8veXmHx+9NTxGHX1QAL+3flkfglCg6H/p3tI7Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.Lightweight.wasm",
        "name": "System.Reflection.Emit.Lightweight.qhd57gltfo.wasm",
        "hash": "sha256-jgrqoH52RGt1gt4MZVx9EaRsh50bvJK35mJhyBp+HgE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.wasm",
        "name": "System.Reflection.Emit.zb8wuoehqy.wasm",
        "hash": "sha256-0a+RlwUa7CWb/iF0xorKuF5fwhTWLQGCRV/uLDCxxtA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Extensions.wasm",
        "name": "System.Reflection.Extensions.i5zcbw4iab.wasm",
        "hash": "sha256-CpiFU/cWrRiQRzOiythJ0pDkq0o4L6kwQDxaL5WhSx0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Metadata.wasm",
        "name": "System.Reflection.Metadata.cvu0sis9hb.wasm",
        "hash": "sha256-uD+PnuYOcNLnbjPO0jOET3U/EkW4+9KY9MlwIVMRjJ4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Primitives.wasm",
        "name": "System.Reflection.Primitives.rv8xx0rsbv.wasm",
        "hash": "sha256-NxyC5p0OdIBdUPFn9Wi2u+EenGrm12RxlQXqhaQZ+5g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.TypeExtensions.wasm",
        "name": "System.Reflection.TypeExtensions.dowqrlqcnz.wasm",
        "hash": "sha256-7TY8+tSh1hhbXpiIEMcjYL5TYDIU3HYjzTq5dmge6mk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.wasm",
        "name": "System.Reflection.ogs9ti8z3k.wasm",
        "hash": "sha256-WP1bs8xV1598R1jBHz6liZtKvYPtyu5CJcCX9RrQ3Yw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Resources.Reader.wasm",
        "name": "System.Resources.Reader.7ywfox205u.wasm",
        "hash": "sha256-j7BM1lYJNVVohVIDiDDy/DZeraKqutKZpUCHEvdF3zQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Resources.ResourceManager.wasm",
        "name": "System.Resources.ResourceManager.l6z7yfwmvs.wasm",
        "hash": "sha256-I9R4RAuBWte9+QxG1PKpxvirN0NX/9FzeSC28SZv2Gc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Resources.Writer.wasm",
        "name": "System.Resources.Writer.313d910cpu.wasm",
        "hash": "sha256-aWJZy3Jcqg67qPkntoerKFVykiZttloAX97mgkml4u8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.CompilerServices.Unsafe.wasm",
        "name": "System.Runtime.CompilerServices.Unsafe.5naidm3hnv.wasm",
        "hash": "sha256-Ybt2YvAF4g4Eds4ST9IF963neXtbDZryJvfu3LSjdRw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.CompilerServices.VisualC.wasm",
        "name": "System.Runtime.CompilerServices.VisualC.vhbmhigdu6.wasm",
        "hash": "sha256-TaNMFm1yF7yMlkcjEwwXAU4Mk2b1G6k/ce97nJAPYck=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Extensions.wasm",
        "name": "System.Runtime.Extensions.immqe9msuz.wasm",
        "hash": "sha256-9hiSkTZtLVeZMM+Dr8YGdBD6tUw4Jn0/LkftCvWURIo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Handles.wasm",
        "name": "System.Runtime.Handles.hsca0r8lfq.wasm",
        "hash": "sha256-QWuhrukxVnUnk9Gg/i1o6zz3kUhj/4XL55YcUH5bAxo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.RuntimeInformation.wasm",
        "name": "System.Runtime.InteropServices.RuntimeInformation.ualglqq81k.wasm",
        "hash": "sha256-1kwFVepeeoMvOE55gEGnJ3azjbVtFSR2tI8dsZDX5r8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.wasm",
        "name": "System.Runtime.InteropServices.faetretm2e.wasm",
        "hash": "sha256-lzDGT/kOs5xavpZN4qdD/6sxD8NmDRk+tUY8EYLbSI4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Intrinsics.wasm",
        "name": "System.Runtime.Intrinsics.802p7n6k8b.wasm",
        "hash": "sha256-mKYaq1JW8kKsFz8nKVrZNpIow7lue0iXYSeY9MhD1g8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Loader.wasm",
        "name": "System.Runtime.Loader.eidltsl2f9.wasm",
        "hash": "sha256-WsujQ4w78PK1lMZSxcBMrHYEAoJfcaaP0ssigZNxhtM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Numerics.wasm",
        "name": "System.Runtime.Numerics.b3cxdpmtgo.wasm",
        "hash": "sha256-d4ynp74xbZgWp7JHV9cXIG/Pf0jvH/bdJDOL1Us6LZM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Formatters.wasm",
        "name": "System.Runtime.Serialization.Formatters.367zxkp8xo.wasm",
        "hash": "sha256-9c+YM256kurDeE3SF+8TQoCQjocFnO5IVOeZ3Yd3VFE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Json.wasm",
        "name": "System.Runtime.Serialization.Json.r2ls9ue6ca.wasm",
        "hash": "sha256-s5q2F700jj0IC7rO7i/stRexv5d+D4fDtYeM+erKDyA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Primitives.wasm",
        "name": "System.Runtime.Serialization.Primitives.tlmnoyg8tt.wasm",
        "hash": "sha256-MbIFQ/RPsThEEFtvz3qscxYP43mazSYBKHsQLJkvolg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Xml.wasm",
        "name": "System.Runtime.Serialization.Xml.wdv4vg37l4.wasm",
        "hash": "sha256-5CbuwPLIoqs3I8sdnOnSpJYGmvP4jl0MvUzYsC3SvDc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.wasm",
        "name": "System.Runtime.Serialization.w8c5bv3i8y.wasm",
        "hash": "sha256-wLsqLN5Cdw2tNAqU6+1Srusr9s+lz9LT0+f+zxDG1XA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.wasm",
        "name": "System.Runtime.ljpure1lar.wasm",
        "hash": "sha256-0R+/YJ/3NJwsSla8hN2gea9v61kh2cSNBkUFO6bSX1E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.AccessControl.wasm",
        "name": "System.Security.AccessControl.h3ktqn7ptm.wasm",
        "hash": "sha256-/dAGMH18cSc0r5vtNA20ngBjHOn6dAuLUHq0o6huvPs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Claims.wasm",
        "name": "System.Security.Claims.cg87efyyav.wasm",
        "hash": "sha256-jDD2itDKRMwk6qFcERVJb0wUVlYYYJMlv6P2RVzPrno=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Algorithms.wasm",
        "name": "System.Security.Cryptography.Algorithms.fpu4rc6102.wasm",
        "hash": "sha256-jUB4XMCvBoXaa8RqEmnLy9QX5+cgmTw2vuWrq4DK2Og=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Cng.wasm",
        "name": "System.Security.Cryptography.Cng.d9ys1ule48.wasm",
        "hash": "sha256-cUUVPCEeFEBBMMx7LzrIE4jhXjdpdQz32Z+bkQMD5UY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Csp.wasm",
        "name": "System.Security.Cryptography.Csp.3jv3zoukwi.wasm",
        "hash": "sha256-XwXMvSvUyGA22arhGBP3MikhUpiTgLzq1xzxKLjMVIw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Encoding.wasm",
        "name": "System.Security.Cryptography.Encoding.6awrknpibm.wasm",
        "hash": "sha256-0sPKGtzHfn/W+X9IMTgg/MzRb8vc9w9W6JVwtVasIds=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.OpenSsl.wasm",
        "name": "System.Security.Cryptography.OpenSsl.xk45senqyh.wasm",
        "hash": "sha256-cSrplm/NeL9uAbyy1BDQzHxnrEueDg08STRsDjA0mlY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Primitives.wasm",
        "name": "System.Security.Cryptography.Primitives.0yv3hhf2hj.wasm",
        "hash": "sha256-eMkW+KD2fmQcWovk/JFAtE4ikzO0fdaBA+khwQ7Fg8I=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.X509Certificates.wasm",
        "name": "System.Security.Cryptography.X509Certificates.j9wm55abdo.wasm",
        "hash": "sha256-KfqpfP0pJILqV11ND9le6/ZBxzcIOuFDRAGZfif5bYo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.wasm",
        "name": "System.Security.Cryptography.0l418f973x.wasm",
        "hash": "sha256-dMH/npdIJ3xxhV0xKV48X+ELFeeTjiMemBXjvEVjKjU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Principal.Windows.wasm",
        "name": "System.Security.Principal.Windows.3339vubpnp.wasm",
        "hash": "sha256-IeFq/+RXHmm32cPGUgG+IvtHKMgXg2XmwxcPLuGAhfs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Principal.wasm",
        "name": "System.Security.Principal.5p8v2r4e9q.wasm",
        "hash": "sha256-yYs9FOewG5li45p/Tm1lKkt3T174H2xrlVb+CCtHNfA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.SecureString.wasm",
        "name": "System.Security.SecureString.fi37f3qjy6.wasm",
        "hash": "sha256-h8glT03PTZpscT2uCBUIdMAsc6rk1B7cvsbhaUh9yZc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.wasm",
        "name": "System.Security.ua00ewmf1q.wasm",
        "hash": "sha256-hm91aCqf5EJlBGmln/08q83riwRHWBHzN8Hs714J2SU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ServiceModel.Web.wasm",
        "name": "System.ServiceModel.Web.q9f6qjjb01.wasm",
        "hash": "sha256-MvcH5zG5DfCZ9SjSxnFDY7vLeJLAHzlmclYob4BY/tQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ServiceProcess.wasm",
        "name": "System.ServiceProcess.3sj3jtmn1y.wasm",
        "hash": "sha256-4y3KftMW4tsqH2u2PbZXk9hiT+YWzCL4GmGl/n4Zlus=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encoding.CodePages.wasm",
        "name": "System.Text.Encoding.CodePages.pvosu98fs6.wasm",
        "hash": "sha256-9U43RhnOLvpJTPxWeXEQukYw+sHlWt4uhgYPEh/SPEA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encoding.Extensions.wasm",
        "name": "System.Text.Encoding.Extensions.1tk82mr0sb.wasm",
        "hash": "sha256-q9rNp7kslBCm/GEUHe2IBFm42rjJpt+0ywcCOeOTKmU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encoding.wasm",
        "name": "System.Text.Encoding.gx6u2npyoe.wasm",
        "hash": "sha256-bHP1xQMoimvfVkR84UuUVeBqyAvWmlmpV7QS7CQNrXE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encodings.Web.wasm",
        "name": "System.Text.Encodings.Web.d1d2ypvaqf.wasm",
        "hash": "sha256-f3sl3SOSvgupaxbPemCUVdzoPjSb8eQ0ecutnVk6+Kk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Json.wasm",
        "name": "System.Text.Json.uxge6gziev.wasm",
        "hash": "sha256-QgMYmBCM/TVhZ8XP9bXieb8I3u+ZGCd880Jhl5y4ZQs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.RegularExpressions.wasm",
        "name": "System.Text.RegularExpressions.i33wsiky3s.wasm",
        "hash": "sha256-rruYgwKJBCk8/DAbo0fck8apGaQBTLGna5tRzcRDgWY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.AccessControl.wasm",
        "name": "System.Threading.AccessControl.l24l7lnxnt.wasm",
        "hash": "sha256-3ZLdbAxorq5DkWjBTwvmUuomRSCjyfWXgNJfotDNwRs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Channels.wasm",
        "name": "System.Threading.Channels.nr14a155nr.wasm",
        "hash": "sha256-DaB8V+YBEwHAUvN9rnWw7Z5FU3JuI3IoOu4s61LSO/Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Overlapped.wasm",
        "name": "System.Threading.Overlapped.lq87izbe98.wasm",
        "hash": "sha256-A+oSgPqBUYXn4nAcjh9ASo3Y0F9oWHGk7ZL5roDjzg4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Tasks.Dataflow.wasm",
        "name": "System.Threading.Tasks.Dataflow.d2etrpio29.wasm",
        "hash": "sha256-dQv+Bk0zAuAqbI7nIvefLLKSoMGMbg9o63UIjLZL2UM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Tasks.Extensions.wasm",
        "name": "System.Threading.Tasks.Extensions.r7b8d2gyqh.wasm",
        "hash": "sha256-OSBUHso3p+SX5Db20e7tPjHIFsrXC16R0nVj6HA2gfo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Tasks.Parallel.wasm",
        "name": "System.Threading.Tasks.Parallel.rwdf2plpzx.wasm",
        "hash": "sha256-K8ovfTwdLf5EaENJlNHeG4aySfLq7If+egFmcunGRKI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Tasks.wasm",
        "name": "System.Threading.Tasks.6kddfirisu.wasm",
        "hash": "sha256-5qz0ltVixCop/k3Bf8DCiMwWfTfSQD3BQ+SD4KwiL7E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Thread.wasm",
        "name": "System.Threading.Thread.4s5zdf3gwq.wasm",
        "hash": "sha256-/P6wpeOaRSqS7E07r2v0JN4WDN8NirMoTJllkHZon6E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.ThreadPool.wasm",
        "name": "System.Threading.ThreadPool.kr1hxnnjfs.wasm",
        "hash": "sha256-MNC2z5/OAkBLj9fWsOCel5jqIgHYWpywGFR6zIuzOVI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Timer.wasm",
        "name": "System.Threading.Timer.0u4563nh13.wasm",
        "hash": "sha256-uAm3XJUpbV1PAn5Tb76wZh379dD1WVnqvB+pgyFgnDg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.wasm",
        "name": "System.Threading.k95hk2ni6y.wasm",
        "hash": "sha256-6ABbTNKS+JkTkdMb7v5C3/Oe5Pn1G0flAy6blyVR7nU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Transactions.Local.wasm",
        "name": "System.Transactions.Local.55qmwe0wl2.wasm",
        "hash": "sha256-J7phhekDZhu4gn4qq33AD+szF9pVAQfP6u1vqxYxTKA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Transactions.wasm",
        "name": "System.Transactions.2oqard5sqe.wasm",
        "hash": "sha256-frst6hbBNtnENDABqg3vWlivxONSVaOolsHoeXQc6Fw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ValueTuple.wasm",
        "name": "System.ValueTuple.a6hls1tzg7.wasm",
        "hash": "sha256-MhpLQF5D+phdDnvvfk4B1HIBRLq1ML9Hbor2Td+lqeI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Web.HttpUtility.wasm",
        "name": "System.Web.HttpUtility.2s5ct2ewsk.wasm",
        "hash": "sha256-Qg1M0GNgen0oDo1sm2iH78DXoCjcLLF5MwjXfLxUh4Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Web.wasm",
        "name": "System.Web.tk98qt61wh.wasm",
        "hash": "sha256-fXAh5ioTXiZBhDr3LV18IoYhA8Ds5asTcytHeZnDb6U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Windows.wasm",
        "name": "System.Windows.jl02lvbc66.wasm",
        "hash": "sha256-ec8LEP9cTY7n5rBZVfH14K7Ru3C2vIc8DeTO2C0uD9w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.Linq.wasm",
        "name": "System.Xml.Linq.kjnq771p2j.wasm",
        "hash": "sha256-sCzC+FeFJg5wjopBdMQ7Mk9CwbjtLC67KkNOdwDlbGE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.ReaderWriter.wasm",
        "name": "System.Xml.ReaderWriter.b0jot2j4ey.wasm",
        "hash": "sha256-xdTUE1MRIayJnrRI8aA//kibgtJUMswt8chzldlyRDo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.Serialization.wasm",
        "name": "System.Xml.Serialization.6brc2ehzei.wasm",
        "hash": "sha256-vuD1TYoNzRyZfGrZbznnhz3eF6i9U4iNGQXMqkUtss0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XDocument.wasm",
        "name": "System.Xml.XDocument.xqorttgppi.wasm",
        "hash": "sha256-9zhquW3g8K7o05mFS0mJY5/HAH4ePnHRpGa+z+utB2Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XPath.XDocument.wasm",
        "name": "System.Xml.XPath.XDocument.yoyzrkkgpn.wasm",
        "hash": "sha256-nlon/EaHjoTCg+MG5UjkNVfiQRvE5IpuJ16mgj94Or4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XPath.wasm",
        "name": "System.Xml.XPath.2inzx80kh1.wasm",
        "hash": "sha256-Rr1xN+Cj85i8fFsLQ6hIkVoEqGPCebYjY1ATINk2xtw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XmlDocument.wasm",
        "name": "System.Xml.XmlDocument.z13hcu1lm0.wasm",
        "hash": "sha256-tz3/F9oh50YRxaiJGSdvgGkbG0tUW1cbx8yi1RVOctg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XmlSerializer.wasm",
        "name": "System.Xml.XmlSerializer.zs4szemvoe.wasm",
        "hash": "sha256-UyLfxT01D/xZumPN7lyCxb1sLJlrk2Wz+3msPf7PLQk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.wasm",
        "name": "System.Xml.p1h7rh240x.wasm",
        "hash": "sha256-865GmcArHPb/mWhE1Gy65uDbwcnQ1RHukx60BbbBTFY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.wasm",
        "name": "System.vbnq7znrkk.wasm",
        "hash": "sha256-ZQTW8pFdLAyBw1Jhn7yb3ftap1pQ7CfXE7V6OwaB0+s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "VladislavAntonyuk.wasm",
        "name": "VladislavAntonyuk.sfhpg5zwye.wasm",
        "hash": "sha256-iJiSil+yl/ME14qQui1coWnzNjDfdks/ZUy7j96ZXVU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "WindowsBase.wasm",
        "name": "WindowsBase.znzd9i0mgl.wasm",
        "hash": "sha256-MVkieXyrT9C9OMTN88gjT037bVK659skHBp15546PC4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "mscorlib.wasm",
        "name": "mscorlib.kb9zdz25a0.wasm",
        "hash": "sha256-8BLqxMwSjpwtDzgaiL8DbUWyeRuT8YBYhgI4gQGaurs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "netstandard.wasm",
        "name": "netstandard.iclaleazb3.wasm",
        "hash": "sha256-khcncp65u6Msr+u62awiYRCyrmbniqsz9cuNpsFfzOI=",
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
        "System.Diagnostics.Metrics.Meter.IsSupported": false,
        "System.Diagnostics.Tracing.EventSource.IsSupported": false,
        "System.GC.Server": true,
        "System.Globalization.Invariant": false,
        "System.TimeZoneInfo.Invariant": false,
        "System.Linq.Enumerable.IsSizeOptimized": true,
        "System.Net.Http.EnableActivityPropagation": false,
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
