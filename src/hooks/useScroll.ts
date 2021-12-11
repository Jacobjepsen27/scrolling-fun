import {useEffect, useState} from "react";


export const useScroll = () => {
    const [scrollOffset, setScrollOffset] = useState(0)

    const handleScroll = () => setScrollOffset(window.scrollY)

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    },[])

    return { scrollOffset }
}
