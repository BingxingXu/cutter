import React, { useState } from 'react'
import {
    CssBaseline, makeStyles, createStyles, Theme, IconButton,
    Drawer, Divider, List, ListItem, ListItemIcon, ListItemText
} from '@material-ui/core'
import { InboxOutlined, MailOutlineOutlined } from '@material-ui/icons'
import Link from 'next/link'

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
    return (
        <div className={classes.root}>
            <CssBaseline />
            <div className={classes.menu}>
                <IconButton style={{ color: '#fff' }}>
                    <InboxOutlined />
                </IconButton>
                <Divider />
                <IconButton style={{ color: '#fff' }}>
                    <InboxOutlined />
                </IconButton>
            </div>
            {visible ?
                <div className={classes.darwer} >
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
