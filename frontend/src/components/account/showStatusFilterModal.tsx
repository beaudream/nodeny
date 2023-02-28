import { Select } from "@mantine/core";
import { ModalsContextProps } from "@mantine/modals/lib/context";
import { FileStatuses } from "../../types/File.type";

const showStatusFilterModal = (modals: ModalsContextProps, status: string, statusFilter: Function, setStatus: Function) => {
  let statues = new Array({value: 'all', label: 'All'});
  FileStatuses.map(fs => statues.push({value: fs.toLowerCase(), label: fs}));
  
  return modals.openModal({
    title: `Share filtering`,
    centered: true,
    size: "auto",
    children: (
      <Select
        data={statues}
        placeholder="Status"
        defaultValue={status}
        onChange={status => {
          statusFilter(status);
          setStatus(status);
        }}
      />
    ),
  });
};

export default showStatusFilterModal;
