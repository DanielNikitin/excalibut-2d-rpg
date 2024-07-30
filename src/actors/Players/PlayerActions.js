import { SpriteSequence } from "../../classes/SpriteSequence";
import { Sword, SWORD_SWING_1, SWORD_SWING_2, SWORD_SWING_3 } from "../Sword";
import { SPEARACTION, SWORD1, SWORD2, SWORDACTION } from "../../constants";
import { Spear } from "../Spear";

export class PlayerActions {
    constructor(actor) {
        this.actor = actor;
        this.engine = actor.scene.engine;
    }

    actionSwingSword() {
        const SWORD_SWING_SPEED = 50;
        const { actor, engine } = this;

        // Create a new sequence with dedicated callback per frame
        actor.actionAnimation = new SpriteSequence(
            SWORDACTION,
            [
                {
                    frame: actor.skinAnims[actor.facing][SWORD1],
                    duration: SWORD_SWING_SPEED,
                    actorObjCallback: (swordInstance) => {
                        // Change sword's frame to match character on frame 1
                        swordInstance.useFrame(SWORD_SWING_1, actor.facing);
                    },
                },
                {
                    frame: actor.skinAnims[actor.facing][SWORD2],
                    duration: SWORD_SWING_SPEED * 5,
                    actorObjCallback: (swordInstance) => {
                        // Change sword's frame to match character on frame 2
                        swordInstance.useFrame(SWORD_SWING_2, actor.facing);
                    },
                },
                {
                    frame: actor.skinAnims[actor.facing][SWORD2],
                    duration: SWORD_SWING_SPEED * 6, // Hold this one out for a bit longer
                    actorObjCallback: (swordInstance) => {
                        // Change sword's frame to match character on frame 3
                        swordInstance.useFrame(SWORD_SWING_3, actor.facing);
                    },
                },
            ],
            (swordInstance) => {
                // When series is over, clear out the dedicated animation and remove the Sword instance
                actor.actionAnimation = null;
                swordInstance.kill();
                // Remove the sword..
            }
        );

        // Create the Sword here
        const sword = new Sword(actor.pos.x, actor.pos.y, actor.facing);
        engine.add(sword);
        sword.owner = actor;

        // Assign this sword instance to be controllable by each frame above for SpriteSequence
        actor.actionAnimation.actorObject = sword;
    }

    actionShootSpear() {
        const SHOOT_SPEAR_SPEED = 155;
        const { actor, engine } = this;

        // Create a new sequence
        actor.actionAnimation = new SpriteSequence(
            SPEARACTION,
            [
                {
                    frame: actor.skinAnims[actor.facing][SWORD1],
                    duration: SHOOT_SPEAR_SPEED,
                    actorObjCallback: () => {},
                },
                {
                    // On this frame, create a Spear in the same facing direction as my actor
                    frame: actor.skinAnims[actor.facing][SWORD2],
                    duration: SHOOT_SPEAR_SPEED,
                    actorObjCallback: () => {
                        // Create a Spear and pass in facing direction
                        const spear = new Spear(actor.pos.x, actor.pos.y, actor.facing);
                        spear.owner = actor;
                        engine.add(spear);
                    },
                },
            ],
            () => {
                // Clear out action animation
                actor.actionAnimation = null;
            }
        );
    }
}
