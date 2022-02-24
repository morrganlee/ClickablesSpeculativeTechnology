
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
const xPos = 600;
const yPos = 70;

// variables for the ballon
var ellipseDiameter = pillowSize;

// image variables
var pillowImg;
var bedImg;
var dreamsImg;
var viewerImg;
var morningImg;
var nightImg;
var gradientImg;
var borderImg;

var currentImageIndex = 0;

// select sound
var selectSound;

// initialize clickables
var showBedImg = false;
var showDreamsImg = false;
var showViewerImg = false;
var showMorningImg = false;
var showNightImg = false;

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
  morningImg = loadImage('assets/morning.png');
  nightImg = loadImage('assets/night.png');
  gradientImg = loadImage('assets/gradientCircle.png');
  borderImg = loadImage('assets/border.png');
}

// ALWAYS call the setup() funciton for ClickableManager in the setup(), after
// the class has been allocated in the preload() function.
function setup() {
  createCanvas(1200,700);  

  imageMode(CORNER);
  rectMode(CORNER);

  // load the pop sound
  soundFormats('mp3');
  selectSound = loadSound('assets/select.mp3');

  // setup the clickables = this will allocate the array
  clickables = clickablesManager.setup();

  // call OUR function to setup additional information about the p5.clickables
  // that are not in the array 
  setupClickables(); 

  // start with just the pillow
  newPillow(bedIndex);

  // output to the message window
  console.log(clickables);
}

// Just draw the button
function draw() {
  background("#516984");

  // draw background circle
  drawBackgrounds();

  // draw text
  drawText();

  // draw the p5.clickables
  clickablesManager.draw();

  // draw pillow
  drawPillow();

  // boolean images
  if(showBedImg){
    bedImg.resize(400, 400);
    image(bedImg, xPos, yPos);
  }
  if(showDreamsImg){
    dreamsImg.resize(400, 400);
    image(dreamsImg, xPos, yPos);
  }
  if(showViewerImg){
    viewerImg.resize(400, 400); 
    image(viewerImg, xPos, yPos);
  }
  if(showMorningImg){
    morningImg.resize(400,400);
    image(morningImg, xPos, yPos);
  }
  if(showNightImg){
    nightImg.resize(400, 400);
    image(nightImg, xPos, yPos);
  }
}

function drawText() {
  textAlign(LEFT);
  textFont('Forma DJR Deck');

  //title
  textSize(33);
  fill('#F1C15D');
  text('The Dream-Recording Pillow', 80, 130);
  
  //description
  fill('#e8e8e8');
  textSize(17);
  text('The dream-recording pillow will allow everyone to better understand themselves and make the most of the time they spend while asleep.', 80, 180, 400);
  text('The average person spends almost one third of their lifetime asleep, yet less sleep leads to a shorter lifespan. In order to find balance between taking care of the body and maximizing time to be productive, the dream recording pillow will encourage sleep while saving time spent awake on uncovering emotions and desires. Sleeping allows for humans to process the events of the previous day while also creating very vivid imagery. The dream-recording pillow creates opportunities to better understand anxieties and fears, identify subconscious desires, and to dream bigger and better.', 80, 255, 400);

  //instructions
  textAlign(RIGHT);
  textSize(13);
  text('Toggle different scenarios ⭢', 550, 560, 100);
}

function drawBackgrounds(){
  imageMode(CORNER);
  // circle behind drawings
  image(gradientImg, xPos - 50, yPos - 50);

  //rectangle behind buttons
  fill('#465A72');
  noStroke();
  rect(540, 540, 500, 70, 20);

  // star border
  image(borderImg, 0, 0);
}

function drawPillow() {
  push();
  pillowImg.resize(400, 400);
  image(pillowImg, xPos, yPos);
  pop();
}

function setupClickables() {

  // These are the CALLBACK functions. Right now, we do the SAME function for all of the clickables
  for( let i = 0; i < clickables.length; i++ ) {
    clickables[i].onPress = clickableButtonPressed;
    clickables[i].onHover = clickableButtonHover;
    clickables[i].onOutside = clickableButtonOnOutside;

    clickables[i].drawImageOnly = true; // no border, no background

  }
}

//--- CLICKABLE CALLBACK FUNCTIONS ----

clickableButtonPressed = function () {
// NEW PILLOW
  if( this.id === bedIndex || this.id === dreamsIndex || this.id === viewerIndex || this.id === morningIndex || this.id === nightIndex) {
    newPillow(this.id);
    // play sound effect when clicked
    selectSound.play();
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
    this.color = "#aabac5"; // blue
  }

  this.noTint = true;
}

//--- FUNCTIONS --

function newPillow(idNum) {

  if( idNum === bedIndex) {
    showBedImg = !showBedImg;
  }
  else if( idNum === dreamsIndex) {
    showDreamsImg = !showDreamsImg;
  }
  else if( idNum === viewerIndex) {
    showViewerImg = !showViewerImg;
  }
  else if( idNum === morningIndex) {
    showMorningImg = !showMorningImg;
  }
  else if( idNum === nightIndex){
    showNightImg = !showNightImg;
  }
}

// if we pop the balloon, then you can't re-pop or inflate or deflate
// function select () {
//   popSound.play();
// }


