import React from "react";

export function NextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${props.styleArrow} ${props.styleNext}`}
      style={{
        ...style,
      }}
      onClick={onClick}
    >
      <i className={`far fa-chevron-right ${props.styleIcon}`}></i>
    </div>
  );
}
export function PrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${props.styleArrow} ${props.stylePrev}`}
      style={{
        ...style,
      }}
      onClick={onClick}
    >
      <i className={`far fa-chevron-left ${props.styleIcon}`}></i>
    </div>
  );
}
