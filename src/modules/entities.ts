import anime from "animejs";
import logger from "../components/logger";
import chars from "./chars";
import colors from "./colors";
import navigate from "./navigate";
import { Difficult } from "./features";
import { querySelector } from "../components/querySelector";

interface Entity extends HTMLDivElement {
  activeKey: string;
  isActive: boolean;
  tracker: anime.AnimeInstance;
}

const entities = {
  container: querySelector("#entities-container"),
  animeInstance: <anime.AnimeInstance>{},
  enable() {
    logger("Entities", "载入模块");
    // 生成字块
    this.animeInstance = anime({
      loop: true,
      duration: Difficult.target.SUMMON_SPEED,
      begin() {
        logger("Entities", "开始生成字块");
        logger(
          "Entities",
          `当前生成字块的速度为${Difficult.target.SUMMON_SPEED}毫秒`
        );
      },
      loopComplete: () => {
        // 超过20个字块则停止生成
        if (this.container.children.length >= 20) return;
        const spawner = this.spawn();

        navigate(spawner);
      },
    });
  },
  spawn() {
    const el = <Entity>document.createElement("div");
    const char = chars.random().toUpperCase();
    const color = colors.random();

    el.isActive = false;
    el.innerHTML = el.activeKey = char;
    el.classList.add(...color, "th-entity");
    this.container.appendChild(el);

    return el;
  },
  stop() {
    // 停止生成
    this.animeInstance.restart();
    this.animeInstance.pause();
    logger("Entities", "已停止生成字块");
  },
  clear() {
    // 清空字块
    this.container.innerHTML = "";
    logger("Entities", "已清空字块");
  },
  destroy() {
    this.stop();
    this.clear();
    logger("Entities", "模块销毁");
  },
};

export default entities;
export { Entity };
