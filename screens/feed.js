import React from "react";
import { connect } from "react-redux";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  Dimensions,
  ScrollView,
  RefreshControl,
  StatusBar,
  Animated
} from "react-native";
import AllPosts from "../components/post";
import PostModal from "../components/modals";
import { Ionicons } from "@expo/vector-icons";
import MenuModal from "../components/classMenu";
import updateScreen from "../actions/screenAction";
import Header from "../components/header";
import { NavigationEvents } from "react-navigation";
import { del } from "../actions/postActions"


const { width, height } = Dimensions.get("window");
const HEADER_HEIGHT = StatusBar.currentHeight;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);


class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.timer;
    this.set;
  }

  state = {
    post: this.props.posts,
    menu: false,
    refresh: "",
    refreshing: false,
    screen: '',
    scrollAnim: new Animated.Value(0),
    offsetAnim: new Animated.Value(0),
  };
  name = this.state.screen;

  componentDidMount() {
    this.timer = setInterval(() => {
      // this.setRefreshing();

    }, 1000);
    this.setState({ refresh: true });
    this.state.scrollAnim.addListener(this._handleScroll);
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.setState({refresh: true});
      }
    );
    const inState = this.state.post 
    if (this.props.posts != inState){
      this.setState({
        post: this.props.posts
      })
    }
  }



  componentWillUnmount() {
    try {
     clearInterval(this.timer);
    clearInterval(this.onRefresh); 
   
    } catch (error) {
      console.log(error)
    }
    this.state.scrollAnim.removeListener(this._handleScroll);
    this.willFocusSubscription.remove();
  }

  refresh() {
    this.setRefreshing();
    this.setRefreshing();
  }

  setRefreshing() {
    const inState = this.state.post 
    if (this.props.posts != inState){
      this.setState({
        post: this.props.posts
      })
    }
    // 
  }

  wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }
  onRefresh = () => {
    this.setRefreshing();

    this.set = this.wait(2000).then(() => this.setRefreshing());
  };

  _handleScroll = ({ value }) => {
    this._previousScrollvalue = this._currentScrollValue;
    this._currentScrollValue = value;
  };
  
  _handleScrollEndDrag = () => {
    this._scrollEndTimer = setTimeout(this._handleMomentumScrollEnd, 250);
  };

  _handleMomentumScrollBegin = () => {
    clearTimeout(this._scrollEndTimer);
  };
  
  _handleMomentumScrollEnd = () => {
    const previous = this._previousScrollvalue;
    const current = this._currentScrollValue;
    
    if (previous > current || current < HEADER_HEIGHT) {
      // User scrolled down or scroll amount was too less, lets snap back our header
      Animated.spring(this.state.offsetAnim, {
        toValue: -current,
        tension: 300,
        friction: 35,
      }).start();
    } else {
      Animated.timing(this.state.offsetAnim, {
        toValue: 0,
        duration: 500,
      }).start();
    }
  };

  static navigationOptions = ({ navigation }) => {
    // console.log(navigation);
    return {
      title:"School Feed",
      headerStyle :{
        fontFamily:"Roboto"
      }
    };
  };
  
  delete = (id)=>{

    this.props.delete(id,this.feedback)
  
      this.setState({
        post: this.props.posts
      })

    this.checkif(this.props.posts)
  }
  
  feedback(response){
    console.log(response)
  if (response) {

    }else{
     
    }
    
  }
   checkif = () => {
    this.setRefreshing()
    }

  render() {
    const  navigate  = this.props.navigation;
    // const {Id} = this.props.navigation.getParam('name')
    const name = this.state.screen.Name;
    let k = [];
    for (let i = 0; i < this.state.post.length; i++) {
      console.log("lkjm", this.state.post[i]);
      if (this.state.post[i].feed == "True") {
        k.push(this.state.post[i]);
      }
    }
    const posts = k.map((post,idx) => <AllPosts navigate={navigate} del={this.delete} key={post.id} index={idx} post={post} />

  )  // case LIKE_POST:
  //   console.log('like',payload)
  //   state[payload]['like'] = true
  //   return state;

    // console.log("kk", posts);

    const empty = (
      <View style={styles.empty}>
       
        <Text style={styles.nopost}> Seems you have no post yet </Text>

       
      </View>
    );
    const content = <View style={styles.posts}>{posts} </View>;

    const { scrollAnim, offsetAnim } = this.state;
    
    const translateY = Animated.add(scrollAnim, offsetAnim).interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [0, -HEADER_HEIGHT],
      extrapolate: 'clamp'
    });const translateX = Animated.add(scrollAnim, offsetAnim).interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [0, -HEADER_HEIGHT],
      extrapolate: 'clamp'
    });



    return (
      <View style={styles.container}>
        <StatusBar
          hidden={false}
          backgroundColor="white"
          // translucent={true}
          barStyle="light-content"
        />
         <NavigationEvents
        onDidFocus={() =>{
           this.setState({refresh: true}
          );
       }}
        />
        <View >

          
          <AnimatedScrollView
            style={styles.content}
            onScroll={Animated.event(
              [ { nativeEvent: { contentOffset: { y: this.state.scrollAnim } } } ],
            )}
            onMomentumScrollBegin={this._handleMomentumScrollBegin}
            onMomentumScrollEnd={this._handleMomentumScrollEnd}
            onScrollEndDrag={this._handleScrollEndDrag}
            scrollEventThrottle={16}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
          >
            <Animated.View style={[styles.header, { transform: [{translateY}] }]}>
            {/* <Header name={name} navigation={navigate} /> */}
          
        </Animated.View>
            <View style={{marginTop:100}}>

              {posts.length == 0 ? empty : posts}
            </View>
            
          </AnimatedScrollView>
          {/* <Animated.View style={[{ transform: [{translateX}] }]}> */}
         
          {/* </Animated.View> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    height: height
  },
  empty: {
    backgroundColor: "#d3d3d3",
    width: width-60,
    height: 100,
    justifyContent: "space-around",
    alignItems: "center",
    margin: 30,
    borderRadius: 15,
    marginTop: 100
  },
  posts: {
    flex: 1,
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    minHeight: height,
    paddingTop: 20,
    paddingLeft: 40,
    width: width
    // backgroundColor: "#dddde2"
  },
  content: {
    flex: 1,
    // marginTop: HEADER_HEIGHT,
    paddingBottom: 20,
    backgroundColor:"#ececec"
  },
  upload: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: width-15,
    padding: 5,
    borderRadius: 10,
    borderBottomWidth: 0.5,
    borderColor: "#a3a3a3",
    elevation: 1
  },
  icon: {
    paddingLeft: 10,
    paddingTop: 5
  },
  text: {
    paddingLeft: 30,
    color: "#888",
    paddingTop: 5,
    fontSize: 15,
    fontFamily: "Lato"
  },
  add: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 50,
    height: 50,
    borderRadius: 100,
    borderColor: "#0f2331",
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 0.5,
    backgroundColor: "#26234e"
  },
  nopost:{
    fontFamily: "Lato-Italic"
  },
  header: {
    height: HEADER_HEIGHT,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    // backgroundColor: 'white',
    // marginBottom: 15
  },
});
const mapPropToState = state => ({
  posts: state.Posts,
  screenName: state.Screen
});

const mapActionToState = {
  onSubmit: updateScreen,
  delete:del
};
export default connect(mapPropToState, mapActionToState)(Feed);
