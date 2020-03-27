import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import rootReducer from '../reducers'

const persistConfig = {
    key: 'primary',
    storage: AsyncStorage,
    whitelist: ['searchReducer', 'todos']
};

const middleware = []

const persistedReducer = persistReducer(persistConfig,rootReducer);

const store = createStore(
    persistedReducer,
    undefined,
    compose(
        applyMiddleware(
            ...middleware
        )
    )
)

const persistor = persistStore(store)

export {persistor,store}