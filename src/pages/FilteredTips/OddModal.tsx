import {
  Box,
  Dialog,
  DialogTitle,
  Divider,
  TableCell,
  TextField,
  styled
} from '@mui/material';
import PropTypes from 'prop-types';

import { useAppSelector } from 'src/app/hooks';
import { BetType } from 'src/const/OddConst';

const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-elevation': {
    padding: '24px 40px',

    [theme.breakpoints.down('sm')]: {
      padding: '24px'
    }
  }
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: '1px solid #ddd',
  padding: 8
}));

function OddModal({
  onClose,
  open,
  itemId
}: {
  onClose: () => void;
  open: boolean;
  itemId: number;
}) {
  const { matchesList } = useAppSelector((state) => state.matches);
  const match = matchesList.find((match) => match.id === itemId);

  return (
    <CustomDialog
      onClose={onClose}
      open={open}
      sx={{ '.MuiDialog-paper': { maxWidth: '800px' } }}
    >
      <DialogTitle
        sx={{
          textAlign: 'center',
          fontSize: '20px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 1
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '4fr 1fr 4fr',
            alignItems: 'center'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1
            }}
          >
            <img
              src={match?.homeTeam.logo}
              alt="home team"
              style={{ width: '25px', height: '25px' }}
            />
            {match?.homeTeam.name}
          </Box>
          <span style={{ margin: '0 10px', fontSize: '16px' }}> vs </span>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1
            }}
          >
            <img
              src={match?.awayTeam.logo}
              alt="away team"
              style={{ width: '25px', height: '25px' }}
            />
            {match?.awayTeam.name}
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 1,
            gap: 1,
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <img
              src={match?.league.logo}
              alt="league"
              style={{ width: '20px', height: '20px' }}
            />
            <span style={{ fontSize: '12px' }}>{match?.league.name}</span>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <span style={{ fontSize: '12px' }}>
              ({new Date(match?.matchTimestamp * 1000).toLocaleString()})
            </span>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex'
          }}
        >
          <span style={{ fontSize: '12px' }}>
            Match data updated at:
            {new Date(match?.dataUpdateTimestamp * 1000).toLocaleString()}
          </span>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {' '}
          <span style={{ fontSize: '12px' }}>
            Odd data updated at:
            {new Date(
              match?.odds[0].dataUpdateTimestamp * 1000
            ).toLocaleString()}
          </span>
        </Box>
      </DialogTitle>
      <Divider />
      <Box sx={{ padding: 2 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: 8 }}>Bet Type</th>
              <th style={{ border: '1px solid #ddd', padding: 8 }}>Odd</th>
              <th style={{ border: '1px solid #ddd', padding: 8 }}>
                Probability
              </th>
              <th style={{ border: '1px solid #ddd', padding: 8 }}>ROI</th>
              <th style={{ border: '1px solid #ddd', padding: 8 }}>
                EV
              </th>
            </tr>
          </thead>
          <tbody style={{ border: '1px solid #ddd' }}>
            {match?.odds.map((odd) => {
              return (
                <tr key={odd.id}>
                  <StyledTableCell>
                    {BetType[odd.betType].name}
                    {BetType[odd.betType].subTypes.find(
                      (sub) => sub.subId === odd.betSubType
                    )?.name}
                  </StyledTableCell>
                  <StyledTableCell>{Math.max(...odd.odds)}</StyledTableCell>
                  <StyledTableCell>{odd.probability}%</StyledTableCell>
                  <StyledTableCell>{odd.roi}</StyledTableCell>
                  <StyledTableCell>{odd.ev}</StyledTableCell>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Box>
    </CustomDialog>
  );
}

OddModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  itemId: PropTypes.number
};

export default OddModal;
