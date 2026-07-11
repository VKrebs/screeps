import { Direction } from "./direction";
import { Position } from "./position";

export class Area {
    readonly topLeft: Position;
    readonly bottomRight: Position;

    constructor(upper_left: Position, lower_right: Position)
    {
        this.topLeft = upper_left;
        this.bottomRight = lower_right;
    }

    public isInArea(position: Position)
    {
        return position.x >= this.topLeft.x &&
            position.x <= this.bottomRight.x &&
            position.y >= this.topLeft.y &&
            position.y <= this.bottomRight.y;
    }

    public nextPositionInArea(position: Position, direction: Direction = Direction.TOP_TO_BOTTOM_LEFT_TO_RIGHT) : Position | String
    {
        if (!this.isInArea(position))
        {
            return "ERR_OUT_OF_AREA";
        }

        if (direction == Direction.TOP_TO_BOTTOM_LEFT_TO_RIGHT)
        {
            if (position.x >= this.bottomRight.x && position.y >= this.bottomRight.y)
                return "ERR_END_OF_AREA_REACHED"
            else if (position.x >= this.bottomRight.x)
                return new Position(this.topLeft.x, position.y + 1)
            else
                return new Position(position.x + 1, position.y)
        }
        else if (direction == Direction.TOP_TO_BOTTOM_RIGHT_TO_LEFT)
        {
            if (position.x <= this.topLeft.x && position.y >= this.bottomRight.y)
                return "ERR_END_OF_AREA_REACHED"
            else if (position.x <= this.topLeft.x)
                return new Position(this.bottomRight.x, position.y + 1)
            else return new Position(position.x - 1, position.y)
        }
        else if (direction == Direction.BOTTOM_TO_TOP_LEFT_TO_RIGHT)
        {
            if (position.x >= this.bottomRight.x && position.y <= this.topLeft.y)
                return "ERR_END_OF_AREA_REACHED"
            else if (position.x >= this.bottomRight.x)
                return new Position(this.topLeft.x, position.y + 1)
            else
                return new Position(position.x + 1, position.y)
        }
        else if (direction == Direction.BOTTOM_TO_TOP_RIGHT_TO_LEFT)
        {
            if (position.x <= this.topLeft.x && position.y <= this.topLeft.y)
                return "ERR_END_OF_AREA_REACHED"
            else if (position.x <= this.topLeft.x)
                return new Position(this.bottomRight.x, position.y - 1)
            else return new Position(position.x - 1, position.y)
        }

        return "ERR_NOT_IMPL";
    }

    public getNeighbors(position:Position): Position[]
    {
        return position.getNeighbors().filter(n => this.isInArea(n))
    }
}

