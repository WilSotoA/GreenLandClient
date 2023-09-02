import style from "./About.module.css";
import maradona from "./extraAssets/Marado2.jpg";
import messi from "./extraAssets/Messi.jpg";
import kempes from "./extraAssets/Kempes.jpg";
import fangio from "./extraAssets/Fangio.jpg";
import reutemann from "./extraAssets/Reutemann.jpg";

export const About = () => {
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
      <section className={style.cards}>
        <picture className={style.card}>
          <img src={maradona} alt="Carta 1" />
        </picture>
        <picture className={style.card}>
          <img src={messi} alt="Carta 2" />
        </picture>
        <picture className={style.card}>
          <img src={kempes} alt="Carta 3" />
        </picture>
        <picture className={style.card}>
          <img src={fangio} alt="Carta 4" />
        </picture>
        <picture className={style.card}>
          <img src={reutemann} alt="Carta 5" />
        </picture>
      </section>
    </main>
  );
};
