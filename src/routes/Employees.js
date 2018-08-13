import express from 'express';
import faker from 'faker';
import mongoose from 'mongoose';
import {parseSortBy} from 'helpers/list';
import errorHandler from 'helpers/error';
const router = express.Router();
const Employee = mongoose.model('Employee');

/**
 * @swagger
 *
 * /employees:
 *   get:
 *     summary: Returns the list of emplyees
 *     tags: [Employees]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: "#/parameters/page"
 *       - $ref: "#/parameters/perPage"
 *       - $ref: "#/parameters/sortBy"
 *     responses:
 *       200:
 *         description: Ok
 *         schema:
 *           $ref: '#/definitions/EmployeesResponse'
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#/definitions/ResponseServerError'
 *
 */
router.get('/', async (req, res) => {
  try {
    const perPage = +req.query.perPage || 30;
    const page = +req.query.page || 1;
    const sort = parseSortBy(req.query.sortBy);

    const employees = await Employee.paginate({}, {page, limit: perPage, sort});
    res.paginated(employees).ok();
  } catch (err) {
    errorHandler(res, 'employees list error')(err);
  }
});

/**
 * @swagger
 *
 * /employees:
 *   post:
 *     summary: Creates a new employee
 *     tags: [Employees]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: payload
 *         description: Endpoint's payload.
 *         in: body
 *         required: true
 *         schema:
 *           $ref: "#/definitions/EmployeePayload"
 *     responses:
 *       201:
 *         description: Ok
 *         schema:
 *           $ref: '#/definitions/EmployeeResponse'
 *       422:
 *         description: Validation error
 *         schema:
 *           $ref: '#/definitions/ValidationError'
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#/definitions/ResponseServerError'
 *
 */
router.post('/', async (req, res) => {
  try {
    const employee = new Employee({
      ...req.body,
      // NOTE: fake avatar for demo
      avatar: faker.image.avatar(),
    });
    await employee.save();

    res.ok('employee created', {item: employee});
  } catch (err) {
    errorHandler(res, 'employee create error')(err);
  }
});

/**
 * @swagger
 *
 * /employees/{id}:
 *   put:
 *     summary: Updates an existing employee
 *     tags: [Employees]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: "#/parameters/id"
 *       - name: payload
 *         description: Endpoint's payload.
 *         in: body
 *         required: true
 *         schema:
 *           $ref: "#/definitions/EmployeePayload"
 *     responses:
 *       200:
 *         description: Ok
 *         schema:
 *           $ref: '#/definitions/EmployeeResponse'
 *       422:
 *         description: Validation error
 *         schema:
 *           $ref: '#/definitions/ValidationError'
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#/definitions/ResponseServerError'
 *
 */
router.put('/:id', async (req, res) => {
  try {
    const employee = await Employee.findOne({_id: req.params.id});
    if (!employee) {
      return res.notFound('employee not found');
    }

    // NOTE: in real word appliction filds from req.body can be filtered based on user's
    // permissions. For example only user that has the 'admin' role is allowed to update
    // email and/or passsword
    employee.set(req.body);
    await employee.save();

    return res.ok('employee updated', {item: employee});
  } catch (err) {
    errorHandler(res, 'employee create error')(err);
  }
});

/**
 * @swagger
 *
 * /employees/{id}:
 *   delete:
 *     summary: Deletes an employee
 *     tags: [Employees]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: "#/parameters/id"
 *     responses:
 *       200:
 *         description: Deleted
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#/definitions/ResponseServerError'
 *
 */
router.delete('/:id', async (req, res) => {
  try {
    const employee = await Employee.findOne({_id: req.params.id});
    if (!employee) {
      return res.notFound();
    }
    await employee.remove();

    res.ok('employee deleted');
  } catch (err) {
    errorHandler(res, 'employee create error')(err);
  }
});

module.exports = (app) => {
  app.use('/employees', router);
};
