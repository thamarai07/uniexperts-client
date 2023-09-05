import { borderRadius } from "@mui/system";
import React, { useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import { useHistory } from  "react-router-dom"


const Step4 = ({ data = {}, setData, nextStep }) => {
    const history = useHistory()
    return (
        <div>

            <div style={{ width: "922px", border: "2px solid gray", alignItems: "center", display: "flex", marginTop: "12px" }} >
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores sunt voluptatibus ab nam qui hic possimus dolore nisi delectus! Alias deserunt praesentium dolorem ea eius quibusdam iusto, corrupti officiis asperiores nulla sint aut et omnis tenetur optio itaque a! Tempore explicabo autem veniam, facere laborum consequuntur esse quaerat obcaecati repellat quod cum modi aspernatur hic? Expedita, sunt. Aliquam quis nam eveniet dignissimos voluptate odit laboriosam. Porro velit odio fugiat, delectus architecto qui placeat ipsam doloribus voluptatibus necessitatibus enim amet. Facere earum perferendis repudiandae officia amet voluptate deleniti voluptatibus, quos repellendus, incidunt cumque, accusantium iste. Inventore placeat qui perferendis vero sed! Ad totam officia autem debitis error nobis incidunt tempore vel placeat ratione, distinctio, quisquam natus animi aspernatur? Distinctio, perspiciatis. Rem, expedita? Quod similique soluta quis laudantium modi harum, voluptatem nesciunt dolore, omnis sapiente dolorem esse? Velit id incidunt recusandae iste, qui repudiandae similique doloribus eaque. Voluptatem, veritatis, repudiandae suscipit harum et quod maxime libero voluptatum eveniet molestiae quasi ratione. Esse assumenda magni perspiciatis nihil sapiente nisi illum sit excepturi sequi. Animi cupiditate odio dolor aperiam repellendus assumenda corporis quis nemo libero veritatis quidem ea pariatur iusto, magnam corrupti cum, enim accusamus esse fuga? Debitis, aliquam! Dignissimos quo in error repellendus maiores dolore, repellat architecto illo suscipit tenetur laboriosam quis laborum, similique aut, ratione numquam molestias optio rem aperiam eligendi adipisci? Culpa omnis nostrum quod suscipit ipsum ipsa est quos, debitis amet dolorum molestias iure autem cupiditate fugiat nulla eveniet porro, blanditiis delectus inventore commodi, sit voluptates! Nulla modi repudiandae aperiam.
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <Checkbox />
                <p style={{ marginTop: "12px" }}>I have read and agree to the  <span style={{ color: "#2424ff" }}>Terms and Condition and the privacy and cookie policy*</span></p>
                <button

                    size='small'
                    style={{ backgroundColor: "#ededed", color: "#f37b21", textTransform: "none", borderRadius: "19px", width: "100px", border: "1px solid gray", marginLeft: "50px", marginTop: "10px" }}
                    onClick={()=> history.push("/auth/login")}
                >
                    Sign
                </button>
                <button

                    size='small'
                    style={{ backgroundColor: "#ededed", color: "gray", textTransform: "none", borderRadius: "19px", width: "100px", border: "1px solid gray", marginLeft: "50px", marginTop: "10px" }}
                >
                    Submit
                </button>
            </div>


        </div>
    );
};

export default Step4;
