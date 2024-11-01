/*! For license information please see bundle.js.LICENSE.txt */
(()=>{"use strict";var t={n:e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},d:(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};const e=window.Noise;var n=t.n(e);const r=JSON.parse('{"r":"1.0.16","z":["- 优化了缩略图逻辑","- 增加了缩略图按钮，放大缩小按钮","- 现在不可看见未购买地区的类型，且价格只与距离有关"]}');function o(t){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o(t)}function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,a(r.key),r)}}function a(t){var e=function(t){if("object"!=o(t)||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var n=e.call(t,"string");if("object"!=o(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==o(e)?e:e+""}var c,u=function(){return t=function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.children=[],this.parents=[],this.isRoot=!0},(e=[{key:"appendChild",value:function(t){this.children.push(t),t.parents.push(this),t.isRoot=!1}},{key:"deleteChild",value:function(t){var e=this.children.indexOf(t);-1!==e&&(t.parents.splice(t.parents.indexOf(this),1),this.children.splice(e,1),t.isRoot=0===t.parents.length)}},{key:"root",get:function(){return this.isRoot?this:this.parents[0].root}}])&&i(t.prototype,e),Object.defineProperty(t,"prototype",{writable:!1}),t;var t,e}();function s(t){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s(t)}function l(t,e,n){return(e=d(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function f(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,d(r.key),r)}}function h(t,e,n){return e&&f(t.prototype,e),n&&f(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}function d(t){var e=function(t){if("object"!=s(t)||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var n=e.call(t,"string");if("object"!=s(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==s(e)?e:e+""}!function(t){t[t.None=0]="None",t[t.Cockscomb=1]="Cockscomb",t[t.BigCockscomb=2]="BigCockscomb",t[t.GoldenCockscomb=3]="GoldenCockscomb"}(c||(c={}));var y=h((function t(e,n,r,o,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.name=e,this.moisture=n,this.basicOutput=r,this.foreground=o,this.introduction=i,this.node=new u})),v=l(l(l(l({},c.None,new y("无",{lo:NaN,mid:NaN,hi:NaN},0,[],"")),c.Cockscomb,new y("狗尾草",{lo:0,mid:.4,hi:1},.5,[],"属禾本科，狗尾草属一年生草本植物。根为须状，高大植株具支持根。秆直立或基部膝曲，高10-100厘米，基部径达3-7毫米。叶鞘松弛，无毛或疏具柔毛或疣毛，边缘具较长的密绵毛状纤毛；有祛风明目，清热利尿的作用。生于海拔4000米以下的荒野、道旁，为旱地作物常见的一种杂草。")),c.BigCockscomb,new y("大狗尾草",{lo:-2,mid:.75,hi:1.3},.6,[c.Cockscomb],"是禾本科狗尾草属一年生植物。大狗尾草通常具支柱根；秆粗壮而高大，光滑无毛；叶鞘松弛，叶片线状披针形；圆锥花序紧缩呈圆柱状，顶端尖，花柱基部分离；颖果椭圆形，顶端尖。花果期7-10月。大狗尾草因其穗形得名。")),c.GoldenCockscomb,new y("金色狗尾草",{lo:-5,mid:.3,hi:1},.8,[c.BigCockscomb],"是一年生草本植物；单生或丛生。秆高可达90厘米，光滑无毛，叶鞘下部扁压具脊，上部圆形，光滑无毛，叶片线状披针形或狭披针形，上面粗糙，下面光滑，圆锥花序紧密呈圆柱状或狭圆锥状，直立，主轴具短细柔毛，刚毛金黄色或稍带褐色，粗糙，第一颖宽卵形或卵形，第二颖宽卵形，第一外稃与小穗等长或微短，第二小花两性，外稃革质，6-10月开花结果。"));function m(t,e){return e}function p(t){return p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},p(t)}function g(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=b(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,c=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return a=t.done,t},e:function(t){c=!0,i=t},f:function(){try{a||null==n.return||n.return()}finally{if(c)throw i}}}}function b(t,e){if(t){if("string"==typeof t)return w(t,e);var n={}.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?w(t,e):void 0}}function w(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}function x(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function E(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,S(r.key),r)}}function k(t,e,n){return e&&E(t.prototype,e),n&&E(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}function S(t){var e=function(t){if("object"!=p(t)||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var n=e.call(t,"string");if("object"!=p(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==p(e)?e:e+""}Object.values(v).forEach((function(t){return t.foreground.forEach((function(e){v[e].node.appendChild(t.node)}))}));var j={Unknown:{color:"#000000",innerText:"未知",range:[NaN,NaN]},Desert:{color:"#ffd68f",innerText:"沙漠",range:[0,.1]},Saline:{color:"#ffffff",innerText:"盐碱地",range:[.1,.3]},Barren:{color:"#c29c0d",innerText:"贫瘠地",range:[.3,.5]},Regular:{color:"#b56605",innerText:"普通土地",range:[.5,.7]},Nunja:{color:"#7d710a",innerText:"沼泽地",range:[.7,.9]},Lake:{color:"#0085e3",innerText:"湖泊",range:[.9,1]}};function L(t){for(var e in j){var n=j[e];if(n.range[0]<=t&&n.range[1]>t)return n}return j.Unknown}var O=function(){return k((function t(e,n,r,o,i){var a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"";x(this,t),this.x=e,this.y=n,this.width=r,this.height=o,this.color=i,this.innerText=a}),[{key:"render",value:function(){var t=this,e=_.gamecvs.getContext("2d");if(null!==e&&(e.fillStyle=this.color,M.scale,e.fillRect(this.x,this.y,this.width,this.height),""!==this.innerText)){var n=this.innerText.split("\n"),r=parseInt(e.font,10),o=n.length*r,i=n.map((function(t){return e.measureText(t).width})),a=this.height/2-o/2+r;e.fillStyle="#ffffff"===this.color?"#000000":"#ffffff",n.forEach((function(n,o){e.fillText(n,t.x+t.width/2-i[o]/2,t.y+a+o*r)}))}}}])}(),N=function(){function t(e,n,r){x(this,t),this.unlocked=!1,this.x=e,this.y=n,this.moisture=r,this.basicColor="#ffb400";var o=P.fields["".concat(e,",").concat(n)];void 0!==o&&(this.moisture=o.moisture,this.unlocked=o.unlocked);var i="";if(M.scale>25)if(this.unlocked)i=L(this.moisture).innerText;else{var a=t.calcMoney(this);i=a<Math.pow(10,5)?"花费".concat(a):a<Math.pow(10,7)?"花费".concat(Math.floor(a/Math.pow(10,3)),"k"):"花费".concat(Math.floor(a/Math.pow(10,6)),"M")}var c=I(this.x,this.y);this.box=new O(c.x,c.y,M.scale,M.scale,this.color(),i)}return k(t,[{key:"render",value:function(){this.box.render()}},{key:"color",value:function(){return this.unlocked?L(this.moisture).color:"#ffffff7f"}}],[{key:"calcMoney",value:function(e,n,r){if("number"!=typeof e)return t.calcMoney(e.moisture,e.x,e.y);if(void 0===n||void 0===r)throw new Error("x or y is undefined when calcMoney");return Math.floor(Math.pow(n*n+r*r,1.4))}}])}(),T=r.r,P={fields:{},money:0,seed:Math.floor(1e9*Math.random()),version:T,enableCrops:[c.None,c.Cockscomb]},_={gamecvs:document.getElementById("game"),fields:[],noise:new(n()),around:[[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]],atlas:{canvas:document.createElement("canvas"),ctx:null,edge:{maxX:0,maxY:0,minX:0,minY:0},enable:!1}};_.noise=new(n())(P.seed),console.log(P.seed);var M={x:0,y:0,scale:1};function C(t,e){var n=1/Math.PI/2;if("number"==typeof t){if(void 0===e)return 0;var r=_.noise.perlin2(t*n,e*n);return(r+1)/2}return t.moisture}function D(t){var e,n,r,o=JSON.parse(JSON.stringify(t));_.noise.seed(o.seed||P.seed),console.log("readed version ".concat(o.version?o.version:"unknown")),console.log("current version ".concat(T)),e=o.version==T,o.version=T;for(var i=0,a=Object.entries(t);i<a.length;i++){var u=(n=a[i],r=2,function(t){if(Array.isArray(t))return t}(n)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i,a,c=[],u=!0,s=!1;try{if(i=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=i.call(n)).done)&&(c.push(r.value),c.length!==e);u=!0);}catch(t){s=!0,o=t}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(s)throw o}}return c}}(n,r)||b(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),s=u[0],l=u[1];if("fields"===s){if(l instanceof Array){var f,h={},d=g(l);try{for(d.s();!(f=d.n()).done;){var y=f.value;h["".concat(y.x,",").concat(y.y)]=y}}catch(t){d.e(t)}finally{d.f()}o[s]=h}for(var v in o[s])if("moisture"in o[s][v]&&void 0!==o[s][v].moisture||(o[s][v].moisture=C(o[s][v].x,o[s][v].y)),"unlocked"in o[s][v]&&void 0!==o[s][v].unlocked||(o[s][v].unlocked=!0),"crop"in o[s][v]&&void 0!==o[s][v].crop||(o[s][v].crop=c.None),o[s][v].unlocked){var m,p=g(_.around);try{for(p.s();!(m=p.n()).done;){var w=m.value,x=w[0]+o[s][v].x,E=w[1]+o[s][v].y;o[s]["".concat(x,",").concat(E)]||(o[s]["".concat(x,",").concat(E)]={x,y:E,crop:c.None,unlocked:!1,moisture:C(x,E)})}}catch(t){p.e(t)}finally{p.f()}}}}return Object.assign(P,o),e}function I(t,e){return{x:t*M.scale+M.x+window.innerWidth/2,y:e*M.scale+M.y+window.innerHeight/2}}function Y(t){return Y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Y(t)}function A(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,X(r.key),r)}}function X(t){var e=function(t){if("object"!=Y(t)||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var n=e.call(t,"string");if("object"!=Y(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==Y(e)?e:e+""}var B=new(function(){return t=function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.pressed=!1,this.pressedElement=null,this.curentElement=null,this.lastX=0,this.lastY=0,this.startX=0,this.startY=0,this.startDistance=0,this.lastDistance=0,this._move=[],this._click=[],this._scroll=[],this.initMouse(),this.initTouch()},e=[{key:"initMouse",value:function(){var t=this;document.addEventListener("mousemove",(function(e){t.curentElement=e.target,requestAnimationFrame((function(){t._move.forEach((function(t){t(e.movementX,e.movementY)}))}))})),document.addEventListener("mousedown",(function(e){t.startX=e.offsetX,t.startY=e.offsetY,t.pressedElement=e.target,t.pressed=!0})),document.addEventListener("mouseup",(function(e){var n=e.offsetX-t.startX,r=e.offsetY-t.startY;Math.abs(n)<5&&Math.abs(r)<5&&t._click.forEach((function(t){t(e.offsetX,e.offsetY)})),t.pressedElement=null,t.pressed=!1})),document.addEventListener("wheel",(function(e){t._scroll.forEach((function(t){t(1+e.deltaY/100,e.altKey)}))}))}},{key:"initTouch",value:function(){var t=this;document.addEventListener("touchmove",(function(e){t.curentElement=e.target;var n=e.touches[0].clientX-t.lastX,r=e.touches[0].clientY-t.lastY;t.lastX=e.touches[0].clientX,t.lastY=e.touches[0].clientY;var o=t.getTouchDistance(e)-t.lastDistance;t.lastDistance=t.getTouchDistance(e),isNaN(o)?requestAnimationFrame((function(){t._move.forEach((function(t){t(n,r)}))})):Math.abs(o)<5&&requestAnimationFrame((function(){t._scroll.forEach((function(e){e((o+t.startDistance)/t.startDistance,!1)}))}))})),document.addEventListener("touchstart",(function(e){t.curentElement=e.target,t.lastX=e.touches[0].clientX,t.lastY=e.touches[0].clientY,t.startX=e.touches[0].clientX,t.startY=e.touches[0].clientY,t.startDistance=t.getTouchDistance(e),t.lastDistance=t.getTouchDistance(e),t.pressedElement=e.target,t.pressed=!0})),document.addEventListener("touchend",(function(e){t.curentElement=null,t.pressedElement=null,t.pressed=!1}))}},{key:"getTouchDistance",value:function(t){if(t.touches.length<2)return NaN;var e=t.touches[0],n=t.touches[1];return Math.hypot(n.clientX-e.clientX,n.clientY-e.clientY)}},{key:"move",set:function(t){this._move.push(t)}},{key:"click",set:function(t){this._click.push(t)}},{key:"scroll",get:function(){var t=this;return function(e,n){t._scroll.forEach((function(t){t(1+e/100,n)}))}},set:function(t){this._scroll.push(t)}}],e&&A(t.prototype,e),Object.defineProperty(t,"prototype",{writable:!1}),t;var t,e}());const F=window.React,G=window.ReactDOM;var R={};function z(t){var e=t.title,n=t.content,r=t.children;return F.createElement("div",{className:"notice"},F.createElement("div",{className:"notice-title"},F.createElement("button",{style:{background:"rgba(0,0,0,0.5)",border:"none",color:"white",height:"100%",aspectRatio:"1/1",fontSize:"20px"},onMouseOver:function(t){t.currentTarget.style.backgroundColor="rgba(255,0,0,0.5)"},onMouseOut:function(t){t.currentTarget.style.backgroundColor="rgba(0,0,0,0.5)"},onClick:function(t){!function(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];R[t]&&R[t].forEach((function(t){return t.callback.apply(t,n)}))}("notice-close")}},"×"),F.createElement("span",{style:{color:"white",textAlign:"center",width:"100%",fontSize:"20px",fontWeight:"bold"}},e)),F.createElement("div",{className:"notice-content"},F.createElement("p",null,n),r))}const U=function(t,e){var n=(0,G.createRoot)(document.getElementById("root"));"string"==typeof e.text&&(e.text=[e.text]);var r=e.text?e.text.map((function(t,e){return F.createElement("p",{key:e},t)})):[];void 0!==e.children&&(e.children instanceof Array?e.children.map((function(t,e){return null==t.key?e.toString():t.key}),[]):(e.children.key=r.length.toString(),r.push(e.children))),n.render(F.createElement(z,{title:t,content:""},r));var o=function(t,e){R[t]=R[t]||[];var n={callback:e,id:Date.now()};return R[t].push({id:n.id,callback:n.callback}),n}("notice-close",(function(){n.unmount(),function(t){for(var e in R)R[e]=R[e].filter((function(e){return e.id!==t}))}(o.id)}))};function W(t){return W="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},W(t)}function H(){H=function(){return e};var t,e={},n=Object.prototype,r=n.hasOwnProperty,o=Object.defineProperty||function(t,e,n){t[e]=n.value},i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",c=i.asyncIterator||"@@asyncIterator",u=i.toStringTag||"@@toStringTag";function s(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(t){s=function(t,e,n){return t[e]=n}}function l(t,e,n,r){var i=e&&e.prototype instanceof p?e:p,a=Object.create(i.prototype),c=new P(r||[]);return o(a,"_invoke",{value:L(t,n,c)}),a}function f(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}e.wrap=l;var h="suspendedStart",d="suspendedYield",y="executing",v="completed",m={};function p(){}function g(){}function b(){}var w={};s(w,a,(function(){return this}));var x=Object.getPrototypeOf,E=x&&x(x(_([])));E&&E!==n&&r.call(E,a)&&(w=E);var k=b.prototype=p.prototype=Object.create(w);function S(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function j(t,e){function n(o,i,a,c){var u=f(t[o],t,i);if("throw"!==u.type){var s=u.arg,l=s.value;return l&&"object"==W(l)&&r.call(l,"__await")?e.resolve(l.__await).then((function(t){n("next",t,a,c)}),(function(t){n("throw",t,a,c)})):e.resolve(l).then((function(t){s.value=t,a(s)}),(function(t){return n("throw",t,a,c)}))}c(u.arg)}var i;o(this,"_invoke",{value:function(t,r){function o(){return new e((function(e,o){n(t,r,e,o)}))}return i=i?i.then(o,o):o()}})}function L(e,n,r){var o=h;return function(i,a){if(o===y)throw Error("Generator is already running");if(o===v){if("throw"===i)throw a;return{value:t,done:!0}}for(r.method=i,r.arg=a;;){var c=r.delegate;if(c){var u=O(c,r);if(u){if(u===m)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(o===h)throw o=v,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);o=y;var s=f(e,n,r);if("normal"===s.type){if(o=r.done?v:d,s.arg===m)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(o=v,r.method="throw",r.arg=s.arg)}}}function O(e,n){var r=n.method,o=e.iterator[r];if(o===t)return n.delegate=null,"throw"===r&&e.iterator.return&&(n.method="return",n.arg=t,O(e,n),"throw"===n.method)||"return"!==r&&(n.method="throw",n.arg=new TypeError("The iterator does not provide a '"+r+"' method")),m;var i=f(o,e.iterator,n.arg);if("throw"===i.type)return n.method="throw",n.arg=i.arg,n.delegate=null,m;var a=i.arg;return a?a.done?(n[e.resultName]=a.value,n.next=e.nextLoc,"return"!==n.method&&(n.method="next",n.arg=t),n.delegate=null,m):a:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,m)}function N(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function T(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function P(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(N,this),this.reset(!0)}function _(e){if(e||""===e){var n=e[a];if(n)return n.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,i=function n(){for(;++o<e.length;)if(r.call(e,o))return n.value=e[o],n.done=!1,n;return n.value=t,n.done=!0,n};return i.next=i}}throw new TypeError(W(e)+" is not iterable")}return g.prototype=b,o(k,"constructor",{value:b,configurable:!0}),o(b,"constructor",{value:g,configurable:!0}),g.displayName=s(b,u,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===g||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,b):(t.__proto__=b,s(t,u,"GeneratorFunction")),t.prototype=Object.create(k),t},e.awrap=function(t){return{__await:t}},S(j.prototype),s(j.prototype,c,(function(){return this})),e.AsyncIterator=j,e.async=function(t,n,r,o,i){void 0===i&&(i=Promise);var a=new j(l(t,n,r,o),i);return e.isGeneratorFunction(n)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},S(k),s(k,u,"Generator"),s(k,a,(function(){return this})),s(k,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),n=[];for(var r in e)n.push(r);return n.reverse(),function t(){for(;n.length;){var r=n.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},e.values=_,P.prototype={constructor:P,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(T),!e)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var n=this;function o(r,o){return c.type="throw",c.arg=e,n.next=r,o&&(n.method="next",n.arg=t),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var u=r.call(a,"catchLoc"),s=r.call(a,"finallyLoc");if(u&&s){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!s)throw Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,m):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),m},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),T(n),m}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;T(n)}return o}}throw Error("illegal catch attempt")},delegateYield:function(e,n,r){return this.delegate={iterator:_(e),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=t),m}},e}function J(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,q(r.key),r)}}function q(t){var e=function(t){if("object"!=W(t)||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var n=e.call(t,"string");if("object"!=W(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==W(e)?e:e+""}var $=function(t,e,n,r){return new(n||(n=Promise))((function(o,i){function a(t){try{u(r.next(t))}catch(t){i(t)}}function c(t){try{u(r.throw(t))}catch(t){i(t)}}function u(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,c)}u((r=r.apply(t,e||[])).next())}))};const K={save:new(function(){return t=function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.dbName=e,this.objectStoreName=n,this.db=null},(e=[{key:"openDB",value:function(){return $(this,void 0,void 0,H().mark((function t(){var e=this;return H().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(this.db){t.next=4;break}return t.next=3,new Promise((function(t,n){var r=indexedDB.open(e.dbName,1);r.onupgradeneeded=function(){r.result.createObjectStore(e.objectStoreName,{keyPath:"key"})},r.onsuccess=function(){t(r.result)},r.onerror=function(){n(r.error)}}));case 3:this.db=t.sent;case 4:return t.abrupt("return",this.db);case 5:case"end":return t.stop()}}),t,this)})))}},{key:"addData",value:function(t,e){return $(this,void 0,void 0,H().mark((function n(){var r,o,i,a;return H().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.openDB();case 2:r=n.sent,o=r.transaction([this.objectStoreName],"readwrite"),i=o.objectStore(this.objectStoreName),(a=i.add({key:t,value:e})).onsuccess=function(){console.log("Data added successfully: ".concat(t," = ").concat(e))},a.onerror=function(){console.error(a.error)};case 8:case"end":return n.stop()}}),n,this)})))}},{key:"deleteData",value:function(t){return $(this,void 0,void 0,H().mark((function e(){var n,r,o,i;return H().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.openDB();case 2:n=e.sent,r=n.transaction([this.objectStoreName],"readwrite"),o=r.objectStore(this.objectStoreName),(i=o.delete(t)).onsuccess=function(){console.log("Data deleted successfully: ".concat(t))},i.onerror=function(){console.error(i.error)};case 8:case"end":return e.stop()}}),e,this)})))}},{key:"updateData",value:function(t,e){return $(this,void 0,void 0,H().mark((function n(){var r,o,i,a;return H().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.openDB();case 2:r=n.sent,o=r.transaction([this.objectStoreName],"readwrite"),i=o.objectStore(this.objectStoreName),(a=i.put({key:t,value:e})).onsuccess=function(){console.log("Data updated successfully: ".concat(t," = ").concat(e))},a.onerror=function(){console.error(a.error)};case 8:case"end":return n.stop()}}),n,this)})))}},{key:"getData",value:function(t){return $(this,void 0,void 0,H().mark((function e(){var n,r,o,i;return H().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.openDB();case 2:return n=e.sent,r=n.transaction([this.objectStoreName],"readonly"),o=r.objectStore(this.objectStoreName),i=o.get(t),e.abrupt("return",new Promise((function(e,n){i.onsuccess=function(){var n=i.result;if(!n||!n.value)return console.log("Data not found: ".concat(t)),void e(null);console.log("Data retrieved successfully: ".concat(t," = ").concat(n)),e(n.value)},i.onerror=function(){n(i.error)}})));case 7:case"end":return e.stop()}}),e,this)})))}}])&&J(t.prototype,e),Object.defineProperty(t,"prototype",{writable:!1}),t;var t,e}())("save","saves")};function Q(t){return Q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Q(t)}function V(){V=function(){return e};var t,e={},n=Object.prototype,r=n.hasOwnProperty,o=Object.defineProperty||function(t,e,n){t[e]=n.value},i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",c=i.asyncIterator||"@@asyncIterator",u=i.toStringTag||"@@toStringTag";function s(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(t){s=function(t,e,n){return t[e]=n}}function l(t,e,n,r){var i=e&&e.prototype instanceof p?e:p,a=Object.create(i.prototype),c=new P(r||[]);return o(a,"_invoke",{value:L(t,n,c)}),a}function f(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}e.wrap=l;var h="suspendedStart",d="suspendedYield",y="executing",v="completed",m={};function p(){}function g(){}function b(){}var w={};s(w,a,(function(){return this}));var x=Object.getPrototypeOf,E=x&&x(x(_([])));E&&E!==n&&r.call(E,a)&&(w=E);var k=b.prototype=p.prototype=Object.create(w);function S(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function j(t,e){function n(o,i,a,c){var u=f(t[o],t,i);if("throw"!==u.type){var s=u.arg,l=s.value;return l&&"object"==Q(l)&&r.call(l,"__await")?e.resolve(l.__await).then((function(t){n("next",t,a,c)}),(function(t){n("throw",t,a,c)})):e.resolve(l).then((function(t){s.value=t,a(s)}),(function(t){return n("throw",t,a,c)}))}c(u.arg)}var i;o(this,"_invoke",{value:function(t,r){function o(){return new e((function(e,o){n(t,r,e,o)}))}return i=i?i.then(o,o):o()}})}function L(e,n,r){var o=h;return function(i,a){if(o===y)throw Error("Generator is already running");if(o===v){if("throw"===i)throw a;return{value:t,done:!0}}for(r.method=i,r.arg=a;;){var c=r.delegate;if(c){var u=O(c,r);if(u){if(u===m)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(o===h)throw o=v,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);o=y;var s=f(e,n,r);if("normal"===s.type){if(o=r.done?v:d,s.arg===m)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(o=v,r.method="throw",r.arg=s.arg)}}}function O(e,n){var r=n.method,o=e.iterator[r];if(o===t)return n.delegate=null,"throw"===r&&e.iterator.return&&(n.method="return",n.arg=t,O(e,n),"throw"===n.method)||"return"!==r&&(n.method="throw",n.arg=new TypeError("The iterator does not provide a '"+r+"' method")),m;var i=f(o,e.iterator,n.arg);if("throw"===i.type)return n.method="throw",n.arg=i.arg,n.delegate=null,m;var a=i.arg;return a?a.done?(n[e.resultName]=a.value,n.next=e.nextLoc,"return"!==n.method&&(n.method="next",n.arg=t),n.delegate=null,m):a:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,m)}function N(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function T(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function P(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(N,this),this.reset(!0)}function _(e){if(e||""===e){var n=e[a];if(n)return n.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,i=function n(){for(;++o<e.length;)if(r.call(e,o))return n.value=e[o],n.done=!1,n;return n.value=t,n.done=!0,n};return i.next=i}}throw new TypeError(Q(e)+" is not iterable")}return g.prototype=b,o(k,"constructor",{value:b,configurable:!0}),o(b,"constructor",{value:g,configurable:!0}),g.displayName=s(b,u,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===g||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,b):(t.__proto__=b,s(t,u,"GeneratorFunction")),t.prototype=Object.create(k),t},e.awrap=function(t){return{__await:t}},S(j.prototype),s(j.prototype,c,(function(){return this})),e.AsyncIterator=j,e.async=function(t,n,r,o,i){void 0===i&&(i=Promise);var a=new j(l(t,n,r,o),i);return e.isGeneratorFunction(n)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},S(k),s(k,u,"Generator"),s(k,a,(function(){return this})),s(k,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),n=[];for(var r in e)n.push(r);return n.reverse(),function t(){for(;n.length;){var r=n.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},e.values=_,P.prototype={constructor:P,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(T),!e)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var n=this;function o(r,o){return c.type="throw",c.arg=e,n.next=r,o&&(n.method="next",n.arg=t),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var u=r.call(a,"catchLoc"),s=r.call(a,"finallyLoc");if(u&&s){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!s)throw Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,m):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),m},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),T(n),m}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;T(n)}return o}}throw Error("illegal catch attempt")},delegateYield:function(e,n,r){return this.delegate={iterator:_(e),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=t),m}},e}function Z(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(t){if("string"==typeof t)return tt(t,e);var n={}.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?tt(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,c=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return a=t.done,t},e:function(t){c=!0,i=t},f:function(){try{a||null==n.return||n.return()}finally{if(c)throw i}}}}function tt(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}function et(){_.atlas.ctx=_.atlas.canvas.getContext("2d");var t=_.atlas.ctx,e=_.atlas.edge;for(var n in P.fields){var r=P.fields[n];e.maxX=Math.max(e.maxX,r.x),e.maxY=Math.max(e.maxY,r.y),e.minX=Math.min(e.minX,r.x),e.minY=Math.min(e.minY,r.y)}for(var o in _.atlas.canvas.width=e.maxX-e.minX+1,_.atlas.canvas.height=e.maxY-e.minY+1,t.fillStyle="#294f1d",t.fillRect(0,0,_.atlas.canvas.width,_.atlas.canvas.height),P.fields){var i=P.fields[o],a=i.x-e.minX,c=i.y-e.minY;i.unlocked?t.fillStyle=L(i.moisture).color:t.fillStyle="#ffffff7f",t.fillRect(a,c,1,1)}}function nt(){var t=_.gamecvs.getContext("2d"),e=_.gamecvs.width,n=_.gamecvs.height;if(t.clearRect(0,0,e,n),t.fillStyle="#294f1d",t.fillRect(0,0,e,n),t.font="".concat(M.scale/5,"px sans-serif"),_.atlas.enable){var r=I(_.atlas.edge.minX,_.atlas.edge.minY),o=r.x,i=r.y;t.drawImage(_.atlas.canvas,0,0,_.atlas.canvas.width,_.atlas.canvas.height,o,i,_.atlas.canvas.width*M.scale,_.atlas.canvas.height*M.scale)}else!function(){_.fields=[];for(var t=M.scale,e=(Math.PI,-1);e*t<_.gamecvs.width;e+=1)for(var n=-1;n*t<_.gamecvs.height;n+=1){var r=e-Math.floor((M.x+_.gamecvs.width/2)/t),o=n-Math.floor((M.y+_.gamecvs.height/2)/t);void 0!==P.fields["".concat(r,",").concat(o)]&&_.fields.push(new N(r,o,P.fields["".concat(r,",").concat(o)].moisture))}}(),_.fields.forEach((function(t){return t.render()}))}function rt(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}addEventListener("load",(function(){_.gamecvs=document.getElementById("game"),function(){var t,e,n,o;t=this,e=void 0,n=void 0,o=V().mark((function t(){var e,n,o,i,a,u;return V().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return M.x=0,M.y=0,M.scale=100,_.gamecvs.width=window.innerWidth,_.gamecvs.height=window.innerHeight,(e=_.gamecvs.getContext("2d")).font="".concat(M.scale/5,"px sans-serif"),e.imageSmoothingEnabled=!1,t.prev=8,t.next=11,K.save.getData("save");case 11:n=t.sent,t.next=17;break;case 14:t.prev=14,t.t0=t.catch(8),n=null;case 17:if(localStorage.getItem("save"))o=localStorage.getItem("save"),D(JSON.parse(decodeURIComponent(escape(atob(o)))))||U("新版本：".concat(r.r,"!"),{text:r.z}),K.save.addData("save",P),localStorage.removeItem("save");else if(null!==n)D(n)||U("新版本：".concat(r.r,"!"),{text:r.z});else{P.fields["0,0"]={x:0,y:0,crop:c.None,unlocked:!0,moisture:C(0,0)},i=Z(_.around);try{for(i.s();!(a=i.n()).done;)u=a.value,P.fields["".concat(u[0],",").concat(u[1])]={x:u[0],y:u[1],crop:c.None,unlocked:!1,moisture:C(u[0],u[1])}}catch(t){i.e(t)}finally{i.f()}K.save.addData("save",P)}et(),nt();case 20:case"end":return t.stop()}}),t,null,[[8,14]])})),new(n||(n=Promise))((function(r,i){function a(t){try{u(o.next(t))}catch(t){i(t)}}function c(t){try{u(o.throw(t))}catch(t){i(t)}}function u(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,c)}u((o=o.apply(t,e||[])).next())}))}()})),window.onresize=function(){_.gamecvs.width=window.innerWidth,_.gamecvs.height=window.innerHeight,nt()},B.move=function(t,e){B.pressed&&B.pressedElement&&B.pressedElement===_.gamecvs&&(M.x+=t,M.y+=e,nt())},B.scroll=function(t,e){if((e||!B.pressed||B.pressedElement===_.gamecvs)&&(e||B.curentElement===_.gamecvs)){var n=1/M.scale;M.scale*=t,M.scale=Math.max(5,M.scale),M.scale=Math.min(500,M.scale),n*=M.scale,M.x*=n,M.y*=n,_.atlas.enable=M.scale<25,nt()}},addEventListener("load",(function(){var t=document.getElementById("bigger"),e=document.getElementById("smaller");t.onclick=function(){B.scroll(50,!0)},e.onclick=function(){B.scroll(-33,!0)}})),addEventListener("load",(function(){var t=document.getElementById("money");setInterval((function(){var e=0;for(var n in P.fields)P.fields[n].unlocked&&(e+=m(P.fields[n].crop,P.fields[n].moisture));P.money+=e,t&&(t.innerText="money: ".concat(P.money.toFixed(2),"\n").concat(e.toFixed(2),"/s"))}),1e3)})),B.click=function(t,e){if(!(M.scale<25)&&B.pressedElement&&B.pressedElement===_.gamecvs){var n=function(t,e){return{x:Math.floor((t-M.x-window.innerWidth/2)/M.scale),y:Math.floor((e-M.y-window.innerHeight/2)/M.scale)}}(t,e),r=n.x,o=n.y;console.log(r,o);var i=P.fields["".concat(r,",").concat(o)];void 0!==P.fields["".concat(r,",").concat(o)]&&(i.unlocked?(i.crop=c.Cockscomb,U("区块信息",{text:["坐标：".concat(r,",").concat(o),"含水量：".concat(i.moisture.toFixed(2).slice(2)),"土地类型：".concat(L(i.moisture).innerText),"作物：".concat(v[i.crop].name),"每秒收入：".concat(m(i.crop,i.moisture).toFixed(2))],children:[React.createElement("button",{onClick:function(){return console.log(1)}},"种地")]})):function(){var t=N.calcMoney(i.moisture,i.x,i.y);if(t>P.money)U("你钱不够",{text:["需要".concat(t.toFixed(2)),"但你只有".concat(P.money.toFixed(2))]});else{P.money-=t,P.fields["".concat(r,",").concat(o)].unlocked=!0;var e,n=function(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(t){if("string"==typeof t)return rt(t,e);var n={}.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?rt(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,c=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return a=t.done,t},e:function(t){c=!0,i=t},f:function(){try{a||null==n.return||n.return()}finally{if(c)throw i}}}}(_.around);try{for(n.s();!(e=n.n()).done;){var a=e.value,u=a[0]+r,s=a[1]+o;P.fields["".concat(u,",").concat(s)]=P.fields["".concat(u,",").concat(s)]||{x:u,y:s,crop:c.None,moisture:C(a[0],a[1]),unlocked:!1}}}catch(t){n.e(t)}finally{n.f()}et(),nt()}}())}},addEventListener("load",(function(){document.getElementById("home").onclick=function(){M.scale=100,M.x=0,M.y=0,nt()},document.getElementById("thumbnail").onclick=function(){var t=5/M.scale;M.scale=5,M.x*=t,M.y*=t,nt()}}))})();