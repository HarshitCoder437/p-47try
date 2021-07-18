var bg1;
var bg2;
var soldier1, soldier2;
var soldier1Img, soldier2Img;
var laser, laser2, laserImg1, laserImg2, laserGrp;
var gameState = "play";
var lifeImg;
var life;
var lifeCount1 = 3;
var lifeCount2 = 3;
var hurtSound;
var laserShoot1;
var laserShoot2;
var gameOverSound;
var reset, resetImg;
var next, nextImg;
var fireball1, fireballImg1, fireBallGrp;
var whooshSound, fireballSound;

function preload() {
  bg1 = loadImage("images/background.jpeg");
  bg2 = loadImage("images/backgroundlvl2.jpeg");
  soldier1Img = loadImage("images/soldier1.png");
  soldier2Img = loadImage("images/soldier2.png");
  laserImg1 = loadImage("images/laser.png");
  laserImg2 = loadImage("images/laser2.png");
  hurtSound = loadSound("Music/Hurt.ogg");
  laserShoot1 = loadSound("Music/Laser.wav");
  laserShoot2 = loadSound("Music/laserShoot.wav");
  gameOverSound = loadSound("Music/levelCross.wav");
  resetImg = loadImage("images/reset.png");
  lifeImg = loadImage("images/life.png");
  nextImg = loadImage("images/next.png");
  fireballImg1 = loadImage("images/fireball1.png");
  whooshSound = loadSound("Music/whoosh.wav");
  fireballSound = loadSound("Music/fireball.ogg");
}

function setup() {
  createCanvas(800,600);

  soldier1 = createSprite(200,450,10,10);
  soldier1.addImage(soldier1Img);
  soldier1.scale = 0.3;
  soldier1.setCollider("rectangle",-150,0,150,550);

  laser = createSprite(330,465,10,10);
  laser.addImage(laserImg1);
  laser.scale = 0.2;
  laser.visible = false;

  laser2 = createSprite(330,465,10,10);
  laser2.addImage(laserImg2);
  laser2.scale = 0.15;
  laser2.visible = false;

  soldier2 = createSprite(600,450,10,10);
  soldier2.addImage(soldier2Img);
  soldier2.scale = 0.35;
  soldier2.setCollider("rectangle",150,0,150,480);

  fireball1 = createSprite(200,200,20,20);
  fireball1.addImage(fireballImg1);
  fireball1.scale = 0.2;
  fireball1.visible = false;

  reset = createSprite(380,370,200,200);
  reset.addImage(resetImg);
  reset.scale = 0.2;
  reset.visible = false;

  next = createSprite(380,450,100,100);
  next.addImage(nextImg);
  next.scale = 0.2;
  next.visible = false;

  laserGrp = new Group();
  fireBallGrp = new Group();
}

function draw() {
  if (gameState === "play") {

    background(bg2);

    for (var i = 0; i < lifeCount1; i++) {
      image(lifeImg,20 + i * 25,20,20,20);
    }
  
    for (var i = 0; i < lifeCount2; i++) {
      image(lifeImg,780 - i * 25,20,20,20);
    }

    if (keyDown("UP_ARROW") && soldier2.y > 95){
      soldier2.y -= 10;
    }

    if (keyDown("RIGHT_ARROW") && soldier2.x < 730){
      soldier2.x += 10;
    }

    if (keyDown("DOWN_ARROW") && soldier2.y < 505){
      soldier2.y += 10;
    }

    if (keyDown("LEFT_ARROW") && soldier2.x > 85){
      soldier2.x -= 10;
    }

    if (keyDown("w") && soldier1.y > 89) {
      soldier1.y -= 10;
    }

    if (keyDown("a") && soldier1.x > 60) {
      soldier1.x -= 10;
    }

    if (keyDown("s") && soldier1.x < 732) {
      soldier1.x += 10;
    }

    if (keyDown("z") && soldier1.y < 518) {
      soldier1.y += 10;
    }

    if (keyDown("space")) {
      if (frameCount % 20 === 0) {
        laser = createSprite(soldier1.x + 155,soldier1.y + 15,10,10);
        laser.addImage(laserImg2);
        laser.scale = 0.15;
        laserGrp.add(laser);
        laser.velocityX = 10;
        laserShoot1.play();
      }
    }

    if (keyDown("l")) {
      if (frameCount % 20 === 0) {
        laser = createSprite(soldier2.x - 150,soldier2.y - 30,10,10);
        laser.addImage(laserImg1);
        laser.scale = 0.2;
        laserGrp.add(laser);
        laser.velocityX = -10;
        laserShoot1.play();
      }
    }

    if ((laser.x > width || laser.x < (width - width)) || (laser.y > height || laser.y < (height - height))) {
      laserGrp.destroyEach();
    }

    if (laserGrp.isTouching(soldier1)) {
      hurtSound.play();
      laserGrp.destroyEach();
      lifeCount1 = lifeCount1 - 1;
    }

    if (laserGrp.isTouching(soldier2)) {
      hurtSound.play();
      laserGrp.destroyEach();
      lifeCount2 = lifeCount2 - 1;
    }

    if (lifeCount1 === 0) {
      gameState = "end";
      gameOverSound.play();
      reset.visible = true;
      next.visible = true;
    }

    if (lifeCount2 === 0) {
      gameState = "end";
      gameOverSound.play();
      reset.visible = true;
      next.visible = true;
    }

    if (mousePressedOver(next)) {
      console.log('Next Button Clicked!');
      nextLvl();
    }

    fill("yellow");
    textSize(15);
    text("Soldier1", soldier1.x - 50, soldier1.y - 90);
    text("Soldier2", soldier2.x - 25, soldier2.y - 95);
  }

  if (gameState === "playlvl2") {
    background(bg1);

    for (var i = 0; i < lifeCount1; i++) {
      image(lifeImg,20 + i * 25,20,20,20);
    }
  
    for (var i = 0; i < lifeCount2; i++) {
      image(lifeImg,780 - i * 25,20,20,20);
    }

    if (keyDown("UP_ARROW") && soldier2.y > 95){
      soldier2.y -= 10;
    }

    if (keyDown("RIGHT_ARROW") && soldier2.x < 730){
      soldier2.x += 10;
    }

    if (keyDown("DOWN_ARROW") && soldier2.y < 505){
      soldier2.y += 10;
    }

    if (keyDown("LEFT_ARROW") && soldier2.x > 85){
      soldier2.x -= 10;
    }

    if (keyDown("w") && soldier1.y > 89) {
      soldier1.y -= 10;
    }

    if (keyDown("a") && soldier1.x > 60) {
      soldier1.x -= 10;
    }

    if (keyDown("s") && soldier1.x < 732) {
      soldier1.x += 10;
    }

    if (keyDown("z") && soldier1.y < 518) {
      soldier1.y += 10;
    }

    if (keyDown("space")) {
      if (frameCount % 20 === 0) {
        laser = createSprite(soldier1.x + 155,soldier1.y + 15,10,10);
        laser.addImage(laserImg2);
        laser.scale = 0.15;
        laserGrp.add(laser);
        laser.velocityX = 10;
        laserShoot1.play();
      }
    }

    if (keyDown("l")) {
      if (frameCount % 20 === 0) {
        laser = createSprite(soldier2.x - 150,soldier2.y - 30,10,10);
        laser.addImage(laserImg1);
        laser.scale = 0.2;
        laserGrp.add(laser);
        laser.velocityX = -10;
        laserShoot1.play();
      }
    }

    if (frameCount % 200 === 0) {
      fireball1 = createSprite(random(20,780), -50, 1, 1);
      fireball1.addImage(fireballImg1);
      fireball1.scale = 0.15;
      fireball1.velocityY = 15;
      fireBallGrp.add(fireball1);
      whooshSound.play();
    }

    if (fireBallGrp.isTouching(soldier1)) {
      fireBallGrp.destroyEach();
      lifeCount1 = lifeCount1 - 1;
      hurtSound.play();
      fireballSound.play();
    }

    if (fireBallGrp.isTouching(soldier2)) {
      fireBallGrp.destroyEach();
      lifeCount2 = lifeCount2 - 1;
      hurtSound.play();
      fireballSound.play();
    }

    if ((laser.x > width || laser.x < (width - width)) || (laser.y > height || laser.y < (height - height))) {
      laserGrp.destroyEach();
    }

    if (laserGrp.isTouching(soldier1)) {
      hurtSound.play();
      laserGrp.destroyEach();
      lifeCount1 = lifeCount1 - 1;
    }

    if (laserGrp.isTouching(soldier2)) {
      hurtSound.play();
      laserGrp.destroyEach();
      lifeCount2 = lifeCount2 - 1;
    }

    if (lifeCount1 === 0 || lifeCount2 === 0) {
      gameState = "end";
      gameOverSound.play();
      reset.visible = true;
    }

    fill("yellow");
    textSize(15);
    text("Soldier1", soldier1.x - 50, soldier1.y - 90);
    text("Soldier2", soldier2.x - 25, soldier2.y - 95);
  }

  if (gameState === "end") {
    if (lifeCount1 === 0) {
      fill(0,0,200);
      background("green");
      textSize(32);
      text("SOLDIER 2 WINS!", 250, 300);
      soldier1.visible = false;
    }

    if (lifeCount2 === 0) {
      fill(0,0,200);
      background("green");
      textSize(32);
      text("SOLDIER 1 WINS!", 250, 300);
      soldier2.visible = false;
    }

    if (mousePressedOver(reset)) {
      restart();
    }
  }

  if (gameState === "end" && gameState === "playlvl2") {
    if (lifeCount1 === 0) {
      fill(0,0,200);
      background("green");
      textSize(32);
      text("SOLDIER 2 WINS!", 250, 300);
      soldier1.visible = false;
    }

    if (lifeCount2 === 0) {
      fill(0,0,200);
      background("green");
      textSize(32);
      text("SOLDIER 1 WINS!", 250, 300);
      soldier2.visible = false;
    }

    if (mousePressedOver(reset)) {
      restart();
    }
  }

  drawSprites();
}

function restart() {
  gameState = "play";

  for (var i = 0; i < lifeCount1; i++) {
    image(lifeImg,20 + i * 25,20,20,20);
  }

  for (var i = 0; i < lifeCount2; i++) {
    image(lifeImg,780 - i * 25,20,20,20);
  }

  soldier1.visible = true;
  soldier1.x = 200;
  soldier1.y = 450;
  
  soldier2.visible = true;
  soldier2.x = 600;
  soldier2.y = 450;

  reset.visible = false;
  next.visible = false;
}

function nextLvl() {
  background(bg1);
  gameState = "playlvl2";

  for (var i = 0; i < lifeCount1; i++) {
    image(lifeImg,20 + i * 25,20,20,20);
  }

  for (var i = 0; i < lifeCount2; i++) {
    image(lifeImg,780 - i * 25,20,20,20);
  }

  soldier1.visible = true;
  soldier2.visible = true;

  reset.visible = false;
  next.visible = false;
}