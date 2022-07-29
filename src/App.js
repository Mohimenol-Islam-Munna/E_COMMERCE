import React from "react";
import "./App.css";

// mui components
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

// icons
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

// components
import SharedMenu from "./components/SharedMenu";

function App() {
  const [open, setOpen] = React.useState(false);
  const [openUser, setOpenUser] = React.useState(false);

  const anchorRef = React.useRef(null);
  const anchorRefUser = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleToggleUser = () => {
    setOpenUser((prevOpenUser) => !prevOpenUser);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  const handleCloseUser = (event) => {
    if (anchorRefUser.current && anchorRefUser.current.contains(event.target)) {
      return;
    }

    setOpenUser(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  function handleListKeyDownUser(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenUser(false);
    } else if (event.key === "Escape") {
      setOpenUser(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  const prevOpenUser = React.useRef(openUser);

  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  React.useEffect(() => {
    if (prevOpenUser.current === true && open === false) {
      anchorRefUser.current.focus();
    }

    prevOpenUser.current = open;
  }, [setOpenUser]);

  return (
    <>
      {/* header  */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#3853D8",
          px: "10px",
          boxShadow: "0px 4px 0.07px black",
          zIndex: "9999",
        }}
      >
        <Box sx={{ p: "15px" }}>
          <SearchIcon sx={{ color: "white" }} />
        </Box>

        <Divider orientation="vertical" variant="middle" flexItem />

        <Box sx={{ p: "15px" }}>
          <Box>
            <MenuIcon
              sx={{ color: "white" }}
              ref={anchorRef}
              id="composition-button"
              aria-controls={open ? "composition-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            />

            <SharedMenu
              items={["Shirt", "Pant", "T-Shirt", "Panjabi"]}
              open={open}
              anchorRef={anchorRef}
              handleClose={handleClose}
              handleListKeyDown={handleListKeyDown}
            />
          </Box>
        </Box>

        <Divider orientation="vertical" variant="middle" flexItem />

        <Box sx={{ flexGrow: 1, p: "15px", textAlign: "center" }}>
          <Typography sx={{ color: "white" }}>AAE Ideapro</Typography>
        </Box>

        <Divider orientation="vertical" variant="middle" flexItem />

        <Box sx={{ p: "15px" }}>
          <PersonOutlineIcon
            sx={{ color: "white" }}
            ref={anchorRefUser}
            id="composition-button-user"
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleToggleUser}
          />
          <SharedMenu
            items={["login", "logout"]}
            open={openUser}
            anchorRef={anchorRefUser}
            handleClose={handleCloseUser}
            handleListKeyDown={handleListKeyDownUser}
          />
        </Box>

        <Divider orientation="vertical" variant="middle" flexItem />

        <Box sx={{ p: "15px" }}>
          <FavoriteBorderIcon sx={{ color: "white" }} />
        </Box>

        <Divider orientation="vertical" variant="middle" flexItem />

        <Box sx={{ p: "15px" }}>
          <Badge badgeContent={4} color="primary">
            <AddShoppingCartIcon sx={{ color: "white" }} />
          </Badge>
        </Box>
      </Box>
      {/* main  */}
      <Box sx={{}}>
        {/* category title  */}
        <Box
          sx={{
            border: "1px solid white",
            height: "150px",
            backgroundColor: "#3853D8",
            display: "flex",
            color: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography component="p">
              Category Name Men's Life Style
            </Typography>
            <Typography>
              Category &gt; Name Men's &gt; Life &gt; Style
            </Typography>
          </Box>
        </Box>

        {/* product  */}
        <Box sx={{ width: "85%", mx: "auto", maxWidth: "1500px" }}>
          {/* feature products  */}
          <Grid container>
            <Grid item xs={6} sm={8} sx={{ border: "1px solid salmon" }}>
              main 1
            </Grid>
            <Grid item xs={6} sm={4} sx={{ border: "1px solid palegreen" }}>
              main 2
            </Grid>
          </Grid>

          {/* different options sections   */}
          <Grid container sx={{ border: "1px solid yellow" }}>
            <Grid item xs={4} sx={{ border: "1px solid salmon" }}>
              option 1
            </Grid>
            <Grid item xs={4} sx={{ border: "1px solid palegreen" }}>
              option 2
            </Grid>
            <Grid item xs={4} sx={{ border: "1px solid palegreen" }}>
              option 3
            </Grid>
            <Grid item xs={4} sx={{ border: "1px solid palegreen" }}>
              option 4
            </Grid>
          </Grid>

          {/* filter and main products   */}
          <Grid container>
            <Grid item xs={12} sm={4} sx={{ border: "1px solid salmon" }}>
              filter
            </Grid>
            <Grid
              item
              container
              xs={12}
              sm={8}
              sx={{ border: "1px solid palegreen" }}
            >
              <Grid item xs={4} sx={{ border: "1px solid salmon" }}>
                product 1
              </Grid>
              <Grid item xs={4} sx={{ border: "1px solid white" }}>
                product 2
              </Grid>
              <Grid item xs={4} sx={{ border: "1px solid salmon" }}>
                product 3
              </Grid>
              <Grid item xs={4} sx={{ border: "1px solid white" }}>
                product 4
              </Grid>
            </Grid>
          </Grid>

          {/* pagination options sections   */}
          <Grid container sx={{ border: "1px solid yellow" }}>
            <Grid item xs={4} sx={{ border: "1px solid salmon" }}>
              option 1
            </Grid>
            <Grid item xs={4} sx={{ border: "1px solid palegreen" }}>
              option 2
            </Grid>
            <Grid item xs={4} sx={{ border: "1px solid palegreen" }}>
              option 3
            </Grid>
            <Grid item xs={4} sx={{ border: "1px solid palegreen" }}>
              option 4
            </Grid>
          </Grid>
        </Box>

        {/* news letter  */}
        <Box sx={{ backgroundColor: "lightgray" }}>
          <Box
            sx={{
              width: "85%",
              mx: "auto",
              maxWidth: "1500px",
              textAlign: "center",
              padding: "30px 10px",
            }}
          >
            <Typography variant="h5">Subsribe to our newsletter</Typography>
            <Typography sx={{ width: "50%", mx: "auto", mt: "10px" }}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Molestias quam minima eius velit laudantium suscipit, corporis
            </Typography>
            <OutlinedInput />
          </Box>
        </Box>
      </Box>{" "}
      {/* footer  */}
      <Box>
        <Grid container sx={{ border: "1px solid green" }}>
          <Grid item xs={5} sx={{ border: "1px solid salmon" }}>
            <Typography variant="h5">Subsribe to our newsletter</Typography>
            <Typography sx={{ mt: "10px" }}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Molestias quam minima eius velit laudantium suscipit, corporis
            </Typography>
          </Grid>
          <Grid item xs={2} sx={{ border: "1px solid palegreen" }}>
            <List>
              <ListItem>
                <ListItemText
                  primary="Single-line item"
                  secondary="secondary text"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Single-line item 2  "
                  secondary="secondary text"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Single-line item 3"
                  secondary="secondary text"
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={2} sx={{ border: "1px solid palegreen" }}>
            <List>
              <ListItem>
                <ListItemText
                  primary="Single-line item"
                  secondary="secondary text"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Single-line item 2  "
                  secondary="secondary text"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Single-line item 3"
                  secondary="secondary text"
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={3} sx={{ border: "1px solid palegreen" }}>
            <Stack direction="row" spacing={1}>
              <IconButton aria-label="facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="twiter" disabled color="primary">
                <TwitterIcon />
              </IconButton>
              <IconButton color="secondary" aria-label="linkend">
                <LinkedInIcon />
              </IconButton>
              <IconButton color="primary" aria-label="instagram">
                <InstagramIcon />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default App;
