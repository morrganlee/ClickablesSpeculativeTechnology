
/***********************************************************************************
  Clickables with Speculative Technology
  by Morgan Lee

  Experiments with p5.clickable class and ClickableManager for
  future speculative technology in the form of:
  (1) allocate and set variables from a .csv file
  (2) draw all the clickables that are visible in a single function


***********************************************************************************/

// the manager class
var clickablesManager;

// an array of clickable objects
var clickables;

// indexes into the array (constants)
const bedIndex = 0;
const dreamsIndex = 1;
const viewerIndex = 2;
const morningIndex = 3;
const nightIndex = 4;

// constants for the pillow
const pillowSize = 50;

// locations for pillow + images
const xPos = 535;
const yPos = 70;

// variables for the ballon
var ellipseDiameter = pillowSize;

// image variables
var pillowImg;
var images = [];
var currentImageIndex = 0;

// pop sound
var popSound;

// ALWAYS allocate the ClickableManager in the preload() function
// if you get an error here, it is likely the .csv file that is not the
// correct filename or path
function preload(){
  clickablesManager = new ClickableManager('assets/clickableLayout.csv');

  // load images
  pillowImg = loadImage('assets/pillow.png');
  bedImg = loadImage('assets/bed.png');
  dreamsImg = loadImage('assets/dreams.png');
  viewerImg = loadImage('assets/viewer.png');
}

// ALWAYS call the setup() funciton for ClickableManager in the setup(), after
// the class has been allocated in the preload() function.
function setup() {
  createCanvas(1200,800);  

  imageMode(CORNER);
  rectMode(CORNER);

  // load the pop sound
  // soundFormats('mp3');
  // popSound = loadSound('assets/pop.mp3');

  // setup the clickables = this will allocate the array
  clickables = clickablesManager.setup();

  // call OUR function to setup additional information about the p5.clickables
  // that are not in the array 
  setupClickables(); 

  // start with just the pillow
  newPillow(bedIndex);

  // output to the message window
  console.log(clickables);

  // center images
  // imageMode(CENTER);
}

// Just draw the button
function draw() {
  background("#516984");

  drawText();

  // draw the p5.clickables
  clickablesManager.draw();

  // draw pillow
  drawPillow();
}

function drawText() {
  fill('#e8e8e8');
  textSize(30);
  textFont('Forma DJR Deck');
  text('The Dream-Recording Pillow', 80, 200);
  
  //description
  textSize(15);
  text('The dream-recording pillow will allow everyone to better understand themselves and make the most of the time they spend while asleep.', 80, 250, 400);
  // text('The average person spends almost one third of their lifetime asleep, yet less sleep leads to a shorter lifespan. In order to find balance between taking care of the body and maximizing time to be productive, the dream-recording pillow will encourage sleep while saving time spent awake on uncovering emotions and desires. Sleeping allows for humans to process the events of the previous day while also creating very vivid imagery. The dream-recording pillow creates opportunities to better understand anxieties and fears, identify subconscious desires, and to dream bigger and better.', 80, 325, 400);
}

function drawPillow() {
  push();
  imageMode(CORNER);
  image(pillowImg, xPos, yPos);
  pop();
}

function setupClickables() {

  // These are the CALLBACK functions. Right now, we do the SAME function for all of the clickables
  for( let i = 0; i < clickables.length; i++ ) {
    clickables[i].onPress = clickableButtonPressed;
    clickables[i].onHover = clickableButtonHover;
    clickables[i].onOutside = clickableButtonOnOutside;

    clickables[i].drawImageOnly = false;

  }
}

//--- CLICKABLE CALLBACK FUNCTIONS ----

clickableButtonPressed = function () {
// NEW PILLOW
  if( this.id === bedIndex || this.id === dreamsIndex || this.id === viewerIndex || this.id === morningIndex || this.id === nightIndex) {
    newPillow(this.id);
  }
}

// tint when mouse hover
clickableButtonHover = function () {
  this.color = "#516984"; // dark blue
  this.noTint = false;
  this.tint = "#aabac5"; // blue
}

clickableButtonOnOutside = function () {
  // Change colors based on the id #
  if( this.id === morningIndex || this.id === nightIndex) {
    this.color = "#F1C15D"; // yellow
  }
  else {
    this.color = "#00000000"; // blue
  }

  this.noTint = true;
}

//--- BALLOON FUNCTIONS --

function newPillow(idNum) {

  if( idNum === bedIndex) {
    image(bedImg, xPos, yPos)
  }
  else if( idNum === dreamsIndex) {
    image(dreamsImg, xPos, yPos);
  }
  else if( idNum === viewerIndex) {
    image(viewerImg, xPos, yPos);
  }
  else if( idNum === morningIndex) {
    image(morningImg, xPos, yPos);
  }
  else if( idNum === nightIndex){
    image(nightImg, xPos, yPos)
  }
}

// if we pop the balloon, then you can't re-pop or inflate or deflate
function popBalloon() {
  popSound.play();
}


