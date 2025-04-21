import {useState , useEffect} from 'react'
import axios from "axios"
const App = () => {
  const [prompt , setPrompt] = useState("");
  const [response , setResponse] = useState("");

  const handleSubmit = (e) => {
  //  e.preventDefault();
  console.log("submitted form")
    axios
    .post("http://localhost:3000/chat" , {user_input : prompt})
    .then((res) => {setResponse(res.data);})
    .catch((err)=>{console.error(err)})
  }

  useEffect(() => {
    const keyDownHandler = event => {
      console.log('User pressed: ', event.key);

      if (event.key === 'Enter') {
        event.preventDefault();
        // 👇️ call submit function here
        handleSubmit();
        document.getElementById("response").innerHTML="";
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  });


  return (
    <>
    <div className='ml-[20vh] rounded-xl rounded-b-none mt-[10vh] p-5 bg-white  w-[80vw]'>
      <img src="chacha-chaudhary.png" alt="chacha" class="w-[50px] rounded-full"></img>
      <p className='ml-[20vh] ' id="response">{response}</p>
    </div>
    <div className="bg-[#E5CFF7]  kk flex justify-center ml-[20vh] rounded-xl rounded-t-none w-[80vw] ">
      <form   className='p-10' id="myForm">
      <input type='text' id='myInput' value={prompt} onChange={(e) => setPrompt(e.target.value)} className='rounded-lg text-center w-[70vw] p-2' placeholder='Enter Your Prompt'></input>
      <button type='submit' className=' m-2 text-2xl pl-2 text-white hover:text-slate-200'>➤</button>
      </form>
    </div>
    </>
  )


}

export default App