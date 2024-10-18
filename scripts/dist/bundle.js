(()=>{"use strict";var e={184:(e,t,s)=>{var i=s(939);addEventListener("load",(()=>{let e=document.getElementById("money");setInterval((()=>{let t=0;i.UN.fields.forEach((e=>{t+=e.fertility})),i.UN.money+=t,e&&(e.innerText=`money: ${i.UN.money.toFixed(2)}\n${t.toFixed(2)}/s`)}),1e3)}))},112:(e,t,s)=>{s.d(t,{x:()=>i});const i=new class{constructor(){this.pressed=!1,this.pressedElement=null,this.lastX=0,this.lastY=0,this.startX=0,this.startY=0,this._move=[],this._click=[],this._scroll=[],document.addEventListener("mousemove",(e=>{this._move.forEach((t=>{t(e.movementX,e.movementY)}))})),document.addEventListener("mousedown",(e=>{this.startX=e.offsetX,this.startY=e.offsetY,this.pressedElement=e.target,this.pressed=!0})),document.addEventListener("mouseup",(e=>{let t=e.offsetX-this.startX,s=e.offsetY-this.startY;Math.abs(t)<5&&Math.abs(s)<5&&this._click.forEach((t=>{t(e.offsetX,e.offsetY)})),this.pressedElement=null,this.pressed=!1})),document.addEventListener("wheel",(e=>{this._scroll.forEach((t=>{t(e.deltaY,e.altKey)}))})),document.addEventListener("touchmove",(e=>{let t=e.touches[0].clientX-this.lastX,s=e.touches[0].clientY-this.lastY;this.lastX=e.touches[0].clientX,this.lastY=e.touches[0].clientY,this._move.forEach((e=>{e(t,s)}))})),document.addEventListener("touchstart",(e=>{this.lastX=e.touches[0].clientX,this.lastY=e.touches[0].clientY,this.startX=e.touches[0].clientX,this.startY=e.touches[0].clientY,this.pressedElement=e.target,this.pressed=!0})),document.addEventListener("touchend",(e=>{let t=e.changedTouches[0].clientX-this.startX,s=e.changedTouches[0].clientY-this.startY;Math.abs(t)<5&&Math.abs(s)<5&&this._click.forEach((e=>{e(t+this.lastX,s+this.lastY)})),this.pressedElement=null,this.pressed=!1}))}set move(e){this._move.push(e)}set click(e){this._click.push(e)}set scroll(e){this._scroll.push(e)}}},846:(e,t,s)=>{var i=s(939),n=s(112);function o(){i.p.fields=[];let e=50*i.wT.scale,t=1/Math.PI/2;for(let s=-1;s*e<i.p.gamecvs.width;s+=1)for(let n=-1;n*e<i.p.gamecvs.height;n+=1){let o=s-Math.floor(i.wT.x/e),l=n-Math.floor(i.wT.y/e),h=i.p.noise.perlin2(o*t,l*t);h=(h+1)/2,i.p.fields.push(new i.ZZ(o,l,h))}}function l(){const e=i.p.gamecvs.getContext("2d");let t=i.p.gamecvs.width,s=i.p.gamecvs.height;e.clearRect(0,0,t,s),i.wT.scale>.5?e.fillStyle="#539e3b":e.fillStyle="#294f1d",e.fillRect(0,0,t,s),e.font=10*i.wT.scale+"px sans-serif",i.p.fields.forEach((e=>e.render()))}function h(e,t,s,n){s=s||50*i.wT.scale,n=n||1/Math.PI/2;let o=i.p.noise.perlin2(e*n,t*n);return o=(o+1)/2,o}addEventListener("load",(function(){i.p.gamecvs=document.getElementById("game"),i.wT.x=window.innerWidth/2,i.wT.y=window.innerHeight/2,i.wT.scale=2,i.p.gamecvs.width=window.innerWidth,i.p.gamecvs.height=window.innerHeight,i.p.gamecvs.getContext("2d").font=10*i.wT.scale+"px sans-serif",i.UN.fields.push({x:0,y:0,fertility:h(0,0)}),null!==(0,i.u1)("#ffb400")?(o(),l()):console.error("Invalid color")})),window.onresize=function(){i.p.gamecvs.width=window.innerWidth,i.p.gamecvs.height=window.innerHeight,o(),l()},n.x.move=(e,t)=>{n.x.pressed&&n.x.pressedElement&&n.x.pressedElement===i.p.gamecvs&&(i.wT.x+=e,i.wT.y+=t,o(),l())},n.x.scroll=e=>{let t=1+e/100;i.wT.scale*=t,i.wT.scale=Math.max(.1,i.wT.scale),i.wT.scale=Math.min(10,i.wT.scale),o(),l()},n.x.click=(e,t)=>{if(i.wT.scale<.5)return;if(!n.x.pressedElement||n.x.pressedElement!==i.p.gamecvs)return;let s=Math.floor((e-i.wT.x)/i.wT.scale/50),r=Math.floor((t-i.wT.y)/i.wT.scale/50);if(i.UN.fields.some((e=>e.x===s&&e.y===r)))return;let c=i.p.fields.find((e=>e.x===s&&e.y===r));c&&c.canBuy&&(i.ZZ.calcMoney(c)>i.UN.money?alert(`你钱不够\n需要${i.ZZ.calcMoney(c)}\n但你只有${i.UN.money.toFixed(2)}\n`):(i.UN.money-=i.ZZ.calcMoney(c),i.UN.fields.push({x:s,y:r,fertility:h(s,r)}),o(),l()))}},939:(e,t,s)=>{var i;s.d(t,{UN:()=>l,ZZ:()=>o,p:()=>h,u1:()=>c,wT:()=>r}),function(e){e[e["#ffffff"]=0]="#ffffff",e[e["#d1a20a"]=1]="#d1a20a",e[e["#a35d1d"]=2]="#a35d1d",e[e["#a3330e"]=3]="#a3330e",e[e["#613400"]=4]="#613400"}(i||(i={}));class n{constructor(e,t,s,i,n,o=""){this.x=e,this.y=t,this.width=s,this.height=i,this.color=n,this.innerText=o}render(){let e=h.gamecvs.getContext("2d");if(null===e)return;if(e.fillStyle=this.color,r.scale>.5?e.fillRect(this.x+1,this.y+1,this.width-1,this.height-1):e.fillRect(this.x,this.y,this.width,this.height),""===this.innerText)return;const t=this.innerText.split("\n"),s=parseInt(e.font,10),i=t.length*s,n=t.map((t=>e.measureText(t).width)),o=this.height/2-i/2+s;e.fillStyle="#ffffff"===this.color?"#000000":"#ffffff",t.forEach(((t,i)=>{e.fillText(t,this.x+this.width/2-n[i]/2,this.y+o+i*s)}))}}class o{constructor(e,t,s,i=!1){this.unlocked=!1,this.canBuy=!1,this.x=e,this.y=t,this.fertility=s,this.basicColor="#ffb400";let c=l.fields.find((s=>s.x===e&&s.y===t));if(void 0!==c&&(this.fertility=c.fertility,this.unlocked=!0),void 0===c)for(const e of h.around){if(this.canBuy)break;l.fields.some((t=>t.x===e[0]+this.x&&t.y===e[1]+this.y&&(this.canBuy=!0,!0)))}let a="";r.scale>.5&&(this.unlocked?a=`(${this.x}, ${this.y})\n肥沃度${(100*this.fertility).toFixed(0)}`:this.canBuy&&(a=`(${this.x}, ${this.y})\n肥沃度${(100*this.fertility).toFixed(0)}\n花费${o.calcMoney(this)}`)),this.box=new n(50*e*r.scale+r.x,50*t*r.scale+r.y,50*r.scale,50*r.scale,this.color(),a)}render(){!this.canBuy&&!this.unlocked&&r.scale<.5||this.box.render()}color(){return this.unlocked?i[Math.floor(5*this.fertility)]:this.canBuy?"#7f7f7f7f":"#0000007f"}static calcMoney(e,t,s){if("number"!=typeof e)return o.calcMoney(e.fertility,e.x,e.y);if(void 0===t||void 0===s)throw new Error("x or y is undefined when calcMoney");return Math.floor((e+1)*Math.pow(Math.pow(t,2)+Math.pow(s,2),1.3))}}const l={fields:[],money:0,seed:Math.floor(1e9*Math.random())},h={gamecvs:document.getElementById("game"),fields:[],noise:new window.Noise,around:[[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]]};h.noise=new window.Noise(l.seed),console.log(l.seed);const r={x:0,y:0,scale:1};function c(e){let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?{r:parseInt(t[1],16),g:parseInt(t[2],16),b:parseInt(t[3],16)}:null}}},t={};function s(i){var n=t[i];if(void 0!==n)return n.exports;var o=t[i]={exports:{}};return e[i](o,o.exports,s),o.exports}s.d=(e,t)=>{for(var i in t)s.o(t,i)&&!s.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),s(184),s(939),s(846),s(112)})();