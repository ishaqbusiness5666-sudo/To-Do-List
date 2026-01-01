lt = gsap.timeline();
lt.from("#logo", {
    transform: "scale(20)",
    y: -500,
    opacity: 0,
    duration: 0.4,
    ease: "expo.inOut"

});
lt.from("nav button", {
    transform: "scale(0.01)",
    x: 400,
    duration: 0.5,
    stagger: 0.4,
    opacity: 0,
});
lt.from("#navIcon", {
    transform: "scale(10)",
    y: -400,
    duration: 0.3,
    stagger: 0.4,
    opacity: 0,
    ease: "expo.inOut"
});
lt.from("main input", {
    transform: "scale(0)",
    x: 800,
    rotation: 200,
    duration: 1.2,
    opacity: 0,
    ease: "sine.inOut"
});
lt.from("main button", {
    transform: "scale(0.0)",
    x: -700,
    opacity: 0,
    rotation: -200,
    duration: 1.8,
    ease: "back.out(1,0.3)"
});
lt.from("main ul ", {
    transform: "scale(20)",
    x: -700,
    opacity: 0,
    duration: 0.5,
});
lt.from("footer", {
    y: 1000,
    opacity: 0,
    duration: 0.4,
    ease: 'banuce.out'
});