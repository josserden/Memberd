(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))u(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&u(s)}).observe(document,{childList:!0,subtree:!0});function d(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function u(e){if(e.ep)return;e.ep=!0;const t=d(e);fetch(e.href,t)}})();const f=()=>({body:document.querySelector("body"),burgerBtn:document.querySelector("[data-menu-button]"),carousel:document.querySelector("[data-carousel]"),carouselItems:document.querySelectorAll("[data-carousel-item]"),menu:document.querySelector("[data-menu]"),nextBtn:document.querySelector("[data-next-button]"),prevBtn:document.querySelector("[data-prev-button]")}),{carousel:S,carouselItems:p}=f();let a=0;const b=p.length-1,h=c=>{if(c<0||c>b)return;const o=p[c].offsetLeft;S.scrollTo({left:o,behavior:"smooth"})},I=()=>{a!==0&&(a-=1,h(a))},L=()=>{if(a===b){a=0,h(a);return}a+=1,h(a)},v=()=>{h(a)},w=`
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
`;class q extends HTMLElement{constructor(){var o;super(),this.attachShadow({mode:"open"}),this.columns=parseInt(this.getAttribute("cols"))||1,this.startOffset=parseInt(this.getAttribute("start-offset"))||0,this.counts=((o=this.getAttribute("counts"))==null?void 0:o.split(","))||[],this.galleryHeight=0,this.cloneHeight=0,this.clonesPerColumn=0}static get observedAttributes(){return["cols","counts","start-offset"]}connectedCallback(){var t,s;const o=document.createElement("style"),d=[];let u=this.startOffset;o.textContent=w,this.shadowRoot.appendChild(o),this.counts.forEach(r=>{const n=Number(r),l=[];for(let i=1;i<=n;i+=1){const m=`
          <li class="gallery-item gallery-item-row-1">
            <img src="./img/hero/gallery/row-1/${i}.webp" alt="image of gallery" width="260" height="424" loading="lazy"/>
          </li>
        `;l.push(m)}d.push(l)});for(let r=0;r<this.columns;r++){const n=document.createElement("ul");n.classList.add("gallery-column"),n.style.transform=`translateY(${u}px)`;const l=d.map(i=>i[r]||"");n.innerHTML=l.join(""),this.shadowRoot.appendChild(n),u+=Math.floor(Math.random()*100-50)}const e=this.shadowRoot.querySelectorAll(".gallery-column");this.cloneHeight=((s=(t=e[0])==null?void 0:t.querySelector(".gallery-item"))==null?void 0:s.offsetHeight)||0,this.galleryHeight=this.offsetHeight,this.clonesPerColumn=Math.ceil(this.galleryHeight/this.cloneHeight)+1,e.forEach(r=>{for(let n=0;n<this.clonesPerColumn;n+=1){const l=r.querySelector(".gallery-item");if(!l)continue;const i=l.cloneNode(!0);i.classList.add("clone"),r.appendChild(i)}}),this.animate()}animate(){const o=this.shadowRoot.querySelectorAll(".gallery-column"),e=250/1e3,t=16;let s=null,r=0;const n=()=>{const l=Date.now();s||(s=l);const i=l-s;o.forEach(m=>{const x=m.offsetTop;if(r=Math.round(e*i/t),x+r>=this.galleryHeight){m.style.transform="translateY(0px)",s=null;return}m.style.transform=`translateY(${-r}px)`}),requestAnimationFrame(n)};requestAnimationFrame(n)}}const{burgerBtn:g,menu:E,body:y}=f(),A=()=>{const c=g.getAttribute("aria-expanded")==="true";if(g.setAttribute("aria-expanded",!c),E.classList.toggle("is-open"),c){y.classList.remove("no-scroll");return}y.classList.add("no-scroll")},{burgerBtn:C,prevBtn:M,nextBtn:H}=f();customElements.define("custom-scroller",q);C.addEventListener("click",A);M.addEventListener("click",I);H.addEventListener("click",L);document.addEventListener("DOMContentLoaded",v);
