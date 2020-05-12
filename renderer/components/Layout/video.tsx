import React, { useState } from 'react'
import { ListItem, ListItemIcon, ListItemText, Collapse, makeStyles, Theme, createStyles } from '@material-ui/core'
import { Movie, ExpandLess, ExpandMore } from '@material-ui/icons'
import Link from 'next/link'

import { IFileType } from '../../util/file'

interface IProps {
    files: IFileType[]
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        collapse: {}
    }))
const Page: React.FC<IProps> = (props) => {
    const classes = useStyles()
    const [collapse, setCollapse] = useState(false)
    const videos: IFileType[] = [];
    const getVideo = (f: IFileType) => {
        if (f.ext in ['mp4', 'avi', 'rmvb']) {
            const copy =
                videos.push()
        }
    }
    return (
        <>
            <ListItem button key='2' onClick={() => setCollapse(!collapse)}>
                <ListItemIcon>
                    <Movie />
                </ListItemIcon>
                <ListItemText primary='视频编辑' />
                {collapse ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
                unmountOnExit
                in={collapse}
                className={classes.collapse}
            >
                <Link href='/editor/video'>
                    <a>video</a>
                </Link>
            </Collapse>
        </>
    )
}

export default Page
