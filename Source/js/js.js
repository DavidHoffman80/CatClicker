'use strict';

(function() {

  let pics = [
    {
      file: 'images/kitty.jpg',
      name: 'Fuzzy'
    },
    {
      file: 'images/blueeyes.jpg',
      name: 'Blue-Eyes'
    }
  ];

  let parentCont = document.querySelector('.cat-pic-cont');

  pics.forEach(function(ele) {
    let newElem = document.createElement('img');
    newElem.src = ele.file;
    newElem.classList.add(ele.name);
    parentCont.appendChild(newElem);
  });

  // let catImg = document.querySelector('.cat-pic');
  // let clicks = 0;
  // catImg.addEventListener('click', function() {
  //   clicks++;
  //   clickTracker();
  // }, true);
  // function clickTracker() {
  //   let clickDisp = document.querySelector('.click-tracker');
  //   clickDisp.innerText = clicks;
  // }

})();