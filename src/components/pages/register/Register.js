import axios from 'axios';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react'
import './register.css'
import Navbar from '../../Navbar/Navbar';
import Footer from '../../footer/Footer';
import { SpinnerCircular } from 'spinners-react';
import { Link, useNavigate } from 'react-router-dom';
function Register() {
  const navigate = useNavigate();
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [email, setEmail] = useState("");

  const [img, setImg] = useState(null);
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const toast = useToast()

const handleImageValidation = async (e) =>{
    const file = e.target.files[0]
    if(file.size>1048576)
    {
      setImg(null)
      return toast({

        description: "Cannot upload image",
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
    }
    else{
      setImg(file)
    }


}
const uploadImg = async (e) =>{
  e.preventDefault()
  if(!img)
  {
    setUrl("")
    return
  }
  const data = new FormData();
  data.append("file",img)
  data.append("upload_preset",'blogwebsite')
  setUploading(true)
  fetch("https://api.cloudinary.com/v1_1/dj-sanghvi-college/image/upload",{
    method:'post',
    body:data
  }).then((res) => res.json())
    .then((data) =>{
      setUploading(true)
      setUrl(data.url)
      toast({

        description: "image upload successfully",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    }).catch((err) =>{
      setUploading(false)
      console.log(err);
    })
  }

  const handleSubmit = async(e) => {

    e.preventDefault();

    
    try {
      await axios.post("http://localhost:4001/api/auth/register", {
        username,
        email,
        password,
        profilePic:url
      });

      toast({

        description: "Login successfully",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      navigate('/login');
    // setUsername("");
    // setEmail("");
    // setPassword("");
    } catch (err) {
     
      if(!username)
      {
        toast({
        description: "Enter Username ",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })

      }
      if(!password)
      {
        toast({
        description: "Enter Password ",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })

      }
      else{
      toast({  

        description: "Wrong Credentials",
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
    }
  
    }
  };



  return (
    <>
    <Navbar/>
    <section>
        <div className="register">
        <div className="col-2">
                 <h1 id='h1'>Create an account and </h1>
                 <h1 id='h2'>Impress with your knowlegde</h1>
            </div>
            <div className="col-1">
                <form id='form' className='flex flex-col'onSubmit={handleSubmit} >
                <h2>Sign In</h2>
                <span>Register and enjoy the service</span>
                {!uploading?<img className='image' src={url?url:"nn.png"} alt='image'></img>: <SpinnerCircular size="90" className='spinner-register' thickness='100'  speed="400" color='red' secondaryColor="grey"/>}
                <label htmlFor='forFile'><i className="fa-solid fa-2xl fa-plus"></i></label>
                <input type="file" type="file" id='forFile' accept='image/png , image/jpg, image/jpeg' style={{display:"none"}} onChange={handleImageValidation}  name="file" required />
                <div className="button input-box">
                <input type="submit" value="Upload Image" onClick={uploadImg} />
              </div>

                <div className="input-box">
                  <i className="fas fa-2xl fa-user"></i>
                  <input type="text" placeholder="Enter your name" onChange={e=>setUsername(e.target.value)}   required/>
                </div>

                <div className="input-box">
                <i className="fas fa-2xl fa-envelope"></i>
                <input type="text" placeholder="Enter your email" onChange={e=>setEmail(e.target.value)}  required/>
                </div>

                <div className="input-box">
                <i className="fas fa-2xl fa-lock"></i>
                <input type="password" placeholder="Enter your password" onChange={e=>setPassword(e.target.value)} required/>
                </div>
                    <button className='btn'>Sign In</button>
                    <p className="sign-up-text">Have a acocunt?<Link to='/login'><label >Login now</label></Link></p>
                </form>

            </div>
        </div>
    </section>
<Footer/>
</>
  )
}

export default Register