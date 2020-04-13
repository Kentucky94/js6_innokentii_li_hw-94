const saveToLocalStorage = state => {
  try{
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
    console.log('Successfully saved');
  }catch(error){
    console.log('Could not save to local storage')
  }
};

export const loadFromLocalStorage = () => {
  try{
    const serializedState = localStorage.getItem('state');
    console.log('State loaded successfully');
    if(serializedState === null) return undefined;

    return JSON.parse(serializedState);
  }catch(error){
    return undefined;
  }
};

const actionsList = ['LOGIN_USER_SUCCESS', 'LOGOUT_USER_SUCCESS'];

export const localStorageMiddleware = store => next => action => {
  let result = next(action);

  const user = store.getState().users.user;

  if(actionsList.includes(action.type)){
    saveToLocalStorage({users: {user}})
  }

  return result;
};