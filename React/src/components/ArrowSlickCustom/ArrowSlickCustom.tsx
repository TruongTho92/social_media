import React from "react";

export function PrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${props.styles.arrow} ${props.styles.prev}`}
      style={{
        ...style,
      }}
      onClick={onClick}
    >
      <i className={`far fa-chevron-left ${props.styles.arrowNextIcon}`}></i>
    </div>
  );
}

export function NextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${props.styles.arrow} ${props.styles.next}`}
      style={{
        ...style,
      }}
      onClick={onClick}
    >
      <i className={`far fa-chevron-right ${props.styles.arrowNextIcon}`}></i>
    </div>
  );
}
