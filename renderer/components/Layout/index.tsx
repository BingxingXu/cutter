import React, { useState } from 'react'
import {
    CssBaseline, makeStyles, createStyles, Theme, IconButton,
    Divider, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core'
import {
    InboxOutlined, ExpandLess, ExpandMore, VideoLibrary,
    AccountBox, Help, CloudDownload,
} from '@material-ui/icons'

import { selectFolder, scanFolder, IFileType } from '../../util/file'
import Folder from './folder'
import Video from './video'
import Audio from './audio'
import Download from './download'

interface IProps { }
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        menu: {
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,1)'
        },
        darwer: {
            display: 'flex',
            flexDirection: 'column',
            width: 240,
            height: '100vh',
            borderRight: '1px solid #f0f0f0'
        },
        content: {
            padding: theme.spacing(1)
        }
    })
)
const Page: React.FC<IProps> = props => {
    const classes = useStyles()
    const [visible, setVisible] = useState(true)
    const [collapse3, setCollapse3] = useState(false)
    const [collapse4, setCollapse4] = useState(false)
    const [collapse5, setCollapse5] = useState(false)
    const [files, setFiles] = useState<IFileType[]>([])
    const onOpenFolder = async () => {
        try {
            const filePath = await selectFolder()
            const files = await scanFolder(filePath)
            setFiles(files)
        } catch (err) {
            console.log('error', err)
        }
    }
    return (
        <div className={classes.root}>
            <CssBaseline />
            {/* menu */}
            <div className={classes.menu}>
                <IconButton style={{ color: '#fff' }}>
                    <VideoLibrary />
                </IconButton>
                <Divider />
                <IconButton style={{ color: '#fff' }} onClick={() => setVisible(!visible)}>
                    <InboxOutlined />
                </IconButton>
                <IconButton style={{ color: '#fff' }} onClick={() => setVisible(!visible)}>
                    <AccountBox />
                </IconButton>
                <IconButton style={{ color: '#fff' }} onClick={() => setVisible(!visible)}>
                    <Help />
                </IconButton>
            </div>
            {/* appbar */}
            {visible ?
                <div className={classes.darwer} >
                    <Folder files={files} onClickEmpty={onOpenFolder} />
                    <Divider />
                    <Video files={files} />
                    <Divider />
                    <Audio files={files} />
                    <Divider />
                    <Download files={files} />
                </div>
                : null}
            <div className={classes.content}>
                {props.children}
            </div>
        </div>
    )
}

export default Page
