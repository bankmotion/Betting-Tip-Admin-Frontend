import {
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
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import { ChangeEvent, useState } from 'react';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { MatchStatus } from 'src/const/MatchConst';
import { applyPagination, getRiskLevel } from 'src/utils/utils';
import { BetType } from 'src/const/OddConst';

const FlagImage = styled('img')(({ theme }) => ({
  width: 20
}));

const FilteredTipsTable = ({
  onOpenOddModal,
  onSetTargetMatchId
}: {
  onOpenOddModal: (open: boolean) => void;
  onSetTargetMatchId: (id: number) => void;
}) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  const dispatch = useAppDispatch();

  const { oddsList, loadingGetList, matchesList } = useAppSelector(
    (state) => state.matches
  );

  const { defaultSettings } = useAppSelector((state) => state.tipSetting);

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const getMatchDataByOddId = (oddId: number) => {
    return matchesList.find((match) => {
      return match.odds.find((odd) => {
        return odd.id === oddId;
      });
    });
  };

  const paginatedOdds = applyPagination(oddsList, page, limit);
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
              <TableCell>Tip Type</TableCell>
              <TableCell>Odds</TableCell>
              <TableCell>Prob</TableCell>
              <TableCell>ROI</TableCell>
              <TableCell>EV</TableCell>
              <TableCell>Risk Level</TableCell>
              <TableCell>Filtering</TableCell>
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
              paginatedOdds.map((odd, index) => {
                const matchData = getMatchDataByOddId(odd.id);
                return (
                  <TableRow hover key={odd.id}>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {odd.fixtureId}
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
                        {matchData?.league.logo && (
                          <FlagImage src={`${matchData?.league.logo}`} />
                        )}
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
                        {matchData?.homeTeam.logo && (
                          <FlagImage src={`${matchData?.homeTeam.logo}`} />
                        )}
                        {matchData?.homeTeam.name}
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
                        {matchData?.awayTeam.logo && (
                          <FlagImage src={`${matchData?.awayTeam.logo}`} />
                        )}
                        {matchData?.awayTeam.name}
                      </Box>
                    </TableCell>
                    <TableCell>
                      {BetType[odd.betType].name} (
                      {
                        BetType[odd.betType].subTypes.find(
                          (sub) => sub.subId === odd.betSubType
                        )?.name
                      }
                      )
                    </TableCell>
                    <TableCell>{Math.max(...odd.odds)}</TableCell>
                    <TableCell>{odd.probability}%</TableCell>
                    <TableCell>{odd.roi}%</TableCell>
                    <TableCell>{odd.ev}</TableCell>
                    <TableCell>
                      {getRiskLevel(Math.max(...odd.odds), defaultSettings)}
                    </TableCell>
                    <TableCell>
                      <Chip
                        color={
                          defaultSettings.maxTipsPerDay > page * limit + index
                            ? 'success'
                            : 'error'
                        }
                        label={
                          defaultSettings.maxTipsPerDay > page * limit + index
                            ? 'Available'
                            : 'Not Available'
                        }
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
                            onSetTargetMatchId(matchData?.id);
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
          count={oddsList.length}
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

export default FilteredTipsTable;
