import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { AllEmailTemplateData } from "../interfaces";
import { EmailCard } from "../components/EmailCard";
import Navbar from "../components/Navbar";

const EmailTemplates: React.FC = () => {
  const [emailTemplates, setEmailTemplates] = useState<AllEmailTemplateData[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  console.log(emailTemplates);

  useEffect(() => {
    axios
      .get("http://localhost:3001/email-template/", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then((response) => {
        setLoading(false);
        setEmailTemplates(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching email templates:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <div className="p-3 mt-10">
        <div className="flex justify-center items-center p-5 m-3">
          <div className="text-3xl font-bold font-sans">Email Templates</div>
        </div>
        <div className="flex justify-center items-center ">
          <div className="p-4">
            {emailTemplates.map((template) => {
              return (
                <EmailCard title={template.et_title} slug={template.et_slug} />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailTemplates;
