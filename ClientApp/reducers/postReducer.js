const postReducer = (state = [], action) => {
    switch (action.type) {  //Propiedad que siempre debe tener el objeto plano de JS
        case 'ADD_POST':
            return state.concat([action.data]);
        default:
            return state;
    }
}
export default postReducer;