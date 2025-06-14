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
  ToggleButton,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { ChangeEvent, FC, useState } from 'react';

import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { SERVER_URL } from 'src/config/config';
import { CountryType } from 'src/models/countries';
import { applyPagination, toastMsg } from 'src/utils/utils';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import {
  getLeaguesAction,
  updateLeagueDataAction
} from 'src/reducers/leagues.slice';
import { ToastStatus } from 'src/models/basic';

const FlagImage = styled('img')(({ theme }) => ({
  width: 25,
  height: 'auto'
}));

const LeaguesTable = () => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  const dispatch = useAppDispatch();

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

  const handleToggleActive = (leagueId: number) => {
    const league = leaguesList.find((league) => league.id === leagueId);
    if (league) {
      dispatch(
        updateLeagueDataAction({ ...league, isActive: !league.isActive })
      )
        .unwrap()
        .then(() => {
          toastMsg('League updated successfully', ToastStatus.Success);
          dispatch(getLeaguesAction());
        });
    }
  };

  return (
    <Card>
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>League ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Season</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Active</TableCell>
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
                    <TableCell>{league.leagueId}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        {league?.logo && <FlagImage src={`${league.logo}`} />}
                        {league.name}
                      </Box>
                    </TableCell>
                    <TableCell>{league.season}</TableCell>
                    <TableCell>{league.type}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        {league?.country?.flag && (
                          <FlagImage src={`${league.country.flag}`} />
                        )}{' '}
                        {league.country.name}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <ToggleButton
                        sx={{
                          padding: '4px',
                          borderRadius: '4px'
                        }}
                        value="check"
                        selected={league.isActive}
                        onChange={() => handleToggleActive(league.id)}
                      >
                        {league.isActive ? <CheckIcon /> : <CloseIcon />}
                      </ToggleButton>
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
