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
    let catPicNameCont = document.createElement('div');
    let catPicName = document.createElement('h2');
    catPicName.classList.add(`${ele.name}-heading`);
    catPicName.textContent = ele.name;
    catPicNameCont.appendChild(catPicName);
    let catClickTracker = document.createElement('h3');
    catClickTracker.classList.add(`${ele.name}-click-tracker`);
    catClickTracker.innerHTML = `Clicks: <span class="${ele.name}-click-count">0</span>`;
    catPicNameCont.appendChild(catClickTracker);
    catPicNameParent.appendChild(catPicNameCont);

    let newCatPic = document.createElement('img');
    newCatPic.src = ele.file;
    newCatPic.classList.add(ele.name);
    catPicParent.appendChild(newCatPic);
  });

  let catImg = document.querySelector('.cat-pic-cont');
  let FuzzyClicks = 0;
  let BlueEyesClicks = 0;
  
  catImg.addEventListener('click', function() {
    if(event.target.className === pics[0].name) {
      FuzzyClicks++;
      fuzzyClickTracker();
    } else if(event.target.className === pics[1].name) {
      BlueEyesClicks++;
      blueEyesClickTracker();
    }
  });

  function fuzzyClickTracker() {
    let fuzzyClickDisp = document.querySelector('.Fuzzy-click-count');
    fuzzyClickDisp.innerText = FuzzyClicks;
  }

  function blueEyesClickTracker() {
    let BlueEyesClickDisp = document.querySelector('.Blue-Eyes-click-count');
    BlueEyesClickDisp.innerText = BlueEyesClicks;
  }

})();