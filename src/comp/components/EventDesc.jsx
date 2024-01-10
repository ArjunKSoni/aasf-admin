import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function EventDesc({ EventName, setEventName, Mode, setMode, Venue, setVenue, Desc, setDesc, Date, setDate }) {

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Event Desc.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={EventName}
            onChange={e => setEventName(e.target.value)}
            label="Event name"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={Mode}
            onChange={e => setMode(e.target.value)}
            label="Mode Of Event (online/offline)"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={Venue}
            onChange={e => setVenue(e.target.value)}
            label="Venue"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            value={Desc}
            onChange={e => setDesc(e.target.value)}
            label="Event Description"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <h1 className='mt-1'>
            Date: (leave blank in case of upcoming Event)
          </h1>
          <div className='w-full bg-black' style={{ height: 1 }}></div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{ marginTop: 2 }}
            required
            value={Date}
            onChange={e => setDate(e.target.value)}
            type="date"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}