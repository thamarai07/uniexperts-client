import React, { useEffect, useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import { useHistory } from "react-router-dom";
import { tnc } from "apis/auth";
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Typography } from "@mui/material";
import { setLoader } from "store";
import { useDispatch } from "react-redux";
import JsPDF from "jspdf";
import html2canvas from "html2canvas";
import Loader from "components/Loader";
import styles from './style.module.scss'
import agreementFile from "../../assets/agreement.pdf"
import gif from "../../assets/loader.gif"

const Step4 = ({ data = {}, setData, nextStep }) => {
    const history = useHistory()
    const [isChecked, setIsChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [tncData, setTncData] = useState("");
    const [ip, setIp] = useState("")
    // const dispatch = useDispatch();
    useEffect(() => {
        tnc().then((response) => {
            setTncData(`${response?.records[0]?.Term_Condition__c}`);
        })
        getIpAddress()
    }, [])

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            }, (error) => {
                console.error(error);
            });
        } else {
            console.error('Geolocation is not supported by your browser');
        }
    }, []);


    async function getIpAddress() {
        await fetch('https://api.ipify.org/?format=json')
            .then((response) => response.json())
            .then((data) => {
                setIp(data.ip)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    const handleSignUp = () => {
        setIsLoading(true)

        setTimeout(() => {
            history.push("/dashboard")
            setIsLoading(false)
        }, 5000);
    }

    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        const formattedTime = `${hours}:${minutes}:${seconds}`;

        return formattedTime;
    }

    const printDocument = async () => {
        // let iframe = document.createElement("iframe");
        // iframe.style.visibility = "hidden";
        // document.body.appendChild(iframe);
        // let iframedoc = iframe.contentDocument || iframe.contentWindow.document;
        // iframedoc.body.innerHTML = tncff

        // let canvas = await html2canvas(iframedoc.body, {});

        // // Convert the iframe into a PNG image using canvas.
        // let imgData = canvas.toDataURL("image/png");

        // // Create a PDF document and add the image as a page.
        // const doc = new JsPDF({
        //     format: "a4",
        //     unit: "mm",
        // });
        // doc.addImage(imgData, "PNG", 0, 0, 210, 297);


        // // Get the file as blob output.
        // let blob = doc.output("blob");

        // var csvURL = window.URL.createObjectURL(blob);
        // var tempLink = document.createElement('a');
        // tempLink.href = csvURL;
        // tempLink.setAttribute('download', 'Agreement.pdf');
        // tempLink.click();

        // // Remove the iframe from the document when the file is generated.
        // document.body.removeChild(iframe);

        const fileURL = agreementFile;

        const a = document.createElement('a');
        a.href = fileURL;
        a.download = agreementFile; // The name for the downloaded file
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);



    }

    // const location = window.navigator && window.navigator.geolocation

    if (isLoading) return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "16%" }} >
        <img
            src={gif}
            alt=''
            style={{
                height: "23%",
                width: "23%",
                objectFit: "contain",
                objectPosition: "center",
            }}
        />
    </div>

    return (
        <div>
            {tncData ? <>  <Box >
                <Typography fontSize='1.9rem' fontWeight={700}>
                    Agreement
                </Typography>
                <Typography fontSize='0.8rem' fontWeight={300} marginTop={2}>
                    Read terms and conditions
                </Typography>
            </Box>
                <div id="tnc" style={{ width: "922px", borderRadius: "10px", alignItems: "center", display: "flex", marginTop: "12px", padding: "15px", background: "#F5F5F5", }} >
                    {tncData && <div className={styles.scrollView} dangerouslySetInnerHTML={{
                        __html: tncData
                    }} />}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "20px" }}>

                    <div style={{ display: "flex" }} >
                        <Checkbox onChange={() => setIsChecked(!isChecked)} />
                        <p style={{ marginTop: "12px" }}>I have read and agree to the  <span style={{ color: "#2424ff" }}>Terms and Condition and the privacy and cookie policy*</span></p>
                    </div>

                    <div style={{ display: "flex", columnGap: "10px" }} >
                        <button
                            // disabled={isChecked}
                            size='small'
                            style={{ backgroundColor: "#F37B21", border: "0px", textTransform: "none", borderRadius: "99px", width: "100px", color: isChecked ? "#FFF" : "gray", paddingBlock: "8px", cursor: "pointer" }}
                            onClick={() => {
                                //console.log("clicked");
                                isChecked && handleSignUp()
                                isChecked && printDocument();
                                // dispatch(setLoader(true));
                                // setTimeout(() =>{
                                //     dispatch(setLoader(false));
                                //     history.push("/auth/login")
                                // },1000)
                            }}
                        >
                            Submit
                        </button>
                    </div>
                </div>

                {isChecked && <p style={{ fontSize: '12px', color: "#727272", marginTop: '6px', fontWeight: "400", marginLeft: '20px' }}>This agreement has been signed on {getCurrentTime()} at IP:  {ip}, Logitude: {longitude} , Latitude: {latitude}</p>}
            </> : <div style={{ width: "922px", display: "flex", justifyContent: "center", alignItems: "center", }}> <CircularProgress /></div>}

        </div>
    );
};

export default Step4;


const tncff = ` This Contractual Agreement is enacted with the primary objective of formalizing a collaborative partnership between Uniexperts and the Service Provider. The Service Provider shall function as an intermediary service facilitator, establishing a bridge between Uniexperts and Prospective Students across the global spectrum. The overarching purpose of this partnership is to enable Uniexperts to extend its outreach and establish connections with an extensive array of universities and educational institutions. It is to be noted that the Service Provider does not possess direct contractual affiliations with educational institutions on a global scale. By harnessing the intermediary capabilities of the Service Provider, Uniexperts aspires to amplify the scope and quality of its offerings. The ultimate goal is to enhance educational accessibility and opportunities on an international scale, thereby fostering mutually beneficial outcomes for the students, partner universities, the Service Provider, and Uniexperts.
ARTICLE 1. SCOPE OF SERVICES
1.1. Uniexperts
1.1.1. Application Processing
Uniexperts shall be responsible for the handling and processing of student applications for various universities and colleges, in accordance with all applicable laws, regulations, and agreed-upon procedures.
1.1.2. University and College Information
Uniexperts shall provide detailed and comprehensive information concerning partner universities and colleges, including but not limited to admission requirements, course offerings, and other relevant details as may be necessary or appropriate.
1.1.3. Online Portal
Uniexperts has developed and shall continue to maintain an online portal to facilitate the registration of students and streamline the application and enrolment process, in compliance with all applicable legal requirements.
1.1.4. Liaison with Partner Universities and Colleges:
Uniexperts shall serve as the primary point of contact and liaison between students and partner universities and colleges, ensuring effective communication, and addressing any queries or concerns in a timely and professional manner.
1.2. Service Provider
1.2.1. Student Information and Advice
Service Provider shall furnish students with accurate, current, and relevant information and advice concerning educational programs, course types, and related matters, in accordance with all applicable laws and regulations.
1.2.2. Application Assistance
Service Provider shall assist students in the application process, guiding them through the necessary steps, and providing support to ensure accurate and timely submissions, consistent with all relevant legal requirements and standards.
1.2.3. Pre-Departure Student Assistance
Service Provider shall offer guidance to students in their pre-departure preparations like visa requirements, health insurance, and other necessary arrangements, all in accordance with applicable laws, regulations, and policies.
1.2.4. Program Information
Service Provider shall provide detailed information about the various educational programs available, assisting students in making informed and lawful decisions regarding their academic pursuits.
1.2.5. Course Types
Service Provider shall provide students with information concerning different types of courses available, including but not limited to academic programs, vocational courses, professional certifications, and other relevant options, in compliance with all applicable legal standards and regulations.
ARTICLE 2. CONFIDENTIALITY
2.1. Definition of Confidential Information
The Parties recognize that during the term of this Agreement, either Party may come into possession of confidential information belonging to the other Party. Confidential information shall encompass, but not be limited to, student records, financial data, marketing strategies, technical know-how, trade secrets, and any other proprietary or sensitive information expressly related to this Agreement.
2.2. Confidentiality Obligations
The Parties covenant and agree to maintain the strictest confidentiality concerning any confidential information obtained from the other Party. Such information shall not be disclosed, used, or exploited for any purpose apart from the performance of obligations under this Agreement, without the express written consent of the disclosing Party.
2.3. Protection of Confidential Information
The Parties undertake to employ all reasonable measures to preserve the confidentiality and prevent any unauthorized disclosure or utilization of the confidential information. This shall include, but not be limited to, instituting appropriate security protocols, restricting access to confidential information solely to authorized personnel on a need-to-know basis, and exercising due care in managing and storing said information.`;