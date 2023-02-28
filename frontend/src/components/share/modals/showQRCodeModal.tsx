import { ModalsContextProps } from "@mantine/modals/lib/context";
import { FileMetaData } from "../../../types/File.type";
import QRCode from "react-qr-code";
import { Share } from "../../../types/share.type";
import { Group } from "@mantine/core";

const showQRCodeModal = (
  modals: ModalsContextProps,
  share: Share,
  file: FileMetaData
) => {
  return modals.openModal({
    centered: true,
    size: "auto",
    title: <p>{`Download ${file.name}`}</p>,
    children: (
      <Group position="center">
        <QRCode
          value={`${window.location.origin}/api/shares/${share.id}/files/${file.id}`}
        />
      </Group>
    ),
  });
};

export default showQRCodeModal;
