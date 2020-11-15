/* eslint-disable react/jsx-one-expression-per-line */
import { useState } from "react";
import PropTypes, { arrayOf, shape, string } from "prop-types";
import MdSubtitles from "@meronex/icons/md/MdSubtitles";
import MdFormatQuote from "@meronex/icons/md/MdFormatQuote";
import Typography from "../../atoms/Typography";
import ClassIcon from "../../atoms/Icons/ClassIcon";

import styles from "./styles.module.scss";

import ChangeBlock from "./ChangeBlock";
import Logo from "../../atoms/Logo";

const ChampionChange = (props) => {
  const { change, champion } = props;
  const [summary, setSummary] = useState("summary");
  const sanitazedChampion = champion.championName
    .replace(" ", "")
    .replace("'", "");

  return (
    <div className={styles["champion-change"]}>
      <div id={champion.championName} className="anchor" />
      <div className={styles["champion-change__header"]}>
        <img
          src={`https://f002.backblazeb2.com/file/cincopots/champions/${sanitazedChampion}.png`}
          alt={champion.championName}
        />
        <Logo className={styles["champion-change__logo"]} />
        <div>
          <Typography variant="h3" component="h4">
            {champion.championName}{" "}
            {champion.tags.map((tag) => (
              <ClassIcon key={`${champion.championName}-${tag}`} tag={tag} />
            ))}
          </Typography>
          <div className={styles["champion-change__header__context"]}>
            <div className={styles[`champion-change__header--${summary}`]}>
              <button type="button" onClick={() => setSummary("summary")}>
                <MdSubtitles />
              </button>
              <button type="button" onClick={() => setSummary("context")}>
                <MdFormatQuote />
              </button>
            </div>
            <Typography variant="p" component="p">
              {summary === "summary" ? change.resume : `“${change.context}”`}
            </Typography>
          </div>
        </div>
      </div>

      {/* Mapeia todas as mudanças habilidade por habilidade */}
      {change.changes.map((ability) => {
        const abilityKey = Object.keys(ability)[0];
        const abilityIcon =
          abilityKey !== "base" &&
          `https://f002.backblazeb2.com/file/cincopots/abilities/${sanitazedChampion}${abilityKey.toUpperCase()}.png`;
        return (
          <div
            key={`${champion.championName}-${abilityKey}`}
            className={styles["champion-change__change"]}
          >
            <div className={styles["champion-change__change__name"]}>
              {abilityIcon && <img src={abilityIcon} alt="ablt" />}
              {/* Nome da habilidade */}
              <Typography variant="h4" component="h5">
                {champion.abilities[abilityKey]
                  ? `${abilityKey} - ${champion.abilities[abilityKey]}`
                  : "Atributos Base"}
              </Typography>
            </div>
            {/* Bloco de mudança */}
            <div className={styles["champion-change__change__block"]}>
              {Object.values(ability)
                .flat()
                .map((block) => {
                  return (
                    <ChangeBlock
                      block={block}
                      champion={champion.championName}
                    />
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

ChampionChange.propTypes = {
  change: PropTypes.shape({
    name: PropTypes.string,
    resume: PropTypes.string,
    context: PropTypes.string,
    changes: PropTypes.arrayOf(),
  }).isRequired,
  champion: shape({
    abilities: shape({
      p: string.isRequired,
      q: string.isRequired,
      w: string.isRequired,
      e: string.isRequired,
      r: string.isRequired,
    }).isRequired,
    championName: string.isRequired,
    tags: arrayOf(string).isRequired,
    title: string.isRequired,
  }).isRequired,
};

export default ChampionChange;
