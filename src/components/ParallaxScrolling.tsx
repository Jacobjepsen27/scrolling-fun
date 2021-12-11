import styled from "@emotion/styled"
import React, { useEffect, useRef } from "react"
import { Position } from "../models/Position"
import { Phone } from "./Phone"
import { calculateNewCoordinates } from "../utils/animationUtils"

const ParallaxBody = styled.div`
  height: 800vh;
`

const catOne: Position = {
  start: {
    percent: 0,
    x: 0.8,
    y: 0.05,
  },
  end: {
    percent: 0.5,
    x: 0.4,
    y: 0.3,
  },
}
const catTwo: Position = {
  start: {
    percent: 0.15,
    x: 0.7,
    y: 0.2,
  },
  end: {
    percent: 0.5,
    x: 0.4,
    y: 0.3,
  },
}
const catThree: Position = {
  start: {
    percent: 0.1,
    x: 0.75,
    y: 0.8,
  },
  end: {
    percent: 0.5,
    x: 0.4,
    y: 0.3,
  },
}

const catFour: Position = {
  start: {
    percent: 0,
    x: 0.6,
    y: 0.65,
  },
  end: {
    percent: 0.5,
    x: 0.4,
    y: 0.3,
  },
}

const phonePosition: Position = {
  start: {
    percent: 0,
    x: 0.4,
    y: 1.5,
  },
  end: {
    percent: 0.5,
    x: 0.4,
    y: 0.2,
  },
}

export const ParallaxScrolling = () => {
  return (
    <ParallaxBody>
      <ParallaxImage position={phonePosition}>
        <Phone />
      </ParallaxImage>
      <ParallaxImage position={catOne}>
        <CatImage />
      </ParallaxImage>
      <ParallaxImage position={catTwo}>
        <CatImage />
      </ParallaxImage>
      <ParallaxImage position={catThree}>
        <CatImage />
      </ParallaxImage>
      <ParallaxImage position={catFour}>
        <CatImage />
      </ParallaxImage>
    </ParallaxBody>
  )
}

const CatImage = styled.div`
  display: block;
  position: absolute;
  -webkit-transform-style: preserve-3d;
  width: 360px;
  height: 290px;
  background: url("http://placekitten.com/360/290");
  -webkit-backface-visibility: hidden;
`

interface ParallaxImageProps {
  position: Position
  children: JSX.Element
}
const ParallaxImage = ({ position, children }: ParallaxImageProps) => {
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
  }, [elementRef.current, position])

  return <div ref={elementRef}>{children}</div>
}
