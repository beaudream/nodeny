import { Table } from "@mantine/core";
import { ModalsContextProps } from "@mantine/modals/lib/context";
import { MyShare } from "../../types/share.type";
import { dateToStr } from '../../@global';

const showAccessLogsModal = (modals: ModalsContextProps, share: MyShare) => {
  return modals.openModal({
    title: `${share.id} Access Logs`,
    centered: true,
    size: "auto",
    children: (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>IP</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {share.accessLogs.map((accessLog) => (
            <tr key={accessLog.id}>
              <td>{accessLog.id}</td>
              <td>{accessLog.ip}</td>
              <td>{accessLog.timestamp ? dateToStr(accessLog.timestamp) : ''} </td>
            </tr>
          ))}
        </tbody>
      </Table>
    ),
  });
};

export default showAccessLogsModal;
