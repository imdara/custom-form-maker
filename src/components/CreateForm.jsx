import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import supabase from "../config/supabase";
import { useNavigate } from "react-router-dom";

const CreateForm = ({ user }) => {
  const [field, setField] = useState({ name: "", type: "", required: false });
  const [fields, setFields] = useState([]);
  const [form, setForm] = useState({
    form_name: "",
    created_by: user.email,
    fields: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setField({ ...field, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(field);
    setFields([...fields, field]);
    setField({ name: "", type: "", required: false });
  };

  const createFormHandler = async () => {
    // console.log("Form created successfully!", fields);
    form.fields = JSON.stringify(fields);
    // Create form in the database
    const { data } = await supabase.from("forms").insert([form]);
    console.log(data);
    // Redirect to My Forms page
    navigate("/myforms");
    setFields([]);
  };

  return (
    <div className="createForm">
      <h3>Add Fields</h3>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Required</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.type}</TableCell>
                <TableCell align="right">
                  {row.required ? "yes" : "no"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <form className="formOutline" onSubmit={submitHandler}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl margin="dense">
            <InputLabel htmlFor="fieldName">Field Name: </InputLabel>
            <Input
              onChange={handleChange}
              value={field.name}
              type="text"
              name="name"
              id="fieldName"
              required
            />
          </FormControl>
          <FormControl margin="dense" fullWidth>
            <InputLabel id="fieldType">Field Type: </InputLabel>
            <Select
              onChange={handleChange}
              value={field.type}
              labelId="fieldType"
              id="fieldType"
              name="type"
              label="fieldType"
              required
            >
              <MenuItem value="">--Select Type--</MenuItem>
              <MenuItem value="Number">Number</MenuItem>
              <MenuItem value="String">Text</MenuItem>
              <MenuItem value="Email">Email</MenuItem>
              <MenuItem value="Date">Date</MenuItem>
            </Select>
          </FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Required</FormLabel>
          <RadioGroup
            onChange={handleChange}
            value={field.required}
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={false}
            name="required"
          >
            <FormControlLabel value={false} control={<Radio />} label="No" />
            <FormControlLabel value={true} control={<Radio />} label="Yes" />
          </RadioGroup>
          <Button margin="dense" variant="contained" type="submit">
            Add Field
          </Button>
        </Box>
      </form>
      <div className="form_btn">
        <FormControl margin="dense">
          <InputLabel htmlFor="form_name">Form Name: </InputLabel>
          <Input
            onChange={(e) => setForm({ ...form, form_name: e.target.value })}
            value={form.form_name}
            type="text"
            name="form_name"
            id="form_name"
            required
          />
        </FormControl>
        <Button margin="dense" variant="contained" onClick={createFormHandler}>
          Create Form
        </Button>
      </div>
    </div>
  );
};

export default CreateForm;
