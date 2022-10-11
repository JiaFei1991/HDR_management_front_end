export function vh(percent) {
  var h = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
  return (percent * h) / 100;
}

export function vw(percent) {
  var w = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  return (percent * w) / 100;
}

export function vwToPx(vw) {
  var w = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  return w * (vw / 100);
}

export function resizeEventCard(isThereAllday, target) {
  // const fullWidth = document.getElementsByName('0-first')[0].clientWidth;
  const fullWidth = target.parentElement.clientWidth;

  let cardWidth;
  isThereAllday
    ? (cardWidth = `${fullWidth - vwToPx(2)}px`)
    : (cardWidth = `${fullWidth}px`);
  target.style.width = cardWidth;
}
