import React, { useEffect, useState } from "react";
import { PopupButton } from "react-calendly";

const PopupCalendly = ({ buttonText }) => {
   const [rootElement, setRootElement] = useState(null);

   useEffect(() => {
      setRootElement(document.getElementById("__next"));
   }, []);

   return (
      <div>
         {rootElement && (
            <PopupButton
               url='https://calendly.com/david-dew-mallick/30min'
               rootElement={rootElement}
               text={buttonText}
            />
         )}
      </div>
   );
};

export default PopupCalendly;
