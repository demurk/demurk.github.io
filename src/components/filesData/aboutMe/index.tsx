import { useTranslation } from "react-i18next";
import moment from "moment";

import { FileData, LocalFileData } from "types/global";

import "styles/files/aboutMe.scss";

export const FDAboutMe: FileData = {
  id: 1,
  icon: "txt_icon.png",
  name: "about_me.txt",
};

const FileComponent = () => {
  const { t } = useTranslation("files/about_me");

  const Experience = ({
    workDuration,
    companyName,
    position,
    project,
    tasks = [],
    skills = [],
  }: {
    workDuration: string;
    companyName: string;
    position: string;
    project?: string;
    tasks?: string[];
    skills?: string[];
  }) => {
    return (
      <>
        <div className="aboutme__exp-date">{workDuration}</div>
        <div className="aboutme__exp">
          <div className="aboutme__exp-title">{companyName}</div>
          <div>{position}</div>
          {project ? (
            <>
              <div className="aboutme__exp-header">{t("exp_header_label")}</div>
              <div className="aboutme__exp-header">{project}</div>
            </>
          ) : null}
          {tasks.length ? (
            <div>
              {t("exp_task_label")}:
              <ul>
                {tasks.map((task, i) => (
                  <li key={i}>{task}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {skills.length ? (
            <>
              <div className="aboutme__exp-header">{t("exp_skills_label")}</div>
              <div>{skills.join(", ")}</div>
            </>
          ) : null}
        </div>
      </>
    );
  };

  const PersonalData = ({
    header,
    value,
  }: {
    header: string;
    value: string;
  }) => {
    return (
      <div className="aboutme__pd">
        <p className="aboutme__pd-header">{header}</p>:
        <p className="aboutme__pd-value">{value}</p>
      </div>
    );
  };

  const myAge = () => {
    const bday = moment("2001-03-22");
    const today = moment();
    const diff = moment.duration(today.diff(bday));

    return Math.floor(diff.asYears());
  };

  return (
    <div className="aboutme">
      <div className="aboutme__content">
        <div className="aboutme__header">{t("name")}</div>
        <div>
          <div className="aboutme__pd-title">{t("location_section")}</div>
          <PersonalData header={t("loc_header")} value={t("loc_value")} />
          <PersonalData
            header={t("workformat_header")}
            value={t("workformat_value")}
          />
          <div className="aboutme__pd-title">{t("age_section")}</div>
          <PersonalData
            header={t("experience_header")}
            value={t("experience_value")}
          />
          <PersonalData
            header={t("age_header")}
            value={t("age", { value: myAge() })}
          />
          <PersonalData header={t("salary_header")} value={t("salary_value")} />
          <div className="aboutme__pd-title">{t("contact_section")}</div>
          <PersonalData header={t("phone_header")} value="+7(977)571-29-09" />
          <PersonalData header="Telegram" value="@DeMurk" />
          <PersonalData header="Email" value="sockspiderx@gmail.com" />
          <PersonalData header="GitHub" value="https://github.com/demurk" />
        </div>
        <div>
          <div className="aboutme__title">{t("skills_section")}</div>
          <div>
            Python • React • PostgreSQL • SQLalchemy • Redux • Flask • Django •
            HTML • Git • Linux
          </div>
        </div>
        <div>
          <div className="aboutme__title">{t("work_exp_section")}</div>
          <div className="aboutme__grid">
            <Experience
              workDuration={t("pp_work_dur")}
              companyName="ProjectPoint"
              position={t("pp_position")}
              project={t("pp_project")}
              tasks={t("pp_tasks_list", { returnObjects: true }) as []}
              skills={[
                "Python",
                "Pyramid",
                "PostgreSQL",
                "Redis",
                "React",
                "JavaScript",
                "Docker",
                "Git",
                "GitLab",
                "Sentry",
              ]}
            />
            <Experience
              workDuration={t("bj_work_dur")}
              companyName="BeeJee"
              position={t("bj_position")}
              project={t("bj_project")}
              tasks={t("bj_tasks_list", { returnObjects: true }) as []}
              skills={[
                "SQLalchemy",
                "Flask",
                "MySQL",
                "React",
                "Redux",
                "TeamCity",
                "Python",
                "Git",
              ]}
            />
            <Experience
              workDuration={t("pw_work_dur")}
              companyName={t("pw_company_name")}
              position={t("pw_position")}
              project={t("pw_project")}
              tasks={t("pw_tasks_list", { returnObjects: true }) as []}
              skills={[
                "React",
                "JavaScript",
                "HTML",
                "CSS",
                "SCSS",
                "Redux",
                "Next.js",
                "RESTful API",
              ]}
            />
            <Experience
              workDuration={t("fl_work_dur")}
              companyName={t("fl_company")}
              position={t("fl_position")}
              project={t("fl_project")}
              tasks={t("fl_tasks_list", { returnObjects: true }) as []}
              skills={[
                "React",
                "JavaScript",
                "HTML",
                "CSS",
                "SCSS",
                "Redux",
                "Next.js",
                "RESTful API",
              ]}
            />
          </div>
        </div>
        <div>
          <div className="aboutme__title">{t("education_section")}</div>
          <div className="aboutme__grid">
            <Experience
              workDuration={t("education_work_dur")}
              companyName={t("education_company_name")}
              position={t("education_position")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FileAboutData: { [x: number]: LocalFileData } = {
  [FDAboutMe.id]: { fileComponent: <FileComponent />, fileData: FDAboutMe },
};

export default FileAboutData;
