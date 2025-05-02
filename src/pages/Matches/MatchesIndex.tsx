import { Container, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';
import MatchesList from './MatchesList';
import { useState } from 'react';
import OddModal from './OddModal';

function LeaguesIndex() {
  const [openOddModal, setOpenOddModal] = useState(false);
  const [targetMatchId, setTargetMatchId] = useState<number>(-1);

  return (
    <>
      <Helmet>
        <title>Leagues</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <MatchesList
              onOpenOddModal={setOpenOddModal}
              onSetTargetMatchId={setTargetMatchId}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />

      <OddModal
        open={openOddModal}
        onClose={() => setOpenOddModal(false)}
        itemId={targetMatchId}
      />
    </>
  );
}

export default LeaguesIndex;
