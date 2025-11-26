import { useEffect, useState } from "react";
import {
  Container,
  IconButton,
  InputAdornment,
  ListItemText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addSpentType } from "../../redux/profileSlice";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import EditIcon from "@mui/icons-material/Edit";
import { useFormik } from "formik";
import * as Yup from "yup";
import DSFormInputComponent from "../../components/commons/ds/ds-input/ds-input.component";
import DSButtonComponent from "@components/commons/ds/ds-button/ds-button.component";
import CleaningServicesOutlinedIcon from "@mui/icons-material/CleaningServicesOutlined";

const SpentTypeAdmin = () => {
  const dispatch = useDispatch();

  const spentTypes = useSelector((state) => state.profileUser.spentTypes);

  const [isNew, setIsNew] = useState(true);
  const [selectedValue, setSelectedValue] = useState("");
  const [spentTypesList, setSpentTypesList] = useState([]);
  const [endAdornment, setEndAdornment] = useState(null);

  useEffect(() => {
    setSpentTypesList(spentTypes);
    setSelectedValue("");
  }, [dispatch, spentTypes]);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: Yup.object({
      name: Yup.string().required("Campo requerido"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (isNew) {
        const id = spentTypes.length + 1;
        const newItem = { id: id, name: values.name };

        const newSpentTypes = [...spentTypes, newItem];
        dispatch(addSpentType({ spentTypes: newSpentTypes }));
      } else {
        const updatedItem = { id: values.id, name: values.name };

        const newSpentTypes = spentTypes.map((item) =>
          item.id === values.id ? updatedItem : item
        );
        dispatch(addSpentType({ spentTypes: newSpentTypes }));
      }

      setIsNew(true);
      resetForm();
    },
  });

  const handleEdit = (catalog) => {
    formik.setValues({ name: catalog.name });
    formik.setFieldValue("id", catalog.id);

    setIsNew(false);
    setSelectedValue(catalog.name);
    setEndAdornment(renderEndAdornment());
  };

  const customHandleChange = (e) => {
    const value = e.target.value;

    const filteredValues = spentTypes.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    formik.setFieldValue("name", value);
    setSelectedValue(value);
    setSpentTypesList(filteredValues);
    if (value) {
      setEndAdornment(renderEndAdornment());
    } else {
      setEndAdornment(null);
    }
  };

  const handleClickResetData = () => {
    formik.setFieldValue("name", "");
    setSelectedValue("");
    setEndAdornment(null);
    setSpentTypesList(spentTypes);
    setIsNew(true);
  };

  const renderEndAdornment = () => {
    return (
      <InputAdornment position="end">
        <IconButton
          aria-label={selectedValue}
          onClick={handleClickResetData}
          edge="end"
        >
          <CleaningServicesOutlinedIcon />
        </IconButton>
      </InputAdornment>
    );
  };

  return (
    <div>
      <Container fixed>
        <h1>Spent Type Admin</h1>
        <form onSubmit={formik.handleSubmit}>
          <DSFormInputComponent
            name="name"
            label="Item"
            autoFocus
            value={selectedValue}
            handleChange={(e) => customHandleChange(e)}
            endAdornment={endAdornment}
          />

          <DSButtonComponent type="submit">
            {isNew ? "Add" : "Update"} Catalog
          </DSButtonComponent>
        </form>
        <List dense>
          {spentTypesList.map((catalog) => (
            <ListItem
              key={catalog.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="edit"
                  size="small"
                  onClick={() => handleEdit(catalog)}
                >
                  <EditIcon />
                </IconButton>
              }
            >
              <ListItemText primary={catalog.name} />
            </ListItem>
          ))}
        </List>
      </Container>
    </div>
  );
};

export default SpentTypeAdmin;
