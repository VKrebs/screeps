import { Worker } from "./worker"

export class Upgrader extends Worker {
    override run(): void {
        if (this.memory.state == undefined)
        {
            this.memory.state = "Upgrade"
            this.creep.say("🆙")
        }

        if (this.memory.state == "Upgrade" && this.creep.store[RESOURCE_ENERGY] == 0) {
            this.memory.state = "Harvest"
            this.creep.say("⛏️")
        }

        if (this.memory.state == "Harvest" && this.creep.store.getFreeCapacity() == 0) {
            this.memory.state = "Upgrade"
            this.creep.say("🆙")
        }

        if (this.memory.state == "Upgrade") {
            this.upgrade()
        } else if (this.memory.state == "Harvest") {
            this.harvest()
        } else {
            this.creep.say("⁉️")
        }
    }

    harvest() {
        const source = this.creep.room.find(FIND_SOURCES)[0];

        if (source == undefined) {
            this.creep.say("😴")
        } else {
            if (this.creep.harvest(source) === ERR_NOT_IN_RANGE) {
                this.creep.moveTo(source)
            }    
        }
    }

    upgrade() {
        const controller = this.creep.room.controller

        if (controller == undefined) {
            this.creep.say("😴")
        } else {
            if (this.creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(controller)
            }
        }
    }
}