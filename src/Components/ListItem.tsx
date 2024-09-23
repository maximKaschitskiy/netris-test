import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

type ListItemType = {
    isSelected: boolean,
    handleClick: (evt: React.MouseEvent<HTMLDivElement>, i: number) => void
}

export default function ListItem({isSelected, handleClick}: ListItemType) {

  return (
        <ListItemButton
          selected={isSelected}
          onClick={(event) => handleClick(event, 2)}
        >
          <ListItemText primary="Trash" />
        </ListItemButton>
  );
}
