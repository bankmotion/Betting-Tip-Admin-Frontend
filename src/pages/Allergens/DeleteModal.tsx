import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  styled,
  Box,
  CircularProgress,
  TextField
} from "@mui/material";
import PropTypes from "prop-types";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CloseIcon from "@mui/icons-material/Close";

import { useAppDispatch, useAppSelector } from "src/app/hooks";
import {
  deleteAllergenseAction,
  getAllergenesAction
} from "src/reducers/allergenes.slice";
import { AllergenType } from "src/models/allergen";
import { DeleteConfirmPwd } from "src/config/config";

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-elevation": {
    padding: "24px 40px",

    [theme.breakpoints.down("sm")]: {
      padding: "24px"
    }
  }
}));

const ButtonGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: 8,
  mt: 1,
  width: "100%"
}));

function DeleteDialog({ onClose, open, itemId }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useAppDispatch();
  const { loadingCreate, allergenesList } = useAppSelector(
    (state) => state.allergenes
  );
  const [targetItem, setTargetItem] = useState<AllergenType | null>(null);
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleConfirm = async () => {
    if (!targetItem) return;
    await dispatch(deleteAllergenseAction({ id: targetItem.id }));
    setSelectedFile(null);
    onClose();
    await dispatch(getAllergenesAction());
  };

  useEffect(() => {
    if (itemId && open) {
      const item = allergenesList.find((item) => item.id === itemId);
      if (item) {
        setTargetItem(item);
      }
    } else {
      setTargetItem(null);
    }
  }, [itemId, open]);

  useEffect(() => {
    setButtonDisabled(password !== DeleteConfirmPwd);
  }, [password]);

  return (
    <CustomDialog onClose={onClose} open={open}>
      <DialogTitle textAlign="center" fontSize="20px" fontWeight="bold">
        Do you really want to delete this allergen?
      </DialogTitle>
      <TextField
        id="outlined-search"
        label="Password"
        type="password"
        sx={{
          minWidth: 400
        }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <ButtonGroup sx={{ mt: 1 }}>
        <Button
          variant="contained"
          startIcon={
            loadingCreate ? null : <DoneOutlineIcon fontSize="small" />
          }
          sx={{
            flex: 1,
            "&.Mui-disabled": {
              backgroundColor: "#e0e0e0",
              color: "#9e9e9e"
            }
          }}
          disabled={loadingCreate || buttonDisabled}
          onClick={handleConfirm}
        >
          {loadingCreate ? <CircularProgress /> : "Delete"}
        </Button>
        <Button
          variant="outlined"
          startIcon={<CloseIcon fontSize="small" />}
          sx={{
            flex: 1
          }}
          onClick={onClose}
        >
          Cancel
        </Button>
      </ButtonGroup>
    </CustomDialog>
  );
}

DeleteDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  itemId: PropTypes.number
};

export default DeleteDialog;
