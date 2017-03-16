const preLoader = (element => {
  element.style.opacity = 1;
  const interPreLoader = setInterval(() => {
    element.style.opacity = element.style.opacity - 0.05;
    if (element.style.opacity <= 0.05) {
      clearInterval(interPreLoader);
      // preLoaderDiv.style.display
      //   = "none";
    }
  }, 16);
});

export default preLoader;
