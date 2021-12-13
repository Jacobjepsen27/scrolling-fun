import styled from "@emotion/styled"
import React from "react"
import { Position } from "../models/Position"
import { Phone } from "./Phone"
import { CatImage } from "./CatImage"
import { Header } from "./Header"
import { ParallaxElement } from "./ParallaxElement"

const ParallaxBody = styled.div`
  height: 400vh;
  overflow-x: hidden;
`

const catOne: Position = {
  start: {
    percent: 0,
    x: 0.8,
    y: 0.05,
  },
  end: {
    percent: 0.8,
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
    percent: 0.8,
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
    percent: 0.8,
    x: 0.4,
    y: 0.3,
  },
}

const catFour: Position = {
  start: {
    percent: 0.25,
    x: 0.6,
    y: 0.65,
  },
  end: {
    percent: 0.8,
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
    percent: 0.8,
    x: 0.4,
    y: 0.2,
  },
}

const headerPosition: Position = {
  start: {
    percent: 0,
    x: 0.2,
    y: 0.2,
  },
  end: {
    percent: 1,
    x: -1,
    y: 0.2,
  },
}

export const ParallaxScrolling = () => {
  return (
    <ParallaxBody>
      <ParallaxElement position={headerPosition}>
        <Header>A new way of discovering and sharing cats.</Header>
      </ParallaxElement>
      <ParallaxElement position={phonePosition}>
        <Phone />
      </ParallaxElement>
      <ParallaxElement position={catOne}>
        <CatImage />
      </ParallaxElement>
      <ParallaxElement position={catTwo}>
        <CatImage />
      </ParallaxElement>
      <ParallaxElement position={catThree}>
        <CatImage />
      </ParallaxElement>
      <ParallaxElement position={catFour}>
        <CatImage />
      </ParallaxElement>
    </ParallaxBody>
  )
}
