import { Button, Grid } from "@mui/material";
import { useAuth } from "@src/context/Auth";

const Home = () => {
  const { user, signOut } = useAuth();
  return (
    <Grid container height={"100vh"}>
      <Grid item>Hello world, {user && user.email}</Grid>
      <Grid item>
        <Button variant={"contained"} color={"warning"} onClick={signOut}>
          Logout
        </Button>
      </Grid>
    </Grid>
  );
};

export default Home;
