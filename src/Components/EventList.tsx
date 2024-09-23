import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from './ListItem';

export default function EventList() {

  const handleListItemClick = (
    evt: React.MouseEvent<HTMLDivElement, MouseEvent>,
    i: number,
  ) => {
    console.log('!!');
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folder">
        <ListItem
                    isSelected={true}
                    handleClick={(event) => handleListItemClick(event, 2)}
        ></ListItem>
      </List>
    </Box>
  );
}
