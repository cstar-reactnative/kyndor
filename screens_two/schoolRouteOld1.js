import { createStackNavigator } from "react-navigation";

import FindSchool from "./schoolStack/FindSchool";
import AddSchool from "./schoolStack/AddSchool";
import ViewSchool from "./schoolStack/ViewSchools";
import SchoolDetails from '../screens/schools/schools.js';
import SchoolAddRequest from "./schoolStack/schoolAddRequest";

export default createStackNavigator(
  {
    ViewSchool:{screen:ViewSchool},
    FindSchool:{screen:FindSchool},
    AddSchool:{screen:AddSchool},
    SchoolDetails:{screen:SchoolDetails},
    SchoolAddRequest:{screen:SchoolAddRequest}
  },
  {
    headerMode: () => null
  }
);
