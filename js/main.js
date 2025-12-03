// Disable automatic scroll restoration so the page always loads at the top
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Register GSAP + ScrollTrigger Plugin
gsap.registerPlugin(ScrollTrigger);

// ===============================
//  TAB NAVIGATION
// ===============================

const tabs = document.querySelectorAll(".tab");
const sections = document.querySelectorAll(".section");

sections.forEach((sec, i) => {
  ScrollTrigger.create({
    trigger: sec,
    start: "top center",
    end: "bottom center",
    onEnter: () => setActiveTab(i),
    onEnterBack: () => setActiveTab(i),
  });
});

function setActiveTab(index) {
  tabs.forEach(t => t.classList.remove("active"));
  tabs[index].classList.add("active");
}

// ==================================
// SWIPER (Phone Image Slider)
// ==================================

const slideSpeed = 500;
const swiper = new Swiper('.myProjectsSwiper', {
  loop: true,
  slidesPerView: 1,
  speed: slideSpeed,
  allowTouchMove: false
});


// ===============================
// PHONE MOVEMENT ANIMATION
// ===============================

const phone = document.querySelector(".device-preview");
const moves = [
  { from: "60vw", to: "60vw" },
  { from: "60vw", to: "7.5vw" },
  { from: "7.5vw", to: "40vw" },
  { from: "40vw", to: "35vw" },
  { from: "35vw", to: "70vw" }
];

document.querySelectorAll(".section").forEach((sec, i) => {
  gsap.fromTo(phone,
    { x: moves[i].from },
    {
      x: moves[i].to,
      opacity: 1,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: sec,
        start: "top bottom",
        end: "center center",
        scrub: true,
      }
    }
  );
  ScrollTrigger.create({
    trigger: sec,
    start: "top center",
    end: "bottom center",
    onEnter: () => { swiper.slideToLoop(i, slideSpeed); },
    onEnterBack: () => { swiper.slideToLoop(i, slideSpeed); },
  });
});

// =======================================
// SECTION 3 — GHOST PHONES ANIMATION
// =======================================
gsap.timeline({
  scrollTrigger: {
    trigger: "#brand-coherence",
    start: "top center",
    end: "bottom center",
    scrub: true,
  }
})
// 1️⃣ Tiny reversible fade-in
.fromTo([".ghost-1", ".ghost-2"],
  { opacity: 0 },
  { opacity: 1, duration: 0.01 },
  0
)

// 2️⃣ Slide animation (NO opacity here!)
.fromTo(".ghost-1",
  { x: "12vw" },
  { x: "55vw", ease: "power2.out" },
  0
)
.fromTo(".ghost-2",
  { x: "12vw" },
  { x: "80vw", ease: "power2.out" },
  0
)

// 3️⃣ Fade OUT at the end
.to([".ghost-1", ".ghost-2"], {
  opacity: 0,
  ease: "power1.out"
});


// gsap.timeline({
//   scrollTrigger: {
//     trigger: "#brand-coherence",
//     start: "top center",   
//     end: "bottom center",
//     scrub: true,
//   }
// })
// .fromTo(".ghost-1",
//   { x: "12vw", opacity: 0 },
//   { x: "55vw", opacity: 1, ease: "power2.out", zIndex: 98 },
//   0
// )
// .fromTo(".ghost-2",
//   { x: "12vw", opacity: 0 },
//   { x: "80vw", opacity: 1, ease: "power2.out", zIndex: 97 },
//   0
// )
// .to([".ghost-1", ".ghost-2"], {
//   opacity: 1
// })
// .to([".ghost-1", ".ghost-2"], {
//   opacity: 0,
//   ease: "power1.out"
// });

// =======================================
// FADE PREVIOUS SECTION CONTENT
// =======================================
const fadeSections = document.querySelectorAll(".fade-section-content");

fadeSections.forEach((section, i) => {

  let prev = fadeSections[i - 1];

  gsap.to(section, {
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: section,
      start: "top center",
      end: "top top",
      scrub: true,
    }
  });
});