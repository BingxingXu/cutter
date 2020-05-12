import React, { useState } from 'react'
import {
    CssBaseline, makeStyles, createStyles, Theme, IconButton,
    Drawer, Divider, List, ListItem, ListItemIcon, ListItemText
} from '@material-ui/core'
import { InboxOutlined, ExpandMoreOutlined, ChevronRightOutlined } from '@material-ui/icons'
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
        filetree: {
            flexGrow: 1,
            height: 240,
            padding: 24,
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
                    <InboxOutlined />
                </IconButton>
                <Divider />
                <IconButton style={{ color: '#fff' }} onClick={() => setVisible(!visible)}>
                    <InboxOutlined />
                </IconButton>
            </div>
            {visible ?
                <div className={classes.darwer} >
                    {files.length > 0 ?
                        <TreeView
                            className={classes.filetree}
                            defaultCollapseIcon={<ExpandMoreOutlined />}
                            defaultExpandIcon={<ChevronRightOutlined />}
                        >
                            {files.map(i => renderFileItem(i))}
                        </TreeView>
                        :
                        '未选择文件夹'}
                    <ListItem button key='1'>
                        <ListItemIcon>
                            <InboxOutlined />
                        </ListItemIcon>
                        <ListItemText primary='素材管理' />
                    </ListItem>
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
                    <Divider />
                    <ListItem button key='6'>
                        <ListItemIcon>
                            <InboxOutlined />
                        </ListItemIcon>
                        <ListItemText primary='账号' />
                    </ListItem>
                    <ListItem button key='7'>
                        <ListItemIcon>
                            <InboxOutlined />
                        </ListItemIcon>
                        <ListItemText primary='帮助' />
                    </ListItem>
                </div>
                : null}
            <div className={classes.content}>
                {props.children}
            </div>
        </div>
    )
}

export default Page
