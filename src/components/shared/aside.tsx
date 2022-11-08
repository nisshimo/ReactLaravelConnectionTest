import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import {
  FaTachometerAlt,
  FaUserAlt,
  FaVial,
  FaDna,
  FaFileAlt,
  FaRegAddressCard,
  FaHospitalAlt,
  FaBuilding,
  FaHospitalUser,
  FaClipboardCheck,
  FaBorderAll,
  FaSyringe,
  FaShieldVirus,
  FaRegSquare,
  FaCheckCircle,
  FaChessBoard,
  FaCheck,
  FaRegCopy,
  FaChartLine,
  FaFileInvoiceDollar,
  FaBarcode,
  FaChartBar,
  FaRegBuilding,
  FaPython,
  FaBook,
  FaSkull,
  FaTasks,
  FaBoxes,
} from "react-icons/fa";
import * as H from "history";

import Logo from "components/../../public/logo_h.png";
import LogoRCE from "components/../../public/logo_rce.png";
import { BaseSearchForm } from "entities";
import { useForm } from "utils/hooks";

import { Badge } from "react-bootstrap";
import { BsBook } from "react-icons/bs";
import { MdOutlineInventory2 } from "react-icons/md";
import { Flex } from "./flex";
import { GlobalStateContext } from "contexts/global_state_context";
import { MasterDataContext } from "contexts/master_data_context";

type Props = {
  collapsed: boolean;
  history: H.History;
};
const Aside = (props: Props) => {
  // const [toggled, setToggled] = useState<boolean>(true)
  const [current, setCurrent] = useState<number>(0);
  const masterData = useContext(MasterDataContext);

  const globalState = useContext(GlobalStateContext);
  const sampleStatusGroupSearchForm = useForm<BaseSearchForm>({
    groupBy: "status",
    aggregate: 'Count("status")',
    aggregateAlias: "count",
  });

  useEffect(() => {
    if (process.env.REACT_APP_ENV === "staging") {
      const elem: any = document.getElementsByClassName("pro-sidebar-inner");
      if (elem) {
        elem[0]!.style.background = "#333";
      }
    }
  }, []);

  const stopPropagation = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    onClick: () => void
  ) => {
    onClick();
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <ProSidebar
      className="no-print"
      // image={Logo}
      collapsed={props.collapsed}
      // toggled={toggled}
      breakPoint="md"
      width={240}
      //   onToggle={handleToggleSidebar}
    >
      <SidebarHeader>
        <Flex flexDirection="column">
          <div
            style={{
              height: 100,
              position: "relative",
              width: "100%",
            }}
          >
            <img
              src={Logo}
              style={{
                width: "100%",
                objectFit: "cover",
                // position: 'absolute',
                filter:
                  "invert(50%) sepia(100%) saturate(0%) brightness(1000%) contrast(101%)",
              }}
            />
            <div
              style={{
                width: "100%",
                position: "absolute",
                top: 73,
                left: 16,
                fontWeight: "bold",
                fontSize: 14,
              }}
            >
              {`ようこそ ${globalState.user.fullName}さん`}
            </div>
          </div>
        </Flex>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">あいうおえ</Menu>
      </SidebarContent>

      {/* <SidebarFooter style={{ textAlign: 'center' }}>
                <div
                    className="sidebar-btn-wrapper"
                    style={{
                        padding: '20px 24px',
                    }}
                >
                    <a href="https://github.com/azouaoui-med/react-pro-sidebar" target="_blank" className="sidebar-btn" rel="noopener noreferrer">
                        <FaGithub />
                        <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>view source</span>
                    </a>
                </div>
            </SidebarFooter> */}
    </ProSidebar>
  );
};

export default Aside;
