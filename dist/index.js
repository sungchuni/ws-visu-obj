!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e(require("react"),require("gsap"));else if("function"==typeof define&&define.amd)define(["React","gsap"],e);else{var i="object"==typeof exports?e(require("react"),require("gsap")):e(t.React,t.gsap);for(var n in i)("object"==typeof exports?exports:t)[n]=i[n]}}(window,(function(t,e){return function(t){var e={};function i(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,i),o.l=!0,o.exports}return i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)i.d(n,o,function(e){return t[e]}.bind(null,o));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=2)}([function(e,i){e.exports=t},function(t,i){t.exports=e},function(t,e,i){"use strict";i.r(e);var n=i(0),o=i.n(n);const r=320,s=240;var a=o.a.forwardRef((function(t,e){const{children:i,options:n}=t,{width:a,height:h}={width:n.width||r,height:n.height||s};return o.a.createElement("canvas",{ref:function(t){if(t){const i=t.getContext("2d"),n=window.devicePixelRatio;n>1&&(t.style.width=`${a}px`,t.style.height=`${h}px`,t.width=a*n,t.height=h*n,i.scale(n,n)),e(t,i)}},width:a,height:h},i)})),h=i(1);class l{constructor({title:t,value:e},{animationDuration:i}){this.title=t,this.value=0,this.x=0,this.y=0,this.done=!1;const n=i/1e3;h.gsap.to(this,n,{ease:"power2.inOut",value:e,onComplete:()=>{this.done=!0}})}}function c(){const{data:t,options:e,canvas:i,ctx:n}=this,o=i.getBoundingClientRect(),r=t.map(t=>new l(t,e)),s={width:o.width-2*e.marginX,height:o.height-4*e.marginY},a=s.width/t.length,h=(s.height-2*e.marginY)/Math.max(...t.map(({value:t})=>Math.abs(t))),c=()=>{if(n.clearRect(0,0,o.width,o.height),function(t,e,i){const{color:n,colorText:o,titleFontSize:r,fontStyle:s,title:a,marginY:h}=e,{x:l,y:c}={x:.5*i.width,y:h};t.font=`${r}px ${s}`,t.textAlign="center",t.fillStyle=t.strokeStyle=n||o,t.fillText(a,l,c)}(n,e,o),function(t,e,i){const{color:n,colorLine:o,colorAxis:r,marginX:s,marginY:a,lineWidth:h}=e,{width:l,height:c}=i,[d,u,f,p]=[s,2*a,s+l,2*a+c];t.lineWidth=h,t.fillStyle=t.strokeStyle=r||n||o,t.beginPath(),t.moveTo(d,u),t.lineTo(d,p),t.lineTo(f,p),t.stroke()}(n,e,s),r.map((t,i)=>{const{marginX:n,marginY:r}=e;return t.x=a*i+.5*a+n,t.y=o.height-(h*Math.abs(t.value)+3*r),t}).forEach((t,i)=>{!function(t,e,i,n){if(n){const{color:o,colorLine:r,lineWidth:s}=e,{x:a,y:h}=i,{x:l,y:c}=n;t.lineWidth=s,t.fillStyle=t.strokeStyle=o||r,t.beginPath(),t.moveTo(a,h),t.lineTo(l,c),t.stroke()}}(n,e,t,r[i+1]),function(t,e,i,n){const{color:o,colorText:r,subtitleFontSize:s,fontStyle:a,marginY:h}=e,{height:l}=i,{title:c,x:d}=n,u=l+3*h;t.font=`${s}px ${a}`,t.textAlign="center",t.fillStyle=t.strokeStyle=o||r,t.fillText(c,d,u)}(n,e,s,t),function(t,e,i,n){const{color:o,colorLine:r,colorGrid:s,marginY:a,lineWidth:h}=e,{height:l}=i,[c,d]=[n.x,2*a+l],{x:u,y:f}=n;f<d&&(t.lineWidth=h,t.fillStyle=t.strokeStyle=s||o||r,t.beginPath(),t.moveTo(c,d),t.lineTo(u,f),t.stroke())}(n,e,s,t),function(t,e,i){const{color:n,colorPoint:o,pointSize:r}=e,{x:s,y:a}=i;t.fillStyle=t.strokeStyle=n||o,t.beginPath(),t.arc(s,a,.5*r,0,2*Math.PI),t.fill()}(n,e,t)}),e.showTopAnnotation){const i=t.slice().sort(({value:t},{value:e})=>e-t)[0],o=r[t.indexOf(i)];!function(t,e,i){const{color:n,colorText:o,annotationFontSize:r,fontStyle:s,marginY:a,isPercentage:h}=e,{value:l,x:c,y:d}=i,u=h?`${(100*l).toFixed(1)}%`:l.toFixed(1);t.font=`${r}px ${s}`,t.textAlign="center",t.fillStyle=t.strokeStyle=n||o,t.fillText(u,c,d-.5*a)}(n,e,o)}r.every(({done:t})=>t)||window.requestAnimationFrame(c)};r.length&&window.requestAnimationFrame(c)}const d="#535353",u=Object.freeze({colorPoint:d,colorLine:d,colorText:d,colorAxis:"#d3d3d3",colorGrid:"#d3d3d3",title:"",titleFontSize:12,subtitleFontSize:12,annotationFontSize:10,fontStyle:"serif",width:240,height:192,marginX:24,marginY:19.2,pointSize:7,lineWidth:1,showTopAnnotation:!1,isPercentage:!1,animationDuration:1500,isScrollObserved:!0});class f extends o.a.Component{constructor(t){super(t),this.data=this.props.data||[],this.options=Object.assign({},u,this.props.options),this.canvas=null,this.ctx=null,this.draw=c,this.receiveCanvasCtx=this.receiveCanvasCtx.bind(this),this.options.isScrollObserved&&(this.intersectionObserver=new window.IntersectionObserver(this.intersectionCallback.bind(this),{rootMargin:`-${this.options.marginY}px 0px`}))}receiveCanvasCtx(t,e){this.canvas=t,this.ctx=e,this.intersectionObserver?this.observeCanvas(t):this.draw()}intersectionCallback(t){t.forEach(t=>t.isIntersecting&&this.draw())}observeCanvas(t){this.intersectionObserver.observe(t)}render(){return o.a.createElement(a,{ref:this.receiveCanvasCtx,options:this.options})}}class p{constructor({title:t,subtitle:e,value:i},{animationDuration:n}){this.title=t,this.subtitle=e,this.value=0,this.x=0,this.y=0,this.isMinor=!1,this.done=!1;const o=n/1e3;h.gsap.to(this,o,{ease:"power2.inOut",value:i,onComplete:()=>{this.done=!0}})}}function g(t,e,i){const{shadowColor:n,shadowSize:o,shadowBlur:r,shadowOffset:s}=e,{width:a,height:h}=i,l=.5*a-.5*o,c=l+o,d=h-3*r-s;t.fillStyle=n,t.beginPath(),t.moveTo(l,d),t.bezierCurveTo(l,d-4,c,d-4,c,d),t.bezierCurveTo(c,d+4,l,d+4,l,d),t.filter=`blur(${r}px)`,t.fill(),t.filter="none"}function x(){const{data:t,options:e,canvas:i,ctx:n}=this,o=i.getBoundingClientRect(),r=t.map(t=>Array.isArray(t)?t.map(t=>new p(t,e)):new p(t,e)),s=(r.every(t=>t instanceof p)?[r]:r).reverse(),a=[].concat(...r),l={width:o.width-2*e.marginX,height:o.height-2*e.marginY},c=e.marginY*(e.hasAxis?2:1.5),d=l.width/(t.every(t=>Array.isArray(t))?t[0].length:t.length),u=(l.height-c)/Math.max(...[].concat(...t.map(t=>Array.isArray(t)?t.map(({value:t})=>t):t.value)));let f={current:0};if(e.hasAnimationHorizontal){const t=e.animationDuration/1e3;h.gsap.to(f,t,{ease:"power1.in",current:o.width})}const x=()=>{n.clearRect(0,0,o.width,o.height),s.forEach((t,i)=>{t.map((t,n)=>{const{marginX:r}=e;return t.x=d*n+.5*d+r,t.y=o.height-(u*Math.abs(t.value)+c),t.isMinor=i!==s.length-1,t}).forEach((i,o)=>{!function(t,e,i,n,o){if(n){const{color:r,colorLine:s,colorMinor:a,lineWidth:h,hasAnimationHorizontal:l}=e,{x:c,y:d,isMinor:u}=i,{x:f,y:p}=n,{current:g}=o;t.lineWidth=h,t.fillStyle=t.strokeStyle=u?a:r||s,t.beginPath(),t.moveTo(c,d),l?t.lineTo(g<f?g<c?c:c+(g-c):f,g<f?g<c?d:d+(g-c)/(f-c)*(p-d):p):t.lineTo(f,p),t.stroke()}}(n,e,i,t[o+1],f),function(t,e,i,n){const{color:o,colorText:r,colorMinor:s,annotationTitleFontSize:a,annotationSubtitleFontSize:h,fontStyle:l,pointSize:c,hasAnimationHorizontal:d}=e,{title:u,subtitle:f,x:p,y:g,isMinor:x}=i,{current:v}=n,m=-c,w=p+m,y=p+m,S=g+a+8,b=S+1.25*a;(!d||p<v)&&(t.fillStyle=t.strokeStyle=x?s||o:o||r,t.textAlign="left",t.font=`${a}px ${l}`,t.fillText(u,y,S),t.font=`${h}px ${l}`,t.fillText(f,w,b))}(n,e,i,f),function(t,e,i,n){const{color:o,colorPoint:r,colorMinor:s,pointSize:a,hasAnimationHorizontal:h}=e,{x:l,y:c,isMinor:d}=i,{current:u}=n;(!h||l<u)&&(t.fillStyle=t.strokeStyle=d?s||o:o||r,t.beginPath(),t.arc(l,c,.5*a,0,2*Math.PI),t.fill())}(n,e,i,f)})}),e.hasShadow&&!e.hasAxis&&g(n,e,o),a.every(({done:t})=>t)?(function(t,e,i){const{color:n,colorText:o,titleFontSize:r,fontStyle:s,title:a,marginY:h,hasAxis:l}=e,{x:c,y:d}={x:.5*i.width,y:h*(l?.5:1)};t.font=`${r}px ${s}`,t.textAlign="center",t.fillStyle=t.strokeStyle=n||o,t.fillText(a,c,d)}(n,e,o),e.hasAxis&&function(t,e,i){const{color:n,colorLine:o,colorAxis:r,marginX:s,marginY:a,lineWidth:h}=e,{width:l,height:c}=i,[d,u,f,p]=[s,a,s+l,a+c];t.lineWidth=h,t.fillStyle=t.strokeStyle=r||n||o,t.beginPath(),t.moveTo(d,u),t.lineTo(d,p),t.lineTo(f,p),t.stroke()}(n,e,l)):window.requestAnimationFrame(x)};a.length&&window.requestAnimationFrame(x)}const v=Object.freeze({colorPoint:d,colorLine:d,colorText:d,colorAxis:"#d3d3d3",colorMinor:"#d3d3d3",title:"",titleFontSize:12,annotationTitleFontSize:12,annotationSubtitleFontSize:10,fontStyle:"serif",width:512,height:288,marginX:51.2,marginY:38.4,hasAxis:!1,pointSize:7,lineWidth:1,animationDuration:1500,hasAnimationHorizontal:!0,isScrollObserved:!0,hasShadow:!0,shadowColor:"#999999",shadowSize:307.2,shadowBlur:10,shadowOffset:0});class m extends o.a.Component{constructor(t){super(t),this.data=this.props.data||[],this.options=Object.assign({},v,this.props.options),this.canvas=null,this.ctx=null,this.draw=x,this.receiveCanvasCtx=this.receiveCanvasCtx.bind(this),this.options.isScrollObserved&&(this.intersectionObserver=new window.IntersectionObserver(this.intersectionCallback.bind(this),{rootMargin:`-${this.options.marginY}px 0px`}))}receiveCanvasCtx(t,e){this.canvas=t,this.ctx=e,this.intersectionObserver?this.observeCanvas(t):this.draw()}intersectionCallback(t){t.forEach(t=>t.isIntersecting&&this.draw())}observeCanvas(t){this.intersectionObserver.observe(t)}render(){return o.a.createElement(a,{ref:this.receiveCanvasCtx,options:this.options})}}class w{constructor({title:t,isMinor:e,hIndex:i,vIndex:n},{animationDuration:o}){this.title=t,this.isMinor=!!e,this.hIndex=i,this.vIndex=0,this.x=0,this.y=0,this.done=!1;const r=o/1e3;h.gsap.to(this,r,{ease:"power2.inOut",vIndex:n+.2*Math.random(),onComplete:()=>{this.done=!0}})}}function y(){const{data:t,options:e,canvas:i,ctx:n}=this,o=i.getBoundingClientRect(),r=t.map((t,i)=>t.map((t,n)=>new w(Object.assign({},t,{hIndex:i,vIndex:n}),e))),s=[].concat(...r),a=o.width-2*e.marginX,h=o.height-2*e.marginY,l=a/(t.length-1),c=h/Math.max(...t.map(({length:t})=>t)),d=()=>{n.clearRect(0,0,o.width,o.height),r.forEach((t,i)=>{const o=r[i+1]||[];t.map(t=>{const{marginX:i,marginY:n,pointSize:o}=e,{hIndex:r,vIndex:s}=t;return t.x=l*r+i,t.y=c*s+n+.5*(c+o),t}).forEach(t=>{o.forEach(i=>{!function(t,e,i,n){if(n){const{color:o,colorLine:r,colorMinor:s,lineWidth:a}=e,{x:h,y:l}=i,{isMinor:c,x:d,y:u}=n;d&&u&&(t.lineWidth=a,t.fillStyle=t.strokeStyle=c?s||o:o||r,t.beginPath(),t.moveTo(h,l),t.lineTo(d,u),t.stroke())}}(n,e,t,i)}),function(t,e,i,n){const{color:o,colorText:r,colorMinor:s,fontSize:a,fontStyle:h,pointSize:l}=e,{title:c,hIndex:d,x:u,y:f,isMinor:p}=i,{length:g}=n,x=["left","top","right"][d?g-1===d?2:1:0],v={left:"right",top:"center",right:"left"}[x],m=u+{left:-l,top:0,right:l}[x],w=f+{left:0,top:-l,right:0}[x];t.fillStyle=t.strokeStyle=p?s||o:o||r,t.textAlign=v,t.font=`${a}px ${h}`,t.fillText(c,m,w)}(n,e,t,r),function(t,e,i){const{color:n,colorPoint:o,colorMinor:r,pointSize:s}=e,{x:a,y:h,isMinor:l}=i;t.fillStyle=t.strokeStyle=l?r||n:n||o,t.beginPath(),t.arc(a,h,.5*s,0,2*Math.PI),t.fill()}(n,e,t)})}),e.hasShadow&&g(n,e,o),s.every(({done:t})=>t)||window.requestAnimationFrame(d)};s.length&&window.requestAnimationFrame(d)}const S=Object.freeze({colorPoint:d,colorLine:d,colorText:d,colorMinor:"#d3d3d3",fontSize:12,fontStyle:"serif",width:640,height:240,marginX:96,marginY:64,pointSize:7,lineWidth:1,animationDuration:1500,isScrollObserved:!0,hasShadow:!0,shadowColor:"#999999",shadowSize:403.2,shadowBlur:12,shadowOffset:0});class b extends o.a.Component{constructor(t){super(t),this.data=this.props.data||[],this.options=Object.assign({},S,this.props.options),this.canvas=null,this.ctx=null,this.draw=y,this.receiveCanvasCtx=this.receiveCanvasCtx.bind(this),this.options.isScrollObserved&&(this.intersectionObserver=new window.IntersectionObserver(this.intersectionCallback.bind(this),{rootMargin:`-${this.options.marginY}px 0px`}))}receiveCanvasCtx(t,e){this.canvas=t,this.ctx=e,this.intersectionObserver?this.observeCanvas(t):this.draw()}intersectionCallback(t){t.forEach(t=>t.isIntersecting&&this.draw())}observeCanvas(t){this.intersectionObserver.observe(t)}render(){return o.a.createElement(a,{ref:this.receiveCanvasCtx,options:this.options})}}class C{constructor({phi:t,theta:e},{sphereRadius:i,animationDuration:n}){this.phi=t,this.theta=e,this.radius=i;const o=n/1e3;h.gsap.to(this,o,{theta:this.theta+2*Math.PI,ease:"linear",repeat:-1})}}function M(){const{options:t}=this,{dotsQuantity:e}=t,i=Math.round(Math.sqrt(e));return Array(i).fill(null).map((function(t,e){return Math.PI*(e/(i-1))})).map((function(t,e){const n=(i-1)*(.5*Math.PI),o=Math.round(Math.sin(t)*(n*(Math.PI/2))+n*(2*Math.abs(e/(i-1)-.5)));return{theta:t,phis:Array(o).fill(null).map((function(t,e){return 2*Math.PI*(e/(o-1))}))}}))}function z(){const{options:t,canvas:e,ctx:i}=this,n=e.getBoundingClientRect(),o=[].concat(...M.call(this).map(({theta:e,phis:i})=>i.map(i=>new C({phi:i,theta:e},t)))),r=()=>{i.clearRect(0,0,n.width,n.height),o.map(e=>{const{sphereRadius:i,perspective:o}=t,{phi:r,theta:s}=e,{x:a,y:h,z:l}={x:i*Math.sin(r)*Math.cos(s),y:i*Math.cos(r),z:i*Math.sin(r)*Math.sin(s)+i},c=e.s=n.width*o/(n.width*o+l);return e.h=a*c+.5*n.width,e.v=h*c+.5*n.height,e}).forEach(e=>{!function(t,e,i,n){const{color:o,colorPoint:r,dotSize:s}=e,{z:a,v:h,h:l,s:c}=n;t.globalAlpha=Math.abs(1-a/i.width),t.fillStyle=o||r,t.beginPath(),t.arc(l,h,s*c,0,2*Math.PI),t.fill()}(i,t,n,e)}),t.hasShadow&&g(i,t,n),window.requestAnimationFrame(r)};o.length&&window.requestAnimationFrame(r)}const T=Object.freeze({colorPoint:d,colorLine:d,width:480,height:480,dotsQuantity:112,dotSize:1,sphereRadius:240,perspective:.8,animationDuration:24e3,hasShadow:!0,shadowColor:"#999999",shadowSize:80,shadowBlur:16,shadowOffset:0});class A extends o.a.Component{constructor(t){super(t),this.data=this.props.data||[],this.options=Object.assign({},T,this.props.options),this.canvas=null,this.ctx=null,this.draw=z,this.receiveCanvasCtx=this.receiveCanvasCtx.bind(this)}receiveCanvasCtx(t,e){this.canvas=t,this.ctx=e,this.draw()}render(){return o.a.createElement(a,{ref:this.receiveCanvasCtx,options:this.options})}}class O extends o.a.Component{constructor(t){super(t)}render(){return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",null,"Tree"))}}class P{constructor({key:t,title:e,link:i,hIndex:n,vIndex:o,theta:r},{animationDuration:s}){this.key=t,this.title=e,this.link=i,this.hIndex=n,this.vIndex=o,this.theta=r,this.x=0,this.y=0,this.z=0,this.h=0,this.v=0,this.s=0;const a=s/1e3;h.gsap.to(this,a,{theta:r+2*Math.PI,ease:"linear",repeat:-1})}}function k(){const{data:t,options:e,canvas:i,ctx:n}=this,o=i.getBoundingClientRect(),r=t.map((t,i)=>{const{length:n}=t;return t.map((t,o)=>{const r=o/n*Math.PI*2;return new P(Object.assign({},t,{hIndex:i,vIndex:o,theta:r}),e)})}),s=[].concat(...r),a={width:o.width-2*e.marginX,height:o.height-2*e.marginY},h=a.width/(t.length-1),l=.5*a.height/Math.max(...t.map(({length:t})=>t)),c=()=>{n.clearRect(0,0,o.width,o.height),r.forEach((t,i)=>{const{length:o}=t,s=r[i+1]||[];t.map(t=>{const{marginX:i,perspective:n}=e,{hIndex:r,theta:s}=t,c=l*o,d=t.x=h*r+i,u=t.y=c*Math.cos(s),f=t.z=c*Math.sin(s)+c,p=t.s=a.width*n/(a.width*n+f);return t.h=d-a.width*(.05*Math.sin(s))*((d-.4*a.width)/a.width),t.v=u*p+.5*a.height+e.marginY,t}).forEach(t=>{s.forEach(i=>{const{link:o=[]}=t,{key:r}=i;o.includes(r)&&function(t,e,i,n,o){if(o){const{color:r,colorLine:s,lineWidth:a}=e,{z:h,h:l,v:c}=n,{z:d,h:u,v:f}=o;if(d&&u&&f){const e=.5*(h+d+(h<d?d:h));t.globalAlpha=Math.abs(1-e/i.width),console.log(t.globalAlpha),t.lineWidth=a,t.fillStyle=t.strokeStyle=r||s,t.beginPath(),t.moveTo(l,c),t.lineTo(u,f),t.stroke()}}}(n,e,a,t,i)}),function(t,e,i,n,o){const{color:r,colorText:s,fontSize:a,fontStyle:h,pointSize:l}=e,{title:c,hIndex:d,z:u,h:f,v:p,s:g}=n,{length:x}=o,v=2*l,m=3*l,w=["left","top","right"][d?x-1===d?2:1:0],y={left:"right",top:"center",right:"left"}[w],S=a*Math.sqrt(g),b=f+{left:-v,top:0,right:v}[w],C=p+{left:.33*S,top:-m,right:.33*S}[w];t.globalAlpha=Math.abs(1-u/i.width),t.fillStyle=t.strokeStyle=r||s,t.textAlign=y,t.font=`${S}px ${h}`,t.fillText(c,b,C)}(n,e,a,t,r),function(t,e,i,n){const{color:o,colorPoint:r,pointSize:s}=e,{z:a,h:h,v:l,s:c}=n;t.globalAlpha=Math.abs(1-a/i.width),t.fillStyle=t.strokeStyle=o||r,t.beginPath(),t.arc(h,l,s*c,0,2*Math.PI),t.fill()}(n,e,a,t)})}),e.hasShadow&&g(n,e,o),window.requestAnimationFrame(c)};s.length&&window.requestAnimationFrame(c)}const I=Object.freeze({colorPoint:d,colorLine:d,colorText:d,fontSize:12,fontStyle:"serif",width:640,height:240,marginX:96,marginY:64,pointSize:4,lineWidth:1,perspective:.9,animationDuration:24e3,hasShadow:!0,shadowColor:"#999999",shadowSize:403.2,shadowBlur:12,shadowOffset:0});class F extends o.a.Component{constructor(t){super(t),this.data=this.props.data||[],this.options=Object.assign({},I,this.props.options),this.canvas=null,this.ctx=null,this.draw=k,this.receiveCanvasCtx=this.receiveCanvasCtx.bind(this)}receiveCanvasCtx(t,e){this.canvas=t,this.ctx=e,this.draw()}render(){return o.a.createElement(a,{ref:this.receiveCanvasCtx,options:this.options})}}i.d(e,"Leaf",(function(){return f})),i.d(e,"Line",(function(){return m})),i.d(e,"Silk",(function(){return b})),i.d(e,"Sphere",(function(){return A})),i.d(e,"Tree",(function(){return O})),i.d(e,"WashingMachine",(function(){return F}));e.default={Leaf:f,Line:m,Silk:b,Sphere:A,Tree:O,WashingMachine:F}}])}));