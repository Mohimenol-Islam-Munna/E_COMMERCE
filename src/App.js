import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

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

// custom hooks for data fetching
import useAllProducts from "./fetchData/useAllProducts";
import useAllCategory from "./fetchData/useAllCategory";

// baseUrl
import { baseUrl } from "./fetchData/baseUrl";

// css
import "./App.css";

const App = () => {
  const [open, setOpen] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [openCount, setOpenCount] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const [mainProductState, setMainProductState] = useState(null);
  const [productViewState, setProductViewState] = useState(true);
  const [maxPriceProduct, setMaxPriceProduct] = useState(null);
  const [minPriceProduct, setMinPriceProduct] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [lowPrice, setLowPrice] = useState(0);
  const [highPrice, setHighPrice] = useState(0);
  const [selectShowProduct] = useState([3, 6, 9, 12, 15, 18, 21, 24, 27, 30]);

  const [perCategoryProductsLoading, setPerCategoryProductsLoading] =
    useState(false);
  const [perCategoryProducts, setPerCategoryProducts] = useState(null);
  const [perCategoryProductsError, setPerCategoryProductsError] =
    useState(false);

  const [categoryName, setCategoryName] = useState("all");

  const anchorRef = useRef(null);
  const anchorRefUser = useRef(null);
  const anchorRefCount = useRef(null);
  const anchorRefSort = useRef(null);
  const anchorRefShowProductCount = useRef(null);

  // fetch all products
  const { allProductsLoading, allProducts, allProductsError } =
    useAllProducts();

  // fetch all category
  const { allCategoryLoading, allCategory, allCategoryError } =
    useAllCategory();

  // product per category handler
  const perCategoryProductsHandler = async (name) => {
    setPerCategoryProductsLoading(true);

    try {
      let res = await axios.get(`${baseUrl}/products/category/${name}`);
      setPerCategoryProducts(res);
      setMainProductState(res);
      setCategoryName(name);
    } catch (err) {
      setPerCategoryProductsError(true);
    } finally {
      setPerCategoryProductsLoading(false);
    }
  };

  // update main product state
  useEffect(() => {
    if (allProducts?.data?.length > 0) {
      // get minimum  price product
      let min = allProducts?.data?.reduce((prev, next) =>
        prev.price < next.price ? prev : next
      );

      // get maximum price product
      let max = allProducts?.data?.reduce((prev, next) =>
        prev.price > next.price ? prev : next
      );

      setMinPriceProduct((prevData) => {
        return min;
      });

      setMaxPriceProduct((prevData) => {
        return max;
      });

      setMainProductState(allProducts);

      if (min?.price && max?.price) {
        setPriceRange((prevData) => {
          return [Math.floor(min?.price), Math.ceil(max?.price)];
        });
        setLowPrice(Math.floor(min?.price));
        setHighPrice(Math.ceil(max?.price));
      }
    }
  }, [allProducts]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleToggleUser = () => {
    setOpenUser((prevOpenUser) => !prevOpenUser);
  };

  const handleToggleCount = () => {
    setOpenCount((prevOpenCount) => !prevOpenCount);
  };

  const handleToggleSort = () => {
    setOpenSort((prevOpenSort) => !prevOpenSort);
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

  const handleCloseCount = (event) => {
    if (
      anchorRefCount.current &&
      anchorRefCount.current.contains(event.target)
    ) {
      return;
    }

    setOpenCount(false);
  };

  const handleCloseSort = (event) => {
    if (anchorRefSort.current && anchorRefSort.current.contains(event.target)) {
      return;
    }

    setOpenSort(false);
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

  function handleListKeyDownCount(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenCount(false);
    } else if (event.key === "Escape") {
      setOpenCount(false);
    }
  }

  function handleListKeyDownSort(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenSort(false);
    } else if (event.key === "Escape") {
      setOpenSort(false);
    }
  }

  // product sort menu handler
  const productSortHandler = async (value) => {
    console.log("productSortHandler ::", value);

    if (value === "Desc") {
      try {
        let res = await axios.get(`${baseUrl}/products?sort=desc`);
        setMainProductState(res);
      } catch (err) {
        console.log("productSortHandler :error:", err);
      } finally {
        console.log("productSortHandler :finally:");
      }
    } else {
      setMainProductState(allProducts);
    }
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  const prevOpenUser = useRef(openUser);
  const prevOpenCount = useRef(openCount);
  const prevOpenSort = useRef(openSort);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    if (prevOpenUser.current === true && open === false) {
      anchorRefUser.current.focus();
    }

    prevOpenUser.current = openUser;
  }, [setOpenUser]);

  useEffect(() => {
    if (prevOpenCount.current === true && open === false) {
      anchorRefCount.current.focus();
    }

    prevOpenCount.current = openCount;
  }, [setOpenCount]);

  useEffect(() => {
    if (prevOpenSort.current === true && open === false) {
      anchorRefUser.current.focus();
    }

    prevOpenSort.current = openSort;
  }, [setOpenSort]);

  // filter category accordion
  const [expand, setExpand] = useState(true);

  const handleChange = (type) => {
    if (type === 1) {
      setExpand(true);
    } else {
      setExpand(false);
    }
  };

  // filter price range
  function priceRangeText(value) {
    return `${value}`;
  }

  // product price range handler
  const productsPriceRangeHandler = (event, newValue) => {
    setMainProductState((prevState) => {
      return {
        data: allProducts?.data?.filter(
          (product) =>
            product.price >= newValue[0] && product.price <= newValue[1]
        ),
      };
    });
    setPriceRange(newValue);
  };

  // pagination
  const [productPerPage, setProductPerPage] = useState(6);
  const [productStartIndex, setproductStartIndex] = useState(0);

  const [page, setPage] = useState(1);
  const paginationHandler = (event, value) => {
    setPage(value);
    setproductStartIndex((value - 1) * productPerPage);
  };

  // product view handler
  const changeProductViewHandler = (type) => {
    if (type === "product-grid") {
      setProductViewState(true);
    } else {
      setProductViewState(false);
    }
  };

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
            aria-controls={openUser ? "composition-menu" : undefined}
            aria-expanded={openUser ? "true" : undefined}
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
      <Box>
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
          <Box
            sx={{
              width: "85%",
              mx: "auto",
              maxWidth: "1500px",
              textAlign: "left",
              textTransform: "capitalize",
            }}
          >
            <Typography component="p">
              Category Name : {categoryName}
            </Typography>
          </Box>
        </Box>

        {/* product  */}
        <Box
          sx={{
            width: "85%",
            mx: "auto",
            maxWidth: "1500px",
            my: "-30px",
          }}
        >
          {allProductsLoading ? (
            <Typography sx={{ textAlign: "center", mt: "40px" }}>
              {" "}
              loading ...
            </Typography>
          ) : allProducts && !allProductsError ? (
            allProducts?.data?.length > 0 ? (
              <>
                {/* feature products  */}
                <Grid container>
                  <Grid
                    item
                    xs={6}
                    sm={8}
                    container
                    alignItems="center"
                    sx={{
                      backgroundColor: "#2E8CDE",
                      height: "250px",
                      p: "20px",
                    }}
                  >
                    <Grid item xs={6} sm={5}>
                      <Typography>New</Typography>
                      <Typography>New</Typography>
                      <Typography>New</Typography>
                      <Button>More</Button>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sm={7}
                      sx={{
                        width: "100%",
                        height: "200px",
                      }}
                    >
                      <img
                        src={maxPriceProduct?.image}
                        alt={maxPriceProduct?.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    container
                    xs={6}
                    sm={4}
                    sx={{
                      backgroundColor: "#6A61E8",
                      height: "250px",
                      p: "20px",
                    }}
                  >
                    <Grid item xs={6}>
                      <Typography>New</Typography>
                      <Typography>good shirt</Typography>
                      <Typography>Apollo brand shirt</Typography>
                      <Button variant="contained">More</Button>
                    </Grid>
                    <Grid
                      item
                      container
                      xs={6}
                      sx={{
                        width: "100%",
                        height: "200px",
                      }}
                    >
                      <img
                        src={minPriceProduct?.image}
                        alt={minPriceProduct?.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
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
                      <IconButton
                        aria-label="short price"
                        ref={anchorRefSort}
                        id="composition-button-sort"
                        aria-controls={
                          openSort ? "composition-menu" : undefined
                        }
                        aria-expanded={openSort ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={handleToggleSort}
                      >
                        <ArrowDropDownIcon />
                      </IconButton>
                      <SharedMenu
                        items={["Asc", "Desc"]}
                        open={openSort}
                        anchorRef={anchorRefSort}
                        handleClose={handleCloseSort}
                        handleListKeyDown={handleListKeyDownSort}
                        menuItemClickHandler={productSortHandler}
                      />
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
                        Show Max : {productPerPage}
                      </Typography>
                      <IconButton
                        aria-label="show maximum product"
                        ref={anchorRefCount}
                        id="composition-button-count"
                        aria-controls={
                          openCount ? "composition-menu" : undefined
                        }
                        aria-expanded={openCount ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={handleToggleCount}
                      >
                        <ArrowDropDownIcon />
                      </IconButton>

                      <SharedMenu
                        items={selectShowProduct}
                        open={openCount}
                        anchorRef={anchorRefCount}
                        handleClose={handleCloseCount}
                        handleListKeyDown={handleListKeyDownCount}
                        menuItemClickHandler={(value) => {
                          setProductPerPage(value);
                        }}
                      />
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
                  {/* filter  */}
                  <Grid item xs={12} sm={3} sx={{ border: "1px solid salmon" }}>
                    {/* category filter  */}
                    <Box sx={{ borderBottom: "20px solid blue" }}>
                      {allCategoryLoading ? (
                        <Typography>Loading ...</Typography>
                      ) : allCategory && !allCategoryError ? (
                        allCategory?.data?.length > 0 ? (
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
                              <Typography sx={{ flexGrow: 1 }}>
                                Category{" "}
                              </Typography>
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
                                {allCategory?.data?.map((category, index) => (
                                  <ListItem
                                    key={index}
                                    onClick={() =>
                                      perCategoryProductsHandler(category)
                                    }
                                  >
                                    <ListItemText
                                      key={index}
                                      primary={
                                        <Box sx={{ display: "flex" }}>
                                          <Typography
                                            sx={{
                                              flexGrow: 1,
                                              textTransform: "capitalize",
                                            }}
                                          >
                                            {category}
                                          </Typography>
                                          <Typography component="span">
                                            5
                                          </Typography>
                                        </Box>
                                      }
                                    />
                                  </ListItem>
                                ))}
                              </List>
                            </AccordionDetails>
                          </Accordion>
                        ) : (
                          <Typography> No category found </Typography>
                        )
                      ) : (
                        <Typography> somethings wrong </Typography>
                      )}
                    </Box>

                    {/* price filter  */}
                    <Box sx={{ padding: "20px" }}>
                      {/* input price  */}
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
                          type="number"
                          value={lowPrice}
                          size="small"
                          onChange={(e) => {
                            setMainProductState((prevState) => {
                              if (e.target.value.length > 0) {
                                return {
                                  data: allProducts?.data?.filter(
                                    (product) => product.price >= e.target.value
                                  ),
                                };
                              } else {
                                return allProducts;
                              }
                            });
                            setLowPrice(e.target.value);
                          }}
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
                          type="number"
                          value={highPrice}
                          size="small"
                          placeholder="high price"
                          onChange={(e) => {
                            setMainProductState((prevState) => {
                              if (e.target.value.length > 0) {
                                return {
                                  data: allProducts?.data?.filter(
                                    (product) => product.price <= e.target.value
                                  ),
                                };
                              } else {
                                return allProducts;
                              }
                            });
                            setHighPrice(e.target.value);
                          }}
                          sx={{
                            [`& fieldset`]: {
                              borderRadius: 20,
                            },
                          }}
                        />
                      </Stack>

                      {/* range price  */}
                      <Stack sx={{ mt: "30px" }}>
                        <Slider
                          getAriaLabel={() => "Price range"}
                          value={priceRange}
                          min={0}
                          max={1600}
                          onChange={productsPriceRangeHandler}
                          valueLabelDisplay="auto"
                          getAriaValueText={priceRangeText}
                        />
                      </Stack>
                    </Box>
                  </Grid>

                  {/* products container  */}
                  <Grid item alignSelf="start" container xs={12} sm={9}>
                    {mainProductState?.data
                      ?.slice(
                        productStartIndex,
                        productStartIndex + productPerPage
                      )
                      ?.map((product) => (
                        <Grid
                          item
                          key={product?.id}
                          xs={productViewState ? 4 : 12}
                          sx={{
                            border: "1px solid lightgray",
                            minHeight: "300px",
                          }}
                        >
                          <Box
                            sx={{
                              width: "100%",
                              overflow: "hidden",
                              height: "250px",
                              p: "5px",
                            }}
                          >
                            <img
                              src={`${product?.image}`}
                              alt={`${product?.title}`}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                              }}
                            />
                          </Box>
                          <Box
                            sx={{
                              textAlign: "center",
                              py: "5px",
                            }}
                          >
                            <Typography variant="caption">
                              {product?.title}
                            </Typography>
                            <Typography>$ {product?.price}</Typography>
                          </Box>
                        </Grid>
                      ))}
                  </Grid>
                </Grid>

                {/* pagination options sections   */}
                <Grid container sx={{ border: "1px solid yellow" }}>
                  <Grid
                    item
                    xs={3}
                    sx={{
                      border: "1px solid salmon",
                      backgroundColor: "white",
                    }}
                  >
                    option 1
                  </Grid>

                  <Grid
                    item
                    xs={6}
                    sx={{
                      border: "1px solid palegreen",
                      backgroundColor: "white",
                    }}
                  >
                    <Stack spacing={2} sx={{ py: "10px" }}>
                      <Pagination
                        count={
                          mainProductState?.data
                            ? Math.ceil(
                                mainProductState?.data?.length / productPerPage
                              )
                            : 0
                        }
                        page={page}
                        onChange={paginationHandler}
                        variant="outlined"
                        shape="rounded"
                      />
                    </Stack>
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    sx={{
                      border: "1px solid palegreen",
                      backgroundColor: "white",
                    }}
                  >
                    option 3
                  </Grid>
                </Grid>
              </>
            ) : (
              <Typography sx={{ textAlign: "center", mt: "40px" }}>
                {" "}
                no products found
              </Typography>
            )
          ) : (
            <Typography sx={{ textAlign: "center", mt: "40px" }}>
              somethings wrong
            </Typography>
          )}
        </Box>

        {/* news letter  */}
        <Box
          sx={{
            py: "1px",
            backgroundColor: "lightgray",
          }}
        >
          <Box
            sx={{
              width: "85%",
              mx: "auto",
              mt: "50px",
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
};

export default App;
