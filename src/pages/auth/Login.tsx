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

import classes from "./AuthStyles.module.css";

const Login = () => {
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
        <TextInput
          label="Username"
          ta="left"
          placeholder="you@mantine.dev"
          required
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          ta="left"
          required
          mt="md"
        />

        <Button fullWidth mt="xl">
          Sign in
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
