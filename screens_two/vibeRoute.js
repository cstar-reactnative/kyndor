import { createStackNavigator } from "react-navigation";

import Feed from "./vibeStack/Feed";
import ViewCategory from "./vibeStack/ViewCategory";
import ViewDetails from "./vibeStack/ViewDetails";
import Blog from "./vibeStack/Blog";
import CreateVibe from "./vibeStack/CreateVibe";

export default createStackNavigator({
  Home: {
    screen: Feed
  },
  Category: {
    screen: ViewCategory
  },
  Details: {
    screen: ViewDetails
  },
  Blog: {
    screen: Blog
  },
  CreateVibe: {
    screen: CreateVibe
  }
},
{
  headerMode: () => null
});
