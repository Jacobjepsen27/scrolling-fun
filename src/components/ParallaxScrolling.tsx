import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";
import {Position} from "../models/Position";

const ParallaxBody = styled.div`
    height: 800vh;
`

const positions: Position[] = [
    {
        start: {
            percent: 0,
            x: 0.8,
            y: 0.2
        },
        end: {
            percent: 0.5,
            x: 0.5,
            y: 0.5
        },
    },
    {
        start: {
            percent: 0,
            x: 0.7,
            y: 0.4
        },
        end: {
            percent: 0.5,
            x: 0.5,
            y: 0.5
        },
    },
    {
        start: {
            percent: 0,
            x: 0.2,
            y: 0.8
        },
        end: {
            percent: 0.5,
            x: 0.5,
            y: 0.5
        },
    },
    {
        start: {
            percent: 0,
            x: 0.2,
            y: 0.2
        },
        end: {
            percent: 0.5,
            x: 0.5,
            y: 0.5
        },
    },
]


export const ParallaxScrolling = () => {
    // const { scrollOffset } = useScroll()

    return <ParallaxBody>
        { positions.map((position,index) =>
            <ParallaxImage key={index} position={position} />
        )}
        {/*<ParallaxImage position={positions[0]} />*/}

    </ParallaxBody>
}

const ImageDiv = styled.div`
    display: block;
    position: absolute;
    transform-style: preserve-3d;
    width: 360px;
    height: 290px;
    background: url("http://placekitten.com/360/290");
`

interface ParallaxImageProps {
    position: Position,
}
const ParallaxImage = ({position}: ParallaxImageProps) => {
    const elementRef = useRef<HTMLDivElement | null>(null)

    const requestRef = useRef(0)

    useEffect(() => {
        if(elementRef.current != null) {

            const updateElementPosition = () => {
                let _width = window.innerWidth
                let _height = window.innerHeight
                let _currentScrollPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight)
                const [x,y] = calculateNewCoordinates(position, _currentScrollPercentage)
                const xPixel = x*_width
                const yPixel = y*_height

                elementRef.current!!.style.transform = `translate3d(${xPixel}px, ${yPixel+window.scrollY}px, 0px)`
                requestRef.current = window.requestAnimationFrame(updateElementPosition)
            }
            requestRef.current = window.requestAnimationFrame(updateElementPosition)

        }
        return () => window.cancelAnimationFrame(requestRef.current)
    },[elementRef.current, position])


    return <ImageDiv ref={elementRef} />
}

// Finds coordinates on the line based according to percentage
const calculateNewCoordinates = (position: Position, scrollPercentage: number): [x: number, y: number] => {
    if(scrollPercentage <= position.start.percent){
        return [position.start.x,position.start.y]
    }else if (scrollPercentage >= position.end.percent){
        return [position.end.x, position.end.y]
    }else {
        const animationProgressPercentage = calculateAnimationProgressPercentage(position, scrollPercentage)
        return [
            position.start.x+(position.end.x-position.start.x)*animationProgressPercentage,
            position.start.y+(position.end.y - position.start.y)*animationProgressPercentage
        ]
    }
}

const calculateAnimationProgressPercentage = (position: Position, scrollPercentage: number): number => {
    const range = position.end.percent-position.start.percent
    const correctedStartValue = scrollPercentage-position.start.percent
    return (correctedStartValue)/range
}
