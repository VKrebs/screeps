import roleHarvester from "./role.harvester";
import roleUpgrader from "./role.upgrader";

declare global {
    interface CreepMemory {
        [name:string]: any;
        role: string | undefined;
    }

    interface Memory {
        creeps: {[name: string]: CreepMemory}
    }
}

export function loop() {
    
    for (const name in Game.creeps) {
        const creep = Game.creeps[name]!;

        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }

        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
}