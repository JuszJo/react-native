import constants from "../constants"
import { randomPositions } from "../utils/utils"

export default function GameLoop(entities, { events, dispatch }) {
    const head = entities.head
    const food = entities.food
    const tail = entities.tail

    if(events.length) {
        events.forEach(e => {
            switch (e) {
                case "MOVE_RIGHT":
                    if(head.xspeed == 1) return
                    // console.log("omo");

                    head.xspeed = 1
                    head.yspeed = 0
                    
                    break;
                    
                case "MOVE_LEFT":
                    if(head.xspeed == -1) return

                    head.xspeed = -1
                    head.yspeed = 0

                break;

                case "MOVE_UP":
                    if(head.yspeed == -1) return

                    head.xspeed = 0
                    head.yspeed = -1

                break;

                case "MOVE_DOWN":
                    if(head.yspeed == 1) return

                    head.xspeed = 0
                    head.yspeed = 1

                break;

                default:
                    break;
            }
        })
    }

    head.nextMove -= 1

    if(head.nextMove === 0) {
        // tail.elements = [head.position[0], head.position[1]].concat(tail.elements)

        tail.elements = [
            [head.position[0], head.position[1]],
            ...tail.elements
        ]

        // console.log(tail.elements);

        tail.elements.pop()

        head.nextMove = head.updateFrequency

        head.position[0] += head.xspeed;
        head.position[1] += head.yspeed;    

        if(
            head.position[0] == food.position[0] &&
            head.position[1] == food.position[1]
        ) {
            // tail.elements = [head.position[0], head.position[1]].concat(tail.elements)

            tail.elements = [
                [head.position[0], head.position[1]],
                ...tail.elements
            ]
            // console.log(tail.elements);

            food.position = [
                randomPositions(0, constants.GRID_SIZE - 1),
                randomPositions(0, constants.GRID_SIZE - 1)
            ]
        }
    }

    return entities
}