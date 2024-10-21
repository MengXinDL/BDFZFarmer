(()=>{"use strict";var e={184:(e,t,s)=>{var n=s(939),i=s(112),o=s(846);addEventListener("load",(()=>{let e=document.getElementById("money");setInterval((()=>{let t=0;n.UN.fields.forEach((e=>{t+=(0,n.kE)(e.x,e.y)})),n.UN.money+=t,e&&(e.innerText=`money: ${n.UN.money.toFixed(2)}\n${t.toFixed(2)}/s`)}),1e3)})),i.x.click=(e,t)=>{if(n.wT.scale<.5)return;if(!i.x.pressedElement||i.x.pressedElement!==n.p.gamecvs)return;let s=Math.floor((e-n.wT.x)/n.wT.scale/50),r=Math.floor((t-n.wT.y)/n.wT.scale/50);if(n.UN.fields.some((e=>e.x===s&&e.y===r)))return;let l=n.p.fields.find((e=>e.x===s&&e.y===r));l&&l.canBuy&&(n.D0.calcMoney(l)>n.UN.money?alert(`你钱不够\n需要${n.D0.calcMoney(l)}\n但你只有${n.UN.money.toFixed(2)}\n`):(n.UN.money-=n.D0.calcMoney(l),n.UN.fields.push({x:s,y:r,crop:n.Ce.corn}),(0,o.E)(),(0,o.X)()))},addEventListener("load",(()=>{const e=document.getElementById("save"),t=document.getElementById("load"),s=document.createElement("a"),i=document.createElement("input");i.type="file",i.addEventListener("change",(e=>{var t;const s=null===(t=e.target.files)||void 0===t?void 0:t[0];if(s){const e=new FileReader;e.onload=e=>{var t;const s=null===(t=e.target)||void 0===t?void 0:t.result;try{Object.assign(n.UN,JSON.parse((0,n.Pz)(s))),n.p.noise.seed(n.UN.seed),(0,o.E)(),(0,o.X)()}catch(e){console.error("加载失败\nError parsing JSON:",e)}},e.onerror=e=>{console.error("Error reading file:",e)},e.readAsText(s)}})),e&&t&&(e.onclick=()=>{const e=(0,n.K3)(JSON.stringify(n.UN)),t=new Blob([e],{type:"text/plain"}),i=URL.createObjectURL(t);s.href=i,s.download="farmer.save",s.click(),URL.revokeObjectURL(i)},t.onclick=()=>{i.click(),(0,o.E)(),(0,o.X)()})})),setInterval((()=>{try{fetch("../statics/version.json").then((e=>e.json())).then((e=>{e.version!==n.UN.version&&alert(`有新版本了\n${e.details.join("\n")}\n建议保存并刷新`)}))}catch(e){}}),6e4)},112:(e,t,s)=>{s.d(t,{x:()=>n});const n=new class{constructor(){this.pressed=!1,this.pressedElement=null,this.lastX=0,this.lastY=0,this.startX=0,this.startY=0,this._move=[],this._click=[],this._scroll=[],document.addEventListener("mousemove",(e=>{requestAnimationFrame((()=>{this._move.forEach((t=>{t(e.movementX,e.movementY)}))}))})),document.addEventListener("mousedown",(e=>{this.startX=e.offsetX,this.startY=e.offsetY,this.pressedElement=e.target,this.pressed=!0})),document.addEventListener("mouseup",(e=>{let t=e.offsetX-this.startX,s=e.offsetY-this.startY;Math.abs(t)<5&&Math.abs(s)<5&&this._click.forEach((t=>{t(e.offsetX,e.offsetY)})),this.pressedElement=null,this.pressed=!1,console.log("clicked")})),document.addEventListener("wheel",(e=>{this._scroll.forEach((t=>{t(e.deltaY,e.altKey)}))})),document.addEventListener("touchmove",(e=>{let t=e.touches[0].clientX-this.lastX,s=e.touches[0].clientY-this.lastY;this.lastX=e.touches[0].clientX,this.lastY=e.touches[0].clientY,requestAnimationFrame((()=>{this._move.forEach((e=>{e(t,s)}))}))})),document.addEventListener("touchstart",(e=>{this.lastX=e.touches[0].clientX,this.lastY=e.touches[0].clientY,this.startX=e.touches[0].clientX,this.startY=e.touches[0].clientY,this.pressedElement=e.target,this.pressed=!0})),document.addEventListener("touchend",(e=>{this.pressedElement=null,this.pressed=!1}))}set move(e){this._move.push(e)}set click(e){this._click.push(e)}set scroll(e){this._scroll.push(e)}}},846:(e,t,s)=>{s.d(t,{E:()=>o,X:()=>r});var n=s(939),i=s(112);function o(){n.p.fields=[];let e=50*n.wT.scale,t=1/Math.PI/2;for(let s=-1;s*e<n.p.gamecvs.width;s+=1)for(let i=-1;i*e<n.p.gamecvs.height;i+=1){let o=s-Math.floor(n.wT.x/e),r=i-Math.floor(n.wT.y/e),l=n.p.noise.perlin2(o*t,r*t);l=(l+1)/2,n.p.fields.push(new n.D0(o,r,l))}}function r(){const e=n.p.gamecvs.getContext("2d");let t=n.p.gamecvs.width,s=n.p.gamecvs.height;e.clearRect(0,0,t,s),n.wT.scale>.5?e.fillStyle="#539e3b":e.fillStyle="#294f1d",e.fillRect(0,0,t,s),e.font=10*n.wT.scale+"px sans-serif",n.p.fields.forEach((e=>e.render()))}addEventListener("load",(function(){n.p.gamecvs=document.getElementById("game"),n.wT.x=window.innerWidth/2,n.wT.y=window.innerHeight/2,n.wT.scale=2,n.p.gamecvs.width=window.innerWidth,n.p.gamecvs.height=window.innerHeight,n.p.gamecvs.getContext("2d").font=10*n.wT.scale+"px sans-serif",n.UN.fields.push({x:0,y:0,crop:0}),null!==(0,n.u1)("#ffb400")?(o(),r()):console.error("Invalid color")})),window.onresize=function(){n.p.gamecvs.width=window.innerWidth,n.p.gamecvs.height=window.innerHeight,o(),r()},i.x.move=(e,t)=>{i.x.pressed&&i.x.pressedElement&&i.x.pressedElement===n.p.gamecvs&&(n.wT.x+=e,n.wT.y+=t,o(),r())},i.x.scroll=e=>{let t=1+e/100;n.wT.scale*=t,n.wT.scale=Math.max(.1,n.wT.scale),n.wT.scale=Math.min(10,n.wT.scale),o(),r()}},939:(e,t,s)=>{var n;s.d(t,{Ce:()=>d,D0:()=>o,K3:()=>f,Pz:()=>u,UN:()=>r,kE:()=>h,p:()=>l,u1:()=>a,wT:()=>c}),function(e){e[e["#ffffff"]=0]="#ffffff",e[e["#d1a20a"]=1]="#d1a20a",e[e["#a35d1d"]=2]="#a35d1d",e[e["#a3330e"]=3]="#a3330e",e[e["#613400"]=4]="#613400"}(n||(n={}));class i{constructor(e,t,s,n,i,o=""){this.x=e,this.y=t,this.width=s,this.height=n,this.color=i,this.innerText=o}render(){let e=l.gamecvs.getContext("2d");if(null===e)return;if(e.fillStyle=this.color,c.scale>.5?e.fillRect(this.x+1,this.y+1,this.width-1,this.height-1):e.fillRect(this.x,this.y,this.width,this.height),""===this.innerText)return;const t=this.innerText.split("\n"),s=parseInt(e.font,10),n=t.length*s,i=t.map((t=>e.measureText(t).width)),o=this.height/2-n/2+s;e.fillStyle="#ffffff"===this.color?"#000000":"#ffffff",t.forEach(((t,n)=>{e.fillText(t,this.x+this.width/2-i[n]/2,this.y+o+n*s)}))}}class o{constructor(e,t,s,n=!1){this.unlocked=!1,this.canBuy=!1,this.x=e,this.y=t,this.fertility=s,this.basicColor="#ffb400";let a=r.fields.find((s=>s.x===e&&s.y===t));if(void 0!==a&&(this.fertility=h(a),this.unlocked=!0),void 0===a)for(const e of l.around){if(this.canBuy)break;r.fields.some((t=>t.x===e[0]+this.x&&t.y===e[1]+this.y&&(this.canBuy=!0,!0)))}let d="";c.scale>.5&&(this.unlocked?d=`肥沃度${(100*this.fertility).toFixed(0)}`:this.canBuy&&(d=`花费${o.calcMoney(this)}`)),this.box=new i(50*e*c.scale+c.x,50*t*c.scale+c.y,50*c.scale,50*c.scale,this.color(),d)}render(){!this.canBuy&&!this.unlocked&&c.scale<.5||this.box.render()}color(){return this.unlocked?n[Math.floor(5*this.fertility)]:this.canBuy?"#7f7f7f7f":"#0000007f"}static calcMoney(e,t,s){if("number"!=typeof e)return o.calcMoney(e.fertility,e.x,e.y);if(void 0===t||void 0===s)throw new Error("x or y is undefined when calcMoney");return Math.floor((e+1)*Math.pow(Math.pow(t,2)+Math.pow(s,2),1.3))}}const r={fields:[],money:0,seed:Math.floor(1e9*Math.random()),version:"0.2.7"},l={gamecvs:document.getElementById("game"),fields:[],noise:new window.Noise,around:[[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]]};l.noise=new window.Noise(r.seed),console.log(r.seed);const c={x:0,y:0,scale:1};function a(e){let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?{r:parseInt(t[1],16),g:parseInt(t[2],16),b:parseInt(t[3],16)}:null}function h(e,t){c.scale;let s=1/Math.PI/2;if("number"==typeof e){if(void 0===t)return 0;let n=l.noise.perlin2(e*s,t*s);return n=(n+1)/2,n}return"fertility"in e?e.fertility:h(e.x,e.y)}var d;function f(e){return btoa(unescape(encodeURIComponent(e)))}function u(e){return decodeURIComponent(escape(atob(e)))}!function(e){e[e.corn=0]="corn"}(d||(d={}))}},t={};function s(n){var i=t[n];if(void 0!==i)return i.exports;var o=t[n]={exports:{}};return e[n](o,o.exports,s),o.exports}s.d=(e,t)=>{for(var n in t)s.o(t,n)&&!s.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),s(184),s(939),s(846),s(112)})();