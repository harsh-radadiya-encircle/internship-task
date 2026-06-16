import React from "react";
import ThemeAssignment from "./assignments/8-context-api/ThemeAssignment";
import CustomHooksDemo from "./assignments/9-custom-hooks/CustomHooksDemo";
import ReduxTodoDemo from "./assignments/10-redux-toolkit-basics/ReduxTodoDemo";
import AsyncThunkDemo from "./assignments/11-redux-toolkit-async-thunk-middleware/AsyncThunkDemo";
import Parent from "./assignments/12-performance-optimization/Parent";
import MultiStepForm from "./assignments/13-formik-yup/MultiStepForm";

function App(){
return (
  <>
  
  <ThemeAssignment />

  <CustomHooksDemo />

  <ReduxTodoDemo />

  <AsyncThunkDemo />

  <Parent />

<MultiStepForm />
  
  </>
)
}

export default App;