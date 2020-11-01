import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { listUsers } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

const AdminUsers = () => {
  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!users) {
      dispatch(listUsers());
    }
  }, [dispatch]);
  console.log(users);
  return (
    <>
      <Container>
        <Typography>ALL USERS</Typography>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>username</TableCell>
                <TableCell>email</TableCell>
                <TableCell>isAdmin</TableCell>

                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </Paper>
      </Container>
    </>
  );
};

export default AdminUsers;
