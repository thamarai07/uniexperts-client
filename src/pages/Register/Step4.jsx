import React, { useEffect, useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import { useHistory } from "react-router-dom";
import { tnc } from "apis/auth";
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Typography } from "@mui/material";
import { setLoader } from "store";
import { useDispatch } from "react-redux";


const Step4 = ({ data = {}, setData, nextStep }) => {
    const history = useHistory()
    const [isChecked, setIsChecked] = useState(false);
    const [tncData, setTncData] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        tnc().then((response) => {
            console.log("response: ", response?.records[0]?.Term_Condition__c);
            setTncData(response?.records[0]?.Term_Condition__c);
        })
    }, [])

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
                <div style={{ width: "922px", border: "2px solid gray", alignItems: "center", display: "flex", marginTop: "12px", padding: "15px" }} >

                    {tncData && <div dangerouslySetInnerHTML={{
                        __html: tncData
                    }} />}

                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

                    <div style={{ display: "flex" }} >
                        <Checkbox onChange={() => setIsChecked(!isChecked)} />
                        <p style={{ marginTop: "12px" }}>I have read and agree to the  <span style={{ color: "#2424ff" }}>Terms and Condition and the privacy and cookie policy*</span></p>
                    </div>

                    <div style={{ display: "flex", columnGap: "10px" }} >
                        <button

                            size='small'
                            style={{ backgroundColor: "#ededed", color: "#f37b21", textTransform: "none", borderRadius: "19px", width: "100px", border: "1px solid gray", paddingBlock: "8px", cursor: "pointer" }}
                            onClick={() => {
                                dispatch(setLoader(true));
                                setTimeout(() =>{
                                    dispatch(setLoader(false));
                                    history.push("/auth/login")
                                },1000)
                            }}
                        >
                            Sign
                        </button>
                        <button
                            disabled={isChecked}
                            size='small'
                            style={{ backgroundColor: "#ededed", textTransform: "none", borderRadius: "19px", width: "100px", border: "1px solid grey", color: isChecked ? "#f37b21" : "gray", paddingBlock: "8px", cursor: "pointer" }}
                            onClick={() => {
                                dispatch(setLoader(true));
                                setTimeout(() =>{
                                    dispatch(setLoader(false));
                                    history.push("/auth/login")
                                },1000)
                            }}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </> : <div style={{ width: "922px", display: "flex", justifyContent: "center", alignItems: "center",  }}> <CircularProgress /></div>}

        </div>
    );
};

export default Step4;
