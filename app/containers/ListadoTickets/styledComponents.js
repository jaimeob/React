import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: ${props => {
    const { flexDirection = "row" } = props;
    const directions = ["row", "column"];
    const dir = directions.includes(flexDirection) ? flexDirection : "row";

    return `${dir}`;
  }};
  width: ${props => {
    const { width = 100 } = props;
    return `${width}%`;
  }};
`;

export const ColumnContainer = styled.div``;