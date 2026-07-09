import * as _ from 'lodash';
import { creepRole } from './roles/creepRole';

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

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == creepRole.HARVESTER)
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == creepRole.UPGRADER)
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == creepRole.BUILDER)
    
        if (harvesters.length < 2) {
            var newName = 'Harvester-' + Game.time;
            Game.spawns["Spawn1"]?.spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: creepRole.HARVESTER, state: undefined}})
        } else if (upgraders.length < 2) {
            var newName = 'Upgrader-' + Game.time;
            Game.spawns["Spawn1"]?.spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: creepRole.UPGRADER, state: undefined}})
        } else if (builders.length < 1) {
            var newName = 'Builder-' + Game.time;
            Game.spawns["Spawn1"]?.spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: creepRole.BUILDER, state: undefined}})
        }
    },
}