(()=>{var e={197:()=>{}},t={};function r(o){var n=t[o];if(void 0!==n)return n.exports;var c=t[o]={exports:{}};return e[o](c,c.exports,r),c.exports}(()=>{"use strict";function e(e,t,r,o,n,c,u,a){var i=document.querySelector("#card-template").content,l=document.querySelector(".places__list"),s=i.querySelector(".card").cloneNode(!0),d=s.querySelector(".card__delete-button"),p=s.querySelector(".card__image"),f=s.querySelector(".card__title");return p.src=e,p.alt=t,f.textContent=t,c!==u?d.remove():d.addEventListener("click",(function(){return a(s,r)})),l.addEventListener("click",o),p.addEventListener("click",n),s}function t(e){e.target.closest(".card").remove()}function o(e){e.target.classList.contains("card__like-button")&&e.target.classList.toggle("card__like-button_is-active")}var n={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_submit_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"},c=function(e,t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""}(e,t):function(e,t,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),o.textContent=r,o.classList.add(n.errorClass)}(e,t,t.validationMessage)},u=function(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))};function a(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(r){var o=e.querySelector(".".concat(r.id,"-error"));r.classList.remove(t.inputErrorClass),o.textContent="",o.classList.remove(t.errorClass)}));var r=e.querySelector(t.submitButtonSelector);r.classList.add(t.inactiveButtonClass),r.disabled=!0}function i(e){document.addEventListener("keydown",d),e.classList.add("popup_is-opened")}function l(e){document.removeEventListener("keydown",d),e.classList.remove("popup_is-opened")}function s(e){e.target===e.currentTarget&&l(e.currentTarget)}function d(e){"Escape"===e.key&&l(document.querySelector(".popup_is-opened"))}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,o=Array(t);r<t;r++)o[r]=e[r];return o}var f,m=document.querySelector(".profile__edit-button"),_=document.querySelector(".profile__add-button"),y=(document.querySelector(".card__delete-button"),document.querySelector(".popup_type_edit")),v=document.querySelector(".popup_type_update-avatar"),S=document.querySelector(".popup_type_question"),h=document.querySelector(".popup_type_new-card"),b=document.querySelector(".popup_type_image"),q=document.querySelector(".popup__image"),C=document.querySelector(".popup__caption"),g=document.querySelector(".popup__input_type_card-name"),L=document.querySelector(".popup__input_type_url"),E=document.querySelector(".profile__image"),k=document.querySelector(".profile__title"),x=document.querySelector(".profile__description"),A=document.querySelector(".popup__form"),j=document.forms.newplace,w=A.querySelector(".popup__input_type_name"),B=A.querySelector(".popup__input_type_description"),P=document.querySelector(".places__list");function T(e){var t,r,o=e.target,n=o.closest(".card").querySelector(".card__title").textContent;t=o.src,r=n,q.src=t,q.alt=r,C.textContent=r,i(b)}m.addEventListener("click",(function(){w.value=k.textContent,B.value=x.textContent,w.textContent=k.value,B.textContent=x.value,a(A,n),i(y)})),E.addEventListener("click",(function(){return i(v)})),_.addEventListener("click",(function(){L.value="",g.value="",a(j,n),i(h)})),j.addEventListener("submit",(function(r){r.preventDefault();var c=L.value,u=g.value;fetch("https://mesto.nomoreparties.co./v1/wff-cohort-21/cards",{method:"POST",headers:{authorization:"adfb87df-3032-40f6-8edf-de055a5b3295","Content-Type":"application/json"},body:JSON.stringify({name:u,link:c})}).then((function(e){return e.ok?(console.log(e),e.json()):Promise.reject("Ошибка: ".concat(e.status))})).then((function(r){var c=e(r.link,r.name,t,o,T);P.prepend(c),L.value="",g.value="",a(j,n),l(h)})).catch((function(e){console.error("Ошибка при добавлении карточки на сервер:",e)}))})),A.addEventListener("submit",(function(e){var t,r;e.preventDefault(),(t=w.value,r=B.value,fetch("https://mesto.nomoreparties.co./v1/wff-cohort-21/users/me",{method:"PATCH",headers:{authorization:"adfb87df-3032-40f6-8edf-de055a5b3295","Content-Type":"application/json"},body:JSON.stringify({name:t,about:r})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){return console.log("Профиль обновлен:",e),e})).catch((function(e){console.error("Ошибка при обновлении профиля:",e)}))).then((function(e){k.textContent=e.name,x.textContent=e.about})),l(y)})),f=document.querySelectorAll(".popup"),document.querySelectorAll(".popup__close").forEach((function(e,t){e.addEventListener("click",(function(){l(f[t])}))})),Array.from(document.querySelectorAll(".popup")).forEach((function(e){e.addEventListener("mousedown",s)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);u(r,o),r.forEach((function(t){t.addEventListener("input",(function(){c(e,t),u(r,o)}))}))}(t,e)}))}(n),Promise.all([fetch("https://mesto.nomoreparties.co./v1/wff-cohort-21/users/me",{headers:{authorization:"adfb87df-3032-40f6-8edf-de055a5b3295"}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){return console.log(e),e})).catch((function(e){console.error(e)})),fetch("https://mesto.nomoreparties.co./v1/wff-cohort-21/cards",{headers:{authorization:"adfb87df-3032-40f6-8edf-de055a5b3295"}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){return console.log(e),e})).catch((function(e){console.error(e)}))]).then((function(r){var n,c,u,a,l,s=(l=2,function(e){if(Array.isArray(e))return e}(a=r)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var o,n,c,u,a=[],i=!0,l=!1;try{if(c=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;i=!1}else for(;!(i=(o=c.call(r)).done)&&(a.push(o.value),a.length!==t);i=!0);}catch(e){l=!0,n=e}finally{try{if(!i&&null!=r.return&&(u=r.return(),Object(u)!==u))return}finally{if(l)throw n}}return a}}(a,l)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?p(e,t):void 0}}(a,l)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),d=s[0],f=s[1],m=d._id;n=d.name,c=d.about,u=d.avatar,k.textContent=n,x.textContent=c,E.style.backgroundImage="url('".concat(u,"')"),function(r,n){r.forEach((function(r){var c=e(r.link,r.name,t,o,T,r.owner._id,n,(function(e,t){i(S)}));P.append(c)}))}(f,m)})).catch((function(e){console.log(e)})),r(197)})()})();
//# sourceMappingURL=main.js.map