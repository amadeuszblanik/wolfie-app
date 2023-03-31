import React from "react";
import Image from "next/image";
import styled from "styled-components";

interface ImageProps {
  src: string;
  alt: string;
}

const StyledPhotoWrapper = styled.figure`
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0 0 100%;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.radius}px;
`;

const Atom: React.FC<ImageProps> = ({ src, alt }) => (
  <StyledPhotoWrapper>
    <Image src={src} alt={alt} fill />
  </StyledPhotoWrapper>
);

export default Atom;
