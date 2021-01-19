import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
const useStyles = makeStyles(({ palette }: Theme) => ({
}))

interface PostsProps {

}

 const Posts: React.FC<PostsProps> = ({}) => {
        return (
            <>
                <Typography variant="h1">All Posts</Typography>
            </>
        );
}

export default Posts