import styled from 'styled-components';

const StyledText = styled.p<{ size: number }>`
  font-size: ${(props) => props.size}px;
`;

export enum DoggoTextVariant {
  LargeTitle = 'LARGE_TITLE',
  Title1 = 'TITLE_1',
  Title2 = 'TITLE_2',
  Title3 = 'TITLE_3',
  Headline = 'HEADLINE',
  Body = 'BODY',
  Callout = 'CALLOUT',
  Subhead = 'SUBHEAD',
  Footnote = 'FOOTNOTE',
  Caption1 = 'CAPTION_1',
  Caption2 = 'CAPTION_2',
}

const variantSize: {
  [key in DoggoTextVariant]: { standard: number; leading: number };
} = {
  [DoggoTextVariant.LargeTitle]: { standard: 34, leading: 41 },
  [DoggoTextVariant.Title1]: { standard: 28, leading: 34 },
  [DoggoTextVariant.Title2]: { standard: 22, leading: 28 },
  [DoggoTextVariant.Title3]: { standard: 20, leading: 25 },
  [DoggoTextVariant.Headline]: { standard: 17, leading: 22 },
  [DoggoTextVariant.Body]: { standard: 17, leading: 22 },
  [DoggoTextVariant.Callout]: { standard: 16, leading: 21 },
  [DoggoTextVariant.Subhead]: { standard: 15, leading: 20 },
  [DoggoTextVariant.Footnote]: { standard: 13, leading: 18 },
  [DoggoTextVariant.Caption1]: { standard: 12, leading: 16 },
  [DoggoTextVariant.Caption2]: { standard: 11, leading: 13 },
};

interface DoggoTextProps {
  children: string;
  variant?: DoggoTextVariant;
  leading?: boolean;
}

const Component = ({ children, variant, leading }: DoggoTextProps) => {
  const size =
    variantSize[variant || DoggoTextVariant.Body][
      leading ? 'leading' : 'standard'
    ];

  return <StyledText size={size}>{children}</StyledText>;
};

Component.defaultProps = {
  variant: DoggoTextVariant.Body,
};

export default Component;
