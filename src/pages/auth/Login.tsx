import { Link } from "react-router-dom";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Loader,
  LoadingOverlay,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import classes from "./AuthStyles.module.css";
import { LoginForm } from "../../models/AuthForms";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

const Login = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginForm>({
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      username: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const onSubmit = async (values: LoginForm) => {
    setIsLoading(true);
    try {
      await login(values);
      notifications.show({
        title: "Welcome Back to Capitan's Chat App",
        message: "Navigating to Home page",
        autoClose: 3000,
      });
    } catch (error) {
      notifications.show({
        title: "Login failed!",
        message: "Please check your credentials or try again later",
        color: "red",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.loginForm}>
      {isLoading && (
        <LoadingOverlay
          visible={true}
          loaderProps={{ children: <Loader color="blue" /> }}
        />
      )}
      <Container className={classes.loginContainer}>
        <Title ta="center" className={classes.title}>
          Login page
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{" "}
          <Anchor size="sm" component={Link} to="/register">
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form
            onSubmit={form.onSubmit((values: LoginForm) => onSubmit(values))}
          >
            <TextInput
              label="Username"
              ta="left"
              placeholder="user@email.com"
              required
              {...form.getInputProps("username")}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              ta="left"
              required
              mt="md"
              {...form.getInputProps("password")}
            />

            <Button fullWidth mt="xl" type="submit">
              Sign in
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
