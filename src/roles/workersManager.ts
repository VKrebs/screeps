import { Builder } from "./builder";
import { CreepRole } from "./creepRole";
import { Harvester } from "./harvester";
import { Upgrader } from "./upgrader";
import { Worker } from "./worker";

export class WorkersManager {
    static workers = new Map<string, Worker>();

    public static getWorker(creep: Creep): Worker | undefined
    {
        let worker = this.workers.get(creep.name)

        if (!worker) {
            console.log(`creation ${creep.name} : ${Game.time}`);
            worker = this.createWorker(creep);
            if (worker != undefined)
                this.workers.set(creep.name, worker);
        }

        return worker;
    }

    private static createWorker(creep: Creep) : Worker | undefined
    {
        switch (creep.memory.role) {
            case CreepRole.HARVESTER:
                return new Harvester(creep.name);
            case CreepRole.UPGRADER:
                return new Upgrader(creep.name);
            case CreepRole.BUILDER:
                return new Builder(creep.name);
            default:
                return;
        }
    }
}