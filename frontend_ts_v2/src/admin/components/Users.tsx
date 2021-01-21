import React from 'react'
import { Paper, Card, Grid, Typography } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
const useStyles = makeStyles(({ palette }: Theme) => ({
}))
interface UsersProps {

}

 const Users: React.FC<UsersProps> = ({}) => {
        const classes = useStyles();
        return (
            <Typography variant="h1">Users</Typography>
        );
}

export default Users