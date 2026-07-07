let roleUpgrader: {
    run(creep: Creep): void
}

export default roleUpgrader = {
    run(creep) {

        if (creep.store[RESOURCE_ENERGY] == 0) {
            const source = creep.room.find(FIND_SOURCES)[0];

            if (source == undefined) {
                console.warn(`${ creep.name } did not find a source in room ${ creep.room.name }.`);
                return;
            }

            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                console.log("Moving to source")
                creep.moveTo(source)
            }
        }
        else {
            const controller = creep.room.controller;

            if (controller == undefined) {
                console.warn(`${ creep.name } did not find the controller in room ${ creep.room.name }.`);
                return;
            }

            if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller);
            }
        }
    }
}