// libs
import React from 'react';
import gql from 'graphql-tag';
// components
import {Query} from 'react-apollo';
import InfiniteList from 'components/InfiniteList';
import {PageLoader} from 'components/ui';
import EmployeesListItem from '../EmployeesListItem';

// TODO: move to a separate file
export const GET_EMPLOYEES = gql`
  query Employees($page: Int, $perPage: Int) {
    employees(page: $page, perPage: $perPage) {
      docs {
        id
        email
        avatar
        firstName
        lastName
        position
      }
      page
      pages
    }
  }
`;
export const PER_PAGE = 25;
const getRowHeight = () => 54;
// eslint-disable-next-line react/prop-types
const rowRenderer = ({item, key, style}) => {
  return <EmployeesListItem key={key} style={style} data={item} />;
};

export default function EmployeesList() {
  return (
    <Query
      query={GET_EMPLOYEES}
      variables={{
        page: 1,
        perPage: PER_PAGE,
      }}
    >
      {({loading, error, data, fetchMore}) => {
        if (loading) {
          return <PageLoader />;
        }
        if (error) {
          return <p>Error :(</p>;
        }

        const {page, pages} = data.employees;
        return (
          <InfiniteList
            hasNextPage={page < pages}
            perPage={PER_PAGE}
            items={data.employees.docs}
            rowRenderer={rowRenderer}
            dataLoadingMessage="Loading employees, please wait"
            noRowsMessage="No employees in the list"
            getRowHeight={getRowHeight}
            loadNextPage={({page}) => {
              fetchMore({
                variables: {
                  page,
                },
                updateQuery: (prev, {fetchMoreResult}) => {
                  if (!fetchMoreResult) return prev;
                  console.log('prev', prev);
                  return Object.assign({}, prev, {
                    employees: {
                      ...fetchMoreResult.employees,
                      docs: [...prev.employees.docs, ...fetchMoreResult.employees.docs],
                    },
                  });
                },
              });
            }}
          />
        );
      }}
    </Query>
  );
}
EmployeesList.propTypes = {};
