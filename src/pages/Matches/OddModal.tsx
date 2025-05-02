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
import { SERVER_URL } from 'src/config/config';
import { BetType } from 'src/const/OddConst';
import { AllergenType } from 'src/models/allergen';

const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-elevation': {
    padding: '24px 40px',

    [theme.breakpoints.down('sm')]: {
      padding: '24px'
    }
  }
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    minWidth: 250
  }
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
});

const PreviewImage = styled('img')(({ theme }) => ({
  width: 80,
  height: 80,
  backgroundColor: '#a8a8aa30',
  borderRadius: 8,
  flex: 1
}));

const UploadPreview = ({
  file,
  itemId,
  targetItem
}: {
  file: File;
  itemId: number;
  targetItem: AllergenType | null;
}) => {
  if (!file || !(file instanceof Blob)) {
    if (itemId !== null) {
      if (targetItem?.logo) {
        return (
          <Box sx={{ display: 'flex' }}>
            {
              <PreviewImage
                src={`${SERVER_URL}/logo/${targetItem.logo}`}
                alt="upload preview"
              />
            }
          </Box>
        );
      }
    }
  } else {
    const previewUrl = URL.createObjectURL(file);
    return (
      <Box sx={{ display: 'flex' }}>
        {file && (
          <PreviewImage
            src={previewUrl}
            alt="upload preview"
            onLoad={() => URL.revokeObjectURL(previewUrl)}
          />
        )}
      </Box>
    );
  }
};

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
  console.log(match);

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
            </tr>
          </thead>
          <tbody style={{ border: '1px solid #ddd' }}>
            {match?.odds.map((odd, index) => {
              return (
                <tr key={index}>
                  <StyledTableCell>
                    {BetType.find((bet) => bet.id === odd.betType)?.name}(
                    {
                      BetType.find(
                        (bet) => bet.id === odd.betType
                      )?.subTypes.find((sub) => sub.subId === odd.betSubType)
                        ?.name
                    }
                    )
                  </StyledTableCell>
                  <StyledTableCell>
                    {odd.odds.length ? Math.max(...odd.odds) : '---'}
                  </StyledTableCell>
                  <StyledTableCell>{odd.probability}%</StyledTableCell>
                  <StyledTableCell>{odd.roi}</StyledTableCell>
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
