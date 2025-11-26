import { useEffect, useState } from "react";
import ResponsiveDialog from "../../components/commons/wc/Dialog";
import { Field, Formik } from "formik";
import DSFormInputFormikComponent from "../../components/commons/ds/ds-input/ds-input-formik.component";
import { Box, FormControlLabel, FormGroup, Typography } from "@mui/material";
import DSButtonComponent from "../../components/commons/ds/ds-button/ds-button.component";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  addSpent,
  deleteSpent,
  setAddSpentModal,
} from "../../redux/calendarSlice";
import DSAutocomplete from "../../components/commons/ds/ds-autocomplete/autocomplete-formik-component";
import { format } from "date-fns";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import CustomSwitch from "../../components/commons/wc/CustomSwitch";

export const AddSpentModal = () => {
  const dispatch = useDispatch();
  const spentTypes = useSelector((state) => state.profileUser.spentTypes);
  const currentDate = useSelector((state) => state.spent.currentDate);
  const isOpenModal = useSelector((state) => state.spent.isOpenAddSpentModal);
  const spentTypeSelected = useSelector(
    (state) => state.spent.spentTypeSelected
  );
  const spentSelected = useSelector((state) => state.spent.spentSelected);

  const [optionsForSpentTypes, setOptionsForSpentTypes] = useState([]);
  const [catalogValue, setSpentValue] = useState({});
  const [switchValue, setSwitchValue] = useState({
    isOverBudget: false,
    isRefund: false,
  });

  useEffect(() => {
    if (spentTypeSelected) {
      setOptionsForSpentTypes([spentTypeSelected]);
    } else {
      const filteredValue = spentTypes.find(
        (item) => item.id === spentSelected?.spentType.id
      );
      setOptionsForSpentTypes(spentTypes);
      setSpentValue(filteredValue);
      setSwitchValue({
        isOverBudget: spentSelected?.isOverBudget || false,
        isRefund: spentSelected?.isRefund || false,
      });
    }
  }, [spentTypeSelected, spentTypes, spentSelected]);

  const handleChangeForSwitch = (event) => {
    setSwitchValue({
      isOverBudget: false,
      isRefund: false,
      [event.target.name]: event.target.checked,
    });
  };

  const handleOpenModal = (value) => {
    dispatch(setAddSpentModal(value));
  };

  const handlerDeleteSpent = (resetForm) => {
    dispatch(deleteSpent({ id: spentSelected._id, currentDate, resetForm }));
  };

  const customHandleChange = (valueItem) => {
    setSpentValue(valueItem);
  };

  const schemaValidation = Yup.object().shape({
    spentType: Yup.object({
      name: Yup.string().required("Spent type is required"),
    })
      .required("Spent type is required")
      .typeError("Invalid selection"),
    name: Yup.string().required("Name is required"),
    amount: Yup.number()
      .required("It must be a number or cannot be left blank.") // Sets it as a compulsory field
      .positive("Must be a positive amount"), // Validates against negative values
  });

  const renderModalTitle = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography variant="h5" component="span">
          {spentSelected ? "Edit spent" : "New spent for"}
        </Typography>

        <Typography variant="subtitle1">
          {format(currentDate, "PPPP")}
        </Typography>
      </Box>
    );
  };

  return (
    <Formik
      initialValues={{
        spentType: spentTypeSelected || catalogValue,
        name: spentSelected?.description || "",
        amount: spentSelected?.amount || "",
      }}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={schemaValidation}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        dispatch(
          addSpent({
            ...values,
            date: currentDate,
            id: spentSelected?._id,
            isOverBudget: switchValue.isOverBudget,
            isRefund: switchValue.isRefund,
            resetForm,
          })
        );

        setSubmitting(false);
      }}
    >
      {({
        values,

        errors,

        touched,

        handleChange,

        handleBlur,

        handleSubmit,

        isSubmitting,
        submitForm,
        resetForm,
        setFieldValue,

        /* and other goodies */
      }) => (
        <ResponsiveDialog
          open={isOpenModal}
          setOpen={handleOpenModal}
          title={renderModalTitle()}
          handleCloseModal={resetForm}
          isFabButton
          acceptButton={
            <DSButtonComponent onClick={submitForm} isSubmitting={isSubmitting}>
              {`${spentSelected ? "Edit" : "Add"}`}
            </DSButtonComponent>
          }
          deleteButton={
            spentSelected ? (
              <DSButtonComponent
                onClick={() => handlerDeleteSpent(resetForm)}
                isSubmitting={isSubmitting}
                color="error"
              >
                DELETE
              </DSButtonComponent>
            ) : null
          }
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              width: "100%",
              flexDirection: "row",
              gap: 1,
            }}
          >
            <form>
              <Field
                id="spentType"
                name="spentType"
                label="Spent type"
                component={DSAutocomplete}
                optionValues={optionsForSpentTypes}
                withAllValue
                disabled={spentTypeSelected ? true : false}
                customValue={spentTypeSelected || catalogValue}
                customHandleChange={customHandleChange}
              />

              <Field
                id="name"
                name="name"
                label="Name"
                component={DSFormInputFormikComponent}
                customValue={spentSelected ? spentSelected?.description : null}
              />

              <Field
                id="amount"
                name="amount"
                type="number"
                label="Amount"
                component={DSFormInputFormikComponent}
                customValue={spentSelected ? spentSelected?.amount : null}
              />

              <FormGroup>
                <FormControlLabel
                  control={
                    <CustomSwitch
                      name="isOverBudget"
                      label="Is over budget?:"
                      value={switchValue.isOverBudget}
                      icon={<TrendingUpOutlinedIcon color="error" />}
                      handleOnChange={handleChangeForSwitch}
                    />
                  }
                />
                <FormControlLabel
                  control={
                    <CustomSwitch
                      name="isRefund"
                      label="Is a refund?:"
                      value={switchValue.isRefund}
                      icon={<SavingsOutlinedIcon color="success" />}
                      handleOnChange={handleChangeForSwitch}
                    />
                  }
                />
              </FormGroup>
            </form>
          </Box>
        </ResponsiveDialog>
      )}
    </Formik>
  );
};
