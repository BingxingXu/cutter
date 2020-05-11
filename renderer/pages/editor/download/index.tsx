import React, { useState } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core'

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
        </div>
    )
}

export default Page
