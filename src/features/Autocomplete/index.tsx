import * as React from "react";
import { useSnackbar } from "notistack";
import {
  useForm,
  Controller,
  NestedValue,
  SubmitHandler,
} from "react-hook-form";
import { TextField, Button, MenuItem, Typography } from "@material-ui/core";
import MuiAutocomplete from "@material-ui/lab/Autocomplete";

type FormValues = {
  name: string;
  subject: string;
  select: string;
  autocomplete: NestedValue<Option>;
};

type Option = {
  id: number;
  label: string;
  value: string;
};

const OPTIONS: Option[] = [
  { id: 1, label: "John", value: "john" },
  { id: 2, label: "Peter", value: "peter" },
];

function generateReleaseNotes(id: string): Promise<string[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["hello"]);
    }, 500);
  });
}

function Autocomplete() {
  const { enqueueSnackbar } = useSnackbar();
  const [status, setStatus] = React.useState<string>("idle");
  const [, setIssueList] = React.useState<string[]>([]);
  const { handleSubmit, register, errors, control } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    setStatus("pending");
    try {
      let test = await generateReleaseNotes(values.name);
      setStatus("success");
      setIssueList(test);
    } catch (e) {
      enqueueSnackbar("releaseNotes.error", {
        variant: "error",
      });

      setStatus("failure");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <TextField
          id="name"
          name="name"
          label="Name"
          margin="normal"
          inputRef={register({
            required: {
              value: true,
              message: "Required",
            },
          })}
          error={errors.name && true}
          helperText={errors.name?.message}
        />
      </div>
      <div>
        <TextField
          id="subject"
          name="subject"
          label="Subject"
          margin="normal"
          inputRef={register({
            required: {
              value: true,
              message: "Required",
            },
          })}
          error={errors.subject && true}
          helperText={errors.subject?.message}
        />
      </div>
      <div style={{ maxWidth: 225 }}>
        <Controller
          as={
            <TextField
              id="select"
              label="Select"
              margin="normal"
              fullWidth
              select
            >
              <MenuItem value="default">None</MenuItem>
              <MenuItem value="test">Test</MenuItem>
              <MenuItem value="test2">Test2</MenuItem>
            </TextField>
          }
          name="select"
          control={control}
          defaultValue="default"
        />
      </div>
      <div style={{ maxWidth: 225 }}>
        <Controller
          render={(props) => (
            <MuiAutocomplete
              options={OPTIONS}
              getOptionSelected={(option, selected) =>
                option.value === selected.value
              }
              openOnFocus
              value={props.value}
              onChange={(event, newValue) => props.onChange(newValue)}
              getOptionLabel={(option: Option) => option.label}
              renderInput={(params) => (
                <TextField label="Autocomplete" {...params} />
              )}
            />
          )}
          name="autocomplete"
          defaultValue={OPTIONS[0]}
          control={control}
        />
      </div>
      <Button type="submit">Send</Button>
      <Typography>
        {status === "pending" ? "Loading..." : null}
        {status === "success" ? "Loaded" : null}
      </Typography>
    </form>
  );
}

export default Autocomplete;
