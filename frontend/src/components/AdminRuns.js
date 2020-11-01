import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import { listRuns } from "../actions/runActions";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

const AdminRuns = () => {
  const runList = useSelector((state) => state.runList);
  const { runs } = runList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listRuns());
  }, [dispatch]);
  console.log(runs);
  return (
    <>
      <Container>
        <Typography>ALL RUNS</Typography>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </Paper>
      </Container>
    </>
  );
};

export default AdminRuns;
