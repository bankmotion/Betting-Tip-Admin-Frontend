import { FC, ChangeEvent, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
  styled,
  CircularProgress
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { AllergenType } from 'src/models/allergen';
import { SERVER_URL } from 'src/config/config';
import { applyPagination } from 'src/utils/utils';

interface AllergensTableProps {
  className?: string;
  allergenes: AllergenType[];
  loadingGetList: boolean;
  setTargetItem: (id: number) => void;
  handleOpenCreateModal: () => void;
  handleOpenDeleteModal: () => void;
}

const LogoImage = styled('img')(({ theme }) => ({
  width: 30,
  height: 'auto',
  borderRadius: '50%'
}));

const AllergensTable: FC<AllergensTableProps> = ({
  allergenes,
  loadingGetList,
  setTargetItem,
  handleOpenCreateModal,
  handleOpenDeleteModal,
  className = ''
}) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const paginatedAllergenes = applyPagination(allergenes, page, limit);
  const theme = useTheme();

  return (
    <Card>
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Icon</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loadingGetList ? (
              <Box
                component={'tr'}
                sx={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '8px'
                }}
              >
                <Box
                  component={'td'}
                  sx={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '8px',
                    textAlign: 'center'
                  }}
                  colSpan={4}
                >
                  <CircularProgress />
                </Box>
              </Box>
            ) : (
              paginatedAllergenes.map((allergene) => {
                return (
                  <TableRow
                    hover
                    key={allergene.id}
                  >
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {allergene.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {allergene?.logo && (
                        <LogoImage
                          src={`${SERVER_URL}/logo/${allergene.logo}`}
                        />
                      )}
                    </TableCell>
                    <TableCell>{allergene.name}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit allergen" arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.primary.lighter
                            },
                            color: theme.palette.primary.main
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setTargetItem(allergene.id);
                            handleOpenCreateModal();
                          }}
                        >
                          <EditTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete allergen" arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.error.lighter
                            },
                            color: theme.palette.error.main
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setTargetItem(allergene.id);
                            handleOpenDeleteModal();
                          }}
                        >
                          <DeleteTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={allergenes.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

AllergensTable.propTypes = {
  allergenes: PropTypes.array.isRequired
};

export default AllergensTable;
