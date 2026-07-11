import { Worker } from "./worker";

export class Harvester extends Worker {
    override run(): void {
        if (this.memory?.state  == undefined) {
            this.memory.state = "Harvest"
            this.creep.say("⛏️");
        }

        if (this.memory.state == "Harvest" && this.creep.store.getFreeCapacity() == 0) {
            this.creep.memory.state = "Deliver"
            this.creep.say("📨");
        }

        if (this.memory.state == "Deliver" && this.creep.store.getUsedCapacity() == 0) {
            this.memory.state = "Harvest"
            this.creep.say("⛏️");
        }

        if (this.memory.state == "Harvest") {
            this.harvest()
        } else if (this.memory.state == "Deliver") {
            this.deliver()
        } else {
            this.creep.say("⁉️")
        }
    }

    harvest(): void {
        const source = this.creep.room.find(FIND_SOURCES)[0];
            
        if (source == undefined) {
            this.creep.say("😴")
        } else {
            if (this.creep.harvest(source) === ERR_NOT_IN_RANGE) {
                this.creep.moveTo(source)
            }    
        }
    }

    deliver(): void {
        const spawn = Game.spawns['Spawn1'];

        if (spawn == undefined) {
            this.creep.say("😴")
        } else {
            if (this.creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(spawn);
            }
        }
    }
}