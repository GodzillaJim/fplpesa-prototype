import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useAuth } from "@src/context/Auth";

const Signin = () => {
  const { signInWithGoogle, loading } = useAuth();

  return (
    <Grid
      container
      direction={"row"}
      height={"100vh"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Grid item>
        <Card sx={{ width: 300, p: 2 }}>
          <CardContent>
            <Typography>Sign in</Typography>
          </CardContent>
          <Divider />
          <CardActionArea sx={{ my: 3 }}>
            <Button
              disabled={loading}
              onClick={signInWithGoogle}
              fullWidth
              color={"secondary"}
              variant={"contained"}
            >
              <GoogleIcon />
            </Button>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Signin;
