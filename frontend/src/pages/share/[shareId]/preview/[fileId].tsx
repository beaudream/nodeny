import { AspectRatio, Center, Stack, Text, Title } from "@mantine/core";
import { GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";
import { useState } from "react";

const PreviewFilePowerpoint = dynamic(
  () => import("../../../../components/share/FilePreviewPowerpoint"),
  {
    ssr: false,
  }
);

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { shareId, fileId } = context.params!;

  const mimeType = context.query.type as string;

  return {
    props: { shareId, fileId, mimeType },
  };
}

const UnSupportedFile = () => {
  return (
    <Center style={{ height: "70vh" }}>
      <Stack align="center" spacing={10}>
        <Title order={3}>Preview not supported</Title>
        <Text>
          A preview for thise file type is unsupported. Please download the file
          to view it.
        </Text>
      </Stack>
    </Center>
  );
};

const FilePreview1 = ({
  shareId,
  fileId,
  mimeType,
}: {
  shareId: string;
  fileId: string;
  mimeType: string;
}) => {
  const [isNotSupported, setIsNotSupported] = useState(false);

  if (isNotSupported) return <UnSupportedFile />;

  if (mimeType == "application/pdf") {
    if (typeof window !== "undefined") {
      window.location.href = `/api/shares/${shareId}/files/${fileId}?download=false`;
    }
    return null;
  } else if (mimeType.startsWith("video/")) {
    return (
      <video
        width="100%"
        controls
        onError={() => {
          setIsNotSupported(true);
        }}
      >
        <source src={`/api/shares/${shareId}/files/${fileId}?download=false`} />
      </video>
    );
  } else if (mimeType.startsWith("image/")) {
    return (
      <img
        onError={() => {
          setIsNotSupported(true);
        }}
        src={`/api/shares/${shareId}/files/${fileId}?download=false`}
        alt={`${fileId}_preview`}
        width="100%"
      />
    );
  } else if (mimeType.startsWith("audio/")) {
    return (
      <Center style={{ height: "70vh" }}>
        <Stack align="center" spacing={10} style={{ width: "100%" }}>
          <audio
            controls
            style={{ width: "100%" }}
            onError={() => {
              setIsNotSupported(true);
            }}
          >
            <source
              src={`/api/shares/${shareId}/files/${fileId}?download=false`}
            />
          </audio>
        </Stack>
      </Center>
    );
  } else if (
    mimeType ===
    "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  ) {
    return (
      <AspectRatio ratio={16 / 9}>
        <PreviewFilePowerpoint shareId={shareId} fileId={fileId} />;
      </AspectRatio>
    );
  } else {
    return <UnSupportedFile />;
  }
};

export default FilePreview1;
