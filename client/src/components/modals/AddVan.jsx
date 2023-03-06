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
import CsvUpload from '../DropBoxes/CsvUpload';
// import { ADD_LEAD } from '../../mutations/leadMutations';
import { ADD_VAN } from '../../mutations/addVan';


export default function AddVan() {

//   const [addLead, { loading, error, data }] = useMutation(ADD_LEAD);
  const [addVan, {vanLoading, vanError, vanData}] = useMutation(ADD_VAN);

  const [formData, setFormData] = useState({
    licensePlate: "",
    statusFill: ""
  });

  const [uploadInProcess, setUploaded] = useState(false);



 const [open, setOpen] = React.useState(false);





  const handleClickOpen = () => {
    setOpen(true);
  };



  const handleChange = (event) => {

    event.persist();
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
  
    });

    console.log(formData)

  };






  const handleClose = () => {
    setOpen(false);
  };




  const handleLeadSubmit = (e) => {

    console.log(formData)
    e.preventDefault();
    addVan({

    variables: {
        licensePlate: "kjsnfkjv",
        statusFill: "false",
    }
   
    }).then((res) => {

      setFormData({
        licensePlate: "",
        statusFill: ""
       
      });

    console.log(res);
    setUploaded(false);
    console.log("Van Submitted!");

    }).catch((err) => {
      
      console.log(err);
    });

  }


  return (

    <>
    { uploadInProcess ?( <div>
 
 <Button variant="outlined" onClick={handleClickOpen}>
 Add Van
 </Button>
 <Dialog open={open} onClose={handleClose}>
   <DialogTitle>New Lead Info</DialogTitle>
   <DialogContent>
     <DialogContentText>
       Tell us about your new lead!
     </DialogContentText>


<Box>
<img src="https://img.freepik.com/premium-vector/3d-check-mark-icon-realistic-green-tick-button-isolated-white-background-vector-illustration_113065-1285.jpg" alt="CSV Upload" width="200" height="200" />

</Box>




   </DialogContent>
   <DialogActions>
      <Button onClick={handleClose}>Cancel</Button> 
    <Button onClick={() => setUploaded(false)}> Request Inventory</Button> 
   </DialogActions>
 </Dialog>
</div> ) : ( <div>
 
 <Button variant="outlined" onClick={handleClickOpen}>
 Add Van
 </Button>
 <Dialog open={open} onClose={handleClose}>
   <DialogTitle>New Lead Info</DialogTitle>
   <DialogContent>
     <DialogContentText>
       Tell us about your new lead!
     </DialogContentText>


     {/* <Button variant="outlined" onClick={handleClickOpen}>
 {CsvUpload()}
 </Button> */}
 
 


<TextField
autoFocus
margin="dense"
id="licensePlate"
label="License Plate"
type="text"
fullWidth
variant="standard"
name="licensePlate"
value={formData.licensePlate}
onChange={handleChange}
/>

<TextField
autoFocus
margin="dense"
id="statusFill"
label="Fill Status"
type="email"
fullWidth
variant="standard"
name="statusFill"
value={formData.statusFill}
onChange={handleChange}
/>


   </DialogContent>
   <DialogActions>
     <Button onClick={handleClose}>Cancel</Button>
     <Button onClick={handleLeadSubmit}> Add Van</Button>
   </DialogActions>
 </Dialog>
</div>)}
    
    </>
   
  );
}