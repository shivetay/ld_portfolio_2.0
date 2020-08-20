import { connect } from 'react-redux';
// import { removeAlertAction } from '../../../redux/AlertReducer';

import Alerts from './Alerts.js';

const mapStateToProps = (state) => ({
  alerts: state.alerts,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);
