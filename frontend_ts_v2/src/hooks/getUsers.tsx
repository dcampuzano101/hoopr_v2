// import { useEffect, useState } from 'react'
// import axios from 'axios'

// // interface getUsersProps {
// //   pageNumber: number
// //   limit: number
// // }

// const useGetUsers = (pageNumber, limit) => {
//   const [loading, setLoading] = useState<boolean>(true)
//   const [users, setUsers] = useState<any | []>([])
//   const [hasMore, setHasMore] = useState(false)
//   const [error, setError] = useState(false)

//   useEffect(() => {
//     //   setUsers([])
//   })
//   useEffect(() => {
//     console.log('inside useEffect getUsers Hook')
//     setLoading(true)
//     setError(false)
//     let cancel: any
//     axios({
//       method: 'GET',
//       url: 'http://localhost:5000/api/users',
//       params: { page: pageNumber, limit: limit },
//       cancelToken: new axios.CancelToken(
//         (cancelToken) => (cancel = cancelToken)
//       )
//     })
//       .then((res) => {
//         debugger
//         let users = []
//         setUsers((prevUsers) => {
//           for (const user in res.data) {
//             users.push(res.data[user])
//           }

//           return [...prevUsers, ...users]
//         })
//         /* checks the
//             results: {
//                 next: {
//                     page: ,
//                     limit:
//                 },
//                 results: []
//             }

//         */

//         setHasMore(res.data.next)
//         setLoading(false)

//         console.log([res.data])
//         console.log(users)
//       })
//       .catch((e) => {
//         if (axios.isCancel(e)) return
//         setError(true)
//       })
//     return () => cancel()
//   }, [pageNumber, limit, users])
//   return { loading, error, users, hasMore }
// }

// export default useGetUsers
