(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();const u=()=>({body:document.querySelector("body"),burgerBtnOpen:document.querySelector(".js-burger-btn"),menuOverlay:document.querySelector(".js-menu-overlay")}),{burgerBtnOpen:s,menuOverlay:d,body:l}=u(),a=()=>{const r=s.getAttribute("aria-expanded")==="true";s.setAttribute("aria-expanded",!r),d.classList.toggle("is-open"),r?l.classList.remove("no-scroll"):l.classList.add("no-scroll")};s.addEventListener("click",a);