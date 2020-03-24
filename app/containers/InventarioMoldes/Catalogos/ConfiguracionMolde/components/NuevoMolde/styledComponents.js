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

// const ContainerAlign = props => {
//   const { align = 'flex-start' } = props;
//   return `align-items: ${align};`;
// };

// export const Container = styled.div`
//   display: flex;
//   flex-direction: ${ContainerFlexDirectionFn};
//   width: ${ContainerWidth};
//   ${ContainerJustify}
// `;

export const Container = styled.div `
  width: calc(100% - 16px) !important;
  margin: 8px;
  background-color: #fff;
  overflow: hidden;
  width: 100%;
  border-radius: 2px;
  box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.2),
              0px 2px 2px 0px rgba(0,0,0,0.14),
              0px 3px 1px -2px rgba(0,0,0,0.12);
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
  min-height: calc(100vh - 162px);
  height: 765px;
  overflow: auto;
  position: relative
`

export const Grid50 = styled.div `
  float: left;
  width: 50%;
  position: relative;
  min-height: 70px;
  padding: 0 15px;
`

export const Grid40 = styled.div `
  float: left;
  width: 40%;
  position: relative;
  padding: 15px;
`
export const Grid20 = styled.div `
  float: left;
  width: 20%;
  position: relative;
  padding: 15px;
`
export const Grid60 = styled.div `
  float: left;
  width: 60%;
  position: relative;
  padding: 15px;
`
export const Grid80 = styled.div `
  float: left;
  width: 80%;
  position: relative;
  padding: 15px;
`
export const ColumnContainer = styled.div``;