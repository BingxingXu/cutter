import React, { useState } from 'react'
import {
    Collapse, ListItem, ListItemIcon, ListItemText,
    createStyles, makeStyles, Theme,
} from '@material-ui/core'
import { Audiotrack, ExpandLess, ExpandMore } from '@material-ui/icons'
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
    const [collapse, setCollapse] = useState(false)
    const classes = useStyles()
    return (
        <>
            <ListItem button key='2' onClick={() => setCollapse(!collapse)}>
                <ListItemIcon>
                    <Audiotrack />
                </ListItemIcon>
                <ListItemText primary='配音录音' />
                {collapse ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
                unmountOnExit
                in={collapse}
                className={classes.collapse}
            >
                <Link href='/editor/audio'>
                    <a>audio</a>
                </Link>
            </Collapse>
        </>
    )
}

export default Page
