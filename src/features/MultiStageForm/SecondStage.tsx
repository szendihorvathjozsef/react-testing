import * as React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { SecondStage } from "./formUtils/form-types";
import { selectSecondStage, saveSecond } from "./formUtils/form";
import { numberPattern } from "utils/validation";

const SecondStageForm = () => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const secondStage = useSelector(selectSecondStage);
  const { t } = useTranslation();
  const { handleSubmit, register, errors } = useForm<SecondStage>({
    defaultValues: secondStage,
  });

  return (
    <form
      onSubmit={handleSubmit((values) => {
        dispatch(saveSecond(values));
        push("/form/finish");
      })}
      noValidate
    >
      <Box display="flex" flexDirection="column">
        <TextField
          type="text"
          id="zipCode"
          name="zipCode"
          label={t("common:field.zipCode")}
          inputRef={register({
            required: { value: true, message: t("validation:required") },
            pattern: numberPattern(),
          })}
          required
          error={errors.zipCode && true}
          helperText={errors.zipCode?.message}
        />
        <TextField
          type="text"
          id="city"
          name="city"
          label={t("common:field.city")}
          inputRef={register({
            required: { value: true, message: t("validation:required") },
          })}
          required
          error={errors.city && true}
          helperText={errors.city?.message}
        />
        <TextField
          type="text"
          id="address"
          name="address"
          label={t("common:field.address")}
          inputRef={register({
            required: { value: true, message: t("validation:required") },
          })}
          required
          error={errors.address && true}
          helperText={errors.address?.message}
        />
        <TextField
          type="text"
          id="region"
          name="region"
          label={t("common:field.region")}
          inputRef={register({
            required: { value: true, message: t("validation:required") },
          })}
          required
          error={errors.region && true}
          helperText={errors.region?.message}
        />
        <Button type="submit">{t("common:button.submit")}</Button>
      </Box>
    </form>
  );
};

export default SecondStageForm;
