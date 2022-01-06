import {Add, Delete, Edit, Remove} from '@mui/icons-material';
import {Autocomplete, IconButton, TextField} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  FormContainer,
  FormControlContainer,
  PaperContainer,
  SubHeader,
  Title,
  TitleWithDivider,
} from '../../../layout';
import useKeyboardShortcut from '../../CustomHooks/useKeyboardShortcut';

const top100Films = [
  {label: 'The Shawshank Redemption', year: 1994},
  {label: 'The Godfather', year: 1972},
  {label: 'The Godfather: Part II', year: 1974},
  {label: 'The Dark Knight', year: 2008},
  {label: '12 Angry Men', year: 1957},
  {label: 'Schindler\'s List', year: 1993},
  {label: 'Pulp Fiction', year: 1994},
  {
    label: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  {label: 'The Good, the Bad and the Ugly', year: 1966},
  {label: 'Fight Club', year: 1999},
  {
    label: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    label: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  {label: 'Forrest Gump', year: 1994},
  {label: 'Inception', year: 2010},
  {
    label: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  {label: 'One Flew Over the Cuckoo\'s Nest', year: 1975},
  {label: 'Goodfellas', year: 1990},
  {label: 'The Matrix', year: 1999},
  {label: 'Seven Samurai', year: 1954},
  {
    label: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  {label: 'City of God', year: 2002},
  {label: 'Se7en', year: 1995},
  {label: 'The Silence of the Lambs', year: 1991},
  {label: 'It\'s a Wonderful Life', year: 1946},
  {label: 'Life Is Beautiful', year: 1997},
  {label: 'The Usual Suspects', year: 1995},
  {label: 'Léon: The Professional', year: 1994},
  {label: 'Spirited Away', year: 2001},
  {label: 'Saving Private Ryan', year: 1998},
  {label: 'Once Upon a Time in the West', year: 1968},
  {label: 'American History X', year: 1998},
  {label: 'Interstellar', year: 2014},
  {label: 'Casablanca', year: 1942},
  {label: 'City Lights', year: 1931},
  {label: 'Psycho', year: 1960},
  {label: 'The Green Mile', year: 1999},
  {label: 'The Intouchables', year: 2011},
  {label: 'Modern Times', year: 1936},
  {label: 'Raiders of the Lost Ark', year: 1981},
  {label: 'Rear Window', year: 1954},
  {label: 'The Pianist', year: 2002},
  {label: 'The Departed', year: 2006},
  {label: 'Terminator 2: Judgment Day', year: 1991},
  {label: 'Back to the Future', year: 1985},
  {label: 'Whiplash', year: 2014},
  {label: 'Gladiator', year: 2000},
  {label: 'Memento', year: 2000},
  {label: 'The Prestige', year: 2006},
  {label: 'The Lion King', year: 1994},
  {label: 'Apocalypse Now', year: 1979},
  {label: 'Alien', year: 1979},
  {label: 'Sunset Boulevard', year: 1950},
  {
    // eslint-disable-next-line max-len
    label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964,
  },
  {label: 'The Great Dictator', year: 1940},
  {label: 'Cinema Paradiso', year: 1988},
  {label: 'The Lives of Others', year: 2006},
  {label: 'Grave of the Fireflies', year: 1988},
  {label: 'Paths of Glory', year: 1957},
  {label: 'Django Unchained', year: 2012},
  {label: 'The Shining', year: 1980},
  {label: 'WALL·E', year: 2008},
  {label: 'American Beauty', year: 1999},
  {label: 'The Dark Knight Rises', year: 2012},
  {label: 'Princess Mononoke', year: 1997},
  {label: 'Aliens', year: 1986},
  {label: 'Oldboy', year: 2003},
  {label: 'Once Upon a Time in America', year: 1984},
  {label: 'Witness for the Prosecution', year: 1957},
  {label: 'Das Boot', year: 1981},
  {label: 'Citizen Kane', year: 1941},
  {label: 'North by Northwest', year: 1959},
  {label: 'Vertigo', year: 1958},
  {
    label: 'Star Wars: Episode VI - Return of the Jedi',
    year: 1983,
  },
  {label: 'Reservoir Dogs', year: 1992},
  {label: 'Braveheart', year: 1995},
  {label: 'M', year: 1931},
  {label: 'Requiem for a Dream', year: 2000},
  {label: 'Amélie', year: 2001},
  {label: 'A Clockwork Orange', year: 1971},
  {label: 'Like Stars on Earth', year: 2007},
  {label: 'Taxi Driver', year: 1976},
  {label: 'Lawrence of Arabia', year: 1962},
  {label: 'Double Indemnity', year: 1944},
  {
    label: 'Eternal Sunshine of the Spotless Mind',
    year: 2004,
  },
  {label: 'Amadeus', year: 1984},
  {label: 'To Kill a Mockingbird', year: 1962},
  {label: 'Toy Story 3', year: 2010},
  {label: 'Logan', year: 2017},
  {label: 'Full Metal Jacket', year: 1987},
  {label: 'Dangal', year: 2016},
  {label: 'The Sting', year: 1973},
  {label: '2001: A Space Odyssey', year: 1968},
  {label: 'Singin\' in the Rain', year: 1952},
  {label: 'Toy Story', year: 1995},
  {label: 'Bicycle Thieves', year: 1948},
  {label: 'The Kid', year: 1921},
  {label: 'Inglourious Basterds', year: 2009},
  {label: 'Snatch', year: 2000},
  {label: '3 Idiots', year: 2009},
  {label: 'Monty Python and the Holy Grail', year: 1975},
];

const columns = [
  {field: 'id', headerName: 'No.', width: 70},,
  {
    field: 'product',
    headerName: 'Product',
    width: 150,
    editable: false,
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 150,
    editable: false,
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    type: 'number',
    width: 150,
    editable: false,
    renderCell: (params) => {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <IconButton
            onClick={() => console.log(params.row)}
            color="inherit"
          >
            <Add />
          </IconButton>
          {params.value}
          <IconButton
            onClick={() => console.log(params.row)}
            color="inherit"
          >
            <Remove />
          </IconButton>
        </div>
      );
    },
  },
  {
    field: 'sub_total',
    headerName: 'Sub Total',
    type: 'number',
    width: 110,
    editable: false,
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 120,
    editable: false,
    disableSelectionOnClick: true,
    renderCell: (params) => {
      return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <IconButton
            onClick={() => console.log(params.row)}
            color="inherit"
          >
            <Delete />
          </IconButton>
          <IconButton
            onClick={() => console.log(params.row)}
            color="inherit"
          >
            <Edit />
          </IconButton>
        </div>
      );
    },
  },
];

const rows = [
  {
    id: 1,
    product: 'Product 1',
    price: '$100',
    quantity: '1',
    sub_total: '$100',
  },
];

const Sales = () => {
  const [pageSize, setPageSize] = useState(20);
  const [paid, setPaid] = useState(0);
  const barcodeRef = useRef(null);
  const keys = ['Shift', 'E'];
  const handleKeyboardShortcut = useCallback((keys) => {
    setPaid((currPaid) => currPaid + 1);
  }, [paid]);
  useKeyboardShortcut(keys, handleKeyboardShortcut);

  useEffect(() => {
    barcodeRef.current.focus();
    return () => {
      barcodeRef.current.blur();
    };
  }, []);

  return (
    <PaperContainer elevation={3} square>
      <TitleWithDivider>Sales</TitleWithDivider>
      <SubHeader/>
      <div style={{
        height: 'calc(100vh - 15.5em)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <FormContainer onSubmit={(e) => e.preventDefault()}>
          <FormControlContainer>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={top100Films}
              // sx={{width: 300}}
              renderInput={
                (params) =>
                  <TextField
                    inputRef={barcodeRef}
                    {...params}
                    label="Name or Code"
                  />
              }
            />
          </FormControlContainer>
        </FormContainer>
        <DataGrid
          sx={{
            marginTop: '1em',
            maxWidth: '50%',
            minWidth: '40em',
          }}
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          onPageSizeChange={(page) => {
            setPageSize(page);
          }}
          onRowEditCommit={(row) => {
            console.log(row); console.log('onRowEditCommit');
          }}
        />
        <div style={{
          maxWidth: '50%',
          minWidth: '40em',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          gap: '1em',
          marginTop: '1em',
        }}>
          <TextField
            sx={{width: '10em', fontSize: '2em'}}
            id={'paid'}
            label={'Paid'}
            name={'paid'}
            value={paid}
            variant="standard"
            fullWidth
            onChange={(e)=> setPaid(e.target.value)}
          />
          <Title>Changes :</Title>
          <Title sx={{fontSize: '2em'}}>Total :</Title>
        </div>
      </div>
    </PaperContainer>
  );
};

export default Sales;
