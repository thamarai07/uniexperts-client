import * as React from "react";
import Button from "@mui/joy/Button";
import { styled } from "@mui/joy";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

const FileUploadCard = ({ selectedFile, setSelectedFile, label }) => {

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    return (
        <div style={{ display: "flex", columnGap: "20px", alignItems: "center", marginBottom: "20px" }}>
            <div
                style={{
                    fontSize: "13px",
                    fontWeight: "700",
                    width: "16vw",
                }}
            >
                {label}
            </div>

            <div
                style={{
                    paddingInline: "20px",
                    backgroundColor: "white",
                    border: "1px solid #14213D66",
                    borderRadius: "4px",
                    width: "60vw",
                    color: "#979797",
                    fontWeight: "400",
                    height: "40px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <div>{selectedFile?.name}</div>
                {selectedFile && <img
                    style={{
                        height: "20px"
                    }}
                    src="https://cdn-icons-png.flaticon.com/128/4436/4436481.png"
                    alt=""
                />}
            </div>

            <Button
                component="label"
                role={undefined}
                tabIndex={-1}
                variant="outlined"
                color="neutral"
                style={{
                    borderColor: "#F37B21",
                    color: "#F37B21",
                    borderRadius: "4px",
                    width: "7vw"
                }}
            >
                {selectedFile ? "Re-Upload" : "Upload"}
                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
        </div>
    );
}


export default FileUploadCard
