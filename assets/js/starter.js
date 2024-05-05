import "../../node_modules/bootstrap/js/dist/util.js";
import "../../node_modules/bootstrap/js/dist/modal.js";
import { gsap } from "../../node_modules/gsap/index.js";
import { DrawSVGPlugin } from "./inc/DrawSVGPlugin.js";

import { ScrollTrigger } from "../../node_modules/gsap/ScrollTrigger.js";


gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

const gridAnimation = () => {
  const grids = document.querySelectorAll('[data-grid]');

  grids.forEach((grid) => {
    const check = grid.querySelector('[data-grid-check]'),
      mask = grid.querySelector('[data-grid-mask]');

    const gridReveal = gsap.timeline({
      scrollTrigger: {
        trigger: grid,
      },
    })

    gridReveal
      .to(mask, { duration:2.7, drawSVG: 0})
      .from(check, {duration: 1, scale: 0, transformOrigin: "center", opacity: 0})

  });
}

const imageAnimation = () => {
  const images = document.querySelectorAll('[data-image]');

  images.forEach((image) => {
    const bg = image.querySelector('[data-image-bg]'),
      icon = image.querySelector('[data-image-icon]');

    const imageReveal = gsap.timeline({
      scrollTrigger: {
        trigger: image,
        start: "50% bottom"
      },
    })

    imageReveal
      .from(image, {duration: 1, opacity: 0, x: -30})
      .from(icon, {duration: 0.65, opacity: 0, scale: 0.65}, "-=0.4")
      .from(bg, {duration: 2, opacity: 0}, "-=0.4")
  })
}

const parallaxElements = () => {
  const els = document.querySelectorAll('[data-para]');

  els.forEach((el) => {
    let distance = el.dataset.para || 50;

    if (window.innerWidth < 576) {
      distance = distance / 2;

      if (el.classList.contains('mobile-no-para')) {
        return;
      }
    }


    let reveal = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      },
    });

    reveal.to(el, {y: distance, ease: "none"} )
  })
}

const graphAnimation = () => {
  const graph = document.querySelector('[data-graph]'),
    top = graph.querySelector('[data-graph-top]'),
    left = graph.querySelector('[data-graph-left]'),
    right = graph.querySelector('[data-graph-right]');

  let reveal = gsap.timeline({
    defaults: {
      duration: 0.7
    },
    scrollTrigger: {
      trigger: graph,
      start: "bottom bottom"
    },
  });

  reveal
    .from(left, {x: -30, opacity: 0})
    .from(top, {y: -30, opacity: 0}, "-=0.65")
    .from(right, {x: 30, opacity: 0}, "-=0.6")
    .from('[data-graph-text]', {fill: "#6E6D85"}, "-=0.5")
    .from('[data-graph-light-text]', {fill: "#ffffff"}, "-=0.5")
}

graphAnimation();
gridAnimation();
imageAnimation();
parallaxElements();

