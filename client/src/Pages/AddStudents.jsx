import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  signOut,
} from "../redux/user/userSlice";
import { Link } from "react-router-dom";

export default function AddStudents() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { currentUser, loading, error } = useSelector((state) => state.user);
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  
  return (
    <>
      <div className="flex justify-between jus my-6 mx-12">
        <div className="flex items-center hover:opacity-95">
          <Link to="/students">
            <AiOutlineArrowLeft className="text-3xl" />
          </Link>
          <h1 className="text-2xl font-bold ml-2">ADD Student</h1>
        </div>
        <div>
          <button onClick={handleSubmit} className="bg-slate-700 w-[60px] h-[35px] text-white font-semibold p-1 rounded-lg">
          {loading ? 'Loading...' : 'ADD'}
          </button>
        </div>
      </div>
    <div className="h-[600px] w-[800px] mx-auto my-12">

      <form  onSubmit={handleSubmit}>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <div className="flex justify-center">

        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt="profile"
          className="h-24 w-24 self-center cursor-pointer rounded-full  object-cover my-10"
          onClick={() => fileRef.current.click()}
          />
        </div>
        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700">
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-green-700">Image uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
        <div>

        <div class="flex -mx-3">
                        <div class="w-1/2 px-3 mb-5">
                            <label class="text-xl font-semibold px-1">First name</label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                <input type="text" class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-800 outline-none focus:border-indigo-500"onChange={handleChange}  />
                            </div>
                        </div>
                        <div class="w-1/2 px-3 mb-5">
                            <label  class="text-xl font-semibold px-1">Last name</label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                <input type="text" class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-800 outline-none focus:border-indigo-500"onChange={handleChange}  />
                            </div>
                        </div>
                        
                    </div>
                    <div class="flex -mx-3">
                        <div class="w-1/2 px-3 mb-5">
                            <label  class="text-xl font-semibold px-1">Course</label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                <input type="text" class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-800 outline-none focus:border-indigo-500"onChange={handleChange}  />
                            </div>
                        </div>
                        <div class="w-1/2 px-3 mb-5">
                            <label class="text-xl font-semibold px-1">Password</label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                <input type="password" class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-800 outline-none focus:border-indigo-500"onChange={handleChange} />
                            </div>
                        </div>
                        
                    </div>

                    <div class="flex -mx-3">
                        <div class="w-1/2 px-3 mb-5">
                            <label class="text-xl font-semibold px-1">Email</label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                <input type="email" class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-800 outline-none focus:border-indigo-500"onChange={handleChange} />
                            </div>
                        </div>
                        <div class="w-1/2 px-3 mb-5">
                            <label class="text-xl font-semibold px-1">Contact</label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                <input type="number" class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-800 outline-none focus:border-indigo-500" onChange={handleChange} />
                            </div>
                        </div>
                        
                    </div>


        {/* <label className="text-xl " htmlFor="">
            Name:
            <input
          type='text'
          id='username'
          placeholder='Username'
          className='rounded-lg p-3 bg-white  border-2 border-black object-cover'
          onChange={handleChange}
        />
        </label>
        <label htmlFor="">
            Name:
            <input
          type='text'
          id='username'
          placeholder='Username'
          className='rounded-lg p-3 bg-white border-2 border-black object-cover'
          onChange={handleChange}
        />
        </label>
        <label htmlFor="">
            Name:
            <input
          type='text'
          id='username'
          placeholder='Username'
          className='rounded-lg p-3 bg-white border-2 border-black object-cover'
          onChange={handleChange}
        />
        </label>
        <label htmlFor="">
            Name:
            <input
          type='text'
          id='username'
          placeholder='Username'
          className='rounded-lg p-3 bg-white border-2 border-black object-cover'
          onChange={handleChange}
        />
        </label> */}
        </div>
        
      </form>
    </div>
    </>

    // <div className='p-3 max-w-lg mx-auto'>
    //   <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
    //   <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
    //     <input
    //       type='file'
    //       ref={fileRef}
    //       hidden
    //       accept='image/*'
    //       onChange={(e) => setImage(e.target.files[0])}
    //     />
    
    //     <img
    //       src={formData.profilePicture || currentUser.profilePicture}
    //       alt='profile'
    //       className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
    //       onClick={() => fileRef.current.click()}
    //     />
    //     <p className='text-sm self-center'>
    //       {imageError ? (
    //         <span className='text-red-700'>
    //           Error uploading image (file size must be less than 2 MB)
    //         </span>
    //       ) : imagePercent > 0 && imagePercent < 100 ? (
    //         <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
    //       ) : imagePercent === 100 ? (
    //         <span className='text-green-700'>Image uploaded successfully</span>
    //       ) : (
    //         ''
    //       )}
    //     </p>
    //     <input
    //     //   defaultValue={currentUser.username}
    //       type='text'
    //       id='username'
    //       placeholder='Username'
    //       className='bg-slate-100 rounded-lg p-3'
    //       onChange={handleChange}
    //     />
    //     <input
    //     //   defaultValue={currentUser.email}
    //       type='email'
    //       id='email'
    //       placeholder='Email'
    //       className='bg-slate-100 rounded-lg p-3'
    //       onChange={handleChange}
    //     />
    //     <input
    //       type='password'
    //       id='password'
    //       placeholder='Password'
    //       className='bg-slate-100 rounded-lg p-3'
    //       onChange={handleChange}
    //     />
    //     <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
    //       {loading ? 'Loading...' : 'Update'}
    //     </button>
    //   </form>

    //   <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
    //   <p className='text-green-700 mt-5'>
    //     {updateSuccess && 'User is updated successfully!'}
    //   </p>
    // </div>
  );
}
