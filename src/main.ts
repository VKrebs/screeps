import harvester from "./roles/harvester";
import upgrader from "./roles/upgrader";
import builder  from "./roles/builder";
import { creepRole } from "./roles/creepRole";
import spawner from "./spawner";
import buildingManager from "./constructor";

export function loop() {

    // Clear non-existing creeps memory
    for (const name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }

    const mainRoom = Game.spawns['Spawn1']?.room;

    spawner.spawn('Spawn1')

    if (mainRoom != undefined)
    {
        buildingManager.placeExtensions(mainRoom);
    }

    for (const name in Game.creeps) {
        const creep = Game.creeps[name]!;

        if (creep.memory.role == creepRole.HARVESTER) {
            harvester.run(creep);
        }

        if (creep.memory.role == creepRole.UPGRADER) {
            upgrader.run(creep);
        }

        if (creep.memory.role == creepRole.BUILDER) {
            builder.run(creep);   
        }
    }
}