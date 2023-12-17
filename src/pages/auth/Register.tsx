import { Link, useNavigate } from "react-router-dom";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { useAuth } from "../../hooks/useAuth";
import { RegisterForm } from "../../models/AuthForms";
import classes from "./AuthStyles.module.css";

import { notifications } from "@mantine/notifications";

const Register = () => {
  const navigate = useNavigate();

  const form = useForm<RegisterForm>({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
      nickname: "",
    },

    validate: {
      username: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      confirmPassword: (value) =>
        form.values.password === value
          ? null
          : "Password and Confirm Password do not match",
      nickname: (value) =>
        /\d/.test(value) ? "Nickname cannot contain numbers" : null,
    },
  });

  const { register } = useAuth();

  const onSubmit = async (values: RegisterForm) => {
    try {
      await register(values);
      notifications.show({
        title: "Welcome to Capitan's Chat App",
        message: "Navigating to sign in",
      });
      navigate("/");
    } catch (error) {
      notifications.show({
        title: "Register failed!",
        message: "Please try again later",
        color: "red",
      });
    }
  };
  return (
    <Container size={420} my={10}>
      <Title ta="center" className={classes.title}>
        Register page
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do you have an account already?{" "}
        <Anchor size="sm" component={Link} to="/">
          Login
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form
          onSubmit={form.onSubmit(
            async (values: RegisterForm) => await onSubmit(values)
          )}
        >
          <TextInput
            label="Username"
            ta="left"
            placeholder="user@email.com"
            required
            {...form.getInputProps("username")}
          />
          <TextInput
            mt="md"
            label="Nickname"
            ta="left"
            placeholder="Your Nickname"
            required
            {...form.getInputProps("nickname")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            ta="left"
            required
            mt="md"
            {...form.getInputProps("password")}
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm password"
            ta="left"
            required
            mt="md"
            {...form.getInputProps("confirmPassword")}
          />

          <Button fullWidth mt="xl" type="submit">
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
