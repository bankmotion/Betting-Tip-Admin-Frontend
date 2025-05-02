import {
  Button,
  Card,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { BetType } from 'src/const/OddConst';
import { ToastStatus } from 'src/models/basic';
import { SettingType } from 'src/models/tipOption';
import {
  getTipSettingAction,
  updateTipSettingAction
} from 'src/reducers/tipSetting.slice';
import { toastMsg } from 'src/utils/utils';

function TipOptionsIndex() {
  const dispatch = useAppDispatch();

  // Default settings (can be fetched from backend or admin configuration API)
  const { defaultSettings } = useAppSelector((state) => state.tipSetting); // Assume settings are stored in the state

  const [minEV, setMinEV] = useState(defaultSettings.minEV || 0);
  const [minOdds, setMinOdds] = useState(defaultSettings.minOdds || 1.2);
  const [maxOdds, setMaxOdds] = useState(defaultSettings.maxOdds || 10);
  const [minProbability, setMinProbability] = useState(
    defaultSettings.minProbability || 50
  );
  const [minTimeBeforeMatch, setMinTimeBeforeMatch] = useState(
    defaultSettings.minTimeBeforeMatch || 120
  ); // in minutes
  const [maxTipsPerDay, setMaxTipsPerDay] = useState(
    defaultSettings.maxTipsPerDay || 10
  );
  const [allowedBetTypes, setAllowedBetTypes] = useState(
    defaultSettings.allowedBetTypes || []
  );
  const [lowRisk, setLowRisk] = useState(defaultSettings.lowRisk || 70);
  const [mediumRisk, setMediumRisk] = useState(
    defaultSettings.mediumRisk || 55
  );
  const [highRisk, setHighRisk] = useState(defaultSettings.highRisk || 55);
  const [overRound, setOverRound] = useState(
    defaultSettings.overRound || false
  );
  const [enableHighOddAdjust, setEnableHighOddAdjust] = useState(
    defaultSettings.enableHighOddAdjust || false
  );
  const [highOddSthreshold, setHighOddSthreshold] = useState(
    defaultSettings.highOddSthreshold || 0
  );
  const [extraProbBoost, setExtraProbBoost] = useState(
    defaultSettings.extraProbBoost || 0
  );
  const [scoreWeiPenalty, setScoreWeiPenalty] = useState(
    defaultSettings.scoreWeiPenalty || 0
  );
  const [scoreWeiEV, setScoreWeiEV] = useState(defaultSettings.scoreWeiEV || 0);
  const [scoreWeiProb, setScoreWeiProb] = useState(
    defaultSettings.scoreWeiProb || 0
  );

  const handleSaveSettings = () => {
    const updatedSettings: SettingType = {
      minEV,
      minOdds,
      maxOdds,
      minProbability,
      minTimeBeforeMatch,
      maxTipsPerDay,
      allowedBetTypes,
      lowRisk,
      mediumRisk,
      highRisk,
      overRound,
      enableHighOddAdjust,
      highOddSthreshold,
      extraProbBoost,
      scoreWeiPenalty,
      scoreWeiEV,
      scoreWeiProb
    };
    if (
      isNaN(updatedSettings.minEV) ||
      isNaN(updatedSettings.minOdds) ||
      isNaN(updatedSettings.maxOdds) ||
      isNaN(updatedSettings.minProbability) ||
      isNaN(updatedSettings.minTimeBeforeMatch) ||
      isNaN(updatedSettings.maxTipsPerDay) ||
      isNaN(updatedSettings.lowRisk) ||
      isNaN(updatedSettings.mediumRisk) ||
      isNaN(updatedSettings.highRisk) ||
      updatedSettings.minEV <= 0 ||
      updatedSettings.minOdds <= 0 ||
      updatedSettings.maxOdds <= 0 ||
      updatedSettings.minProbability <= 0 ||
      updatedSettings.minTimeBeforeMatch <= 0 ||
      updatedSettings.maxTipsPerDay <= 0 ||
      updatedSettings.lowRisk <= 0 ||
      updatedSettings.mediumRisk <= 0 ||
      updatedSettings.highRisk <= 0 ||
      updatedSettings.scoreWeiPenalty <= 0 ||
      updatedSettings.scoreWeiEV <= 0 ||
      updatedSettings.scoreWeiProb <= 0
    ) {
      toastMsg(
        'Invalid input. It can not be negative or zero',
        ToastStatus.Error
      );
      return;
    }

    dispatch(updateTipSettingAction(updatedSettings))
      .unwrap()
      .then(() => {
        dispatch(getTipSettingAction());
      })
      .catch((err) => {});
  };

  useEffect(() => {
    dispatch(getTipSettingAction());
  }, [dispatch]);

  useEffect(() => {
    if (defaultSettings) {
      setMinEV(defaultSettings.minEV);
      setMinOdds(defaultSettings.minOdds);
      setMaxOdds(defaultSettings.maxOdds);
      setMinProbability(defaultSettings.minProbability);
      setMinTimeBeforeMatch(defaultSettings.minTimeBeforeMatch);
      setMaxTipsPerDay(defaultSettings.maxTipsPerDay);
      setAllowedBetTypes(defaultSettings.allowedBetTypes);
      setLowRisk(defaultSettings.lowRisk);
      setMediumRisk(defaultSettings.mediumRisk);
      setHighRisk(defaultSettings.highRisk);
      setScoreWeiPenalty(defaultSettings.scoreWeiPenalty);
      setScoreWeiEV(defaultSettings.scoreWeiEV);
      setScoreWeiProb(defaultSettings.scoreWeiProb);
    }
  }, [defaultSettings]);

  return (
    <Card sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Tip Evaluation Parameters
      </Typography>
      <Grid container spacing={2} marginTop={1}>
        {/* Minimum EV */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Minimum EV (%)"
            type="number"
            fullWidth
            value={minEV}
            onChange={(e) => setMinEV(Number(e.target.value))}
          />
        </Grid>

        {/* Odds Range */}
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>Odds Range</Typography>
          <Slider
            value={[minOdds, maxOdds]}
            onChange={(e, newValue) => {
              setMinOdds(newValue[0]);
              setMaxOdds(newValue[1]);
            }}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}`}
            min={1.2}
            max={10}
            step={0.1}
            marks={[
              { value: 1.2, label: '1.2' },
              { value: 10, label: '10' }
            ]}
          />
        </Grid>

        {/* Minimum Probability */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Minimum Probability (%)"
            type="number"
            fullWidth
            value={minProbability}
            onChange={(e) => setMinProbability(Number(e.target.value))}
          />
        </Grid>

        {/* Minimum Time Before Match Start */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Minimum Time Before Match (minutes)"
            type="number"
            fullWidth
            value={minTimeBeforeMatch}
            onChange={(e) => setMinTimeBeforeMatch(Number(e.target.value))}
          />
        </Grid>

        {/* Maximum Tips Per Day */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Maximum Tips Per Day"
            type="number"
            fullWidth
            value={maxTipsPerDay}
            onChange={(e) => setMaxTipsPerDay(Number(e.target.value))}
          />
        </Grid>

        {/* Allowed Bet Types */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Allowed Bet Types</InputLabel>
            <Select
              multiple
              value={allowedBetTypes}
              onChange={(e) => setAllowedBetTypes(e.target.value as number[])}
              label="Allowed Bet Types"
              renderValue={(selected) =>
                selected.length > 0
                  ? selected
                      .map(
                        (id) =>
                          Object.values(BetType).find(
                            (betType) => betType.id === id
                          )?.name
                      )
                      .join(', ')
                  : 'Select Bet Types'
              }
            >
              {Object.values(BetType).map((betType) => (
                <MenuItem key={betType.id} value={betType.id}>
                  <Checkbox
                    checked={allowedBetTypes?.includes(betType.id)}
                    sx={{
                      padding: 0,
                      margin: 0
                    }}
                  />
                  <ListItemText primary={betType.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2} marginTop={1}>
        {/* Risk Level Classification */}
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" gutterBottom>
            Risk Level Classification
          </Typography>
          <Grid container spacing={2} marginTop={1}>
            <Grid item xs={4}>
              <TextField
                label="Low Risk (Odd)"
                type="number"
                fullWidth
                value={lowRisk}
                onChange={(e) => setLowRisk(Number(e.target.value))}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Medium Risk (Odd)"
                type="number"
                fullWidth
                value={mediumRisk}
                onChange={(e) => setMediumRisk(Number(e.target.value))}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="High Risk (Odd)"
                type="number"
                fullWidth
                value={highRisk}
                onChange={(e) => setHighRisk(Number(e.target.value))}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom marginTop={2}>
        Engine Behavior
      </Typography>

      <Grid container spacing={2} marginTop={1}>
        {/* OverRound & High Odds Adjust Settings */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink>Overround Correction</InputLabel>
            <Select
              value={overRound ? 'yes' : 'no'}
              onChange={(e) => setOverRound(e.target.value === 'yes')}
            >
              <MenuItem value="yes">Enabled</MenuItem>
              <MenuItem value="no">Disabled</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink>Enable High Odd Adjust</InputLabel>
            <Select
              value={enableHighOddAdjust ? 'yes' : 'no'}
              onChange={(e) => setEnableHighOddAdjust(e.target.value === 'yes')}
            >
              <MenuItem value="yes">Enabled</MenuItem>
              <MenuItem value="no">Disabled</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="High Odds Threshold"
            type="number"
            fullWidth
            sx={{ marginBottom: 2 }}
            value={highOddSthreshold}
            onChange={(e) => setHighOddSthreshold(Number(e.target.value))}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Extra Probability Boost (%)"
            type="number"
            fullWidth
            value={extraProbBoost}
            onChange={(e) => setExtraProbBoost(Number(e.target.value))}
          />
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom marginTop={2}>
        Score Weight
      </Typography>

      <Grid container spacing={2} marginTop={1}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
              label="Penalty"
              type="number"
              fullWidth
              sx={{ marginBottom: 2 }}
              value={scoreWeiPenalty}
              onChange={(e) => setScoreWeiPenalty(Number(e.target.value))}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
              label="EV"
              type="number"
              fullWidth
              sx={{ marginBottom: 2 }}
              value={scoreWeiEV}
              onChange={(e) => setScoreWeiEV(Number(e.target.value))}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="Probability"
            type="number"
            fullWidth
            sx={{ marginBottom: 2 }}
            value={scoreWeiProb}
            onChange={(e) => setScoreWeiProb(Number(e.target.value))}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} marginTop={1}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSaveSettings}
        >
          Save Settings
        </Button>
      </Grid>
    </Card>
  );
}

TipOptionsIndex.propTypes = {};

export default TipOptionsIndex;
