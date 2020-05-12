import React, { useState } from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { Movie, ExpandLess, ExpandMore } from '@material-ui/icons'

import { IFileType } from '../../util/file'

interface IProps {
    files: IFileType[]
}
const Page: React.FC<IProps> = (props) => {
    const [collapse2, setCollapse2] = useState(false)
    return (
        <ListItem button key='2' onClick={() => setCollapse2(!collapse2)}>
            <ListItemIcon>
                <Movie />
            </ListItemIcon>
            <ListItemText primary='视频编辑' />
            {collapse2 ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
    )
}

export default Page
