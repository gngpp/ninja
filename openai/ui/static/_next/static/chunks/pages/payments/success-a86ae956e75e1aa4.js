(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[425],{81071:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/payments/success",function(){return n(1557)}])},1557:function(t,e,n){"use strict";n.r(e),n.d(e,{PAYMENTS_SUCCESS_URL:function(){return g},__N_SSP:function(){return b},default:function(){return w}});var r=n(39324),i=n(22830),o=n(35250),a=n(73413),c=n.n(a),s=n(60554),u=n(70079),f=n(12219),l=n.n(f),h=n(69119),p=n(67273),v=n(27986),d=n(50795),y=n(82081),b=!0,g="/payments/success";function w(t){return(0,o.jsx)(O,(0,r._)({},t))}function O(t){var e=t.user,n=(0,s.useRouter)();(0,v.Z)("ChatGPT",e,{});var r=(0,i._)((0,u.useState)(!0),2),a=r[0],f=r[1],b=(0,i._)((0,u.useState)(!1),2),g=b[0],w=b[1];(0,u.useEffect)(function(){w(!0),window.setTimeout(function(){f(!1)},3500)},[f]);var O=(0,u.useCallback)(function(t){t.preventDefault(),d.o.logEvent(y.a.clickAccountPaymentSuccessContinue),n.push("/")},[n]),m=(0,h.Z)(),P=m.width,x=m.height;return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(c(),{children:(0,o.jsx)("title",{children:"Account - Payment success"})}),g&&(0,o.jsx)(l(),{numberOfPieces:500,colors:["#10A37F","#1563D7","#479AE7","#5599FF","#77B69F","#8787D9","#8787D9","#BD8AF1","#C089F8","#FC6770","#FFFFFF"],recycle:a,width:P,height:x}),(0,o.jsxs)("div",{className:"flex h-screen w-full flex-col items-center justify-center gap-3",children:[(0,o.jsx)("div",{className:"text-xl font-semibold",children:"Payment received! You've been upgraded to ChatGPT Plus."}),(0,o.jsx)(p.z,{onClick:O,children:"Continue"})]})]})}},12219:function(t,e,n){var r;"undefined"!=typeof self&&self,t.exports=(r=n(70079),function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e||4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,(function(e){return t[e]}).bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=2)}([function(t,e){t.exports=r},function(t,e,n){"use strict";var r={linear:function(t,e,n,r){return(n-e)*t/r+e},easeInQuad:function(t,e,n,r){return(n-e)*(t/=r)*t+e},easeOutQuad:function(t,e,n,r){return-(n-e)*(t/=r)*(t-2)+e},easeInOutQuad:function(t,e,n,r){var i=n-e;return(t/=r/2)<1?i/2*t*t+e:-i/2*(--t*(t-2)-1)+e},easeInCubic:function(t,e,n,r){return(n-e)*(t/=r)*t*t+e},easeOutCubic:function(t,e,n,r){return(n-e)*((t=t/r-1)*t*t+1)+e},easeInOutCubic:function(t,e,n,r){var i=n-e;return(t/=r/2)<1?i/2*t*t*t+e:i/2*((t-=2)*t*t+2)+e},easeInQuart:function(t,e,n,r){return(n-e)*(t/=r)*t*t*t+e},easeOutQuart:function(t,e,n,r){return-(n-e)*((t=t/r-1)*t*t*t-1)+e},easeInOutQuart:function(t,e,n,r){var i=n-e;return(t/=r/2)<1?i/2*t*t*t*t+e:-i/2*((t-=2)*t*t*t-2)+e},easeInQuint:function(t,e,n,r){return(n-e)*(t/=r)*t*t*t*t+e},easeOutQuint:function(t,e,n,r){return(n-e)*((t=t/r-1)*t*t*t*t+1)+e},easeInOutQuint:function(t,e,n,r){var i=n-e;return(t/=r/2)<1?i/2*t*t*t*t*t+e:i/2*((t-=2)*t*t*t*t+2)+e},easeInSine:function(t,e,n,r){var i=n-e;return-i*Math.cos(t/r*(Math.PI/2))+i+e},easeOutSine:function(t,e,n,r){return(n-e)*Math.sin(t/r*(Math.PI/2))+e},easeInOutSine:function(t,e,n,r){return-(n-e)/2*(Math.cos(Math.PI*t/r)-1)+e},easeInExpo:function(t,e,n,r){return 0==t?e:(n-e)*Math.pow(2,10*(t/r-1))+e},easeOutExpo:function(t,e,n,r){var i=n-e;return t==r?e+i:i*(1-Math.pow(2,-10*t/r))+e},easeInOutExpo:function(t,e,n,r){var i=n-e;return 0===t?e:t===r?e+i:(t/=r/2)<1?i/2*Math.pow(2,10*(t-1))+e:i/2*(2-Math.pow(2,-10*--t))+e},easeInCirc:function(t,e,n,r){return-(n-e)*(Math.sqrt(1-(t/=r)*t)-1)+e},easeOutCirc:function(t,e,n,r){return(n-e)*Math.sqrt(1-(t=t/r-1)*t)+e},easeInOutCirc:function(t,e,n,r){var i=n-e;return(t/=r/2)<1?-i/2*(Math.sqrt(1-t*t)-1)+e:i/2*(Math.sqrt(1-(t-=2)*t)+1)+e},easeInElastic:function(t,e,n,r){var i,o,a,c=n-e;return a=1.70158,0===t?e:1==(t/=r)?e+c:(o=0,o=.3*r,(i=c)<Math.abs(c)?(i=c,a=o/4):a=o/(2*Math.PI)*Math.asin(c/i),-i*Math.pow(2,10*(t-=1))*Math.sin((t*r-a)*(2*Math.PI)/o)+e)},easeOutElastic:function(t,e,n,r){var i,o,a,c=n-e;return a=1.70158,0===t?e:1==(t/=r)?e+c:(o=0,o=.3*r,(i=c)<Math.abs(c)?(i=c,a=o/4):a=o/(2*Math.PI)*Math.asin(c/i),i*Math.pow(2,-10*t)*Math.sin((t*r-a)*(2*Math.PI)/o)+c+e)},easeInOutElastic:function(t,e,n,r){var i,o,a,c=n-e;return a=1.70158,0===t?e:2==(t/=r/2)?e+c:(o=0,o=r*(.3*1.5),(i=c)<Math.abs(c)?(i=c,a=o/4):a=o/(2*Math.PI)*Math.asin(c/i),t<1?-(i*Math.pow(2,10*(t-=1))*Math.sin((t*r-a)*(2*Math.PI)/o)*.5)+e:i*Math.pow(2,-10*(t-=1))*Math.sin((t*r-a)*(2*Math.PI)/o)*.5+c+e)},easeInBack:function(t,e,n,r,i){return void 0===i&&(i=1.70158),(n-e)*(t/=r)*t*((i+1)*t-i)+e},easeOutBack:function(t,e,n,r,i){return void 0===i&&(i=1.70158),(n-e)*((t=t/r-1)*t*((i+1)*t+i)+1)+e},easeInOutBack:function(t,e,n,r,i){var o=n-e;return void 0===i&&(i=1.70158),(t/=r/2)<1?o/2*(t*t*((1+(i*=1.525))*t-i))+e:o/2*((t-=2)*t*((1+(i*=1.525))*t+i)+2)+e},easeInBounce:function(t,e,n,i){var o=n-e;return o-r.easeOutBounce(i-t,0,o,i)+e},easeOutBounce:function(t,e,n,r){var i=n-e;return(t/=r)<1/2.75?i*(7.5625*t*t)+e:t<2/2.75?i*(7.5625*(t-=1.5/2.75)*t+.75)+e:t<2.5/2.75?i*(7.5625*(t-=2.25/2.75)*t+.9375)+e:i*(7.5625*(t-=2.625/2.75)*t+.984375)+e},easeInOutBounce:function(t,e,n,i){var o=n-e;return t<i/2?.5*r.easeInBounce(2*t,0,o,i)+e:.5*r.easeOutBounce(2*t-i,0,o,i)+.5*o+e}};t.exports=r},function(t,e,n){t.exports=n(3)},function(t,e,n){"use strict";n.r(e),n.d(e,"ReactConfetti",function(){return B});var r,i,o,a,c=n(0),s=n.n(c),u=n(1),f=n.n(u);function l(t,e){return t+Math.random()*(e-t)}function h(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function p(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}(r=o||(o={}))[r.Circle=0]="Circle",r[r.Square=1]="Square",r[r.Strip=2]="Strip",(i=a||(a={}))[i.Positive=1]="Positive",i[i.Negative=-1]="Negative";var v=function(){var t,e;function n(t,e,r,i){(function(t,e){if(!(t instanceof e))throw TypeError("Cannot call a class as a function")})(this,n),p(this,"context",void 0),p(this,"radius",void 0),p(this,"x",void 0),p(this,"y",void 0),p(this,"w",void 0),p(this,"h",void 0),p(this,"vx",void 0),p(this,"vy",void 0),p(this,"shape",void 0),p(this,"angle",void 0),p(this,"angularSpin",void 0),p(this,"color",void 0),p(this,"rotateY",void 0),p(this,"rotationDirection",void 0),p(this,"getOptions",void 0),this.getOptions=e;var o=this.getOptions(),c=o.colors,s=o.initialVelocityX,u=o.initialVelocityY;this.context=t,this.x=r,this.y=i,this.w=l(5,20),this.h=l(5,20),this.radius=l(5,10),this.vx="number"==typeof s?l(-s,s):l(s.min,s.max),this.vy="number"==typeof u?l(-u,0):l(u.min,u.max),this.shape=Math.floor(0+3*Math.random()),this.angle=l(0,360)*Math.PI/180,this.angularSpin=l(-.2,.2),this.color=c[Math.floor(Math.random()*c.length)],this.rotateY=l(0,1),this.rotationDirection=l(0,1)?a.Positive:a.Negative}return t=[{key:"update",value:function(){var t=this.getOptions(),e=t.gravity,n=t.wind,r=t.friction,i=t.opacity,c=t.drawShape;this.x+=this.vx,this.y+=this.vy,this.vy+=e,this.vx+=n,this.vx*=r,this.vy*=r,this.rotateY>=1&&this.rotationDirection===a.Positive?this.rotationDirection=a.Negative:this.rotateY<=-1&&this.rotationDirection===a.Negative&&(this.rotationDirection=a.Positive);var s=.1*this.rotationDirection;if(this.rotateY+=s,this.angle+=this.angularSpin,this.context.save(),this.context.translate(this.x,this.y),this.context.rotate(this.angle),this.context.scale(1,this.rotateY),this.context.rotate(this.angle),this.context.beginPath(),this.context.fillStyle=this.color,this.context.strokeStyle=this.color,this.context.globalAlpha=i,this.context.lineCap="round",this.context.lineWidth=2,c&&"function"==typeof c)c.call(this,this.context);else switch(this.shape){case o.Circle:this.context.beginPath(),this.context.arc(0,0,this.radius,0,2*Math.PI),this.context.fill();break;case o.Square:this.context.fillRect(-this.w/2,-this.h/2,this.w,this.h);break;case o.Strip:this.context.fillRect(-this.w/6,-this.h/2,this.w/3,this.h)}this.context.closePath(),this.context.restore()}}],h(n.prototype,t),e&&h(n,e),n}();function d(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var y=function t(e,n){var r=this;(function(t,e){if(!(t instanceof e))throw TypeError("Cannot call a class as a function")})(this,t),d(this,"canvas",void 0),d(this,"context",void 0),d(this,"getOptions",void 0),d(this,"x",0),d(this,"y",0),d(this,"w",0),d(this,"h",0),d(this,"lastNumberOfPieces",0),d(this,"tweenInitTime",Date.now()),d(this,"particles",[]),d(this,"particlesGenerated",0),d(this,"removeParticleAt",function(t){r.particles.splice(t,1)}),d(this,"getParticle",function(){var t=l(r.x,r.w+r.x),e=l(r.y,r.h+r.y);return new v(r.context,r.getOptions,t,e)}),d(this,"animate",function(){var t=r.canvas,e=r.context,n=r.particlesGenerated,i=r.lastNumberOfPieces,o=r.getOptions(),a=o.run,c=o.recycle,s=o.numberOfPieces,u=o.debug,f=o.tweenFunction,l=o.tweenDuration;if(!a)return!1;var h=r.particles.length,p=c?h:n,v=Date.now();if(p<s){i!==s&&(r.tweenInitTime=v,r.lastNumberOfPieces=s);for(var d=r.tweenInitTime,y=f(v-d>l?l:Math.max(0,v-d),p,s,l),b=Math.round(y-p),g=0;g<b;g++)r.particles.push(r.getParticle());r.particlesGenerated+=b}return u&&(e.font="12px sans-serif",e.fillStyle="#333",e.textAlign="right",e.fillText("Particles: ".concat(h),t.width-10,t.height-20)),r.particles.forEach(function(e,n){e.update(),(e.y>t.height||e.y<-100||e.x>t.width+100||e.x<-100)&&(c&&p<=s?r.particles[n]=r.getParticle():r.removeParticleAt(n))}),h>0||p<s}),this.canvas=e;var i=this.canvas.getContext("2d");if(!i)throw Error("Could not get canvas context");this.context=i,this.getOptions=n};function b(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,r)}return n}function g(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?b(Object(n),!0).forEach(function(e){O(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}function w(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function O(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var m={width:"undefined"!=typeof window?window.innerWidth:300,height:"undefined"!=typeof window?window.innerHeight:200,numberOfPieces:200,friction:.99,wind:0,gravity:.1,initialVelocityX:4,initialVelocityY:10,colors:["#f44336","#e91e63","#9c27b0","#673ab7","#3f51b5","#2196f3","#03a9f4","#00bcd4","#009688","#4CAF50","#8BC34A","#CDDC39","#FFEB3B","#FFC107","#FF9800","#FF5722","#795548"],opacity:1,debug:!1,tweenFunction:f.a.easeInOutQuad,tweenDuration:5e3,recycle:!0,run:!0},P=function(){var t;function e(t,n){var r=this;(function(t,e){if(!(t instanceof e))throw TypeError("Cannot call a class as a function")})(this,e),O(this,"canvas",void 0),O(this,"context",void 0),O(this,"_options",void 0),O(this,"generator",void 0),O(this,"rafId",void 0),O(this,"setOptionsWithDefaults",function(t){var e={confettiSource:{x:0,y:0,w:r.canvas.width,h:0}};r._options=g(g(g({},e),m),t),Object.assign(r,t.confettiSource)}),O(this,"update",function(){var t=r.options,e=t.run,n=t.onConfettiComplete,i=r.canvas,o=r.context;e&&(o.fillStyle="white",o.clearRect(0,0,i.width,i.height)),r.generator.animate()?r.rafId=requestAnimationFrame(r.update):(n&&"function"==typeof n&&r.generator.particlesGenerated>0&&n.call(r,r),r._options.run=!1)}),O(this,"reset",function(){r.generator&&r.generator.particlesGenerated>0&&(r.generator.particlesGenerated=0,r.generator.particles=[],r.generator.lastNumberOfPieces=0)}),O(this,"stop",function(){r.options={run:!1},r.rafId&&(cancelAnimationFrame(r.rafId),r.rafId=void 0)}),this.canvas=t;var i=this.canvas.getContext("2d");if(!i)throw Error("Could not get canvas context");this.context=i,this.generator=new y(this.canvas,function(){return r.options}),this.options=n,this.update()}return w(e.prototype,[{key:"options",get:function(){return this._options},set:function(t){var e=this._options&&this._options.run,n=this._options&&this._options.recycle;this.setOptionsWithDefaults(t),this.generator&&(Object.assign(this.generator,this.options.confettiSource),"boolean"==typeof t.recycle&&t.recycle&&!1===n&&(this.generator.lastNumberOfPieces=this.generator.particles.length)),"boolean"==typeof t.run&&t.run&&!1===e&&this.update()}}]),t&&w(e,t),e}();function x(t){return(x="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function j(){return(j=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function S(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,r)}return n}function _(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?S(Object(n),!0).forEach(function(e){A(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):S(Object(n)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}function M(t,e){if(t){if("string"==typeof t)return I(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?I(t,e):void 0}}function I(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}function C(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function E(t,e){return(E=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function D(t){if(void 0===t)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function F(t){return(F=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function A(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var k=s.a.createRef(),N=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&E(t,e)}(o,t);var e,n,r,i=(e=function(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}(),function(){var t,n,r=F(o);if(e){var i=F(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return(t=n)&&("object"===x(t)||"function"==typeof t)?t:D(this)});function o(t){var e;!function(t,e){if(!(t instanceof e))throw TypeError("Cannot call a class as a function")}(this,o);for(var n=arguments.length,r=Array(n>1?n-1:0),a=1;a<n;a++)r[a-1]=arguments[a];return A(D(e=i.call.apply(i,[this,t].concat(r))),"canvas",s.a.createRef()),A(D(e),"confetti",void 0),e.canvas=t.canvasRef||k,e}return n=[{key:"componentDidMount",value:function(){if(this.canvas.current){var t=R(this.props)[0];this.confetti=new P(this.canvas.current,t)}}},{key:"componentDidUpdate",value:function(){var t=R(this.props)[0];this.confetti&&(this.confetti.options=t)}},{key:"componentWillUnmount",value:function(){this.confetti&&this.confetti.stop(),this.confetti=void 0}},{key:"render",value:function(){var t,e=function(t){if(Array.isArray(t))return t}(t=R(this.props))||function(t,e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var n=[],r=!0,i=!1,o=void 0;try{for(var a,c=t[Symbol.iterator]();!(r=(a=c.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){i=!0,o=t}finally{try{r||null==c.return||c.return()}finally{if(i)throw o}}return n}}(t,2)||M(t,2)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),n=e[0],r=e[1],i=_({zIndex:2,position:"absolute",pointerEvents:"none",top:0,left:0,bottom:0,right:0},r.style);return s.a.createElement("canvas",j({width:n.width,height:n.height,ref:this.canvas},r,{style:i}))}}],C(o.prototype,n),r&&C(o,r),o}(c.Component);function R(t){var e,n={},r={},i=[].concat(function(t){if(Array.isArray(t))return I(t)}(e=Object.keys(m))||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(e)||M(e)||function(){throw TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),["confettiSource","drawShape","onConfettiComplete"]),o=["canvasRef"];for(var a in t){var c=t[a];i.includes(a)?n[a]=c:o.includes(a)?o[a]=c:r[a]=c}return[n,r,{}]}A(N,"defaultProps",_({},m)),A(N,"displayName","ReactConfetti");var B=s.a.forwardRef(function(t,e){return s.a.createElement(N,j({canvasRef:e},t))});e.default=B}]).default)},7217:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.isNavigator=e.isBrowser=e.off=e.on=e.noop=void 0,e.noop=function(){},e.on=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];t&&t.addEventListener&&t.addEventListener.apply(t,e)},e.off=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];t&&t.removeEventListener&&t.removeEventListener.apply(t,e)},e.isBrowser="undefined"!=typeof window,e.isNavigator="undefined"!=typeof navigator},1176:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(70079);e.default=function(t){r.useEffect(t,[])}},4642:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(39889),i=n(70079),o=r.__importDefault(n(31922));e.default=function(t){var e=i.useRef(0),n=i.useState(t),r=n[0],a=n[1],c=i.useCallback(function(t){cancelAnimationFrame(e.current),e.current=requestAnimationFrame(function(){a(t)})},[]);return o.default(function(){cancelAnimationFrame(e.current)}),[r,c]}},31922:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(39889),i=n(70079),o=r.__importDefault(n(1176));e.default=function(t){var e=i.useRef(t);e.current=t,o.default(function(){return function(){return e.current()}})}},69119:function(t,e,n){"use strict";var r=n(39889),i=n(70079),o=r.__importDefault(n(4642)),a=n(7217);e.Z=function(t,e){void 0===t&&(t=1/0),void 0===e&&(e=1/0);var n=o.default({width:a.isBrowser?window.innerWidth:t,height:a.isBrowser?window.innerHeight:e}),r=n[0],c=n[1];return i.useEffect(function(){if(a.isBrowser){var t=function(){c({width:window.innerWidth,height:window.innerHeight})};return a.on(window,"resize",t),function(){a.off(window,"resize",t)}}},[]),r}}},function(t){t.O(0,[774,888,179],function(){return t(t.s=81071)}),_N_E=t.O()}]);