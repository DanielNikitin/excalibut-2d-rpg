import {PAIN, WALK, IDLE} from "../../constants";

export class PlayerAnimations {
  constructor(actor) {
    this.actor = actor;
  }

  // Pass game loop delta time into the actionAnimation. Consuming time progresses the frames
  progressThroughActionAnimation(delta) {
    const { actor } = this;
    if (actor.actionAnimation) {
      actor.vel.x = 0; // Freeze in place
      actor.vel.y = 0;
      actor.actionAnimation.work(delta);
    }
  }

  showRelevantAnim() {
    const { actor } = this;
  
    // Always prioritize showing PAIN if we are in pain.
    if (actor.hasGhostPainState || actor.painState) {
      actor.graphics.use(actor.skinAnims[actor.facing][PAIN]);
      return;
    }
  
    // If a dedicated action is happening, use that.
    if (actor.actionAnimation) {
      actor.graphics.use(actor.actionAnimation.frame);
      return;
    }
  
    // Use correct directional frame
    if (actor.vel.x !== 0 || actor.vel.y !== 0) {
      // If moving, show WALK animation
      actor.graphics.use(actor.skinAnims[actor.facing][WALK]);
    } else {
      // If not moving, show IDLE animation
      actor.graphics.use(actor.skinAnims[actor.facing][IDLE]);
    }
  }
  
}