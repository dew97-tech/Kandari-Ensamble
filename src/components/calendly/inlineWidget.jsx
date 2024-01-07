import React from "react";
import { InlineWidget } from "react-calendly";
const InlineWidgetCalendly = () => {
   return (
      <div
         className='rounded shadow p-0 card-color'
         data-url='https://calendly.com/david-dew-mallick/30min'
         style={{ minWidth: 320, height: 700 }}
      >
         <InlineWidget
            url='https://calendly.com/david-dew-mallick/30min'
            styles={{ height: "700px", overflowY: "hidden", marginTop: "30px" }}
         />
      </div>
   );
};

export default InlineWidgetCalendly;
