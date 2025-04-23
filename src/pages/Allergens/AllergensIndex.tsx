import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { Grid, Container } from "@mui/material";
import Footer from "src/components/Footer";

import AllergensList from "./AllergensList";
import CreateDialog from "./CreateModal";
import DeleteDialog from "./DeleteModal";
import { useAppSelector } from "src/app/hooks";
import { AllergenType } from "src/models/allergen";

function AllergensIndex() {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [targetItem, setTargetItem] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [filteredAllergenLists, setFilteredAllergenLists] = useState<
    AllergenType[]
  >([]);

  const { allergenesList, loadingGetList } = useAppSelector(
    (state) => state.allergenes
  );

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  useEffect(() => {
    const updatedList = allergenesList.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toString().toLowerCase().includes(search.toLowerCase())
    );
    setFilteredAllergenLists(updatedList);
  }, [search, allergenesList]);

  return (
    <>
      <Helmet>
        <title>Food-Allergens</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader
          setTargetItem={setTargetItem}
          handleOpenCreateModal={handleOpenCreateModal}
          search={search}
          setSearch={setSearch}
        />
        <CreateDialog
          open={openCreateModal}
          onClose={handleCloseCreateModal}
          itemId={targetItem}
        />
        <DeleteDialog
          open={openDeleteModal}
          onClose={handleCloseDeleteModal}
          itemId={targetItem}
        />
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
            <AllergensList
              setTargetItem={setTargetItem}
              handleOpenCreateModal={handleOpenCreateModal}
              handleOpenDeleteModal={handleOpenDeleteModal}
              allergenesList={filteredAllergenLists}
              loadingGetList={loadingGetList}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default AllergensIndex;
