import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
const useStyles = makeStyles(({ palette }: Theme) => ({
    postsWrapper: {
        display: 'grid',
        height: '100vh',
        gridGap: '1rem',
        width: '90%',
        padding: '5%',
        margin: '0 auto',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        position: 'relative',
        zIndex: -5
      },

      post: {
        display: 'grid',
        placeItems: 'center',
        border: '1px solid black',
      },
}))

interface PostsProps {

}
 const Posts: React.FC<PostsProps> = ({}) => {
     const classes = useStyles();
        return (
            <div className={classes.postsWrapper}>
                <div className={classes.post}>1</div>
                <div className={classes.post}>2</div>
                <div className={classes.post}>3</div>
                <div className={classes.post}>4</div>
                <div className={classes.post}>5</div>
                <div className={classes.post}>6</div>
                <div className={classes.post}>7</div>
                <div className={classes.post}>8</div>
            </div>
        );
}

export default Posts