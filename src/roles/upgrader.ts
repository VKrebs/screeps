let upgrader: {
    run(creep: Creep): void
    harvest(creep: Creep): void
    upgrade(creep: Creep): void
}

export default upgrader = {
    run(creep) {
        if (creep.memory.state == undefined)
        {
            creep.memory.state = "Upgrade"
            creep.say("🆙")
        }

        if (creep.memory.state == "Upgrade" && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.state = "Harvest"
            creep.say("⛏️")
        }

        if (creep.memory.state == "Harvest" && creep.store.getFreeCapacity() == 0) {
            creep.memory.state = "Upgrade"
            creep.say("🆙")
        }

        if (creep.memory.state == "Upgrade") {
            this.upgrade(creep)
        } else if (creep.memory.state == "Harvest") {
            this.harvest(creep)
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

    upgrade(creep) {
        const controller = creep.room.controller

        if (controller == undefined) {
            creep.say("😴")
        } else {
            if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller)
            }
        }
    }
}