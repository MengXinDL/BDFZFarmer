(()=>{"use strict";var e={184:()=>{},112:(e,t,s)=>{s.d(t,{x:()=>i});const i=new class{constructor(){this.pressed=!1,this._move=[],this._click=[],document.addEventListener("mousemove",(e=>{this._move.forEach((t=>{t(e.movementX,e.movementY)}))})),document.addEventListener("click",(e=>{this._click.forEach((t=>{t(e.offsetX,e.offsetY)}))})),document.addEventListener("mousedown",(e=>{this.pressed=!0})),document.addEventListener("mouseup",(e=>{this.pressed=!1}))}set move(e){this._move.push(e)}set click(e){this._click.push(e)}}},846:(e,t,s)=>{var i=s(939),o=s(112);function n(){let e=i.p.gamecvs.getContext("2d"),t=i.p.gamecvs.width,s=i.p.gamecvs.height;e.clearRect(0,0,t,s),e.save(),e.translate(i.wT.x,i.wT.y),e.scale(i.wT.scale,i.wT.scale),e.fillStyle="#539e3b",e.fillRect(0,0,t,s),i.p.fields.forEach((e=>{e.render()})),e.restore()}window.onload=function(){i.p.gamecvs=document.getElementById("game"),function(){if(i.wT.x=i.wT.y=0,i.wT.scale=1,i.p.gamecvs.width=window.innerWidth,i.p.gamecvs.height=window.innerHeight,i.p.gamecvs.getContext("2d"),null===(0,i.u1)("#ffb400"))return void console.error("Invalid color");let e=50*i.wT.scale,t=1/Math.PI/2;console.log(i.p.noise.perlin2(1,1),i.p.noise.perlin2(1,1.0000000001));for(let s=0;s<i.p.gamecvs.width/e;s+=1)for(let o=0;o<i.p.gamecvs.height/e;o+=1){let e=i.p.noise.perlin2(s*t,o*t);e=(e+1)/2,i.p.fields.push(new i.ZZ(s,o,e))}console.log(i.p),n()}()},window.onresize=function(){i.wT.x=i.wT.y=0,i.wT.scale=1,i.p.gamecvs.width=window.innerWidth,i.p.gamecvs.height=window.innerHeight,n()},o.x.move=(e,t)=>{o.x.pressed&&(i.wT.x+=e,i.wT.y+=t,n())}},939:(e,t,s)=>{s.d(t,{ZZ:()=>o,p:()=>n,u1:()=>c,wT:()=>r});class i{constructor(e,t,s,i,o){this.x=e,this.y=t,this.width=s,this.height=i,this.color=o}render(){let e=n.gamecvs.getContext("2d");null!==e&&(e.fillStyle=this.color,e.fillRect(this.x,this.y,this.width,this.height))}}class o{constructor(e,t,s){var o,n,c;this.x=e,this.y=t,this.fertility=s,this.basicColor="#ffb400",this.box=new i(50*(e+r.x),50*(t+r.y),50*r.scale,50*r.scale,(o=parseInt(this.basicColor.slice(1,3),16)*this.fertility,n=parseInt(this.basicColor.slice(3,5),16)*this.fertility,c=parseInt(this.basicColor.slice(5,7),16)*this.fertility,"#"+((1<<24)+(Math.floor(o)<<16)+(Math.floor(n)<<8)+Math.floor(c)).toString(16).slice(1)))}render(){this.box.render()}}const n={gamecvs:document.getElementById("game"),fields:[],seed:Math.random(),noise:new window.Noise};n.noise=new window.Noise(Math.random());const r={x:0,y:0,scale:1};function c(e){let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?{r:parseInt(t[1],16),g:parseInt(t[2],16),b:parseInt(t[3],16)}:null}}},t={};function s(i){var o=t[i];if(void 0!==o)return o.exports;var n=t[i]={exports:{}};return e[i](n,n.exports,s),n.exports}s.d=(e,t)=>{for(var i in t)s.o(t,i)&&!s.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),s(184),s(939),s(846),s(112)})();