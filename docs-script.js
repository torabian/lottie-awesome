const getButtonUrl = button => {
  return `https://raw.githubusercontent.com/torabian/rovx-gamepad/master/src/components/GamepadButton/json/btn-${button}.json`;
};
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function renderButtons(list) {
  for (let item of list) {
    fetch(getButtonUrl(item)).then(async data => {
      const animData = await data.json();
      setTimeout(() => {
        render(item, animData);
      }, randomIntFromInterval(200, 900));
    });
  }
}
renderButtons([
  'circle',
  'rectangle',
  'cross',
  'triangle',
  'up',
  'down',
  'left',
  'right'
]);

function render(buttonName, data) {
  let animation = bodymovin.loadAnimation({
    container: document.getElementById(buttonName),
    renderer: 'svg',
    autoplay: true,
    loop: false,
    animationData: data
  });
  // Wait for all animation data to be loaded in DOM
  animation.addEventListener('DOMLoaded', function() {
    let isRevert = true;
    // Once animation is complete go back to frame 0 on timeline
    animation.addEventListener('complete', function() {
      setTimeout(
        () => {
          if (isRevert) {
            animation.setDirection(-1);
            animation.play();
            isRevert = false;
          } else {
            animation.setDirection(1);
            animation.goToAndPlay(0);
            isRevert = true;
          }
        },
        isRevert ? 3000 : 100
      );
    });
  });
}
function loadFonts(list) {
  for (let item of list) {
    fetch(`fonts/${item}.json`).then(async data => {
      render(item, await data.json());
    });
  }
}

const fonts = [
  'arrow-alt-circle-down',
  'chart-bar',
  'check-square',
  'cloud-download-alt',
  'cloud-upload-alt',
  'comment-dots'
];

loadFonts(fonts);
