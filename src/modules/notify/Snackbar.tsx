/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { createStructuredSelector } from 'reselect';
import { selectNotification } from './dux/select';
import { removeSnackbar } from './dux/actions';

interface Props {
  notifications?: Array<any>;
  enqueueSnackbar?: (message: any, options: any) => void;
  removeSnackbar?: (key: any) => void;
}

class Notifier extends Component<Props> {
  displayed: Array<string> = [];

  storeDisplayed = id => {
    this.displayed = [...this.displayed, id];
  };

  shouldComponentUpdate({ notifications: newSnacks = [] }: Props) {
    const { notifications: currentSnacks } = this.props;
    let notExists = false;

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < newSnacks.length; i += 1) {
      if (notExists) {
        continue;
      }
      notExists =
        notExists ||
        !currentSnacks.filter(({ key }) => newSnacks[i].key === key).length;
    }
    return notExists;
  }

  componentDidUpdate() {
    const { notifications = [] } = this.props;
    notifications.forEach(notification => {
      // Do nothing if snackbar is already displayed
      if (this.displayed.includes(notification.key)) {
        return;
      }
      // Display snackbar using notistack
      this.props.enqueueSnackbar(notification.message, notification.options);
      // Keep track of snackbars that we've displayed
      this.storeDisplayed(notification.key);
      // Dispatch action to remove snackbar from redux store
      this.props.removeSnackbar(notification.key);
    });
  }

  render() {
    return null;
  }
}

const mapStateToProps = () =>
  createStructuredSelector({
    notifications: selectNotification()
  });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ removeSnackbar }, dispatch);

export default withSnackbar(
  connect(mapStateToProps, mapDispatchToProps)(Notifier)
);
