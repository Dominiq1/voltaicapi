import * as React from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { ADD_ORDER } from '@/gql/mutations/addOrder';

export default function OrderInventory() {
 

    const [addOrder, { data }] = useMutation(ADD_ORDER);

  const [uploadInProcess, setUploaded] = useState(false);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (event) => {
    event.persist();

  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleLeadSubmit = (e) => {

    // console.log(formData)
    e.preventDefault();


    addOrder({
    variables: {
      orderId: "123",
      itemName: "james",
      itemDescription: "444",
      itemImages: "http:.",
      quantity: "47",
      status: "inQue",
      vanId: "64064e66fe9b22647414a812"
      }
      }).then((res) => {
         console.log("Order Submitted");
    console.log(res);
    // setUploaded(false);
   

    }).catch((err) => {
      console.log("Order Not Submitted");
      console.log(err);
    });


  };

  return (
    <>
      {uploadInProcess ? (
        <div>
          <Button variant="outlined" onClick={handleClickOpen}>
            Order Item!
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Order Receipt</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Box display="flex" flexDirection="column">
                  <Box display="flex" justifyContent="space-between" mb={1}>

                  <span>Image</span>

                    <span>Item</span>
                    <span>Qty</span>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                     
                  <img style={{width: '10px', height: '10px'}} src="https://m.media-amazon.com/images/I/71JDRw5DTxL._AC_UF894,1000_QL80_.jpg" alt=''/>

       
                    <span>Copper Wire</span>
                    <span>10</span>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <span>Steel Nails</span>
                    <span>25</span>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <span>Aluminum Foil</span>
                    <span>5</span>
                  </Box>
                </Box>
              </DialogContentText>
              <Box display="flex" justifyContent="center">
                <img
                  src="https://img.freepik.com/premium-vector/3d-check-mark-icon-realistic-green-tick-button-isolated-white-background-vector-illustration_113065-1285.jpg"
                  alt="CSV Upload"
                  width="200"
                  height="200"
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={() => setUploaded(false)}>Order Item</Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : (
        <div>
          <Button variant="outlined" onClick={handleClickOpen}>
            Order Item!
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Order Summary</DialogTitle>
            <DialogContent sx={{ width: '50vw', display: 'flex', justifyContent: 'left', alignContent: 'center'}}>
              <DialogContentText>
                <Box display="flex" flexDirection="column">
                  <Box display="flex" justifyContent="space-between" mb={1}>
                  <span style={{width: '100px'}}>Image</span>
                  <span style={{width: '100px'}} >Item</span>
                <span style={{width: '100px'}}>Qty</span>
                </Box>


                <Box display="flex" justifyContent="space-between" mb={1}>
                <img style={{width: '50px', height: '50px'}} src="https://m.media-amazon.com/images/I/71JDRw5DTxL._AC_UF894,1000_QL80_.jpg" alt=''/>

                <span>Copper Wire</span>
                <span>10</span>
                </Box>



                </Box>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleLeadSubmit}>Request Inventory</Button>
                </DialogActions>
                </Dialog>
                </div>
                )}
                </>
                );
                }



