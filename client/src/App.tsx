import "@mantine/core/styles.css";
import { AppShell, Button, Center, Group, TextInput, Title, Image } from "@mantine/core";
import "@mantine/notifications/styles.css";
import DataTable from "./components/DataTable";
import Logo from "./assets/note.png";
import { useMediaQuery } from "@mantine/hooks";
import { useModalsContext } from "./context/ModalsContext";
import { useState } from "react";

export default function App() {
    const isMobileAndTablest = useMediaQuery("(max-width:991px)");
    const { openAddModal } = useModalsContext();
    const [searchTitel, setSearchTitle] = useState<string>("");

    return (
        <AppShell header={{ height: 70 }} padding="md">
            <AppShell.Header bg={"gray.7"}>
                <Group h={"100%"} align="center" px={"xl"}>
                    <Image src={Logo} w={50} />
                    <Title order={3}>Notaty</Title>
                </Group>
            </AppShell.Header>

            <AppShell.Main>
                {/* Search Section */}
                <Center mb={10}>
                    <Group wrap="nowrap" w={isMobileAndTablest ? "100%" : 700}>
                        <Button size="md" variant="filled" onClick={openAddModal}>
                            ADD
                        </Button>
                        <TextInput
                            value={searchTitel}
                            onChange={(e) => setSearchTitle(e.target.value)}
                            size="md"
                            style={{ flex: 1 }}
                            placeholder="Search for note..."
                        />
                    </Group>
                </Center>

                {/* TABLE */}

                <DataTable  title={searchTitel}/>
            </AppShell.Main>
        </AppShell>
    );
}
