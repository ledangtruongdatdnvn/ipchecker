import DeleteIcon from "@mui/icons-material/Delete";
import { Grid, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import ButtonTransparent from "../../components/ButtonTransparent";
import CustomTextField from "../../components/CustomTextField";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
function HomePage() {
  const [links, setLinks] = useState([]);

  const [selectedFiles, setSelectedFiles] = useState([]);

  const [value, setValue] = useState("");

  const [bLinks, setBLinks] = useState([]);

  const [bSelectedFiles, setBSelectedFiles] = useState([]);

  const [bValue, setBValue] = useState("");

  const [data, setData] = useState({});

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleBInputChange = (e) => {
    setBValue(e.target.value);
  };

  const handleAddLink = () => {
    if (value) {
      if (!links.includes(value)) {
        setLinks((links) => [...links, value]);
      } else {
        toast.info("Link already exists!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
        });
      }
      setValue("");
    }
  };

  const handleAddBLink = () => {
    if (bValue) {
      if (!bLinks.includes(bValue)) {
        setBLinks((bLinks) => [...bLinks, bValue]);
      } else {
        toast.info("Link already exists!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
        });
      }
      setBValue("");
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleBFileChange = (e) => {
    const files = Array.from(e.target.files);
    setBSelectedFiles(files);
  };

  const handleClickDelete = () => {
    console.log("Deleted!");
  };

  const handleSubmit = async () => {
    if (selectedFiles.length > 0 || links.length > 0) {
      const formData = new FormData();

      // Append files to the FormData
      for (const file of selectedFiles) {
        formData.append("files", file);
      }

      // Append input links to the FormData
      for (const link of links) {
        formData.append("links", link);
      }

      if (bSelectedFiles.length > 0 || bLinks.length > 0) {
        // Append files to the FormData
        for (const bFile of bSelectedFiles) {
          formData.append("bFiles", bFile);
        }

        // Append input links to the FormData
        for (const bLink of bLinks) {
          formData.append("bLinks", bLink);
        }
      }

      try {
        setLoading(true);
        // Replace with your API endpoint
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/test/submit-form`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        if (response.status == 200) {
          setSelectedFiles([]);
          setLinks([]);
          setBSelectedFiles([]);
          setBLinks([]);
          toast.success(response?.data?.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
          });

          setData(response);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    } else {
      toast.error("Please select at least one file or one link!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
    }
  };

  return (
    <Box p={2}>
      <Box
        component="div"
        className="main-border "
        sx={{
          background: "var(--main-bg-color)",
          boxShadow: "0px 0px 10px var(--main-bg-color)",
          borderRadius: "4px",
          padding: { xs: "32px 0px", sm: "32px 8px" },
        }}
      >
        <Box component="h3">Input</Box>
        <Box
          component="hr"
          style={{
            background: "var(--main-content-text-color)",
            height: "1px",
          }}
          mt={2}
          mb={5}
        ></Box>
        <Box component="h4" mb={3} textAlign="center">
          Description (please upload your document(s) or specify web page
          link(s) that have your product features or product description)
        </Box>
        <Grid container gap={3} justifyContent="center">
          <Grid item xs={5}>
            <input
              id="file-upload"
              type="file"
              multiple
              hidden
              onChange={handleFileChange}
              accept={".pdf"}
            />
            <ButtonTransparent style={{ height: "48px" }}>
              <label htmlFor="file-upload">Upload File</label>
            </ButtonTransparent>

            {selectedFiles.map((file, index) => (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mt={1}
                style={{
                  color: "var(--main-content-text-color)",
                  borderBottom: "1px solid var(--main-content-text-color)",
                }}
                key={index}
              >
                <Box component="div">{file.name}</Box>
                <IconButton onClick={handleClickDelete}>
                  <DeleteIcon
                    style={{ color: "var(--main-content-text-color)" }}
                  ></DeleteIcon>
                </IconButton>
              </Box>
            ))}
          </Grid>
          <Grid item xs={5}>
            <Box display="flex" gap="1rem">
              <CustomTextField
                id="link"
                label="Link"
                variant="standard"
                inputProps={{ maxLength: 500 }}
                style={{ minWidth: "25vw" }}
                value={value}
                onChange={handleInputChange}
              />
              <Box>
                <ButtonTransparent
                  onClick={handleAddLink}
                  style={{ height: "48px" }}
                >
                  Add Link
                </ButtonTransparent>
              </Box>
            </Box>
            {links.map((link, index) => (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mt={1}
                style={{
                  color: "var(--main-content-text-color)",
                  borderBottom: "1px solid var(--main-content-text-color)",
                }}
                key={index}
              >
                <Box
                  component="div"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {link}
                </Box>
                <IconButton onClick={handleClickDelete}>
                  <DeleteIcon
                    style={{ color: "var(--main-content-text-color)" }}
                  ></DeleteIcon>
                </IconButton>
              </Box>
            ))}
          </Grid>
        </Grid>
        <Box component="h4" mb={3} mt={3} textAlign="center">
          Background (Optional- please upload your document/pitch desk or
          specify web page links that have your product background and/or your
          mission statement)
        </Box>
        <Grid container gap={3} justifyContent="center">
          <Grid item xs={5}>
            <input
              id="b-file-upload"
              type="file"
              multiple
              hidden
              onChange={handleBFileChange}
              accept={".pdf"}
            />
            <ButtonTransparent style={{ height: "48px" }}>
              <label htmlFor="b-file-upload">Upload File</label>
            </ButtonTransparent>

            {bSelectedFiles.map((file, index) => (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mt={1}
                style={{
                  color: "var(--main-content-text-color)",
                  borderBottom: "1px solid var(--main-content-text-color)",
                }}
                key={index}
              >
                <Box component="div">{file.name}</Box>
                <IconButton onClick={handleClickDelete}>
                  <DeleteIcon
                    style={{ color: "var(--main-content-text-color)" }}
                  ></DeleteIcon>
                </IconButton>
              </Box>
            ))}
          </Grid>
          <Grid item xs={5}>
            <Box display="flex" gap="1rem">
              <CustomTextField
                id="link"
                label="Link"
                variant="standard"
                inputProps={{ maxLength: 500 }}
                style={{ minWidth: "25vw" }}
                value={bValue}
                onChange={handleBInputChange}
              />
              <Box>
                <ButtonTransparent
                  onClick={handleAddBLink}
                  style={{ height: "48px" }}
                >
                  Add Link
                </ButtonTransparent>
              </Box>
            </Box>
            {bLinks.map((link, index) => (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mt={1}
                style={{
                  color: "var(--main-content-text-color)",
                  borderBottom: "1px solid var(--main-content-text-color)",
                }}
                key={index}
              >
                <Box
                  component="div"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {link}
                </Box>
                <IconButton onClick={handleClickDelete}>
                  <DeleteIcon
                    style={{ color: "var(--main-content-text-color)" }}
                  ></DeleteIcon>
                </IconButton>
              </Box>
            ))}
          </Grid>
        </Grid>

        <Box
          component="hr"
          style={{
            background: "var(--main-content-text-color)",
            height: "1px",
          }}
          mt={5}
          mb={2}
        ></Box>
        <Box display="flex" justifyContent="center">
          <ButtonTransparent onClick={handleSubmit}>
            <Box component="div" display="flex" gap={1} alignItems="center">
              Submit {loading && <CircularProgress size={18} />}
            </Box>
          </ButtonTransparent>
        </Box>
      </Box>
      <Box
        component="div"
        className="main-border "
        mt={3}
        sx={{
          background: "var(--main-bg-color)",
          boxShadow: "0px 0px 10px var(--main-bg-color)",
          borderRadius: "4px",
          padding: { xs: "32px 0px", sm: "32px 8px" },
        }}
      >
        <Box component="h3">Output</Box>
        <Box
          component="hr"
          style={{
            background: "var(--main-content-text-color)",
            height: "1px",
          }}
          mt={2}
          mb={5}
        ></Box>
        <Box
          component="h4"
          mt={5}
          style={{ color: "var(--main-content-text-color)" }}
        >
          1) Given the provided background and the provided product features,
          create claims for potential patentable IP.
        </Box>
        <Box
          component="div"
          mt={2}
          style={{
            color: "var(--main-content-text-color)",
            whiteSpace: "pre-wrap",
            lineHeight: "1.5rem",
          }}
        >
          {data?.data?.data[0]}
        </Box>
        <Box
          component="h4"
          mt={5}
          style={{ color: "var(--main-content-text-color)" }}
        >
          2) From all the provided content, find all the trademark usages,
          suggest potential trademarks, and describe who trademark can project
          you and your company.
        </Box>
        <Box
          component="div"
          mt={2}
          style={{
            color: "var(--main-content-text-color)",
            whiteSpace: "pre-wrap",
            lineHeight: "1.5rem",
          }}
        >
          {data?.data?.data[1]}
        </Box>
        <Box
          component="h4"
          mt={5}
          style={{ color: "var(--main-content-text-color)" }}
        >
          3) Exam copyright usage on the website and in user submitted content,
          describe how copyrights can secure the content.
        </Box>
        <Box
          component="div"
          mt={2}
          style={{
            color: "var(--main-content-text-color)",
            whiteSpace: "pre-wrap",
            lineHeight: "1.5rem",
          }}
        >
          {data?.data?.data[2]}
        </Box>
        <Box
          component="h4"
          mt={5}
          style={{
            color: "var(--main-content-text-color)",
          }}
        >
          4) Define what trade secrets are and how they apply to the project,
          offer guidance on securing trade secrets.
        </Box>
        <Box
          component="div"
          mt={2}
          style={{
            color: "var(--main-content-text-color)",
            whiteSpace: "pre-wrap",
            lineHeight: "1.5rem",
          }}
        >
          {data?.data?.data[3]}
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;
