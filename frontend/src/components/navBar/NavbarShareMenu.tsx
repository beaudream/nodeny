import { ActionIcon, Menu } from "@mantine/core";
import Link from "next/link";
import { TbArrowLoopLeft, TbLink } from "react-icons/tb";

const NavbarShareMneu = () => {
  return (
    <Menu position="bottom-start" withinPortal>
      <Menu.Target>
        <ActionIcon>
          <TbLink />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item component={Link} href="/account/shares" icon={<TbLink />}>
          Mis Archivos
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default NavbarShareMneu;
