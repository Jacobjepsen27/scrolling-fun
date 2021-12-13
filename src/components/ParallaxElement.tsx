import { Position } from "../models/Position"
import React, { useEffect, useRef } from "react"
import { calculateNewCoordinates } from "../utils/animationUtils"

interface ParallaxElementProps {
  position: Position
  children: JSX.Element
}
export const ParallaxElement = ({
  position,
  children,
}: ParallaxElementProps) => {
  const elementRef = useRef<HTMLDivElement | null>(null)

  const requestRef = useRef(0)

  useEffect(() => {
    if (elementRef.current != null) {
      const updateElementPosition = () => {
        let _width = window.innerWidth
        let _height = window.innerHeight
        let _currentScrollPercentage =
          window.scrollY / (document.body.scrollHeight - window.innerHeight)
        const [x, y] = calculateNewCoordinates(
          position,
          _currentScrollPercentage
        )

        const xPixel = x * _width
        const yPixel = y * _height

        elementRef.current!!.style.transform = `translate3d(${xPixel}px, ${
          yPixel + window.scrollY
        }px, 0px)`
        requestRef.current = window.requestAnimationFrame(updateElementPosition)
      }
      requestRef.current = window.requestAnimationFrame(updateElementPosition)
    }

    return () => window.cancelAnimationFrame(requestRef.current)
  }, [position])

  return <div ref={elementRef}>{children}</div>
}
