import style from "./About.module.css"
import WilmerMember from "../../assets/WilmerMember.jpeg"
import AndreaMember from "../../assets/AndreaMember.jpg"
import ChinaMember from "../../assets/ChinaMember.jpeg"
import ToretoMember from "../../assets/ToretoMember.jpeg"
import HectorMember from "../../assets/HectorMember.jpeg"
import { BsLinkedin, BsGithub, BsInstagram } from "react-icons/bs"

export const About = () => {
  const userMembers = [
    {
      name: "Wilmer Soto",
      image: WilmerMember,
      linkedin: "https://www.linkedin.com/in/wilmer-soto-73b360272/",
      ig: "#",
      github: "https://github.com/WilSotoA",
    },
    {
      name: "Andrea Laura",
      image: AndreaMember,
      linkedin: "https://www.linkedin.com/in/andrea-laura-99604a275/",
      ig: "#",
      github: "https://github.com/ALauraOliva",
    },
    {
      name: "Tomas Barolo",
      image: ToretoMember,
      linkedin: "https://www.linkedin.com/in/tom%C3%A1s-barolo-83918a276/",
      ig: "#",
      github: "https://github.com/tomasba19",
    },
    {
      name: "Hector Astudillo",
      image: HectorMember,
      linkedin:
        "https://www.linkedin.com/in/hector-eduardo-astudillo-garces-962738164/",
      ig: "#",
      github: "https://github.com/calvo2244",
    },
    {
      name: "Georgina Fregapane",
      image: ChinaMember,
      linkedin: "https://www.linkedin.com/in/g53086ab6/?trk=contact-info",
      ig: "#",
      github: "https://github.com/GRFregapane",
    },
  ]

  return (
    <main className={style.globalCont}>
      <h2>
        About us <hr />
      </h2>
      <div className={style.paragraph}>
        <p>
          Our goal is to create a comprehensive platform where consumers can
          explore and purchase items ranging from health-promoting foods to
          sustainable cleaning products. Beyond mere commercial transactions, we
          strive to foster a community that shares our values.{" "}
        </p>
      </div>
      <h2>
        Meet Us <hr />
      </h2>
      <div className={style.paragraph}>
        <p>
          Our philosophy is simple, hire a team of diverse, passionate people
          and foster a culture that empowers you to do your best work.
        </p>
      </div>

      <div className={style.flexCardsContainer}>
        {userMembers.map((member) => (
          <div className={style.cardContainer}>
            <img src={member.image} alt="photoMember" />
            <div className={style.info}>
              <h2>{member.name}</h2>
              <p>Full Stack Web Developer</p>
              <div className={style.links}>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BsLinkedin className={style.icon} />
                </a>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BsGithub className={style.icon} />
                </a>
                <a href={member.ig} target="_blank" rel="noopener noreferrer">
                  <BsInstagram className={style.icon} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
