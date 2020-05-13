import React, { useState, useRef } from 'react'
import {
    makeStyles, createStyles, Theme, LinearProgress,
    Slider, IconButton, Grid,
} from '@material-ui/core'
import { PlayArrow } from '@material-ui/icons'
import Player from 'react-player'

interface IProps { }
interface IPlayState {
    played: number,
    playedSeconds: number,
    loaded: number,
    loadedSeconds: number
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'pink'
        },
        slice: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4
        }
    }))
const Page: React.FC<IProps> = (props) => {
    const player = useRef()
    const classes = useStyles()
    const [playing, setPlaying] = useState(true)
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(1)
    const [slices, setSlices] = useState<[number, number][]>([[1, 30]])
    const onProgress = (state: IPlayState) => {
        setProgress(state.playedSeconds)
    }
    const onDuration = (d: number) => {
        setDuration(d)
    }
    const onSlideSlice = (index: number, value: number[]) => {
        const copy = [...slices]
        copy[index] = [value[0], value[1]]
        setSlices(copy)
    }
    const renderSliderValue = (value: number) => {
        return `${value}`
    }
    return (
        <div className={classes.container}>
            <Player
                ref={player}
                playing={playing}
                controls
                progressInterval={500}
                onProgress={onProgress}
                onDuration={onDuration}
                url='file:///Users/xubingxing/Desktop/minx/cut/a.mp4'
            />
            <div>duration: {duration.toFixed(1)} sec</div>
            <div>played: {progress.toFixed(1)} sec</div>
            <LinearProgress value={(progress / duration) * 100} variant='determinate' />
            {slices.map((i, index) => (
                <div className={classes.slice} key={index}>
                    <Slider
                        key={index}
                        value={i}
                        max={duration}
                        step={.5}
                        min={0}
                        onChange={(_: any, value: number[]) => onSlideSlice(index, value)}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        getAriaValueText={renderSliderValue}
                    />
                    <IconButton aria-label="delete">
                        <PlayArrow color='primary' />
                    </IconButton>
                </div>
            ))}
        </div>
    )
}

export default Page