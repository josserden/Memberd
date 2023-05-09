(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const t of o.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&a(t)}).observe(document,{childList:!0,subtree:!0});function u(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=u(e);fetch(e.href,o)}})();const g=()=>({body:document.querySelector("body"),burgerBtn:document.querySelector("[data-menu-button]"),carousel:document.querySelector("[data-carousel]"),carouselItems:document.querySelectorAll("[data-carousel-item]"),menu:document.querySelector("[data-menu]"),nextBtn:document.querySelector("[data-next-button]"),prevBtn:document.querySelector("[data-prev-button]")}),{carousel:x,carouselItems:p}=g();let i=0;const b=p.length-1,d=c=>{if(c<0||c>b)return;const n=p[c].offsetLeft;x.scrollTo({left:n,behavior:"smooth"})},L=()=>{i!==0&&(i-=1,d(i))},I=()=>{if(i===b){i=0,d(i);return}i+=1,d(i)},v=()=>{d(i)},w=`
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
`;class q extends HTMLElement{constructor(){var n;super(),this.attachShadow({mode:"open"}),this.columns=parseInt(this.getAttribute("cols"))||1,this.counts=((n=this.getAttribute("counts"))==null?void 0:n.split(","))||[],this.galleryHeight=0,this.cloneHeight=0,this.clonesPerColumn=0}static get observedAttributes(){return["cols","counts"]}connectedCallback(){var e,o;const n=document.createElement("style"),u=[];n.textContent=w,this.shadowRoot.appendChild(n),this.counts.forEach(t=>{const r=Number(t),s=[];for(let l=1;l<=r;l+=1){const m=`
          <li class="gallery-item gallery-item-row-1">
            <img src="./img/hero/gallery/row-1/${l}.webp" alt="image of gallery" width="260" height="424" loading="lazy"/>
          </li>
        `;s.push(m)}u.push(s)});for(let t=0;t<this.columns;t++){const r=document.createElement("ul");r.classList.add("gallery-column");const s=u.map(l=>l[t]||"");r.innerHTML=s.join(""),this.shadowRoot.appendChild(r)}const a=this.shadowRoot.querySelectorAll(".gallery-column");this.cloneHeight=((o=(e=a[0])==null?void 0:e.querySelector(".gallery-item"))==null?void 0:o.offsetHeight)||0,this.galleryHeight=this.offsetHeight,this.clonesPerColumn=Math.ceil(this.galleryHeight/this.cloneHeight)+1,a.forEach(t=>{for(let r=0;r<this.clonesPerColumn;r+=1){const s=t.querySelector(".gallery-item");if(!s)continue;const l=s.cloneNode(!0);l.classList.add("clone"),t.appendChild(l)}}),this.animate()}animate(){const n=this.shadowRoot.querySelectorAll(".gallery-column"),e=250/1e3,o=16;let t=null,r=0;const s=()=>{const l=Date.now();t||(t=l);const m=l-t;n.forEach(h=>{const S=h.offsetTop;if(r=Math.round(e*m/o),S+r>=this.galleryHeight){h.style.transform="translateY(0px)",t=null;return}h.style.transform=`translateY(${-r}px)`}),requestAnimationFrame(s)};requestAnimationFrame(s)}}const{burgerBtn:f,menu:E,body:y}=g(),A=()=>{const c=f.getAttribute("aria-expanded")==="true";if(f.setAttribute("aria-expanded",!c),E.classList.toggle("is-open"),c){y.classList.remove("no-scroll");return}y.classList.add("no-scroll")},{burgerBtn:C,prevBtn:H,nextBtn:M}=g();customElements.define("custom-scroller",q);C.addEventListener("click",A);H.addEventListener("click",L);M.addEventListener("click",I);document.addEventListener("DOMContentLoaded",v);
