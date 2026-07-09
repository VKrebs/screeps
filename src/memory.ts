import { creepRole } from "./roles/creepRole";

declare global {
    interface CreepMemory {
        [name:string]: any;
        role: creepRole;
        state: string | undefined;
    }

    interface Memory {
        creeps: {[name: string]: CreepMemory}
    }
}