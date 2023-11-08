import DeleteIcon from "@mui/icons-material/Delete";
import { Grid, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import ButtonTransparent from "../../components/ButtonTransparent";
import CustomTextField from "../../components/CustomTextField";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import ButtonPrimary from "../../components/ButtonPrimary";
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
    e.target.value = "";
  };

  const handleBFileChange = (e) => {
    const files = Array.from(e.target.files);
    setBSelectedFiles(files);
    e.target.value = "";
  };

  const handleClickDeleteFile = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  const handleClickDeleteBLink = (index) => {
    const newBLinks = [...bLinks];
    newBLinks.splice(index, 1);
    setBLinks(newBLinks);
  };

  const handleClickDeleteLink = (index) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
  };

  const handleClickDeleteBFile = (index) => {
    const newFiles = [...bSelectedFiles];
    newFiles.splice(index, 1);
    setBSelectedFiles(newFiles);
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
        setData({});
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
    <Box pt={2}>
      <Box
        component="div"
        className="main-border"
        sx={{
          padding: { xs: "0.5rem 8px", sm: "0.5rem 8px" },
          backgroundColor: "#fff",
        }}
      >
        <Box
          component="h3"
          fontWeight={500}
          mb={3}
          color="var(--main-content-text-color)"
        >
          Input
        </Box>

        <Box
          component="div"
          mb={2}
          textAlign="left"
          color="var(--main-content-text-color)"
        >
          Description (please upload your document(s) or specify web page
          link(s) that have your product features or product description)
        </Box>
        <Grid container gap={3} justifyContent="start">
          <Grid item xs={5}>
            <input
              id="file-upload"
              type="file"
              multiple
              hidden
              onChange={handleFileChange}
              accept={".pdf"}
            />

            <ButtonTransparent
              sx={{ height: "40px" }}
              onClick={() => {
                document.getElementById("file-upload").click();
              }}
            >
              Upload Files
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
                  fontSize: "14px",
                }}
                key={index}
              >
                <Box component="div">{file.name}</Box>
                <IconButton onClick={() => handleClickDeleteFile(index)}>
                  <DeleteIcon
                    style={{
                      color: "#02A7D7",
                      fontSize: "20px",
                    }}
                  ></DeleteIcon>
                </IconButton>
              </Box>
            ))}
          </Grid>
          <Grid item xs={5}>
            <Box display="flex" gap="1rem">
              <CustomTextField
                id="link"
                variant="outlined"
                size="small"
                placeholder="Link"
                inputProps={{ maxLength: 500 }}
                style={{ minWidth: "25vw" }}
                value={value}
                onChange={handleInputChange}
              />

              <ButtonTransparent onClick={handleAddLink}>
                Add Links
              </ButtonTransparent>
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
                  fontSize: "14px",
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
                <IconButton onClick={() => handleClickDeleteLink(index)}>
                  <DeleteIcon
                    style={{
                      color: "#02A7D7",
                      fontSize: "20px",
                    }}
                  ></DeleteIcon>
                </IconButton>
              </Box>
            ))}
          </Grid>
        </Grid>
        <Box
          component="div"
          mb={2}
          mt={2}
          textAlign="left"
          color="var(--main-content-text-color)"
        >
          Background (optional- please upload your document/pitch desk or
          specify web page links that have your product background and/or your
          mission statement)
        </Box>
        <Grid container gap={3} justifyContent="start">
          <Grid item xs={5}>
            <input
              id="b-file-upload"
              type="file"
              multiple
              hidden
              onChange={handleBFileChange}
              accept={".pdf"}
            />

            <ButtonTransparent
              sx={{ height: "40px" }}
              onClick={() => {
                document.getElementById("b-file-upload").click();
              }}
            >
              Upload Files
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
                  fontSize: "14px",
                }}
                key={index}
              >
                <Box component="div">{file.name}</Box>
                <IconButton onClick={() => handleClickDeleteBFile(index)}>
                  <DeleteIcon
                    style={{
                      color: "#02A7D7",
                      fontSize: "20px",
                    }}
                  ></DeleteIcon>
                </IconButton>
              </Box>
            ))}
          </Grid>
          <Grid item xs={5}>
            <Box display="flex" gap="1rem">
              <CustomTextField
                id="link"
                variant="outlined"
                size="small"
                placeholder="Link"
                inputProps={{ maxLength: 500 }}
                style={{ minWidth: "25vw" }}
                value={bValue}
                onChange={handleBInputChange}
              />

              <ButtonTransparent onClick={handleAddBLink}>
                Add Links
              </ButtonTransparent>
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
                  fontSize: "14px",
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
                <IconButton onClick={() => handleClickDeleteBLink(index)}>
                  <DeleteIcon
                    style={{
                      color: "#02A7D7",
                      fontSize: "20px",
                    }}
                  ></DeleteIcon>
                </IconButton>
              </Box>
            ))}
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="center" mt={3}>
          <ButtonPrimary variant="contained" onClick={handleSubmit}>
            <Box component="div" display="flex" gap={1} alignItems="center">
              Submit{" "}
              {loading && (
                <CircularProgress
                  size={18}
                  sx={{ color: "var(--main-bg-color)" }}
                />
              )}
            </Box>
          </ButtonPrimary>
        </Box>
      </Box>

      <Box
        component="div"
        className="main-border"
        mt={2}
        sx={{
          padding: { xs: "0.5rem 8px", sm: "0.5rem 8px" },
          backgroundColor: "#fff",
        }}
      >
        <Box
          component="h3"
          fontWeight={500}
          color="var(--main-content-text-color)"
        >
          1. Potential Patentable Claims
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
      </Box>
      <Box
        component="div"
        className="main-border"
        mt={2}
        sx={{
          padding: { xs: "0.5rem 8px", sm: "0.5rem 8px" },
          backgroundColor: "#fff",
        }}
      >
        <Box
          component="h3"
          fontWeight={500}
          color="var(--main-content-text-color)"
        >
          2. Trademark usage and potential trademarks
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
      </Box>
      <Box
        component="div"
        className="main-border"
        mt={2}
        sx={{
          padding: { xs: "0.5rem 8px", sm: "0.5rem 8px" },
          backgroundColor: "#fff",
        }}
      >
        <Box
          component="h3"
          fontWeight={500}
          color="var(--main-content-text-color)"
        >
          3. Copyright usage
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
      </Box>
      <Box
        component="div"
        className="main-border"
        mt={2}
        sx={{
          padding: { xs: "0.5rem 8px", sm: "0.5rem 8px" },
          backgroundColor: "#fff",
        }}
      >
        <Box
          component="h3"
          fontWeight={500}
          color="var(--main-content-text-color)"
        >
          4. Trade secrets
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
