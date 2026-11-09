import { useEffect, useRef, useState } from "react"

const SPEAKER = "M4 9.5h3.5L12 5.5v13l-4.5-4H4z"
const WAVE_1 = "M15.5 9a4 4 0 0 1 0 6"
const WAVE_2 = "M18 6.5a7.5 7.5 0 0 1 0 11"
const MUTED = "M16 9.5l5 5M21 9.5l-5 5"

// Cries are Ogg Vorbis files, which some Safari versions can't decode, so
// only offer the button where the browser says it can play them.
const canPlayOgg = () =>
    typeof Audio !== "undefined" && new Audio().canPlayType('audio/ogg; codecs="vorbis"') !== ""

// status: "idle" | "loading" | "playing" | "error"
function CryButton({ url, name }) {
    const audioRef = useRef(null)
    const [status, setStatus] = useState("idle")

    // Stop the sound if the user navigates to another pokemon mid-cry.
    useEffect(() => {
        return () => {
            audioRef.current?.pause()
            audioRef.current = null
        }
    }, [url])

    if (!url || !canPlayOgg()) return null

    const play = async () => {
        if (!audioRef.current) {
            const audio = new Audio(url)
            audio.volume = 0.4
            audio.addEventListener("playing", () => setStatus("playing"))
            audio.addEventListener("ended", () => setStatus("idle"))
            audio.addEventListener("error", () => setStatus("error"))
            audioRef.current = audio
        }

        const audio = audioRef.current
        audio.currentTime = 0
        setStatus("loading")

        try {
            await audio.play()
        } catch (err) {
            console.error(err)
            setStatus("error")
        }
    }

    const isError = status === "error"
    const label = isError
        ? `Couldn't play ${name}'s cry. Try again`
        : status === "playing"
          ? `Playing ${name}'s cry`
          : `Play ${name}'s cry`

    return (
        <button
            type="button"
            className={`c-detail-hero__btn c-detail-hero__btn--icon c-cry is-${status}`}
            onClick={play}
            aria-label={label}
            title={label}
        >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d={SPEAKER} />
                {isError ? (
                    <path d={MUTED} />
                ) : (
                    <>
                        <path className="c-cry__wave c-cry__wave--1" d={WAVE_1} />
                        <path className="c-cry__wave c-cry__wave--2" d={WAVE_2} />
                    </>
                )}
            </svg>
            <span className="u-visually-hide" aria-live="polite">
                {status === "playing" ? "Playing" : isError ? "Audio unavailable" : ""}
            </span>
        </button>
    )
}

export default CryButton
