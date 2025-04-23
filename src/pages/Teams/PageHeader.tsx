import { Typography, Button, Grid, useTheme, TextField } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import PropTypes from 'prop-types';

function PageHeader() {
  const theme = useTheme();

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography
          variant="h3"
          component="h3"
          gutterBottom
          sx={{
            [theme.breakpoints.down('sm')]: {
              fontSize: '22px'
            }
          }}
        >
          All teams
        </Typography>
      </Grid>
      <Grid item sx={{ gap: '8px', display: 'flex' }}>
        {/* <TextField id="outlined-search" label="Search" type="text" sx={{}} /> */}
        {/* <Button
          sx={{
            mt: { xs: 2, md: 0 },
            [theme.breakpoints.down('sm')]: {
              fontSize: '12px',
              paddingLeft: '12px',
              paddingRight: '12px'
            }
          }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={() => {}}
        >
          Create allergen
        </Button> */}
      </Grid>
    </Grid>
  );
}

PageHeader.propTypes = {};

export default PageHeader;
