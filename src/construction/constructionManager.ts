import * as _ from 'lodash';
import { Position } from './position';
import { Area } from './area';
import { Direction } from './direction'

let constructionManager: {
    placeExtensions(room: Room): void
}

const constructibleArea = new Area(new Position(19, 19), new Position(30, 30))

export default constructionManager = {
    placeExtensions(room) {

        let shouldConstruct = true;
        let position = new Position(constructibleArea.bottomRight.x, constructibleArea.topLeft.y)

        while(shouldConstruct)
        {
            switch (room.createConstructionSite(position.x, position.y, STRUCTURE_EXTENSION)) {
                case ERR_NOT_OWNER:
                    shouldConstruct = false;
                    break;
                case ERR_FULL:
                    shouldConstruct = false;
                    break;
                case ERR_RCL_NOT_ENOUGH:
                    shouldConstruct = false;
                    break;
                case ERR_INVALID_ARGS:
                    shouldConstruct = false;
                    break;
                case ERR_INVALID_TARGET:
                    let nextPosition = constructibleArea.nextPositionInArea(position, Direction.TOP_TO_BOTTOM_RIGHT_TO_LEFT);
                    if (nextPosition instanceof String)
                    {
                        shouldConstruct = false;
                    }
                    else
                    {
                        position = new Position(nextPosition.x, nextPosition.y)
                    }
                    break
                case OK:
                    continue;
                default:
                    break;
            }
        }
    }
}