import React from 'react';
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Typography,
  IconButton
} from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Router from 'next/router';

type Props = {
  children: React.ReactElement;
  title: string;
  hasBackButton: boolean;
  window?: () => Window;
};

function ElevationScroll(props: Props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}

export default function MainAppBar(props: Props) {
  return (
    <React.Fragment>
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar>
            {props.hasBackButton && (
              <IconButton onClick={() => Router.back()}>
                <NavigateBeforeIcon style={{ color: '#fff' }} />
              </IconButton>
            )}

            <Typography variant="h6" style={{ flexGrow: 1 }}>
              {props.title}
            </Typography>
            <div>
              <img src="/svg/pikachu.svg" width={30} height={30} />
            </div>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </React.Fragment>
  );
}
