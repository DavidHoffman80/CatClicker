'use strict';

(function() {

  let catImg = document.querySelector('.cat-pic');
  let clicks = 0;

  catImg.addEventListener('click', function() {
    clicks++;
    clickTracker();
  }, true);

  function clickTracker() {
    let clickDisp = document.querySelector('.click-tracker');
    clickDisp.innerText = clicks;
  }

})();