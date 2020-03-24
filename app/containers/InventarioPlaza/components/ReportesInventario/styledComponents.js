import styled from "styled-components";

const ContainerFlexDirectionFn = props => {
  const { flexDirection = "row" } = props;
  const directions = ["row", "column"];
  const dir = directions.includes(flexDirection) ? flexDirection : "row";

  return `${dir}`;
};

const ContainerWidth = props => {
  const { width = 100 } = props;
  return `${width}%`;
};

const ContainerJustify = props => {
  const { justify = 'flex-start' } = props;
  return `justify-content: ${justify};`;
};

// const ContainerAlign = props => {
//   const { align = 'flex-start' } = props;
//   return `align-items: ${align};`;
// };

export const Container = styled.div`
  display: flex;
  flex-direction: ${ContainerFlexDirectionFn};
  width: ${ContainerWidth};
  ${ContainerJustify}
`;

export const ColumnContainer = styled.div``;