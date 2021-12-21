import React from 'react';
import './Header.css';
import Card from './Card';
import ReactSession from "react-client-session/dist/ReactSession";
import { useHistory } from "react-router";
import { useParams } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import {GoReply} from 'react-icons/go';
import Post from './Post';
import ThreadNewPost from './ThreadNewPost';
function ThreadView(props) {
   const { idT:id } = useParams();
   console.log("hjkfshkfhskh" + id);
   const { name } = props.location.state;
   const [posts, setPosts] = React.useState([]);
   const [updated, setUpdated] = React.useState(new Date());
   const [users,setUsers] = React.useState([]);
   const history = useHistory();
   const user = ReactSession.get("username");


   function deletePost(id){
      const options = {
         method: 'DELETE',
      };
      fetch(`/posts/${id}`,options)
         .then(res =>{
         if(!res.ok){
            console.log(res.body);
         }else{
            console.log("deleted");
            setUpdated(new Date());
         }
      })
   }

   function onNewPost() {
      setUpdated(new Date());
   }


   React.useEffect(() => {
      fetch(`/threads/${id}`)
         .then(data => data.json())
         .then(posts => setPosts(posts.posts))
      fetch(`/accounts/${user}`).then(data => data.json())
         .then(users => setUsers(users));
   }, [updated]);
   console.log(posts.posts);
   console.log(posts)
   
   return (
      <>
         <div className="centar">
         <Card title={name}>
       
         </Card>
         </div>
         <div className='wrapperCard'>
            <Card>
               <div className='StreetList'>
                  {posts.map(function (post) {
                    return ([
                     <div className="wrapper">
                        {
                        (post.replyId !== null) ? <>
                        <div className="innerReply">
                           <div className='innerReplyWho'>
                              
                        <GoReply href='' ></GoReply>
                        ({(post.replyId)})
                        </div>

                           <Post key={post.id} post={post} />
                           <MdDelete style={{color:"red" ,cursor:"pointer"}} onClick={() => deletePost(post.id)}></MdDelete>

                        </div>
                        </>
                        : <>
                        <div className="inner">
                           
                        <Post key={post.id} post={post} />
                        </div>
                        </>
                        }
                     
                        {
                              (users.id === post.account.id && post.replyId == null)
                              ?  <>
                                    <div className="inner">
                                       <MdDelete style={{color:"red" ,cursor:"pointer"}} onClick={() => deletePost(post.id)}></MdDelete>
                                    </div>
                                 </>
                              :  <></>
                           }
                           
                     </div>
                  ]);
                  })}
               </div>
            </Card>
            <ThreadNewPost onNewPost={ onNewPost }/>
         </div>
      </>
   );
}

export default ThreadView;