export class Worker {
    constructor(public name: string) { }

    protected get creep(): Creep {
        return Game.creeps[this.name]!;
    }

    protected get memory(): CreepMemory {
        return Memory.creeps[this.name]!
    }

    run(): void { }
}