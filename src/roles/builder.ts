import { Worker } from "./worker";

export class Builder extends Worker {
    override run(): void {
        if (this.memory.state == undefined) {
            this.memory.state = "Build"
            this.creep.say("🏗️");
        }

        if (this.memory.state == "Build" && this.creep.store[RESOURCE_ENERGY] == 0) {
            this.memory.state = "Harvest";
            this.creep.say("⛏️");
        }

        if (this.memory.state == "Harvest" && this.creep.store.getFreeCapacity() == 0) {
            this.memory.state = "Build"
            this.creep.say("🏗️");
        }

        if (this.memory.state == "Build") {
            this.build()
        } else if (this.memory.state == "Harvest") {
            this.harvest()
        } else {
            this.creep.say("⁉️")
        }
    }

    build() {
        const target = this.creep.room.find(FIND_CONSTRUCTION_SITES)[0];

        if (target == undefined) {
            this.creep.say("😴")
        }
        else {
            if (this.creep.build(target) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' }});
            }
        }
    }

    harvest() {
        var source = this.creep.room.find(FIND_SOURCES)[0];

        if (source == undefined) {
            this.creep.say("😴")
        } else {
            if (this.creep.harvest(source) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
}