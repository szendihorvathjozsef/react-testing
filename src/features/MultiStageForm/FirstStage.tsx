import * as React from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import Box from "@material-ui/core/Box";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { KeyboardDatePicker } from "@material-ui/pickers/";
import useLocale from "shared/hooks/useLocale";
import InputMask from "components/Inputs/InputMask";
import { FirstStage } from "./formUtils/form-types";
import { selectFirstStage, saveFirst } from "./formUtils/form";

const FirstStageForm = () => {
  const locale = useLocale();
  const { push } = useHistory();
  const dispatch = useDispatch();
  const firstStage = useSelector(selectFirstStage);
  const { t } = useTranslation();
  const { handleSubmit, register, errors, control } = useForm<FirstStage>({
    defaultValues: firstStage,
  });

  return (
    <form
      onSubmit={handleSubmit((values) => {
        dispatch(saveFirst(values));
        push("/form/second");
      })}
    >
      <Box display="flex" flexDirection="column">
        <TextField
          type="text"
          id="lastName"
          name="lastName"
          label={t("common:field.lastName")}
          inputRef={register({
            required: { value: true, message: t("validation:required") },
          })}
          error={errors.lastName && true}
          helperText={errors.lastName?.message}
        />
        <TextField
          type="text"
          id="firstName"
          name="firstName"
          label={t("common:field.firstName")}
          inputRef={register({
            required: { value: true, message: t("validation:required") },
          })}
          error={errors.firstName && true}
          helperText={errors.firstName?.message}
        />
        <Controller
          control={control}
          name="gender"
          defaultValue="nodef"
          render={(props) => (
            <RadioGroup
              value={props.value}
              onChange={(e) => {
                props.onChange(e.target.value);
              }}
            >
              <FormControlLabel
                value="male"
                label="Férfi"
                control={<Radio />}
              />
              <FormControlLabel value="female" label="Nő" control={<Radio />} />
              <FormControlLabel
                value="other"
                label="Egyéb"
                control={<Radio />}
              />
              <FormControlLabel
                value="nodef"
                label="Nem adom meg"
                control={<Radio />}
              />
            </RadioGroup>
          )}
          rules={{
            required: { value: true, message: t("validation:required") },
          }}
        />
        <Controller
          control={control}
          name="birthday"
          defaultValue={new Date()}
          render={(props) => (
            <KeyboardDatePicker
              value={props.value}
              label={t("common:field.birthday")}
              onBlur={props.onBlur}
              onChange={(date, value) => {
                props.onChange(date);
              }}
              openTo="year"
              format={locale.longDateFormat}
            />
          )}
          rules={{
            required: { value: true, message: t("validation:required") },
          }}
        />
        <TextField
          id="phoneNumber"
          name="phoneNumber"
          label={t("common:field.phoneNumber")}
          InputProps={{
            inputComponent: (props) => (
              <InputMask
                {...props}
                type="tel"
                options={{
                  mask: locale.phoneFormat,
                }}
                placeholder={locale.phonePlaceholder}
              />
            ),
          }}
          inputRef={register({
            required: { value: true, message: t("validation:required") },
          })}
          error={errors.phoneNumber && true}
          helperText={errors.phoneNumber?.message}
        />
        <Button type="submit">{t("common:button.submit")}</Button>
      </Box>
    </form>
  );
};

export default FirstStageForm;
