import * as readline from 'readline';

enum Direction {
    North = "NORTH",
    East = "EAST",
    South = "SOUTH",
    West = "WEST"
}

class ToyRobotSimulator {
    private xCoordinate: number = -1;
    private yCoordinate: number = -1;
    private direction: Direction | null = null;
    executeToyRobot(input: string) {
        if (input === "MOVE") {
            this.move();
        } else if (input === "REPORT") {
            this.report();
        } else if (input === "RIGHT") {
            this.right();
        } else if (input === "LEFT") {
            this.left();
        } else {
            const [input2, params] = input.split(' ');
            if (input2 === "PLACE" && params) {
                const [x, y, dir] = params.split(',');
                if( Object.values(Direction).includes(dir as Direction))  //used to check in if the given input direction is valid or not
                {
                    this.place(Number(x), Number(y), dir as Direction);
                }
                else
                {
                    console.log("Incorrect Input, Try Again!!!");
                }
                
            } else {
                console.log("Incorrect Input, Try Again!!!");
            }
        }
    }

    private isValidPlacement(x: number, y: number): boolean {
        //As given table used is of 5*5
        return x >= 0 && x < 5 && y >= 0 && y < 5;
    }

    private place(x: number, y: number, direction: Direction) {
        if (this.isValidPlacement(x, y)) {
            this.xCoordinate = x;
            this.yCoordinate = y;
            this.direction = direction;
        } else {
            this.reportError();
        }
    }

    private move() {
        if (this.direction === null) {
            this.reportError();
            return;
        }

        switch (this.direction) {
            case Direction.North:
                if (this.isValidPlacement(this.xCoordinate, this.yCoordinate + 1)) {
                    this.yCoordinate += 1;
                }
                break;
            case Direction.East:
                if (this.isValidPlacement(this.xCoordinate + 1, this.yCoordinate)) {
                    this.xCoordinate += 1;
                }
                break;
            case Direction.South:
                if (this.isValidPlacement(this.xCoordinate, this.yCoordinate - 1)) {
                    this.yCoordinate -= 1;
                }
                break;
            case Direction.West:
                if (this.isValidPlacement(this.xCoordinate - 1, this.yCoordinate)) {
                    this.xCoordinate -= 1;
                }
                break;
            default:
                this.reportError();
                break;
        }
    }

    private left() {
        if (this.direction === null) {
            this.reportError();
            return;
        }

        switch (this.direction) {
            case Direction.North:
                this.direction = Direction.West;
                break;
            case Direction.East:
                this.direction = Direction.North;
                break;
            case Direction.South:
                this.direction = Direction.East;
                break;
            case Direction.West:
                this.direction = Direction.South;
                break;
        }
    }

    private right() {
        if (this.direction === null) {
            this.reportError();
            return;
        }

        switch (this.direction) {
            case Direction.North:
                this.direction = Direction.East;
                break;
            case Direction.East:
                this.direction = Direction.South;
                break;
            case Direction.South:
                this.direction = Direction.West;
                break;
            case Direction.West:
                this.direction = Direction.North;
                break;
        }
    }

    private report() {
        if (this.direction !== null) {
            console.log(`X_Coordinate: ${this.xCoordinate}, Y_Coordinate ${this.yCoordinate}, Face_towards: ${this.direction}`);
        } else {
            this.reportError();
        }
    }

    private reportError() {
        console.log("Some Error Occurred or Invalid Command");
    }
}

const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const toyRobot = new ToyRobotSimulator();

read.on('line', (input) => {
    if (input.trim() === 'EXIT') {
        read.close();
    } else {
        toyRobot.executeToyRobot(input.trim());
    }
});