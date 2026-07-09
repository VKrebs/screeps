import harvester from "./roles/harvester";
import upgrader from "./roles/upgrader";
import builder  from "./roles/builder";
import { creepRole } from "./roles/creepRole";
import spawner from "./spawner";

export function loop() {

    // Clear non-existing creeps memory
    for (const name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }

    spawner.spawn('Spawn1')

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