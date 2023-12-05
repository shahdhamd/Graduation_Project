import React, { useState } from 'react'
import style from'./ScanImage.module.css'
import axios from 'axios'
export default function ScanImage() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
    console.log(event.target.files[0])
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let token=`shahd__${localStorage.getItem('token')}`;
    console.log('token from loac ',localStorage.getItem('token'))
    try {
      if (!selectedImage) {
        console.log('Please select an image to upload.');
        return;
      }
      const headers = {
        token
      };

      const formData = new FormData();
      formData.append('image', selectedImage);

      const response = await axios.patch('https://spotless-moth-rugby-shirt.cyclic.app/api/v1/user/',
       formData, {headers});
      console.log('Upload successful:', response.data);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <div className={style.scan}>
      <div>
       <p>
        <h2>
        تعرف على النباتات بمجرد لقطة
        </h2>
        التقط أو ارفع صورة لأي نبات بكل بساطة، وستحصل على نتائج تعرف دقيقة وفورية مع تكنولوجيا الذكاء الصطناعي الثورية الخاصة بنا.
       </p>
       <form onSubmit={handleSubmit}>
       <label htmlFor="exampleFormControlFile1"> قم برفع صورة<img src='images/upload.jpg' alt=''/>
       </label>      
       <input type="file" onChange={handleImageChange} accept='image/' name='image' className="form-control-file" id="exampleFormControlFile1" />
       <button className='d-inline' type='submit'>upload</button>
      </form>
       </div>
      <img src='images/feature1.webp' alt=''/>

    </div>
  )
}
