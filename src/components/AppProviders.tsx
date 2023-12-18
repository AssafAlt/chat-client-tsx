import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { AuthProvider } from "../context/AuthContext";
interface IProps {
  children: JSX.Element;
}

const theme = createTheme({
  fontFamily: "Open Sans, sans-serif",
  primaryColor: "cyan",
});

export const AppProviders = ({ children }: IProps) => {
  return (
    <MantineProvider theme={theme}>
      <AuthProvider>
        <Notifications position="top-right" />
        {children}
      </AuthProvider>
    </MantineProvider>
  );
};
