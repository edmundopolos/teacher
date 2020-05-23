import React from "react";
import {
    View,
    Dimensions
}
from "react-native"
import PostDetail from "../components/postDetail";
import { ScrollView } from "react-native-gesture-handler";
import { del, deleteComment } from "../actions/postActions";
import {connect} from "react-redux";
import AllPosts from "../components/post";


const {width} = Dimensions.get('window')

function CommentScreen(props){
    const remove = (id) =>{

    props.delete(id,feedback)
    
    }

    const deleteComment = (id,msg) =>{
        props.commentDel(id,msg)
    }

    const feedback =(response) =>{
    // console.log(response)
    if (response) {

        }else{
        
        }
        
    }
    const user = props.navigation.getParam("user")

    const data = props.navigation.getParam('post')
        // console.log(data)
    const show = data.username == user.username?remove:false
    const showCommentModal = data.username == user[0].username?deleteComment:false
 
    const comments = data.comment.map((list,idx)=> <View style={{width:width-10, border:5}} key={idx}><PostDetail id={data._id} navigate={props.navigation} key={data._id} del={showCommentModal} post={list}/></View>)
    return(
        <View style={{ backgroundColor:"#ececec"}}>
        <ScrollView>
            <AllPosts navigate={props.navigation} del={show} user={user}  key={data._id} post={data} />
            {comments}
        </ScrollView>

        </View>
       

    )
}
mapActionsToProp = {
    delete:del,
    commentDel: deleteComment
}
export default connect(null,mapActionsToProp)(CommentScreen)