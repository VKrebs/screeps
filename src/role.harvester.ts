let roleHarvester: {
    run(creep: Creep): void
}

export default roleHarvester = {
    run(creep) {

        if (creep.store.getUsedCapacity() < creep.store.getCapacity()) {
            const source = creep.room.find(FIND_SOURCES)[0];
            if (source == undefined) return;

            if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                console.log
                creep.moveTo(source)
            }   
        }
        else {
            const spawn = Game.spawns['Spawn1'];
            if (spawn == undefined) {
                console.warn("Spawn not found")
                return;
            }

            if (creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn);
            }
        }
    }
}