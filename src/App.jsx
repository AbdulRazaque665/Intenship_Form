import { Button, TextField, Container, Snackbar, Alert } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import CancelIcon from '@mui/icons-material/Cancel';

const App = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [open, setOpen] = React.useState(false);

  const submit = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setOpen(true);

    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  return (
    <div
      className="w-full flex flex-col justify-center items-center h-screen bg-no-repeat bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://t4.ftcdn.net/jpg/02/40/63/55/360_F_240635575_EJifwRAbKsVTDnA3QE0bCsWG5TLhUNEZ.jpg') ",
      }}
    >
      <h1 className="text-3xl text-white mb-5 font-bold">Internship Form</h1>
      <Container maxWidth="xs" className="w-full">
        <form
          className="border border-white backdrop-blur-3xl p-4 lg:w-96 rounded-xl"
          onSubmit={handleSubmit(submit)}
        >
          <div>
            <TextField
              id="username"
              label="Name"
              variant="outlined"
              error={!!errors.username}
              className="w-full mt-10  !text-white"
              sx={{ input: { color: "white" } }}
              InputLabelProps={{ className: "!text-white" }}
              {...register("username", { required: "Name is required" })}
              type="text"
            />
            {errors.username && (
              <p style={{ color: "red" }}>{errors.username.message}</p>
            )}
          </div>
          <br />
          <div>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              className="w-full"
              sx={{ input: { color: "white" } }}
              error={!!errors.email}
              InputLabelProps={{ className: "!text-white" }}
              {...register("email", {
                required: "Email is required",
                validate: {
                  isGmail: (value) =>
                    value.endsWith("@gmail.com") ||
                    "Email must be a Gmail address",
                },
              })}
              type="email"
            />
            {errors.email && (
              <p style={{ color: "red" }}>{errors.email.message}</p>
            )}
          </div>
          <br />
          <div>
            <TextField
              id="password"
              label="Password"
              className="w-full"
              sx={{ input: { color: "white" } }}
              error={!!errors.password}
              InputLabelProps={{ className: "!text-white" }}
              variant="outlined"
              {...register("password", { required: "Password is required" })}
              type="password"
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password.message}</p>
            )}
          </div>
          <br />
          <div>
            <TextField
              id="number"
              label="Number"
              error={!!errors.number}
              variant="outlined"
              sx={{ input: { color: "white" } }}
              InputLabelProps={{ className: "!text-white" }}
              className="w-full"
              {...register("number", { required: "Number is required" })}
              type="number"
            />
            {errors.number && (
              <p style={{ color: "red" }}>{errors.number.message}</p>
            )}
          </div>
          <br />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="w-full !bg-none !border !border-white !text-white !py-2"
          >
            Submit
          </Button>
        </form>
        <Snackbar open={open} autoHideDuration={500} >
          <Alert
            severity="primary"
            variant="filled"
            sx={{ width: "100%" }}
          >
            The form has been submitted.
          <button className="ms-5 hover:cursor-pointer" onClick={() => setOpen(false)}><CancelIcon/></button>
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default App;
