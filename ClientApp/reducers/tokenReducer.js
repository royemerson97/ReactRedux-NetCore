const InitialState = {
    token : '',
    isAuth : false
}

const tokenReducer = (state = InitialState, action) => {
    switch (action.type) {  //Propiedad que siempre debe tener el objeto plano de JS
        case 'SET_TOKEN':
            return {
                token : "Bearer "  + action.PAYLOAD,
                isAuth : true
            };
    }
    return state;
}
export default tokenReducer;