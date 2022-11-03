import React,{useState,useEffect} from "react";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CreateIcon from '@material-ui/icons/Create';
import classes from "./AddExpense.module.css";


export default function AddExpense({props,members}) {
  const [open, setOpen] = React.useState(false);
  const [label,setLabel] = React.useState("Food");
  const [paidBy,setPaidBy] = React.useState('');
  const [split,setSplit] = React.useState("equal");
  const [amount,setAmount] = React.useState();
  const [checkAmount,setCheckAmount] = React.useState([]);
  const [description,setDescription] = React.useState("");
  
 
  

  const handleChangePaidBy = (e) => {
    e.preventDefault();
    const newname = e.target.value;
    setPaidBy(newname);
  };

  const handleClickOpen = (e) => {
    e.preventDefault();
    const arr = new Array(members.length).fill(0);
    setCheckAmount(arr);
    setPaidBy(members[0]);
    setOpen(true);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };
  const handleDescription=(e)=>{
    e.preventDefault();
    setDescription(e.target.value);
  }
  const handleChangeLabel=(e)=>{
    e.preventDefault();
    console.log(label);
    setLabel(e.target.value);
  }
  const handleAmount = (e)=>{
    e.preventDefault();
    const amt = e.target.value;
    const regex = /^[0-9-+()]*$/;
    setAmount(regex.test(amt)?amt:amount);
  }
  function evil(fn) {
    return new Function('return ' + fn)();
  }
  const handleCal=(e)=>{
    e.preventDefault();
    setAmount(evil(amount));
  }
  const handleChangeCal=(e)=>{
    e.preventDefault();
    const splitType = e.target.value;
    setSplit(splitType);
  }
  const handleInputAmount=(e)=>{
    e.preventDefault();
    let newAmount = checkAmount;
    for(let i in members){
      newAmount += checkAmount[i].target.value;
    }
    
    setCheckAmount(newAmount);
  }

  return (
    <div>
      <Button
        variant="contained"
        onClick={members.length===0 ? ()=>alert("Please select friends") : handleClickOpen}
        className={classes.btn}
        // disabled={members.length>0?false:true}
      >
        +Expense
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        style={{maxHeight:"100%"}}
      >
        <DialogTitle id="form-dialog-title" className={classes.modal_nav}>
          <span>Add Expense</span>
        </DialogTitle>
        <DialogContent className={classes.dialog} style={{overflowY:"visible"}}>
          <DialogContentText>
            <div className={classes.content_text}>
            <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  component="form"
                  sx={{ mt: 3 }}
                >
                <div className={classes.table_div}>
                <table className={classes.table}>
                <tr>
                  <td>Label</td>
                  <td>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={label}
                        variant="outlined"
                        onChange={handleChangeLabel}
                        IconComponent={CreateIcon}
                        fullWidth
                    >
                        <MenuItem value={"Food"}>Food</MenuItem>
                        <MenuItem value={"Groccery"}>Groccery</MenuItem>
                        <MenuItem value={"Electric"}>Electric</MenuItem>
                        <MenuItem value={"Trip"}>Trip</MenuItem>
                        <MenuItem value={"Petrol"}>Petrol</MenuItem>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td>Amount</td>
                  <td>
                  <TextField
                        required
                        fullWidth
                        name="amount"
                        type="text"
                        value={amount}
                        onChange={handleAmount}
                        onBlur={handleCal}
                        InputProps={{ inputProps: { min: 1 } }}
                        id="quantity"
                        variant="outlined"
                        autoComplete="amount"
                      />
                  </td>
                </tr>
                <tr>
                  <td>Paid By</td>
                  <td>
                    <Select
                        fullWidth
                        value={paidBy}
                        variant="outlined"
                        onChange={handleChangePaidBy}
                        IconComponent={CreateIcon}
                      >
                      {members.map((item,index)=>{
                        return(
                        <MenuItem key={index} value={item}>{item}</MenuItem>
                        )
                      })}
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td>Split</td>
                  <td>
                    <Select
                      fullWidth
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={split}
                      variant="outlined"
                      onChange={handleChangeCal}
                      IconComponent={CreateIcon}
                    >
                      <MenuItem value={"equal"}>EQUAL</MenuItem>
                      <MenuItem value={"unequal"}>UNEQUAL</MenuItem>
                      <MenuItem value={"percentage"}>PERCENTAGE</MenuItem>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td>Description</td>
                  <td>
                    <TextField
                        className={classes.Textfield}
                        required
                        fullWidth
                        id="description"
                        name="description"
                        value={description}
                        type="text"
                        variant="outlined"
                        autoComplete="description"
                      />
                  </td>
                </tr>
                </table>
                  <div className={classes.container}>
                    {/* unequal block */}
                    {split === "unequal" ? 
                      <div className={classes.block}>
                        <div className={classes.block_div}>
                          <table className={classes.block_table}>
                            {members.map((item,index)=>{
                              return(
                                <tr key={index}>
                                  <td className={classes.table_td}>{item}</td>
                                  <td className={classes.table_td}>
                                    <span>Rs.
                                    <span><input onChange={handleInputAmount} name={index} value={checkAmount[index]} className={classes.input_amount} type="number" /></span>
                                    </span>
                                  </td>
                              </tr>
                              )
                            })}
                          </table>
                        </div>
                        <div style={{textAlign:"center"}}>
                          <p>Rs.{checkAmount} of Rs.{amount}</p>
                          <p>Rs.{amount-checkAmount} left</p>
                        </div>
                      </div> : false}
                    {/* ends here */}

                    {/* percentage block */}
                    {split === "percentage" ? 
                      <div className={classes.block}>
                        <div style={{width:'100%'}}>
                          <table style={{width:"100%",padding:"1px"}}>
                            {members.map((item,index)=>{
                              return(
                                <tr key={index}>
                                  <td style={{textAlign:"center"}}>{item}</td>
                                  <td style={{textAlign:"center"}}>
                                    <span><input className={classes.input_amount} type="number" />%</span>
                                  </td>
                                </tr>
                              )
                            })}
                            </table>
                        </div>
                        <div item xs={12} sm={12}>
                          <div style={{textAlign:"center"}}>
                            <p>total % of 100%</p>
                            <p>left% left</p>
                          </div>
                        </div>
                    </div> 
                    : false}
                    {/* ends here */}
                  </div>
                  </div>
                </Box>
              </Box>
            </div>
           </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.modal_nav}>
          <Button onClick={handleClose} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleClose} color="secondary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}