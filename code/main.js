import kaboom from "kaboom";

// initialize context
kaboom();

// load assets
loadSprite("space_ship", "sprites/space_ship.png");
loadSprite("space", "sprites/space.png");
loadSprite("rock", "sprites/rock.png");
loadSprite("moon", "sprites/moon.png");
loadSprite("back", "sprites/back.png");
loadSprite("gameover", "sprites/gameover.png");
loadSprite("homepage", "sprites/homepage.jpg");
loadSprite("home", "sprites/home.png");
loadSound("gamemusic", "sounds/gamemusic.mp3");
loadSound("homemusic", "sounds/homemusic.mp3");


//home
scene("home", () => {
    const mainmusic = add([
    play("homemusic"),
    ])

  add([
    sprite("homepage", { width: width(), height: height() })
  ])

  add([
    text("ASTROLAND"),
    pos(width() / 2, 100),
    origin("center"),
  ])

  add([
    rect(300, 50),
    origin("center"),
    pos(width() / 2, height() / 2),
    color(29, 133, 17),
    outline(5),
    "startgame",
    area(),
  ])

  add([
    rect(300, 50),
    origin("center"),
    pos(width() / 2, height() / 2 + 100),
    color(29, 133, 17),
    outline(5),
    "rulesbutton",
    area(),
  ])

  add([
    text("PLAY"),
    origin("center"),
    pos(width() / 2, height() / 2),
    scale(0.5)
  ])

  add([
    text("RULES"),
    origin("center"),
    pos(width() / 2, height() / 2 + 100),
    scale(0.5)
  ])

  add([
    sprite("home", { width: 50 }),
    pos(10, 10),
    area(),
    "home",
    color(255, 255, 255),
  ])

  onClick("home", () => {
    go("home")
  })

  onClick("startgame", () => {
    go("game");
  })

  onClick("rulesbutton", () => {
    go("rules");
  })

})


//rules
scene("rules", () => {

  add([
    rect(width(), height()),
    color(245, 126, 66),
  ])

  add([
    text("RULES"),
    origin("center"),
    pos(width() / 2, 100),
  ])

  add([
    text("1.Use left arrow key and right arrow key to move" +
      "\n\n2.Do not go out of the screen." +
      "\n\n3.Do not crash into an asteroid." +
      "\n\n4.You must survive for 60seconds and land on moon to win."),
    scale(.5),
    pos(0, 200)
  ])

  add([
    sprite("home", { width: 50 }),
    pos(10, 10),
    area(),
    "home",
    color(255, 255, 255),
  ])

  onClick("home", () => {
    go("home")
  })

})


//game
scene('game', () => {

  const music = add([
    play('gamemusic'),
    "gamemusic"
  ])

  var x = 0;


  const background = add([
    sprite("space"),
  ]);

  loop(1, () => {
    addrock();

  })

  function addrock() {
    const offsetofrock1 = rand(0, 590);
    const offsetofrock2 = rand(0, 590);

    add([
      sprite("rock", { width: 100 }),
      pos(0 + offsetofrock1, height()),
      move(UP, rand(200, 300)),
      area(),
      scale(rand(0.5, 1)),
      "rock",
    ])

    add([
      sprite("rock", { width: 100 }),
      pos(width() / 2 + offsetofrock2, height()),
      move(UP, rand(200, 400)),
      area(),
      scale(.8),
      "rock",
    ])
  }

  loop(1, () => {
    x++;

    if (x == 60) {
      add([
        sprite('moon', { width: 5000 }),
        pos(width() / 2, height()),
        area(),
        move(UP, 100),
        origin("top"),
        "moon"
      ])
    }
  })

  const player = add([
    sprite("space_ship", { width: 80 }, { flipY: true }),
    pos(590, 40),
    area(),
  ]);

  const directions = {
    'left': vec2(-1, 0),
    'right': vec2(1, 0),
  };

  for (const direction in directions) {
    onKeyPress(direction, () => {
      player.move(directions[direction].scale(2000));
    })
  }

  player.collides("rock", () => {
    go('gameover');
    music.stop()
  })

  player.collides("moon", () => {
    go('victory');
    music.stop()
  })

  player.action(() => {
    if (player.pos.x > width() + 30 || player.pos.x < 0 - 30) {
      go("gameover");
    }
  })

  add([
    sprite("home", { width: 50 }),
    pos(10, 10),
    area(),
    "home",
    color(255, 255, 255),
  ])

  onClick("home", () => {
    go("home")
    music.stop()
  })

})


//victory
scene('victory', () => {

  add([
    sprite("space"),
  ]);

  add([
    sprite("back", { width: 2000, height: 800 }),
    origin("center"),
    pos(width() / 2, height() / 2),
    opacity(.5),
  ])

  add([
    text("VICTORY!" + "\nYour Space Ship Landed" + "\nOn The Moon"),
    pos(width() / 2, 150),
    origin("center"),
    color(135, 30, 128),
    outline(0),
  ])

  add([
    rect(250, 100),
    pos(width() / 2 + 60, 410),
    origin("center"),
    color(255, 0, 0),
    outline(2),
  ])

  add([
    text("Press SPACE To" + "\nPlay Again"),
    pos(width() / 2, 450),
    origin("center"),
    outline(0),
  ])

  keyDown("space", () => {
    go("game")
  })

  add([
    sprite("home", { width: 50 }),
    pos(10, 10),
    area(),
    "home",
    color(255, 255, 255),
  ])

  onClick("home", () => {
    go("home")
  })

})


//gameover
scene("gameover", () => {

  add([
    sprite("space"),
  ]);

  add([
    sprite("gameover", { width: 1200, height: 900 }),
    origin("center"),
    pos(width() / 2, height() / 2),
    opacity(.5)
  ])

  add([
    text("GAMEOVER!" + "\nYour Space Ship Crashed"),
    pos(width() / 2, 150),
    origin("center"),
    color(135, 30, 128),
    outline(0),
  ])

  add([
    rect(250, 100),
    pos(width() / 2 + 60, 410),
    origin("center"),
    color(255, 0, 0),
    outline(2),
  ])

  add([
    text("Press SPACE To" + "\nPlay Again"),
    pos(width() / 2, 450),
    origin("center"),
    outline(0),
  ])

  keyDown("space", () => {
    go("game")
  })

  add([
    sprite("home", { width: 50 }),
    pos(10, 10),
    area(),
    "home",
    color(255, 255, 255),
  ])

  onClick("home", () => {
    go("home")
  })

});


//final step
go('home');