# MedRelay

MedRelay is a full-stack web application designed to address a critical issue in the healthcare system: the secure and accurate sharing of patient information between healthcare providers during medical referrals and handoffs. Our goal is to improve patient outcomes by reducing miscommunication and ensuring that essential medical data is transferred seamlessly between facilities, especially in rural areas where such transfers are more common.

## Inspiration

According to a 2021 report by the American Medical Association's Council on Medical Service, inadequate systems for patient information sharing often force healthcare professionals to make uninformed decisions, leading to preventable negative health outcomes. This challenge is even more severe in rural areas, where access to specialists is limited, and patient transfers are more frequent.

## What it Does

MedRelay enables healthcare providers to securely share patient data during referrals and transfers. Key features include:
- Secure transfer of electronic health records (EHRs), lab reports, diagnostic results, and other critical medical data.
- Accurate processing of patient information to ensure that essential details are transferred without errors.
- Parsing patient files for vital information to prevent patient safety issues during handoffs by alerting the reciever of must know information about a patient before treatment

## Building Process

MedRelay is built as a full-stack application using:
- **Frontend**: React for building a user-friendly interface.
- **Backend**: Express.js for handling server-side operations.
- **Data Processing**: Python scripts utilized in the AWS Lambda service to handle patient information processing.
- **Cloud Storage**: AWS S3 buckets are used to securely store and transfer patient data between healthcare facilities.

## What's Next for MedRelay

There are several potential improvements for MedRelay:
1. **Expanded EHR Support**: Incorporating additional file types other than HL7 and document standards to ensure compatibility with small and rural medical institutions.
2. **Mobile Support**: Building a mobile application to allow healthcare professionals to access and update patient data on the go.
3. **Scalability**: Extending MedRelay's capabilities to create a standardized global platform for patient information sharing, with potential for a profitable service offering for hospitals worldwide.

## Installation and Running the Application

Clone the repository

```bash
git clone https://github.com/Adi-Goll/MedRelay.git
```
navigate to the project directory

```bash
cd MedRelay
```
install dependencies
```bash
npm install
```

start the vite app and the server:
```bash
node server/server.js & npm run dev
```

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
