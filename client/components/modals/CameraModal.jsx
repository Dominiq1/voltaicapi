import * as React from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { BsCamera } from 'react-icons/bs';
import Button from '@mui/material/Button';
import { Box, Grid, Paper } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDropzone } from 'react-dropzone';

import { ADD_LEAD } from '@/gql/mutations/leadMutations';
import { ADD_NOTE } from '@/gql/mutations/noteMutations';


import styles from './UserPage.module.css';

export default function CameraModal({ RowId }) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    contactId: '',
    firstName: '',
    lastName: '',
    notes: '',
    buyerAgent: '',
    listingAgent: '',
    leadId: '',
  });

  const [addLead, { Leadloading, error, Leaddata }] = useMutation(ADD_LEAD);
  const [addNote, { eAlertloading, eAlerterror, eAlertddata }] = useMutation(ADD_NOTE);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();

    addLead({
      variables: formData,
    })
      .then((res) => {
        setFormData({
          contactID: '',
          firstName: '',
          email: '',
          lastName: '',
          description: '',
          phone: '',
          //      ...rest of the form fields
        });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log('Lead Submitted!');
  };

  const handleUpload = () => {
    setLoading(true);

    data.forEach((lead) => {
      console.log(lead);

      try {
        addNote({
          variables: {
            contactId: '63f1ad157a94bcff4184d31c',
            FirstName: '63f1ad157a94bcff4184d31c',
            LastName: '63f1ad157a94bcff4184d31c',
            Notes: '63f1ad157a94bcff4184d31c',
            BuyerAgent: '63f1ad157a94bcff4184d31c',
            ListingAgent: '63f1ad157a94bcff4184d31c',
            leadId: '63f1ad64d855342f3c84d873',
          },
        });
      } catch (error) {
        console.log(error);
      }
    });

    setLoading(false);
  };

  const handleChildData = (acceptedFiles) => {
    setData(acceptedFiles);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: handleChildData,
    multiple: false,
  });

  return (
    <div className={styles.MainDiv}>
      <Button variant="outlined" onClick={handleClickOpen} startIcon={<BsCamera/>}>
+
</Button>
<div className={styles.ModalMain}>
    <Dialog
      maxWidth="xl"
      maxHeight="xl"
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Images</DialogTitle>
      <DialogContent className={styles.MainModal}>
        <Box sx={{ width: '100%', height: 'fit-content', p: 2 }}>
          <Grid container spacing={2}>
            {[...Array(9)].map((_, index) => (
              <Grid item xs={4} key={index}>
                <Paper sx={{ height: 150, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <p>Drop the files here ...</p>
                    ) : (
                      <p>Drag and drop an image here or click</p>
                    )}
                  </div>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: 'red' }}>
          Cancel
        </Button>
        <Button onClick={handleUpload}>Upload Leads</Button>
      </DialogActions>
    </Dialog>
  </div>
</div>
  );
                    }



