let builder: {
    run(creep: Creep): void
    build(creep: Creep): void
    harvest(creep: Creep): void
}

export default builder = {
    run(creep) {

        if (creep.memory.state == undefined) {
            creep.memory.state = "Build"
            creep.say("🏗️");
        }

        if (creep.memory.state == "Build" && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.state = "Harvest";
            creep.say("⛏️");
        }

        if (creep.memory.state == "Harvest" && creep.store.getFreeCapacity() == 0) {
            creep.memory.state = "Build"
            creep.say("🏗️");
        }

        if (creep.memory.state == "Build") {
            this.build(creep)
        } else if (creep.memory.state == "Harvest") {
            this.harvest(creep)
        } else {
            creep.say("⁉️")
        }
    },

    build(creep) {
         const target = creep.room.find(FIND_CONSTRUCTION_SITES)[0];

            if (target == undefined) {
                creep.say("😴")
            }
            else {
                if (creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' }});
                }
            }
    },

    harvest(creep) {
        var source = creep.room.find(FIND_SOURCES)[0];

            if (source == undefined) {
                creep.say("😴")
            } else {
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
    }
}