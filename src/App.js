import React from "react";

// mui components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Pagination from "@mui/material/Pagination";

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
import LoopIcon from "@mui/icons-material/Loop";
import GridViewIcon from "@mui/icons-material/GridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClearIcon from "@mui/icons-material/Clear";

// components
import SharedMenu from "./components/SharedMenu";
import { ArrowForwardIosSharp } from "@mui/icons-material";

// css 
import "./App.css";

function App() {
  const [open, setOpen] = React.useState(false);
  const [openUser, setOpenUser] = React.useState(false);
  const [productViewState, setProductViewState] = React.useState(true);

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

  // filter category accordion
  const [expand, setExpand] = React.useState(true);

  const handleChange = (type) => {
    if (type === 1) {
      setExpand(true);
    } else {
      setExpand(false);
    }
  };

  const [priceRange, setPriceRange] = React.useState([20, 37]);

  const filterPriceRangeHandler = (event, newValue) => {
    setPriceRange(newValue);
  };

  function priceRangeText(value) {
    return `${value}`;
  }

  // pagination
  const [productPerPage, setProductPerPage] = React.useState(12);
  const [page, setPage] = React.useState(1);
  const paginationHandler = (event, value) => {
    setPage(value);
  };

  // product view handler
  const changeProductViewHandler = (type) => {
    console.log("change Product View Handler ::", type);

    if (type === "product-grid") {
      setProductViewState(true);
    } else {
      setProductViewState(false);
    }
  };

  console.log("productViewState ::", productViewState);

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
        <Box
          sx={{
            width: "85%",
            mx: "auto",
            maxWidth: "1500px",
            mt: "-30px",
          }}
        >
          {/* feature products  */}
          <Grid container>
            <Grid
              item
              container
              xs={6}
              sm={8}
              sx={{ backgroundColor: "#2E8CDE" }}
            >
              <Grid item xs={6} sm={4}>
                <Typography>New</Typography>
                <Typography>New</Typography>
                <Typography>New</Typography>
                <Button>More</Button>
              </Grid>
              <Grid item xs={6} sm={8}>
                image
              </Grid>
            </Grid>

            <Grid
              item
              container
              xs={6}
              sm={4}
              sx={{ backgroundColor: "#6A61E8" }}
            >
              <Grid item xs={6}>
                <Typography>New</Typography>
                <Typography>good shirt</Typography>
                <Typography>Apollo brand shirt</Typography>
                <Button variant="contained">More</Button>
              </Grid>
              <Grid item container xs={6}>
                image
              </Grid>
            </Grid>
          </Grid>

          {/* different options sections   */}
          <Grid container>
            <Grid
              item
              xs={3}
              sx={{
                border: "1px solid salmon",
                display: "flex",
                alignItems: "center",
                py: "10px",
              }}
            >
              <Typography sx={{ flexGrow: 1 }}>Filter</Typography>
              <Typography sx={{ px: "20px" }}>
                <LoopIcon />
              </Typography>
            </Grid>

            <Grid
              item
              xs={3}
              sx={{ border: "1px solid palegreen", py: "10px" }}
            >
              <Box
                sx={{
                  px: "10px",
                  display: "flex",
                  alignItems: "center",

                  flexGrow: 1,
                }}
              >
                <Typography sx={{ px: "10px", flexGrow: 1 }}>
                  Short By Price
                </Typography>
                <IconButton aria-label="short price">
                  <ArrowDropDownIcon />
                </IconButton>
              </Box>
            </Grid>

            <Grid
              item
              xs={3}
              sx={{ border: "1px solid palegreen", py: "10px" }}
            >
              <Box
                sx={{
                  px: "10px",
                  display: "flex",
                  alignItems: "center",

                  flexGrow: 1,
                }}
              >
                <Typography sx={{ px: "10px", flexGrow: 1 }}>
                  Show : 12
                </Typography>
                <IconButton aria-label="short price">
                  <ArrowDropDownIcon />
                </IconButton>
              </Box>
            </Grid>

            <Grid
              item
              xs={3}
              sx={{
                border: "1px solid palegreen",
                py: "10px",
                display: " flex",
              }}
            >
              <Box sx={{ px: "10px" }}>
                <GridViewIcon
                  onClick={() => changeProductViewHandler("product-grid")}
                />
              </Box>

              <Divider orientation="vertical" variant="middle" flexItem />

              <Box sx={{ px: "10px" }}>
                <FormatListBulletedIcon
                  onClick={() => changeProductViewHandler("product-list")}
                />
              </Box>

              <Divider orientation="vertical" variant="middle" flexItem />

              <Box
                sx={{
                  px: "10px",
                  display: "flex",
                  alignItems: "center",
                  flexGrow: 1,
                }}
              >
                <Typography sx={{ px: "10px", flexGrow: 1 }}>
                  Compare{" "}
                </Typography>
                <Typography
                  component="span"
                  sx={{ p: "5px", backgroundColor: "primary" }}
                >
                  3
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* filter and main products   */}
          <Grid container>
            <Grid
              item
              xs={12}
              sm={3}
              sx={{ border: "1px solid salmon" }}
            >
              {/* category filter  */}
              <Box sx={{ borderBottom: "2px solid blue" }}>
                <Accordion expanded={expand}>
                  <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    expandIcon={
                      <ExpandMoreIcon
                        sx={{
                          fontSize: "25px",
                        }}
                        onClick={() => handleChange(1)}
                      />
                    }
                    sx={{
                      flexDirection: "row-reverse",
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Typography sx={{ flexGrow: 1 }}>Category </Typography>
                    {expand && (
                      <ClearIcon
                        sx={{
                          fontSize: "25px",
                        }}
                        onClick={() => handleChange(2)}
                      />
                    )}
                  </AccordionSummary>

                  <AccordionDetails
                    sx={{ backgroundColor: "lightgray", p: "0px" }}
                  >
                    <List>
                      <ListItem>
                        <ListItemText
                          primary={
                            <Box sx={{ display: "flex" }}>
                              <Typography sx={{ flexGrow: 1 }}>
                                Shirt
                              </Typography>
                              <Typography component="span">5</Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={
                            <Box sx={{ display: "flex" }}>
                              <Typography sx={{ flexGrow: 1 }}>
                                T-Shirt
                              </Typography>
                              <Typography component="span">7</Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={
                            <Box sx={{ display: "flex" }}>
                              <Typography sx={{ flexGrow: 1 }}>Pant</Typography>
                              <Typography component="span">25</Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                    </List>
                  </AccordionDetails>
                </Accordion>
              </Box>

              {/* price filter  */}
              {/* input price  */}
              <Box sx={{ padding: "20px" }}>
                <Stack
                  component="form"
                  sx={{
                    width: "25ch",
                  }}
                  direction="row"
                  spacing={2}
                  autoComplete="off"
                >
                  <TextField
                    hiddenLabel
                    id="filled-hidden-label-small"
                    // defaultValue="0"
                    size="small"
                    placeholder="low price"
                    sx={{
                      [`& fieldset`]: {
                        borderRadius: 20,
                      },
                    }}
                  />
                  <TextField
                    hiddenLabel
                    id="filled-hidden-label-normal"
                    // defaultValue="1"
                    size="small"
                    placeholder="high price"
                    sx={{
                      [`& fieldset`]: {
                        borderRadius: 20,
                      },
                    }}
                  />
                </Stack>
                <Stack sx={{ mt: "30px" }}>
                  <Slider
                    getAriaLabel={() => "Price range"}
                    value={priceRange}
                    onChange={filterPriceRangeHandler}
                    valueLabelDisplay="auto"
                    getAriaValueText={priceRangeText}
                  />
                </Stack>
              </Box>

              {/* range price  */}
              <Box></Box>
            </Grid>

            {/* products container  */}
            <Grid
              item
              container
              xs={12}
              sm={9}
              sx={{ border: "1px solid palegreen" }}
            >
              <Grid
                item
                xs={productViewState ? 4 : 12}
                sx={{ border: "1px solid salmon", minHeight: "250px" }}
              >
                product 1
              </Grid>
              <Grid
                item
                xs={productViewState ? 4 : 12}
                sx={{ border: "1px solid palegreen", minHeight: "250px" }}
              >
                product 2
              </Grid>
              <Grid
                item
                xs={productViewState ? 4 : 12}
                sx={{ border: "1px solid salmon", minHeight: "250px" }}
              >
                product 3
              </Grid>
              <Grid
                item
                xs={productViewState ? 4 : 12}
                sx={{ border: "1px solid salmon", minHeight: "250px" }}
              >
                product 4
              </Grid>
              <Grid
                item
                xs={productViewState ? 4 : 12}
                sx={{ border: "1px solid salmon", minHeight: "250px" }}
              >
                product 5
              </Grid>
              <Grid
                item
                xs={productViewState ? 4 : 12}
                sx={{ border: "1px solid salmon", minHeight: "250px" }}
              >
                product 6
              </Grid>
            </Grid>
          </Grid>

          {/* pagination options sections   */}
          <Grid container sx={{ border: "1px solid yellow" }}>
            <Grid item xs={3} sx={{ border: "1px solid salmon" }}>
              option 1
            </Grid>

            <Grid item xs={6} sx={{ border: "1px solid palegreen" }}>
              <Stack spacing={2} sx={{ py: "10px" }}>
                <Pagination
                  count={Math.ceil(100 / productPerPage)}
                  page={page}
                  onChange={paginationHandler}
                  variant="outlined"
                  shape="rounded"
                />
              </Stack>
            </Grid>
            <Grid item xs={3} sx={{ border: "1px solid palegreen" }}>
              option 3
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
