import {schema} from 'normalizr';
import {action, createRequestTypes} from 'utils/actions';

export function resetEntity(entityName) {
  return {
    type: RESET_ENTITY,
    entityName,
  };
}
export const entityActionTypes = {
  GET: createRequestTypes('ENTITY/GET'),
  POST: createRequestTypes('ENTITY/CREATE'),
  PATCH: createRequestTypes('ENTITY/PATCH'),
  DELETE_BATCH: createRequestTypes('ENTITY/DELETE_BATCH'),
};
export const createEntityActions = {
  request: (payload, entity, meta) =>
    action(entityActionTypes.POST.REQUEST, {payload, entity, meta}),
  success: (response, entity, meta) =>
    action(entityActionTypes.POST.SUCCESS, {...response, entity, meta}),
  failure: (error, entity) => action(entityActionTypes.POST.FAILURE, {error, entity}),
};
export const getEntityActions = {
  request: (query, entity, meta) => action(entityActionTypes.GET.REQUEST, {entity, query, meta}),
  success: (response, entity) => action(entityActionTypes.GET.SUCCESS, {...response, entity}),
  failure: (error, entity) => action(entityActionTypes.GET.FAILURE, {error, entity}),
};
export const patchEntityActions = {
  request: (payload, entity, meta) =>
    action(entityActionTypes.PATCH.REQUEST, {payload, entity, meta}),
  success: (response, entity) => action(entityActionTypes.PATCH.SUCCESS, {...response, entity}),
  failure: (error, entity) => action(entityActionTypes.PATCH.FAILURE, {error, entity}),
};
export const deleteBatchEntityActions = {
  request: (payload, entity, meta) =>
    action(entityActionTypes.DELETE_BATCH.REQUEST, {payload, entity, meta}),
  success: (response, entity) =>
    action(entityActionTypes.DELETE_BATCH.SUCCESS, {...response, entity}),
  failure: (error, entity) => action(entityActionTypes.DELETE_BATCH.FAILURE, {error, entity}),
};
