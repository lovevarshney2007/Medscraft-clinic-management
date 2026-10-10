// import React, { useState } from "react";
// import Admin_Header from "../Medscraft/Admin_Header";
// import Sidebar from "../Sidebar";
// import Select from "react-select";
// import { TextField } from "@mui/material";
// import { Link } from 'react-router-dom';
// import FeatherIcon from "feather-icons-react/build/FeatherIcon";
// import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useMutation } from "@tanstack/react-query";
// import { ADD_CLINIC_URL } from '../../Util/const';
// import { postClinicRequest } from "../../Util/fetchClinicUtil";
// import { addClinicValidationSchema } from "../../Util/validationSchemas";

// // eslint-disable-next-line react/prop-types
// const AddClinic = ({ onClinicAdded }) => {
//   const [startTime, setStartTime] = useState();
//   const [endTime, setEndTime] = useState();

//   const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
//     resolver: yupResolver(addClinicValidationSchema)
//   });

//   const [cities] = useState([
//     { value: "Mumbai", label: "Mumbai" },
//     { value: "Delhi", label: "Delhi" },
//     { value: "Bangalore", label: "Bangalore" },
//     { value: "Hyderabad", label: "Hyderabad" },
//     { value: "Ahmedabad", label: "Ahmedabad" },
//     { value: "Chennai", label: "Chennai" },
//     { value: "Kolkata", label: "Kolkata" },
//     { value: "Surat", label: "Surat" },
//     { value: "Pune", label: "Pune" },
//     { value: "Jaipur", label: "Jaipur" },
//     { value: "Lucknow", label: "Lucknow" },
//     { value: "Kanpur", label: "Kanpur" },
//     { value: "Nagpur", label: "Nagpur" },
//     { value: "Indore", label: "Indore" },
//     { value: "Thane", label: "Thane" },
//     { value: "Bhopal", label: "Bhopal" },
//     { value: "Visakhapatnam", label: "Visakhapatnam" },
//     { value: "Patna", label: "Patna" },
//     { value: "Vadodara", label: "Vadodara" },
//     { value: "Ghaziabad", label: "Ghaziabad" },
//     { value: "Gurugram", label: "Gurugram" },
//     { value: "Noida", label: "Noida" },
//     { value: "Jabalpur", label: "Jabalpur" },
//     { value: "Bhopal", label: "Bhopal" },
//     { value: "Indore", label: "Indore" }
//   ]);

//   const [states] = useState([
//     { value: "Andhra Pradesh", label: "Andhra Pradesh" },
//     { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
//     { value: "Assam", label: "Assam" },
//     { value: "Bihar", label: "Bihar" },
//     { value: "Chhattisgarh", label: "Chhattisgarh" },
//     { value: "Goa", label: "Goa" },
//     { value: "Gujarat", label: "Gujarat" },
//     { value: "Haryana", label: "Haryana" },
//     { value: "Himachal Pradesh", label: "Himachal Pradesh" },
//     { value: "Jharkhand", label: "Jharkhand" },
//     { value: "Karnataka", label: "Karnataka" },
//     { value: "Kerala", label: "Kerala" },
//     { value: "Madhya Pradesh", label: "Madhya Pradesh" },
//     { value: "Maharashtra", label: "Maharashtra" },
//     { value: "Manipur", label: "Manipur" },
//     { value: "Meghalaya", label: "Meghalaya" },
//     { value: "Mizoram", label: "Mizoram" },
//     { value: "Nagaland", label: "Nagaland" },
//     { value: "Odisha", label: "Odisha" },
//     { value: "Punjab", label: "Punjab" },
//     { value: "Rajasthan", label: "Rajasthan" },
//     { value: "Sikkim", label: "Sikkim" },
//     { value: "Tamil Nadu", label: "Tamil Nadu" },
//     { value: "Telangana", label: "Telangana" },
//     { value: "Tripura", label: "Tripura" },
//     { value: "Uttar Pradesh", label: "Uttar Pradesh" },
//     { value: "Uttarakhand", label: "Uttarakhand" },
//     { value: "West Bengal", label: "West Bengal" },
//     { value: "Chandigarh", label: "Chandigarh" },
//     { value: "Delhi", label: "Delhi" },
//     { value: "Lakshadweep", label: "Lakshadweep" },
//     { value: "Puducherry", label: "Puducherry" },
//   ]);

//   const [specialties] = useState([
//     { value: "Surgeon", label: "Surgeon" },
//     { value: "Pediatrician", label: "Pediatrician" },
//     { value: "General Practitioner", label: "General Practitioner" },
//     { value: "Cardiologist", label: "Cardiologist" },
//     { value: "Orthopedic Surgeon", label: "Orthopedic Surgeon" },
//     { value: "Radiologist", label: "Radiologist" },
//     { value: "Dentist", label: "Dentist" },
//     { value: "Neurologist", label: "Neurologist" },
//     { value: "Gastroenterologist", label: "Gastroenterologist" },
//     { value: "Dermatologist", label: "Dermatologist" },
//     { value: "Gynecologist", label: "Gynecologist" },
//     { value: "Oncologist", label: "Oncologist" },
//     { value: "Nephrologist", label: "Nephrologist" },
//     { value: "Urologist", label: "Urologist" },
//     { value: "Ophthalmologist", label: "Ophthalmologist" },
//     { value: "Pulmonologist", label: "Pulmonologist" },
//     { value: "Psychiatrist", label: "Psychiatrist" },
//     { value: "Endocrinologist", label: "Endocrinologist" },
//     { value: "Rheumatologist", label: "Rheumatologist" },
//     { value: "Hematologist", label: "Hematologist" }
//   ]);

//   const daysOptions = [
//     { value: "Monday", label: "Monday" },
//     { value: "Tuesday", label: "Tuesday" },
//     { value: "Wednesday", label: "Wednesday" },
//     { value: "Thursday", label: "Thursday" },
//     { value: "Friday", label: "Friday" },
//     { value: "Saturday", label: "Saturday" },
//     { value: "Sunday", label: "Sunday" }
//   ];

//   const mutation = useMutation({
//     mutationFn: async (data) => {
//       return await postClinicRequest(ADD_CLINIC_URL, data);
//     },
//     onSuccess: (response) => {
//       if (response.status === 201) {
//         onClinicAdded(response.data);
//         reset();
//       }
//     },
//     onError: (error) => {
//       console.error('Error adding clinic:', error);
//     }
//   });

//   const onSubmit = async (data) => {
//     const formData = { ...data, operatingHours: { startTime, endTime } };
//     mutation.mutate(formData);
//   };

//   return (
//     <div>
//       <Admin_Header />
//       <Sidebar id="menu-item3" id1="menu-items3" activeClassName="add-clinic" />
//       <div className="page-wrapper">
//         <div className="content">
//           <div className="page-header">
//             <div className="row">
//               <div className="col-sm-12">
//                 <ul className="breadcrumb">
//                   <li className="breadcrumb-item">
//                     <Link to="#">Clinics </Link>
//                   </li>
//                   <li className="breadcrumb-item">
//                     <i className="feather-chevron-right">
//                       <FeatherIcon icon="chevron-right" />
//                     </i>
//                   </li>
//                   <li className="breadcrumb-item active">Add Clinic</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-sm-12">
//               <div className="card">
//                 <div className="card-body">
//                   <form onSubmit={handleSubmit(onSubmit)}>
//                     <div className="row">
//                       <div className="col-12">
//                         <div className="form-heading">
//                           <h4>Clinic Basic Information</h4>
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6 col-xl-4">
//                         <div className="form-group local-forms">
//                           <label>
//                             Clinic Name <span className="login-danger">*</span>
//                           </label>
//                           <input
//                             className="form-control"
//                             type="text"
//                             {...register('clinicName')}
//                           />
//                           {errors.clinicName && <p className="text-danger">{errors.clinicName.message}</p>}
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6 col-xl-4">
//                         <div className="form-group local-forms">
//                           <label>
//                             Contact Number <span className="login-danger">*</span>
//                           </label>
//                           <input
//                             className="form-control"
//                             type="text"
//                             name="contactNumber"
//                             {...register('contactNumber')}
//                           />
//                           {errors.contactNumber && <p className="text-danger">{errors.contactNumber.message}</p>}
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6 col-xl-4">
//                         <div className="form-group local-forms">
//                           <label>
//                             Email Address <span className="login-danger">*</span>
//                           </label>
//                           <input
//                             className="form-control"
//                             type="email"
//                             name="emailAddress"
//                             {...register('emailAddress')}
//                           />
//                           {errors.emailAddress && <p className="text-danger">{errors.emailAddress.message}</p>}
//                         </div>
//                       </div>
//                       <div className="col-12">
//                         <div className="form-group local-forms">
//                           <label>
//                             Clinic Address <span className="login-danger">*</span>
//                           </label>
//                           <textarea
//                             className="form-control"
//                             name="clinicAddress"
//                             rows={3}
//                             {...register('clinicAddress')}
//                           />
//                           {errors.clinicAddress && <p className="text-danger">{errors.clinicAddress.message}</p>}
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6 col-xl-4">
//                         <div className="form-group local-forms">
//                           <label>
//                             Postal Code <span className="login-danger">*</span>
//                           </label>
//                           <input
//                             className="form-control"
//                             type="text"
//                             name="postalCode"
//                             {...register('postalCode')}
//                           />
//                           {errors.postalCode && <p className="text-danger">{errors.postalCode.message}</p>}
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6 col-xl-4">
//                         <div className="form-group local-forms">
//                           <label>
//                             City <span className="login-danger">*</span>
//                           </label>
//                           <Controller
//                             name="city"
//                             control={control}
//                             render={({ field }) => (
//                               <Select
//                                 {...field}
//                                 options={cities}
//                                 placeholder=""
//                                 menuPortalTarget={document.body}
//                                 styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
//                                 components={{ IndicatorSeparator: () => null }}
//                                 // eslint-disable-next-line react/jsx-no-duplicate-props
//                                 styles={{
//                                   control: (baseStyles, state) => ({
//                                     ...baseStyles,
//                                     borderColor: state.isFocused ? 'none' : '2px solid rgba(46, 55, 164, 0.1);',
//                                     boxShadow: state.isFocused ? '0 0 0 1px #2e37a4' : 'none',
//                                     '&:hover': {
//                                       borderColor: state.isFocused ? 'none' : '2px solid rgba(46, 55, 164, 0.1)',
//                                     },
//                                     borderRadius: '10px',
//                                     fontSize: "14px",
//                                     minHeight: "45px",
//                                   }),
//                                   dropdownIndicator: (base, state) => ({
//                                     ...base,
//                                     transform: state.selectProps.menuIsOpen ? 'rotate(-180deg)' : 'rotate(0)',
//                                     transition: '250ms',
//                                     width: '35px',
//                                     height: '35px',
//                                   }),
//                                 }}
//                               />
//                             )}
//                           />
//                           {errors.city && <p className="text-danger">{errors.city.message}</p>}
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6 col-xl-4">
//                         <div className="form-group local-forms">
//                           <label>
//                             State <span className="login-danger">*</span>
//                           </label>
//                           <Controller
//                             name="state"
//                             control={control}
//                             render={({ field }) => (
//                               <Select
//                                 {...field}
//                                 options={states}
//                                 placeholder=""
//                                 menuPortalTarget={document.body}
//                                 styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
//                                 components={{ IndicatorSeparator: () => null }}
//                                 // eslint-disable-next-line react/jsx-no-duplicate-props
//                                 styles={{
//                                   control: (baseStyles, state) => ({
//                                     ...baseStyles,
//                                     borderColor: state.isFocused ? 'none' : '2px solid rgba(46, 55, 164, 0.1);',
//                                     boxShadow: state.isFocused ? '0 0 0 1px #2e37a4' : 'none',
//                                     '&:hover': {
//                                       borderColor: state.isFocused ? 'none' : '2px solid rgba(46, 55, 164, 0.1)',
//                                     },
//                                     borderRadius: '10px',
//                                     fontSize: "14px",
//                                     minHeight: "45px",
//                                   }),
//                                   dropdownIndicator: (base, state) => ({
//                                     ...base,
//                                     transform: state.selectProps.menuIsOpen ? 'rotate(-180deg)' : 'rotate(0)',
//                                     transition: '250ms',
//                                     width: '35px',
//                                     height: '35px',
//                                   }),
//                                 }}
//                               />
//                             )}
//                           />
//                           {errors.state && <p className="text-danger">{errors.state.message}</p>}
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6 col-xl-6">
//                         <div className="form-group local-forms">
//                           <label>
//                             Website URL <span className="login-danger">*</span>
//                           </label>
//                           <input
//                             className="form-control"
//                             type="text"
//                             name="websiteURL"
//                             placeholder="www.example.com"
//                             {...register('websiteURL')}
//                           />
//                           {errors.websiteURL && <p className="text-danger">{errors.websiteURL.message}</p>}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="row">
//                       <div className="col-12">
//                         <div className="form-heading">
//                           <h4>Clinic Detailed Information</h4>
//                         </div>
//                       </div>
//                       <div className="col-12">
//                         <div className="form-group local-forms">
//                           <label>
//                             Clinic Description <span className="login-danger">*</span>
//                           </label>
//                           <textarea
//                             className="form-control"
//                             name="clinicDescription"
//                             rows={3}
//                             {...register('clinicDescription')}
//                           />
//                           {errors.clinicDescription && <p className="text-danger">{errors.clinicDescription.message}</p>}
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6 col-xl-4">
//                         <div className="form-group local-forms">
//                           <label>
//                             Clinic Specialties <span className="login-danger">*</span>
//                           </label>
//                           <Controller
//                             name="clinicSpecialties"
//                             control={control}
//                             render={({ field }) => (
//                               <Select
//                                 {...field}
//                                 isMulti
//                                 options={specialties}
//                                 placeholder=""
//                                 menuPortalTarget={document.body}
//                                 styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
//                                 components={{ IndicatorSeparator: () => null }}
//                                 // eslint-disable-next-line react/jsx-no-duplicate-props
//                                 styles={{
//                                   control: (baseStyles, state) => ({
//                                     ...baseStyles,
//                                     borderColor: state.isFocused ? 'none' : '2px solid rgba(46, 55, 164, 0.1);',
//                                     boxShadow: state.isFocused ? '0 0 0 1px #2e37a4' : 'none',
//                                     '&:hover': {
//                                       borderColor: state.isFocused ? 'none' : '2px solid rgba(46, 55, 164, 0.1)',
//                                     },
//                                     borderRadius: '10px',
//                                     fontSize: "14px",
//                                     minHeight: "45px",
//                                   }),
//                                   dropdownIndicator: (base, state) => ({
//                                     ...base,
//                                     transform: state.selectProps.menuIsOpen ? 'rotate(-180deg)' : 'rotate(0)',
//                                     transition: '250ms',
//                                     width: '35px',
//                                     height: '35px',
//                                   }),
//                                 }}
//                               />
//                             )}
//                           />
//                           {errors.clinicSpecialties && <p className="text-danger">{errors.clinicSpecialties.message}</p>}
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6 col-xl-4">
//                         <div className="form-group local-forms">
//                           <label>
//                             Services Provided <span className="login-danger">*</span>
//                           </label>
//                           <input
//                             className="form-control"
//                             type="text"
//                             name="servicesProvided"
//                             {...register('servicesProvided')}
//                           />
//                           {errors.servicesProvided && <p className="text-danger">{errors.servicesProvided.message}</p>}
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6 col-xl-4">
//                         <div className="form-group local-forms">
//                           <label>
//                             Operating Hours <span className="login-danger">*</span>
//                           </label>
//                           <input
//                             className="form-control"
//                             type="text"
//                             name="operatingHours"
//                             {...register('operatingHours')}
//                           />
//                           {errors.operatingHours && <p className="text-danger">{errors.operatingHours.message}</p>}
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6 col-xl-4">
//                         <div className="form-group local-forms">
//                           <label>
//                             Select Days <span className="login-danger">*</span>
//                           </label>
//                           <Controller
//                             name="selectedDays"
//                             control={control}
//                             render={({ field }) => (
//                               <Select
//                                 {...field}
//                                 isMulti
//                                 options={daysOptions}
//                                 placeholder="Select Days"
//                                 menuPortalTarget={document.body}
//                                 styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
//                                 components={{ IndicatorSeparator: () => null }}
//                                 // eslint-disable-next-line react/jsx-no-duplicate-props
//                                 styles={{
//                                   control: (baseStyles, state) => ({
//                                     ...baseStyles,
//                                     borderColor: state.isFocused ? 'none' : '2px solid rgba(46, 55, 164, 0.1);',
//                                     boxShadow: state.isFocused ? '0 0 0 1px #2e37a4' : 'none',
//                                     '&:hover': {
//                                       borderColor: state.isFocused ? 'none' : '2px solid rgba(46, 55, 164, 0.1)',
//                                     },
//                                     borderRadius: '10px',
//                                     fontSize: "14px",
//                                     minHeight: "45px",
//                                   }),
//                                   dropdownIndicator: (base, state) => ({
//                                     ...base,
//                                     transform: state.selectProps.menuIsOpen ? 'rotate(-180deg)' : 'rotate(0)',
//                                     transition: '250ms',
//                                     width: '35px',
//                                     height: '35px',
//                                   }),
//                                 }}
//                               />
//                             )}
//                           />
//                           {errors.selectedDays && <p className="text-danger">{errors.selectedDays.message}</p>}
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6 col-xl-4">
//                         <div className="form-group local-forms">
//                           <label>
//                             From <span className="login-danger">*</span>
//                           </label>
//                           <div className="">
//                             <TextField
//                               className="form-control"
//                               id="outlined-controlled"
//                               type="time"
//                               value={startTime}
//                               onChange={(event) => {
//                                 setStartTime(event.target.value);
//                               }}
//                             />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6 col-xl-4">
//                         <div className="form-group local-forms">
//                           <label>
//                             To <span className="login-danger">*</span>
//                           </label>
//                           <div className="">
//                             <TextField
//                               className="form-control"
//                               id="outlined-controlled"
//                               type="time"
//                               value={endTime}
//                               onChange={(event) => {
//                                 setEndTime(event.target.value);
//                               }}
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="row">
//                       <div className="col-12">
//                         <div className="form-heading">
//                           <h4>Staff Information</h4>
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6 col-xl-4">
//                         <div className="form-group local-forms">
//                           <label>
//                             Number of Doctors <span className="login-danger">*</span>
//                           </label>
//                           <input
//                             className="form-control"
//                             type="number"
//                             name="numberOfDoctors"
//                             {...register('numberOfDoctors')}
//                           />
//                           {errors.numberOfDoctors && <p className="text-danger">{errors.numberOfDoctors.message}</p>}
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6 col-xl-4">
//                         <div className="form-group local-forms">
//                           <label>
//                             Number of Nurses <span className="login-danger">*</span>
//                           </label>
//                           <input
//                             className="form-control"
//                             type="number"
//                             name="numberOfNurses"
//                             {...register('numberOfNurses')}
//                           />
//                           {errors.numberOfNurses && <p className="text-danger">{errors.numberOfNurses.message}</p>}
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6 col-xl-4">
//                         <div className="form-group local-forms">
//                           <label>
//                             Number of Administrative Staff <span className="login-danger">*</span>
//                           </label>
//                           <input
//                             className="form-control"
//                             type="number"
//                             name="numberOfAdministrativeStaff"
//                             {...register('numberOfAdministrativeStaff')}
//                           />
//                           {errors.numberOfAdministrativeStaff && <p className="text-danger">{errors.numberOfAdministrativeStaff.message}</p>}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="row">
//                       <div className="col-12">
//                         <div className="form-heading">
//                           <h4>Additional Information</h4>
//                         </div>
//                       </div>
//                       <div className="col-12">
//                         <div className="form-group local-forms">
//                           <label>
//                             Insurance Accepted <span className="login-danger">*</span>
//                           </label>
//                           <textarea
//                             className="form-control"
//                             name="insuranceAccepted"
//                             rows={3}
//                             {...register('insuranceAccepted')}
//                           />
//                           {errors.insuranceAccepted && <p className="text-danger">{errors.insuranceAccepted.message}</p>}
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6 col-xl-4">
//                         <div className="form-group local-forms">
//                           <label>
//                             Accreditations and Certifications <span className="login-danger">*</span>
//                           </label>
//                           <input
//                             className="form-control"
//                             type="text"
//                             name="accreditations"
//                             {...register('accreditations')}
//                           />
//                           {errors.accreditations && <p className="text-danger">{errors.accreditations.message}</p>}
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6 col-xl-4">
//                         <div className="form-group local-forms">
//                           <label>
//                             Affiliations with Hospitals or Medical Networks <span className="login-danger">*</span>
//                           </label>
//                           <input
//                             className="form-control"
//                             type="text"
//                             name="affiliations"
//                             {...register('affiliations')}
//                           />
//                           {errors.affiliations && <p className="text-danger">{errors.affiliations.message}</p>}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="row">
//                       <div className="col-12">
//                         <div className="form-heading">
//                           <h4>Administrative Details</h4>
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6 col-xl-4">
//                         <div className="form-group local-forms">
//                           <label>
//                             Registration Number <span className="login-danger">*</span>
//                           </label>
//                           <input
//                             className="form-control"
//                             type="text"
//                             name="registrationNumber"
//                             {...register('registrationNumber')}
//                           />
//                           {errors.registrationNumber && <p className="text-danger">{errors.registrationNumber.message}</p>}
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6 col-xl-4">
//                         <div className="form-group local-forms">
//                           <label>
//                             License Number <span className="login-danger">*</span>
//                           </label>
//                           <input
//                             className="form-control"
//                             type="text"
//                             name="licenseNumber"
//                             {...register('licenseNumber')}
//                           />
//                           {errors.licenseNumber && <p className="text-danger">{errors.licenseNumber.message}</p>}
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6 col-xl-4">
//                         <div className="form-group local-forms">
//                           <label>
//                             Date of Establishment <span className="login-danger">*</span>
//                           </label>
//                           <input
//                             className="form-control"
//                             type="date"
//                             name="dateOfEstablishment"
//                             {...register('dateOfEstablishment')}
//                           />
//                           {errors.dateOfEstablishment && <p className="text-danger">{errors.dateOfEstablishment.message}</p>}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="row">
//                       <div className="col-12">
//                         <div className="form-heading">
//                           <h4>Contact Person</h4>
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6 col-xl-4">
//                         <div className="form-group local-forms">
//                           <label>
//                             Contact Person Name <span className="login-danger">*</span>
//                           </label>
//                           <input
//                             className="form-control"
//                             type="text"
//                             name="contactPersonName"
//                             {...register('contactPersonName')}
//                           />
//                           {errors.contactPersonName && <p className="text-danger">{errors.contactPersonName.message}</p>}
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6 col-xl-4">
//                         <div className="form-group local-forms">
//                           <label>
//                             Contact Person Designation <span className="login-danger">*</span>
//                           </label>
//                           <input
//                             className="form-control"
//                             type="text"
//                             name="contactPersonDesignation"
//                             {...register('contactPersonDesignation')}
//                           />
//                           {errors.contactPersonDesignation && <p className="text-danger">{errors.contactPersonDesignation.message}</p>}
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6 col-xl-4">
//                         <div className="form-group local-forms">
//                           <label>
//                             Contact Person Phone Number <span className="login-danger">*</span>
//                           </label>
//                           <input
//                             className="form-control"
//                             type="text"
//                             name="contactPersonPhoneNumber"
//                             {...register('contactPersonPhoneNumber')}
//                           />
//                           {errors.contactPersonPhoneNumber && <p className="text-danger">{errors.contactPersonPhoneNumber.message}</p>}
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6 col-xl-4">
//                         <div className="form-group local-forms">
//                           <label>
//                             Contact Person Email Address <span className="login-danger">*</span>
//                           </label>
//                           <input
//                             className="form-control"
//                             type="email"
//                             name="contactPersonEmailAddress"
//                             {...register('contactPersonEmailAddress')}
//                           />
//                           {errors.contactPersonEmailAddress && <p className="text-danger">{errors.contactPersonEmailAddress.message}</p>}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="row">
//                       <div className="col-12">
//                         <div className="form-heading">
//                           <h4>Amenities</h4>
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6 col-xl-4">
//                         <div className="form-group local-forms">
//                           <label>
//                             Parking Availability <span className="login-danger">*</span>
//                           </label>
//                           <select
//                             className="form-control"
//                             name="parkingAvailability"
//                             {...register('parkingAvailability')}
//                           >
//                             <option value="">Select</option>
//                             <option value="Yes">Yes</option>
//                             <option value="No">No</option>
//                           </select>
//                           {errors.parkingAvailability && <p className="text-danger">{errors.parkingAvailability.message}</p>}
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6 col-xl-4">
//                         <div className="form-group local-forms">
//                           <label>
//                             Wheelchair Accessibility <span className="login-danger">*</span>
//                           </label>
//                           <select
//                             className="form-control"
//                             name="wheelchairAccessibility"
//                             {...register('wheelchairAccessibility')}
//                           >
//                             <option value="">Select</option>
//                             <option value="Yes">Yes</option>
//                             <option value="No">No</option>
//                           </select>
//                           {errors.wheelchairAccessibility && <p className="text-danger">{errors.wheelchairAccessibility.message}</p>}
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6 col-xl-4">
//                         <div className="form-group local-forms">
//                           <label>
//                             Online Appointment Booking <span className="login-danger">*</span>
//                           </label>
//                           <select
//                             className="form-control"
//                             name="onlineAppointmentBooking"
//                             {...register('onlineAppointmentBooking')}
//                           >
//                             <option value="">Select</option>
//                             <option value="Yes">Yes</option>
//                             <option value="No">No</option>
//                           </select>
//                           {errors.onlineAppointmentBooking && <p className="text-danger">{errors.onlineAppointmentBooking.message}</p>}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="row">
//                       <div className="col-12">
//                         <div className="form-heading">
//                           <h4>Social Media</h4>
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6 col-xl-4">
//                         <div className="form-group local-forms">
//                           <label>
//                             Facebook URL
//                           </label>
//                           <input
//                             className="form-control"
//                             type="text"
//                             name="facebookURL"
//                             {...register('facebookURL')}
//                           />
//                           {errors.facebookURL && <p className="text-danger">{errors.facebookURL.message}</p>}
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6 col-xl-4">
//                         <div className="form-group local-forms">
//                           <label>
//                             Twitter Handle
//                           </label>
//                           <input
//                             className="form-control"
//                             type="text"
//                             name="twitterHandle"
//                             {...register('twitterHandle')}
//                           />
//                           {errors.twitterHandle && <p className="text-danger">{errors.twitterHandle.message}</p>}
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6 col-xl-4">
//                         <div className="form-group local-forms">
//                           <label>
//                             LinkedIn Profile
//                           </label>
//                           <input
//                             className="form-control"
//                             type="text"
//                             name="linkedInProfile"
//                             {...register('linkedInProfile')}
//                           />
//                           {errors.linkedInProfile && <p className="text-danger">{errors.linkedInProfile.message}</p>}
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6 col-xl-4">
//                         <div className="form-group local-forms">
//                           <label>
//                             Instagram Handle
//                           </label>
//                           <input
//                             className="form-control"
//                             type="text"
//                             name="instagramHandle"
//                             {...register('instagramHandle')}
//                           />
//                           {errors.instagramHandle && <p className="text-danger">{errors.instagramHandle.message}</p>}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="row">
//                       <div className="col-12">
//                         <div className="doctor-submit text-end">
//                           <button
//                             type="submit"
//                             className="btn btn-primary submit-form me-2"
//                           >
//                             Submit
//                           </button>
//                           <button
//                             type="button"
//                             className="btn btn-primary cancel-form"
//                             onClick={() => {
//                               reset();
//                             }}
//                           >
//                             Cancel
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddClinic;



/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { DatePicker } from "antd";
import Select from "react-select";
import { Link } from 'react-router-dom';
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
const AddClinic = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([
    { value: 1, label: "Select City" },
    { value: 2, label: "Alaska" },
    { value: 3, label: "California" },
  ]);
  const [option, setOption] = useState([
    { value: 1, label: "Select Country" },
    { value: 2, label: "Usa" },
    { value: 3, label: "Uk" },
    { value: 4, label: "Italy" },
  ]);
  const [statevalue, setStateValue] = useState([
    { value: 1, label: "Select City" },
    { value: 2, label: "Alaska" },
    { value: 3, label: "California" },
  ]);

  const [department, setDepartment] = useState([
    { value: 1, label: "Orthopedics" },
    { value: 2, label: "Radiology" },
    { value: 3, label: "Dentist" },
  ]);

  const onChange = (date, dateString) => {
    // console.log(date, dateString);
    setIsClicked(true);
  };
  const loadFile = (event) => {
    // Handle file loading logic here
  };

  return (
    <div>
      <Header />
      <Sidebar id="menu-item3" id1="menu-items3" activeClassName="add-clinic" />
      <>
        <div className="page-wrapper">
          <div className="content">
            <div className="page-header">
              <div className="row">
                <div className="col-sm-12">
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="#">Clinics </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <i className="feather-chevron-right">
                        <FeatherIcon icon="chevron-right" />
                      </i>
                    </li>
                    <li className="breadcrumb-item active">Add Clinic</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <form>
                      <div className="row">
                        <div className="col-12">
                          <div className="form-heading">
                            <h4>Clinic Basic Information</h4>
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>
                              Clinic Name <span className="login-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"

                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>
                              Contact Number <span className="login-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="contactNumber"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>
                              Email Address <span className="login-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="email"
                              name="emailAddress"
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group local-forms">
                            <label>
                              Clinic Address <span className="login-danger">*</span>
                            </label>
                            <textarea
                              className="form-control"
                              name="clinicAddress"
                              rows={3}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>
                              Postal Code <span className="login-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="postalCode"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>
                              State <span className="login-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="postalCode"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>
                              City <span className="login-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="postalCode"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>
                            Website URL <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="websiteURL"
                            placeholder="www.example.com"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="form-heading">
                            <h4>Clinic Detailed Information</h4>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group local-forms">
                            <label>
                              Clinic Description <span className="login-danger">*</span>
                            </label>
                            <textarea
                              className="form-control"
                              name="clinicDescription"
                              rows={3}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>
                              Clinic Specialties <span className="login-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="servicesProvided"
                            />
                            {/* <Controller
                              name="clinicSpecialties"
                              control={control}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  isMulti
                                  options={specialties}
                                  placeholder=""
                                  menuPortalTarget={document.body}
                                  styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                  components={{ IndicatorSeparator: () => null }}
                                  // eslint-disable-next-line react/jsx-no-duplicate-props
                                  styles={{
                                    control: (baseStyles, state) => ({
                                      ...baseStyles,
                                      borderColor: state.isFocused ? 'none' : '2px solid rgba(46, 55, 164, 0.1);',
                                      boxShadow: state.isFocused ? '0 0 0 1px #2e37a4' : 'none',
                                      '&:hover': {
                                        borderColor: state.isFocused ? 'none' : '2px solid rgba(46, 55, 164, 0.1)',
                                      },
                                      borderRadius: '10px',
                                      fontSize: "14px",
                                      minHeight: "45px",
                                    }),
                                    dropdownIndicator: (base, state) => ({
                                      ...base,
                                      transform: state.selectProps.menuIsOpen ? 'rotate(-180deg)' : 'rotate(0)',
                                      transition: '250ms',
                                      width: '35px',
                                      height: '35px',
                                    }),
                                  }}
                                />
                              )}
                            /> */}
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>
                              Services Provided <span className="login-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="servicesProvided"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>
                              Operating Hours <span className="login-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="operatingHours"
                            />

                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>
                              Select Days <span className="login-danger">*</span>
                            </label>
                            {/* <Controller
                              name="selectedDays"
                              control={control}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  isMulti
                                  options={daysOptions}
                                  placeholder="Select Days"
                                  menuPortalTarget={document.body}
                                  styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                  components={{ IndicatorSeparator: () => null }}
                                  // eslint-disable-next-line react/jsx-no-duplicate-props
                                  styles={{
                                    control: (baseStyles, state) => ({
                                      ...baseStyles,
                                      borderColor: state.isFocused ? 'none' : '2px solid rgba(46, 55, 164, 0.1);',
                                      boxShadow: state.isFocused ? '0 0 0 1px #2e37a4' : 'none',
                                      '&:hover': {
                                        borderColor: state.isFocused ? 'none' : '2px solid rgba(46, 55, 164, 0.1)',
                                      },
                                      borderRadius: '10px',
                                      fontSize: "14px",
                                      minHeight: "45px",
                                    }),
                                    dropdownIndicator: (base, state) => ({
                                      ...base,
                                      transform: state.selectProps.menuIsOpen ? 'rotate(-180deg)' : 'rotate(0)',
                                      transition: '250ms',
                                      width: '35px',
                                      height: '35px',
                                    }),
                                  }}
                                />
                              )}
                            /> */}
                            <input
                              className="form-control"
                              type="text"
                              name="servicesProvided"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>
                              From <span className="login-danger">*</span>
                            </label>
                            <div className="">
                              {/* <TextField
                                className="form-control"
                                id="outlined-controlled"
                                type="time"
                                value={startTime}
                              /> */}
                              <input
                              className="form-control"
                              type="text"
                              name="servicesProvided"
                            />
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>
                              To <span className="login-danger">*</span>
                            </label>
                            <div className="">
                              {/* <TextField
                                className="form-control"
                                id="outlined-controlled"
                                type="time"
                                value={endTime}
                              /> */}
                              <input
                              className="form-control"
                              type="text"
                              name="servicesProvided"
                            />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="form-heading">
                            <h4>Staff Information</h4>
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>
                              Number of Doctors <span className="login-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              name="numberOfDoctors"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>
                              Number of Nurses <span className="login-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              name="numberOfNurses"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>
                              Number of Administrative Staff <span className="login-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              name="numberOfAdministrativeStaff"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="form-heading">
                            <h4>Additional Information</h4>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group local-forms">
                            <label>
                              Insurance Accepted <span className="login-danger">*</span>
                            </label>
                            <textarea
                              className="form-control"
                              name="insuranceAccepted"
                              rows={3}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>
                              Accreditations and Certifications <span className="login-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="accreditations"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>
                              Affiliations with Hospitals or Medical Networks <span className="login-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="affiliations"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="form-heading">
                            <h4>Administrative Details</h4>
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>
                              Registration Number <span className="login-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="registrationNumber"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>
                              License Number <span className="login-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="licenseNumber"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>
                              Date of Establishment <span className="login-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="date"
                              name="dateOfEstablishment"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="form-heading">
                            <h4>Contact Person</h4>
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>
                              Contact Person Name <span className="login-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="contactPersonName"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>
                              Contact Person Designation <span className="login-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="contactPersonDesignation"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>
                              Contact Person Phone Number <span className="login-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="contactPersonPhoneNumber"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>
                              Contact Person Email Address <span className="login-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="email"
                              name="contactPersonEmailAddress"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="form-heading">
                            <h4>Amenities</h4>
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>
                              Parking Availability <span className="login-danger">*</span>
                            </label>
                            <select
                              className="form-control"
                              name="parkingAvailability"
                            >
                              <option value="">Select</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>
                              Wheelchair Accessibility <span className="login-danger">*</span>
                            </label>
                            <select
                              className="form-control"
                              name="wheelchairAccessibility"
                            >
                              <option value="">Select</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="form-heading">
                            <h4>Social Media</h4>
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>
                              Facebook URL
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="facebookURL"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>
                              Twitter Handle
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="twitterHandle"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>
                              LinkedIn Profile
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="linkedInProfile"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-4">
                          <div className="form-group local-forms">
                            <label>
                              Instagram Handle
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="instagramHandle"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="doctor-submit text-end">
                            <button
                              type="submit"
                              className="btn btn-primary submit-form me-2"
                            >
                              Submit
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary cancel-form"
                              onClick={() => {
                                // reset();
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div >
  );
};

export default AddClinic;
