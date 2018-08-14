import {createSelector} from 'reselect';

export const selectGlobal = (state) => state.get('global');
export const selectRoute = (state) => state.get('route');

export const makeSelectLocation = () =>
  createSelector(selectRoute, (routeState) => routeState.get('location').toJS());
export const makeSelectLocationPath = () =>
  createSelector(selectRoute, (routeState) => routeState.getIn(['location', 'pathname']));
