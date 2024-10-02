//AllUserPost.jsx file

import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { RiMessage2Line } from "react-icons/ri";
import UserContext from '../context/UserContext';
import GetpostComments from './GetpostComments';
import { FaRegEye } from "react-icons/fa";
// import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
// import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IoEye } from "react-icons/io5";
import ShowSingleBlog from './ShowSingleBlog';
// import { Card } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import AddComment from './AddCommentComponants';
import { jwtDecode } from "jwt-decode";
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
// import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
// import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
// import Typography from '@mui/joy/Typography';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';
import SendOutlined from '@mui/icons-material/SendOutlined';
import Face from '@mui/icons-material/Face';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import { IoEyeSharp } from "react-icons/io5";
const AlluserPost = (props) => {
  const [allPosts, setallPosts] = useState([]);

  let ctx = useContext(UserContext)
  let token = ctx.details.token
  const decoded = jwtDecode(token);
  console.log(decoded)

  // console.log(token)
  const [heartClick, setheartClick] = useState(false);
  // const [postSubmited, setPostSubmited] = useState(false);
  const [selectedPostId, setselectedPostId] = useState("");

  // let commentRef = useRef()

  let getAllData = async () => {
    let res = await axios.get('https://blog-app-eza5.onrender.com/posts/getall')
    let data = res.data;
    console.log(data.data)
    setallPosts(data.data)
  }
  useEffect(() => {
    getAllData()
  }, [props.clicked])

  const handleHeart = () => {
    setheartClick(!heartClick)
  }

  const showForm = (id) => {
    // if(selectedPostId){
    //   setselectedPostId('')
    // }else{
    //   setselectedPostId(id)

    // }
    setselectedPostId(id)
    setIsModalOpen(true);
    // onClick={showModal}
  }

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

const [selectedEle, setselectedEle] = useState("");
  const showLoading = (ele) => {
    setOpen(true);
    setLoading(true);
    setselectedEle(ele)

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };


  // add comment section tools starts here

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
// add comment section tools ends here

//likes section start here........


const handleLikes=async(postId)=>{
  console.log(postId)
  let res=await fetch(`https://blog-app-eza5.onrender.com/posts/updatelike/${postId}`,{
    method:"PUT",
    headers:{
      'content-type':"application/json",
      'Authorization':token
    }
  })
  let data=await res.json();
  console.log(data)
  getAllData()

}
const [commentPost, setcommentPost] = useState("");

const submitComment=(e)=>{
  console.log(e.target.value)
  let comment=e.target.value
  setcommentPost( comment)

}

const submitCommentHandle=async(postId)=>{
   console.log(postId)
   let obj={
    text:commentPost
   }
   console.log(obj)
   let res = await fetch(`https://blog-app-eza5.onrender.com/posts/addComment/${postId}`, {
    method:"POST",
    headers:{
      'content-type':'application/json',
      'Authorization':token
    },
    body:JSON.stringify(obj)
  })
  let data = await res.json();
  // console.log(data)
  getAllData()
  setcommentPost("")

}
 
  return (
    <div className='row justify-content-center gap-2'>
      {


        allPosts.map((ele) => {
          return  <Card 
          variant="outlined"
          sx={{ minWidth: 300, '--Card-radius': (theme) => theme.vars.radius.xs }}
         >
          <CardContent style={{height:"70px"}}  orientation="horizontal" sx={{ alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  m: '-2px',
                  // borderRadius: '100%',
                  // background:
                  //   'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
                },
              }}
            >
              {/* <Avatar
                size="sm"
                src="/static/logo.png"
                sx={{ p: 0.5, border: '2px solid', borderColor: 'background.body' }}
              /> */}
              <Avatar sx={{color:"red",bgcolor:"lightskyblue",fontSize:"25px",border:"1px solid black"}}>
                {ele.userId.name[0]}

              </Avatar>
               <Typography sx={{ fontWeight: 'lg' }}>{ele.userId.name}</Typography>
            </Box>
           
            {/* <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>
              <MoreHoriz />
            </IconButton> */}
          </CardContent>
          <CardOverflow>
            <AspectRatio>
              {/* <img src="/static/images/cards/yosemite.jpeg" alt="" loading="lazy" /> */}
              {ele.file.split('/')[4] === 'image' ?
              <CardMedia
                component="img"
                height="194"
                image={ele.file}
                alt="Paella dish"
              />
              :
              <CardMedia
                component="video"
                height="194"
                image={ele.file}
                alt="Paella dish"
                controls
              />
            }
            </AspectRatio>
          </CardOverflow>
          <CardContent orientation="horizontal" sx={{ alignItems: 'center', mx: -1 }}>
            <Box sx={{ width: 0, display: 'flex', gap: 0.5 }}>
              <IconButton variant="plain" color="neutral" size="sm">
                <FavoriteIcon  onClick={()=>handleLikes(ele._id)}  sx={{color: ele.likes.includes(decoded._id)&&`${red[500]}`}} />
                <Link
              component="button"
              underline="none"
              textColor="text.primary"
              sx={{ fontSize: 'sm', fontWeight: 'lg',marginLeft:"10px"}}
             
            >
             {ele.likes.length>0?ele.likes.length:''} Likes
            </Link>
              </IconButton>
              <IconButton variant="plain" color="neutral" size="sm" onClick={()=>showForm(ele._id)}>
                <ModeCommentOutlined />
              </IconButton> 
         {ele._id===selectedPostId && <div className=' col-md-3'>
          <AddComment token={token} getAllData={getAllData} isModalOpen={isModalOpen} handleCancel={handleCancel} handleOk={handleOk} ele={ele}/>
         </div>}
         <IconButton variant="plain" color="neutral" size="sm">
                 
                   <IoEyeSharp style={{fontSize:"30px"}}  onClick={()=>showLoading(ele)}/>
               {ele._id===selectedEle._id && <ShowSingleBlog ele={selectedEle}  open={open} setOpen={setOpen} loading={loading} showLoading={showLoading}/>}

                  </IconButton> 
           
            </Box>
            
           <Box >
                   
      </Box>

          </CardContent>
          
          <CardContent>
            
            <Typography sx={{ fontSize: 'sm' }}>
              <Link
                component="button"
                color="neutral"
                textColor="text.primary"
                sx={{ fontWeight: 'lg' }}
              >
              Title- {ele.title}
              </Link>{' '}
            
            </Typography>
            <h6> Description- {ele.description}</h6>
            <Link
              component="button"
              underline="none"
              // startDecorator="…"
              sx={{ fontSize: 'sm', color: 'text.tertiary' }}
             
            >
             {ele.comments.length>0?ele.comments.length:''} Comments
            </Link>
            <Link
              component="button"
              underline="none"
              sx={{ fontSize: '10px', color: 'text.tertiary', my: 0.5 }}
            >
             
            </Link>
          </CardContent>
          <CardContent orientation="horizontal" sx={{ gap: 1 }}>
            <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
              <Face />
            </IconButton>
            {/* <Input
              variant="plain"
              size="sm"
              placeholder="Add a comment…"
              sx={{ flex: 1, px: 0, '--Input-focusedThickness': '0px' }}
            /> */}
            <input onChange={submitComment} value={commentPost} style={{height:"35px",width:"50vw"}} type="text" placeholder='comment' />
            <button className='btn btn-success ms-2' onClick={()=>submitCommentHandle(ele._id)}>Post</button>
          </CardContent>
        </Card>
//           return <Card  key={ele._id} sx={{ maxWidth: 345 }}>
//             <CardHeader
//               avatar={
//                 <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
//                   {ele.userId.name[0]}
//                 </Avatar>
//               }
//               action={
//                 <IconButton aria-label="settings">
//                   <MoreVertIcon />
//                 </IconButton>
//               }
//               title={ele.userId.name}
//               // subheader="September 14, 2016"
//             />

//             {ele.file.split('/')[4] === 'image' ?
//               <CardMedia
//                 component="img"
//                 height="194"
//                 image={ele.file}
//                 alt="Paella dish"
//               />
//               :
//               <CardMedia
//                 component="video"
//                 height="194"
//                 image={ele.file}
//                 alt="Paella dish"
//                 controls
//               />
//             }


//             <CardContent>
//               <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//                   {ele.title}
//               </Typography>
//             </CardContent>
//             <CardActions className='d-flex justify-content-between' disableSpacing>
//   <IconButton onClick={()=>handleLikes(ele._id)} aria-label="add to favorites">
//  <FavoriteIcon  sx={{color: ele.likes.includes(decoded._id)&&`${red[500]}`}} /><sup>{ele.likes.length>0?ele.likes.length:''}</sup>
//               </IconButton>
//               <IconButton aria-label="share">
//                 <RiMessage2Line   onClick={()=>showForm(ele._id)}/>
//               </IconButton>
//               <IconButton aria-label="share">
//                 <FaRegEye  onClick={()=>showLoading(ele)}/>
//                {ele._id===selectedEle._id && <ShowSingleBlog ele={selectedEle}  open={open} setOpen={setOpen} loading={loading} showLoading={showLoading}/>}
//               </IconButton>

//             </CardActions>

//         {ele._id===selectedPostId && <div className=' col-md-3'>
//           <AddComment token={token} getAllData={getAllData} isModalOpen={isModalOpen} handleCancel={handleCancel} handleOk={handleOk} ele={ele}/>
//          </div>}

//           </Card>
        })
      }
    </div>
  )
}

export default AlluserPost
