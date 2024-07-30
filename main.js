import * as ex from "excalibur";
import { VIEWPORT_HEIGHT, VIEWPORT_WIDTH, SCALE } from "./src/constants";
import {Player} from "./src/actors/Players/Player";
import { Floor } from "./src/actors/Floor";
import { loader } from "./src/resources";
import { Map_Indoor } from "./src/maps/Map_Indoor";
import { Player_CameraStrategy } from "./src/classes/Player_CameraStrategy";

const game = new ex.Engine({
    width: VIEWPORT_WIDTH * SCALE,
    height: VIEWPORT_HEIGHT * SCALE,
    fixedUpdateFps: 60,
    antialiasing: false, // pixel art graphics
});

const map = new Map_Indoor();
game.add(map);

const player = new Player(200, 200, "RED");
game.add(player);

// const floor = new Floor(1, 1, 1, 6);
// game.add(floor)

game.on("initialize", () => {
    const cameraStrategy = new Player_CameraStrategy(player, map);
    game.currentScene.camera.addStrategy(cameraStrategy);
})

game.start(loader);