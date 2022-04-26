import React from "react";

interface Props {
  caption: string;
  link: string;
}

export default function Button(props: Props) {
  const { caption, link } = props;
  return (
    <a style={styles.button} href={link}>{caption}</a>
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
