(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&l(o)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();const g=()=>({body:document.querySelector("body"),burgerBtn:document.querySelector("[data-menu-button]"),carousel:document.querySelector("[data-carousel]"),carouselItems:document.querySelectorAll("[data-carousel-item]"),menu:document.querySelector("[data-menu]"),nextBtn:document.querySelector("[data-next-button]"),prevBtn:document.querySelector("[data-prev-button]")}),{carousel:S,carouselItems:p}=g();let i=0;const b=p.length-1,m=a=>{if(a<0||a>b)return;const n=p[a].offsetLeft;S.scrollTo({left:n,behavior:"smooth"})},I=()=>{i!==0&&(i-=1,m(i))},L=()=>{if(i===b){i=0,m(i);return}i+=1,m(i)},v=()=>{m(i)},w=`
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
`;class q extends HTMLElement{constructor(){var c;super(),this.attachShadow({mode:"open"}),this.columns=parseInt(this.getAttribute("cols"))||1,this.startOffset=parseInt(this.getAttribute("start-offset"))||0;const n=((c=this.getAttribute("counts"))==null?void 0:c.split(","))||[];this.galleryItems=n.map(l=>{const e=Number(l),t=[];for(let o=1;o<=e;o+=1){const r=`
        <li class="gallery-item gallery-item-row-1">
          <img src="./img/hero/gallery/row-1/${o}.webp" alt="image of gallery" width="260" height="424" loading="lazy"/>
        </li>
      `;t.push(r)}return{count:e,items:t.join("")}}),this.galleryHeight=0,this.cloneHeight=0,this.clonesPerColumn=0}static get observedAttributes(){return["cols","counts","start-offset"]}connectedCallback(){var e,t,o;const n=document.createElement("style");n.textContent=w,this.shadowRoot.appendChild(n);let c=this.startOffset;const l=[];for(let r=0;r<this.columns;r++){const s=document.createElement("ul");s.classList.add("gallery-column"),s.style.transform=`translateY(${c}px)`;const u=((e=this.galleryItems[r])==null?void 0:e.items)||"";s.innerHTML=u,console.log(u),this.shadowRoot.appendChild(s),l.push(s),c+=Math.floor(Math.random()*100-50)}this.cloneHeight=((o=(t=l[0])==null?void 0:t.querySelector(".gallery-item"))==null?void 0:o.offsetHeight)||0,this.galleryHeight=this.offsetHeight,this.clonesPerColumn=Math.ceil(this.galleryHeight/this.cloneHeight)+1,l.forEach(r=>{for(let s=0;s<this.clonesPerColumn;s+=1){const u=r.querySelector(".gallery-item");if(!u)continue;const d=u.cloneNode(!0);d.classList.add("clone"),r.appendChild(d)}}),this.animate()}animate(){const n=this.shadowRoot.querySelectorAll(".gallery-column"),e=250/1e3,t=16;let o=null,r=0;const s=()=>{const u=Date.now();o||(o=u);const d=u-o;n.forEach(h=>{const x=h.offsetTop;if(r=Math.round(e*d/t),x+r>=this.galleryHeight){h.style.transform="translateY(0px)",o=null;return}h.style.transform=`translateY(${-r}px)`}),requestAnimationFrame(s)};requestAnimationFrame(s)}}const{burgerBtn:f,menu:E,body:y}=g(),A=()=>{const a=f.getAttribute("aria-expanded")==="true";if(f.setAttribute("aria-expanded",!a),E.classList.toggle("is-open"),a){y.classList.remove("no-scroll");return}y.classList.add("no-scroll")},{burgerBtn:C,prevBtn:M,nextBtn:H}=g();customElements.define("custom-scroller",q);C.addEventListener("click",A);M.addEventListener("click",I);H.addEventListener("click",L);document.addEventListener("DOMContentLoaded",v);
