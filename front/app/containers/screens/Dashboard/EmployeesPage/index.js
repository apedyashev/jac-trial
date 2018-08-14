import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import _without from 'lodash/without';
import {push} from 'react-router-redux';
import {createStructuredSelector} from 'reselect';
// import {Query} from 'react-apollo';
// import gql from 'graphql-tag';
// actions
// selectors
// components
import {AppContainer} from 'components';
import {Sidebar, Menu} from 'semantic-ui-react';
// import {Prompt, PageLoader} from 'components/ui';
import {Topbar} from './components';
import EmployeesList from './components/EmployeesList';

// other
import styles from './index.css';

export class EmployeesPage extends React.PureComponent {
  static propTypes = {};
  state = {};

  render() {
    return (
      <div>
        <Helmet>
          <title>Employees</title>
        </Helmet>
        <AppContainer withMobileTopbar withDesktopTopbar topbar={<Topbar />}>
          <EmployeesList />
        </AppContainer>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  // dictionaryId: makeSelectDictionarIdBySlug(),
  // translateDirection: makeSelectTranslateDirection(),
});
function mapDispatchToProps(dispatch) {
  return {
    // addWordToWordSet: ({dictionaryId, wordSetId}, wordIds, {resolve, reject} = {}) =>
    //   dispatch(addWordToWordSet({dictionaryId, wordSetId}, wordIds, {resolve, reject})),
    // deleteWordsBatch: (wordIds, {resolve, reject} = {}) =>
    //   dispatch(deleteWordsBatch(wordIds, {resolve, reject})),
    // dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeesPage);
