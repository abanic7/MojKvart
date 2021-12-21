import React from "react";
import Card from "./Card";
import ReactSession from "react-client-session/dist/ReactSession";
import { useHistory } from "react-router";
import './Login.css';
import { FaTimes } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Thread from "./Thread";

function Forum(props) {
   const [threads, setThreads] = React.useState([]);
   const [users, setUsers] = React.useState([]);
   const [updated, setUpdated] = React.useState(new Date());
   const user = ReactSession.get("username");
   const history = useHistory();

   function deleteThread(id) {
      const options = {
         method: 'DELETE',
      };
      fetch(`/threads/${id}`, options)
         .then(response => {
            /* console.log(response); */
            if (!response.ok) {
               console.log(response.body);
            } else {
               console.log("deleted");
               setUpdated(new Date());
            }
         });
   }

   React.useEffect(() => {
      const fetchData = async () => {
         const fetchThreads = await fetch('/threads').then(data => data.json());
         const fetchUsers = await fetch(`/accounts/${user}`).then(data => data.json());

         setThreads(fetchThreads);
         setUsers(fetchUsers);
      };

      fetchData();
   }, [updated]);

   if (users === undefined || threads === undefined || users.district === undefined) {
      console.log("users: ", users, "threads: ", threads);
      return ([ 
         <>
            <Card title='Forum'>
               <div className='Login'>
                  <button className='button' type="button" onClick={() => {history.push("/novatema")}}>Dodaj temu</button>
               </div>
            </Card>
            <Card title='Molimo pričekajte dok se podaci ne učitaju!'>
            </Card>
         </>
      ]);
   } else {
      return (
         <>
            <Card title='Forum'>
               <div className='Login'>
                  <button className='button' type="button" onClick={() => {history.push("/novatema")}}>Dodaj temu</button>
               </div>
            </Card>
            <Card title='Teme'>
               {threads.map(function (thread) {
                     if(users.district.id === thread.district.id) {
                        return ([
                           <div className="wrapper">
                              <div className="inner">
                                 <Thread key={thread.id} thread={thread} />
                              </div>
                              {
                                    (users.id === thread.account.id)
                                    ?  <>
                                          <div className="inner">
                                             <MdDelete style={{color:"red" ,cursor:"pointer"}} onClick={() => deleteThread(thread.id)}></MdDelete>
                                          </div>
                                       </>
                                    :  <></>
                                 }
                           </div>
                        ]);
                     } else {
                        return ([
                           <>
                           </>
                        ])
                     }
                     })}
            </Card>
         </>
      );
   }

}

export default Forum;