import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import { EmailTemplateData } from "../interfaces";
import { toast } from "sonner";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export const EditEmailTemplate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [emailTemplate, setEmailTemplate] = useState<EmailTemplateData>();

  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const slug = queryParams.get("slug");

  const editedData = {
    subject,
    content,
  };
  function editedTemplateSuccess() {
    toast.success("Email Template Edited Successfully!");
  }

  useEffect(() => {
    axios
      .post(
        "http://localhost:3001/email-template/data",
        {
          slug: slug,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then((response) => {
        setLoading(false);
        setEmailTemplate(response.data.data);
        setSubject(response.data.data?.et_subject || "");
        setContent(response.data.data?.et_content || "");
      })
      .catch((error) => {
        console.log(error);
        throw new Error("Error in fetching Email Template Data");
      });
  }, []);

  const handleSubmit = async () => {
    const response = await axios.put(
      "http://localhost:3001/email-template/edit",
      {
        slug: slug,
        emailData: editedData,
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      }
    );
    if (response) {
      editedTemplateSuccess();
      navigate("../email-templates");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
    <Navbar/>
    <br></br>
    <br></br>
      <div className="flex justify-center items-center mt-5">
        <div className="p-5">
          <div className="flex justify-center items-center">
            <div className="text-3xl font-bold font-sans">Edit Template</div>
          </div>

          <div className="font-xl font-semibold mt-10 mb-5">
            <div className="text-xl">
              {emailTemplate?.et_title} Email Template
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Subject :
            </div>

            <div>
              <input
                onChange={(e) => setSubject(e.target.value)}
                value={subject}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:border-black"
              />
            </div>
          </div>
          <div className="mt-4 text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Content :
          </div>
          <div className="App mt-3">
            <CKEditor
              onChange={(event, editor) => {
                const data = editor.getData();
                setContent(data);
              }}
              editor={ClassicEditor}
              data={emailTemplate?.et_content}
            />
          </div>
          <div className="flex justify-between items-center">
            <Link
              className="border mt-4 border-black py-2 px-4 rounded  text-sm font-medium font-sans"
              to={"../email-templates"}
            >
              Back
            </Link>
            <button
              className="border mt-4 border-black py-2 px-4 rounded  text-sm font-medium font-sans bg-black text-white"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
