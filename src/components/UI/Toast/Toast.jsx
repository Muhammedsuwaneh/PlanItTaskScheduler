import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Toast({ snackBarType, snackMessage }) {
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  let content = "";

  if(snackBarType === "success") {
    content =
       <>
         <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {snackMessage}
        </Alert>
        </Snackbar>
       </>
  }
  else if(snackBarType === "error") {
    content = <>
     <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {snackMessage}
        </Alert>
      </Snackbar>
    </>
  }

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
        {content}
    </Stack>
  );
}