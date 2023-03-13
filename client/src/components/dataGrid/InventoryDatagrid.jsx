import * as React from 'react';

import { Button, FormControl, InputLabel, Select, MenuItem   } from '@mui/material';
import { useQuery ,useMutation} from '@apollo/client';
import { useMemo,useState} from 'react';
import Box from '@mui/material/Box';
import { DataGridPro } from '@mui/x-data-grid-pro';
import moment from 'moment';
import { useDemoData } from '@mui/x-data-grid-generator';
import UsersActions from '../UsersActions';
import styles from './Datagrid.module.css';
import CellBox from '../CellBox';
import { GET_CLIENTS } from '../../queries/clientQueres';
import ProfileDetailsPage from '../ProfileDetailsPage';
import UploadImage from '../UploadImage';
import { updateLeadMutation } from '../../mutations/leadMutations';
import { SEND_EMAILS_MUTATION } from '../../mutations/bulkEmail';
import EmailActionModal from '../modals/EmalActionModal';
import AddNote from '../modals/AddNote';
import AddeAlert from '../modals/AddeAlert';


import AddCSVCall from '../modals/AddCSVCalls';







export default function IntenvtoryDatagrid(props) {

  //  Filter columns s
  const [selectedColumns, setSelectedColumns] = useState(['id', 'item', 'quantity', 'fillStatus', 'Images']);
  





  
  const [gridRef, setGridRef] = useState({});

  const [count, setCount] = useState(0);

  



  const [sendEmails, { Emailsloading, Emailerror, emaildata }] = useMutation(SEND_EMAILS_MUTATION);

  const [ rowSelectedUsers, setrowSelectedUsers] = useState(['dominiqmartinez13@gmail.com', 'unhashlabs@gmail.com'])

  const [ChartData,setData] = useState(props.data)
  const { loading, error, graphQLClients} = useQuery(GET_CLIENTS)


  const [ResponseData, setResponseData] = useState(null);
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100000,
    editable: true,
  });

  const rows = [
    // { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },

  ];

  const handleSendEmails = async (Emails, Subject, Body) => {
    try {
      const { data } = await sendEmails({
        variables: {
          emails: Emails,
          subject: Subject,
          body: Body,
  
        },
      });
      console.log(data); // do something with the returned data
    } catch (e) {
      console.error(e); // handle errors
    }
  };




  // const gridRef = React.useRef(null);

  const handleRowSelection = (params) => {

    const selectedEmails = params.map((id) => {
      const row = ResponseData.find((r) => r.id === id);
      return row.email;
    
    });

    console.log(selectedEmails)
    setrowSelectedUsers(selectedEmails);



  };
  


    React.useEffect(() => {

        if(props.UserData){ 
            // console.log(props.UserData)
            
      
          const usersWithIds = props.UserData.map((user, index) => {
            return { ...user, Uid: index};
          });


          const data = [ {
            id: 1,
            item: 'Rebar - Reinforced 1/4 X 1 1/2 ',
            quantity: '54',
            fillStatus: '35',
            image: ''

          },
          {
            id: 2,
            item: 'Concrete - 5lbs',
            quantity: '54',
            fillStatus: '35',
            image: ''

          }]



          // setResponseData(usersWithIds)

    setResponseData(data)


        }else{
          setResponseData(rows)
          }
      
    
      
    }, [props.UserData, rows])

    


    const [pageSize , setpageSize] = useState(5);
    const [rowId, setRowId ]= useState(null)
    
 
        const columns = useMemo(
          () => [
            // {field: 'Actions', headerName: 'actions', width: 130, renderCell: (params) =>  <UsersActions{...{params, rowId, setRowId}}/>},
            {field: 'Images', headerName: 'Images', width: 120,  editable: true, renderCell: (params) =>  <UploadImage row={params.row.Uid} {...{params }}   />},
            // {field: 'id', headerName: 'ID', width: 100,  editable: true},
            { 
              field: "item", 
              width: 400,
              headerName: 'Item',
              editable: true,
            },
            { 
              field: "quantity", 
              width: 75,
              headerName: 'Quantity',
              editable: true,
            },
            { 
              field: "fillStatus", 
              width: 50,
              headerName: 'Order',
              editable: true,
            },

         
       ], [rowId])

      //  / Define your filter options
       const filterOptions = [
         { value: 'firstName', label: 'First Name' },
         { value: 'lastName', label: 'Last Name' },
         { value: 'age', label: 'Age' },
       ];
       




      //  const filterModel = {
      //   firstName: {
      //     value: 'Jon',
      //     operatorValue: 'contains',
      //   },
      // };
      







      // columns={columns.filter((c) => selectedColumns.includes(c.field))}


  return (
    <Box sx={{ height: 520, width: '100%'}}>


<Box sx={{display: 'flex', flexDirection:'row'}}>

{/* <EmailActionModal Massemails={rowSelectedUsers}/> */}

{/* <AddNote/>

<AddeAlert/>

<AddCSVCall/> */}

</Box>





<Box sx={{margin: '20px'}}> 

{/* 
<FormControl>
        <InputLabel>Filtered Columns</InputLabel>
        <Select
          multiple
          value={selectedColumns}
          onChange={(e) => setSelectedColumns(e.target.value)}
          renderValue={(selected) => selected.join(', ')}
        >
          {columns.map((column) => (
            <MenuItem key={column.field} value={column.field}>
              {column.headerName}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}

</Box>


{/* <AddCSVCall/> */}
      {ResponseData?(
      <DataGridPro
        ref={(grid) => setGridRef(grid)}
        onSelectionModelChange={handleRowSelection}
        columns={columns.filter((c) => selectedColumns.includes(c.field))}
        rows={ResponseData} 
        rowHeight={100}
        onCellEditCommit={(params) => setRowId(params.id)}
        checkboxSelection
        disableSelectionOnClick
        
      />): ( <div>No Data</div>)}
 
    </Box>
  );
}










// removed parameter from data grid:
// experimentalFeatures={{ newEditingApi: true }}



