import { useEffect, useState } from "react";
import supabase from "../config/supabase";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const MyForms = ({ user }) => {
  console.log(user);
  const [forms, setForms] = useState([]);
  const fetchForms = async () => {
    const { data } = await supabase
      .from("forms")
      .select("*")
      .eq("created_by", user.email);
    data.forEach((item) => (item.fields = JSON.parse(item.fields)));
    console.log(data);
    setForms(data);
  };
  const deleteHandler = async (id) => {
    await supabase.from("forms").delete().eq("id", id);
    fetchForms();
  };
  useEffect(() => {
    fetchForms();
  }, []);
  return (
    <>
      <h3>My Forms</h3>
      <div className="formList">
        {forms.map((form) => (
          <li key={form.id} className="formListItem">
            <h4>{form.form_name}</h4>
            <p>Creator: {form.created_by}</p>
            <p>Fields: {form.fields.map((item) => item.name).join(", ")}</p>
            <p style={{ display: "flex", justifyContent: "space-between" }}>
              <Link to="/forms/:id">Open Form</Link>
              <DeleteIcon
                style={{ cursor: "pointer" }}
                onClick={() => deleteHandler(form.id)}
              />
            </p>
          </li>
        ))}
      </div>
    </>
  );
};

export default MyForms;
