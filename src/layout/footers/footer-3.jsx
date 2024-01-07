import Link from "next/link";
import React from "react";
import Image from "next/image";
// footer_three_content
const footer_three_content = [
   {
      id: 1,
      title: "About",
      cls: "col-xl-2",
      footer_col: "footer-3-col-1",
      links: [
         { name: "About Us", link: "/about" },
         { name: "Blog", link: "/blog" },
         { name: "Careers", link: "/" },
         { name: "Jobs", link: "/about" },
         { name: "In Press", link: "/" },
      ],
   },
   {
      id: 2,
      title: "Quick Links",
      cls: "col-xl-3",
      footer_col: "footer-3-col-2",
      links: [
         { name: "Refund Policy", link: "/about" },
         { name: "Documentation", link: "/about" },
         { name: "Chat online", link: "/contact" },
         { name: "Order Cancel", link: "/about" },
         { name: "Privacy Policy", link: "/" },
      ],
   },
   {
      id: 3,
      title: "Support",
      cls: "col-xl-3",
      footer_col: "footer-3-col-3",
      links: [
         { name: "Contact us", link: "/contact" },
         { name: "Online Chat", link: "/contact" },
         { name: "Whatsapp", link: "/contact" },
         { name: "Telegram", link: "/about" },
         { name: "Ticketing", link: "/" },
      ],
   },
   {
      id: 4,
      title: "FAQ",
      cls: "col-xl-2",
      footer_col: "footer-3-col-4",
      links: [
         { name: "Account", link: "/contact" },
         { name: "Deliveries", link: "/contact" },
         { name: "Orders", link: "/contact" },
         { name: "Payments", link: "/about" },
         { name: "Return", link: "/" },
      ],
   },
   {
      id: 5,
      title: "Products",
      cls: "col-xl-2",
      footer_col: "footer-3-col-5",
      links: [
         { name: "Overview", link: "/contact" },
         { name: "Business Account", link: "/contact" },
         { name: "Credit Card", link: "/contact" },
         { name: "Integrations", link: "/about" },
         { name: "Rewards", link: "/" },
      ],
   },
];

// social_links
const social_links = [
   {
      link: "http://facebook.com",
      target: "_blank",
      icon: "fab fa-facebook-f",
      name: "Facebook",
   },
   {
      link: "https://www.youtube.com/",
      target: "_blank",
      icon: "fab fa-youtube",
      name: "Youtube",
   },
   // {
   // 	link: 'https://www.basketball.com/',
   // 	target: '_blank',
   // 	icon: 'fa-light fa-basketball',
   // 	name: 'Instagram',
   // },

   {
      link: "http://whatsapp.com",
      target: "_blank",
      icon: "fa-brands fa-whatsapp",
      name: "Twitter",
   },
];

const FooterThree = () => {
   return (
      <>
         <footer>
            <div
               className='footer-bg theme-bg bg-bottom'
               style={{
                  backgroundImage: `url(/assets/img/bg/shape-bg-02.png)`,
               }}
            >
               {/* <div className="f-border pt-115 pb-165">
						<div className="container">
							<div className="row">
								{footer_three_content.map((item, i) => (
									<div key={i} className={`${item.cls} col-md-4  col-6`}>
										<div className={`footer-widget ${item.footer_col} mb-50`}>
											<div className="footer-widget__text mb-35">
												<h3 className="footer-widget__title">{item.title}</h3>
											</div>
											<div className="footer-widget__link">
												<ul>
													{item.links.map((link, i) => (
														<li key={i}>
															<a href="#">{link.name}</a>
														</li>
													))}
												</ul>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div> */}
               <div className='f-copyright'>
                  <div className='container'>
                     <div className='row d-flex align-items-center justify-content-center text-center text-lg-start py-3'>
                        <div className='col-xl-6 col-lg-5'>
                           <div className='f-copyright__text h1 text-center'>
                              <span style={{ fontSize: "20px" }}>
                                 Maison Ensemble © {new Date().getFullYear()} , All Rights Reserved
                              </span>
                           </div>
                        </div>
                        <div className='col-xl-3 col-lg-4'>
                           <div className='f-copyright__social-area text-lg-end'>
                              {social_links.map((item, i) => (
                                 <a key={i} href={item.link} target={item.target}>
                                    <i className={item.icon}></i>
                                 </a>
                              ))}
                              <br />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </footer>
      </>
   );
};

export default FooterThree;
