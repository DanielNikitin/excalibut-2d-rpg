import * as ex from "excalibur";
import { DOWN, PAIN, SCALE_2x, TAG_DAMAGES_PLAYER, WALK } from "../../constants";
import { Explosion } from "../Explosion";
import { generateMonsterAnimations } from "../../character-animations";

// Note this class simply shows a known Monster which is controlled by another player.
export class NetworkMonster extends ex.Actor {
  constructor(x, y) {
    super({
      pos: new ex.Vector(x, y),
      width: 16,
      height: 16,
      scale: SCALE_2x,
    });
    this.hasPainState = false;
    this.facing = DOWN;
    this.anims = generateMonsterAnimations();
  }

  onInitialize(_engine) {
    this.addTag(TAG_DAMAGES_PLAYER);
  }

  tookFinalDamage() {
    // Replace me with an explosion when owner client reports I am out of HP
    this.kill();
    this.scene?.engine?.add(new Explosion(this.pos.x, this.pos.y));
  }

  onPreUpdate(_engine, delta) {
    // Show correct appearance
    const use = this.anims[this.hasPainState ? PAIN : WALK][this.facing];
    this.graphics.use(use);
  }
}
