

// // 슬라이드 내 이미지 관련=======================================================
// const galleryItem = document.querySelectorAll(".gallery-item");
// const overlay = document.querySelector(".overlay");
// const modal = document.querySelector(".modal");
// const close = document.querySelector(".close");
// const next = document.querySelector(".next");
// const prev = document.querySelector(".prev");

// var idx_src_arr = {};
// var current_idx = 0;


// //clicking on image item
// galleryItem.forEach((item, i) => {
//   idx_src_arr[i] = item.children[0].src;
//   item.addEventListener("click", function(){
//     current_idx = i;
//     // console.log(item.children[0].src);
//     overlay.classList.add("show");
//     modal.classList.add("show");
//     modal.children[0].src=item.children[0].src;
//   });
// })

// //close button
// close.addEventListener("click", function(){
//     overlay.classList.remove("show");
//     modal.classList.remove("show");
// })

// let show_modal = (src_str) => {
//   modal.children[0].src = src_str;
// }

// //next
// next.addEventListener('click', function(){
//   // console.log("next");
//   //showSlide(slideIdx++);
//   if(current_idx == galleryItem.length - 1){
//     current_idx = 0;
//   }
//   else{
//     current_idx = current_idx + 1;
//   }
//   show_modal(idx_src_arr[current_idx]);
// })
// //back
// prev.addEventListener('click', function(){
//   if(current_idx == 0){
//     current_idx = galleryItem.length - 1;
//   }
//   else{
//     current_idx = current_idx - 1;
//   }
//   show_modal(idx_src_arr[current_idx]);
// })


// let slideIdx = 0;
// let showSlide = (idx) => {
//   console.log(idx)
  
//   if (idx >= galleryItem.length){
//     slideIdx = 0;
//   }
//   if(idx < 0){
//     slideIdx = galleryItem.length-1;}
  
//   // console.log(galleryItem[slideIdx].children[0].src);
//   modal.children[0].src=galleryItem[slideIdx].children[0].src;
// }
//next
// next.addEventListener('click', function(){
//   // console.log("next");
//   showSlide(slideIdx++);
// })
// //back
// prev.addEventListener('click', function(){
//   // console.log("prev");
//   showSlide(slideIdx--);
// })


// 모달창====================================




// 이미지 업로드 모달

// 모달창====================================
const imgloremIpsum = document.getElementById("lorem-ipsum")
fetch("https://baconipsum.com/api/?type=all-meat&paras=200&format=html")
    .then(response => response.text())
    .then(result => loremIpsum.innerHTML = result)
const imgmodal = document.getElementById("img-modal")
function modalOn() {
   imgmodal.style.display = "flex"
}
function isModalOn() {
    return imgmodal.style.display === "flex"
}
function modalOff() {
    imgmodal.style.display = "none"
}
const imgbtnModal = document.getElementById("img-btn-modal")
imgbtnModal.addEventListener("click", e => {
    modalOn()
})
const imgcloseBtn = imgmodal.querySelector(".close-area")
imgcloseBtn.addEventListener("click", e => {
    modalOff()
})
imgmodal.addEventListener("click", e => {
    const evTarget = e.target
    if(evTarget.classList.contains("img-modal-overlay")) {
        modalOff()
    }
})
window.addEventListener("keyup", e => {
    if(isModalOn() && e.key === "Escape") {
        modalOff()
    }
})
 


// 필터 업로드 모달창
const loremIpsum = document.getElementById("lorem-ipsum")
fetch("https://baconipsum.com/api/?type=all-meat&paras=200&format=html")
    .then(response => response.text())
    .then(result => loremIpsum.innerHTML = result)
const modal = document.getElementById("modal")
function modalOn() {
    modal.style.display = "flex"
}
function isModalOn() {
    return modal.style.display === "flex"
}
function modalOff() {
    modal.style.display = "none"
}
const btnModal = document.getElementById("btn-modal")
btnModal.addEventListener("click", e => {
    modalOn()
})
const closeBtn = modal.querySelector(".close-area")
closeBtn.addEventListener("click", e => {
    modalOff()
})
modal.addEventListener("click", e => {
    const evTarget = e.target
    if(evTarget.classList.contains("modal-overlay")) {
        modalOff()
    }
})
window.addEventListener("keyup", e => {
    if(isModalOn() && e.key === "Escape") {
        modalOff()
    }
})
 