(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const d=()=>({body:document.querySelector("body"),burgerBtn:document.querySelector("[data-menu-button]"),carousel:document.querySelector("[data-carousel]"),carouselItems:document.querySelectorAll("[data-carousel-item]"),menu:document.querySelector("[data-menu]"),nextBtn:document.querySelector("[data-next-button]"),prevBtn:document.querySelector("[data-prev-button]")}),{carousel:x,carouselItems:y}=d();let n=0;const p=y.length-1,c=l=>{if(l<0||l>p)return;const o=y[l].offsetLeft;x.scrollTo({left:o,behavior:"smooth"})},L=()=>{n!==0&&(n-=1,c(n))},v=()=>{if(n===p){n=0,c(n);return}n+=1,c(n)},w=()=>{c(n)},q=`
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
`;class E extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.columns=this.getAttribute("cols")||1,this.galleryHeight=0,this.cloneHeight=0,this.clonesPerColumn=0}static get observedAttributes(){return["cols"]}connectedCallback(){const o=document.createElement("style");o.textContent=q,this.shadowRoot.appendChild(o);for(let r=0;r<this.columns;r+=1){const e=document.createElement("ul");e.classList.add("gallery-column"),e.innerHTML=`
            <li class='gallery-item gallery-item-row-1'>
              <img
                src='./img/hero/gallery/row-1/${r+1}.webp'
                alt='image of gallery'
                width='260'
                height='424'
                loading='lazy'
              />
            </li>
      `,this.shadowRoot.appendChild(e)}const i=this.shadowRoot.querySelectorAll(".gallery-column");this.cloneHeight=i[0].querySelector(".gallery-item").offsetHeight,this.galleryHeight=this.offsetHeight,this.clonesPerColumn=Math.ceil(this.galleryHeight/this.cloneHeight)+1,i.forEach(r=>{for(let e=0;e<this.clonesPerColumn;e+=1){const t=r.querySelector(".gallery-item").cloneNode(!0);t.classList.add("clone"),r.appendChild(t)}}),this.animate()}animate(){const o=this.shadowRoot.querySelectorAll(".gallery-column"),e=250/1e3,t=16;let s=null,a=0;const m=()=>{const h=Date.now();s||(s=h);const b=h-s;o.forEach(u=>{const S=u.offsetTop;if(a=Math.round(e*b/t),S+a>=this.galleryHeight){u.style.transform="translateY(0px)",s=null;return}u.style.transform=`translateY(${-a}px)`}),requestAnimationFrame(m)};requestAnimationFrame(m)}}const{burgerBtn:g,menu:A,body:f}=d(),H=()=>{const l=g.getAttribute("aria-expanded")==="true";if(g.setAttribute("aria-expanded",!l),A.classList.toggle("is-open"),l){f.classList.remove("no-scroll");return}f.classList.add("no-scroll")},{burgerBtn:M,prevBtn:C,nextBtn:I}=d();customElements.define("custom-scroller",E);M.addEventListener("click",H);C.addEventListener("click",L);I.addEventListener("click",v);document.addEventListener("DOMContentLoaded",w);
