import {takeLatest, takeEvery, call, put} from 'redux-saga/effects';
import {push} from 'react-router-redux';
import _omit from 'lodash/omit';
import {
  // profileActionTypes,
  loadProfileActions,
  entityActionTypes,
  createEntityActions,
  patchEntityActions,
  getEntityActions,
  deleteBatchEntityActions,
} from 'containers/App/actions';
import http from 'utils/http';

export function* loadProfile({schema}) {
  const url = 'auth/profile';

  try {
    const profile = yield call(http.get, {url, schema});
    console.log('profile', profile);
    yield put(loadProfileActions.success(profile));
  } catch (err) {
    yield put(loadProfileActions.failure(err));
  }
}

export function* createEntity({payload, entity, meta}) {
  const {url, schema} = entity;

  try {
    const entityResponse = yield call(http.post, {
      url,
      query: meta.query,
      schema,
      payload,
    });
    if (meta && meta.resolve) {
      meta.resolve(entityResponse);
    }
    yield put(
      createEntityActions.success(entityResponse, entity, _omit(meta, ['resolve', 'reject']))
    );
  } catch (err) {
    console.log('createEntity error', err);
    if (meta && meta.reject) {
      meta.reject(err);
    }
    yield put(createEntityActions.failure(err, entity));
  }
}

export function* updateEntity({payload, entity, meta}) {
  const {url, schema} = entity;

  try {
    const entityResponse = yield call(http.patch, {
      url,
      query: meta.query,
      schema,
      payload,
    });
    if (meta && meta.resolve) {
      meta.resolve(entityResponse);
    }
    yield put(patchEntityActions.success(entityResponse, entity));
  } catch (err) {
    console.log('updateEntity error', err);
    if (meta && meta.reject) {
      meta.reject(err);
    }
    yield put(patchEntityActions.failure(err, entity));
  }
}

export function* deleteEntityBatch({payload, entity, meta}) {
  const {url, schema} = entity;

  try {
    const entityResponse = yield call(http.delete, {
      url,
      query: meta.query,
      schema,
      payload,
    });
    if (meta && meta.resolve) {
      meta.resolve(entityResponse);
    }
    yield put(deleteBatchEntityActions.success(entityResponse, entity));
  } catch (err) {
    console.log('updateEntity error', err);
    if (meta && meta.reject) {
      meta.reject(err);
    }
    yield put(deleteBatchEntityActions.failure(err, entity));
  }
}

export function* getEntity({query, entity, meta}) {
  const {url, schema} = entity;

  try {
    const entityResponse = yield call(http.get, {url, query, schema});
    if (meta && meta.resolve) {
      meta.resolve(entityResponse);
    }
    yield put(getEntityActions.success(entityResponse, entity));
  } catch (err) {
    console.log('getEntity error', err);
    if (meta && meta.reject) {
      meta.reject(err);
    }

    yield put(getEntityActions.failure(err, entity));
  }
}

export function* handleEntityCreated({entity, response}) {
  if (entity.key === 'user') {
    localStorage.setItem('authToken', response.result.token);
    yield put(push('/dictionaries'));
  }
}

// Root saga
export default function* rootSaga() {
  // if necessary, start multiple sagas at once with `all`
  yield [
    // takeEvery(profileActionTypes.GET.REQUEST, loadProfile),
    takeEvery(entityActionTypes.GET.REQUEST, getEntity),
    takeLatest(entityActionTypes.POST.REQUEST, createEntity),
    takeLatest(entityActionTypes.POST.SUCCESS, handleEntityCreated),
    takeLatest(entityActionTypes.PATCH.REQUEST, updateEntity),
    takeLatest(entityActionTypes.DELETE_BATCH.REQUEST, deleteEntityBatch),
  ];
}
