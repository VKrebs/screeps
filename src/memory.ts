declare global {
    interface CreepMemory {
        [name:string]: any;
        role: string | undefined;
        state: string | undefined;
    }

    interface Memory {
        creeps: {[name: string]: CreepMemory}
    }
}