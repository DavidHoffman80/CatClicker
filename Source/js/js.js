'use strict';

(function() {



  let pics = [
    {
      file: 'images/kitty.jpg',
      name: 'Fuzzy',
      clicks: 0
    },
    {
      file: 'images/blueeyes.jpg',
      name: 'Blue-Eyes',
      clicks: 0
    }
  ];

  let catPicNameParent = document.querySelector('.click-info-cont');

  pics.forEach(function(ele, index) {

    catPicNameGenerator(ele);
    
    catPicGenerator(ele);

    picEventListener(ele);
  });

  function catPicNameGenerator(ele, index) {
    let currentPos = index + 1;
    let catPicNameCont = document.createElement('div');
    catPicNameCont.classList.add(`set${currentPos}`);
    let catPicName = document.createElement('h2');
    catPicName.classList.add(`${ele.name}-heading`);
    catPicName.textContent = ele.name;
    catPicNameCont.appendChild(catPicName);
    let catClickTracker = document.createElement('h3');
    catClickTracker.classList.add(`${ele.name}-click-tracker`);
    catClickTracker.innerHTML = `Clicks: <span class="${ele.name}-click-count">${ele.clicks}</span>`;
    catPicNameCont.appendChild(catClickTracker);
    catPicNameParent.appendChild(catPicNameCont);
  }

  function catPicGenerator(ele) {
    let newCatPic = document.createElement('img');
    newCatPic.src = ele.file;
    newCatPic.classList.add(ele.name);
    catPicNameParent.appendChild(newCatPic);
  }

  function picEventListener(ele) {
    let targetElement = document.querySelector(`.${ele.name}`);
    targetElement.addEventListener('click', (function(eleCopy) {
      return function() {
        eleCopy.clicks +=1;
        let targetH3 = document.querySelector(`.${eleCopy.name}-click-count`);
        targetH3.textContent = eleCopy.clicks;
      }
    })(ele));
  }
  
})();