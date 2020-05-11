import React, { useState } from 'react'
import { TextField, makeStyles, createStyles, Theme } from '@material-ui/core'

interface IProps { }
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start'
        }
    }))

const Page: React.FC<IProps> = props => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            content
            <TextField
                label='视频地址'
                placeholder='支持youtube\xx下载'

            />
        </div>
    )
}

export default Page
