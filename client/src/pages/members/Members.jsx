import React, { useEffect, useState } from 'react'
import './style.scss'
import {auth} from '../../component/authentication/firebaseConfig'
import axios from 'axios'

const Members = () => {

  const [memberList, setMemberList] = useState(null);

  const getMemberList = async()=>{
        if(!auth.currentUser)return;
        const token = await auth.currentUser.getIdToken(true);
        console.log("making request to get member List")
        axios
          .get("/members", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            
            // console.log("Member List:",response.data.MemberList);
            // Object.entries(response.data.MemberList).map(([key, value])=>{
            //   console.log(key,value.name)
            // })
            setMemberList(response.data.MemberList)
            
          })
          .catch((error) => {
            setMemberList([]);
            console.log("error on checking member List",error);
          });
  }

  useEffect(()=>{
    getMemberList();
  },[])

  return (
    <div className='member_list_container'>
        <h1>JNVR-27 Charity Fund Members</h1>
        <table className="member_list">
                <tr className='head_row'>
                    <th className='head'>Name</th>
                    <th className='head' >Email</th>
                    <th className='head'>Joined Since</th>
                </tr>
                {memberList && Object.entries(memberList).map(([key, value])=>{
                    
                    let date = new Date(value.date_of_joining._seconds*1000 +(value.date_of_joining._nanoseconds/1000000));

                    console.log(value.date_of_joining)
                    console.log(date)
                    date = date.toDateString()
                    console.log(date)
                    return (<>
                        <tr key={key} className='data_row'>
                            <td className='data'>{value.name}</td>
                            <td className='data'>{value.emails[0]}</td>
                            <td className='data'>{date}</td>
                        </tr>
                        </>
                    )
                })}
            </table>

          {/* <Griddle data={memberList}/> */}
    </div>
  )
}
import './style.scss'

export default Members
