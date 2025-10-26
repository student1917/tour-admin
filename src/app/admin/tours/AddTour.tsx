"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FormType, Tour, TourPhoto } from "@/types/tour";
import Slider from "react-slick";
import sliderSettings from "@/app/config/sliderSetting";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SearchableDropdown from "@/shared/SearchableDropdown";
import { useQuery } from "@tanstack/react-query";
import {createTour, deleteImage, getCountriesByName, getTourById, updateTourById, uploadImages} from '@/services/tourService';
import { useSearchParams } from "next/navigation";
import {ToggleSwitch} from "@/components/ToggleSwitch";
import { DeletePopup } from "@/app/popup/deletePopup";


export default function AddTour() {
    const router = useRouter();

    // const [status, setStatus] = useState("");

    // const countries = api.getTourByName()
    const searchParams = useSearchParams()
    const id = searchParams.get("id"
    )
    const [query, setQuery] = useState("");
    const [form, setForm] = useState<FormType>({
        title: "",
        city: "",
        country: "",
        desc: "", 
        price: 0,
        maxGroupSize: 0,   
        schedule: "",
        discount: 0,
        photos: [] ,
        itinerary:[
            { 
                day: 1,
                title: "", 
                activities: [{ title: "", description: "" }] 
                }
        ],
        featured: false,
        isVisible: false,
        });

    useEffect(()=> {
        if (id) {
            fetchTourDetail(id)
        }
    },[id])

    const {data: countries = [], isLoading, error} = useQuery({
        queryKey: ['countries', query],
        queryFn: () => getCountriesByName(query),
        staleTime: 5 * 60 * 1000,
    });
    
    const [selectedSubregion, setSelectedSubregion] = useState("");
        useEffect(() => {
            if (form.country) {
                const country = countries.find(c => c.name === form.country);
                setSelectedSubregion(country?.subregion || "");
            } else {
                setSelectedSubregion(""); 
            }
        }, [form.country, countries]);

    const fetchTourDetail = async (id:string): Promise<void> => {
        const tour = await getTourById(id);
        setForm({
            title: tour.title,
            city: tour.city,
            country: tour.country.name,
            desc: tour.desc,
            price: tour.price,
            maxGroupSize: tour.maxGroupSize,
            schedule: tour.schedule,
            discount: tour.discount || 0,
            photos: tour.photos || [],
            itinerary: tour.itinerary || [],
            featured: tour.featured || false,
            isVisible: tour.isVisible ?? true,
          });

    }


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val); 
    setForm(prev => ({ ...prev, country: val }));
    };

    const handleSelectCountry = (newCountry: string) => {
    setForm(prev => ({ ...prev, country: newCountry }));
    setQuery(newCountry); 
    };

    const addDay = () => {
        setForm(prev => ({
            ...prev,
            itinerary: [
            ...prev.itinerary,
            { day: prev.itinerary.length + 1, title: "", activities: [{ title: "", description: "" }] }
            ]
        }));
    };

    const removeDay = (dayIndex: number) => {
        setForm(prev => {
            const newItinerary = prev.itinerary.filter((_, i) => i !== dayIndex)
            .map((day, idx) => ({ ...day, day: idx + 1 })); 
            return { ...prev, itinerary: newItinerary };
        });
    };

    const addActivity = (dayIndex: number) => {
        setForm(prev => {
            const newItinerary = [...prev.itinerary];
            newItinerary[dayIndex].activities.push({ title: "", description: "" });
            return { ...prev, itinerary: newItinerary };
        });
    };

    const removeActivity = (dayIndex: number, actIndex: number) => {
        setForm(prev => {
            const newItinerary = [...prev.itinerary];
            newItinerary[dayIndex].activities = newItinerary[dayIndex].activities.filter((_, i) => i !== actIndex);
            return { ...prev, itinerary: newItinerary };
        });
    };

    const getPhotoUrl = (photo: any) => {
        if (photo.url) return photo.url;
        if (photo.previewUrl) return photo.previewUrl;
        return '';
    }


     const handleChange = (e: any) => {
        const { id, value } = e.target;
        setForm(prev => ({
        ...prev,
        [id]: value
        }));
    };

    const handleDayTitleChange = (dayIndex: number, value: string) => {
        setForm(prev => {
            const newItinerary = [...prev.itinerary];
            newItinerary[dayIndex].title = value;
            return { ...prev, itinerary: newItinerary };
        });
    };

    const handleActivityChange = (dayIndex: number, actIndex: number, field: 'title' | 'description', value: string) => {
        setForm(prev => {
            const newItinerary = [...prev.itinerary];
            newItinerary[dayIndex].activities = newItinerary[dayIndex].activities.map((act, i) =>
                i === actIndex ? { ...act, [field]: value } : act
    );
            return { ...prev, itinerary: newItinerary };
        });
    };

    const confirmAdd = async () => {
    try {
        const filesToUpload = form.photos.filter(photo => photo.file && !photo.url);
        const files = filesToUpload.map(photo => photo.file!);

        let uploadedPhotos = [];

        if (files.length > 0) {
        const uploadResponse = await uploadImages(files);

        uploadedPhotos = uploadResponse.images.map((img, idx) => ({
            ...filesToUpload[idx],
            url: img.url,
            public_id: img.public_id,
            file: undefined,
        }));
        }

        const photosWithUrl = [
        ...form.photos.filter(photo => photo.url || photo.public_id),
        ...uploadedPhotos,
        ];

        if (!photosWithUrl.some(photo => photo.isThumbnail) && photosWithUrl.length > 0) {
        photosWithUrl[0].isThumbnail = true;
        }

        const updatedForm = {
        ...form,
        photos: photosWithUrl,
        };

        setForm(updatedForm);

        const countryObj = countries.find(c => c.name === form.country);
        const payload = {
        ...updatedForm,
        country: countryObj._id,
        };

        console.log("Payload gửi lên API:", payload);

        const tour = id
        ? await updateTourById(id, payload)
        : await createTour(payload);

        alert(`Tour ${id ? "updated" : "added"} successfully!`);
        router.push("/admin/tours");
    } catch (error) {
        console.error("Error adding tour:", error);
        alert("Failed to add tour. Please try again.");
    }
    };
           
    //upload image
    const fileInputRef = useRef<HTMLInputElement>(null);
    const MAX_PHOTOS = 5;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const selectedFiles = Array.from(files).filter(file => file.type.startsWith('image/'));

        setForm(prev => {
            const totalPhotos = prev.photos.length + selectedFiles.length;

            if (totalPhotos > MAX_PHOTOS) {
                alert(`You can only upload up to ${MAX_PHOTOS} photos.`);
                return prev; 
            }

            const newPhotos = selectedFiles.map(file => ({
                file,
                previewUrl: URL.createObjectURL(file),
                isThumbnail: false,
            }));

            const combinedPhotos = [...prev.photos, ...newPhotos];

            if (!combinedPhotos.some(photo => photo.isThumbnail) && combinedPhotos.length > 0) {
                combinedPhotos[0].isThumbnail = true;
            }

            return {
                ...prev,
                photos: combinedPhotos,
            };
        });

        e.target.value = '';
    };

    const handleUpload = () => {
        fileInputRef.current?.click();
    };

    const handleSetThumbnail = (index: number) => {
        setForm(prev => {
            const updatedPhotos = prev.photos.map((photo, i) => ({
                ...photo,
                isThumbnail: i === index
            }));
            return {
                ...prev,
                photos: updatedPhotos
            };
        });
    };

    const handleDeletePhoto = async (index: number) => {
        const photo = form.photos[index];

        if (photo.file && !photo.url) {
            setForm(prev => {
            const updatedPhotos = prev.photos.filter((_, i) => i !== index);

            if (photo.isThumbnail && updatedPhotos.length > 0) {
                updatedPhotos[0].isThumbnail = true;
            }

            return { ...prev, photos: updatedPhotos };
            });
            return;
        }

        if (photo.public_id) {
            try {
            const res = await deleteImage(photo.public_id);

            if (res.success) {
                setForm(prev => {
                const updatedPhotos = prev.photos.filter((_, i) => i !== index);

                if (photo.isThumbnail && updatedPhotos.length > 0) {
                    updatedPhotos[0].isThumbnail = true;
                }

                return { ...prev, photos: updatedPhotos };
                });
            } else {
                alert("❌ Failed to delete image from Cloudinary.");
            }
            } catch (error) {
            console.error("Error deleting image:", error);
            alert("⚠️ Error deleting image.");
            }
        } else {
            setForm(prev => {
            const updatedPhotos = prev.photos.filter((_, i) => i !== index);

            if (photo.isThumbnail && updatedPhotos.length > 0) {
                updatedPhotos[0].isThumbnail = true;
            }

            return { ...prev, photos: updatedPhotos };
            });
        }
    };

    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    const handleOpenDelete = (index: number) => {
        setDeleteIndex(index);
        setShowPopup(true);
    };
    const confirmDelete = async () => {
        if (deleteIndex !== null) {
            await handleDeletePhoto(deleteIndex);
            setShowPopup(false);
        }
    };






    return <>
       <div className="flex flex-col w-[95%] mx-auto mt-12 ">
        <div className="flex justify-between mb-8">
            <h2 className='heading-2'>Add new tour</h2>
            <div id="button__group" className="flex gap-2">
                <button className='border border-gray-300 rounded-3xl py-2 px-4 cursor-pointer'>Preview</button>     
                <button onClick={confirmAdd} className='border border-gray-300 rounded-3xl py-2 px-4 cursor-pointer'>Save</button>      
            </div>
        </div>
        <form action="">
        <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-8">
            <div id="grid__1" className="flex flex-col">
                <h3>General Information</h3>
 
                    <h4>Tour Title</h4>
                    <input type="text" id="title" value={form.title} onChange={handleChange} placeholder="Enter tour title" className="border border-gray-300 rounded-md p-2 mb-4 w-full"/>
                    <div className="grid grid-cols-3 justify-between gap-4 flex-1 ">
                        <div className="flex flex-col">                    
                            <h4>Tour Country</h4>
                            {/* <input type="text" id="country" value={form.country} onChange={handleChange} placeholder="Enter tour country" className="border border-gray-300 rounded-md p-2 mb-4 w-full"/>                             */}
                            {/* <SearchableDropdown options={countries.map(c => c.name)} value={form.country} onChange={(newCountry) => setForm(prev => ({ ...prev, country: newCountry }))}  /> */}
                            <div className="relative w-full">
                                <SearchableDropdown
                                    options={(countries ?? []).map(c => c.name)}
                                    value={form.country}
                                    // query={query}
                                    onInputChange={handleInputChange}
                                    onChange={handleSelectCountry}
                                />
                            </div>

                        </div>
                        <div className="flex flex-col">
                            <h4>Tour Subregion</h4>
                            <input type="text" id="subregion" readOnly tabIndex={-1} value={selectedSubregion} className="border border-gray-300 rounded-md p-2 mb-4 w-full bg-gray-100 cursor-not-allowed"/>
                        </div>
                        <div className="flex flex-col">
                            <h4>Tour City</h4>
                            <input type="text" id="city" value={form.city} onChange={handleChange} placeholder="Enter tour city" className="border border-gray-300 rounded-md p-2 mb-4 w-full"/>
                        </div>                  
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 w-full flex-1 justify-between">
                        <div className="flex flex-col">
                            <h4>Tour Price</h4>
                            <input type="number" id="price" value={form.price} onChange={handleChange} placeholder="Enter tour price" className="border border-gray-300 rounded-md p-2 mb-4 w-full"/>
                        </div>

                        <div className="flex flex-col">
                            <h4>Max Group Size</h4>
                            <input type="number" id="maxGroupSize" value={form.maxGroupSize} onChange={handleChange} placeholder="Enter max group size" className="border border-gray-300 rounded-md p-2 mb-4 w-full"/>
                        </div>

                        <div className="flex flex-col">
                            <h4>Discount</h4>
                            <input type="number" id="discount" value={form.discount} onChange={handleChange} placeholder="Enter discount" className="border border-gray-300 rounded-md p-2 mb-4 w-full"/>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-2">
                        <div className="flex gap-6 items-center">
                             <h4>Visible</h4>
                            <ToggleSwitch 
                            checked={form.isVisible} 
                            onChange={(val) => setForm(prev => ({ ...prev, isVisible: val }))}                             
                            />
                        </div>
                        <div className="flex gap-6 items-center">
                             <h4>Featured</h4>
                            <ToggleSwitch 
                            checked={form.featured} 
                            onChange={(val) => setForm(prev => ({ ...prev, featured: val }))} 
                            />
                        </div>
                    </div>


                    <div className="flex flex-col">
                        <h4>Tour Description</h4>
                        <textarea id="desc" value={form.desc} onChange={handleChange} placeholder="Enter tour description" className="border border-gray-300 rounded-md p-2 mb-4 w-full h-32 resize-y min-h-[80px]"/>
                    </div>
                   
                        <div className="flex justify-between">
                            <h4>Tour Schedule</h4>
                            <button onClick={addDay} type="button" className='h-8 w-8 rounded-lg bg-black text-white border cursor-pointer'>+</button>
                        </div>
                        {form.itinerary.map((day, index) => (
                            <div key={index} className="my-8 shadow-sm rounded-lg  ">
                                <div className="flex justify-end mb-2">
                                    <button onClick={() => removeDay(index)} className="border h-8 w-8 border rounded-lg bg-black flex items-center justify-center cursor-pointer">
                                        <i className="ri-delete-bin-line text-lg text-white"></i>                                            
                                    </button>
                                </div>
                                <div className="flex items-center gap-2 ">
                                    <span className="border border-gray-300 rounded-lg p-2 bg-gray-400 whitespace-nowrap">Day {index+1}</span>
                                    <input type="text" onChange={(e) => handleDayTitleChange(index, e.target.value)} className="border border-gray-300 rounded-md p-2 w-full" value={day.title} placeholder=""/>                                    
                                    </div>
                                    <div className="flex flex-col mt-4">
                                        <div className="flex justify-between items-center">
                                            <h4>Activities</h4>
                                            <button type="button" onClick={() => addActivity(index)} className="w-auto rounded-lg bg-black text-white border p-2 cursor-pointer">+ Add activity</button>
                                        </div>
                                        {day.activities.map((activity, actIndex) => (
                                            <div key={actIndex} className="mt-8" >
                                                <div className="flex justify-end ">

                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <h4>Activity Title</h4>
                                                    <button type="button" onClick={() => removeActivity(index, actIndex)} className="border h-8 w-8 border rounded-lg bg-black flex items-center justify-center mb-2 cursor-pointer">
                                                        <i className="ri-delete-bin-line text-lg text-white"></i>                                            
                                                    </button>
                                                </div>
                                                <input type="text" onChange={(e) => handleActivityChange(index, actIndex, 'title', e.target.value)} className="border border-gray-300 rounded-md p-2 w-full" value={activity.title} />
                                                <h4 className="mt-4">Activity Description</h4>
                                                <textarea onChange={(e) => handleActivityChange(index, actIndex, 'description', e.target.value)} className="border border-gray-300 rounded-md p-2 w-full h-24 resize-y min-h-[80px]" value={activity.description}/>
                                                
                                            </div>

                                        ))}
                                    </div>

                                </div>                           
                        ))}                 

            </div>

            <div id="grid__2" className="flex flex-col">
                <div className="flex justify-between items-center mb-1">
                    <h3>Tour Images</h3>                  
                        <button type="button" onClick={handleUpload} className='bg-blue-200 text-blue-500 px-3 py-1 rounded-2xl cursor-pointer font-bold'>
                            Upload
                        </button>
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} multiple/>                
                </div>

                <div id="thumbnail">
                    {form.photos.length === 0 && (
                        <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mt-6">
                            <span className="text-gray-400">No images</span>
                        </div>
                    )}

                    {/* {form.photos.length > 0 && (
                        <div className="relative">
                            <img src={getPhotoUrl(form.photos.find((photo:TourPhoto) => photo.isThumbnail)||form.photos[0])} 
                            alt="Thumbnail" 
                            className="w-full h-48 object-cover rounded-lg mb-4"/>
                            <span className='absolute top-0 right-0 bg-[#FFFFFF4D] px-2 py-2 rounded-lg text-xl text-white'>Thumbnail</span>
                            <button type="button"  onClick={() => handleOpenDelete(index)} className='absolute top-0 left-0 bg-[#FFFFFF4D] px-2 py-2 rounded-lg text-xl text-white cursor-pointer'><i className="ri-delete-bin-line"></i></button>

                        </div>

                    )} */}
                    {form.photos.length > 0 && (() => {
                        const thumbnailIndex = form.photos.findIndex((photo: TourPhoto) => photo.isThumbnail);
                        const thumbnailPhoto = form.photos[thumbnailIndex !== -1 ? thumbnailIndex : 0];

                        return (
                            <div className="relative">
                                <img
                                    src={getPhotoUrl(thumbnailPhoto)}
                                    alt="Thumbnail"
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                                <span className="absolute top-0 right-0 bg-[#FFFFFF4D] px-2 py-2 rounded-lg text-xl text-white">
                                    Thumbnail
                                </span>
                                <button
                                    type="button"
                                    onClick={() => handleOpenDelete(thumbnailIndex !== -1 ? thumbnailIndex : 0)}
                                    className="absolute top-0 left-0 bg-[#FFFFFF4D] px-2 py-2 rounded-lg text-xl text-white cursor-pointer"
                                >
                                    <i className="ri-delete-bin-line"></i>
                                </button>
                            </div>
                            );
                        })()}

                    {form.photos.length > 1 && (
                        <>
                        <Slider {...sliderSettings} className="w-full flex justify-center items-center">
                            {form.photos
                            .filter((photo:TourPhoto) => !photo.isThumbnail)
                            .map((photo:TourPhoto, index:number) => {                               
                                const realIndex = form.photos.findIndex(p => p === photo);
                                 return (
                                <div key={index} onClick={() => handleSetThumbnail(realIndex)} className=" w-1/2 h-24 flex justify-center items-center">
                                    <div className="relative p-1 h-full w-full">
                                        <img src={getPhotoUrl(photo)} alt={`Photo ${index}`}  className="object-cover w-full h-full rounded-md "/>
                                        {/* <button type="button"  onClick={() => handleOpenDelete(index)} className='absolute top-0 right-0 bg-[#FFFFFF4D] px-2 py-2 rounded-lg text-xl text-white cursor-pointer'><i className="ri-delete-bin-line"></i></button> */}
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation(); 
                                                handleOpenDelete(realIndex);
                                            }}
                                            className="absolute top-0 right-0 bg-[#FFFFFF4D] px-2 py-2 rounded-lg text-xl text-white cursor-pointer"
                                            >
                                            <i className="ri-delete-bin-line"></i>
                                        </button>
                                    </div>
                                </div>
                            );
                            })}
                        </Slider>

                        </>

                    )}
                </div>
            </div>
         
        </div>
    </form>

       </div>
       {showPopup && (
            <DeletePopup
                message="Are you sure you want to delete this photo?"
                onConfirm={confirmDelete}
                onClose={() => setShowPopup(false)}
            />
        )}


        
    </>
}