import { Card } from '@mui/material';

import { useEffect } from 'react';
import { useAppDispatch } from 'src/app/hooks';
import FilteredTipsTable from './FilteredTipsTable';
import { getMatchesByOddStatusAction } from 'src/reducers/matches.slice';
import { getTipSettingAction } from 'src/reducers/tipSetting.slice';

function MatchesList({
  onOpenOddModal,
  onSetTargetMatchId
}: {
  onOpenOddModal: (open: boolean) => void;
  onSetTargetMatchId: (id: number) => void;
}) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getMatchesByOddStatusAction({ tipValid: true }));
    dispatch(getTipSettingAction());
  }, []);

  return (
    <Card>
      <FilteredTipsTable
        onOpenOddModal={onOpenOddModal}
        onSetTargetMatchId={onSetTargetMatchId}
      />
    </Card>
  );
}

MatchesList.propTypes = {};

export default MatchesList;
