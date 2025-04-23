import { Card } from '@mui/material';

import { useEffect } from 'react';
import { useAppDispatch } from 'src/app/hooks';
import LeaguesTable from './LeaguesTable';
import { getLeaguesAction } from 'src/reducers/leagues.slice';

function LeaguesList() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getLeaguesAction());
  }, []);

  return (
    <Card>
      <LeaguesTable />
    </Card>
  );
}

LeaguesList.propTypes = {};

export default LeaguesList;
