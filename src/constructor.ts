import * as _ from 'lodash';

let buildingManager: {
    placeExtensions(room: Room): void
    getNextPosition(x: number, y: number): { x: number, y: number } | String
}

const constructible_area_upper_left = { x: 19, y: 19}
const constructible_area_lower_right = { x: 30, y: 30}

export default buildingManager = {
    placeExtensions(room) {

        let shouldConstruct = true;
        let x = constructible_area_upper_left.x;
        let y = constructible_area_upper_left.y;

        while(shouldConstruct)
        {
            switch (room.createConstructionSite(x, y, STRUCTURE_EXTENSION)) {
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
                    let nextPosition = this.getNextPosition(x, y);
                    if (nextPosition instanceof String)
                    {
                        shouldConstruct = false;
                    }
                    else
                    {
                        x = nextPosition.x;
                        y = nextPosition.y;
                    }
                    break
                case OK:
                    continue;
                default:
                    break;
            }
        }
    },

    getNextPosition(x, y) {
        if (x >= constructible_area_lower_right.x && y >= constructible_area_lower_right.y)
            return "ERROR"
        else if (x >= constructible_area_lower_right.x)
            return { x: constructible_area_upper_left.x, y: y + 1}
        else
            return { x: x + 1, y: y }
    }
}