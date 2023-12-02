import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/app/store.ts";
import ModalsContextProvider from "./context/ModalsContext.tsx";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { theme } from "./theme.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
        <MantineProvider theme={theme}>
            <ModalsProvider>
                    <Notifications />
            <ModalsContextProvider>
                <App />
            </ModalsContextProvider>
            </ModalsProvider>
        </MantineProvider>
        </Provider>
    </React.StrictMode>
);
