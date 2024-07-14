#### Project Title
Next.js Content Moderation with NSFWJS in Next.js

#### Description
This project demonstrates the integration of NSFWJS, a powerful TensorFlow.js-based machine learning model, into a Next.js application for real-time NSFW (Not Safe For Work) content moderation. This application uses TailwindCSS for styling and provides a user interface to upload images, view classifications, and adjust sensitivity settings.

#### Features
- **Real-time NSFW Content Detection:** Automatically classify images uploaded by users.
- **Dynamic Threshold Adjustment:** Users can adjust the sensitivity of what is deemed NSFW.
- **Privacy-focused:** All processing is done client-side; images are not stored or sent to a server.
- **UI Elements:** TailwindCSS is used for a clean and responsive design.

#### How to Use
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/nsfw-moderation-app.git
   cd nsfw-moderation-app
   ```
   
2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run the Application:**
   ```bash
   npm run dev
   ```
   Navigate to `http://localhost:3000` to see the app in action.

#### How It Works
- **Image Upload:** Users can upload images via the interface.
- **Classification:** The NSFWJS model classifies the image based on predefined categories like 'Porn', 'Sexy', 'Neutral', 'Hentai', and 'Drawings'.
- **Threshold Slider:** Adjust the threshold to fine-tune what content should be flagged as NSFW.
- **Image Display:** Images that are flagged based on the user's threshold setting are blurred for safety.

#### Built With
- [Next.js](https://nextjs.org/) - The React framework used for server-side rendering.
- [TailwindCSS](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs.
- [NSFWJS](https://github.com/infinitered/nsfwjs) - A TensorFlow.js-powered model for client-side NSFW image classification.
- [React Hot Toast](https://react-hot-toast.com/) - For toast notifications.

#### Contributing
We welcome contributions from the community. If you wish to contribute to the project, please follow these steps:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

#### License
Distributed under the MIT License. See `LICENSE` for more information.

#### Acknowledgments
- Thanks to Gant Laborde and the Infinite Red team for developing NSFWJS.
- Special thanks to the contributors of TensorFlow.js for enabling ML models to run in the browser.
