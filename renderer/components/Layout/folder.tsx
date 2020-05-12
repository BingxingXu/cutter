import React, { useState } from 'react'
import {
    ListItemIcon, ListItemText, ListItem,
    List, Button, Collapse, createStyles, makeStyles, Theme,
} from '@material-ui/core'
import {
    FolderOpen, ExpandMore, ExpandLess, ExpandMoreOutlined,
    ChevronRightOutlined,
} from '@material-ui/icons'
import { TreeItem, TreeView } from '@material-ui/lab'

import { IFileType } from '../../util/file'

interface IProps {
    files: IFileType[]
    onClickEmpty: () => void
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
    }))
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
const Page: React.FC<IProps> = (props) => {
    const [collapse1, setCollapse1] = useState(true)
    const { files, onClickEmpty } = props
    const classes = useStyles()
    return (
        <>
            <ListItem button key='1' onClick={() => setCollapse1(!collapse1)}>
                <ListItemIcon>
                    <FolderOpen />
                </ListItemIcon>
                <ListItemText primary='目录' />
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
                        <Button onClick={onClickEmpty}>未选择文件夹</Button>
                    </div>}
            </Collapse>
        </>

    )
}
export default Page
