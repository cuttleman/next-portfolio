import React from "react";
import styled from "styled-components";

const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f5f6fa;
  box-shadow: 1px 2px 3px 1.5px #dcdde1;
  margin: 5px;
`;

export default function Icon({ name }: { name: string }) {
  return (
    <Img
      src={`https://mestuss.github.io/images-fonts/images/portfolio/icon/${name}.png`}
    />
  );
}
