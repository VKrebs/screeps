import roleHarvester from "./role.harvester";
import roleUpgrader from "./role.upgrader";
import roleBuilder  from "./role.builder";
import * as ld from 'lodash';

declare global {
    interface CreepMemory {
        [name:string]: any;
        role: string | undefined;
        state: string | undefined;
    }

    interface Memory {
        creeps: {[name: string]: CreepMemory}
    }
}

export function loop() {

    // Clear non-existing creeps memory
    for (const name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }

    var harvesters = ld.filter(Game.creeps, (creep) => creep.memory.role == 'harvester')
    var upgraders = ld.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader')
    var builders = ld.filter(Game.creeps, (creep) => creep.memory.role == 'builder')

    if (harvesters.length < 2) {
        var newName = 'Harvester-' + Game.time;
        Game.spawns["Spawn1"]?.spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'harvester', state: undefined}})
    } else if (upgraders.length < 2) {
        var newName = 'Upgrader-' + Game.time;
        Game.spawns["Spawn1"]?.spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'upgrader', state: undefined}})
    } else if (builders.length < 1) {
        var newName = 'Builder-' + Game.time;
        Game.spawns["Spawn1"]?.spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'builder', state: undefined}})
    }

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