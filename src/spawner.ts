import * as ld from 'lodash';
import { CreepRole } from './role';

let spawner: {
    spawn(name: string): void
}

export default spawner = {
    spawn(name) {
        const spawn = Game.spawns[name]
        
        if (spawn == undefined)
        {
            console.error(`Spawn '${name}' not found.`)
            return;
        }

        var harvesters = ld.filter(Game.creeps, (creep) => creep.memory.role == CreepRole.HARVESTER)
        var upgraders = ld.filter(Game.creeps, (creep) => creep.memory.role == CreepRole.UPGRADER)
        var builders = ld.filter(Game.creeps, (creep) => creep.memory.role == CreepRole.BUILDER)
    
        if (harvesters.length < 2) {
            var newName = 'Harvester-' + Game.time;
            Game.spawns["Spawn1"]?.spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: CreepRole.HARVESTER, state: undefined}})
        } else if (upgraders.length < 2) {
            var newName = 'Upgrader-' + Game.time;
            Game.spawns["Spawn1"]?.spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: CreepRole.UPGRADER, state: undefined}})
        } else if (builders.length < 1) {
            var newName = 'Builder-' + Game.time;
            Game.spawns["Spawn1"]?.spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: CreepRole.BUILDER, state: undefined}})
        }
    },
}