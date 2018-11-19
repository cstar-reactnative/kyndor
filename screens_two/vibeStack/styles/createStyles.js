import {
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import Color from '@theme/colorsThree';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const toolbarHeight = Platform.OS === 'ios' ? 74 : 66;
const coverImageHeight = 184;
const fieldHeight = 31;
const paddingHeight = 26;
const fontBig = 17;
const fontSmall = 12;
const buttonHeight = 40;

export const googlePlacesCustomStyle = StyleSheet.create({
    textInputContainer: {
      width: deviceWidth,
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'flex-start',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    textInput: {
      backgroundColor: Color.paleGrey,
      flex: 1,
      height: 30,
      borderRadius: 5,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 4.5,
      paddingBottom: 4.5,
      fontSize: fontBig,
      margin: 5,
    },
    row: {
      paddingVertical: 5,
      paddingHorizontal: 10,
      height: fieldHeight + paddingHeight,
      borderBottomWidth: 1,
      borderBottomColor: Color.paleGrey,
    },
  });

export const styles = StyleSheet.create({
  header: {
    backgroundColor: Color.indigoBlue,
    flexDirection: 'row',
    height: toolbarHeight,
    width: deviceWidth,
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: Platform.OS === 'ios' ? 35 : 25,
  },
  headerText: {
    color: 'white',
    fontSize: fontBig,
    alignSelf: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  contentContainer: {
    flexDirection: 'column',
    height: deviceHeight - toolbarHeight,
    backgroundColor:'white'
  },
  backgroundImage: {
    width: deviceWidth,
    height: coverImageHeight,
  },
  photoUploadButton: {
    borderColor: 'white',
    height: buttonHeight,
    backgroundColor: '#0000003d',
    borderWidth: 2
  },
  row: {
    flexDirection: 'row',
  },
  labelValueContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
  },
  editButtonContainer: {
    flex: 3,
    marginLeft: 'auto',
    padding: 10,
  },
  formContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 120,
  },
  fieldContainer: {
    height: fieldHeight + paddingHeight,
    paddingVertical: 13,
    borderColor: Color.charcoalGrey,
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  doubleFieldContainer: {
    height: fieldHeight * 2 + paddingHeight,
    paddingVertical: 13,
    borderColor: Color.charcoalGrey,
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  labelContainer: {
    height: buttonHeight,
    alignSelf: 'flex-start',
    paddingTop: 15,
  },
  label: {
    fontSize: fontBig,
    color: Color.charcoalGrey,
    alignSelf: 'flex-start',
    paddingLeft: 5,
  },
  placeholderText: {
    fontSize: fontBig,
    color: Color.charcoalGrey,
    alignSelf: 'flex-start',
    width: deviceWidth / 2,
  },
  pickerItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Color.paleGrey,
    alignSelf: 'flex-start',
    width: '100%',
  },
  nameInput: {
    fontSize: fontBig,
    color: Color.charcoalGrey,
    height: Platform.OS === 'ios' ? fieldHeight : fieldHeight + 14,
    width: '100%',
    paddingHorizontal: 5,
  },
  creatorPhoto: {
    height: 30,
    width: 30,
    borderRadius: 15,
    margin: 5,
  },
  creatorInfo: {
    paddingTop: 5,
    paddingLeft: 5,
  },
  creatorText: {
    fontSize: fontSmall,
    color: Color.charcoalGrey,
    alignSelf: 'flex-start',
    paddingTop: 5,
    marginBottom: -10,
  },
  smallLabel: {
    fontSize: fontSmall,
    color: Color.charcoalGrey,
    alignSelf: 'flex-start',
    paddingLeft: 5,
    paddingTop: 5,
  },
  dateTime: {
    height: fieldHeight,
    marginTop: 5,
    borderColor: Color.charcoalGrey,
  },
  datePicker: {
    flex: 1,
    borderWidth: 0,
    borderColor: 'white',
    paddingHorizontal: 5,
    width: '100%',
  },
  boxFieldContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  detailsTextBox: {
    minHeight: fieldHeight * 2.5,
    width: '100%',
    borderColor: Color.charcoalGrey,
    borderWidth: 1,
    padding: 10,
    borderRadius: 7,
    marginTop: 5,
  },
  urlBox: {
    height: fieldHeight,
    width: '100%',
    borderColor: Color.charcoalGrey,
    borderWidth: 1,
    padding: 10,
    borderRadius: 7,
    marginTop: 5,
  },
  detailsText: {
    color: Color.charcoalGrey,
  },
  modal: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'white',
  },
  detailsModalText: {
    minHeight: fieldHeight * 2.5,
    borderColor: Color.charcoalGrey,
    borderWidth: 1,
    padding: 5,
    width: '100%',
    borderRadius: 7,
    marginHorizontal: 20,
    marginBottom: 5,
  },
  locationModal: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'white',
  },
  iconContainer: {
    marginTop: 10,
  },
  dropdownIcon: {
    color: Color.charcoalGrey,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  locationContainer: {
    flex: 1,
    paddingHorizontal: 5,
    width: '100%',
    justifyContent: 'center',
  },
  googlePlaceInfoContainer: {
    flexDirection: 'column',
    paddingHorizontal: 5,
  },
  googlePlaceMainText: {
    color: Color.charcoalGrey,
    fontSize: fontBig,
    padding: 5,
  },
  googlePlaceSecondaryText: {
    color: Color.textGrey,
    fontSize: fontSmall,
    padding: 5,
    paddingTop: 0,
  },
  googlePlaceIconView: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: Color.vermillion,
    margin: 5,
    padding: 5,
    alignItems: 'center',
  },
  googlePlaceIcon: {
    fontSize: 20,
    color: 'white',
    paddingRight: 5,
    paddingLeft: 5,
    paddingVertical: 5,
  },
});
