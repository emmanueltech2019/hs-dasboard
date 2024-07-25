"use client"
import React, { useState, ChangeEvent } from 'react'
import { Icon } from '@iconify/react';
import Image from 'next/image';
import docFormIllustration from '../components/img/doctor (2).jpeg'

interface YourFormDataInterface {
  firstName: string;
  lastName: string;
  rating: string;
  image: File | any,
  bio: string;
  city: string;
  brand: string;
  reviews: { name: string; review: string }[]; // Array of review objects
  specialties: string[]; // Array of selected specialties
}

const DoctorForm: React.FC = () => {

  type Specialty = string;

  const initialSpecialties: Specialty[] = [];

  const [inputValue, setInputValue] = useState<string>('');
  const [reviewText, setReviewText] = useState<string>('');
  const [inputError, setInputError] = useState<boolean>(false);
  const [reviewError, setReviewError] = useState<boolean>(false);
  const [reviewArray, setReviewArray] = useState<{ name: string, review: string }[]>([]);
  const [specialtiesArray, setSpecialtiesArray] = useState<Specialty[]>([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [image, setImage] = useState<string | null>(null)

  const [myFormData, setMyFormData] = useState<YourFormDataInterface>({
    firstName: "",
    lastName: "",
    rating: "",
    image: null,
    bio: "",
    city: "",
    brand: "",
    reviews: [],
    specialties: [],
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(myFormData)

    setMyFormData({
      firstName: "",
      lastName: "",
      rating: "",
      image: null,
      bio: "",
      city: "",
      brand: "",
      reviews: [],
      specialties: [],
    });
  
    // Clear individual fields
    setInputValue('');
    setReviewText('');
    setReviewArray([]);
    setSpecialtiesArray([]);
    setImage(null);

  }


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setInputError(false);
  }

  // Event handler for textarea change
  const handleReviewChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(event.target.value);
    setReviewError(false);
  };

  const handleReviewSubmit = (event: any) => {
    event.preventDefault()

    if (inputValue.trim() === '') {
      setInputError(true); // Set inputError to true to indicate error
    }
    if (reviewText.trim() === '') {
      setReviewError(true); // Set reviewError to true to indicate error
    }

    // If any field is empty, return early and do not submit
    if (inputValue.trim() === '' || reviewText.trim() === '') {
      return;
    }

    const newReview = { name: inputValue, review: reviewText };
    setReviewArray([...reviewArray, newReview]);

    setMyFormData({
      ...myFormData,
      reviews: [...myFormData.reviews, newReview],
    });

    setInputValue('');
    setReviewText('');
  }

  const handleDeleteReview = (index: number) => {
    // Create a copy of the current reviewArray
    const updatedReviews = [...reviewArray];

    // Remove the review at the specified index
    updatedReviews.splice(index, 1);

    // Update the reviewArray state with the updated array
    setReviewArray(updatedReviews);
  };

  const handleClick = (specialty: string, event: any) => {
    event.preventDefault();
    const updatedSpecialties = specialtiesArray.includes(specialty)
      ? specialtiesArray.filter((s) => s !== specialty)
      : [...specialtiesArray, specialty];

    setSpecialtiesArray(updatedSpecialties);

    setMyFormData((prevFormData) => ({
      ...prevFormData,
      specialties: updatedSpecialties,
    }));
  };

  const deleteSpecialty = (index: number) => {
    const updatedSpecialties = [...specialtiesArray];
    updatedSpecialties.splice(index, 1);
    setSpecialtiesArray(updatedSpecialties);
  };

  // let formData = new FormData();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target && e.target.files?.[0]) {
    const selectedFile = e.target.files[0];
    setMyFormData((prevFormData) => ({
      ...prevFormData,
      image: selectedFile,
    }));
  }
};

  return (
    <div className='flex justify-between items-center'>
      <section className="p-4">
        <div className="form flex justify-center items-center  w-[85%] m-auto min-h-[100vh] mt-[6rem] md:mt-[.5rem]">
          <form className="grid sm:grid-cols-2 gap-5 bg-[#edf4fc] shadow-sm p-5 rounded-lg my-6 border-[4px]" onSubmit={handleSubmit}>
            <div className="firstname">
              <label htmlFor="first-name"></label>
              <input type="text" id="first-name" placeholder="First Name" value={myFormData.firstName}
                onChange={(e) => setMyFormData({ ...myFormData, firstName: e.target.value })}
                className="outline-none border-b-2 bg-transparent text-[18px] p-2 w-full placeholder-[#293670]" />
            </div>
            <div className="lastname">
              <label htmlFor="last-name"></label>
              <input type="text" id="last-name" placeholder="Last Name" value={myFormData.lastName}
                onChange={(e) => setMyFormData({ ...myFormData, lastName: e.target.value })}
                className="outline-none border-b-2 bg-transparent text-[18px] p-2 w-full placeholder-[#293670]" />
            </div>
            <div className="rating">
              <label htmlFor="rating"></label>
              <input type="text" id="rating" value={myFormData.rating} onChange={(e) => setMyFormData({ ...myFormData, rating: e.target.value })} placeholder="Rating" className="outline-none border-b-2 bg-transparent text-[18px] p-2 w-full placeholder-[#293670]" />
            </div>
            <div className="image p-3 break-words text-wrap">
              <h1>Upload an Image</h1>
              <label htmlFor="avatar"></label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                placeholder="."
                width={100}
                height={100}
              />
              {myFormData.image && (
                <div>
                  <Image
                    src={(myFormData.image)}
                    alt="Preview"
                    width={100}
                    height={100}
                    decoding="async"
                    
                  />
                </div>
              )}
            </div>
            <div className="bio sm:col-span-2">
              <label htmlFor="boi"></label>
              <textarea name="bio" id="bio" value={myFormData.bio} onChange={(e) => setMyFormData({ ...myFormData, bio: e.target.value })} placeholder="Bio" className="outline-none border-b-2 bg-transparent text-[18px] p-2 w-full placeholder-[#293670]"></textarea>
            </div>
            <div className="city">
              <label htmlFor="city"></label>
              <input type="text" id="city" value={myFormData.city} onChange={(e) => setMyFormData({ ...myFormData, city: e.target.value })} placeholder="City" className="outline-none border-b-2 bg-transparent text-[18px] p-2 w-full placeholder-[#293670]" />
            </div>
            <div className="brand">
              <label htmlFor="brand"></label>
              <input type="text" id="brand" value={myFormData.brand} onChange={(e) => setMyFormData({ ...myFormData, brand: e.target.value })} placeholder="Brand" className="outline-none border-b-2 bg-transparent text-[18px] p-2 w-full placeholder-[#293670]" />
            </div>
            <div className="reviews sm:col-span-2 my-4">
              <header className='my-[1rem] p-1'>
                <h3 className='font-[500] text-[#293670] text-[18px]'>Reviews</h3>
              </header>
              <div className="review">
                <label htmlFor="name"></label>
                <input type="text" value={inputValue} onChange={handleInputChange} id='name' placeholder={inputError ? 'Name (required)' : 'Name'}
                  className={`outline-none border-b bg-transparent text-[18px] p-2 w-full ${inputError ? 'border-[#ff7070] placeholder-[#ff7070]' : ''}`} />

                <label htmlFor="review-text"></label>
                <textarea name="review-text" value={reviewText} onChange={handleReviewChange} id="review-text" placeholder={reviewError ? 'Review (required)' : 'Write your review here'}
                  className={`outline-none border-b bg-transparent text-[18px] p-2 w-full ${reviewError ? 'border-[#ff7070] placeholder-[#ff7070]' : ''}`}></textarea>
              </div>
              <div className="add-review">
                <button className='text-[#fff] font-[500] bg-[#3475ee] w-[20%] p-1 rounded-md' onClick={handleReviewSubmit}>Add</button>
              </div>

              <div className="review-display">
                <ul>
                  {reviewArray.map((review, index) => (
                    <li key={review.name} className='flex gap-5 items-center'>
                      <div className='items-center my-2 bg-[#fff] p-2 rounded-md w-[60%] text-[#293670] text-[14px] '>
                        <strong className=''> {review.name}</strong><br />
                        <p className=' text-wrap w-[70%]'>{review.review}</p>
                      </div>
                      <div className="delete-btn">
                        <Icon icon="material-symbols:delete-outline" className='text-[30px] bg-[#293670] text-[#fff] p-1 rounded-full hover:bg-[#ddd] hover:text-[#293670] transition-all duration-500 ease-in-out cursor-pointer' onClick={() => handleDeleteReview(index)}></Icon>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="specialty sm:col-span-2 bg-[#fff] p-4 rounded-md">
              <header className='my-[1rem]'>
                <h3 className='font-[500] text-[#293670] text-[20px]'>Specialties</h3>
              </header>
              <div className="input grid grid-cols-2 gap-3 text-[13px]">
                {['Hernia', 'Gallbladder', 'Da Vinci Robotic Surgery', 'Breast Cancer', 'Small intestine', 'Mastectomy', 'Colon Surgery', 'Endoscopy'].map((specialty, index) => (
                  <div key={index} className={`flex justify-between items-center bg-[#edf4fc] text-[#293670] font-[700] p-2 rounded-md ${specialtiesArray.includes(specialty) ? 'border-[#3475ee] border-2' : ''
                    }`} onClick={(event) => handleClick(specialty, event)}>
                    <button>{specialty}</button>
                    {specialtiesArray.includes(specialty) && (
                      <Icon icon="material-symbols:check" className='text-[20px] cursor-pointer'></Icon>
                    )}
                  </div>
                ))}
              </div>

              <div className='my-7 border-b-2'>
                <h2 className='font-[500] text-[#293670] text-[18px]'>Selected Specialties</h2>
                <ul className='grid grid-cols-2 gap-3 text-[13px] font-[590] my-[1rem]'>
                  {specialtiesArray.map((specialty, index) => (
                    <li key={index} className='flex justify-between items-center bg-[#3475ee] text-[rgb(255,255,255)] p-2 rounded-md'>
                      <button>{specialty}</button>
                      <Icon icon="carbon:close" className='text-[24px] cursor-pointer' onClick={() => deleteSpecialty(index)}></Icon>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="submit-button sm:col-span-2 w-full text-center my-4">
              <button type='submit' className='text-[#fff] text-[18px] font-[500] bg-[#3475ee] w-[60%] p-2 rounded-md' >Submit</button>
            </div>
          </form>
        </div>
      </section>

      <section className='fixed right-[-120px] top-3 -z-40'>
        <div className='w-full h-full'>
          <Image src={docFormIllustration} className='w-[1030px] object-contain' alt="alt" />
        </div>
      </section>
    </div>
  )
}

export default DoctorForm