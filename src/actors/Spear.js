import * as ex from "excalibur";
import { Images } from "../resources";
import { SWORD_SWING_1 } from "./Sword";
import {
  DOWN,
  LEFT,
  RIGHT, SCALE,
  SCALE_2x,
  TAG_PLAYER_WEAPON,
  UP,
} from "../constants";

const spearSpriteSheet = ex.SpriteSheet.fromImageSource({
  image: Images.spearSheetImage,
  grid: {
    columns: 1,
    rows: 4,
    spriteWidth: 16,
    spriteHeight: 16,
  },
});

const spearDownAnim = ex.Animation.fromSpriteSheet(spearSpriteSheet, [0], 100);
const spearUpAnim = ex.Animation.fromSpriteSheet(spearSpriteSheet, [1], 100);
const spearLeftAnim = ex.Animation.fromSpriteSheet(spearSpriteSheet, [2], 100);
const spearRightAnim = ex.Animation.fromSpriteSheet(spearSpriteSheet, [3], 100);

export class Spear extends ex.Actor {
  constructor(x, y, direction) {
    super({
      pos: new ex.Vector(x, y),
      width: 16,
      height: 16,
      scale: SCALE_2x,
    });

    this.addTag(TAG_PLAYER_WEAPON);
    this.owner = null; // Assigned on creation by body who creates this.

    // Expire after so much time
    this.msRemaining = 2000;

    // Travel in direction
    const SPEAR_VELOCITY = 300;
    if (direction === DOWN) {
      this.graphics.use(spearDownAnim);
      this.vel.y = SPEAR_VELOCITY;
      this.pos.y += SCALE * 4;
    }
    if (direction === UP) {
      this.graphics.use(spearUpAnim);
      this.vel.y = -SPEAR_VELOCITY;
    }
    if (direction === LEFT) {
      this.graphics.use(spearLeftAnim);
      this.vel.x = -SPEAR_VELOCITY;
      this.pos.y += SCALE * 4;
    }
    if (direction === RIGHT) {
      this.graphics.use(spearRightAnim);
      this.vel.x = SPEAR_VELOCITY;
      this.pos.y += SCALE * 4;
    }
  }

  // Remove me if I hit something
  onDamagedSomething() {
    this.kill();
  }

  onPreUpdate(_engine, delta) {
    // Remove after time has passed.
    // Fun note: originally tried this when the spear goes "off screen", but it's not necessarily off-screen for other players
    this.msRemaining -= delta;
    if (this.msRemaining <= 0) {
      this.kill();
      console.log("EXPIRED!");
    }
  }
}