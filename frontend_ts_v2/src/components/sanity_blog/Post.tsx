import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
const useStyles = makeStyles(({ palette }: Theme) => ({
}))

interface PostProps {

}

 const Post: React.FC<PostProps> = ({}) => {
        return (
            <>
                <Typography variant="h1">Single Post</Typography>
            </>
        );
}

export default Post