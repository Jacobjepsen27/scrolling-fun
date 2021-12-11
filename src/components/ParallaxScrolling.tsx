import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";
import {Position} from "../models/Position";
import {Phone} from "./Phone";

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
            x: 0.4,
            y: 0.4
        },
    },
    {
        start: {
            percent: 0.15,
            x: 0.7,
            y: 0.4
        },
        end: {
            percent: 0.5,
            x: 0.4,
            y: 0.4
        },
    },
    {
        start: {
            percent: 0.10,
            x: 0.75,
            y: 0.8
        },
        end: {
            percent: 0.5,
            x: 0.4,
            y: 0.4
        },
    },
    {
        start: {
            percent: 0,
            x: 0.6,
            y: 0.65
        },
        end: {
            percent: 0.5,
            x: 0.4,
            y: 0.4
        },
    },
    {
        start: {
            percent: 0,
            x: 0.4,
            y: 1.5
        },
        end: {
            percent: 0.5,
            x: 0.4,
            y: 0.3
        },
    },
]


export const ParallaxScrolling = () => {
    return <ParallaxBody>
        <Phone/>
        { positions.map((position,index) =>
            <ParallaxImage key={index} position={position} >
                <ImageDiv/>
                {/*<Phone/>*/}
            </ParallaxImage>
        )}
    </ParallaxBody>
}

const ImageDiv = styled.div`
    display: block;
    position: absolute;
    -webkit-transform-style: preserve-3d;
    width: 360px;
    height: 290px;
    background: url("http://placekitten.com/360/290");
    -webkit-backface-visibility: hidden;
`

interface ParallaxImageProps {
    position: Position,
    children: JSX.Element
}
const ParallaxImage = ({position, children}: ParallaxImageProps) => {
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


    return <div ref={elementRef}>{children}</div>
    // return <ImageDiv ref={elementRef} />
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
