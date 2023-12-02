import { ErrorResponse } from "../types/ErrorResponse.type";
import { notifications } from "@mantine/notifications";
import { IconExclamationCircle } from "@tabler/icons-react";
export const QueryErrorHandler = (error: ErrorResponse) => {
    console.log(error);
    throw new Error(error.response.data.error);
};

export const ClientErrorHanlder = (error: Error) => {
    notifications.show({
        title: "Error",
        message: error.message,
        withBorder:true,
        color: "red",
        icon:<IconExclamationCircle/>
    });
};
