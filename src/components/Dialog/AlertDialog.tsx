import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Props {
  title: string;
  desc: string;
  isOpen: boolean;
  isPosting: boolean;
  onClickClose: (isOpen: boolean) => any;
  onSubmit: () => any;
}

export default function AlertDialog(props: Props) {
  const { title, desc, isOpen, onClickClose, onSubmit } = props;

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={() => onClickClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {desc}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClickClose(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary" variant="contained">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
