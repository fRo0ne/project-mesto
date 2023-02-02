(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),p:""};e.d({},{U8:()=>G});var t=function(e,t,o){n(e,o)?(t.classList.remove(o.modalButtonSubmitActive),t.classList.add(o.modalButtonSubmitDisabled),t.setAttribute("disabled",!0)):(t.classList.add(o.modalButtonSubmitActive),t.classList.remove(o.modalButtonSubmitDisabled),t.removeAttribute("disabled"))},n=function(e,t){return e.some((function(e){return 0===e.value.length||e.classList.contains(t.modalInputError)}))},o=function(e,t,n){t.validity.patternMismatch?r(e,t,t.dataset.invalidMessage,n):t.validity.valid?a(e,t,n):r(e,t,t.validationMessage,n)},r=function(e,t,n,o){var r=e.querySelector(".popup__item-".concat(t.name));t.classList.add(o.modalInputError),r.textContent=n,r.classList.add(o.modalInvalidMessageShow)},a=function(e,t,n){var o=e.querySelector(".popup__item-".concat(t.name));t.classList.remove(n.modalInputError),o.classList.remove(n.modalInvalidMessageShow)};e.p,e.p,e.p,e.p,e.p,e.p;var c,i,l={baseUrl:"https://nomoreparties.co/v1/plus-cohort-19",headers:{authorization:"5fc6c1ef-24ac-466a-ac09-472249785b0e","Content-Type":"application/json"}},u=!1,s=!1,d=document.querySelectorAll(".popup"),f=document.querySelector(".popup_edit-profile"),m=document.querySelector(".popup_add-card"),p=document.querySelector(".popup_image"),v=p.querySelector(".popup__picture"),h=p.querySelector(".figure__quote"),_=document.querySelector(".popup_avatar-edit"),y=document.forms.profileAction,b=y.elements.name,g=y.elements.description,S=document.forms.cardAction,L=S.elements.text,E=S.elements.url,q=document.forms.profileAvatarAction,k=q.elements.url,A=document.querySelector(".content"),C=A.querySelector(".profile"),x=A.querySelector(".profile__title"),I=A.querySelector(".profile__quote"),w=A.querySelector(".profile__image"),U=A.querySelector(".elements__container"),O=document.querySelector("#cards-element").content;function j(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",B)}function T(e){e.classList.add("popup_opened"),document.addEventListener("keydown",B)}function B(e){if("Escape"===e.key){var t=document.querySelector(".popup_opened");t&&j(t)}}function P(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранить",o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Сохранение...";switch(e){case!0:t.textContent=o;break;case!1:t.textContent=n}}function M(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранение...";t.preventDefault();var o=t.submitter,r=o.textContent;P(!0,o,r,n),e().then((function(){t.target.reset()})).catch((function(e){console.error("Ошибка: ".concat(e))})).finally((function(){P(!1,o,r)}))}function D(e){return e.ok?e.json():Promise.reject(e)}function F(e,t){return fetch(e,t).then(D)}function N(e){return F("".concat(l.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:l.headers}).catch((function(e){console.log(e)}))}function J(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,o=arguments.length>3?arguments[3]:void 0,r=O.querySelector(".card").cloneNode(!0),a=r.querySelector(".card__image"),c=r.querySelector(".card__delete-button"),i=r.querySelector(".card__like"),l=r.querySelector(".card__like-count");return u||c.remove(),s&&i.classList.add("card__like_active"),a.id=o,a.src=e,a.alt=t,l.textContent=n,r.querySelector(".card__info").textContent=t,c.addEventListener("click",(function(e){N(o).then((function(t){t&&H(e.target.closest(".card"))})).catch((function(e){return console.log(e)}))})),i.addEventListener("click",(function(e){z(i,l,a)})),a.addEventListener("click",(function(e){G(e.target)})),r}function H(e){e.remove()}function z(e,t,n){var o;e.classList.contains("card__like_active")?(o=n.id,F("".concat(l.baseUrl,"/cards/likes/").concat(o),{method:"DELETE",headers:l.headers}).catch((function(e){console.log(e)}))).then((function(n){n&&(e.classList.remove("card__like_active"),t.textContent=n.likes.length)})).catch((function(e){return console.log(e)})):function(e){return F("".concat(l.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:l.headers}).catch((function(e){console.log(e)}))}(n.id).then((function(n){n&&(e.classList.add("card__like_active"),t.textContent=n.likes.length)})).catch((function(e){return console.log(e)}))}function $(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}function G(e){v.src=e.src,v.alt=e.alt,h.textContent=e.alt,T(p)}C.addEventListener("click",(function(e){var t=e.target;t.classList.contains("profile__edit-button")?(b.value=x.textContent,g.value=I.textContent,T(f)):t.classList.contains("profile__add-button")?T(m):t.classList.contains("profile__image")&&T(_)})),d.forEach((function(e){e.addEventListener("click",(function(t){t.target.classList.contains("popup__close")&&j(e),t.target.classList.contains("popup")&&j(e)}))})),y.addEventListener("submit",(function(e){M((function(){return(e=b,t=g,F("".concat(l.baseUrl,"/users/me"),{method:"PATCH",headers:l.headers,body:JSON.stringify({name:e.value,about:t.value})}).catch((function(e){console.log(e)}))).then((function(e){x.textContent=e.name,I.textContent=e.about,j(f)}));var e,t}),e)})),S.addEventListener("submit",(function(e){M((function(){return(e=L,t=E,F("".concat(l.baseUrl,"/cards"),{method:"POST",headers:l.headers,body:JSON.stringify({name:e.value,link:t.value})}).catch((function(e){console.log(e)}))).then((function(e){u=!0;var t=L.value,n=E.value;U.prepend(J(n,t,0,e._id)),j(m)}));var e,t}),e)})),q.addEventListener("submit",(function(e){M((function(){return(e=k,F("".concat(l.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:l.headers,body:JSON.stringify({avatar:e.value})}).catch((function(e){console.log(e)}))).then((function(e){w.style.backgroundImage="url(".concat(e.avatar),j(_)}));var e}),e)})),Promise.all([F("".concat(l.baseUrl,"/users/me"),{headers:l.headers}).catch((function(e){console.log(e)})),F("".concat(l.baseUrl,"/cards"),{headers:l.headers}).catch((function(e){console.log(e)}))]).then((function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,a,c,i=[],l=!0,u=!1;try{if(a=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;l=!1}else for(;!(l=(o=a.call(n)).done)&&(i.push(o.value),i.length!==t);l=!0);}catch(e){u=!0,r=e}finally{try{if(!l&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(u)throw r}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return $(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?$(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),r=o[0],a=o[1];w.style.backgroundImage="url(".concat(r.avatar),x.textContent=r.name,I.textContent=r.about,c=r._id,a.forEach((function(e){s=!1,u=c===e.owner._id,e.likes.forEach((function(e){e._id===c&&(s=!0)})),U.append(J(e.link,e.name,e.likes.length,e._id))}))})).catch((function(e){console.log(e)})),i={modalForms:".popup__form",modalInputField:".popup__item",modalInputError:"popup__item_error",modalInvalidMessageShow:"popup__item-notify_active",modalButtonSubmit:".popup__button",modalButtonSubmitActive:"popup__button_active",modalButtonSubmitDisabled:"popup__button_disabled"},Array.from(document.querySelectorAll(i.modalForms)).forEach((function(e){!function(e,n){var r=Array.from(e.querySelectorAll(n.modalInputField)),a=e.querySelector(n.modalButtonSubmit);t(r,a,n),e.addEventListener("reset",(function(){setTimeout((function(){t(r,a,n)}),0)})),r.forEach((function(c){c.addEventListener("input",(function(){o(e,c,n),t(r,a,n)}))}))}(e,i)}))})();