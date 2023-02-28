import {
  Button,
  Container,
  createStyles,
  Group,
  List,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { TbCheck } from "react-icons/tb";
import Meta from "../components/Meta";
import useUser from "../hooks/user.hook";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  content: {
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.55)
        : theme.colors[theme.primaryColor][0],
    borderRadius: theme.radius.sm,
    padding: "4px 12px",
  },
}));

export default function Home() {
  const { classes } = useStyles();
  const { refreshUser } = useUser();
  const router = useRouter();

  // If the user is already logged in, redirect to the upload page
  useEffect(() => {
    refreshUser().then((user) => {
      if (user) {
        router.replace("/upload");
      }
    });

  }, []);

  return (
    <>
      <Meta title="Inicio" />
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Comparte tus <span className={classes.highlight}>documentos</span> <br />{" "}
              con tus clientes.
            </Title>
            <Text color="dimmed" mt="md">
              Haz tenido la incertidumbre de no saber si tus clientes leyeron o
			  no los archivos que les enviaste a su correo?
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <TbCheck size={12} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <div>
                  <b>Registro de vistas</b> - Determina cuántas veces y por cuanto tiempo se ha visualizado tu archivo.
                </div>
              </List.Item>
              <List.Item>
                <div>
                  <b>No te preocupes del tamaño</b> - Sube archivos sin la limitación de tu correo electrónico.
                </div>
              </List.Item>
              <List.Item>
                <div>
                  <b>Comparte de forma segura</b> - Coloca contraseñas a tus archivos para que no puedan ser vistos publicamente.
                </div>
              </List.Item>
              <List.Item>
                <div>
                  <b>Seguimiento práctico</b> Clasifica tus archivos según el estado que colocan tus clientes (No leido/Aceptado/Rechazado).
                </div>
              </List.Item>
              <List.Item>
                <div>
                  <b>QR para presentaciones</b> - Comparte tus presentaciones con los asistentes por medio de un QR sin enviarla por correo electrónico y manten el control de ellas.
                </div>
              </List.Item>
            </List>

            <Group mt={30}>
              <Button
                component={Link}
                href="/auth/signUp"
                radius="xl"
                size="md"
                className={classes.control}
              >
                Empieza a subir tus archivos
              </Button>

            </Group>
          </div>
          <Group className={classes.image} align="center">
            <Image
              src="/img/logo.png"
              alt="Nodeny Logo"
              width={200}
              height={200}
            />
          </Group>
        </div>
      </Container>
    </>
  );
}
