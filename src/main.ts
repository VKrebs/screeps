import roleHarvester from "./role.harvester";
import roleUpgrader from "./role.upgrader";
import roleBuilder  from "./role.builder";
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

        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }

        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }

        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);   
        }
    }
}