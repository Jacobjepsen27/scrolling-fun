import { Position } from "../models/Position"

// Finds coordinates on the line based according to percentage
export const calculateNewCoordinates = (
  position: Position,
  scrollPercentage: number
): [x: number, y: number] => {
  if (scrollPercentage <= position.start.percent) {
    return [position.start.x, position.start.y]
  } else if (scrollPercentage >= position.end.percent) {
    return [position.end.x, position.end.y]
  } else {
    const animationProgressPercentage = calculateAnimationProgressPercentage(
      position,
      scrollPercentage
    )
    return [
      position.start.x +
        (position.end.x - position.start.x) * animationProgressPercentage,
      position.start.y +
        (position.end.y - position.start.y) * animationProgressPercentage,
    ]
  }
}

const calculateAnimationProgressPercentage = (
  position: Position,
  scrollPercentage: number
): number => {
  const range = position.end.percent - position.start.percent
  const correctedStartValue = scrollPercentage - position.start.percent
  return correctedStartValue / range
}
