let dicer;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  dicer = createDicer();

  // add a buttons to connect to the printer & to print!
  let connectButton = createButton('connect!');
  connectButton.position(20, 20);
  connectButton.mousePressed(function() {
    dicer.serial.requestPort();
  });

  let printButton = createButton('print!');
  printButton.position(20, 60);
  printButton.mousePressed(function() {
    dicer.print();
  });

  let stopButton = createButton('stop!');
    stopButton.position(20, 100);
    stopButton.mousePressed(function() {
      dicer.stopPrint(); // stop streaming the commands to printer
    });
}


function dicerDraw() {
  // setup printing variables
  // this is a standard setup block:
  dicer.setERelative();
  dicer.fanOff();
  dicer.autoHome();
  dicer.setNozzleTemp(205); // wait for nozzle to heat up
  dicer.setBedTemp(55); // wait for bed to heat up
  dicer.introLine(); // line back and forth to clean nozzle
    
  /* design your artifact here!
   *  here's a vase line vase, based on LIA's 'Filament Sculptures' 
   * https://www.liaworks.com/theprojects/filament-sculptures/
   */

  let startHeight = 0.2;
  let o = 2;
  let s = 2500;
  let x = 100;
  let y = 100;
  let sf = 0;
  let maxL = 40;
  let l = 40;
  dicer.moveRetract(x, y, startHeight); // move to start
  for (let h = startHeight; h <= l; h += o) { 
    // lines
    dicer.moveExtrude(x + l, y+sf, h, s);
    dicer.moveExtrude(x + l - sf, y + l, h, s);
    dicer.moveExtrude(x, y + l - sf, h, s);
    dicer.moveExtrude(x + sf, y, h, s);

    // dots
    dicer.moveExtrude(x, y, h + o, 25, 5); // move slowly and extrude lots of filament on the dots
    dicer.moveRetract(x + l, y, h, 3 * s); // move quickly from point to point to reduce stringing
    dicer.moveExtrude(x + l, y, h + o, 25, 5);
    dicer.moveRetract(x + l - sf, y + l, h, 3 * s);
    dicer.moveExtrude(x + l - sf, y + l, h + o, 25, 5);
    dicer.moveRetract(x, y + l - sf, h, 3 * s);
    dicer.moveExtrude(x, y + l - sf, h + o, 25, 5);

    dicer.moveRetract(x + sf, y, h + o, s);
  }
  // end artifact

  dicer.presentPart(); // pop the bed out. 
}

function draw() {
  orbitControl(2, 2, 0.1);
  background(255);
  dicer.render();
}