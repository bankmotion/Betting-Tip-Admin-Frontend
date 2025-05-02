import { Card } from '@mui/material';

import { useEffect } from 'react';
import { useAppDispatch } from 'src/app/hooks';
import MatchesTable from './MatchesTable';
import { getMatchesAction } from 'src/reducers/matches.slice';

function MatchesList({
  onOpenOddModal,
  onSetTargetMatchId
}: {
  onOpenOddModal: (open: boolean) => void;
  onSetTargetMatchId: (id: number) => void;
}) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getMatchesAction());
  }, []);

  return (
    <Card>
      <MatchesTable
        onOpenOddModal={onOpenOddModal}
        onSetTargetMatchId={onSetTargetMatchId}
      />
    </Card>
  );
}

MatchesList.propTypes = {};

export default MatchesList;
