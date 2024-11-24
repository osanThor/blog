import Link from "next/link";
import Tooltip from "./Tooltip";
import GithubIcon from "./icons/GithubIcon";
import HomeIcon from "./icons/HomeIcon";
import MailIcon from "./icons/MailIcon";
import React from "react";

function SocialLinks({ pos = "bottom" }: { pos?: "top" | "bottom" }) {
  return (
    <ul className="flex items-center justify-center gap-2 z-10">
      <li className="text-lg relative group">
        <Link href={"https://www.given-log.com"} target="_blank">
          <HomeIcon />
          <Tooltip text={"Portfolio"} pos={pos} />
        </Link>
      </li>
      <li className="text-lg relative group">
        <Link href={"https://github.com/osanThor"} target="_blank">
          <GithubIcon />
          <Tooltip text={"Github"} pos={pos} />
        </Link>
      </li>
      <li className="text-lg relative group">
        <Link href={"mailto:jadw9715@gmail.com"} target="_blank">
          <MailIcon />
          <Tooltip text={"E-mail"} pos={pos} />
        </Link>
      </li>
    </ul>
  );
}
export default React.memo(SocialLinks);
