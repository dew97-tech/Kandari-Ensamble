export default function handler(req, res) {
   try {
      const videoSrc =
         "https://res.cloudinary.com/dgeheytdg/video/upload/f_auto:video,q_auto/v1/Maison%20Ensamble/MaisonEnsamble_Le%C3%A7on1_othoas";
      if (req.method === "GET") {
         // We can fetch the video source URL from your backend or database
         console.log("Fetching Video Source...");
         const responseObj = { src: videoSrc }; // Wrap the URL in an object
         res.status(200).json(responseObj); // Send the object as JSON response
         console.log("Returning Video Source as JSON..");
      } else {
         // Return an error message for unsupported HTTP methods
         console.error(`Unsupported HTTP method: ${req.method}`);
         res.status(405).json({ message: "Method not allowed" });
      }
   } catch (error) {
      // Return an error message for failed fetch requests
      console.error(error);
      res.status(500).json({ message: "Failed to fetch video source" });
   }
}
