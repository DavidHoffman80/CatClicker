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

  let catPicNameParent = document.querySelector('.click-info-cont');
  let catPicParent = document.querySelector('.cat-pic-cont');

  pics.forEach(function(ele, index) {
    let catPicName = document.createElement('h2');
    catPicName.classList.add(`${ele.name}-heading`);
    catPicName.textContent = ele.name;
    catPicNameParent.appendChild(catPicName);

    let newCatPic = document.createElement('img');
    newCatPic.src = ele.file;
    newCatPic.classList.add(ele.name);
    catPicParent.appendChild(newCatPic);
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