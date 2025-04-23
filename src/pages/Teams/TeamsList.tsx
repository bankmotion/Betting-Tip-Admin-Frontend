import { Card } from '@mui/material';

import { useEffect } from 'react';
import { useAppDispatch } from 'src/app/hooks';
import TeamsTable from './TeamsTable';
import { getTeamsAction } from 'src/reducers/teams.slice';

function TeamsList() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTeamsAction());
  }, []);

  return (
    <Card>
      <TeamsTable />
    </Card>
  );
}

TeamsList.propTypes = {};

export default TeamsList;
