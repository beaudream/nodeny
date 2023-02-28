import { Table } from "@mantine/core";
import { ModalsContextProps } from "@mantine/modals/lib/context";
import { MyShare } from "../../types/share.type";
import { capitalizeFirstLetter } from "../../utils/string.util";
import { dateToStr, takenTimeStr } from '../../@global';


const showFilesStatusModal = (modals: ModalsContextProps, share: MyShare) => {
  return modals.openModal({
    title: `${share.id} Files`,
    size: "auto",
    centered: true,
    children: (
      <Table>
        <thead>
          <tr>
            <th>Time spent</th>
            <th>IP</th>
            <th>Date & Time</th>
          </tr>
        </thead>
        {share.downLogs.length > 0 ?
        <tbody>
          {share.downLogs.map((log) => (
            <tr key={log.id}>
              <td>{log.takenTime ? takenTimeStr(log.takenTime) : ''}</td>
              <td>{log.ip}</td>
              <td>{dateToStr(log.createdAt)}</td>
            </tr>
          ))}
        </tbody>
        :
        <div></div>
      }
      </Table>
    ),
  });
};

export default showFilesStatusModal;
