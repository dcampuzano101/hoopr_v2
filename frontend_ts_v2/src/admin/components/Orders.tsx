import React from 'react'
import { Paper, Card, Grid, Typography } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
const useStyles = makeStyles(({ palette }: Theme) => ({
}))
interface OrdersProps {

}

 const Orders: React.FC<OrdersProps> = ({}) => {
        const classes = useStyles();
        return (
            <Typography variant="h1">Orders</Typography>
        );
}

export default Orders