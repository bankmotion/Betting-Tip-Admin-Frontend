import {
  Badge,
  Box,
  Card,
  Chip,
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
import { MatchStatus } from 'src/const/MatchConst';

const FlagImage = styled('img')(({ theme }) => ({
  width: 20
}));

const MatchesTable = ({
  onOpenOddModal,
  onSetTargetMatchId
}: {
  onOpenOddModal: (open: boolean) => void;
  onSetTargetMatchId: (id: number) => void;
}) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  const dispatch = useAppDispatch();

  const { matchesList, loadingGetList } = useAppSelector(
    (state) => state.matches
  );

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const paginatedMatches = applyPagination(matchesList, page, limit);
  const theme = useTheme();

  return (
    <Card>
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>League</TableCell>
              <TableCell>Home Team</TableCell>
              <TableCell>Away Team</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Match Status</TableCell>
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
              paginatedMatches.map((match) => {
                return (
                  <TableRow hover key={match.id}>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {match.fixtureId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                      >
                        {match.league.logo && (
                          <FlagImage src={`${match.league.logo}`} />
                        )}
                        {match.league.name}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                      >
                        {match.homeTeam.logo && (
                          <FlagImage src={`${match.homeTeam.logo}`} />
                        )}
                        {match.homeTeam.name}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                      >
                        {match.awayTeam.logo && (
                          <FlagImage src={`${match.awayTeam.logo}`} />
                        )}
                        {match.awayTeam.name}
                      </Box>
                    </TableCell>
                    <TableCell>
                      {new Date(match.matchTimestamp * 1000).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Chip
                        color={
                          match.matchStatus === MatchStatus.Upcoming
                            ? 'warning'
                            : match.matchStatus === MatchStatus.Live
                            ? 'success'
                            : 'error'
                        }
                        label={match.matchStatus}
                      />
                    </TableCell>
                    <TableCell>
                      <Tooltip title="See odd details" arrow>
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
                            onOpenOddModal(true);
                            onSetTargetMatchId(match.id);
                          }}
                        >
                          <EditTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      {/* <Tooltip title="Delete allergen" arrow>
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
          count={matchesList.length}
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

export default MatchesTable;
