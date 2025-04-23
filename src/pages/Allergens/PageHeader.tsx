import { Typography, Button, Grid, useTheme, TextField } from "@mui/material";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import PropTypes from "prop-types";

function PageHeader({
  handleOpenCreateModal,
  setTargetItem,
  setSearch,
  search
}) {
  const theme = useTheme();

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography
          variant="h3"
          component="h3"
          gutterBottom
          sx={{
            [theme.breakpoints.down("sm")]: {
              fontSize: "22px"
            }
          }}
        >
          All allergens
        </Typography>
      </Grid>
      <Grid item sx={{ gap: "8px", display: "flex" }}>
        <TextField
          id="outlined-search"
          label="Search"
          type="text"
          sx={{}}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <Button
          sx={{
            mt: { xs: 2, md: 0 },
            [theme.breakpoints.down("sm")]: {
              fontSize: "12px",
              paddingLeft: "12px",
              paddingRight: "12px"
            }
          }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={() => {
            setTargetItem(null);
            handleOpenCreateModal();
          }}
        >
          Create allergen
        </Button>
      </Grid>
    </Grid>
  );
}

PageHeader.propTypes = {
  handleOpenCreateModal: PropTypes.func.isRequired,
  setTargetItem: PropTypes.func.isRequired,
  setSearch: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired
};

export default PageHeader;
