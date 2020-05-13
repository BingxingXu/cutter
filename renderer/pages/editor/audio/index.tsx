import React from 'react';
import { Button } from '@material-ui/core';

import { extractAudio, speach2Text } from '../../../util/video';
interface IProps { }

const Page: React.FC<IProps> = (props) => {
    const onExtractAudio = () => {
        extractAudio('/Users/xubingxing/Desktop/minx/cut/a.mp4',
            '/Users/xubingxing/Desktop/minx/cut')
    }
    const onSTT = () => {
        speach2Text('/Users/xubingxing/Desktop/minx/cut/output.pcm')
    }

    return (
        <>
            <Button onClick={onExtractAudio}>Video to Audio</Button>
            <Button onClick={onSTT}>Speach To Text</Button>
        </>
    )
}

export default Page
