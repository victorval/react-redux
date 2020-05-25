export default function courseReducer(state = [], action) {
  switch (action.type) {
    // dont do this case "CREATE_COURSE": state.push(action.course);
    case "CREATE_COURSE":
      return [...state, { ...action.course }];
    default:
      return state;
  }
}
