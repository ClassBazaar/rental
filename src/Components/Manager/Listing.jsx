import React, { useContext, useEffect, useState } from "react";

import DataTable from "./DataTable";

import HamburgerMenu from "../HamburgerMenu";
import ListingComponent from "../StyleComponents/ListingComponent";
import { IconButton, Stack } from "@mui/material";
import { get_agreements, get_approved_agreements, get_search_manager } from "../../Services/Services";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/system";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import moment from "moment";
import HamburgerManager from "./HamburgerManager";


function Listing() {
  const [Select, setSelect] = useState("New Agreement");
  const [data, setData] = useState([]);

 const {params} = useParams()

 console.log(params)
  
 const {refresh,auth} = useSelector(s=>s)

  const handleChange = (e) => {
    setSelect(e.target.value);
  };

  const [agreement, setAgreement] = useState({});
 

  const [loading, setLoading] = useState(false);
  const [check,setCheck] = useState([])


  // for in precess agreements
  async function APICALL (id){
    try {
      setLoading(true);
    setData([]);
    const result = await get_agreements(id);

    if (result.status === 200) {
      const data = result.data.ids;
      setAgreement(result.data.agreement);
      setData(data);
     
      setLoading(false);
    }
    } catch (error) {
      console.log(error)
    }
    
  };

  // for in precess agreements
  async function get_approved_agreemnt (id){
    try {
      setLoading(true);
    setData([]);
    const result = await get_approved_agreements(id);

    console.log(result)

    if (result.status === 200) {
      const data = result.data.ids;
      setAgreement(result.data.agreement);
      setData(data);
     
      setLoading(false);
    }
    } catch (error) {
      console.log(error)
    }
    
  };
  
  
  
 //search
 const [searchValue,setsearchValue] =useState('');

  
 async function SearchAPi(searchValue){
   const search = await get_search_manager(searchValue)
   setData(search.data.ids)
  setAgreement(search.data.agreement)
 } 


 useEffect(() => {
  if(params === "in-procces-ag"){
    APICALL(auth.id);
  }else if(params === "approved-ag"){
    get_approved_agreemnt(auth.id)
  }

}, [refresh,params]); 
 

const row = data.map((item) => {
  console.log(agreement[item])
    
    return {
      id: agreement[item].agreement_id,
      status: agreement[item].status,
      code: agreement[item].code,
      name: agreement[item].name,
      location: agreement[item].location,
      rent_amount: agreement[item].monthlyRent,
      checkbox: agreement[item].status,
      utr_number: agreement[item].utr_number,
      rent_date : agreement[item].rent_start_date,
      initiateDate : moment(agreement[item].time).format('DD-MM-YYYY'),
      type: "---",
      address: agreement[item].address,
      city: agreement[item].city,
      state: agreement[item].state,
      deposit:parseFloat( agreement[item].deposit).toFixed(2),
      

    };
  });



const navigate =useNavigate()

function handleSerachChange (e){
  SearchAPi(e.target.value)
  setsearchValue(e.target.value)
}

 return (
    <>
      <Stack sx={{ flexWrap: "wap", flexDirection: "row" }}>
      {/* <HamburgerMenu
          navigateHome={"dashboard"}
          handleListing={()=>navigate('/listing')}
          monthlyRent={() => navigate("/monthly-payment")}
          renewal={() => navigate(`/renewal`)}
          monthlyBtn='true'
        /> */}

<HamburgerManager/>

        <ListingComponent
          title1={'Rental Management System'}
          title={'Rental Agreement'}
          buttonText="Upload"
          buttonText1="Add Agreement"
          addbtn={true}
          Table={DataTable}
          onChange={handleChange}
          dropDown={false}
          loading={loading}
          rows={row}
        searchValue={searchValue}
        // setsearchValue={setsearchValue}
        handleSerachChange={handleSerachChange}
        check={check}
        setCheck={setCheck}
        />
      </Stack>
    </>
  );
}

export default Listing;