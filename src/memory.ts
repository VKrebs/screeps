import { CreepRole } from "./role";

declare global {
    interface CreepMemory {
        [name:string]: any;
        role: CreepRole;
        state: string | undefined;
    }

    interface Memory {
        creeps: {[name: string]: CreepMemory}
    }
}