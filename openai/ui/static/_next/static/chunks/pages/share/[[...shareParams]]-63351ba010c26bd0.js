(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[165],{76386:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/share/[[...shareParams]]",function(){return n(66556)}])},35113:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(39324),a=n(71209);Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{noSSR:function(){return l},default:function(){return s}});var o=n(64838),i=(n(70079),o._(n(12730)));function u(e){return{default:(null==e?void 0:e.default)||e}}function l(e,t){return delete t.webpack,delete t.modules,e(t)}function s(e,t){var n=i.default,o={loading:function(e){return e.error,e.isLoading,e.pastDelay,null}};e instanceof Promise?o.loader=function(){return e}:"function"==typeof e?o.loader=e:"object"==typeof e&&(o=r._({},o,e));var s=(o=r._({},o,t)).loader;return(o.loadableGenerated&&(o=r._({},o,o.loadableGenerated),delete o.loadableGenerated),"boolean"!=typeof o.ssr||o.ssr)?n(a._(r._({},o),{loader:function(){return null!=s?s().then(u):Promise.resolve(u(function(){return null}))}})):(delete o.webpack,delete o.modules,l(n,o))}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},12659:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"LoadableContext",{enumerable:!0,get:function(){return r}});var r=n(64838)._(n(70079)).default.createContext(null)},12730:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(51217),a=n(31819),o=n(39324),i=n(71209);Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return p}});var u=n(64838)._(n(70079)),l=n(12659),s=[],d=[],c=!1;function f(e){var t=e(),n={loading:!0,loaded:null,error:null};return n.promise=t.then(function(e){return n.loading=!1,n.loaded=e,e}).catch(function(e){throw n.loading=!1,n.error=e,e}),n}var _=function(){function e(t,n){r._(this,e),this._loadFn=t,this._opts=n,this._callbacks=new Set,this._delay=null,this._timeout=null,this.retry()}return a._(e,[{key:"promise",value:function(){return this._res.promise}},{key:"retry",value:function(){var e=this;this._clearTimeouts(),this._res=this._loadFn(this._opts.loader),this._state={pastDelay:!1,timedOut:!1};var t=this._res,n=this._opts;t.loading&&("number"==typeof n.delay&&(0===n.delay?this._state.pastDelay=!0:this._delay=setTimeout(function(){e._update({pastDelay:!0})},n.delay)),"number"==typeof n.timeout&&(this._timeout=setTimeout(function(){e._update({timedOut:!0})},n.timeout))),this._res.promise.then(function(){e._update({}),e._clearTimeouts()}).catch(function(t){e._update({}),e._clearTimeouts()}),this._update({})}},{key:"_update",value:function(e){this._state=o._(i._(o._({},this._state),{error:this._res.error,loaded:this._res.loaded,loading:this._res.loading}),e),this._callbacks.forEach(function(e){return e()})}},{key:"_clearTimeouts",value:function(){clearTimeout(this._delay),clearTimeout(this._timeout)}},{key:"getCurrentValue",value:function(){return this._state}},{key:"subscribe",value:function(e){var t=this;return this._callbacks.add(e),function(){t._callbacks.delete(e)}}}]),e}();function h(e){return function(e,t){var n=function(){if(!i){var t=new _(e,o);i={getCurrentValue:t.getCurrentValue.bind(t),subscribe:t.subscribe.bind(t),retry:t.retry.bind(t),promise:t.promise.bind(t)}}return i.promise()},r=function(){n();var e=u.default.useContext(l.LoadableContext);e&&Array.isArray(o.modules)&&o.modules.forEach(function(t){e(t)})},a=function(e,t){r();var n=u.default.useSyncExternalStore(i.subscribe,i.getCurrentValue,i.getCurrentValue);return u.default.useImperativeHandle(t,function(){return{retry:i.retry}},[]),u.default.useMemo(function(){var t;return n.loading||n.error?u.default.createElement(o.loading,{isLoading:n.loading,pastDelay:n.pastDelay,timedOut:n.timedOut,error:n.error,retry:i.retry}):n.loaded?u.default.createElement((t=n.loaded)&&t.default?t.default:t,e):null},[e,n])},o=Object.assign({loader:null,loading:null,delay:200,timeout:null,webpack:null,modules:null},t),i=null;if(!c){var s=o.webpack?o.webpack():o.modules;s&&d.push(function(e){var t=!0,r=!1,a=void 0;try{for(var o,i=s[Symbol.iterator]();!(t=(o=i.next()).done);t=!0){var u=o.value;if(-1!==e.indexOf(u))return n()}}catch(e){r=!0,a=e}finally{try{t||null==i.return||i.return()}finally{if(r)throw a}}})}return a.preload=function(){return n()},a.displayName="LoadableComponent",u.default.forwardRef(a)}(f,e)}function v(e,t){for(var n=[];e.length;){var r=e.pop();n.push(r(t))}return Promise.all(n).then(function(){if(e.length)return v(e,t)})}h.preloadAll=function(){return new Promise(function(e,t){v(s).then(e,t)})},h.preloadReady=function(e){return void 0===e&&(e=[]),new Promise(function(t){var n=function(){return c=!0,t()};v(d,e).then(n,n)})},window.__NEXT_PRELOADREADY=h.preloadReady;var p=h},66556:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSP:function(){return x},config:function(){return j},default:function(){return w}});var r=n(39324),a=n(71209),o=n(22830),i=n(35250),u=n(13995),l=n(9181),s=n.n(l),d=n(70079),c=n(1454),f=n(94968),_=n(32004),h=n(14412),v=n(88327),p=n(50744),m=n(32542),y=n(31621),g=n(1323);function b(e){var t=e.sharedConversationId,n=e.initiallyHighlightedMessageId,r=e.continueConversationUrl,a=(0,y.GR)(t);return(0,i.jsx)(m.gB.Provider,{value:!0,children:(0,i.jsx)(m.XA.Provider,{value:a,children:(0,i.jsx)(g.Z,{clientThreadId:t,setClientThreadId:function(){},initiallyHighlightedMessageId:n,continueConversationUrl:r})})})}var x=!0,j={runtime:"nodejs"},P=(0,f.vU)({home:{id:"sharedConversation.home",defaultMessage:"Home",description:"Home link text in error message"}});function w(e){if("error"===e.serverResponse.type)return(0,i.jsx)(O,{error:e.serverResponse.error});var t=(0,a._)((0,r._)({},e),{conversationData:e.serverResponse.data});return e.continueMode?(0,i.jsx)(k,(0,r._)({},t)):e.moderationMode?(0,i.jsx)(p.Z,{children:(0,i.jsx)(C,(0,r._)({},t))}):(0,i.jsx)(C,(0,r._)({},t))}function k(e){var t=(0,o._)((0,d.useState)(function(){return(0,y.OX)()}),1)[0];y.tQ.initThreadFromServerData(t,e.conversationData,!0,e.sharedConversationId);var n=(0,u.NL)();return(null!=e.plugins&&n.setQueryData(e.plugins.map(function(e){return e.id}),e.plugins),null!=e.chatPageProps)?(0,i.jsx)(h.default,(0,a._)((0,r._)({},e.chatPageProps),{clientThreadId:t})):null}function C(e){y.tQ.initThreadFromServerData(e.sharedConversationId,e.conversationData,!0);var t=(0,u.NL)();return null!=e.plugins&&t.setQueryData(e.plugins.map(function(e){return e.id}),e.plugins),(0,i.jsx)(b,(0,a._)((0,r._)({},e),{initiallyHighlightedMessageId:e.conversationData.highlighted_message_id,continueConversationUrl:e.conversationData.continue_conversation_url}))}function O(e){var t=e.error;return(0,i.jsx)("div",{className:"mx-8 mt-8 flex flex-col items-center sm:mt-16",children:(0,i.jsxs)("div",{className:"max-w-xl rounded-lg bg-red-500 px-8 py-4 text-white",role:"alert",children:[(0,i.jsx)("div",{children:t}),(0,i.jsx)("div",{className:"mt-4",children:(0,i.jsxs)(s(),{href:"/",className:"flex items-center gap-2",children:[(0,i.jsx)(v.ZP,{icon:c.m6D}),(0,i.jsx)(_.Z,(0,r._)({},P.home))]})})]})})}},55344:function(e,t,n){e.exports=n(35113)}},function(e){e.O(0,[246,798,741,786,960,753,984,801,190,937,412,774,888,179],function(){return e(e.s=76386)}),_N_E=e.O()}]);