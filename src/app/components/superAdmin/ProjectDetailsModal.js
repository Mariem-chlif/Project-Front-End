import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ProjectDetailsModal({ open, object, handleClose }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Nombre d'employee: {object?.item?.Nombre_employee}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Status: {object?.item?.statut}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Stack: {object?.item?.stack}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Budget: {object?.item?.budget}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
