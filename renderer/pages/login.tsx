import React, { useState } from 'react'
import { TextField, Button, Checkbox, StylesProvider } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useRouter } from 'next/router'

interface IProps { }
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            width: '100vw',
            height: '100vh'
        }
    }))
const Login: React.FC<IProps> = props => {
    const router = useRouter()
    const classes = useStyles()
    const [remember, setRemember] = useState(true)
    const onSubmit = () => {
        router.push('/editor')
    }
    return (
        <div className={classes.root}>
            <form autoComplete='off'>
                <div>
                    <TextField
                        id='username'
                        required
                        label='邮箱或用户名'
                    />
                </div>
                <div>
                    <TextField
                        id='password'
                        required
                        type='password'
                        label='密码'
                    />
                </div>
                <div>
                    <Checkbox
                        color='primary'
                        checked={remember}
                        onChange={() => { setRemember(!remember) }}
                        name='remember'
                    />
                </div>
                <div>
                    <Button onClick={onSubmit} color='primary'>提交</Button>
                </div>
            </form>
        </div>
    )
}

export default Login
