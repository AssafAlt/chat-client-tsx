import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { AuthProvider } from "../context/AuthContext";
import { UserProvider } from "../context/UserContext";
import { ModalsProvider } from "@mantine/modals";
import { SocketProvider } from "../context/SocketContext";
import { DisplayProvider } from "../context/DisplayContext";
import { FriendsProvider } from "../context/FriendsContext";
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
      <ModalsProvider>
        <AuthProvider>
          <UserProvider>
            <DisplayProvider>
              <FriendsProvider>
                <SocketProvider>
                  <Notifications position="top-right" />
                  {children}
                </SocketProvider>
              </FriendsProvider>
            </DisplayProvider>
          </UserProvider>
        </AuthProvider>
      </ModalsProvider>
    </MantineProvider>
  );
};
