import React from "react";

const ContactForm = () => {
   return (
      <>
         <div className='postbox__area pb-60 px-2'>
            <div className='container p-4 border-2 rounded-3'>
               <div className='postbox__wrapper pr-20'>
                  <div className='row'>
                     <div className='col-lg-6 col-md-12 col-12'>
                        <div className='contact-wrapper mr-65 mb-60'>
                           <div className='sub-contact-title'>
                              <h2 className='buff-text-color mb-30'>
                                 Talk To Us
                              </h2>
                           </div>
                           <div className='contact-form'>
                              <form
                                 id='contact-form'
                                 action='assets/mail.php'
                                 method='POST'
                              >
                                 <div className='row'>
                                    <div className='col-md-6'>
                                       <div className='contact-form-input mb-25'>
                                          <span>Name</span>
                                          <input
                                             type='name'
                                             placeholder='Your Name'
                                             name='name'
                                             required
                                          />
                                       </div>
                                    </div>
                                    <div className='col-md-6'>
                                       <div className='contact-form-input mb-25'>
                                          <span>Email Id</span>
                                          <input
                                             type='email'
                                             placeholder='Your Email'
                                             name='email'
                                             required
                                          />
                                       </div>
                                    </div>
                                    <div className='col-md-12'>
                                       <div className='contact-form-input mb-40'>
                                          <span>Comments</span>
                                          <textarea
                                             placeholder='Enter Your Message'
                                             name='message'
                                             required
                                          ></textarea>
                                       </div>
                                       <button
                                          className='tp-btn fs-5'
                                          type='submit'
                                       >
                                          Submit Now
                                       </button>
                                    </div>
                                 </div>
                              </form>
                              <p className='ajax-response'></p>
                           </div>
                        </div>
                     </div>
                     <div className='col-lg-6 col-md-12 col-12'>
                        <div className='contact-bg mb-60'>
                           <img
                              src='/assets/img/bg/contact-sub-bg-01.png'
                              alt='contact-bg'
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default ContactForm;
