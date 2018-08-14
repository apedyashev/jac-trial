// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {Mutation} from 'react-apollo';
// components
import {Redirect} from 'react-router';
import {Form, Field, reduxForm} from 'redux-form/immutable';
import {Button, Paper, ReduxFormFields} from 'components/ui';
import {Grid} from 'semantic-ui-react';
// other
import {GET_EMPLOYEES, PER_PAGE, SAVE_EMPLOYEE} from 'graphql/Employee';
import styles from './index.css';
const formId = 'employeeEditForm';

class EmployeeEditForm extends React.PureComponent {
  static propTypes = {
    // injected by redux form
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object.isRequired,
  };

  render() {
    const {handleSubmit, initialValues} = this.props;

    return (
      <Mutation
        mutation={SAVE_EMPLOYEE}
        update={(cache, {data: {saveEmployee}}) => {
          try {
            // add new item to the cache only if it's a NEW item
            if (!initialValues.get('id')) {
              const {employees} = cache.readQuery({
                query: GET_EMPLOYEES,
                variables: {page: 1, perPage: PER_PAGE},
              });

              cache.writeQuery({
                query: GET_EMPLOYEES,
                variables: {page: 1, perPage: PER_PAGE},
                data: {
                  employees: {
                    ...employees,
                    docs: [...employees.docs, ...[saveEmployee]],
                  },
                },
              });
            }
          } catch (e) {
            // error is trown only if employees list hasn't been loaded (for example) if
            // page is refreshed. But it's OK, we can ignore it
          }
        }}
      >
        {(saveEmployee, {loading, data}) => (
          <Form
            onSubmit={handleSubmit((values) => {
              console.log('values', values);
              return saveEmployee({
                variables: {...values.toJS(), id: initialValues && initialValues.get('id')},
              });
            })}
            className={styles.root}
          >
            {data &&
              data.saveEmployee &&
              data.saveEmployee.id && <Redirect to={`/employees/${data.saveEmployee.id}`} />}
            <Grid className={styles.grid}>
              <Grid.Column computer={8} mobile={16}>
                <Paper>
                  <Field
                    name="firstName"
                    type="text"
                    component={ReduxFormFields.Input}
                    label="First Name"
                    hintText="Enter Employee's first name"
                  />
                  <Field
                    name="lastName"
                    type="text"
                    component={ReduxFormFields.Input}
                    label="Last Name"
                    hintText="Enter Employee's last name"
                  />
                  <Field
                    name="email"
                    type="text"
                    component={ReduxFormFields.Input}
                    label="Email"
                    hintText="Enter Employee's email"
                  />
                </Paper>
              </Grid.Column>
              <Grid.Column className={styles.column} computer={8} mobile={16}>
                <Paper className={styles.shrinkHeigh}>
                  <Field
                    name="position"
                    type="text"
                    component={ReduxFormFields.Input}
                    label="Posiotion"
                    hintText="Enter Employee's position"
                  />
                </Paper>
              </Grid.Column>
            </Grid>

            <div className={styles.actionsBar}>
              <Button type="submit" positive loading={loading} disabled={loading}>
                Save
              </Button>
            </div>
          </Form>
        )}
      </Mutation>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.get('firstName')) {
    errors.firstName = 'required';
  }

  if (!values.get('lastName')) {
    errors.lastName = 'required';
  }

  if (!values.get('position')) {
    errors.position = 'required';
  }

  if (!values.get('email')) {
    errors.email = 'required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.get('email'))) {
    errors.email = 'invalid email address';
  }

  return errors;
};

export default reduxForm({
  form: formId,
  validate,
})(EmployeeEditForm);
