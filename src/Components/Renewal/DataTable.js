import { Alert, Box, Button, Checkbox, Grid, Snackbar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import config from '../../config.json'


import PermissionAlert from '../Manager/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert, setRefreshBox } from '../../store/action/action';
import { get_renewal, send_to_bhu } from '../../Services/Services';
 


function DataTable() {

 const [agreements,setAgreements] = useState({})
 const [agIds,setAgIds] = useState([])

  const dispatch = useDispatch()

  const {auth,refresh} = useSelector(s=>s)

  const [loading, setLoading] = useState(false)

 async function handleRenewal (id){
   try {
    const response = await send_to_bhu(
      { renewal_status: "Sent To Sr Manager For Renewal" },
      id
    );
    if (response.data.success) {
      dispatch(
        setAlert({
          variant: "success",
          open: true,
          message: "Agreement Sent To Sr Manager For Renewal.",
        })
        );
        dispatch(setRefreshBox())
    } else {
      dispatch(
        setAlert({
          variant: "error",
          open: true,
          message: "Something went wrong! Please again later.",
        })
      );
    }

   } catch (error) {
    console.log(error)
    dispatch(setAlert({open:true,variant:"error",message:"Something Went Wrong Please Try Again Later."}))
   }
  }

function actionButton (e){
      const id = e.id 
      return (
      <Grid container>
         {
     e.row.status === "Pending For Renewal" &&
      <Grid item xs={6}>
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{
          backgroundColor: "rgb(103 185 68 / 89%)",
          color: "white",
          fontSize: "12px",
          textTransform: "capitalize",
          // width:"100%"
        }}
        onClick={async (e) => {
          e.stopPropagation(); // don't select this row after clicking
          console.log(id);
          handleRenewal(id)
        }}
      >
        Renew
      </Button>
    </Grid>
}
    {
     e.row.status === "Approved for Renewal" && <Grid item xs={6}>
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{
          backgroundColor: "rgb(103 185 68 / 89%)",
          color: "white",
          fontSize: "12px",
          textTransform: "capitalize",
          // width:"100%"
        }}
        onClick={async (e) => {
          e.stopPropagation(); // don't select this row after clicking
          // console.log(id);
          navigate(`/renewal-edit-agreement/${id}`)
        }}
      >
        Edit
      </Button>
    </Grid>
    }
    </Grid>
      )


}

  // api call for get data
console.log(agreements)
console.log(agIds)

  const APICALL = async(id)=>{
    try {
      setLoading(true)
      const result = await get_renewal(id)
  
     console.log(result)
      if(result.data.success){
      //   const data = result.data.data.reverse();
      setAgreements(result.data.agreement)
      setAgIds(result.data.ids)
      setLoading(false)

      }
    } catch (error) {
      console.log(error)
      return dispatch({open:true,variant:"error",message:"Something Went Wrong Please Try Again Later."})
    }
   
  }

  useEffect(()=>{
    APICALL(auth.id)
  },[refresh])


const row =agIds.map(row=>{
  return {
      id: agreements[row].id,
      status: agreements[row].renewal_status,
      code: agreements[row].code,
      name: agreements[row].name,
      location: agreements[row].location,
      rentalAmount: agreements[row].monthlyRent
    }
})

  const navigate = useNavigate()

 

  const [ids, setIds] = useState([]);
  console.log(ids);


 //handle Checkbox
 const handleSwitch = (e) => {
  let idVar = Number(e.target.name);
  if (ids.includes(idVar)) {
    // console.log("out");
    setIds(ids.filter((i) => i !== idVar));
  } else {
    // console.log("in", idVar, ids);
    setIds([...ids, idVar]);
  }
};


  const columns = [
    {
      field: "checkbox",
      width: 20,
      type: "number",
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      renderCell: (params) => (
        <>
          {/* {console.log(ids.includes(params.id))} */}
          {params.formattedValue === "Pending For Renewal" ? (
            <Checkbox
              onChange={handleSwitch}
              name={params.id}
              checked={ids.includes(params.id) ? true : false}
            />
          ) : (
            <Checkbox disabled={true} />
          )}
        </>
      ),
    },   
    {
      field: "code",
      headerName: "Code",
      width: 130,
      type: "number",
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      flex:1
    },
    {
      field: "name",
      headerName: "Name",
      width: 230,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      flex:1
    },
    {
      field: "location",
      headerName: "Location",
      width: 230,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      flex:1
    },
    {
      field: "rentalAmount",
      headerName: "Rental Amount",
      width: 200,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      flex:1
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      flex:1
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      flex:1,
      renderCell:actionButton
    },
  ];
  

  //form delete alert


  return (
    <>
      <Box
      sx={{
        height: "430px",
        px: 2,
        "& .dataGridHeader": {
          color: "#CACACA",
          textAlign:'left'
        },
        "& .green": {
         backgroundColor: "#E7FFE9",
         color:"#41CF2A"
        },
        "& .yellow": {
          backgroundColor: "#FEFFC8",
          color:"#C5C05B"
        },
        "& .red": {
          backgroundColor: "#FFEBE7",
          color:"#CF482A"
        },
        "& .statusCell":{
          maxHeight:"30px !important",
          minHeight:"25px !important",
          textAlign:"center !important",
          borderRadius:"10px !important",
          m:'auto',
        },
        "& .allCell":{
          justifyContent:"center !important"          
        }
      }}
    >
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={6}
        rowsPerPageOptions={[6]}
        loading={loading}
        sx={{ color: "black !important",  minWidth:"50px" }}
        getCellClassName={(parms) => {
           let cellClass = []
          if (parms.field === "status" && parms.row.status === "Approved for Renewal") {
            cellClass.push("green statusCell") ;
          } else if (
            parms.field === "status" &&
           ( parms.row.status === "Pending For Renewal" || parms.row.status ===  "Sent To Sr Manager For Renewal")
          ) {
            cellClass.push( "yellow statusCell") ;
          } else if (
            parms.field === "status" &&
            parms.row.status === "Sent Back Fro Renewal Rectification"
          ) {
            cellClass.push("red statusCell")  ;
          }
          cellClass.push('allCell')
          
          return(cellClass)

        }}
        // onSelectionModelChange={(ids) => {console.log(ids)}}
      >

      </DataGrid>
    </Box>
    </>
  )
}

export default DataTable;