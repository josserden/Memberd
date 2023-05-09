(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const u of t.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&r(u)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const l=()=>({body:document.querySelector("body"),burgerBtn:document.querySelector("[data-menu-button]"),carousel:document.querySelector("[data-carousel]"),carouselItems:document.querySelectorAll("[data-carousel-item]"),menu:document.querySelector("[data-menu]"),nextBtn:document.querySelector("[data-next-button]"),prevBtn:document.querySelector("[data-prev-button]")}),{carousel:p,carouselItems:m}=l();let s=0;const h=m.length-1,o=n=>{if(n<0||n>h)return;const i=m[n].offsetLeft;p.scrollTo({left:i,behavior:"smooth"})},f=()=>{s!==0&&(s-=1,o(s))},b=()=>{if(s===h){s=0,o(s);return}s+=1,o(s)},y=()=>{o(s)};class g extends HTMLElement{constructor(){super(),this.baseSizeInPx=100,this.baseTimeInMs=1e3,this.speedValue=parseInt(this.getAttribute("speed-value"))||this.baseSizeInPx,this.speed=this.speedValue/this.baseTimeInMs,this.position=0,this.startTime=performance.now(),this.pauseTime=null,this.isPlay=!1}static get observedAttributes(){return["speed-value"]}connectedCallback(){this.isConnected&&(this.startAnimation(),this.addEventListener("mouseenter",this.pauseAnimation.bind(this)),this.addEventListener("mouseleave",this.resumeAnimation.bind(this)))}startAnimation(){this.isPlay=!0;const i=()=>{if(!this.isPlay)return;const a=performance.now(),r=(this.pauseTime?this.pauseTime:a)-this.startTime;this.position=this.speed*r,this.style.transform=`translateY(${this.position}px)`,requestAnimationFrame(i)};requestAnimationFrame(i)}pauseAnimation(){this.isPlay=!1,this.pauseTime=performance.now()}resumeAnimation(){this.isPlay||(this.isPlay=!0,this.startTime+=this.pauseTime?performance.now()-this.pauseTime:0,this.pauseTime=null,requestAnimationFrame(this.startAnimation.bind(this)))}}const{burgerBtn:c,menu:v,body:d}=l(),A=()=>{const n=c.getAttribute("aria-expanded")==="true";if(c.setAttribute("aria-expanded",!n),v.classList.toggle("is-open"),n){d.classList.remove("no-scroll");return}d.classList.add("no-scroll")},{burgerBtn:L,prevBtn:S,nextBtn:T}=l();customElements.define("custom-scroller",g);L.addEventListener("click",A);S.addEventListener("click",f);T.addEventListener("click",b);document.addEventListener("DOMContentLoaded",y);