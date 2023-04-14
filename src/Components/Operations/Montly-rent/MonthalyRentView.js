import { Box, Button, Grid, IconButton, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import HamburgerMenu from "../../HamburgerMenu";

import {
  DocumentUpload,
  MyHeader,
  TextFieldWrapper,
} from "../../StyledComponent";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import {
  get_rent_data_ID,
  sendMonthyPaymentForword,
  uploadDoc,
} from "../../../Services/Services";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../../store/action/action";
import { CloseFullscreen } from "@mui/icons-material";

export default function MonthalyRentView() {
  const navigate = useNavigate();
  const { id } = useParams();

  console.log(id);
  const { auth } = useSelector((s) => s);
  const dispatch = useDispatch();

  const [remark, setRemark] = useState("");

  const [formError, setError] = useState({
    invoice_no: "",
    invoice_date: "",
    rent_amount: "",
    gst_amount: "",
    total_amount: "",
    invoice: "",
    fileName: "",
  });

  const [preData, setPredata] = useState({
    invoice_no: "",
    invoice_date: "",
    rent_amount: "",
    gst_amount: "",
    total_amount: 0,
    invoice: "",
    fileName: "",
    status: "",
  });


function getTotal (){
  let total = parseFloat(
    Number(preData.rent_amount) +
      Number(preData.gst_amount)
  ).toFixed(2)

  setPredata({...preData,total_amount:total})
}
console.log(  )

useEffect(()=>{
   getTotal()
},[preData.rent_amount,preData.gst_amount])

  function handleChange(e) {
    setPredata({
      ...preData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleChangeFile(e) {
    const FD = new FormData();
    console.log(e.target.files[0]);
    FD.append("photo", e.target.files[0]);
    let response = await uploadDoc(FD);

    if (response.status === 200) {
      setError({ ...formError, [e.target.name]: "" });

      setPredata({
        ...preData,
        invoice: response.data.link,
        fileName: e.target.files[0].name,
      });
      dispatch(
        setAlert({
          open: true,
          variant: "success",
          message: response.data.message,
        })
      );
    } else {
      dispatch(
        setAlert({
          open: true,
          variant: "error",
          message: response.data.message || "Something went wrong !!!",
        })
      );
    }
  }

  async function fetchData(id) {
    try {
      const response = await get_rent_data_ID(id);

      console.log(response.data.data[0].invoice_number);
      if (response.data.succes) {
        setPredata({
          ...preData,
          invoice: response.data.data[0].invoice,
          invoice_no: response.data.data[0].invoice_number,
          invoice_date: response.data.data[0].invoice_date,
          rent_amount: parseFloat(response.data.data[0].rent_amount).toFixed(2),
          gst_amount: response.data.data[0].gst_amount,
          // total_amount: parseFloat(
          //   Number(response.data.data[0].rent_amount) +
          //     Number(response.data.data[0].gst_amount)
          // ).toFixed(2),
          status: response.data.data[0].status,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

 

  useEffect(() => {
    fetchData(id);
  }, []);

  async function handleSubmit(e) {
    const send = await sendMonthyPaymentForword(id, {
      status: "Sent To Finance",
      op_id: auth.id,
      rent_amount:  preData.rent_amount ,
      gst_amount:   preData.gst_amount,
      invoice: preData.invoice
    });
    console.log(send.data.success);
    if (send.data.success) {
      dispatch(
        setAlert({
          open: true,
          variant: "success",
          message: "Payment Details Send To Finance Successfully.",
        })
      );
      navigate(-1);
    } else {
      dispatch(
        setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong Please Try Again Later.",
        })
      );
    }
    // console.log(send)
  }

  function handleSendBack() {}

 

  console.log(preData)

  return (
    <>
      <Stack sx={{ flexDirection: "row", mb: 4 }}>
        {/* <a id="button"></a> */}

        <HamburgerMenu
          navigateHome={"operationsDashboard"}
          handleListing={() => navigate("/operationsListing")}
          monthlyRent={() => navigate("/opr-monthly-rent")}
          renewal={() => navigate("/opr-monthly-rent")}
          monthlyBtn="true"
        />

        <Box sx={{ flexGrow: 1 }}>
          <MyHeader>Rental Management System</MyHeader>
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
          <Box component={"form"}>
            <Grid container sx={{ justifyContent: "center", mt: 3 }}>
              {/* Basic Details */}
              <Grid item md={10}>
                <Grid container spacing={2}>
                  <TextFieldWrapper
                    required={true}
                    label="Invoice Number"
                    placeHolder="Enter Invoice Number"
                    value={preData.invoice_no}
                    disabled={true}
                    name="invoice_no"
                  />
                  <TextFieldWrapper
                    required={true}
                    label="Invoice Date"
                    placeHolder="Enter Invoice Date"
                    value={preData.invoice_date}
                    disabled={true}
                    name="invoice_date"
                  />
                  <TextFieldWrapper
                    required={true}
                    label="Year"
                    placeHolder="Enter Invoice Date"
                    value={preData.invoice_date}
                    disabled={true}
                    name="invoice_date"
                  />
                  <TextFieldWrapper
                    required={true}
                    label="Rent Amount"
                    placeHolder="Enter Rent Amount"
                    value={preData.rent_amount}
                    onChange={(e) => handleChange(e)}
                    name="rent_amount"
                    // onBlur={(e) => handleOnBlur(e, i)}
                    // error={ }
                  />
                  <TextFieldWrapper
                    required={true}
                    label="GST Amount"
                    placeHolder="Enter GST AMount"
                    value={preData.gst_amount}
                    onChange={(e) => handleChange(e)}
                    name="gst_amount"
                    // onBlur={(e) => handleOnBlur(e, i)}
                    // error={ }
                  />
                  <TextFieldWrapper
                    required={true}
                    label="Total Amount"
                    placeHolder="Enter Total Amount"
                    value={preData.total_amount}
                    disabled={true}
                    name="total_amount"
                    // onBlur={(e) => handleOnBlur(e, i)}
                    // error={ }
                  />
                  <Grid item xs={8} container>
                    <DocumentUpload
                      uploaded={preData.invoice ? true : false}
                      label="Upload Invoice"
                      placeHolder="Upload Invoice"
                      handleChange={(e) => handleChangeFile(e)}
                      name={"invoice"}
                      fileName={preData.fileName}
                      href={preData.invoice}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* Buttons start here*/}

              {preData.status === "Sent To Operations" && (
                <>
                  {/* <Grid
                  item
                  xs={10}
                  sx={{ mt: 5 }}
                  className={"textFieldWrapper"}
                >
                  <Grid item xs={8}>
                    <TextField
                      type="text"
                      multiline
                      rows={3}
                      fullWidth
                      variant="outlined"
                      label="Remark *"
                      placeholder="Remark *"
                      value={remark}
                      onChange={(e) => setRemark(e.target.value)}
                    />
                  </Grid>
                </Grid> */}
                  <Grid item md={8} sx={{ mt: 4, mb: 2 }}>
                    <Grid
                      container
                      spacing={1}
                      sx={{ justifyContent: "center" }}
                    >
                      <Grid item md={4} xs={11}>
                        <Button
                          variant="contained"
                          sx={{
                            height: "55px",
                            borderRadius: "12px",
                            backgroundColor: "primary",
                            width: "100%",
                            color: "#FFFFFF",
                            textTransform: "capitalize",
                            fontSize: "18px",
                            lineHeight: "20px",
                          }}
                          onClick={handleSubmit}
                        >
                          Approve And Send To Finance
                        </Button>
                      </Grid>
                      <Grid item md={4} xs={11}>
                        <Button
                          variant="outlined"
                          sx={{
                            height: "55px",
                            borderRadius: "12px",
                            width: "100%",
                            textTransform: "capitalize",
                            fontSize: "18px",
                          }}
                          onClick={handleSendBack}
                        >
                          Send Back To Manager
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              )}

              {/* buttons end here */}
            </Grid>
          </Box>
        </Box>
      </Stack>
    </>
  );
}
