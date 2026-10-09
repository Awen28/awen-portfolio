(function () {
  const elior = document.getElementById('elior');
  if (!elior) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasPointer = window.matchMedia('(pointer: fine)').matches;
  if (reduceMotion || !hasPointer) return;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  const handleMove = (event) => {
    targetX = Math.max(
      -1,
      Math.min(1, (event.clientX - window.innerWidth / 2) / (window.innerWidth / 2))
    );
    targetY = Math.max(
      -1,
      Math.min(1, (event.clientY - window.innerHeight / 2) / (window.innerHeight / 2))
    );
  };

  window.addEventListener('mousemove', handleMove, { passive: true });

  const tick = () => {
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;

    elior.style.setProperty('--wx', (-1.5 + currentX * 3).toFixed(2) + 'px');
    elior.style.setProperty('--wy', (-1.5 + currentY * 3).toFixed(2) + 'px');
    elior.style.setProperty('--dx', (1.5 - currentX * 3).toFixed(2) + 'px');
    elior.style.setProperty('--dy', (2 - currentY * 3).toFixed(2) + 'px');

    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
})();
