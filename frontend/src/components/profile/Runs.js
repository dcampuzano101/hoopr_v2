import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import Typography from "@material-ui/core/Typography";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import runs from "../../assets/runs.js";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));
const Runs = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Past Runs
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Capacity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {runs.map((run) => (
              <>
                <TableCell>{run.location}</TableCell>
              </>
            ))}
          </TableRow>
        </TableBody>
      </Table>

      <div className={classes.seeMore}>
        <Link color="primary" href="#">
          See more Runs
        </Link>
      </div>
    </React.Fragment>
  );
};
export default Runs;
