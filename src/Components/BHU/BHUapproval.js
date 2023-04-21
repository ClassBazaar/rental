import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  Link,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import HamburgerMenu from "../HamburgerMenu";
import { DataFieldStyle, YearField } from "../StyleComponents/Rental";
import { MyHeader, TextFieldWrapper } from "../StyledComponent";
import { useEffect, useState } from "react";
import {
  get_agreement_id,
  send_back_to_manager,
} from "../../Services/Services";
import DialogBoxSBM from "../RentalPortal/DialogBoxSBM";
import { useDispatch, useSelector } from "react-redux";

import { send_to_operations } from "../../Services/Services";

//download file
import { setAlert } from "../../store/action/action";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

const Heading = ({ heading }) => {
  return (
    <Grid item xs={11} sx={{ mt: 6, mb: 2 }}>
      <Typography
        variant="body1"
        fontSize={"20px"}
        color={"primary"}
        fontWeight={"600"}
        sx={{textDecoration:"underline"}}
      >
        {heading}
      </Typography>
    </Grid>
  );
};

function SrManagerApproval() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [agreement, setAgreement] = useState({});
  const [ids, setIds] = useState([]);

  const [sendBackMsg, setSendBackMsg] = useState("");

  const { auth } = useSelector((s) => s);

  const srm_id = auth.id;

  const dispatch = useDispatch();

  const getData = async (id) => {
    const agreement = await get_agreement_id(id);
    setAgreement(agreement.data.agreement);
    setIds(agreement.data.ids);
    setSendBackMsg(agreement.data.agreement[ids[0]].remark);
    console.log(agreement);
  };

  useEffect(() => {
    getData(id);
  }, []);

  const handleSubmit = async (e) => {
    if (sendBackMsg.length <= 0) {
      dispatch(
        setAlert({
          variant: "error",
          open: true,
          message: "Remark Required !.",
        })
      );
    } else {
      const response = await send_to_operations(
        { status: "Sent To Operations", bhu_id: srm_id, remark: sendBackMsg },
        id
      );
      if (response.data.success) {
        dispatch(
          setAlert({
            vatiant: "success",
            open: true,
            message: "Approved And Sent To Operations",
          })
        );
        navigate("/BHUListing");
      } else {
        dispatch(
          setAlert({
            vatiant: "error",
            open: true,
            message: "Something went wrong! Please again later.",
          })
        );
      }
    }
  };

  //Send Back to manager
  async function handleSendBack() {
    if (sendBackMsg.length <= 0) {
      dispatch(
        setAlert({
          variant: "error",
          open: true,
          message: "Remark Required !.",
        })
      );
    } else {
      const response = await send_back_to_manager(
        {
          status: "Sent Back From BUH",
          remark: sendBackMsg,
        },
        id
      );
      if (response.data.success) {
        dispatch(
          setAlert({
            variant: "success",
            open: true,
            message: "Send back For Rectification",
          })
        );
        navigate("/BHUListing");
      } else {
        dispatch(
          setAlert({
            variant: "error",
            open: true,
            message: "Something went wrong! Please again later.",
          })
        );
      }
    }
  }

  function getIncrement(rent, value, type) {
    let incrementType;
    rent = Number(rent);
    value = Number(value);
    if (type === "Percentage") {
      incrementType = `${parseInt(((value - rent) / rent) * 100)}%`;
    } else if (type === "Value") {
      incrementType = value - rent;
    }
    return incrementType;
  }

  return (
    <>
      {ids.length > 0 && (
        <Stack sx={{ flexDirection: "row", mb: 4 }}>
           <HamburgerMenu
          navigateHome={"BHUDashboard"}
          handleListing={() => navigate("/BHUListing")}
          // monthlyRent={() => navigate("/buh-monthly-rent")}
          // renewal={() => navigate("/buh-monthly-rent")}
          // monthlyBtn="true"
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
          <Box sx={{ flexGrow: 1 }}>
            <Grid container sx={{ justifyContent: "center", mt: 2 }}>
              <Grid item xs={12}>
                <MyHeader>Rental Management System</MyHeader>
              </Grid>

              {/* Basic Details */}
              <Grid item md={10} sx={{ mt: 2 }}>
              {agreement[ids[0]].status === "Deposited" && (
                  <>
                    <Grid container >
                      <DataFieldStyle
                        field={"Final Agreement"}
                        href={agreement[ids[0]].final_agreement}
                        name={"Final Agreement"}
                        bold={true}
                        cursor={true}
                      />
                      <DataFieldStyle
                        field={"Final Agreement Date"}
                        value={agreement[ids[0]].final_agreement_date}
                      />
                      <DataFieldStyle
                        field={"Monthly Rent Start Date"}
                        value={agreement[ids[0]].rent_start_date}
                      />
                    </Grid>
                    <Grid container sx={{ mt: 1 }}>
                      <DataFieldStyle
                        field={"Deposit UTR Number"}
                        value={agreement[ids[0]].utr_number}
                      />
                      <DataFieldStyle
                        field={"Deposit Payment Date"}
                        value={agreement[ids[0]].rent_start_date}
                      />
                    </Grid>
                  </>
                )}

                <Grid container sx={{ mt: 2}}>
                  <DataFieldStyle
                    field={"code"}
                    value={agreement[ids[0]].code}
                  />

                  <DataFieldStyle
                    field={"state"}
                    value={agreement[ids[0]].state}
                  />
                   <DataFieldStyle
                    field={"city"}
                    value={agreement[ids[0]].city}
                  />
                  <DataFieldStyle
                    field={"location"}
                    value={agreement[ids[0]].location}
                  />
                 
                  <DataFieldStyle
                    field={"pincode"}
                    value={agreement[ids[0]].pincode}
                  />
                  <DataFieldStyle
                    field={"address"}
                    value={agreement[ids[0]].address}
                  />
                  <DataFieldStyle
                    field={"area"}
                    value={agreement[ids[0]].area + " sq. ft"}
                  />
                  <DataFieldStyle
                    field={"lock in month"}
                    value={agreement[ids[0]].lockInYear}
                  />
                  <DataFieldStyle
                    field={"notice period in month"}
                    value={agreement[ids[0]].noticePeriod}
                  />
                  <DataFieldStyle
                    field={"deposit"}
                    value={agreement[ids[0]].deposit}
                  />
                  <DataFieldStyle
                    field={"monthly rental"}
                    value={agreement[ids[0]].monthlyRent}
                  />
                  <DataFieldStyle
                    field={"tenure"}
                    value={agreement[ids[0]].tenure}
                  />
                  {agreement[ids[0]].tenure !== "11 Month" && (
                    <>
                      
                      <Grid container spacing={1} sx={{ mt: 6 }}>
                        <Grid item xs={12} sx={{mb:1}}>
                        <DataFieldStyle
                        field={"yearly Increment"}
                        value={agreement[ids[0]].yearlyIncrement}
                      />
                        </Grid>
                        <YearField
                          year={"Year 1"}
                          incrementType={agreement[ids[0]].yearlyIncrement}
                          Increment={0}
                          amount={agreement[ids[0]].year1}
                        />
                        <YearField
                          year={"Year 2"}
                          incrementType={agreement[ids[0]].yearlyIncrement}
                          amount={agreement[ids[0]].year2}
                          Increment={getIncrement(
                            agreement[ids[0]].year1,
                            agreement[ids[0]].year2,
                            agreement[ids[0]].yearlyIncrement
                          )}
                        />
                        {(agreement[ids[0]].tenure === "3 Year" ||
                          agreement[ids[0]].tenure === "4 Year" ||
                          agreement[ids[0]].tenure === "5 Year") && (
                          <YearField
                            year={"Year 3"}
                            incrementType={agreement[ids[0]].yearlyIncrement}
                            amount={agreement[ids[0]].year3}
                            Increment={getIncrement(
                              agreement[ids[0]].year2,
                              agreement[ids[0]].year3,
                              agreement[ids[0]].yearlyIncrement
                            )}
                          />
                        )}
                        {(agreement[ids[0]].tenure === "4 Year" ||
                          agreement[ids[0]].tenure === "5 Year") && (
                          <YearField
                            year={"Year 4"}
                            incrementType={agreement[ids[0]].yearlyIncrement}
                            amount={agreement[ids[0]].year4}
                            Increment={getIncrement(
                              agreement[ids[0]].year3,
                              agreement[ids[0]].year4,
                              agreement[ids[0]].yearlyIncrement
                            )}
                          />
                        )}
                        {agreement[ids[0]].tenure === "5 Year" && (
                          <YearField
                            year={"Year 5"}
                            incrementType={agreement[ids[0]].yearlyIncrement}
                            amount={agreement[ids[0]].year5}
                            Increment={getIncrement(
                              agreement[ids[0]].year4,
                              agreement[ids[0]].year5,
                              agreement[ids[0]].yearlyIncrement
                            )}
                          />
                        )}
                      </Grid>
                    </>
                  )}

                 
                </Grid>
              </Grid>

                <Grid item xs={10} sx={{ mt: 5 }}>
                  <DataFieldStyle
                    field={"Remark"}
                    value={agreement[ids[0]].remark}
                  />
                </Grid>

              {agreement[ids[0]].status === "Sent To BUH" && (
                <>
                  <Grid item container xs={10} sx={{ mt: 5 }}>
                    <Grid item xs={8} className="textFieldWrapper">
                      <TextField
                        type="text"
                        multiline
                        rows={3}
                        fullWidth
                        variant="outlined"
                        label="Remark *"
                        placeholder="Remark *"
                        value={sendBackMsg}
                        onChange={(e) => setSendBackMsg(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <Grid item md={8} sx={{ mt: 4, mb: 2 }}>
                    <Grid
                      container
                      spacing={1}
                      sx={{ justifyContent: "space-evenly" }}
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
                            lineHeight:"20px"
                          }}
                          onClick={handleSubmit}
                        >
                          Approve And Send To Operations
                        </Button>
                      </Grid>
                      <Grid item md={4} xs={11}>
                        <Button
                          variant="outlined"
                          sx={{
                            color: "var(--main-color)",
                            height: "55px",
                            borderRadius: "12px",
                            backgroundColor: "primary",
                            width: "100%",
                            textTransform: "capitalize",
                            fontSize: "18px",
                            lineHeight:"20px"
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
        </Stack>
      )}
    </>
  );
}

export default SrManagerApproval;
