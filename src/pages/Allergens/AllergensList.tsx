import { Card } from "@mui/material";
import AllergensTable from "./AllergensTable";
import PropTypes from "prop-types";

import { useAppDispatch } from "src/app/hooks";
import { useEffect } from "react";
import { getAllergenesAction } from "src/reducers/allergenes.slice";

function AllergensList({
  setTargetItem,
  handleOpenCreateModal,
  handleOpenDeleteModal,
  allergenesList,
  loadingGetList
}) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllergenesAction());
  }, []);

  return (
    <Card>
      <AllergensTable
        allergenes={allergenesList}
        loadingGetList={loadingGetList}
        setTargetItem={setTargetItem}
        handleOpenCreateModal={handleOpenCreateModal}
        handleOpenDeleteModal={handleOpenDeleteModal}
      />
    </Card>
  );
}

AllergensList.propTypes = {
  setTargetItem: PropTypes.func.isRequired,
  handleOpenCreateModal: PropTypes.func.isRequired,
  handleOpenDeleteModal: PropTypes.func.isRequired
};

export default AllergensList;
