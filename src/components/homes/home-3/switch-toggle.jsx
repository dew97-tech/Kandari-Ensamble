import React from "react";
import Switch from "react-switch";

const SwitchToggle = ({ selectedDuration, handleDurationChange }) => {
   return (
      <>
         <Switch
            checked={selectedDuration === "individual"}
            onChange={() => handleDurationChange(selectedDuration === "individual" ? "school" : "individual")}
            offColor='#9cb8bb'
            onColor='#ecba82'
            // boxShadow="5px 5px 10px rgba(0, 0, 0, 0.6)"
            uncheckedHandleIcon={
               <div
                  style={{
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                     height: "100%",
                     color: "#2f4f4f",
                     fontSize: 18,
                  }}
               >
                  <b>Individual</b>
               </div>
            }
            checkedHandleIcon={
               <div
                  style={{
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                     height: "100%",
                     color: "#2f4f4f",
                     fontSize: 18,
                  }}
               >
                  <b>School</b>
               </div>
            }
            uncheckedIcon={
               <div
                  style={{
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                     height: "100%",
                     fontSize: 25,
                     color: "#2f4f4f",
                     paddingRight: 10,
                  }}
               >
                  <b>School</b>
               </div>
            }
            checkedIcon={
               <div
                  style={{
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                     height: "100%",
                     fontSize: 25,
                     color: "#2f4f4f",
                     paddingLeft: 30,
                  }}
               >
                  <b>Individual</b>
               </div>
            }
            width={250}
            height={90}
            handleDiameter={100}
            translate='10px, 10px'
         />
      </>
   );
};

export default SwitchToggle;
