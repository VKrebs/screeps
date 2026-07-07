let roleHarvester: {
    run(creep: Creep): void
    harvest(creep: Creep): void
    deliver(creep: Creep): void
}

export default roleHarvester = {

    run(creep) {
        if (creep.memory.state == undefined) {
            creep.memory.state = "Harvest"
            creep.say("⛏️");
        }
            
        if (creep.memory.state == "Harvest" && creep.store.getFreeCapacity() == 0) {
            creep.memory.state = "Deliver"
            creep.say("📨");
        }

        if (creep.memory.state == "Deliver" && creep.store.getUsedCapacity() == 0) {
            creep.memory.state = "Harvest"
            creep.say("⛏️");
        }

        if (creep.memory.state == "Harvest") {
            this.harvest(creep)
        } else if (creep.memory.state == "Deliver") {
            this.deliver(creep)
        } else {
            creep.say("⁉️")
        }
    },

    harvest(creep) {
        const source = creep.room.find(FIND_SOURCES)[0];
            
        if (source == undefined) {
            creep.say("😴")
        } else {
            if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source)
            }    
        }
    },

    deliver(creep) {
        const spawn = Game.spawns['Spawn1'];

        if (spawn == undefined) {
            creep.say("😴")
        } else {
            if (creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn);
            }
        }
    }
}