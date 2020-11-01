import React from "react";
import AdminRuns from "../components/AdminRuns";
import AdminUsers from "../components/AdminUsers";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

const AdminScreen = () => {
  return (
    <>
      <Container>
        <Paper>
          <AdminUsers />
          <AdminRuns />
        </Paper>
      </Container>
    </>
  );
};

export default AdminScreen;
