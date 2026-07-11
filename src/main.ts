import spawner from "./spawner";
import constructionManager from "./construction/constructionManager";
import { WorkersManager } from "./roles/workersManager";

export function loop() {
    const mainRoom = Game.spawns['Spawn1']?.room;

    for (const name  of WorkersManager.workers.keys()){
        if (!(name in Game.creeps)){
            WorkersManager.workers.delete(name);
            delete Memory.creeps[name];
        }
    }

    for (const creep of Object.values(Game.creeps)){
        WorkersManager.getWorker(creep)?.run();
    }

    spawner.spawn('Spawn1')

    if (mainRoom != undefined)
    {
        constructionManager.placeExtensions(mainRoom);
        constructionManager.placeContainer(mainRoom);
    }

    
}