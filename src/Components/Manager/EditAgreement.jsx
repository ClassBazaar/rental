import React, { useEffect, useState } from "react";

//icons
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import VisibilityIcon from "@mui/icons-material/Visibility";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

// MUI Components
import {
  Box,
  Button,
  Grid,
  Typography,
  Stack,
  useTheme,
  useMediaQuery,
  Autocomplete,
  TextField,
  MenuItem,
  IconButton,
  FormControl,
  Collapse,
} from "@mui/material";

// Custom Style Component

import {
  DocumentUpload,
  MyHeader,
  SelectComponent,
  TextFieldWrapper,
} from "../StyledComponent";

// Components

import HamburgerMenu from "../HamburgerMenu";
import YearlyIncrement from "./IncrementType";
// import DialogBox from "./DialogBox";
import {
  add_agreement,
  add_landlord,
  getStateList,
  uploadDoc,
  getDetails,
  getCityList,
  editAgreement,
  getBankName,
  getLocation,
} from "../../Services/Services";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../store/action/action";
import PermissionAlert from "./Alert";
import { useParams, useNavigate } from "react-router-dom";
import { DataFieldStyle, ImageView } from "../StyleComponents/Rental";
import HamburgerManager from "./HamburgerManager";

function EditAgreement({ history }) {
  const navigate = useNavigate();
  const { landloard, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [agreement, setAgreement] = useState([]);
  const { id } = useParams();

  const [buh_id, setBuh_ID] = useState(null);

  const [finance_id, setFinance_ID] = useState(null);

  // modified by yashwant
  const [preData, setPreData] = useState({
    landlord: [],
    area: "",
    code: "",
    lockInYear: "",
    address: "",
    pincode: "",
    state: "",
    city: "",
    locaiton: "",
    noticePeriod: "",
    deposit: "",
    monthlyRent: "",
    yearlyIncrement: "",
    status: "",
    gst_certificate: "",
    draft_agreement: "",
    electricity_bill: "",
    poa: "",
    maintaince_bill: "",
    cheque: "",
    tax_receipt: "",
    noc: "",
    remark: "",
    assets: "",
    property_pic:"",
    type:"",
  });

  async function fetchData() {
    try {
      let response = await getDetails(id);

      console.log(response);
      if (response.status === 200) {
        let {
          id,
          code,
          pincode,
          state,
          address,
          location,
          city,
          lockInYear,
          monthlyRent,
          noticePeriod,
          yearlyIncrement,
          deposit,
          gst_certificate,
          draft_agreement,
          electricity_bill,
          poa,
          maintaince_bill,
          cheque,
          tax_receipt,
          noc,
          tenure,
          year1,
          year2,
          year3,
          year4,
          year5,
          area,
          landlord,
          remark,
          assets,
          property_pic,
          type,
          status
        } = response.data.agreement;

        // const oldAgreements = await get_old_agreement(code)

        setBuh_ID(response.data.buh_id);
        setFinance_ID(response.data.op_id);

        let rent = monthlyRent;
        if (yearlyIncrement === "Percentage") {
          setYearValue({
            year1: 0,
            year2: year2 && parseInt(((year2 - year1) / year1) * 100),
            year3: year3 && parseInt(((year3 - year2) / year2) * 100),
            year4: year4 && parseInt(((year4 - year3) / year3) * 100),
            year5: year5 && parseInt(((year5 - year4) / year4) * 100),
          });
        } else {
          setYearValue({
            year1: 0,
            year2: year2 && year2 - year1,
            year3: year3 && year3 - year2,
            year4: year4 && year4 - year3,
            year5: year5 && year5 - year4,
          });
        }

        setPreData({
          id,
          area,
          code,
          pincode,
          state,
          address,
          location,
          city,
          lockInYear,
          monthlyRent,
          noticePeriod,
          yearlyIncrement,
          deposit,
          gst_certificate,
          draft_agreement,
          electricity_bill,
          poa,
          maintaince_bill,
          cheque,
          tax_receipt,
          noc,
          tenure,
          landlord,
          remark,
          assets,
          property_pic,
          type,
          status
        });

        setFormError({
          id: undefined,
          code: undefined,
          pincode: undefined,
          state: undefined,
          address: undefined,
          location: undefined,
          city: undefined,
          lockInYear: undefined,
          monthlyRent: undefined,
          noticePeriod: undefined,
          yearlyIncrement: undefined,
          deposit: undefined,
          gst_certificate: undefined,
          draft_agreement: undefined,
          electricity_bill: undefined,
          poa: undefined,
          maintaince_bill: undefined,
          cheque: undefined,
          tax_receipt: undefined,
          noc: undefined,
          tenure: undefined,
          landlord: landlord.map((row) => ({})),
          remark: undefined,
          area: undefined,
          property_pic:undefined
        });
      }
    } catch (error) {
      //console.log('err>>',error)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const [docExpand, setDocExpand] = useState(0);

  // useEffect(() => {
  //   codeGenerater();
  // }, []);
  //console.log(">>>>", landloard);
  const [i, setIndex] = useState(0);
  const [data, setData] = useState({
    landlord: [...landloard],
    code: "",
    lockInYear: "",
    noticePeriod: "",
    deposit: "",
    monthlyRent: "",
    yearlyIncrement: "",
    tenure: "",
  });

  useEffect(() => {
    setPreData((old) => ({ ...old, landlord: [...landloard] }));
    setFormError((old) => ({ ...old, landlord: [...landloard] }));
  }, [landloard]);

  const [landblord, setLandblord] = useState([1]);

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [increment, setIncrement] = useState({
    year1: "",
    year2: "",
    year3: "",
    year4: "",
    year5: "",
  });
  const [yearValue, setYearValue] = useState({
    year1: 0,
    year2: 0,
    year3: 0,
    year4: 0,
    year5: 0,
  });

  // Upload Document *
  async function handleChangeCommonFile(e, i) {
    const FD = new FormData();
    console.log(e.target.files[0]);
    console.log(e.target.name);

    FD.append("photo", e.target.files[0]);
    let response = await uploadDoc(FD);
    // console.log(data)
    if (response.status === 200) {
      console.log(e.target.name);
      console.log(formError);
      // setFormError((old) => ({...old,
      //   [e.target.name + i]  : "",
      //   [e.target.name] : "",

      // }));

      // setting the value to appropiate lanlord
      setPreData((old) => ({
        ...old,
        [e.target.name + "_name"]: e.target.files[0].name,
        landlord: old.landlord.map((row, index) => {
          if (i === index) {
            row[e.target.name] = response.data.link;
            return row;
          } else return row;
        }),
        [e.target.name + i]: e.target.files[0].name,
      }));

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
  // Upload Document *
  async function handleChangeFile(e) {
    const FD = new FormData();
    console.log(e.target.files[0]);
    console.log(e.target.name);

    FD.append("photo", e.target.files[0]);
    let response = await uploadDoc(FD);
    // console.log(data)
    if (response.status === 200) {
      console.log(e.target.name);
      console.log(formError);
      setFormError((old) => ({
        ...old,
        [e.target.name + "_name"]: "",
        [e.target.name]: "",
      }));

      setPreData((old) => ({
        ...old,
        [e.target.name]: response.data.link,
        [e.target.name + "_name"]: e.target.files[0].name,
      }));
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

  // use on Change for uncommon fields
  function handleChange(e, i) {
    let error = { state: false, message: null };
    console.log(e.target.name, i);
    switch (e.target.name) {
      case "leeseName":
        if (!e.target.value.match(/^[a-zA-Z ]*$/))
          error = { state: true, message: "Value must be Correct" };
        break;
      case "pincode":
        if (!e.target.value.match(/^.{0,6}$/))
          error = { state: true, message: "Value must be Correct" };
        break;
      case "aadharNo":
        if (!e.target.value.match(/^[0-9]*$/))
          error = { ...error, state: true };
        if (e.target.value.length < 12 && e.target.value.length > 0)
          error = { ...error, message: "Aadhaar number must be of 12 digit." };
        else error = { ...error, message: null };
        break;
      case "mobileNo":
        if (!e.target.value.match(/^[0-9]*$/))
          error = { ...error, state: true };
        if (e.target.value.length < 10 && e.target.value.length > 0)
          error = { ...error, message: "Phone number must be of 10 digit." };
        else error = { ...error, message: null };
        break;
      case "alternateMobile":
        if (!e.target.value.match(/^[0-9]*$/))
          error = { ...error, state: true };
        if (e.target.value.length < 10 && e.target.value.length > 0)
          error = { ...error, message: "Phone number must be of 10 digit." };
        else error = { ...error, message: null };
        break;
      case "bankName":
        if (e.target.value === "Not Found")
          error = { state: true, message: "Value must be Correct" };
        break;
      case "benificiaryName":
        if (!e.target.value.match(/^[a-zA-Z ]*$/))
          error = { state: true, message: "Value must be Correct" };
        break;
      case "accountNo":
        if (!e.target.value.match(/^[0-9]*$/))
          error = { ...error, state: true };
        if (e.target.value.length > 17 && e.target.value.length > 0)
          error = { ...error, message: "Account can be of 17 digit only." };
        else error = { ...error, message: null };
        break;

      case "email":
        // pattern match
        if (
          !e.target.value.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ) &&
          e.target.value.length > 0
        )
          error = {
            ...error,
            message: "Email address should be like example@gmail.com.",
          };
        else error = { ...error, message: null };
        break;
      case "panNo":
        e.target.value = e.target.value.toUpperCase();
        if (
          !e.target.value.match(/^.{0,10}$/) &&
          !e.target.value.match(/^[^@#$%^&*<>'\"/;`%]*$/)
        )
          error = { state: true, message: null };
        // pattern match
        if (
          !e.target.value.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/) &&
          e.target.value.length > 0
        )
          error = {
            ...error,
            message: "PAN number should be like NOOPS8327k.",
          };
        else error = { ...error, message: null };
        break;
      case "gstNo":
        e.target.value = e.target.value.toUpperCase();
        if (!e.target.value.match(/^.{0,15}$/))
          error = { state: true, message: null };
        // pattern match
        if (!checksum(e.target.value) && e.target.value.length > 0)
          error = {
            ...error,
            message: "GST number should be like 27AAPFU0939F1ZV.",
          };
        else error = { ...error, message: null };
        break;
      case "ifscCode":
        e.target.value = e.target.value.toUpperCase();

        if (!e.target.value.match(/^[^@#$%^&*<>'\"/;`%]*$/))
          error = { state: true, message: null };

        break;
      default:
        break;
    }
    if (e.target.name === "ifscCode" && e.target.value.length === 11) {
      console.log(e.target.name);
      getBankDetails(e.target.value, i);
    }
    if (!error.state) {
      if (preData.landlord[i]) {
        setPreData((old) => ({
          ...old,
          landlord: old.landlord.map((row, id) => {
            if (i === id) {
              return {
                ...row,
                [e.target.name]: e.target.value,
              };
            }
            return row;
          }),
        }));
      } else {
        setPreData((old) => ({
          ...old,
          landlord: [
            ...old.landlord,
            {
              [e.target.name]: e.target.value,
            },
          ],
        }));
      }
    }
  }

  // handle Change for common feilds
  function handleCommonChange(e, i) {
    // console.log(e.target.name);
    // console.log(e.target.value);
    // console.log(preData.assets)
    // console.log(data.state);
    var error = { state: false };
    switch (e.target.name) {
      case "location":
        if (!e.target.value.match(/^[^@#$%^&*<>'\"/;`%]*$/))
          error = { state: true, message: "Value must be Correct" };
        break;
      case "address":
        // console.log('state',e.target.value.match(/^[a-zA-Z ]*$/))
        if (!e.target.value.match(/^[^@#$%^&*<>'\"/;`%]*$/))
          error = { state: true, message: "Value must be Correct" };
        break;
      case "pincode":
        if (!e.target.value.match(/^[0-9]*$/))
          error = { state: true, message: "Value must be Correct" };
        break;
      case "lockInYear":
        if (!e.target.value.match(/^[0-9]*$/))
          error = { state: true, message: "Value must be Correct" };
        break;
      case "rental_amount":
        if (!e.target.value.match(/^[0-9]*$/))
          error = { state: true, message: "Value must be Correct" };
        break;
      case "noticePeriod":
        if (!e.target.value.match(/^[0-9]*$/))
          error = { state: true, message: "Value must be Correct" };
        else e.target.value = e.target.value.toLocaleString();
        break;
      case "area":
        if (!e.target.value.match(/^[0-9]*$/))
          error = { state: true, message: "Value must be Correct" };
        else e.target.value = e.target.value.toLocaleString();
        break;
      case "monthlyRent":
        if (!e.target.value.match(/^[0-9]*$/))
          error = { state: true, message: "Value must be Correct" };
        break;
      case "deposit":
        if (!e.target.value.match(/^[0-9]*$/)) error = { state: true };
        break;
      default:
        break;
    }
    console.log(e.target.name, e.target.value);
    if (!error.state) {
      setPreData((old) => ({ ...old, [e.target.name]: e.target.value }));
      console.log(formError);
      setFormError((old) => ({ ...old, [e.target.name]: "" }));
    }
  }

  async function getBankDetails(data, i) {
    try {
      console.log(data);
      let res = await getBankName(data);

      if (res.status === 200) {
        setPreData((old) => ({
          ...old,
          landlord: old.landlord.map((row, index) => {
            if (index === i) {
              return {
                ...row,
                bankName: res.data.BANK,
                branchName: res.data.BRANCH,
              };
            } else return row;
          }),
        }));
      }
    } catch (err) {
      setPreData((old) => ({
        ...old,
        landlord: old.landlord.map((row, index) => {
          if (index === i) {
            return { ...row, bankName: "Not Found", branchName: "" };
          } else return row;
        }),
      }));
    }
  }

  // on form submit

  const handleConfirm = () => {
    setOpen(false);
    // //console.log(data)
    const {
      id,
      code,
      area,
      lockInYear,
      monthlyRent,
      noticePeriod,
      yearlyIncrement,
      deposit,
      gst_certificate,
      draft_agreement,
      electricity_bill,
      poa,
      maintaince_bill,
      tax_receipt,
      noc,
      tenure,
      pincode,
      state,
      address,
      location,
      city,
      landlord,
      assets,
    } = preData;

    APICall(
      {
        modify_date: new Date(),
        assets,
        pincode,
        state,
        address,
        location,
        city,
        area,
        id,
        code,
        lockInYear,
        monthlyRent,
        noticePeriod,
        yearlyIncrement,
        deposit,
        gst_certificate,
        draft_agreement,
        electricity_bill,
        poa,
        maintaince_bill,
        tax_receipt,
        noc,
        tenure,
        ...increment,
        landlord,
        status:( preData.status === "Sent Back From Sr Manager Termination" || 
        preData.status === "Sent Back From BUH Termination" ||
        preData.status === "Sent Back From Operations Termination" ||
        preData.status === "Sent Back From Finance Termination")?"Terminated By Manager":
          finance_id === 0 && (buh_id !== 0)
            ? "Sent To Operations"
            : "Sent To Sr Manager",

        remark: "",
      },
      landlord
    );
  };
  const [expand, setExpand] = useState(0);

  const APICall = async (values, landlordData) => {
    // for renaming the landlord ID to ID
    // landlordData = landlordData.map((row)=>{
    //   row['id'] = row["landlord_id"]
    //   delete row["landlord_id"]
    //   return row
    // })
    console.log(values);
    const agreement = await editAgreement(values);

    if (agreement.status === 200) {
      dispatch(
        setAlert({
          open: true,
          variant: "success",
          message: "Agrement Edited & Submited Successfully",
        })
      );
      navigate(-1);
    }
  };

  useEffect(() => {
    // //console.log(formError)
    if (Object.keys(formError).length === 0 && isSubmit) {
      setOpen(true);
    }
  }, [formError]);

  // form validation
  function validate(data) {
    let field = [
      "draft_agreement",
      "electricity_bill",
      "poa",
      "maintaince_bill",
      "tax_receipt",
      "cheque",
    ];
    preData.landlord.length > 1 && field.push("noc");

    // if (preData.landlord.length > 0) {
    //   preData.landlord.map((row, i) => {
    //     if (row.gstNo) {
    //       field.push(
    //         `${preData.landlord[i].leeseName + "@gst_name"}`.replace(" ", "")
    //       );
    //     }
    //     field.push(
    //       `${preData.landlord[i].leeseName + "@aadhar_card_name"}`.replace(" ", "")
    //     );
    //     field.push(
    //       `${preData.landlord[i].leeseName + "@cheque_name"}`.replace(" ", "")
    //     );
    //     field.push(
    //       `${preData.landlord[i].leeseName + "@pan_card_name"}`.replace(" ", "")
    //     );
    //   });
    // }

    let finalCheck = field.map((row) => {
      if (!data[row]) {
        console.log(row);
        setFormError((old) => ({ ...old, [row]: "Document required." }));
        return true;
      } else {
        setFormError((old) => ({ ...old, [row]: "" }));

        return false;
      }
    });

    console.log(finalCheck.includes(true));
    if (!finalCheck.includes(true)) {
      return true;
    } else return false;
  }
  function validateFields(data) {
    console.log("Validate Called");

    let field = [
      ,
      "lockInYear",
      "noticePeriod",
      "deposit",
      "monthlyRent",
      "tenure",
      "state",
      "city",
      "address",
      "pincode",
      "location",
      "area",
    ];

    let dataError = [];
    if (data.landlord && data.landlord.length > 0) {
      console.log(data.landlord);

      dataError = data.landlord.map((row, i) => ({
        aadharNo: data.landlord[i].aadharNo ? false : "Field is required.",
        panNo: data.landlord[i].panNo ? false : "Field is required.",
        mobileNo: data.landlord[i].mobileNo ? false : "Field is required.",
        email: data.landlord[i].email ? false : "Field is required.",
        ifscCode: data.landlord[i].ifscCode ? false : "Field is required.",
        bankName: data.landlord[i].bankName ? false : "Field is required.",
        accountNo: data.landlord[i].accountNo ? false : "Field is required.",
        benificiaryName: data.landlord[i].benificiaryName
          ? false
          : "Field is required.",
      }));
    }

    console.log(">>>", dataError);
    let finalCheck = field.map((row) => {
      if (!data[row] || data[row] === "") {
        setFormError((old) => ({
          ...old,
          [row]: "Field required.",
          landlord: dataError,
        }));
        return true;
      } else {
        setFormError((old) => ({ ...old, [row]: "", landlord: dataError }));
        return false;
      }
    });

    dataError.map((row, i) => {
      finalCheck.push(Object.values(row).includes("Field is required."));
    });

    console.log("Field Check >>>>", finalCheck.includes(true));
    console.log("Field Check >>>>", formError);
    if (!finalCheck.includes(true)) {
      return true;
    } else return false;
  }
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(">>>",formError)
    console.log(validate(preData), validateFields(preData));

    setPreData((old) => ({ ...old, ...increment }));
    if (validate(preData) && validateFields(preData)) {
      setIsSubmit(true);
      setOpen(true);
    }
  };

  //confirmation alert

  const handleCancel = () => {
    setOpen(false);
  };

  // function for fetching state list
  async function handleStateSearch(e, i) {
    if (e.target.value.length > 4) {
      let response = await getLocation(e.target.value);
      if (response.data[0].PostOffice) {
        let address = response.data[0].PostOffice[0];
        return setPreData((old) => ({
          ...old,
          state: address.State,
          city: address.District,
        }));
      } else {
        return setPreData((old) => ({ ...old, state: "", city: "" }));
      }
    }
  }
  function checksum(g) {
    let regTest = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/.test(
      g
    );
    if (regTest) {
      let a = 65,
        b = 55,
        c = 36;
      return Array["from"](g).reduce((i, j, k, p) => {
        p =
          (p =
            (j.charCodeAt(0) < a ? parseInt(j) : j.charCodeAt(0) - b) *
            ((k % 2) + 1)) > c
            ? 1 + (p - c)
            : p;
        return k < 14
          ? i + p
          : j == ((c = c - (i % c)) < 10 ? c : String.fromCharCode(c + b));
      }, 0);
    }
    return regTest;
  }

  // use on onBlur for uncommon fields
  function handleOnBlur(e, i) {
    let error = { state: false, message: null };
    console.log(e.target.name, e.target.value);
    switch (e.target.name) {
      case "leeseName":
        if (!e.target.value.match(/^[a-zA-Z ]*$/))
          error = { state: true, message: "Value must be Correct" };
        break;
      case "pincode":
        if (!e.target.value.match(/^.{0,6}$/))
          error = { state: true, message: "Value must be Correct" };
        if (e.target.value.length < 6 && e.target.value.length > 0)
          error = { ...error, message: "Pincode number must be of 6 digit." };
        else error = { ...error, message: null };
        break;
      case "aadharNo":
        if (!e.target.value.match(/^[0-9]*$/))
          error = { ...error, state: true };
        if (e.target.value.length < 12 && e.target.value.length > 0)
          error = { ...error, message: "Aadhaar number must be of 12 digit." };
        else error = { ...error, message: null };
        break;
      case "mobileNo":
        if (!e.target.value.match(/^[0-9]*$/))
          error = { ...error, state: true };
        if (e.target.value.length < 10 && e.target.value.length > 0)
          error = { ...error, message: "Phone number must be of 10 digit." };
        else error = { ...error, message: null };
        break;
      case "alternateMobile":
        if (!e.target.value.match(/^[0-9]*$/))
          error = { ...error, state: true };
        if (e.target.value.length < 10 && e.target.value.length > 0)
          error = { ...error, message: "Phone number must be of 10 digit." };
        else error = { ...error, message: null };
        break;
      case "bankName":
        if (!e.target.value === "Not Found")
          error = { state: true, message: "Value must be Correct" };
        break;
      case "benificiaryName":
        if (!e.target.value.match(/^[a-zA-Z ]*$/))
          error = { state: true, message: "Value must be Correct" };
        break;
      case "accountNo":
        if (!e.target.value.match(/^[0-9]*$/))
          error = { ...error, state: true };
        if (e.target.value.length > 17 && e.target.value.length > 0)
          error = { ...error, message: "Account can be of 17 digit only." };
        else error = { ...error, message: null };
        break;

      case "email":
        // pattern match
        if (
          !e.target.value.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ) &&
          e.target.value.length > 0
        )
          error = {
            ...error,
            message: "Email should be like example@gmail.com.",
          };
        else error = { ...error, message: null };
        break;
      case "panNo":
        e.target.value = e.target.value.toUpperCase();
        if (
          !e.target.value.match(/^.{0,10}$/) &&
          !e.target.value.match(/^[^@#$%^&*<>'\"/;`%]*$/)
        )
          error = { state: true, message: null };
        // pattern match
        if (
          !e.target.value.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/) &&
          e.target.value.length > 0
        )
          error = {
            ...error,
            message: "PAN number should be like NOOPS8327k.",
          };
        else error = { ...error, message: null };
        break;
      case "gstNo":
        e.target.value = e.target.value.toUpperCase();
        if (!e.target.value.match(/^.{0,15}$/))
          error = { state: true, message: null };
        // pattern match
        if (!checksum(e.target.value) && e.target.value.length > 0)
          error = { ...error, message: "GST should be like 18AABCU9603R1ZM." };
        else error = { ...error, message: null };
        break;
      case "ifscCode":
        if (
          !e.target.value.match(/^[A-Z]{4}0[A-Z0-9]{6}$/) &&
          e.target.value !== ""
        )
          error = { ...error, message: "Incorrect IFSC" };
        else error = { ...error, message: null };

        break;
      default:
        break;
    }

    console.log(formError);
    if (error.message) {
      if (formError.landlord[i]) {
        setFormError((old) => ({
          ...old,
          landlord: old.landlord.map((row, id) => {
            if (i === id) {
              return {
                ...row,
                [e.target.name]: error.message,
              };
            }
            return row;
          }),
        }));
      } else {
        setFormError((old) => ({
          ...old,
          landlord: [
            ...old.landlord,
            {
              [e.target.name]: error.message,
            },
          ],
        }));
      }
    } else {
      if (formError.landlord[i]) {
        setFormError((old) => ({
          ...old,
          landlord: old.landlord.map((row, id) => {
            if (i === id) {
              return {
                ...row,
                [e.target.name]: "",
              };
            }
            return row;
          }),
        }));
      } else {
        setFormError((old) => ({
          ...old,
          landlord: [
            ...old.landlord,
            {
              [e.target.name]: "",
            },
          ],
        }));
      }
    }
  }

  async function getBankeDetails(data, i) {
    let res = await getBankName(data);
    if (res) {
      setPreData((old) => ({
        ...old,
        landlord: old.landlord.map((row, index) => {
          if (index === i) {
            return { ...row, bankName: res.data.BANK };
          } else return row;
        }),
      }));
    }
  }

  function handleHold() {
    const {
      id,
      area,
      code,
      lockInYear,
      monthlyRent,
      noticePeriod,
      yearlyIncrement,
      deposit,
      gst_certificate,
      draft_agreement,
      electricity_bill,
      poa,
      maintaince_bill,
      tax_receipt,
      noc,
      tenure,
      pincode,
      state,
      address,
      location,
      city,
      landlord,
      assets,
    } = preData;
    console.log(preData);
    console.log(validate(preData), validateFields(preData));
    if (validate(preData) && validateFields(preData)) {
      APICall(
        {
          modify_date: new Date(),
          pincode,
          state,
          address,
          area,
          location,
          city,
          id,
          code,
          lockInYear,
          monthlyRent,
          noticePeriod,
          yearlyIncrement,
          deposit,
          gst_certificate,
          draft_agreement,
          electricity_bill,
          poa,
          maintaince_bill,
          tax_receipt,
          noc,
          tenure,
          ...increment,
          landlord,
          status: "Hold",
          remark: "",
          assets,
        },
        landlord
      );
    }
  }

  function Docview(href, name) {
    console.log("docview");
    return (
      <ImageView open={true} handleClose={() => {}} href={href} name={name} />
    );
  }

  return (
    <>
      {/* alert for submit form */}
      <PermissionAlert
        handleClose={handleCancel}
        handleConfirm={handleConfirm}
        open={open}
        message={"Please check agreement carefully before submission."}
      />
      <Stack sx={{ flexWrap: "nowrap", flexDirection: "row" }}>
        <HamburgerManager/>
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
          <Grid
            item
            xs={12}
            sx={{ justifyContent: "space-between", display: "flex" }}
          >
            <MyHeader>Rental Management System</MyHeader>
            <Typography mt="15px" mr="15px" fontWeight="600">
              Welcome {auth.name}
            </Typography>
          </Grid>

          <Grid container sx={{ justifyContent: "center" }}>
            <Grid item xs={12} md={10}>
              {/* agreement form start here */}
              <Box
                component="form"
                // onSubmit={handleSubmit}
                sx={{
                  py: 5,
                  backgroundColor: "white",
                  mx: 3,
                  borderRadius: "15px",
                  maxWidth: "1050px",
                  "@media(max-width:900px)": { mx: 0 },
                }}
              >
                {/* Basic details start here */}

                <Grid container sx={{ px: 3 }} spacing={isSmall ? 2 : 4}>
                  <TextFieldWrapper
                    label="Code"
                    placeHolder=""
                    disabled={true}
                    backgroundColor="rgba(3, 193, 243, 0.2);"
                    value={preData.code}
                    name="code"
                  />

                  <TextFieldWrapper
                    label="Pincode"
                    placeHolder="Pincode"
                    backgroundColor="rgba(3, 193, 243, 0.2);"
                    value={preData.pincode}
                    required={true}
                    maxLength={6}
                    name="pincode"
                    onChange={(e) => {
                      handleCommonChange(e);
                      handleStateSearch(e);
                    }}
                    error={formError.pincode}
                    disabled={preData.type === "Renewed"? true :false}
                  />

                  <TextFieldWrapper
                    label="State"
                    disabled={true}
                    name="state"
                    required={true}
                    maxLength={6}
                    value={preData.state || ""}
                    error={formError.state}
                  />
                  <Grid
                    item
                    md={4}
                    xs={6}
                    sx={{
                      mb: "0px !important",
                      "@media(max-width:900px)": { my: 1 },
                    }}
                  >
                    <FormControl fullWidth className="textFieldWrapper">
                      <TextField
                        label="City"
                        required={true}
                        disabled={true}
                        error={formError.city}
                        fullWidth
                        name="city"
                        value={preData.city || ""}
                      />
                    </FormControl>
                  </Grid>

                  <TextFieldWrapper
                    label="Location"
                    placeHolder="Enter Location"
                    name="location"
                    error={formError.location}
                    value={preData.location || ""}
                    onChange={handleCommonChange}
                    index={i}
                    disabled={preData.type === "Renewed"? true :false}
                  />

                  <TextFieldWrapper
                    label="Area"
                    placeHolder="Area in sq. ft"
                    name="area"
                    notationVal="sq. ft"
                    textAlignRight={"textAlignRight"}
                    error={formError.area}
                    required={true}
                    value={preData.area}
                    onChange={handleCommonChange}
                    index={i}
                    disabled={buh_id !== 0 ? true : false}
                  />

                  <TextFieldWrapper
                    label="Address"
                    placeHolder="Enter Address"
                    error={formError.address}
                    required={true}
                    name="address"
                    value={preData.address}
                    onChange={handleCommonChange}
                    index={i}
                    disabled={preData.type === "Renewed"? true :false}
                  />
                  <TextFieldWrapper
                    label="Lock In Month(If Applicable)"
                    placeHolder="Enter Lock in Month"
                    name="lockInYear"
                    maxLength={2}
                    value={preData.lockInYear}
                    error={formError.lockInYear}
                    onChange={handleCommonChange}
                    disabled={buh_id !== 0 ? true : false}
                  />
                  <TextFieldWrapper
                    label="Notice Period In Month"
                    placeHolder="Enter Notice Period"
                    error={formError.noticePeriod}
                    name="noticePeriod"
                    maxLength={2}
                    value={preData.noticePeriod}
                    onChange={handleCommonChange}
                    disabled={buh_id !== 0 ? true : false}
                  />
                  <TextFieldWrapper
                    label="Deposit Amount"
                    placeHolder="Enter deposit Amount"
                    name="deposit"
                    textAlignRight={"textAlignRight"}
                    error={formError.deposit}
                    value={preData.deposit}
                    onChange={handleCommonChange}
                    disabled={buh_id !== 0 ? true : false}
                  />
                  {console.log(buh_id !== 0)}
                  <TextFieldWrapper
                    label="Monthly Rental"
                    placeHolder="Enter Rental"
                    required={true}
                    name="monthlyRent"
                    textAlignRight={"textAlignRight"}
                    disabled={buh_id !== 0 ? true : false}
                    error={formError.monthlyRent}
                    value={preData.monthlyRent}
                    onChange={handleCommonChange}
                  />

                 <TextFieldWrapper
                    label="Agreement Tenure"
                    placeHolder="Tenure In Months"
                    name="tenure"
                    notationVal="Month's"
                    textAlignRight={"textAlignRight"}
                    error={formError.tenure}
                    required={true}
                    value={preData.tenure || ""}
                    onChange={handleCommonChange}
                    index={i}
                    maxLength={3}
                    disabled={buh_id !== 0 ? true : false}
                  />
{/* 
                  <SelectComponent
                    label={"Agreement Tenure"}
                    required={true}
                    error={formError.tenure}
                    name="tenure"
                    
                    options={[
                      "11 Month",
                      "2 Year",
                      "3 Year",
                      "4 Year",
                      "5 Year",
                    ]}
                    value={preData.tenure || ""}
                    onChange={handleCommonChange}
                  /> */}
                  {preData.tenure === "" ? null : preData.tenure <=12 ? null : (
                    <SelectComponent
                      label={"Yearly Increment"}
                      required={true}
                      name="yearlyIncrement"
                      options={["Percentage", "Value"]}
                      value={preData.yearlyIncrement}
                      onChange={handleCommonChange}
                      disabled={buh_id !== 0 ? true : false}
                    />
                  )}
                </Grid>

                {/* basic details end here */}

                {/* Increment Yearly */}
                <YearlyIncrement
                  yearValue={yearValue}
                  setYearValue={setYearValue}
                  tenure={preData.tenure || ""}
                  value={preData.yearlyIncrement || ""}
                  rent={preData.monthlyRent || ""}
                  increment={increment}
                  setIncrement={setIncrement}
                  monthlyRent={preData.monthlyRent || ""}
                  disabled={buh_id !== 0 ? true : false}
                />

                {/* landlord Details start here*/}
                <Typography
                  variant="body1"
                  color="var(--main-color)"
                  fontSize="25px"
                  lineHeight="28px"
                  fontWeight="600"
                  my="20px"
                >
                  Landlord Detail
                </Typography>

                {preData.landlord.length > 0 &&
                  preData.landlord.map((_, i) => (
                    <>
                      {preData.landlord.length > 0 && (
                        <Box
                          mb={2}
                          size="small"
                          fullWidth
                          variant="outlined"
                          component={Button}
                          onClick={() => setExpand(expand === i ? -1 : i)}
                          sx={{
                            color: "black",
                            justifyContent: "space-between",
                            backgroundColor: "#b0d6f773",
                          }}
                        >
                          <Typography color={"var( --main-color)"}>
                            {" "}
                            {preData.landlord.length > 0
                              ? preData.landlord[i].leeseName
                              : ""}{" "}
                            Personal Details
                          </Typography>
                          <IconButton
                            onClick={() => setExpand(expand === i ? -1 : i)}
                          >
                            {expand === i ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )}
                          </IconButton>
                        </Box>
                      )}
                      <Collapse in={expand === i} timeout="auto" unmountOnExit>
                        <Grid
                          container
                          sx={{ px: 3, mb: "25px" }}
                          spacing={isSmall ? 2 : 4}
                        >
                          <Grid item xs={12}>
                            {preData.landlord.length > 0 ? (
                              <Typography color={"var( --main-color)"}>
                                {preData.landlord[i].leeseName}
                              </Typography>
                            ) : (
                              ""
                            )}
                          </Grid>

                          <TextFieldWrapper
                            label="Name of Lessor"
                            placeHolder="Enter Name of Lessor"
                            required={true}
                            disabled={true}
                            onBlur={(e) => handleOnBlur(e, i)}
                            // error = {errorObj.leeseName}
                            name="name"
                            value={preData.landlord[i].name}
                            onChange={(e) => handleChange(e, i)}
                          />
                          <TextFieldWrapper
                            label="Aadhar Number"
                            placeHolder="Enter Aadhar No."
                            required={true}
                            onBlur={(e) => handleOnBlur(e, i)}
                            name="aadharNo"
                            maxLength={12}
                            value={preData.landlord[i].aadharNo}
                            onChange={(e) => handleChange(e, i)}
                            index={i}
                            error={
                              formError.landlord[i] &&
                              formError.landlord[i].aadharNo
                                ? formError.landlord[i].aadharNo
                                : ""
                            }
                            disabled={preData.type === "Renewed"? true :false}
                          />
                          <TextFieldWrapper
                            label="PAN Number"
                            placeHolder="Enter PAN No."
                            onBlur={(e) => handleOnBlur(e, i)}
                            error={
                              formError.landlord[i] &&
                              formError.landlord[i].panNo
                                ? formError.landlord[i].panNo
                                : ""
                            }
                            name="panNo"
                            maxLength={10}
                            value={preData.landlord[i].panNo}
                            onChange={(e) => handleChange(e, i)}
                            index={i}
                            disabled={preData.type === "Renewed"? true :false}
                          />

                          <TextFieldWrapper
                            label="Mobile Number"
                            placeHolder="Enter Mobile No."
                            required={true}
                            onBlur={(e) => handleOnBlur(e, i)}
                            name="mobileNo"
                            maxLength={10}
                            error={
                              formError.landlord[i] &&
                              formError.landlord[i].mobileNo
                                ? formError.landlord[i].mobileNo
                                : ""
                            }
                            value={preData.landlord[i].mobileNo}
                            onChange={(e) => handleChange(e, i)}
                            index={i}
                          />
                          <TextFieldWrapper
                            label="Alternate Number"
                            // error={formError.alternteMo}
                            placeHolder="Enter Alternate No."
                            name="alternateMobile"
                            onBlur={(e) => handleOnBlur(e, i)}
                            maxLength={10}
                            value={preData.landlord[i].alternateMobile}
                            // error={formError.alternateMobile}
                            onChange={(e) => handleChange(e, i)}
                            index={i}
                          />

                          <TextFieldWrapper
                            label="Email"
                            placeHolder="Enter Email"
                            onBlur={(e) => handleOnBlur(e, i)}
                            required={true}
                            error={
                              formError.landlord[i] &&
                              formError.landlord[i].email
                                ? formError.landlord[i].email
                                : ""
                            }
                            name="email"
                            value={preData.landlord[i].email}
                            onChange={(e) => handleChange(e, i)}
                            index={i}
                          />
                          <TextFieldWrapper
                            // required={true}
                            label="GST Number"
                            placeHolder="Enter GST No."
                            // required={true}
                            onBlur={(e) => handleOnBlur(e, i)}
                            error={
                              formError.landlord[i] &&
                              formError.landlord[i].gstNo
                                ? formError.landlord[i].gstNo
                                : ""
                            }
                            name="gstNo"
                            maxLength={15}
                            value={preData.landlord[i].gstNo}
                            onChange={(e) => handleChange(e, i)}
                          />
                          <TextFieldWrapper
                            required={true}
                            label="Bank IFSC"
                            placeHolder="Enter IFSC Code"
                            onBlur={(e) => handleOnBlur(e, i)}
                            name="ifscCode"
                            error={
                              formError.landlord[i] &&
                              formError.landlord[i].ifscCode
                                ? formError.landlord[i].ifscCode
                                : ""
                            }
                            value={preData.landlord[i].ifscCode}
                            onChange={(e) => handleChange(e, i)}
                          />

                          <TextFieldWrapper
                            label="Bank Name"
                            placeHolder="Enter Bank Name"
                            name="bankName"
                            onBlur={(e) => handleOnBlur(e, i)}
                            partLabel={
                              preData.landlord[i] &&
                              preData.landlord[i].branchName
                                ? preData.landlord[i].branchName
                                : ""
                            }
                            error={
                              formError.landlord[i] &&
                              formError.landlord[i].bankName
                                ? formError.landlord[i].bankName
                                : ""
                            }
                            required={true}
                            disabled={true}
                            value={preData.landlord[i].bankName}
                            onChange={(e) => handleChange(e, i)}
                          />

                          <TextFieldWrapper
                            required={true}
                            label="Beneficiary Name"
                            onBlur={(e) => handleOnBlur(e, i)}
                            error={
                              formError.landlord[i] &&
                              formError.landlord[i].benificiaryName
                                ? formError.landlord[i].benificiaryName
                                : ""
                            }
                            placeHolder="Enter Beneficiary Name"
                            name="benificiaryName"
                            value={preData.landlord[i].benificiaryName}
                            onChange={(e) => handleChange(e, i)}
                          />
                          <TextFieldWrapper
                            label="Bank A/c Number "
                            required={true}
                            placeHolder="Enter Account No."
                            name="accountNo"
                            error={
                              formError.landlord[i] &&
                              formError.landlord[i].accountNo
                                ? formError.landlord[i].accountNo
                                : ""
                            }
                            value={preData.landlord[i].accountNo}
                            onChange={(e) => handleChange(e, i)}
                          />
                        </Grid>
                      </Collapse>
                    </>
                  ))}

                {/* Bank Details ends here*/}

                {/* Document upload section start here */}

                {/* Document */}
                <Typography
                  variant="body1"
                  color="var(--main-color)"
                  fontSize="25px"
                  lineHeight="28px"
                  fontWeight="600"
                  my="20px"
                >
                  Upload Document *
                </Typography>

                {preData.landlord.length > 0 &&
                  formError.landlord.length > 0 &&
                  preData.landlord.map((_, i) => (
                    <>
                      {preData.landlord.length > 0 && (
                        <Box
                          mb={2}
                          size="small"
                          fullWidth
                          variant="outlined"
                          component={Button}
                          onClick={() => setDocExpand(docExpand === i ? -1 : i)}
                          sx={{
                            color: "black",
                            justifyContent: "space-between",
                            backgroundColor: "#b0d6f773",
                          }}
                        >
                          <Typography color={"var( --main-color)"}>
                            {" "}
                            {preData.landlord.length > 0
                              ? preData.landlord[i].leeseName
                              : ""}{" "}
                            Upload Document *
                          </Typography>
                          <IconButton
                            onClick={() =>
                              setDocExpand(docExpand === i ? -1 : i)
                            }
                          >
                            {docExpand === i ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )}
                          </IconButton>
                        </Box>
                      )}
                      <Collapse
                        in={docExpand === i}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Grid
                          container
                          spacing={isSmall ? 2 : 4}
                          sx={{ px: 1, justifyContent: "", mb: 3 }}
                        >
                          <Grid item xs={12}>
                            <Typography color={"var( --main-color)"}>
                              {preData.landlord[i].leeseName}
                            </Typography>
                          </Grid>

                          {/* {console.log('>>>>',preData.landlord[i])} */}
                          <Grid item xs={6}>
                            <DocumentUpload
                              uploaded={
                                preData[`aadhar_card${i}`] ||
                                preData.landlord[i]["aadhar_card"]
                                  ? true
                                  : false
                              }
                              label="Upload Aadhaar Card"
                              placeHolder="Upload Aadhaar Card"
                              handleChange={(e) => handleChangeCommonFile(e, i)}
                              name={"aadhar_card"}
                              fileName={preData[`aadhar_card${i}`]}
                              href={preData.landlord[i].aadhar_card}
                              disabled={preData.type === "Renewed"? true :false}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <DocumentUpload
                              label="Upload PAN Card"
                              uploaded={
                                preData[`pan_card${i}`] ||
                                preData.landlord[i]["pan_card"]
                                  ? true
                                  : false
                              }
                              name={"pan_card"}
                              fileName={preData[`pan_card${i}`]}
                              placeHolder={"Upload PAN Card"}
                              handleChange={(e) => handleChangeCommonFile(e, i)}
                              href={preData.landlord[i].pan_card}
                              disabled={preData.type === "Renewed"? true :false}
                            />
                          </Grid>
                          {/* {console.log(preData.landlord[i].gst)} */}
                          {preData.landlord[i].gstNo&&
                          <Grid item xs={6}>
                          <DocumentUpload
                            uploaded={
                              preData[`gst${i}`] || preData.landlord[i]["gst"]
                                ? true
                                : false
                            }
                            label="Upload GST Certificate"
                            placeHolder="Upload GST Certificate"
                            handleChange={(e) => handleChangeCommonFile(e, i)}
                            name={"gst"}
                            fileName={preData[`gst${i}`]}
                            href={preData.landlord[i].gst}
                          />
                        </Grid>
                          }
                          
                          <Grid item xs={6}>
                            <DocumentUpload
                              uploaded={
                                preData[`cheque${i}`] ||
                                preData.landlord[i]["cheque"]
                                  ? true
                                  : false
                              }
                              label="Upload Cancel Cheque"
                              name={"cheque"}
                              fileName={preData[`cheque${i}`]}
                              placeHolder="Upload Cancel Cheque"
                              handleChange={(e) => handleChangeCommonFile(e, i)}
                              href={preData.landlord[i].cheque}
                            />
                          </Grid>
                        </Grid>
                      </Collapse>
                    </>
                  ))}

                {landblord.length > 0 ? (
                  <Typography
                    variant="body1"
                    color="var(--main-color)"
                    fontSize="25px"
                    lineHeight="28px"
                    fontWeight="600"
                    my="20px"
                  >
                    Upload Document *
                  </Typography>
                ) : (
                  ""
                )}

                <Grid
                  container
                  spacing={isSmall ? 2 : 4}
                  sx={{ px: 1, justifyContent: "" }}
                >
                  <Grid item xs={6}>
                    <DocumentUpload
                      label="Upload Draft Agreement"
                      uploaded={preData.draft_agreement && true}
                      error={formError.draft_agreement}
                      placeHolder="Upload Draft Agreement"
                      fileName={preData.draft_agreement_name}
                      handleChange={handleChangeFile}
                      name={"draft_agreement"}
                      href={preData.draft_agreement}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DocumentUpload
                      label="Upload Electricity Bill"
                      uploaded={preData.electricity_bill && true}
                      error={formError.electricatiy_bill}
                      placeHolder={"Upload Electricity Bill"}
                      handleChange={handleChangeFile}
                      fileName={preData.electricity_bill_name}
                      name={"electricity_bill"}
                      href={preData.electricity_bill}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DocumentUpload
                      label="Upload POA (If Applicable)"
                      placeHolder="Upload POA"
                      error={formError.poa}
                      uploaded={preData.poa && true}
                      fileName={preData.poa_name}
                      handleChange={handleChangeFile}
                      name={"poa"}
                      href={preData.poa}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DocumentUpload
                      label="Upload Maintaince Bill"
                      uploaded={preData.maintaince_bill && true}
                      placeHolder={"Upload Maintaince Bill"}
                      error={formError.maintaince_bill}
                      handleChange={handleChangeFile}
                      fileName={preData.maintaince_bill_name}
                      name={"maintaince_bill"}
                      href={preData.maintaince_bill}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DocumentUpload
                      label="Upload Property Tax Receipt"
                      uploaded={preData.tax_receipt && true}
                      placeHolder={"Upload Property Tax Receipt"}
                      handleChange={handleChangeFile}
                      fileName={preData.tax_receipt_name}
                      error={formError.tax_receipt}
                      name={"tax_receipt"}
                      href={preData.tax_receipt}
                    />
                  </Grid>
                  {preData.landlord.length > 1 && (
                    <Grid item xs={6}>
                      <DocumentUpload
                        uploaded={preData.noc && true}
                        label="Upload NOC (If Mutiple Oweners)"
                        error={formError.noc}
                        placeHolder="NOC"
                        fileName={preData.noc_name}
                        handleChange={handleChangeFile}
                        name={"noc"}
                        href={preData.noc}
                      />
                    </Grid>
                  )}
                  <Grid item xs={6}>
                    <DocumentUpload
                      label="Upload Property Picture"
                      uploaded={preData.property_pic && true}
                      placeHolder={"Upload Property Picture"}
                      handleChange={handleChangeFile}
                      fileName={preData.property_name}
                      error={formError.property_pic}
                      name={"property_pic"}
                      href={preData.property_pic}
                    />
                  </Grid>
                </Grid>


                <Grid
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
                      label="Landlord Assets *"
                      placeholder="Landlord Assets *"
                      value={preData.assets}
                      name={"assets"}
                      onChange={handleCommonChange}
                    />
                  </Grid>
                </Grid>
                {/* Document upload section end here */}

                {preData.remark.length > 0 && (
                  <Grid item container xs={10} sx={{ mt: 5 }}>
                    <DataFieldStyle field={"Remark !"} value={preData.remark} />
                  </Grid>
                )}


                {/* Button Start from here */}
               
                  <Grid
                  container
                  sx={{ justifyContent: "center", mt: 2 }}
                  spacing={4}
                >
                  <Grid item md={4} xs={6}>
                    <Button
                      onClick={handleSubmit}
                      variant="contained"
                      type="submit"
                      color="primary"
                      sx={{
                        height: "60px",
                        width: "100%",
                        borderRadius: "20px",
                        fontSize: "16px",
                        color: "#FFFFFF",
                        lineHeight: "32px",
                        textTransform: "capitalize",
                        "@media(max-width:900px)": {
                          fontSize: "11px",
                          lineHeight: "12px",
                          height: "40px",
                        },
                      }}
                    >
                      {console.log(finance_id ,buh_id )}
                      {console.log(finance_id === 0 && ( buh_id !== 0))}
                      
                      {( preData.status === "Sent Back From Sr Manager Termination" || 
                  preData.status === "Sent Back From Operations Termination" ||
                  preData.status === "Sent Back From Finance Team Termination")? "Sent To Sr Manager Termination":
                      finance_id === 0 && ( buh_id !== 0 )
                        ? "Send To Operations"
                        : "Send To Sr Manager"}
                    </Button>
                  </Grid>

                  <Grid item md={4} xs={6}>
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{
                        height: "60px",
                        width: "100%",
                        borderRadius: "20px",
                        fontSize: "16px",
                        lineHeight: "32px",
                        textTransform: "capitalize",
                        "@media(max-width:900px)": {
                          fontSize: "10px",
                          lineHeight: "20px",
                          height: "40px",
                        },
                      }}
                      onClick={handleHold}
                    >
                      Save As Draft
                    </Button>
                  </Grid>
                </Grid>
                
                {/* Button Ends Here */}



              </Box>

              {/* agreemenet from end here */}
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </>
  );
}

export default EditAgreement;
