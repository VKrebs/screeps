import * as ld from 'lodash';

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
    },
}