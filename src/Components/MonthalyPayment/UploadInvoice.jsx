import {
  Box,
  Button,
  Dialog,
  DialogActions,
  FormControl,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { DocumentUpload } from "../StyledComponent";
import { setAlert } from "../../store/action/action";
import { useDispatch } from "react-redux";
import { uploadDoc } from "../../Services/Services";

const labelStyle = {
  fontSize: "20px",
  lineHeight: "30px",
  color: "var(--main-color)",
  fontWeight: "600",
  "@media(max-width:900px)": { fontSize: "10px" },
};

const fieldStyle = {
  border: "1px solid var(--main-color)",
  borderRadius: "20px",
  //   height: "50px",
  p: 1,
  px: 2,
  // width: "450px",

  color: "rgba(16, 99, 173, 0.47)",
  "@media(max-width:900px)": { height: "46px", p: 1 },
};

function UploadInvoice({ open, handleClose, handleConfirm, value, setValue }) {
  const [formError, setFormError] = useState({
    invoiceNo: "",
    invoiceDate: "",
    rentAmount: "",
    gstAmount: "",
    totalAmount: "",
    invoice: "",
    invoice_file_name: "",
  });

  function onChange(e) {
    setFormError({
      ...formError,
      [e.target.name]: "",
    });
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  }

  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate() + 1).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };


  function validate() {
    let error = {};
    // console.log(e.target.name);
    if (value.invoiceNo === "") {
      error.invoiceNo = "Please Enter Invoice Number.";
      setFormError(error);
      return false;
    } else if (value.invoiceDate === "") {
      error.invoiceDate = "Please Select Invoice Date.";
      setFormError(error);
      return false;
    } else if (value.rentAmount === "") {
        error.rentAmount = "Please Enter Rent Amount.";
        setFormError(error);
        return false;
      } else if (value.gstAmount === "") {
        error.gstAmount = "Please Enter GST Amount.";
        setFormError(error);
        return false;
      } else if (value.totalAmount === "") {
        error.totalAmount = "Please Enter Total Amount.";
        setFormError(error);
        return false;
      }else if (value.invoice === "") {
        error.invoice = "Please Upload Invoice.";
        setFormError(error);
        return false;
      }
    handleConfirm();
  }

  function handleSubmit(e) {
    e.preventDefault();
    validate();
  }

  const dispatch = useDispatch();


  async function onfileChange(e) {
    const FD = new FormData();
    console.log(e.target.files[0]);
    FD.append("photo", e.target.files[0]);
    let response = await uploadDoc(FD);

    if (response.status === 200) {
        setFormError({ ...formError, [e.target.name]: "" });

      setValue({
        ...value,
        invoice: response.data.link,
        invoice_file_name: e.target.files[0].name,
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

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: { borderRadius: 18 },
        }}
      >
        <Box sx={{ pt: 5, px: 2, pb: 2 }}>
          <Grid container spacing={2}>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <FormLabel>
                  <Typography variant="body1" sx={labelStyle}>
                    Invoice Number
                  </Typography>
                </FormLabel>
                <TextField
                  variant="standard"
                  onChange={(e) => onChange(e)}
                  InputProps={{
                    disableUnderline: true,
                    style: {
                      color: "rgba(16, 99, 173, 0.47)",
                      fontSize: "15px",
                    },
                  }}
                  inputProps={{ maxLength: 22 }}
                  value={value.invoiceNo}
                  fullWidth
                  name="invoiceNo"
                  sx={fieldStyle}
                  placeholder="Invoice Number"
                />
                <Typography variant="body1" color="red" mt={1}>
                  {formError.invoiceNo}
                </Typography>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <FormLabel>
                  <Typography variant="body1" sx={labelStyle}>
                    Invoice Date
                  </Typography>
                </FormLabel>
                <input
                  type="date"
                  name="invoiceDate"
                  value={value.invoiceDate}
                  min={disablePastDate()}
                  className="DatePicker"
                  onChange={(e) => onChange(e)}
                />
                <Typography variant="body1" color="red" mt={1}>
                  {formError.invoiceDate}
                </Typography>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <FormLabel>
                  <Typography variant="body1" sx={labelStyle}>
                    Rent Amount
                  </Typography>
                </FormLabel>
                <TextField
                  variant="standard"
                  onChange={(e) => onChange(e)}
                  InputProps={{
                    disableUnderline: true,
                    style: {
                      color: "rgba(16, 99, 173, 0.47)",
                      fontSize: "15px",
                    },
                  }}
                  inputProps={{ maxLength: 22 }}
                  value={value.rentAmount}
                  fullWidth
                  name="rentAmount"
                  sx={fieldStyle}
                  placeholder="Rent Amount"
                />
                <Typography variant="body1" color="red" mt={1}>
                  {formError.rentAmount}
                </Typography>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <FormLabel>
                  <Typography variant="body1" sx={labelStyle}>
                    GST Amount
                  </Typography>
                </FormLabel>
                <TextField
                  variant="standard"
                  onChange={(e) => onChange(e)}
                  InputProps={{
                    disableUnderline: true,
                    style: {
                      color: "rgba(16, 99, 173, 0.47)",
                      fontSize: "15px",
                    },
                  }}
                  inputProps={{ maxLength: 22 }}
                  value={value.gstAmount}
                  fullWidth
                  name="gstAmount"
                  sx={fieldStyle}
                  placeholder="GST Amount"
                />
                <Typography variant="body1" color="red" mt={1}>
                  {formError.gstAmount}
                </Typography>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <FormLabel>
                  <Typography variant="body1" sx={labelStyle}>
                    Total Amount
                  </Typography>
                </FormLabel>
                <TextField
                  variant="standard"
                  onChange={(e) => onChange(e)}
                  InputProps={{
                    disableUnderline: true,
                    style: {
                      color: "rgba(16, 99, 173, 0.47)",
                      fontSize: "15px",
                    },
                  }}
                  inputProps={{ maxLength: 22 }}
                  value={value.totalAmount}
                  fullWidth
                  name="totalAmount"
                  sx={fieldStyle}
                  placeholder="GST Amount"
                />
                <Typography variant="body1" color="red" mt={1}>
                  {formError.totalAmount}
                </Typography>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <DocumentUpload
                  label={"Upload Invoice"}
                  placeHolder={"Upload Invoice"}
                  name="invoice"
                  handleChange={onfileChange}
                  uploaded={value.invoice && true}
                  fileName={value.invoice}
                  error={formError.invoice}
                />
              </FormControl>
            </Grid>
            
          </Grid>

          <DialogActions sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    height: 45,
                    borderRadius: "15px",
                    textTransform: "capitalize",
                  }}
                  onClick={handleClose}
                >
                  Close
                </Button>
              </Grid>

              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    height: 45,
                    color: "#FFFFFF",
                    borderRadius: "15px",
                    textTransform: "capitalize",
                  }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}

export default UploadInvoice;