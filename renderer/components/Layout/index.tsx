import React, { useState } from 'react'
import {
    CssBaseline, makeStyles, createStyles, Theme, IconButton,
    Divider, ListItem, ListItemIcon, ListItemText, Collapse,
    List, Button,
} from '@material-ui/core'
import {
    InboxOutlined, ExpandMoreOutlined, ChevronRightOutlined,
    ExpandLess, ExpandMore, VideoLibrary, WorkOutline, AccountBox,
    Help,
} from '@material-ui/icons'
import Link from 'next/link'
import { TreeView, TreeItem } from '@material-ui/lab'

import { selectFolder, scanFolder, IFileType } from '../../util/file'

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
        empty: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        filetree: {
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'center',
            flexGrow: 1,
            minHeight: 240,
            padding: 8
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
const renderIcon = (ext: string) => {
    switch (ext) {
        default:
            return
    }
}
const renderFileItem = (v: IFileType) => {
    if (v.elements && v.elements.length > 0) {
        return (
            <TreeItem label={v.base} nodeId={v.filePathFull} key={v.filePathFull}>
                {v.elements.map(i => renderFileItem(i))}
            </TreeItem>
        )
    }

    return (
        <TreeItem label={v.base} nodeId={v.filePathFull} key={v.filePathFull} />
    )
}
const Page: React.FC<IProps> = props => {
    const classes = useStyles()
    const [visible, setVisible] = useState(true)
    const [collapse1, setCollapse1] = useState(true)
    const [files, setFiles] = useState<IFileType[]>([])
    const onClickM1 = async () => {
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
            <div className={classes.menu}>
                <IconButton style={{ color: '#fff' }} onClick={onClickM1}>
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
            {visible ?
                <div className={classes.darwer} >
                    <ListItem button key='1' onClick={() => setCollapse1(!collapse1)}>
                        <ListItemIcon>
                            <WorkOutline />
                        </ListItemIcon>
                        <ListItemText primary='workspace' />
                        {collapse1 ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse
                        unmountOnExit
                        in={collapse1}
                        className={classes.filetree}
                        style={files.length > 0 ? { justifyContent: 'flex-start' } : {}}
                    >
                        {files.length > 0
                            ?
                            <List component='div' disablePadding >
                                <TreeView
                                    defaultCollapseIcon={<ExpandMoreOutlined />}
                                    defaultExpandIcon={<ChevronRightOutlined />}
                                >
                                    {files.map(i => renderFileItem(i))}
                                </TreeView>
                            </List>
                            :
                            <div className={classes.empty}>
                                <Button onClick={onClickM1}>未选择文件夹</Button>
                            </div>}
                    </Collapse>
                    <Divider />
                    <ListItem button key='2'>
                        <ListItemIcon>
                            <InboxOutlined />
                        </ListItemIcon>
                        <ListItemText primary='视频编辑' />
                    </ListItem>
                    <ListItem button key='3'>
                        <ListItemIcon>
                            <InboxOutlined />
                        </ListItemIcon>
                        <ListItemText primary='字幕编辑' />
                    </ListItem>
                    <ListItem button key='4'>
                        <ListItemIcon>
                            <InboxOutlined />
                        </ListItemIcon>
                        <ListItemText primary='配音录音' />
                    </ListItem>
                    <Link href='/editor/download'>
                        <ListItem button key='5'>
                            <ListItemIcon>
                                <InboxOutlined />
                            </ListItemIcon>
                            <ListItemText primary='视频下载' />
                        </ListItem>
                    </Link>
                </div>
                : null}
            <div className={classes.content}>
                {props.children}
            </div>
        </div>
    )
}

export default Page
