// import React, { useState } from 'react';
// import { Table } from 'antd';
// import Admin_Header from '../Medscraft/Admin_Header';
// import Sidebar from '../Sidebar';
// import { plusicon, refreshicon, searchnormal } from '../imagepath';
// import { Link } from 'react-router-dom';
// import FeatherIcon from 'feather-icons-react';
// import { GET_CLINICS_URL } from '../../Util/const';
// import { useQuery } from '@tanstack/react-query';
// import { getClinicRequest } from '../../Util/fetchClinicUtil';

// const fetchClinics = async () => {
//     console.log('Fetching clinics from URL:', GET_CLINICS_URL);
//     const data = await getClinicRequest(GET_CLINICS_URL);
//     console.log('Fetched clinics data:', data);
//     return data.clinics;
// };

// const ClinicsList = () => {
//     const [selectedRowKeys, setSelectedRowKeys] = useState([]);

//     const { data: clinics = [], refetch, isFetching } = useQuery({
//         queryKey: ['clinics'],
//         queryFn: fetchClinics,
//         refetchInterval: false,  // Disable automatic refetching
//         refetchOnWindowFocus: false, // Disable refetching on window focus
//         cacheTime: Infinity, // Cache the query result indefinitely
//         staleTime: Infinity, // Prevent automatic re-fetching when the component mounts
//     });

//     const onSelectChange = newSelectedRowKeys => {
//         setSelectedRowKeys(newSelectedRowKeys);
//     };

//     const rowSelection = {
//         selectedRowKeys,
//         onChange: onSelectChange,
//     };

//     const columns = [
//         {
//             title: 'Clinic Logo',
//             dataIndex: 'clinicLogo',
//             render: (text, record) => (
//                 <img
//                     src={record.clinicLogo || 'default-logo.png'}
//                     alt="Clinic Logo"
//                     style={{ width: '50px', height: '50px', objectFit: 'cover' }}
//                     onError={(e) => { e.target.src = 'default-logo.png'; }}
//                 />
//             ),
//         },
//         {
//             title: 'Clinic Name',
//             dataIndex: 'clinicName',
//             render: (text, record) => <Link to="#">{record.clinicName}</Link>,
//             sorter: (a, b) => a.clinicName.length - b.clinicName.length,
//         },
//         {
//             title: 'Contact Number',
//             dataIndex: 'contactNumber',
//             render: (text, record) => <Link to="#">{record.contactNumber}</Link>,
//             sorter: (a, b) => a.contactNumber.length - b.contactNumber.length,
//         },
//         {
//             title: 'Email',
//             dataIndex: 'emailAddress',
//             sorter: (a, b) => a.emailAddress.length - b.emailAddress.length,
//         },
//         {
//             title: 'Website',
//             dataIndex: 'websiteURL',
//             sorter: (a, b) => a.websiteURL.length - b.websiteURL.length,
//         },
//         {
//             title: 'Specialties',
//             dataIndex: 'clinicSpecialties',
//             render: (specialties) => specialties.map(specialty => specialty.label).join(', '),
//             sorter: (a, b) => a.clinicSpecialties.length - b.clinicSpecialties.length,
//         },
//         {
//             title: 'Days of Operation',
//             dataIndex: 'selectedDays',
//             render: (days) => days.map(day => day.label).join(', '),
//             sorter: (a, b) => a.selectedDays.length - b.selectedDays.length,
//         },
//         {
//             title: 'Operating Hours',
//             dataIndex: 'operatingHours',
//             render: (text, record) => {
//                 if (Array.isArray(record.operatingHours)) {
//                     return record.operatingHours.map((hours, index) => (
//                         <div key={index}>{hours.startTime} - {hours.endTime}</div>
//                     ));
//                 }
//                 return `${record.startTime} - ${record.endTime}`;
//             },
//             sorter: (a, b) => a.startTime.length - b.startTime.length,
//         },
//         {
//             title: 'Parking',
//             dataIndex: 'parkingAvailability',
//             render: (text) => (text === 'Yes' ? 'Available' : 'Not Available'),
//             sorter: (a, b) => a.parkingAvailability.length - b.parkingAvailability.length,
//         },
//         {
//             title: 'Wheelchair Accessibility',
//             dataIndex: 'wheelchairAccessibility',
//             render: (text) => (text === 'Yes' ? 'Accessible' : 'Not Accessible'),
//             sorter: (a, b) => a.wheelchairAccessibility.length - b.wheelchairAccessibility.length,
//         },
//     ];

//     console.log('ClinicsList rendering. isFetching:', isFetching);

//     return (
//         <>
//             <Admin_Header />
//             <Sidebar id="menu-item3" id1="menu-items3" activeClassName="clinic-list" />
//             <div className="page-wrapper">
//                 <div className="content">
//                     <div className="page-header">
//                         <div className="row">
//                             <div className="col-sm-12">
//                                 <ul className="breadcrumb">
//                                     <li className="breadcrumb-item">
//                                         <Link to="#">Clinics</Link>
//                                     </li>
//                                     <li className="breadcrumb-item">
//                                         <FeatherIcon icon="chevron-right" />
//                                     </li>
//                                     <li className="breadcrumb-item active">Clinics List</li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="row">
//                         <div className="col-sm-12">
//                             <div className="card card-table show-entire">
//                                 <div className="card-body">
//                                     <div className="page-table-header mb-2">
//                                         <div className="row align-items-center">
//                                             <div className="col">
//                                                 <div className="clinic-table-blk">
//                                                     <h3>Clinics List</h3>
//                                                     <div className="clinic-search-blk">
//                                                         <div className="top-nav-search table-search-blk">
//                                                             <form>
//                                                                 <input
//                                                                     type="text"
//                                                                     className="form-control"
//                                                                     placeholder="Search here"
//                                                                 />
//                                                                 <Link className="btn">
//                                                                     <img src={searchnormal} alt="#" />
//                                                                 </Link>
//                                                             </form>
//                                                         </div>
//                                                         <div className="add-group">
//                                                             <Link to="/add-clinic" className="btn btn-primary add-pluss ms-2">
//                                                                 <img src={plusicon} alt="#" />
//                                                             </Link>
//                                                             <Link to="#" className="btn btn-primary clinic-refresh ms-2" onClick={refetch}>
//                                                                 <img src={refreshicon} alt="#" />
//                                                             </Link>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="table-responsive clinic-list">
//                                         <Table
//                                             pagination={{
//                                                 total: clinics.length,
//                                                 showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
//                                             }}
//                                             columns={columns}
//                                             dataSource={clinics}
//                                             rowSelection={rowSelection}
//                                             rowKey={record => record._id}
//                                             style={{
//                                                 backgroundColor: '#f2f2f2',
//                                             }}
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default ClinicsList;



/* eslint-disable no-unused-vars */
import React from 'react'
import {  pagination,Table } from "antd";
import {onShowSizeChange,itemRender}from  '../Pagination'
import Header from '../Header';
import Sidebar from '../Sidebar';
import { blogimg10, imagesend, pdficon, pdficon3, pdficon4, plusicon, refreshicon, searchnormal, blogimg12,
     blogimg2, blogimg4, blogimg6, blogimg8} from '../imagepath';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';

const CLinicList = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [datasource, setDatasource] = useState([]);

    useEffect(() => {
      fetch('http://localhost:5000/api/clinics')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setDatasource(data);
          }
        })
        .catch(err => console.error("Error fetching clinics:", err));
    }, []);

    const onSelectChange = (newSelectedRowKeys) => {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
      };
      const onChange = (date, dateString) => {
        // console.log(date, dateString);
      };

    const columns = [
        {
            title: "Name",
            dataIndex: "Name",
            render: (text, record) => (
                <>
                    <h2 className="profile-image">
                        <Link to="#" className="avatar avatar-sm me-2">
                            <img
                                className="avatar-img rounded-circle"
                                src={record.Img}
                                alt="User Image"
                            />
                        </Link>
                        <Link to="#">{record.Name}</Link>
                    </h2>

                </>
            ),
            sorter: (a, b) => a.Name.length - b.Name.length
        },
        {
            title:"Department",
            dataIndex: "Department",
                sorter: (a, b) => a.Department.length - b.Department.length
        },
        {
            title:"Specialization",
            dataIndex: "Specialization",
                sorter: (a, b) => a.Specialization.length - b.Specialization.length
        },
        {
            title:"Degree",
            dataIndex: "Degree",
                sorter: (a, b) => a.Degree.length - b.Degree.length
        },
        {
            title:"Mobile",
            dataIndex: "Mobile",
                sorter: (a, b) => a.Mobile.length - b.Mobile.length,
                render: (text, record) => (
                    <>

                            <Link to="#">{record.Mobile}</Link>

                    </>
                )
        }, {
            title:"Email",
            dataIndex: "Email",
                sorter: (a, b) => a.Email.length - b.Email.length
        }, {
            title:"JoiningDate",
            dataIndex: "JoiningDate",
                sorter: (a, b) => a.JoiningDate.length - b.JoiningDate.length
        },
        {
          title: "",
          dataIndex: "FIELD8",
          render: (text, record) => (
            <>
              <div className="text-end">
                <div className="dropdown dropdown-action">
                  <Link
                    to="#"
                    className="action-icon dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fas fa-ellipsis-v" />
                  </Link>
                  <div className="dropdown-menu dropdown-menu-end">
                    <Link className="dropdown-item" to="/editclinic">
                      <i className="far fa-edit me-2" />
                      Edit
                    </Link>
                    <Link className="dropdown-item" to="#" data-bs-toggle="modal" data-bs-target="#delete_patient">
                       <i className="fa fa-trash-alt m-r-5"></i> Delete</Link>
                  </div>
                </div>
              </div>
            </>
          ),
        },
    ]


  return (
    <>
    <Header />
    <Sidebar id='menu-item3' id1='menu-items3' activeClassName='clinic-list'/>
    <>
  <div className="page-wrapper">
    <div className="content">
      {/* Page Header */}
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="#">Clinic </Link>
            </li>
              <li className="breadcrumb-item">
                <i className="feather-chevron-right">
                  <FeatherIcon icon="chevron-right" />
                  </i>
              </li>
              <li className="breadcrumb-item active">Clinic List</li>
            </ul>
          </div>
        </div>
      </div>
      {/* /Page Header */}
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table show-entire">
            <div className="card-body">
              {/* Table Header */}
              <div className="page-table-header mb-2">
                <div className="row align-items-center">
                  <div className="col">
                    <div className="doctor-table-blk">
                      <h3>Clinic List</h3>
                      <div className="doctor-search-blk">
                        <div className="top-nav-search table-search-blk">
                          <form>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search here"
                            />
                            <Link className="btn">
                              <img
                                src={searchnormal}
                                alt="#"
                              />
                            </Link>
                          </form>
                        </div>
                        <div className="add-group">
                          <Link
                            to="/add-clinic"
                            className="btn btn-primary add-pluss ms-2"
                          >
                            <img src={plusicon} alt="#" />
                          </Link>
                          <Link
                            to="#"
                            className="btn btn-primary doctor-refresh ms-2"
                          >
                            <img src={refreshicon} alt="#" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-auto text-end float-end ms-auto download-grp">
                    <Link to="#" className=" me-2">
                      <img src={pdficon} alt="#" />
                    </Link>
                    <Link to="#" className=" me-2">
                    </Link>
                    <Link to="#" className=" me-2">
                      <img src={pdficon3} alt="#" />
                    </Link>
                    <Link to="#">
                      <img src={pdficon4} alt="#" />
                    </Link>
                  </div>
                </div>
              </div>
              {/* /Table Header */}
              <div className="table-responsive doctor-list">
              <Table
                        pagination={{
                          total: datasource.length,
                          showTotal: (total, range) =>
                          `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          // showSizeChanger: true,
                           onShowSizeChange: onShowSizeChange,
                           itemRender: itemRender,
                        }}
                        columns={columns}
                        dataSource={datasource}

                        rowSelection={rowSelection}
                        rowKey={(record) => record.id}
                        style={{
                          backgroundColor: '#f2f2f2', // Replace with your desired background color for the table
                        }}
                      />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="notification-box">
      <div className="msg-sidebar notifications msg-noti">
        <div className="topnav-dropdown-header">
          <span>Messages</span>
        </div>
        <div className="drop-scroll msg-list-scroll" id="msg_list">
          <ul className="list-box">
            <li>
              <Link to="#">
                <div className="list-item">
                  <div className="list-left">
                    <span className="avatar">R</span>
                  </div>
                  <div className="list-body">
                    <span className="message-author">Richard Miles </span>
                    <span className="message-time">12:28 AM</span>
                    <div className="clearfix" />
                    <span className="message-content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </span>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="#">
                <div className="list-item new-message">
                  <div className="list-left">
                    <span className="avatar">J</span>
                  </div>
                  <div className="list-body">
                    <span className="message-author">John Doe</span>
                    <span className="message-time">1 Aug</span>
                    <div className="clearfix" />
                    <span className="message-content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </span>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="#">
                <div className="list-item">
                  <div className="list-left">
                    <span className="avatar">T</span>
                  </div>
                  <div className="list-body">
                    <span className="message-author"> Tarah Shropshire </span>
                    <span className="message-time">12:28 AM</span>
                    <div className="clearfix" />
                    <span className="message-content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </span>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="#">
                <div className="list-item">
                  <div className="list-left">
                    <span className="avatar">M</span>
                  </div>
                  <div className="list-body">
                    <span className="message-author">Mike Litorus</span>
                    <span className="message-time">12:28 AM</span>
                    <div className="clearfix" />
                    <span className="message-content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </span>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="#">
                <div className="list-item">
                  <div className="list-left">
                    <span className="avatar">C</span>
                  </div>
                  <div className="list-body">
                    <span className="message-author"> Catherine Manseau </span>
                    <span className="message-time">12:28 AM</span>
                    <div className="clearfix" />
                    <span className="message-content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </span>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="#">
                <div className="list-item">
                  <div className="list-left">
                    <span className="avatar">D</span>
                  </div>
                  <div className="list-body">
                    <span className="message-author"> Domenic Houston </span>
                    <span className="message-time">12:28 AM</span>
                    <div className="clearfix" />
                    <span className="message-content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </span>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="#">
                <div className="list-item">
                  <div className="list-left">
                    <span className="avatar">B</span>
                  </div>
                  <div className="list-body">
                    <span className="message-author"> Buster Wigton </span>
                    <span className="message-time">12:28 AM</span>
                    <div className="clearfix" />
                    <span className="message-content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </span>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="#">
                <div className="list-item">
                  <div className="list-left">
                    <span className="avatar">R</span>
                  </div>
                  <div className="list-body">
                    <span className="message-author"> Rolland Webber </span>
                    <span className="message-time">12:28 AM</span>
                    <div className="clearfix" />
                    <span className="message-content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </span>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="#">
                <div className="list-item">
                  <div className="list-left">
                    <span className="avatar">C</span>
                  </div>
                  <div className="list-body">
                    <span className="message-author"> Claire Mapes </span>
                    <span className="message-time">12:28 AM</span>
                    <div className="clearfix" />
                    <span className="message-content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </span>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="#">
                <div className="list-item">
                  <div className="list-left">
                    <span className="avatar">M</span>
                  </div>
                  <div className="list-body">
                    <span className="message-author">Melita Faucher</span>
                    <span className="message-time">12:28 AM</span>
                    <div className="clearfix" />
                    <span className="message-content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </span>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="#">
                <div className="list-item">
                  <div className="list-left">
                    <span className="avatar">J</span>
                  </div>
                  <div className="list-body">
                    <span className="message-author">Jeffery Lalor</span>
                    <span className="message-time">12:28 AM</span>
                    <div className="clearfix" />
                    <span className="message-content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </span>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="#">
                <div className="list-item">
                  <div className="list-left">
                    <span className="avatar">L</span>
                  </div>
                  <div className="list-body">
                    <span className="message-author">Loren Gatlin</span>
                    <span className="message-time">12:28 AM</span>
                    <div className="clearfix" />
                    <span className="message-content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </span>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="#">
                <div className="list-item">
                  <div className="list-left">
                    <span className="avatar">T</span>
                  </div>
                  <div className="list-body">
                    <span className="message-author">Tarah Shropshire</span>
                    <span className="message-time">12:28 AM</span>
                    <div className="clearfix" />
                    <span className="message-content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="topnav-dropdown-footer">
          <Link to="#">See all messages</Link>
        </div>
      </div>
    </div>
  </div>
  <div id="delete_patient" className="modal fade delete-modal" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-body text-center">
          <img src={imagesend} alt="#" width={50} height={46} />
          <h3>Are you sure want to delete this ?</h3>
          <div className="m-t-20">
            {" "}
            <Link to="#" className="btn btn-white me-2" data-bs-dismiss="modal">
              Close
            </Link>
            <button type="submit" className="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <div id="delete_patient" className="modal fade delete-modal" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-body text-center">
          <img src={imagesend} alt="#" width={50} height={46} />
          <h3>Are you sure want to delete this ?</h3>
          <div className="m-t-20">
            {" "}
            <Link to="#" className="btn btn-white me-2" data-bs-dismiss="modal">
              Close
            </Link>
            <button type="submit" className="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</>
</>
  )
}

export default CLinicList;