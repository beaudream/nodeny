import {
  ActionIcon,
  Box,
  Button,
  Center,
  Group,
  Space,
  Stack,
  Table,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { useModals } from "@mantine/modals";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TbActivity, TbLink, TbTrash, TbFilter } from "react-icons/tb";
import showAccessLogsModal from "../../components/account/showAccessLogModal";
import showStatusFilterModal from "../../components/account/showStatusFilterModal";
import showFilesStatusModal from "../../components/account/showFilesStatusModal";
import showShareLinkModal from "../../components/account/showShareLinkModal";
import CenterLoader from "../../components/core/CenterLoader";
import Meta from "../../components/Meta";
import useConfig from "../../hooks/config.hook";
import shareService from "../../services/share.service";
import { MyShare } from "../../types/share.type";
import toast from "../../utils/toast.util";
import { dateToStr, takenTimeStr, upper } from '../../@global';
import { FileStatuses } from "../../types/File.type";
import _ from 'lodash';

const MyShares = () => {
  const modals = useModals();
  const clipboard = useClipboard();
  const config = useConfig();

  const [shares, setShares] = useState<MyShare[]>();
  const [wholeShares, setWholeShares] = useState<MyShare[]>();
  const [status, setStatus] = useState('all');

  useEffect(() => {
    shareService.getMyShares().then((shares) => {
      setShares(shares);
      setWholeShares(shares);
    });
  }, []);

  const statusFilter = (status: string) => {
    if (status === 'all')
      setShares(wholeShares);
    else
      setShares(shares?.filter(one => one.files.length > 0 && one.files[0].status === status))
  }

  let statusObj = {};
  FileStatuses.map(f => _.set(statusObj, f.toLowerCase(), f));

  if (!shares) return <CenterLoader />;

  return (
    <>
      <Meta title="My shares" />
      <Title mb={30} order={3}>
        My shares
      </Title>
      {wholeShares && wholeShares.length == 0 ? (
        <Center style={{ height: "70vh" }}>
          <Stack align="center" spacing={10}>
            <Title order={3}>It's empty here 👀</Title>
            <Text>You don't have any shares.</Text>
            <Space h={5} />
            <Button component={Link} href="/upload" variant="light">
              Create one
            </Button>
          </Stack>
        </Center>
      ) : (
        <Box sx={{ display: "block", overflowX: "auto" }}>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Expires at</th>
                <th>Last view</th>
                <th align="justify">Time spent<br/>(prom)</th>
                <th>Visitors</th>
                <th>
                  <div>
                  <Tooltip
                    label="Status Filter"
                  >
                    <Button
                      compact
                      variant="subtle"
                      onClick={() => {
                        showStatusFilterModal(modals, status, statusFilter, setStatus);
                      }}
                    >
                      <TbFilter />
                    </Button>
                  </Tooltip>
                  Status
                  </div>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {shares.map((share) => {
                const noAccessLlogs = share.accessLogs.length === 0;
                return (
                  <tr key={share.id}>
                    <td>{share.id}</td>
                    <td>
                      {moment(share.expiration).unix() === 0
                        ? "Never"
                        : moment(share.expiration).format("LLL")}
                    </td>
                    <td>
                      {share.downLogs.length > 0 ? dateToStr(share.downLogs[share.downLogs.length - 1].createdAt) : ''}
                    </td>
                    <td>
                      {share.downLogs.length > 0 ? takenTimeStr(share.downLogs[share.downLogs.length - 1].takenTime) : ''}
                    </td>
                    <td>
                      <Tooltip
                        label="View Access Logs"
                        disabled={noAccessLlogs}
                      >
                        <Button
                          compact
                          variant="subtle"
                          disabled={noAccessLlogs}
                          onClick={() => {
                            showAccessLogsModal(modals, share);
                          }}
                        >
                          {noAccessLlogs
                            ? "No Visitors"
                            : share.accessLogs.length}
                        </Button>
                      </Tooltip>
                    </td>
                    <td>
                      {share.files && share.files.length > 0 ? _.get(statusObj, new Object(share.files[0].status).toString()) : ''}
                    </td>
                    <td>
                      <Group position="right">
                        <ActionIcon
                          color="victoria"
                          variant="light"
                          size={25}
                          onClick={() => {
                            showFilesStatusModal(modals, share);
                          }}
                        >
                          <TbActivity />
                        </ActionIcon>
                        <ActionIcon
                          color="victoria"
                          variant="light"
                          size={25}
                          onClick={() => {
                            if (window.isSecureContext) {
                              clipboard.copy(
                                `${config.get("APP_URL")}/share/${share.id}`
                              );
                              toast.success(
                                "Your link was copied to the keyboard."
                              );
                            } else {
                              showShareLinkModal(
                                modals,
                                share.id,
                                config.get("APP_URL")
                              );
                            }
                          }}
                        >
                          <TbLink />
                        </ActionIcon>
                        <ActionIcon
                          color="red"
                          variant="light"
                          size={25}
                          onClick={() => {
                            modals.openConfirmModal({
                              title: `Delete share ${share.id}`,
                              children: (
                                <Text size="sm">
                                  Do you really want to delete this share?
                                </Text>
                              ),
                              confirmProps: {
                                color: "red",
                              },
                              labels: { confirm: "Confirm", cancel: "Cancel" },
                              onConfirm: () => {
                                shareService.remove(share.id);
                                setShares(
                                  shares.filter((item) => item.id !== share.id)
                                );
                              },
                            });
                          }}
                        >
                          <TbTrash />
                        </ActionIcon>
                      </Group>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Box>
      )}
    </>
  );
};

export default MyShares;
