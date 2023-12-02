import { notifications } from "@mantine/notifications"
import { IconCheck } from "@tabler/icons-react"

export const toastSuccess = (msg:string)=>{
    notifications.show({
        title:'Sucess',
        message:msg,
        color:'green',
        withBorder:true,
        icon:<IconCheck/>
    })
}