import * as _ from 'lodash';
import { Position } from './position';
import { Area } from './area';
import { Direction } from './direction';

let constructionManager: {
    placeExtensions(room: Room): void
    placeContainer(room: Room): void
    getNextBuildablePosition(room: Room): Position | undefined
    isFree(roomPosition: RoomPosition): boolean
    isBuildable(roomPosition: RoomPosition) : boolean

}

const constructibleArea = new Area(new Position(19, 19), new Position(30, 30))

export default constructionManager = {
    placeExtensions(room) {

        const extensionConstructionSites = room.find(FIND_CONSTRUCTION_SITES, { filter: (structure) => structure.structureType === STRUCTURE_EXTENSION })
        
        if (extensionConstructionSites.length > 0)
            return;
        
        const builtExtensions = room.find(FIND_STRUCTURES, { filter: (structure) => structure.structureType === STRUCTURE_EXTENSION });
        
        const maxExtensions = CONTROLLER_STRUCTURES[STRUCTURE_EXTENSION][room.controller!.level]!;
        
        if (builtExtensions.length >= maxExtensions )
            return;

       const position = this.getNextBuildablePosition(room);

       if (position == undefined)
       {
            return;
       }
       
       room.createConstructionSite(position.x, position.y, STRUCTURE_EXTENSION);
    },

    
    placeContainer(room)
    {
        const containerConstructionSites = room.find(FIND_CONSTRUCTION_SITES, { filter: (structure) => structure.structureType === STRUCTURE_CONTAINER })
        
        if (containerConstructionSites.length > 0)
            return;

        const builtContainers = room.find(FIND_STRUCTURES, { filter: (structure) => structure.structureType === STRUCTURE_CONTAINER });

        if (builtContainers.length >= 5)
            return;

        const position = this.getNextBuildablePosition(room);

        if (position == undefined)
        {
            return;
        }

       room.createConstructionSite(position.x, position.y, STRUCTURE_CONTAINER);
    },

    isFree(roomPosition) {
        if (roomPosition.lookFor(LOOK_TERRAIN)[0] === "wall")
            return false;

        const structures = roomPosition.lookFor(LOOK_STRUCTURES);
        if (structures.length > 0)
            return false;

        const sites = roomPosition.lookFor(LOOK_CONSTRUCTION_SITES);
        if (sites.length > 0)
            return false;

        return true;
    },

    isBuildable(roomPosition)
    {
        if (!this.isFree(roomPosition))
            return false;

        
        for (var neighbor of constructibleArea.getNeighbors(new Position(roomPosition.x, roomPosition.y))) {
            if (!this.isFree(new RoomPosition(neighbor.x, neighbor.y, roomPosition.roomName)))
            {
                return false;
            }
        }

        return true;
    },

    getNextBuildablePosition(room)
    {
        var position = new Position(constructibleArea.bottomRight.x, constructibleArea.topLeft.y);

        while (!this.isBuildable(new RoomPosition(position.x, position.y, room.name)))
        {
            var nextPosition = constructibleArea.nextPositionInArea(position, Direction.TOP_TO_BOTTOM_RIGHT_TO_LEFT);

            if (nextPosition instanceof String) {
                console.log("No space found for extension");
                return;
            }
            else {
                position = nextPosition;
            }
        }

        return position;
    }
}