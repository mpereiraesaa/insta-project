import React, { PropsWithChildren } from "react";
import { motion } from "framer-motion";
import styles from "../styles/styles";

export default function BaseContainer(props: PropsWithChildren<{}>) {
  return (
    <motion.div
      style={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {props.children}
    </motion.div>    
  );
}
