"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Icon } from '@iconify/react';
import Image from 'next/image';
import docFormIllustration from '../components/img/doctor (2).jpeg'
import axios from 'axios'

// Define the interface for form data
interface YourFormDataInterface {
  firstName: string;
  lastName: string;
  rating: string;
  image: File | null;
  bio: string;
  city: string;
  brand: string;
  reviews: { name: string; review: string }[];
  specialties: string[];
}

const DoctorForm: React.FC = () => {
  // Define the initial state for specialties
  type Specialty = string;
  const initialSpecialties: Specialty[] = [];

  // State variables
  const [inputValue, setInputValue] = useState<string>('');
  const [reviewText, setReviewText] = useState<string>('');
  const [inputError, setInputError] = useState<boolean>(false);
  const [reviewError, setReviewError] = useState<boolean>(false);
  const [reviewArray, setReviewArray] = useState<{ name: string; review: string }[]>([]);
  const [specialtiesArray, setSpecialtiesArray] = useState<Specialty[]>([]);
  const [image, setImage] = useState<string | null>(null);

  // Form data state
  const [myFormData, setMyFormData] = useState<YourFormDataInterface>({
    firstName: "",
    lastName: "",
    rating: "",
    image: null,
    bio: "",
    city: "Austin",
    brand: "AHS",
    reviews: [],
    specialties: [],
  });

  // Handle form submission
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Clear form data
    setMyFormData({
      firstName: "",
      lastName: "",
      rating: "",
      image: null,
      bio: "",
      city: "Austin",
      brand: "AHS",
      reviews: [],
      specialties: [],
    });

    setInputValue('');
    setReviewText('');
    setReviewArray([]);
    setSpecialtiesArray([]);
    setImage(null);

    // Create FormData object
    const formData = new FormData();
    formData.append('firstName', myFormData.firstName);
    formData.append('lastName', myFormData.lastName);
    formData.append('rating', myFormData.rating);
    formData.append('avatar', myFormData.image as File);
    formData.append('bio', myFormData.bio);
    formData.append('city', myFormData.city);
    formData.append('brand', myFormData.brand);
    formData.append('reviews', JSON.stringify(myFormData.reviews));
    formData.append('specialties', JSON.stringify(myFormData.specialties));

    // Submit form data using axios
    axios.post('https://14hsdashboard.devemmy.com/user/create-doctor', formData)
      .then((response) => {
        console.log(response);
        alert("succesfull")
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("form not submitted");
      });
  };

  const cityOptions = [
    { key: 'Austin', label: 'Austin' },
    { key: 'Dallas', label: 'Dallas' },
    { key: 'Houston', label: 'Houston' },
    { key: 'Miami', label: 'Miami' },
    { key: 'Orlando', label: 'Orlando' },
    { key: 'Brooklyn', label: 'Brooklyn' },
    { key: 'Bronx', label: 'Bronx' },
    { key: 'New York', label: 'New York' },
    { key: 'San Antonio', label: 'San Antonio' },
    { key: 'Boca Raton', label: 'Boca Raton' },
    { key: 'Fort Lauderdale', label: 'Fort Lauderdale' },
    { key: 'West Palm Beach', label: 'West Palm Beach' },
    { key: 'Queens', label: 'Queens' },
  ];
  
  const brandOptions = [
    { key: 'AHS', label: 'AHS' },
    { key: 'DHS', label: 'DHS' },
    { key: 'HHS', label: 'HHS' },
    { key: 'MHS', label: 'MHS' },
    { key: 'OHS', label: 'OHS' },
    { key: 'BHS', label: 'BHS' },
    { key: 'XHS', label: 'XHS' },
    { key: 'NHS', label: 'NHS' },
    { key: 'SHS', label: 'SHS' },
    { key: 'RHS', label: 'RHS' },
    { key: 'FHS', label: 'FHS' },
    { key: 'WHS', label: 'WHS' },
    { key: 'QHS', label: 'QHS' },
  ];
  

  // Handle review input change
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setInputError(false);
  };

  // Handle review text change
  const handleReviewChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(event.target.value);
    setReviewError(false);
  };

  // Handle review submission
  const handleReviewSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (inputValue.trim() === '') {
      setInputError(true);
    }
    if (reviewText.trim() === '') {
      setReviewError(true);
    }

    if (inputValue.trim() === '' || reviewText.trim() === '') {
      return;
    }

    const newReview = { name: inputValue, review: reviewText };
    setReviewArray([...reviewArray, newReview]);

    setMyFormData((prevFormData) => ({
      ...prevFormData,
      reviews: [...prevFormData.reviews, newReview],
    }));

    setInputValue('');
    setReviewText('');
  };

  // Handle review deletion
  const handleDeleteReview = (index: number) => {
    const updatedReviews = [...reviewArray];
    updatedReviews.splice(index, 1);
    setReviewArray(updatedReviews);
  };

  // Handle specialty selection
  const handleClick = (specialty: string, event: React.MouseEvent) => {
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

  // Handle specialty deletion
  const deleteSpecialty = (index: number) => {
    const updatedSpecialties = [...specialtiesArray];
    updatedSpecialties.splice(index, 1);
    setSpecialtiesArray(updatedSpecialties);
  };

  // Handle image file change
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
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
        <div className="form flex justify-center items-center w-[85%] m-auto min-h-[100vh] mt-[6rem] md:mt-[.5rem]">
          <form
            className="grid sm:grid-cols-2 gap-5 bg-[#edf4fc] shadow-sm p-5 rounded-lg my-6 border-[4px]"
            onSubmit={handleSubmit}
          >
            <div className="firstname">
              <label htmlFor="first-name" />
              <input
                type="text"
                id="first-name"
                placeholder="First Name"
                value={myFormData.firstName}
                onChange={(e) => setMyFormData({ ...myFormData, firstName: e.target.value })}
                className="outline-none border-b-2 bg-transparent text-[18px] p-2 w-full placeholder-[#293670]"
              />
            </div>
            <div className="lastname">
              <label htmlFor="last-name" />
              <input
                type="text"
                id="last-name"
                placeholder="Last Name"
                value={myFormData.lastName}
                onChange={(e) => setMyFormData({ ...myFormData, lastName: e.target.value })}
                className="outline-none border-b-2 bg-transparent text-[18px] p-2 w-full placeholder-[#293670]"
              />
            </div>
            <div className="rating">
              <label htmlFor="rating" />
              <input
                type="text"
                id="rating"
                value={myFormData.rating}
                onChange={(e) => setMyFormData({ ...myFormData, rating: e.target.value })}
                placeholder="Rating"
                className="outline-none border-b-2 bg-transparent text-[18px] p-2 w-full placeholder-[#293670]"
              />
            </div>
            <div className="image p-3 break-words text-wrap">
              <h1>Upload an Image</h1>
              <label htmlFor="avatar" />
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
                    src={URL.createObjectURL(myFormData.image)}
                    alt="Preview"
                    width={100}
                    height={100}
                    decoding="async"
                  />
                </div>
              )}
            </div>
            <div className="bio sm:col-span-2">
              <label htmlFor="bio" />
              <textarea
                name="bio"
                id="bio"
                value={myFormData.bio}
                onChange={(e) => setMyFormData({ ...myFormData, bio: e.target.value })}
                placeholder="Bio"
                className="outline-none border-b-2 bg-transparent text-[18px] p-2 w-full placeholder-[#293670]"
              />
            </div>
            <div className="city">
        <h2 className='font-[500] text-[#293670] text-[18px]'>City</h2>
        <select
          id="city"
          value={myFormData.city}
          onChange={(e) => setMyFormData({ ...myFormData, city: e.target.value })}
          className="outline-none border-b-2 bg-transparent text-[18px] p-2 w-full placeholder-[#293670]"
          title='city'
        >
          {cityOptions.map((option) => (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="brand">
        <h2 className='font-[500] text-[#293670] text-[18px]'>Brand</h2>
        <select
          id="brand"
          value={myFormData.brand}
          onChange={(e) => setMyFormData({ ...myFormData, brand: e.target.value })}
          className="outline-none border-b-2 bg-transparent text-[18px] p-2 w-full placeholder-[#293670]"
          title="brand"
        >
          {brandOptions.map((option) => (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
            <div className="reviews sm:col-span-2 my-4">
              <header className='my-[1rem] p-1'>
                <h3 className='font-[500] text-[#293670] text-[18px]'>Reviews</h3>
              </header>
              <div className="review">
                <label htmlFor="name" />
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  id='name'
                  placeholder={inputError ? 'Name (required)' : 'Name'}
                  className={`outline-none border-b bg-transparent text-[18px] p-2 w-full ${inputError ? 'border-[#ff7070] placeholder-[#ff7070]' : ''}`}
                />

                <label htmlFor="review-text" />
                <textarea
                  name="review-text"
                  value={reviewText}
                  onChange={handleReviewChange}
                  id="review-text"
                  placeholder={reviewError ? 'Review (required)' : 'Write your review here'}
                  className={`outline-none border-b bg-transparent text-[18px] p-2 w-full ${reviewError ? 'border-[#ff7070] placeholder-[#ff7070]' : ''}`}
                />
              </div>
              <div className="add-review">
                <button
                  className='text-[#fff] font-[500] bg-[#3475ee] w-[20%] p-1 rounded-md'
                  onClick={handleReviewSubmit}
                >
                  Add
                </button>
              </div>
              <div className="review-display">
                <ul>
                  {reviewArray.map((review, index) => (
                    <li key={index} className='flex gap-5 items-center'>
                      <div className='items-center my-2 bg-[#fff] p-2 rounded-md w-[60%] text-[#293670] text-[14px]'>
                        <strong>{review.name}</strong><br />
                        <p className='text-wrap w-[70%]'>{review.review}</p>
                      </div>
                      <div className="delete-btn">
                        <Icon
                          icon="material-symbols:delete-outline"
                          className='text-[30px] bg-[#293670] text-[#fff] p-1 rounded-full hover:bg-[#ddd] hover:text-[#293670] transition-all duration-500 ease-in-out cursor-pointer'
                          onClick={() => handleDeleteReview(index)}
                        />
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
                  <div
                    key={index}
                    className={`flex justify-between items-center bg-[#edf4fc] text-[#293670] font-[700] p-2 rounded-md ${specialtiesArray.includes(specialty) ? 'border-[#3475ee] border-2' : ''}`}
                    onClick={(event) => handleClick(specialty, event)}
                  >
                    <button>{specialty}</button>
                    {specialtiesArray.includes(specialty) && (
                      <Icon icon="material-symbols:check" className='text-[20px] cursor-pointer' />
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
                      <Icon
                        icon="carbon:close"
                        className='text-[24px] cursor-pointer'
                        onClick={() => deleteSpecialty(index)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="submit-button sm:col-span-2 w-full text-center my-4">
              <button
                type='submit'
                className='text-[#fff] text-[18px] font-[500] bg-[#3475ee] w-[60%] p-2 rounded-md'
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
      <section className='fixed right-[-120px] top-3 -z-40'>
        <div className='w-full h-full'>
          <Image
            src={docFormIllustration}
            className='w-[1030px] object-contain'
            alt="Doctor Form Illustration"
          />
        </div>
      </section>
    </div>
  );
}

export default DoctorForm;

