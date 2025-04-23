import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  TextField,
  styled,
  Box,
  CircularProgress
} from "@mui/material";
import PropTypes from "prop-types";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { useAppDispatch, useAppSelector } from "src/app/hooks";
import {
  createAllergenesAction,
  getAllergenesAction,
  updateAllergenseAction
} from "src/reducers/allergenes.slice";
import { toastMsg } from "src/utils/utils";
import { ToastStatus } from "src/models/basic";
import { SERVER_URL } from "src/config/config";
import { AllergenType } from "src/models/allergen";

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-elevation": {
    padding: "24px 40px",

    [theme.breakpoints.down("sm")]: {
      padding: "24px"
    }
  }
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    minWidth: 250
  }
}));

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1
});

const PreviewImage = styled("img")(({ theme }) => ({
  width: 80,
  height: 80,
  backgroundColor: "#a8a8aa30",
  borderRadius: 8,
  flex: 1
}));

const UploadPreview = ({
  file,
  itemId,
  targetItem
}: {
  file: File;
  itemId: number;
  targetItem: AllergenType | null;
}) => {
  if (!file || !(file instanceof Blob)) {
    if (itemId !== null) {
      if (targetItem?.logo) {
        return (
          <Box sx={{ display: "flex" }}>
            {
              <PreviewImage
                src={`${SERVER_URL}/logo/${targetItem.logo}`}
                alt="upload preview"
              />
            }
          </Box>
        );
      }
    }
  } else {
    const previewUrl = URL.createObjectURL(file);
    return (
      <Box sx={{ display: "flex" }}>
        {file && (
          <PreviewImage
            src={previewUrl}
            alt="upload preview"
            onLoad={() => URL.revokeObjectURL(previewUrl)}
          />
        )}
      </Box>
    );
  }
};

const UploadIconPanel = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginTop: 8,
  gap: 8
}));

function CreateDialog({ onClose, open, itemId }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState("");
  const [sortingNr, setSortingNr] = useState(0);
  const dispatch = useAppDispatch();
  const { loadingCreate, allergenesList } = useAppSelector(
    (state) => state.allergenes
  );
  const [targetItem, setTargetItem] = useState<AllergenType | null>(null);

  const selectFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleConfirm = async () => {
    if (!name) {
      toastMsg("Please enter new name.", ToastStatus.Info);
      return;
    }
    if (itemId !== null) {
      await dispatch(
        updateAllergenseAction({
          id: targetItem.id,
          name,
          logo: selectedFile,
          sortingNr
        })
      );
    } else {
      await dispatch(
        createAllergenesAction({ name, logo: selectedFile, sortingNr })
      );
    }
    setName("");
    setSortingNr(0);
    setSelectedFile(null);
    onClose();
    await dispatch(getAllergenesAction());
  };

  useEffect(() => {
    if (itemId && open) {
      const item = allergenesList.find((item) => item.id === itemId);
      if (item) {
        setName(item.name);
        setSelectedFile(null);
        setTargetItem(item);
        setSortingNr(item.sortingNr);
      }
    } else {
      setName("");
      setTargetItem(null);
      setSortingNr(0);
    }
  }, [itemId, open]);

  return (
    <CustomDialog onClose={onClose} open={open}>
      <DialogTitle
        sx={{
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "bold"
        }}
      >
        {itemId !== null ? "Edit allergen" : "Create new allergen"}
      </DialogTitle>
      <CustomTextField
        id="outlined-search"
        label="Allergene name"
        type="text"
        sx={{
          minWidth: 400
        }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <UploadIconPanel>
        <Button
          component={"label"}
          role={undefined}
          variant="outlined"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          sx={{
            flex: 3
          }}
        >
          Upload icon
          <VisuallyHiddenInput type="file" onChange={selectFileChange} />
        </Button>
        <UploadPreview
          file={selectedFile}
          itemId={itemId}
          targetItem={targetItem}
        />
      </UploadIconPanel>
      <CustomTextField
        label="Allergene matrix sorting"
        type="number"
        sx={{
          minWidth: 400,
          mt: 1
        }}
        value={!sortingNr ? "" : 10000 - sortingNr}
        onChange={(e) =>
          setSortingNr(
            !e.target.value ? 0 : 10000 - (Number(e.target.value) || 0)
          )
        }
      />
      <Button
        variant="contained"
        startIcon={loadingCreate ? null : <DoneOutlineIcon fontSize="small" />}
        sx={{
          mt: 1
        }}
        disabled={loadingCreate}
        onClick={handleConfirm}
      >
        {loadingCreate ? <CircularProgress /> : "Confirm"}
      </Button>
    </CustomDialog>
  );
}

CreateDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  itemId: PropTypes.number
};

export default CreateDialog;
