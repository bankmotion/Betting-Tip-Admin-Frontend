import {
  Box,
  Card,
  CircularProgress,
  Divider,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import PropTypes from 'prop-types';
import { ChangeEvent, FC, useState } from 'react';

import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { SERVER_URL } from 'src/config/config';
import { CountryType } from 'src/models/countries';
import { applyPagination } from 'src/utils/utils';
import { useAppSelector } from 'src/app/hooks';

const FlagImage = styled('img')(({ theme }) => ({
  width: 30
}));

const LeaguesTable = () => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  const { leaguesList, loadingGetList } = useAppSelector(
    (state) => state.leagues
  );

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const paginatedLeagues = applyPagination(leaguesList, page, limit);
  const theme = useTheme();

  return (
    <Card>
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>League ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Season</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Logo</TableCell>
              <TableCell>Country</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loadingGetList ? (
              <Box
                component={'tr'}
                sx={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '8px'
                }}
              >
                <Box
                  component={'td'}
                  sx={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '8px',
                    textAlign: 'center'
                  }}
                  colSpan={4}
                >
                  <CircularProgress />
                </Box>
              </Box>
            ) : (
              paginatedLeagues.map((league) => {
                return (
                  <TableRow hover key={league.id}>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {league.id}
                      </Typography>
                    </TableCell>
                    <TableCell>{league.leagueId}</TableCell>
                    <TableCell>{league.name}</TableCell>
                    <TableCell>{league.season}</TableCell>
                    <TableCell>{league.type}</TableCell>
                    <TableCell>
                      {league?.logo && <FlagImage src={`${league.logo}`} />}
                    </TableCell>
                    <TableCell>
                      {league?.country?.flag && (
                        <FlagImage src={`${league.country.flag}`} />
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {/* <Tooltip title="Edit allergen" arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.primary.lighter
                            },
                            color: theme.palette.primary.main
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setTargetItem(country.id);
                            handleOpenCreateModal();
                          }}
                        >
                          <EditTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete allergen" arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.error.lighter
                            },
                            color: theme.palette.error.main
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setTargetItem(country.id);
                            handleOpenDeleteModal();
                          }}
                        >
                          <DeleteTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip> */}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={leaguesList.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

export default LeaguesTable;
