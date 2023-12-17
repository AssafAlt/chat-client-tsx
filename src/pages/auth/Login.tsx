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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import classes from "./AuthStyles.module.css";
import { LoginForm } from "../../models/AuthForms";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();

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
    await login(values);
  };

  return (
    <Container size={420} my={40}>
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
        <form onSubmit={form.onSubmit((values: LoginForm) => onSubmit(values))}>
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
  );
};

export default Login;
