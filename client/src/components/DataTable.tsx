import { Table, Loader, Center, Title } from "@mantine/core";
import { useGetAllNotesQuery } from "../redux/service/notes/notesApiService";
import TableRow from "./TableRow";
type Props = {
    title?: string;
};
// 
export default function DataTable({ title }: Props) {
    const { data, isLoading } = useGetAllNotesQuery(({ title } as Props) ?? {});

    if (isLoading) {
        return (
            <Center>
                <Loader />
            </Center>
        );
    }

    if (data && data.length < 1) {
        return (
            <Center>
                <Title>No Data Yet</Title>
            </Center>
        );
    }

    return (
        <>
            <Table.ScrollContainer minWidth={500} type="native">
                <Table my={15} striped={"even"} highlightOnHover withTableBorder withColumnBorders stripedColor="gray.1">
                    <Table.Thead ta={"center"}>
                        <Table.Tr bg={"gray.2"}>
                            <Table.Th ta={"center"}>Title</Table.Th>
                            <Table.Th ta={"center"}>Content</Table.Th>
                            <Table.Th ta={"center"}>UpdatedAt</Table.Th>
                            <Table.Th ta={"center"}>Action</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {data?.map((note, i) => (
                            <TableRow key={i} noteData={note} />
                        ))}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </>
    );
}
