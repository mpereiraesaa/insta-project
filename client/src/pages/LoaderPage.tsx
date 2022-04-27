import React from "react";
import { motion } from "framer-motion";
import styles from '../styles/styles';
import BaseContainer from "../components/BaseContainer";

const loaderStyles: Record<string, React.CSSProperties> = {
  LoadingDot: {
    display: "block",
    width: "2rem",
    height: "2rem",
    backgroundColor: "white",
    borderRadius: "50%"
  },
  LoadingContainer: {
    width: "10rem",
    height: "5rem",
    display: "flex",
    justifyContent: "space-around"
  }
};

const ContainerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2
    }
  },
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const DotVariants = {
  initial: {
    y: "0%"
  },
  animate: {
    y: "100%"
  }
};

const DotTransition = {
  duration: 0.5,
  yoyo: Infinity,
  ease: "easeInOut"
};

export default function LoaderPage() {
  return (
    <BaseContainer>
      <header style={styles.container}>
        <div
          style={{
            paddingTop: "5rem",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <motion.div
            style={loaderStyles.LoadingContainer}
            variants={ContainerVariants}
            initial="initial"
            animate="animate"
          >
            <motion.span
              style={loaderStyles.LoadingDot}
              variants={DotVariants}
              transition={DotTransition}
            />
            <motion.span
              style={loaderStyles.LoadingDot}
              variants={DotVariants}
              transition={DotTransition}
            />
            <motion.span
              style={loaderStyles.LoadingDot}
              variants={DotVariants}
              transition={DotTransition}
            />
          </motion.div>
        </div>
      </header>
    </BaseContainer>
  );
}
