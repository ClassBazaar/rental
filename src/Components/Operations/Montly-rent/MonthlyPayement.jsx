import { IconButton, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import HamburgerMenu from '../../HamburgerMenu'
import { useNavigate } from 'react-router-dom'
import ListingComponent from '../../StyleComponents/ListingComponent'
import ListingTable from './ListingTable'
import { get_monthlt_rent_opr, get_search_monthly_rent_operations } from '../../../Services/Services'
import { useSelector } from 'react-redux'

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { Box } from '@mui/system'

function OperationsMonthlyPayement() {
    const navigate = useNavigate()

    const [agIDS,setAgIds] = useState([])
    const [rentData,setRent] = useState({})

       //search
 const [searchValue,setsearchValue] =useState('');

    const {auth,refresh}= useSelector(s=>s)

    async function fetchData(id){
      try {
  const data = await get_monthlt_rent_opr(id)
  console.log(data)
     if(data.data.success){
           setAgIds(data.data.ids)
           setRent(data.data.agreement)
           console.log(data.data.agreement)
     }else{
     console.log(data)
     }
  
      } catch (error) {
          console.log(error)
      }
    }    
  
    useEffect(()=>{
      fetchData(auth.id)
    },[refresh])

    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

      const rows = agIDS.map((row)=>{
        return(
          {
            id : rentData[row].id,
            code:rentData[row].code,
            checkbox:rentData[row].status,
            status:rentData[row].status,
            utr:rentData[row].utr_no,
            name:rentData[row].landlord_name,
            location:rentData[row].location,
            gst:rentData[row].gst,
            percentage:rentData[row].share,
            month_of_rent: month [new Date(rentData[row].rent_date).getUTCMonth()] + " " + new Date(rentData[row].rent_date).getFullYear(),
            total_month_rent:rentData[row].monthly_rent,
            payable_amount: rentData[row].gst? parseFloat((rentData[row].rent_amount/100*18)+Number(rentData[row].rent_amount)).toFixed(2) : parseFloat(rentData[row].rent_amount).toFixed(2),
            manager:rentData[row].manager_name,
            srm:rentData[row].srm_name
          }
        )
      })

      async function SearchAPi(id,searchValue){
        const search = await get_search_monthly_rent_operations(id,searchValue)
        setAgIds(search.data.ids)
        setRent(search.data.agreement)
      } 

      function handleSerachChange (e){
    
        SearchAPi(auth.id,searchValue)
        setsearchValue(e.target.value)
    
        console.log(searchValue)
      }


  return (
    <>
    <Stack sx={{ flexWrap: "wap", flexDirection: "row" }}>
         <HamburgerMenu
          navigateHome={"operationsDashboard"}
          handleListing={() => navigate("/operationsListing")}
          monthlyRent={() => navigate("/opr-monthly-rent")}
          renewal={() => navigate("/opr-monthly-rent")}
          monthlyBtn="true"
        />
        <Box className="backButton">
          <IconButton
            variant="contained"
            color="primary"
            onClick={() => navigate(-1)}
            size={"large"}
          >
            <ArrowCircleLeftIcon
              sx={{ fontSize: "3rem" }}
              color="#FFFFF !important"
            />
          </IconButton>
        </Box>
        <ListingComponent
          title1="Rental Management System"
          title="Monthly Payment"
          buttonText="Upload"
        //   options={options}
          value={"New Agreement"}
          Table={ListingTable}
          rows={rows}
          dropDown={false}
          searchValue={searchValue}
          // setsearchValue={setsearchValue}
          handleSerachChange={handleSerachChange}
        />
      </Stack>
    </>
  )
}

export default OperationsMonthlyPayement
