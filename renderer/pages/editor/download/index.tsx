import React, { useState, ChangeEvent } from 'react'
import { Grid, Button, TextField, makeStyles, createStyles, Theme } from '@material-ui/core'

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
    const [url, setUrl] = useState('')
    const isValidated = () => { }
    const onChangeUrl = (e: ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value.trim())
    }
    return (
        <div className={classes.root}>
            <Grid container spacing={2} >
                <Grid item>
                    <TextField
                        value={url}
                        label='视频地址'
                        onChange={onChangeUrl}
                        placeholder='支持youtube\xx下载'
                    />
                </Grid>
                <Grid item>
                    <Button variant='contained' color='primary'>下载</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default Page
