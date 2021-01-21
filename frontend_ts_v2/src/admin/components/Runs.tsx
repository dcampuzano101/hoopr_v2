import React from 'react'
import { Paper, Card, Grid, Typography } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
const useStyles = makeStyles(({ palette }: Theme) => ({
}))
interface RunsProps {

}

 const Runs: React.FC<RunsProps> = ({}) => {
        const classes = useStyles();
        return (
            <Typography variant="h1">Runs</Typography>
        );
}

export default Runs