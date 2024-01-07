import React from "react";
import { InlineWidget } from "react-calendly";
import InlineWidgetCalendly from "./inlineWidget";
import PopupCalendly from "./popup";

const Calendly = ({ url, showInline }) => {
   return (
      <>
         {showInline && <InlineWidgetCalendly url={url} />}
         {!showInline && <PopupCalendly />}
      </>
   );
};

export default Calendly;
