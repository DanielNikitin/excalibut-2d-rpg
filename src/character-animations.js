import * as ex from "excalibur";
import { Images } from "./resources";

import {
  DOWN,
  LEFT,
  PAIN,
  RIGHT,
  SWORD1,
  SWORD2,
  UP,
  WALK,
} from "../src/constants";

const WALK_ANIM_SPEED = 150;
const charSpritesheetGridConfig = {
  columns: 10,
  rows: 10,
  spriteWidth: 32,
  spriteHeight: 32,
};

const redSpriteSheet = ex.SpriteSheet.fromImageSource({
  image: Images.redSheetImage,
  grid: charSpritesheetGridConfig,
});
const blueSpriteSheet = ex.SpriteSheet.fromImageSource({
  image: Images.blueSheetImage,
  grid: charSpritesheetGridConfig,
});
const graySpriteSheet = ex.SpriteSheet.fromImageSource({
  image: Images.graySheetImage,
  grid: charSpritesheetGridConfig,
});
const yellowSpriteSheet = ex.SpriteSheet.fromImageSource({
  image: Images.yellowSheetImage,
  grid: charSpritesheetGridConfig,
});

const SPRITESHEET_MAP = {
  RED: redSpriteSheet,
  BLUE: blueSpriteSheet,
  GRAY: graySpriteSheet,
  YELLOW: yellowSpriteSheet,
};

const ANIMATION_CONFIGS = {
  [DOWN]: {
    WALK: [[0, 1], WALK_ANIM_SPEED],
    SWORD1: [[2], WALK_ANIM_SPEED],
    SWORD2: [[3], WALK_ANIM_SPEED],
    PAIN: [[4], WALK_ANIM_SPEED],
  },
  [UP]: {
    WALK: [[10, 11], WALK_ANIM_SPEED],
    SWORD1: [[12], WALK_ANIM_SPEED],
    SWORD2: [[13], WALK_ANIM_SPEED],
    PAIN: [[14], WALK_ANIM_SPEED],
  },
  [LEFT]: {
    WALK: [[20, 21], WALK_ANIM_SPEED],
    SWORD1: [[22], WALK_ANIM_SPEED],
    SWORD2: [[23], WALK_ANIM_SPEED],
    PAIN: [[24], WALK_ANIM_SPEED],
  },
  [RIGHT]: {
    WALK: [[30, 31], WALK_ANIM_SPEED],
    SWORD1: [[32], WALK_ANIM_SPEED],
    SWORD2: [[33], WALK_ANIM_SPEED],
    PAIN: [[34], WALK_ANIM_SPEED],
  },
};

export const generateCharacterAnimations = (spriteSheetKey) => {
  const sheet = SPRITESHEET_MAP[spriteSheetKey];
  let payload = {};
  [UP, DOWN, LEFT, RIGHT].forEach((dir) => {
    payload[dir] = {};
    [WALK, SWORD1, SWORD2, PAIN].forEach((pose) => {
      const [frames, speed] = ANIMATION_CONFIGS[dir][pose];
      payload[dir][pose] = ex.Animation.fromSpriteSheet(
        sheet,
        [...frames],
        speed
      );

      console.log(payload[dir][pose])
    });
  });
  return payload;
};