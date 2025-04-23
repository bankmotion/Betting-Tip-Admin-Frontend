import { useContext } from 'react';

import {
  ListSubheader,
  alpha,
  Box,
  List,
  styled,
  Button,
  ListItem
} from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import { SidebarContext } from 'src/middleware/SidebarContext';

import NoMealsIcon from '@mui/icons-material/NoMeals';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import FlagIcon from '@mui/icons-material/Flag';
import { DevicesOther, EmojiFoodBeverage } from '@mui/icons-material';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import KebabDiningIcon from '@mui/icons-material/KebabDining';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import KitchenIcon from '@mui/icons-material/Kitchen';
import ChairAltIcon from '@mui/icons-material/ChairAlt';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';

import axios from 'axios';
import { SERVER_URL } from 'src/config/config';
import { getToken } from 'src/utils/utils';

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(['color'])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.colors.alpha.trueWhite[30]};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
                  'transform',
                  'opacity'
                ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);

const MenuIcon = styled('img')(({ theme }) => ({
  width: 24,
  height: 24,
  boxShadow: theme.shadows[2],
  borderRadius: '50%',
  marginRight: 8
}));

function SidebarMenu() {
  const { closeSidebar } = useContext(SidebarContext);

  const handleDownloadAllergensMatrix = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/allergenes/download`, {
        headers: {
          Authorization: getToken()
        },
        responseType: 'blob'
      });

      console.log(response);
      if (response.status === 200) {
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: 'application/pdf' })
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Allergener.pdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    } catch (err) {
      console.error(`Error downloading the Excel file: ${err}`);
    }
  };

  return (
    <>
      <MenuWrapper>
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              MAIN INFO
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/dashboard"
                  startIcon={<NoMealsIcon />}
                >
                  Dashboard
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/countries"
                  startIcon={<FlagIcon />}
                >
                  Countries
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/leagues"
                  startIcon={<SportsSoccerIcon />}
                >
                  Leagues
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/teams"
                  startIcon={<SportsTennisIcon />}
                >
                  Teams
                </Button>
              </ListItem>
              {/* <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/productions"
                  startIcon={<FoodBankIcon />}
                >
                  Productions
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/distributions"
                  startIcon={<BakeryDiningIcon />}
                >
                  Distribution
                </Button>
              </ListItem> */}
            </List>
          </SubMenuWrapper>
        </List>
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Betting Tips
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/kitchen"
                  startIcon={<KitchenIcon />}
                >
                  Tips
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/buffet"
                  startIcon={<ChairAltIcon />}
                >
                  Filtered Tips
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/delivery"
                  startIcon={<RoomServiceIcon />}
                >
                  Publish Tips
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/kitchenlog"
                  startIcon={<HistoryToggleOffIcon />}
                >
                  Tip results
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;
