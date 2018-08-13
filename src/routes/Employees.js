import express from 'express';
import errorHandler from 'helpers/error';
import faker from 'faker';
import mongoose from 'mongoose';
const router = express.Router();
const Employee = mongoose.model('Employee');

router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.ok({items: employees});
  } catch (err) {
    errorHandler(res, 'employees list error')(err);
  }
});

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
