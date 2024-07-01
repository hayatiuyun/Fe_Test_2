import React from 'react'
import { Box, Modal,  } from "@mui/material";
interface ModalFormProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode
  }
  
  // component modal form to add data gates with modal or dialog from MUI, isOpen from props
  const ModalForm = ({ isOpen, onClose, children }: ModalFormProps) => {
    return (
      <Modal open={isOpen} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: {
              xs: "90%",
              sm: "50%",
            },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "13px",
          }}
        >
            {children}
        </Box>
      </Modal>
    );
  };

export default ModalForm