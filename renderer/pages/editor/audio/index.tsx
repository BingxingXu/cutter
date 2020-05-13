import React from 'react';
import { Button } from '@material-ui/core';

import { extractAudio } from '../../../util/video';
interface IProps { }

const Page: React.FC<IProps> = (props) => {
    const onExtractAudio = () => {
        extractAudio('/Users/xubingxing/Desktop/minx/cut/a.mp4',
            '/Users/xubingxing/Desktop/minx/cut')
    }

    return (
        <Button onClick={onExtractAudio}>Download</Button>
    )
}

export default Page
