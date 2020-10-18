/* eslint-disable react/jsx-one-expression-per-line */
import { useState, useEffect } from "react";
import clsx from "clsx";

import MdKeyboardArrowUp from "@meronex/icons/md/MdKeyboardArrowUp";
import MdKeyboardArrowDown from "@meronex/icons/md/MdKeyboardArrowDown";
import MdLens from "@meronex/icons/md/MdLens";

import PropTypes from "prop-types";

import Typography from "../../atoms/Typography";

import hardCodedSkins from "./hardCodedSkins";

import styles from "./styles.module.scss";

const SkinSlideshow = () => {
  // eslint-disable-next-line no-unused-vars
  const [skins, setSkin] = useState(hardCodedSkins);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateValue, setTranslateValue] = useState(0);

  // Atualiza os bullet points quando mudar o estado
  useEffect(() => {
    if (window.innerWidth > 900) {
      const bullets = document.querySelectorAll(".bullet");
      const arrowUp = document.querySelector("#skin-slideshow__arrow-up");
      const arrowDown = document.querySelector("#skin-slideshow__arrow-down");

      bullets.forEach((bullet) => {
        // eslint-disable-next-line no-param-reassign
        bullet.style.opacity = 0.3;
      });
      bullets[currentIndex].style.opacity = 1;

      if (currentIndex === 0) {
        arrowUp.style.opacity = 0.3;
        arrowDown.style.opacity = 1;
      } else if (currentIndex === skins.length - 1) {
        arrowDown.style.opacity = 0.3;
      } else {
        arrowUp.style.opacity = 1;
        arrowDown.style.opacity = 1;
      }
    }
  });

  // Estilo pra fazer o translate da transição
  const wrapperStyles = {
    transform: `translateY(${translateValue}rem)`,
  };

  // Calcula o tanto que tem que andar
  const slideHeight = () => {
    return 40; // 40rem
  };

  // Muda para o slide anterior se não estiver no primeiro
  const goToPrevSlide = () => {
    if (currentIndex === 0) return;

    setCurrentIndex(currentIndex - 1);
    setTranslateValue(translateValue + slideHeight());
  };

  // Anda com o slider
  const goToNextSlide = () => {
    if (currentIndex === skins.length - 1) {
      // Descomentar se eu quiser continuar indo pra frente no futuro
      // setCurrentIndex(0);
      // setTranslateValue(0);
      return;
    }

    setCurrentIndex(currentIndex + 1);
    setTranslateValue(translateValue - slideHeight());
  };

  // Renderiza cada slide único do slideshow
  const renderSkins = () => {
    const slides = skins.map((skin) => {
      return (
        <Slide key={skin.name} image={skin.image} position={skin.position} />
      );
    });

    return slides;
  };

  // Renderiza os pontinhos do controle
  const renderBulletPoints = () => {
    const bullets = skins.map((skin, i) => {
      return (
        <MdLens
          key={`skin-bullet-${skin.name}`}
          id={`skin-bullet-${i}`}
          className={clsx(styles["skin-slideshow__controls__bullet"], "bullet")}
        />
      );
    });

    return bullets;
  };

  return (
    <div className="skins-sidebar">
      <Typography className={styles.sidebar__title} component="h4" variant="h4">
        Novas skins no PBE
      </Typography>
      <div className={styles["skin-slideshow__general-container"]}>
        <div className={styles["skin-slideshow"]}>
          <div
            style={wrapperStyles}
            className={styles["skin-slideshow__wrapper"]}
          >
            {renderSkins()}
          </div>
          <div className={styles["skin-slideshow__details"]}>
            <Typography component="p" variant="p">
              <span className={styles["skin-slideshow__details__title"]}>
                {skins[currentIndex].name}
              </span>
              <span className={styles["skin-slideshow__details__tier"]}>
                Skin {skins[currentIndex].tier} -{" "}
              </span>
              {skins[currentIndex].price}
              <img
                alt={skins[currentIndex].name}
                className={styles["skin-slideshow__details__currency"]}
                src={skins[currentIndex].currency}
              />
            </Typography>
          </div>
        </div>
        <div className={styles["skin-slideshow__controls"]}>
          <MdKeyboardArrowUp
            id="skin-slideshow__arrow-up"
            className={styles["skin-slideshow__controls__arrow"]}
            onClick={goToPrevSlide}
          />
          {renderBulletPoints()}
          <MdKeyboardArrowDown
            id="skin-slideshow__arrow-down"
            className={styles["skin-slideshow__controls__arrow"]}
            onClick={goToNextSlide}
          />
        </div>
      </div>
    </div>
  );
};

// Componente de helper pra fazer o Slide individual
const Slide = ({ image, position }) => {
  const inlineStyles = {
    backgroundImage: `url(${image})`,
    backgroundPosition: position,
  };
  return (
    <div style={inlineStyles} className={styles["skin-slideshow__slide"]} />
  );
};

Slide.propTypes = {
  // Link da imagem
  image: PropTypes.string.isRequired,
  // Aonde é o ponto focal da splash
  position: PropTypes.string.isRequired,
};

export default SkinSlideshow;
