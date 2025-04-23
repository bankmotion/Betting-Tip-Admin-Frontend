import { Card } from '@mui/material';

import { useEffect } from 'react';
import { useAppDispatch } from 'src/app/hooks';
import { getCountriesAction } from 'src/reducers/countries.slice';
import CountriesTable from './CountriesTable';

function CountriesList() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCountriesAction());
  }, []);

  return (
    <Card>
      <CountriesTable />
    </Card>
  );
}

CountriesList.propTypes = {};

export default CountriesList;
