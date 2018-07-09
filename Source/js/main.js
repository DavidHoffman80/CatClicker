//lets start from scratch

let model = {
  currentCat: null,
  cats: [
    {
      clickCount: 0,
      name: 'Blue Eyes',
      imgSrc: 'images/blueeyes.jpg'
    },
    {
      clickCount: 0,
      name: 'Fluffy Kitty',
      imgSrc: 'images/kitty.jpg'
    },
    {
      clickCount: 0,
      name: 'Scary Cat',
      imgSrc: 'images/scarycat.jpg'
    },
  ],
  // should we show the admin area?
  showHideAdmin: false
};

let octopus = {
  init: function() {
    // Set our currcent cat to the first on in the list
    model.currentCat = model.cats[0];

    // Tell our views to initialize
    catListView.init();
    catView.init();
    adminView.init();
  },

  getCurrentCat: function() {
    return model.currentCat;
  },

  getCats: function() {
    return model.cats;
  },

  // Set the currently selected cat to the object passed in
  setCurrentCat: function(cat) {
    model.currentCat = cat;
  },

  // Incerments the counter for the currently selected cat
  incrementCounter: function() {
    model.currentCat.clickCount++;
    catView.render();
    this.showOrHideAdminArea();
  },

  // this function is called when we clicked on the admin, save or cancel buttons
  showOrHideAdmin: function() {
    // we clicked on a button should we show the admin area
    if(model.showHideAdmin === false) {
      model.showHideAdmin = true;
      this.showOrHideAdminArea();
    } else { // we are saving data or canceling so hide the admin area
      model.showHideAdmin = false;
      this.showOrHideAdminArea();
    }
  },

  // this function calls the correct render or hiding function for the admin area
  showOrHideAdminArea: function() {
    // if true render the admin area
    if(model.showHideAdmin === true) {
      adminView.render();
    } else { // if false hide the admin area
      adminView.hideAdminArea();
    }
  },

  // updates the model with any new user input for the selected photo
  updateModel: function(name, clickCount) {
    // current cat
    let currentCat = octopus.getCurrentCat();
    // array of cats
    let cats = octopus.getCats();
    // loop through the array of cats if the current cat name matches the
    // loop iteration name
    for(let i = 0; i < cats.length; i++) {
      if(currentCat.name === cats[i].name) {
        // update the array with the user input cat
        // name and click count
        model.cats[i].name = name;
        model.cats[i].clickCount = clickCount;
        model.currentCat.name = name;
        model.currentCat.clickCount = clickCount;
        // update the catView
        catView.init();
        // update the catListView
        catListView.render();
      }
    };
    // call the function to hide the admin area
    this.showOrHideAdmin();
  }
};

let adminView = {
  init: function() {
    // Store pointers to the DOM for easy access
    this.form = document.getElementById('update-pic-info');
    this.adminBtn = document.getElementById('admin');
    this.saveBtn = document.getElementById('saveBtn');
    this.cancelBtn = document.getElementById('cancelBtn');
    this.picName = document.getElementById('pic-name');
    this.picClickCount = document.getElementById('click-count');

    // On click, run the function to show the admin area
    this.adminBtn.addEventListener('click', function() {
      octopus.showOrHideAdmin();
    });

    // On click, prevent default behavior, grab the values of the
    // input fields and call the updateModel function with the
    // values in the input fields
    this.saveBtn.addEventListener('click', function(e) {
      e.preventDefault();
      let newName = document.getElementById('pic-name').value;
      let newCC = document.getElementById('click-count').value;
      octopus.updateModel(newName, newCC);
    });

    // On click, run the showOrHideAdmin function to hide the
    // admin area
    this.cancelBtn.addEventListener('click', function() {
      octopus.showOrHideAdmin();
    });
  },

  // render the admin area
  render: function() {
    // hide the admin button
    this.adminBtn.style.display = 'none';
    // show the form
    this.form.style.display = 'block';
    // set the default values of the input fields
    this.picName.value = model.currentCat.name;
    this.picClickCount.value = model.currentCat.clickCount;
  },

  // Hide the admin area
  hideAdminArea: function() {
    // hide the form
    this.form.style.display = 'none';
    // make the admin button visible again
    this.adminBtn.style.display = 'block';
  }
};

let catView = {
  init: function() {
    // Store pointers to our DOM elements for easy access later
    this.catElem = document.getElementById('cat');
    this.catNameElem = document.getElementById('cat-name');
    this.catImageElem = document.getElementById('cat-img');
    this.countElem = document.getElementById('cat-count');

    // On click, increment the current cat's counter
    this.catImageElem.addEventListener('click', function(e) {
      octopus.incrementCounter();
    });

    // Render this view (update the DOM elements with the right values)
    this.render();
  },

  render: function() {
    // Update the DOM elements with values from the current cat
    let currentCat = octopus.getCurrentCat();
    this.countElem.textContent = currentCat.clickCount;
    this.catNameElem.textContent = currentCat.name;
    this.catImageElem.src = currentCat.imgSrc;
  }
};

let catListView = {
  init: function() {
    // Store the DOM element for easy access later
    this.catListElem = document.getElementById('cat-list');

    // Render this view (update the DOM elements with the correct values)
    this.render();
  },

  render: function() {
    // get the cats we'll be rendering from the octopus
    let cats = octopus.getCats();

    // Empty the cat list
    this.catListElem.innerHTML = '';

    // Loop over the cats
    for(let i = 0; i < cats.length; i++) {
      // This is the cat we're currently looping over
      let cat = cats[i];

      // Make a new cat list item and set its text
      let elem = document.createElement('li');
      elem.textContent = cat.name;

      // On click, set CurrentCat and render the catView
      // (this uses our closure-in-a-loop trick)
      elem.addEventListener('click', (function(cat) {
        return function() {
          octopus.setCurrentCat(cat);
          catView.render();
        }
      })(cat));

      // Finally, add the element to the list
      this.catListElem.appendChild(elem);
    };
  }
};

octopus.init();