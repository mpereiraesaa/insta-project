import React, { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  caption: string;
  link: string;
}

export default function Button(props: Props) {
  const [isClicked, setIsClicked] = useState(false);
  const { caption, link } = props;
  const variants = {
    clicked: { backgroundColor: 'rgba(0,149,246,.5)' },
    notClicked: {},
  };
  return (
    <motion.a
      onMouseDown={() => setIsClicked(true)}
      onMouseUp={() => setIsClicked(false)}
      animate={isClicked ? 'clicked' : 'notClicked'}
      style={styles.button}
      href={link}
      variants={variants}
      initial={false}
    >
      {caption}
    </motion.a>
  );
}

const styles: Record<string, React.CSSProperties> = {
  button: {
    backgroundColor: '#0095f6',
    border: '1px solid transparent',
    padding: '12px 18px',
    borderRadius: '4px',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
  }
};
