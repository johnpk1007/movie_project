import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import YourReviews from "./YourReviews/YourReviews";
import { Grid } from "@mui/material";
import DeleteAccount from "./DeleteAccount/DeleteAccount";
import NewIdPassword from "./NewIdPassword/NewIdPassword";

import { useParams } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Grid
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      item
      xs
    >
      {value === index && (
        <Box
          sx={{
            p: 3,
          }}
        >
          {children}
        </Box>
      )}
    </Grid>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function Profile() {
  const [value, setValue] = useState(0);
  const [movieLogin, setMovieLogin] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { lang } = useParams();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("profile")).result.src === "local") {
      setMovieLogin(true);
    }
  }, []);

  return (
    <Box
      sx={{
        // flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        direction: "row",
        justifyContent: "flex-start",
        height: 200,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: "white",
          // minWidth: 150,
          width: { xs: 90, sm: 150 },
        }}
      >
        <Tab label={lang === "en" ? "Review" : "리뷰"} {...a11yProps(0)} />
        {movieLogin ? (
          <Tab
            label={lang === "en" ? "Change Password" : "비밀번호 변경"}
            {...a11yProps(1)}
          />
        ) : null}
        <Tab
          label={lang === "en" ? "Delete your account" : "계정 삭제"}
          {...a11yProps(movieLogin ? 2 : 1)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <YourReviews />
      </TabPanel>
      {movieLogin ? (
        <TabPanel value={value} index={1}>
          <NewIdPassword />
        </TabPanel>
      ) : null}
      <TabPanel value={value} index={movieLogin ? 2 : 1}>
        <DeleteAccount />
      </TabPanel>
    </Box>
  );
}
