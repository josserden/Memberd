(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();const m=()=>({body:document.querySelector("body"),burgerBtn:document.querySelector("[data-menu-button]"),carousel:document.querySelector("[data-carousel]"),carouselItems:document.querySelectorAll("[data-carousel-item]"),menu:document.querySelector("[data-menu]"),nextBtn:document.querySelector("[data-next-button]"),prevBtn:document.querySelector("[data-prev-button]")}),{carousel:x,carouselItems:y}=m();let r=0;const p=y.length-1,u=l=>{if(l<0||l>p)return;const n=y[l].offsetLeft;x.scrollTo({left:n,behavior:"smooth"})},L=()=>{r!==0&&(r-=1,u(r))},v=()=>{if(r===p){r=0,u(r);return}r+=1,u(r)},w=()=>{u(r)},E=`
    ul, ol {
      list-style: none;
      padding-left: 0;
      margin-top: 0;
      margin-bottom: 0;
    }

    .gallery-column {
      display: flex;
      flex-direction: column;
      row-gap: 40px;
    }

    .gallery-item {
      position: relative;
      width: 260px;
      height: 400px;
      border-radius: 32px;
      background-color: var(--main-dark-color);
    }

    .gallery-item img {
      position: absolute;
      bottom: 0;
      left: 0;
      object-fit: cover;
    }

    .gallery-item-row-1 {
      height: 424px;
    }

    .gallery-item-row-1:nth-child(2) {
      opacity: 0.3;
    }

    .gallery-column:nth-child(1) {
      transform: translateY(-294px);
    }

    .gallery-column:nth-child(2) {
      transform: translateY(-18px);
    }
`;class q extends HTMLElement{constructor(){var n;super(),this.attachShadow({mode:"open"}),this.columns=this.getAttribute("cols")||1,this.counts=((n=this.getAttribute("counts"))==null?void 0:n.split(","))||[],this.galleryHeight=0,this.cloneHeight=0,this.clonesPerColumn=0}static get observedAttributes(){return["cols","counts"]}connectedCallback(){const n=document.createElement("style"),c=[];n.textContent=E,this.shadowRoot.appendChild(n),this.counts.forEach(e=>{const t=Number(e),o=[];for(let s=1;s<=t;s+=1){const a=`
          <li class="gallery-item gallery-item-row-1">
            <img src="./img/hero/gallery/row-1/${s}.webp" alt="image of gallery" width="260" height="424" loading="lazy"/>
          </li>
        `;o.push(a)}c.push(o)}),c.forEach(e=>{const t=document.createElement("ul");t.classList.add("gallery-column"),t.innerHTML=e.join(""),this.shadowRoot.appendChild(t)});const i=this.shadowRoot.querySelectorAll(".gallery-column");this.cloneHeight=i[0].querySelector(".gallery-item").offsetHeight,this.galleryHeight=this.offsetHeight,this.clonesPerColumn=Math.ceil(this.galleryHeight/this.cloneHeight)+1,i.forEach(e=>{console.log(e);for(let t=0;t<this.clonesPerColumn;t+=1){const o=e.querySelector(".gallery-item").cloneNode(!0);o.classList.add("clone"),e.appendChild(o)}}),this.animate()}animate(){const n=this.shadowRoot.querySelectorAll(".gallery-column"),e=250/1e3,t=16;let o=null,s=0;const a=()=>{const h=Date.now();o||(o=h);const b=h-o;n.forEach(d=>{const S=d.offsetTop;if(s=Math.round(e*b/t),S+s>=this.galleryHeight){d.style.transform="translateY(0px)",o=null;return}d.style.transform=`translateY(${-s}px)`}),requestAnimationFrame(a)};requestAnimationFrame(a)}}const{burgerBtn:g,menu:I,body:f}=m(),A=()=>{const l=g.getAttribute("aria-expanded")==="true";if(g.setAttribute("aria-expanded",!l),I.classList.toggle("is-open"),l){f.classList.remove("no-scroll");return}f.classList.add("no-scroll")},{burgerBtn:C,prevBtn:H,nextBtn:M}=m();customElements.define("custom-scroller",q);C.addEventListener("click",A);H.addEventListener("click",L);M.addEventListener("click",v);document.addEventListener("DOMContentLoaded",w);
