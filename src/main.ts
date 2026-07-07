import roleHarvester from "./role.harvester";

export function loop() {
    
    for (const name in Game.creeps) {
        const creep = Game.creeps[name]!;
        roleHarvester.run(creep);
    }
}