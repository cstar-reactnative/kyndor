import {
  createStackNavigator,
} from 'react-navigation';

import S_map from './schools/s_map.js';
import S_list from './schools/s_list.js';
import S_details from './schools/schools.js';
import S_SearchPage from './schools/schoolSearch.js';
import S_sendInvite from './schools/schoolSendInviteScreen.js';
import S_inviteSent from './schools/schoolInviteSent.js';
import S_createThread from './schools/schoolCreateThread';
import S_route from './schools/schoolRoute.js';
import S_filter from './schools/s_filter.js';
import S_add from './schools/schoolAddRequest.js';

const SchoolApp = createStackNavigator({
  SchoolRoute: {screen: S_route},
  SchoolListScreen: {screen: S_list},
  SchoolMapScreen: {screen: S_map},
  SchoolDetailsScreen: {screen: S_details},
  SchoolSearchScreen: {screen: S_SearchPage},
  SchoolSendInvite: {screen: S_sendInvite},
  SchoolInviteSent: {screen: S_inviteSent},
  SchoolCreateThread: {screen: S_createThread},
  SchoolFilter: {screen: S_filter},
  SchoolAdd: {screen: S_add}
});

export default SchoolApp
