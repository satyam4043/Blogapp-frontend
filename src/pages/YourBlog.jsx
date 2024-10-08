import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/UserContext'
import { toast } from 'react-toastify'
import { AiFillDelete } from "react-icons/ai";

import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import { Height } from '@mui/icons-material';




const YourBlog = () => {
    let ctx=useContext(UserContext)
const [blogs, setblogs] = useState([]);

    let getBlogs=async()=>{
        let res=await axios.get('https://blog-app-eza5.onrender.com/posts/getSingleUser',{
            headers:{
                'Authorization':ctx.details.token
            }
        })
        console.log(res.data.data)
        setblogs(res.data.data)
    }
    useEffect(()=>{
        getBlogs()
    },[])

    const handleDelete= async(ans)=>{
        console.log(ans._id)
        let res=await axios.delete(`https://blog-app-eza5.onrender.com/posts/delete/${ans._id}`)
        let data=res.data
        console.log(data)
        if(data.success){
            toast.success(data.msg)
            getBlogs()
        }
        else{
            toast.error(data.msg)
        }

    }
  return (
    <div className='row d-flex m-0 p-0 gap-5 mt-2 '>
        {
        blogs.map((ele)=>{
        //   return    <Box sx={{ minHeight: 350 }}>
        //   <Card
        //     variant="outlined"
        //     sx={(theme) => ({
        //       width: 300,
        //       gridColumn: 'span 2',
        //       flexDirection: 'row',
        //       flexWrap: 'wrap',
        //       resize: 'horizontal',
        //       overflow: 'hidden',
        //       gap: 'clamp(0px, (100% - 360px + 32px) * 999, 16px)',
        //       transition: 'transform 0.3s, border 0.3s',
        //       '&:hover': {
        //         borderColor: theme.vars.palette.primary.outlinedHoverBorder,
        //         transform: 'translateY(-2px)',
        //       },
        //       '& > *': { minWidth: 'clamp(0px, (360px - 100%) * 999,100%)' },
        //     })}
        //   >
        //     <AspectRatio
        //       variant="soft"
        //       sx={{
        //         flexGrow: 1,
        //         display: 'contents',
        //         '--AspectRatio-paddingBottom':
        //           'clamp(0px, (100% - 360px) * 999, min(calc(100% / (16 / 9)), 300px))',
        //       }}
        //     >
        //       {/* <img
        //         src="https://images.unsplash.com/photo-1492305175278-3b3afaa2f31f?auto=format&fit=crop&w=2000"
        //         loading="lazy"
        //         alt=""
        //       />
        //                  */}
         
        //     </AspectRatio>
        //     <Box
        //       sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 200 }}
        //     >
        //       <Box sx={{ display: 'flex' }}>
        //         <div>
        //           <Typography level="title-lg">
        //             <Link
        //               href="#container-responsive"
        //               overlay
        //               underline="none"
        //               sx={{
        //                 color: 'text.primary',
        //                 '&.Mui-focusVisible:after': { outlineOffset: '-4px' },
        //               }}
        //             >
        //             {ele.title}
        //             </Link>
        //           </Typography>
        //           <Typography level="body-sm">California, USA</Typography>
        //         </div>
        //         <IconButton
        //           size="sm"
        //           variant="plain"
        //           color="neutral"
        //           sx={{ ml: 'auto', alignSelf: 'flex-start' }}
        //         >
        //           <FavoriteBorderRoundedIcon color="danger" />
        //         </IconButton>
        //       </Box>
        //       <AspectRatio
        //         variant="soft"
        //         sx={{
        //           '--AspectRatio-paddingBottom':
        //             'clamp(0px, (100% - 200px) * 999, 200px)',
        //           pointerEvents: 'none',
        //         }}
        //       >
        //         {/* <img
        //           alt=""
        //           src="https://images.unsplash.com/photo-1492305175278-3b3afaa2f31f?auto=format&fit=crop&w=2262"
        //         /> */}
        //            {ele.file.split('/')[4]==='image' ?   <img src={ele.file} className="card-img-top" alt="..." />:
        //                         <video controls src={ele.file}></video>
        //                 }
        //       </AspectRatio>
        //       <Box sx={{ display: 'flex', gap: 1.5, mt: 'auto' }}>
        //         <Avatar variant="soft" color="neutral">
        //           Y
        //         </Avatar>
        //         <div>
        //           <Typography level="body-xs">Designed by</Typography>
        //           <Typography level="body-sm">Nature itself</Typography>
        //         </div>
        //       </Box>
        //     </Box>
        //   </Card>
        // </Box>
            return <div className="card col-4"  style={{ width: '18rem', }}>
                        
            {ele.file.split('/')[4]==='image' ?   <img src={ele.file} className="card-img-top" alt="..." />:
                                <video style={{height:"180px"}} controls src={ele.file}></video>
                        }
                                <div className="card-body">
                                    <h6 className="card-title">{ele.title}</h6>
                                    {/* <p className="card-text text-truncate">{ele.description}</p> */}
                                    {/* <a href="#" className="btn btn-primary">View full blog</a> */}
             <p className='text-secondary my-2'>Author:{ele.userId.name}</p>
      <AiFillDelete  onClick={()=>handleDelete(ele)} color='red' className='delIcon' size={25}/>
                                </div>
                            </div>
         })


        }
      
    </div>

   
);
}
 

export default YourBlog
