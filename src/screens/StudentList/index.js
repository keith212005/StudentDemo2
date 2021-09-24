import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

// THIRD PARTY IMPORTS
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import storage from '@react-native-firebase/storage';

// LOCAL IMPORTS
import {SquareIconButton, StudentCard, CustomLoader} from '@components';
import {styles} from './style';
import {actionCreators} from '@actions';
import {images, commonStyles, colors} from '@resources';
import {FirebaseService} from '@services';

class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      studentList: [],
    };
    this.onResult = this.onResult.bind(this);
    this.onError = this.onError.bind(this);
  }

  componentDidMount() {
    this.props.networkListener();

    const subscriber = firestore()
      .collection('Users')
      .onSnapshot(this.onResult, this.onError);
  }

  async onResult(QuerySnapshot) {
    var newList = [];
    QuerySnapshot.forEach(item => {
      console.log(item.id.toString() + '.png');
      var obj = {};
      obj.doc_id = item.id;
      obj.firstname = item._data.firstname;
      obj.lastname = item._data.lastname;
      obj.dob = moment(item._data.dob.toDate()).format('DD-MM-YYYY').toString();
      obj.lat = item._data.location._latitude;
      obj.long = item._data.location._longitude;
      obj.download_url = item._data.uri;
      newList.push(obj);
    });

    this.setState({studentList: newList, loading: false});
  }

  onError(error) {
    console.error(error);
  }

  _renderFlatlistItem = item => {
    return (
      <StudentCard
        item={item}
        onPress={() =>
          this.props.navigation.navigate('AddStudent', {studentDetail: item})
        }
      />
    );
  };

  _renderFlatlist = () => {
    if (this.state.loading) {
      return <CustomLoader />;
    }

    return (
      <FlatList
        data={this.state.studentList}
        renderItem={item => this._renderFlatlistItem(item.item)}
        keyExtractor={(item, index) => String(index)}
      />
    );
  };

  render() {
    return <>{this._renderFlatlist()}</>;
  }
}

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
