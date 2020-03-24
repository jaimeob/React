import styled from "styled-components";

// const ContainerFlexDirectionFn = props => {
//   const { flexDirection = "row" } = props;
//   const directions = ["row", "column"];
//   const dir = directions.includes(flexDirection) ? flexDirection : "row";

//   return `${dir}`;
// };

// const ContainerWidth = props => {
//   const { width = 100 } = props;
//   return `${width}%`;
// };

// const ContainerJustify = props => {
//   const { justify = 'flex-start' } = props;
//   return `justify-content: ${justify};`;
// };

// // const ContainerAlign = props => {
// //   const { align = 'flex-start' } = props;
// //   return `align-items: ${align};`;
// // };

// export const Container = styled.div`
//   display: flex;
//   flex-direction: ${ContainerFlexDirectionFn};
//   width: ${ContainerWidth};
//   ${ContainerJustify}
// `;

// export const ColumnContainer = styled.div``;

export const Container = styled.div `
  padding: 8px;
  background-color: #fff;
  overflow: hidden;
  width: 100%;
  border-radius: 2px;
` 

export const  FormContainer = styled.div `
  padding: 16px 24px;
`

export const LoadingContainer = styled.div `
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  justify-content: center;

`;

export const Section = styled.div `
  float: left;
  width: 50%;
  min-height: 600px;
  overflow: auto;
  position: relative
`

export const Grid50 = styled.div `
  float: left;
  width: 50%;
  padding: 0 15px;
`
export const Grid30 = styled.div `
  float: left;
  width: 30%;
  padding: 0 15px;
`
export const OH = styled.div `
  overflow: hidden;
`